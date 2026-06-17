# AI Developer Documentation - Go Ngaji CMS Backend

## 🚀 Quick Start Guide untuk AI

Selamat datang! Dokumentasi ini dirancakan khusus untuk AI yang akan bekerja pada proyek **Go Ngaji CMS Backend**. Proyek ini adalah aplikasi CMS (Content Management System) untuk artikel keagamaan Islam yang dibangun dengan Next.js 13.4.8 dan TypeScript.

## 📋 Project Overview

- **Nama Proyek**: Go Ngaji CMS Backend
- **Framework**: Next.js 13.4.8 dengan App Router
- **Language**: TypeScript 5.1.3
- **UI Library**: PrimeReact 10.2.1
- **State Management**: Built-in React hooks
- **Styling**: SCSS, PrimeFlex
- **Package Manager**: pnpm 9.15.1

## 🏗️ Arsitektur

Proyek ini mengikuti **Clean Architecture** dengan struktur:
- **Presentation Layer**: `app/` - Pages dan API routes
- **Business Logic Layer**: `features/` - Domain logic, services, dan types
- **Component Layer**: `components/` - Global components, UI components, dan layout
- **Shared Layer**: `types/`, `utils/`, `hooks/` - Reusable utilities

### 📁 Struktur Folder Utama
```
react-gongaji-cms-backend/
├── 📂 app/                    # Next.js App Router (Routes only)
│   ├── 📂 (main)/             # Main layout with sidebar
│   │   ├── 📂 articles/       # Articles feature
│   │   ├── 📂 store/          # Store management
│   │   │   ├── 📂 addresses/
│   │   │   ├── 📂 brands/
│   │   │   ├── 📂 merchant-banners/     # kebab-case
│   │   │   ├── 📂 merchant-categories/  # kebab-case
│   │   │   └── 📂 merchants/
│   │   ├── 📂 qr/             # QR browse (books, contents, playlist, series, groups)
│   │   └── 📂 [templates]/    # UI Kit, blocks, pages, utilities
│   ├── 📂 (full-page)/       # Full-screen pages (auth, landing)
│   └── 📂 api/                # API routes (auth/article/store/qr proxies)
│
├── 📂 components/             # Global components only
│   ├── 📂 ui/                 # Reusable UI components (ButtonDemo, ChartDemo, dll)
│   ├── 📂 common/             # Shared components (HtmlEditor, dll)
│   └── 📂 layout/             # Layout components + context
│       ├── AppConfig.tsx
│       ├── AppFooter.tsx
│       ├── AppMenu.tsx
│       ├── AppSidebar.tsx
│       ├── AppTopbar.tsx
│       ├── layout.tsx
│       ├── logo-gongaji.tsx
│       └── context/
│           ├── layoutcontext.tsx
│           └── menucontext.tsx
│
├── 📂 features/              # Business logic (self-contained)
│   ├── 📂 articles/
│   │   ├── 📂 components/     # Article-specific components
│   │   ├── 📂 services/       # API calls (articleService.js)
│   │   └── 📂 types/          # Article types
│   ├── 📂 auth/               # Authentication logic
│   ├── 📂 qr/                 # QR service (read-only browse)
│   │   ├── 📂 components/     # qrListUi.tsx (shared table/title UI)
│   │   ├── 📂 services/       # qrService.js
│   │   └── 📂 types/
│   └── 📂 store/              # Store management logic
│       ├── 📂 components/
│       ├── 📂 services/
│       └── 📂 types/
│
├── 📂 types/                  # Global/shared types
├── 📂 utils/                  # Helper functions (api.ts, constants.ts)
├── 📂 hooks/                  # Global custom hooks
├── 📂 demo/                   # Demo components & services
└── 📂 public/                 # Static assets
```

## 🔗 External Services

Proyek ini terhubung dengan 4 microservices upstream (+ proxy same-origin di browser):

| Service | Env (upstream) | Client path (browser) |
|---------|----------------|------------------------|
| Authentication | `NEXT_PUBLIC_BASE_URL_AUTH` | `/api/auth` |
| Article | `NEXT_PUBLIC_BASE_URL_ARTICLE` | `/api/article` |
| Store | `NEXT_PUBLIC_BASE_URL_STORE` | `/api/store` |
| QR | `NEXT_PUBLIC_BASE_URL_QR` | `/api/qr` |
| QR Book (playlist) | `NEXT_PUBLIC_BASE_URL_QR_BOOK` (default = QR) | `/api/qr-book` |

