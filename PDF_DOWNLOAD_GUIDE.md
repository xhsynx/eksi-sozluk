# PDF Download Özelliği Ekleme Rehberi

Bu rehber, Cloudflare Pages/Workers üzerinde çalışan bir SvelteKit projesine PDF download özelliği eklemek için adım adım talimatlar içerir.

## 📋 Gereksinimler

- Cloudflare Pages/Workers projesi
- SvelteKit
- Bun veya pnpm paket yöneticisi

## 🔧 Adım 1: Paketleri Yükle

```bash
bun add @cloudflare/puppeteer
```

## 🔧 Adım 2: wrangler.toml Yapılandırması

`wrangler.toml` dosyasına şu ayarları ekle:

```toml
name = "proje-adi"
compatibility_date = "2024-01-15"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".cloudflare"

# Browser binding for Cloudflare Pages Functions (Puppeteer)
[browser]
binding = "PUPPETEER"
```

## 🔧 Adım 3: API Endpoint Oluştur

`src/routes/api/pdf/+server.ts` dosyası oluştur:

```typescript
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

interface CloudflarePlatform {
	env?: {
		PUPPETEER?: any;
		[key: string]: any;
	};
}

export const POST: RequestHandler = async ({ request, platform }) => {
	try {
		const { url } = await request.json();

		if (!url) {
			return json({ error: 'URL is required' }, { status: 400 });
		}

		// Cloudflare Workers/Pages'de Puppeteer kullanımı
		// @ts-ignore - Platform type varies by adapter, env is available in Cloudflare
		const cfPlatform = platform as CloudflarePlatform;
		// @ts-ignore
		const env = cfPlatform?.env;
		
		// Debug: Log environment to help diagnose binding issues
		console.log('Platform env keys:', env ? Object.keys(env) : 'env is null/undefined');
		console.log('PUPPETEER binding exists:', !!env?.PUPPETEER);
		
		// Puppeteer binding kontrolü
		if (env?.PUPPETEER) {
			try {
				const puppeteer = await import('@cloudflare/puppeteer');
				// @ts-ignore - env.PUPPETEER type is not in standard Platform interface
				const browser = await puppeteer.launch(env.PUPPETEER);
				const page = await browser.newPage();
				
				await page.goto(url, { waitUntil: 'networkidle0' });
				const pdfBuffer = await page.pdf({
					format: 'A4',
					printBackground: true,
					margin: {
						top: '20px',
						right: '20px',
						bottom: '20px',
						left: '20px'
					}
				});

				await browser.close();

				// Convert Buffer to ArrayBuffer for Response
				let pdfArrayBuffer: ArrayBuffer;
				if (pdfBuffer instanceof ArrayBuffer) {
					pdfArrayBuffer = pdfBuffer;
				} else if (pdfBuffer instanceof Uint8Array) {
					// Create a new ArrayBuffer from Uint8Array to avoid SharedArrayBuffer issues
					const buffer = pdfBuffer.buffer;
					if (buffer instanceof SharedArrayBuffer) {
						// Convert SharedArrayBuffer to ArrayBuffer by copying
						pdfArrayBuffer = pdfBuffer.slice().buffer;
					} else {
						// Use slice to get a proper ArrayBuffer with correct byte range
						pdfArrayBuffer = buffer.slice(pdfBuffer.byteOffset, pdfBuffer.byteOffset + pdfBuffer.byteLength);
					}
				} else {
					// Try to convert to ArrayBuffer - handle Buffer type
					// @ts-ignore - pdfBuffer might be a Node.js Buffer or similar
					const uint8Array = new Uint8Array(pdfBuffer);
					const buffer = uint8Array.buffer;
					if (buffer instanceof SharedArrayBuffer) {
						pdfArrayBuffer = uint8Array.slice().buffer;
					} else {
						pdfArrayBuffer = buffer.slice(uint8Array.byteOffset, uint8Array.byteOffset + uint8Array.byteLength);
					}
				}

				return new Response(pdfArrayBuffer, {
					headers: {
						'Content-Type': 'application/pdf',
						'Content-Disposition': 'attachment; filename="page.pdf"'
					}
				});
			} catch (puppeteerError) {
				console.error('Puppeteer error:', puppeteerError);
				// Fall through to error response
			}
		}

		// If Puppeteer is not available, return detailed error
		const errorMessage = env 
			? `PDF oluşturma servisi şu anda kullanılamıyor. Puppeteer binding bulunamadı. Mevcut bindings: ${Object.keys(env).join(', ') || 'yok'}. Lütfen wrangler.toml dosyasında Puppeteer binding'ini yapılandırın.`
			: 'PDF oluşturma servisi şu anda kullanılamıyor. Platform env mevcut değil.';
		
		console.error('Puppeteer binding not found:', { 
			hasEnv: !!env, 
			envKeys: env ? Object.keys(env) : null,
			hasPuppeteer: !!env?.PUPPETEER 
		});
		
		return json({ 
			error: errorMessage,
			debug: {
				hasEnv: !!env,
				envKeys: env ? Object.keys(env) : null
			}
		}, { status: 503 });
	} catch (error) {
		console.error('PDF generation error:', error);
		return json({ error: 'Failed to generate PDF' }, { status: 500 });
	}
};
```

## 🔧 Adım 4: TypeScript Tip Tanımları

`src/app.d.ts` dosyasına Platform interface'ini ekle:

```typescript
declare global {
	namespace App {
		interface Platform {
			env?: {
				PUPPETEER?: any;
				[key: string]: any;
			};
			context?: ExecutionContext;
			cf?: IncomingRequestCfProperties;
		}
	}
}
```

## 🔧 Adım 5: Frontend - Download Fonksiyonu

Sayfa component'ine download fonksiyonu ekle:

```typescript
import { browser } from '$app/environment';

