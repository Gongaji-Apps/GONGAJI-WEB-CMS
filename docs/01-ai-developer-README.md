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
│   │   └── 📂 [templates]/    # UI Kit, blocks, pages, utilities
│   ├── 📂 (full-page)/       # Full-screen pages (auth, landing)
│   └── 📂 api/                # API routes
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

Proyek ini terhubung dengan 3 microservices:
- **Authentication Service**: `BASE_URL_AUTH`
- **Article Service**: `BASE_URL_ARTICLE` 
- **Store Service**: `BASE_URL_STORE`

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
- API calls menggunakan axios instance dari `utils/api.ts`
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
NEXT_PUBLIC_STATIC_BEARER_TOKEN=
NEXT_PUBLIC_AUTH_CLIENT_ID=cms-web
```

## 🎯 Current Features

- **Article Management**: CRUD articles dengan categories dan tags
- **Category Management**: Manage article categories
- **Authentication**: Token-based auth dengan cookie support
- **File Upload**: Image upload untuk articles
- **Responsive Design**: Mobile-first dengan PrimeReact

---

*AI Developer Guide v1.0 - Last Updated: 2025*