Implementasi proxy: `lib/upstreamProxy.ts`, routes di `app/api/*/[*path]/route.ts`.

**QR headers wajib** (sama Postman): `Authorization: Bearer {token}`, `Version: V3`.

## 🛠️ Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Format code
pnpm format

# Lint code
pnpm lint
```

## 📚 Panduan Lengkap

1. [📡 API Endpoints Documentation](./02-api-endpoints.md)
2. [🏛️ Clean Architecture Structure](./03-folder-structure.md)
3. [🧪 API Testing Guide](./04-api-testing.md)

## ⚡ Quick Tips untuk AI

- Selalu gunakan TypeScript types dari `features/*/types/`
- API calls menggunakan axios instance dari `utils/api.ts` (token dari cookie `authToken` atau `NEXT_PUBLIC_STATIC_BEARER_TOKEN`)
- Service eksternal dipanggil lewat path `/api/*`, bukan URL Cloud Run langsung (hindari CORS)
- Authentication menggunakan Bearer token dengan cookie fallback
- Follow existing naming conventions:
  - **Folders**: lowercase, kebab-case untuk multi-word (`merchant-banners`, `merchant-categories`)
  - **Components**: PascalCase (`ArticlesList.tsx`, `ButtonDemo.tsx`)
  - **API fields**: snake_case (`article_uuid`, `merchant_banner_id`)
  - **TypeScript**: camelCase (`articleUuid`, `merchantBannerId`)
- Gunakan PrimeReact components untuk UI consistency
- Import patterns:
  ```typescript
  // Feature service
  import { getArticles } from '@/features/articles/services/articleService';
  import { getQrContents } from '@/features/qr/services/qrService';
  
  // UI component
  import Component from '@/components/ui/ComponentDemo';
  
  // Layout context
  import { LayoutContext } from '@/components/layout/context/layoutcontext';
  
  // Types
  import type { Article } from '@/types';
  ```

## 🔍 Environment Variables

```env
NEXT_PUBLIC_BASE_URL_AUTH=https://gongaji-authentication-service-m3gra3glsq-et.a.run.app
NEXT_PUBLIC_BASE_URL_ARTICLE=https://gongaji-article-service-m3gra3glsq-et.a.run.app
NEXT_PUBLIC_BASE_URL_STORE=https://gongaji-store-service-m3gra3glsq-et.a.run.app
NEXT_PUBLIC_BASE_URL_QR=https://gongaji-qr-service-396261734950.asia-southeast2.run.app
# Opsional; fallback ke BASE_URL_QR jika kosong (Postman: base_url_qr_book)
NEXT_PUBLIC_BASE_URL_QR_BOOK=https://gongaji-qr-service-396261734950.asia-southeast2.run.app
NEXT_PUBLIC_STATIC_BEARER_TOKEN=
NEXT_PUBLIC_AUTH_CLIENT_ID=cms-web
```

Setelah ubah env: `rm -rf .next && pnpm dev`. Akses CMS lewat `http://localhost:3000` (bukan `127.0.0.1`) dan login dulu agar token ter-set.

## 🎯 Current Features

- **Article Management**: CRUD articles dengan categories dan tags
- **QR Management** (read-only, selaras koleksi Postman **QR**):
  - `/qr/books` — `GET /v1/book/get`
  - `/qr/contents` — `GET /v1/content/get` (default semua buku + pagination `page`)
  - `/qr/playlist` — `GET /v1/content/get-playlist` (`content_book` wajib; `content_series`, `content_qrcode` opsional)
  - `/qr/series` — `GET /v1/series/get`
  - `/qr/groups` — `GET /v1/group/get`
  - Detail: `/qr/books/view/[book_code]`, `/qr/contents/view/[content_uuid]`
- **Category Management**: Manage article categories
- **Authentication**: Token-based auth dengan cookie support
- **File Upload**: Image upload untuk articles
- **Responsive Design**: Mobile-first dengan PrimeReact

---

*AI Developer Guide v1.1 - Last Updated: June 2026*
