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
		
		// Puppeteer binding kontrolü - Cloudflare Pages'de binding yapılandırılmalı
		// Dashboard → Workers & Pages → eksi-sozluk → Settings → Functions → Bindings → Add binding → Puppeteer
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
					// Slice ensures we get a proper ArrayBuffer, not SharedArrayBuffer
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
						'Content-Disposition': 'attachment; filename="eksi-sozluk.pdf"'
					}
				});
			} catch (puppeteerError) {
				console.error('Puppeteer error:', puppeteerError);
				// Fall through to client-side fallback
			}
		}

		// If Puppeteer is not available, return error
		return json({ 
			error: 'PDF oluşturma servisi şu anda kullanılamıyor. Lütfen Cloudflare Workers\'da Puppeteer binding\'ini yapılandırın.' 
		}, { status: 503 });
	} catch (error) {
		console.error('PDF generation error:', error);
		return json({ error: 'Failed to generate PDF' }, { status: 500 });
	}
};

