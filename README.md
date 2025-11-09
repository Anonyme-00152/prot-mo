# 💼 Mikail Lekesiz - Portfolio

[🇬🇧 English](#english) | [🇹🇷 Türkçe](#türkçe)

---

## 🇬🇧 English

### 📖 About

Personal portfolio website showcasing professional experience, projects, and skills. Features a modern, minimalist design with smooth animations and multi-language support (French, English, Turkish).

**Live Demo:** [Coming Soon]

### ✨ Features

- 🌍 **Multi-language Support** - French, English, Turkish
- 🎨 **Modern UI/UX** - Clean, minimalist design with smooth animations
- 📱 **Fully Responsive** - Works perfectly on all devices
- ⚡ **Fast Performance** - Built with Vite for optimal loading speed
- 🎭 **Smooth Animations** - Powered by Framer Motion
- 🎯 **Sections:**
  - Hero with profile image
  - About Me
  - Services
  - Technical Skills
  - Professional Experience
  - Education & Certifications
  - Projects Portfolio
  - Contact Information (France & Turkey)

### 🛠️ Tech Stack

- **Framework:** React 19.1.0
- **Build Tool:** Vite 6.3.5
- **Styling:** Tailwind CSS 4.1.7
- **Animations:** Framer Motion 12.15.0
- **UI Components:** Radix UI
- **Icons:** Lucide React
- **Package Manager:** pnpm

### 🚀 Quick Start

#### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 10.0.0

#### Installation

```bash
# Clone the repository
git clone https://github.com/lekesiz/portfolio.git

# Navigate to project directory
cd portfolio

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The application will be available at `http://localhost:5173`

### 📜 Available Scripts

```bash
# Development
pnpm dev          # Start development server

# Build
pnpm build        # Build for production

# Preview
pnpm preview      # Preview production build

# Lint
pnpm lint         # Run ESLint
```

### 📁 Project Structure

```
portfolio/
├── public/              # Static assets
│   └── favicon.ico
├── src/
│   ├── assets/         # Images and media
│   ├── components/     # React components
│   │   └── ui/        # Radix UI components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utilities and translations
│   │   ├── translations.js  # Multi-language content
│   │   └── utils.js         # Helper functions
│   ├── App.jsx        # Main application component
│   ├── App.css        # Global styles
│   ├── index.css      # Tailwind CSS config
│   └── main.jsx       # Application entry point
├── .gitignore
├── eslint.config.js   # ESLint configuration
├── package.json
├── vite.config.js     # Vite configuration
└── README.md
```

### 🌐 Multi-language Support

Content is available in three languages:
- 🇫🇷 French (Default)
- 🇬🇧 English
- 🇹🇷 Turkish

All translations are managed in `src/lib/translations.js`.

### 🎨 Customization

#### Change Language

Click the language buttons (FR/EN/TR) in the navigation bar.

#### Update Content

Edit translations in `src/lib/translations.js` for each language.

#### Modify Styling

- **Colors:** Edit CSS variables in `src/App.css`
- **Components:** Customize Radix UI components in `src/components/ui/`
- **Animations:** Adjust Framer Motion configs in `src/App.jsx`

### 📦 Build for Production

```bash
# Build
pnpm build

# Preview build
pnpm preview
```

Build output will be in the `dist/` directory.

### 🚢 Deployment

The project is production-ready and can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

Example deployment to Vercel:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### 📊 Performance

- **Build Size:** ~1.4 MB
- **JS Bundle:** 375.57 KB (gzip: 117.65 KB)
- **CSS Bundle:** 102.06 KB (gzip: 15.96 KB)
- **Build Time:** ~10 seconds

### 🤝 Contributing

Contributions, issues, and feature requests are welcome!

### 📝 License

This project is private and proprietary.

### 👤 Author

**Mikail Lekesiz**
- Website: [netzinformatique.fr](https://netzinformatique.fr)
- LinkedIn: [@mikail-lekesiz](https://www.linkedin.com/in/mikail-lekesiz/)
- GitHub: [@lekesiz](https://github.com/lekesiz)
- Twitter: [@lekesiz_mikail](https://x.com/lekesiz_mikail)

### 📧 Contact

- 🇫🇷 France: mikail@lekesiz.fr | +33 6 63 90 75 27
- 🇹🇷 Turkey: mikail@lekesiz.org | +90 507 43 43 253

---

## 🇹🇷 Türkçe

### 📖 Hakkında

Profesyonel deneyim, projeler ve yetenekleri sergileyen kişisel portfolio web sitesi. Modern, minimalist tasarım, akıcı animasyonlar ve çok dilli destek (Fransızca, İngilizce, Türkçe).

**Canlı Demo:** [Yakında]

### ✨ Özellikler

- 🌍 **Çok Dilli Destek** - Fransızca, İngilizce, Türkçe
- 🎨 **Modern UI/UX** - Temiz, minimalist tasarım ve akıcı animasyonlar
- 📱 **Tam Responsive** - Tüm cihazlarda mükemmel çalışır
- ⚡ **Hızlı Performans** - Optimal yükleme hızı için Vite ile geliştirildi
- 🎭 **Akıcı Animasyonlar** - Framer Motion destekli
- 🎯 **Bölümler:**
  - Profil resimli ana sayfa
  - Hakkımda
  - Hizmetler
  - Teknik Yetenekler
  - Profesyonel Deneyim
  - Eğitim ve Sertifikalar
  - Proje Portföyü
  - İletişim Bilgileri (Fransa ve Türkiye)

### 🛠️ Teknoloji Stack

- **Framework:** React 19.1.0
- **Build Aracı:** Vite 6.3.5
- **Styling:** Tailwind CSS 4.1.7
- **Animasyonlar:** Framer Motion 12.15.0
- **UI Bileşenleri:** Radix UI
- **İkonlar:** Lucide React
- **Paket Yöneticisi:** pnpm

### 🚀 Hızlı Başlangıç

#### Gereksinimler

- Node.js >= 18.0.0
- pnpm >= 10.0.0

#### Kurulum

```bash
# Repository'yi klonlayın
git clone https://github.com/lekesiz/portfolio.git

# Proje dizinine gidin
cd portfolio

# Bağımlılıkları yükleyin
pnpm install

# Geliştirme sunucusunu başlatın
pnpm dev
```

Uygulama `http://localhost:5173` adresinde çalışacaktır.

### 📜 Kullanılabilir Komutlar

```bash
# Geliştirme
pnpm dev          # Geliştirme sunucusunu başlat

# Build
pnpm build        # Production için build al

# Önizleme
pnpm preview      # Production build'i önizle

# Lint
pnpm lint         # ESLint çalıştır
```

### 📁 Proje Yapısı

```
portfolio/
├── public/              # Statik dosyalar
│   └── favicon.ico
├── src/
│   ├── assets/         # Resimler ve medya
│   ├── components/     # React bileşenleri
│   │   └── ui/        # Radix UI bileşenleri
│   ├── hooks/         # Özel React hook'ları
│   ├── lib/           # Yardımcılar ve çeviriler
│   │   ├── translations.js  # Çok dilli içerik
│   │   └── utils.js         # Yardımcı fonksiyonlar
│   ├── App.jsx        # Ana uygulama bileşeni
│   ├── App.css        # Global stiller
│   ├── index.css      # Tailwind CSS yapılandırması
│   └── main.jsx       # Uygulama giriş noktası
├── .gitignore
├── eslint.config.js   # ESLint yapılandırması
├── package.json
├── vite.config.js     # Vite yapılandırması
└── README.md
```

### 🌐 Çok Dilli Destek

İçerik üç dilde mevcuttur:
- 🇫🇷 Fransızca (Varsayılan)
- 🇬🇧 İngilizce
- 🇹🇷 Türkçe

Tüm çeviriler `src/lib/translations.js` dosyasında yönetilir.

### 🎨 Özelleştirme

#### Dil Değiştirme

Navigasyon çubuğundaki dil butonlarına (FR/EN/TR) tıklayın.

#### İçeriği Güncelleme

Her dil için `src/lib/translations.js` dosyasındaki çevirileri düzenleyin.

#### Stilleri Değiştirme

- **Renkler:** `src/App.css` dosyasındaki CSS değişkenlerini düzenleyin
- **Bileşenler:** `src/components/ui/` içindeki Radix UI bileşenlerini özelleştirin
- **Animasyonlar:** `src/App.jsx` içindeki Framer Motion yapılandırmalarını ayarlayın

### 📦 Production Build

```bash
# Build
pnpm build

# Build önizlemesi
pnpm preview
```

Build çıktısı `dist/` dizininde olacaktır.

### 🚢 Deployment

Proje production-ready ve şu platformlara deploy edilebilir:
- Vercel
- Netlify
- GitHub Pages
- Herhangi bir statik hosting servisi

Vercel'e deployment örneği:
```bash
# Vercel CLI'yi yükleyin
npm i -g vercel

# Deploy edin
vercel
```

### 📊 Performans

- **Build Boyutu:** ~1.4 MB
- **JS Bundle:** 375.57 KB (gzip: 117.65 KB)
- **CSS Bundle:** 102.06 KB (gzip: 15.96 KB)
- **Build Süresi:** ~10 saniye

### 🤝 Katkıda Bulunma

Katkılar, sorun bildirimleri ve özellik istekleri memnuniyetle karşılanır!

### 📝 Lisans

Bu proje özel ve tescillidir.

### 👤 Yazar

**Mikail Lekesiz**
- Website: [netzinformatique.fr](https://netzinformatique.fr)
- LinkedIn: [@mikail-lekesiz](https://www.linkedin.com/in/mikail-lekesiz/)
- GitHub: [@lekesiz](https://github.com/lekesiz)
- Twitter: [@lekesiz_mikail](https://x.com/lekesiz_mikail)

### 📧 İletişim

- 🇫🇷 Fransa: mikail@lekesiz.fr | +33 6 63 90 75 27
- 🇹🇷 Türkiye: mikail@lekesiz.org | +90 507 43 43 253

---

⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın!
