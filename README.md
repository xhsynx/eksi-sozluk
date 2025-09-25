## 🚀 Kurulum

### Gereksinimler
- Node.js 18+ 
- bun, npm veya yarn

### Adımlar

1. **Repository'yi klonlayın**
```bash
git clone https://github.com/xhsynx/eksi-sozluk.git
cd eksi-sozluk
```

2. **Bağımlılıkları yükleyin**
```bash
bun install
```

3. **Development server'ı başlatın**
```bash
bun run dev
```

4. **Tarayıcıda açın**
```
http://localhost:5173
```

## 📁 Proje Yapısı

```
eksi-sozluk/
├── src/
│   ├── lib/
│   │   ├── assets/           # SVG ikonlar ve görseller
│   │   ├── components/       # Yeniden kullanılabilir bileşenler
│   │   ├── services/         # API servisleri ve mock data
│   │   ├── stores/          # Svelte stores (tema, state)
│   │   └── types/           # TypeScript tip tanımları
│   ├── routes/              # SvelteKit sayfa rotaları
│   │   ├── eksisozluk/      # Ana dashboard sayfası
│   │   ├── [...slug]/       # Catch-all route (geliştirme sayfaları)
│   │   └── +error.svelte    # Hata sayfası
│   └── app.html             # Ana HTML template
├── static/                  # Statik dosyalar
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Bileşenler

### 📊 Dashboard Bileşenleri
- **Sidebar**: Navigasyon menüsü ve kullanıcı profili
- **TopicCard**: Başlık kartları ve sayfalama
- **TopicItem**: Entry detayları ve kullanıcı bilgileri
- **SearchBar**: Gelişmiş arama özelliği
- **DateRangeSelector**: Tarih aralığı seçimi
- **RefreshButton**: Veri yenileme butonu

### 🎯 Analitik Bileşenleri
- **KPI Cards**: Ana performans göstergeleri
- **Interactive Charts**: Dinamik grafikler
- **Popular Authors**: En aktif yazarlar listesi
- **Statistics**: Detaylı istatistikler

## 🎨 Tema Sistemi

### 🌙 Dark/Light Tema
- **Otomatik Tema Algılama**: Sistem tercihine göre
- **Manuel Tema Değiştirme**: Toggle butonu ile
- **Tutarlı Renk Paleti**: Tüm bileşenlerde uyumlu renkler
- **Smooth Transitions**: Yumuşak geçiş animasyonları


## 🔧 API ve Veri Yönetimi

### 📊 Mock Data Sistemi
```typescript
// Kullanıcı verileri
interface User {
  id: number;
  name: string;
  avatar: string; // Random avatar URLs
  email: string;
  joinDate: string;
}

// Başlık verileri
interface Topic {
  id: number;
  title: string;
  content: string;
  date: string;
  likes: number;
  entries: Entry[];
}
```

### 🎯 Avatar Sistemi
- **Random Avatar URLs**: DiceBear API entegrasyonu
- **10 Farklı Stil**: Avataaars, Personas, Initials, vb.
- **Otomatik Fallback**: URL yüklenemezse emoji gösterimi
- **Lazy Loading**: Performans optimizasyonu

## 🛠️ Geliştirme

### 🔧 Development Scripts
```bash
# Development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Linting
bun run lint

# Type checking
npm run check
```

### 📦 Bağımlılıklar
```json
{
  "dependencies": {
    "@sveltejs/kit": "^2.0.0",
    "svelte": "^4.0.0",
    "chart.js": "^4.0.0",
    "@hugeicons/svelte": "^1.0.0",
    "tailwindcss": "^3.0.0"
  }
}
```

## 🎨 Tasarım Sistemi

### 🎯 Bileşen Kütüphanesi
- **ButtonIcon**: İkonlu butonlar
- **SearchBar**: Arama çubuğu
- **DateRangeSelector**: Tarih seçici
- **RefreshButton**: Yenileme butonu
- **TopicCard**: Başlık kartı
- **TopicItem**: Entry öğesi

### 🎨 Stil Rehberi
- **Typography**: Mulish font ailesi
- **Spacing**: 4px grid sistemi
- **Colors**: Semantic renk sistemi
- **Shadows**: Tutarlı gölge efektleri
- **Borders**: Yumuşak köşeler (rounded)

## 🚀 Deployment

### 🌐 Production Build
```bash
bun run build
```

### 📦 Static Hosting
- **cloudflare**: Otomatik deployment

### 🔧 Environment Variables
```env
# Production
NODE_ENV=production
CLOUD_FLARE_URL=https://b23e43cd.eksi-sozluk.pages.dev
```