// PDF download state
let isDownloading = $state(false);

// PDF download function
async function handleDownloadPDF() {
	if (!browser) return; // Only run on client-side
	
	isDownloading = true;
	try {
		// Get current page URL
		const currentUrl = window.location.href;
		
		// Use Cloudflare Puppeteer API
		const response = await fetch('/api/pdf', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ url: currentUrl })
		});

		if (!response.ok) {
			throw new Error(`PDF oluşturma hatası: ${response.statusText}`);
		}

		const contentType = response.headers.get('Content-Type');
		
		if (contentType === 'application/pdf') {
			// PDF received from server (Puppeteer)
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = 'page.pdf';
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);
		} else {
			// Server returned an error message
			const data = await response.json();
			throw new Error(data.error || 'PDF oluşturulamadı');
		}
	} catch (error) {
		console.error('PDF download error:', error);
		alert(error instanceof Error ? error.message : 'PDF indirme sırasında bir hata oluştu. Lütfen tekrar deneyin.');
	} finally {
		isDownloading = false;
	}
}
```

## 🔧 Adım 6: Download Butonu Ekle

Sayfa template'ine download butonu ekle:

```svelte
<button 
	onclick={handleDownloadPDF}
	disabled={isDownloading}
	class="btn btn-ghost"
	aria-label="Download PDF"
>
	{#if isDownloading}
		<span class="loading loading-spinner loading-sm"></span>
	{:else}
		<!-- Download icon -->
		<img src={DownloadIcon} alt="Download" width="20" height="20" />
	{/if}
</button>
```

## 🔧 Adım 7: Vite Config (Gerekirse)

Eğer SSR hataları alırsanız, `vite.config.ts` dosyasına ekle:

```typescript
export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), devtoolsJson()],
	ssr: {
		noExternal: ['@cloudflare/puppeteer'],
		resolve: {
			conditions: ['workerd', 'worker', 'browser']
		}
	},
	optimizeDeps: {
		exclude: ['@cloudflare/puppeteer']
	},
	build: {
		rollupOptions: {
			external: (id) => {
				// Exclude Node.js built-in modules for Cloudflare Workers
				if (id.startsWith('node:')) {
					return true;
				}
				return false;
			}
		}
	}
});
```

## 🚀 Adım 8: Deploy ve Test

1. Değişiklikleri commit et ve push et
2. Cloudflare Pages otomatik deploy edecek
3. Deploy tamamlandıktan sonra download butonuna tıkla
4. PDF indirilecek

## ⚠️ Önemli Notlar

1. **Browser Binding**: `wrangler.toml` dosyasında `[browser] binding = "PUPPETEER"` mutlaka olmalı
2. **nodejs_compat**: `compatibility_flags = ["nodejs_compat"]` eklenmeli
3. **Deploy Komutu**: Cloudflare Pages'de deploy komutu boş bırakılmalı (otomatik deploy)
4. **Build Output**: `pages_build_output_dir = ".cloudflare"` doğru ayarlanmalı

## 🐛 Sorun Giderme

- **503 Hatası**: Browser binding yapılandırılmamış olabilir, `wrangler.toml`'u kontrol et
- **node:buffer Hatası**: `nodejs_compat` flag'i eksik olabilir
- **Window is not defined**: `browser` check ekle ve `window` kullanımlarını koru

## ✅ Tamamlandı!

PDF download özelliği artık çalışıyor olmalı. Herhangi bir sorun olursa Cloudflare Workers logs'larını kontrol et.

