# 🏛️ Clean Architecture Structure

## 📁 Folder Overview

Proyek ini mengikuti prinsip **Clean Architecture** dengan pemisahan yang jelas antara layer. Berikut adalah struktur folder dan penjelasannya:

```
react-gongaji-cms-backend-master/
├── 📂 app/                          # Presentation Layer (Routes & API only)
│   ├── 📂 (full-page)/             # Full-screen pages without sidebar
│   │   ├── 📄 auth/                # Authentication pages (signin, signup, etc)
│   │   ├── 📄 landing.tsx         # Landing page
│   │   └── 📄 layout.tsx           # Full-page layout wrapper
│   ├── 📂 (main)/                  # Main layout with sidebar navigation
│   │   ├── 📂 articles/            # Article management feature
│   │   │   ├── 📄 page.tsx         # Articles list page
│   │   │   ├── 📂 categories/     # Article categories management
│   │   │   │   ├── 📄 page.tsx
│   │   │   │   └── 📄 CategoriesList.tsx
│   │   │   ├── 📂 create/         # Create new article
│   │   │   │   ├── 📄 page.tsx
│   │   │   │   └── 📄 CreateArticle.tsx
│   │   │   ├── 📂 detail/         # Article detail pages (was article_view)
│   │   │   │   ├── 📄 page.tsx
│   │   │   │   └── 📄 ArticleDetail.tsx
│   │   │   ├── 📂 edit/           # Edit existing article
│   │   │   │   ├── 📂 [article_slug]/
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   └── 📄 EditArticle.tsx
│   │   │   ├── 📂 tags/           # Article tags management
│   │   │   │   ├── 📄 page.tsx
│   │   │   │   └── 📄 TagsList.tsx
│   │   │   ├── 📄 ArticlesList.tsx  # Main articles list component
│   │   │   └── 📄 layout.tsx        # Articles layout
│   │   ├── 📂 store/               # Store management feature
│   │   │   ├── 📂 addresses/       # Store address management
│   │   │   │   ├── 📄 page.tsx
│   │   │   │   ├── 📄 StoreAddresses.tsx
│   │   │   │   ├── 📂 create/
│   │   │   │   │   ├── 📄 page.tsx
│   │   │   │   │   └── 📄 CreateStoreAddress.tsx
│   │   │   │   ├── 📂 edit/
│   │   │   │   │   ├── 📂 [address_uuid]/
│   │   │   │   │   │   └── 📄 page.tsx
│   │   │   │   │   └── 📄 EditStoreAddress.tsx
│   │   │   │   └── 📂 view/
│   │   │   │       ├── 📂 [address_uuid]/
│   │   │   │       │   └── 📄 page.tsx
│   │   │   │       └── 📄 ViewStoreAddress.tsx
│   │   │   ├── 📂 brands/          # Store brands management
│   │   │   │   ├── 📄 page.tsx
│   │   │   │   ├── 📄 StoreBrands.tsx
│   │   │   │   ├── 📂 create/
│   │   │   │   │   ├── 📄 page.tsx
│   │   │   │   │   └── 📄 CreateStoreBrand.tsx
│   │   │   │   └── 📂 view/
│   │   │   │       ├── 📂 [brand_code]/
│   │   │   │       │   └── 📄 page.tsx
│   │   │   │       └── 📄 StoreBrandView.tsx
│   │   │   ├── 📂 merchant-banners/ # Merchant banners (kebab-case)
│   │   │   │   ├── 📄 page.tsx
│   │   │   │   ├── 📄 StoreMerchantBanners.tsx
│   │   │   │   ├── 📂 create/
│   │   │   │   │   ├── 📄 page.tsx
│   │   │   │   │   └── 📄 CreateMerchantBanner.tsx
│   │   │   │   └── 📂 view/
│   │   │   │       ├── 📂 [merchant-b-uuid]/  # kebab-case route parameter
│   │   │   │       │   └── 📄 page.tsx
│   │   │   │       └── 📄 StoreMerchantBannerView.tsx
│   │   │   ├── 📂 merchant-categories/ # Merchant categories (kebab-case)
│   │   │   │   ├── 📄 page.tsx
│   │   │   │   ├── 📄 StoreMerchantCategories.tsx
│   │   │   │   ├── 📂 create/
│   │   │   │   │   ├── 📄 page.tsx
│   │   │   │   │   └── 📄 CreateMerchantCategory.tsx
│   │   │   │   └── 📂 view/
│   │   │   │       ├── 📂 [merchant-c-uuid]/  # kebab-case route parameter
│   │   │   │       │   └── 📄 page.tsx
│   │   │   │       └── 📄 StoreMerchantCategoryView.tsx
│   │   │   ├── 📂 merchants/        # Store merchants management
│   │   │   │   ├── 📄 page.tsx
│   │   │   │   ├── 📄 StoreMerchants.tsx
│   │   │   │   ├── 📂 create/
│   │   │   │   │   ├── 📄 page.tsx
│   │   │   │   │   └── 📄 CreateMerchant.tsx
│   │   │   │   └── 📂 view/
│   │   │   │       ├── 📂 [merchant_code]/
│   │   │   │       │   └── 📄 page.tsx
│   │   │   │       └── 📄 StoreMerchantView.tsx
│   │   │   └── 📄 layout.tsx        # Store layout wrapper
│   │   ├── 📂 blocks/              # Reusable page blocks/templates
│   │   │   ├── 📄 page.tsx
│   │   │   ├── 📄 BlocksDemo.tsx
│   │   │   └── 📄 [block_name]/
│   │   ├── 📂 pages/               # Static page templates
│   │   │   ├── 📄 page.tsx
│   │   │   ├── 📄 PagesDemo.tsx
│   │   │   ├── 📂 crud/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📂 empty/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📂 notfound/
│   │   │   │   └── 📄 page.tsx
│   │   │   └── 📂 timeline/
│   │   │       └── 📄 page.tsx
│   │   ├── 📂 uikit/               # UI Kit component demos
│   │   │   ├── 📄 page.tsx
│   │   │   ├── 📂 button/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📂 charts/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📂 file/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📂 floatlabel/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📂 formlayout/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📂 input/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📂 invalidstate/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📂 list/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📂 media/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📂 menu/
│   │   │   │   ├── 📄 page.tsx
│   │   │   │   ├── 📂 confirmation/
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   ├── 📂 payment/
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   └── 📂 seat/
│   │   │   │       └── 📄 page.tsx
│   │   │   ├── 📂 message/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📂 misc/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📂 overlay/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📂 panel/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📂 table/
│   │   │   │   └── 📄 page.tsx
│   │   │   └── 📂 tree/
│   │   │       └── 📄 page.tsx
│   │   ├── 📂 utilities/          # Utility pages
│   │   │   ├── 📄 page.tsx
│   │   │   └── 📂 icons/
│   │   │       └── 📄 page.tsx
│   │   ├── 📄 Dashboard.tsx        # Main dashboard page
│   │   ├── 📄 documentation.tsx   # Documentation page
│   │   ├── 📄 layout.tsx          # Main layout wrapper
│   │   └── 📄 page.tsx            # Root page (redirects to dashboard)
│   ├── 📂 api/                    # API routes (Next.js App Router)
│   │   └── 📄 upload.ts           # File upload endpoint
│   ├── 📄 layout.tsx              # Root layout configuration
│   ├── 📄 providers.tsx           # App providers (context, query client)
│   └── 📄 globals.css             # Global styles
├── 📂 components/                  # UI Layer - Global components only
│   ├── 📂 ui/                    # Atomic/UI components (reusable across app)
│   │   ├── 📄 ButtonDemo.tsx
│   │   ├── 📄 ChartDemo.tsx
│   │   ├── 📄 FloatLabelDemo.tsx
│   │   ├── 📄 FormLayoutDemo.tsx
│   │   ├── 📄 IconsDemo.tsx
│   │   ├── 📄 InputDemo.tsx
│   │   ├── 📄 InvalidStateDemo.tsx
│   │   ├── 📄 ListDemo.tsx
│   │   ├── 📄 MediaDemo.tsx
│   │   ├── 📄 MenuDemo.tsx
│   │   ├── 📄 MessageDemo.tsx
│   │   ├── 📄 MiscDemo.tsx
│   │   ├── 📄 OverlayDemo.tsx
│   │   ├── 📄 PanelDemo.tsx
│   │   ├── 📄 TableDemo.tsx
│   │   ├── 📄 TreeDemo.tsx
│   │   └── 📂 button/
│   │       └── 📄 ButtonDemo.module.scss
│   ├── 📂 common/                # Shared business components
│   │   └── 📄 HtmlEditor.tsx      # Rich text editor component
│   └── 📂 layout/                # Layout components + context
│       ├── 📄 AppConfig.tsx       # App configuration sidebar
│       ├── 📄 AppFooter.tsx       # Application footer
│       ├── 📄 AppMenu.tsx         # Main navigation menu
│       ├── 📄 AppMenuitem.tsx     # Individual menu item component
│       ├── 📄 AppSidebar.tsx      # Application sidebar
│       ├── 📄 AppTopbar.tsx       # Application top bar
│       ├── 📄 layout.tsx          # Main layout wrapper
│       ├── 📄 logo-gongaji.tsx    # Go Ngaji logo component
│       └── 📂 context/            # Layout context providers
│           ├── 📄 layoutcontext.tsx    # Layout state context
│           └── 📄 menucontext.tsx      # Menu state context
├── 📂 features/                   # Business Logic Layer (Domain Focused)
│   ├── 📂 articles/              # Article domain logic
│   │   ├── 📂 components/        # Article-specific UI components
│   │   │   ├── 📄 ArticleCard.tsx
│   │   │   ├── 📄 ArticleForm.tsx
│   │   │   ├── 📄 ArticleList.tsx
│   │   │   └── 📄 ArticlesList.tsx
│   │   ├── 📂 services/         # Article API services
│   │   │   └── 📄 articleService.js
│   │   └── 📂 types/            # Article TypeScript types
│   │       └── 📄 index.ts
│   ├── 📂 auth/                 # Authentication domain logic
│   │   ├── 📂 hooks/            # Authentication custom hooks
│   │   │   └── 📄 useAuth.ts
│   │   ├── 📂 services/         # Authentication API services
│   │   │   └── 📄 authService.js
│   │   └── 📂 types/            # Authentication TypeScript types
│   │       └── 📄 index.ts
│   └── 📂 store/                # Store domain logic
│       ├── 📂 components/       # Store-specific UI components
│       │   ├── 📄 StoreAddressForm.tsx
│       │   ├── 📄 StoreAddressList.tsx
│       │   ├── 📄 StoreBrandForm.tsx
│       │   ├── 📄 StoreBrandList.tsx
│       │   ├── 📄 StoreMerchantBannerDetails.tsx
│       │   ├── 📄 StoreMerchantBannerForm.tsx
│       │   ├── 📄 StoreMerchantBannerList.tsx
│       │   ├── 📄 StoreMerchantCategoryDetails.tsx
│       │   ├── 📄 StoreMerchantCategoryForm.tsx
│       │   ├── 📄 StoreMerchantCategoryList.tsx
│       │   ├── 📄 StoreMerchantForm.tsx
│       │   └── 📄 StoreMerchantList.tsx
│       ├── 📂 services/         # Store API services
│       │   └── 📄 storeService.js
│       └── 📂 types/            # Store TypeScript types
│           └── 📄 index.ts
├── 📂 utils/                    # Data Access & Cross-cutting Concerns
│   ├── 📄 api.ts               # Axios API client configuration
│   ├── 📄 constants.ts         # Application-wide constants
│   ├── 📄 helpers.ts           # General utility functions
│   └── 📄 validators.ts        # Form validation utilities
├── 📂 types/                    # Global TypeScript Types
│   ├── 📄 index.d.ts          # Global type definitions
│   ├── 📄 layout.d.ts         # Layout-specific types
│   └── 📄 demo.d.ts           # Demo component types
├── 📂 hooks/                    # Global Custom Hooks
│   ├── 📄 useLocalStorage.ts   # Local storage hook
│   ├── 📄 useWindowSize.ts     # Window size hook
│   └── 📄 useDebounce.ts      # Debounce hook
├── 📂 demo/                     # Demo components & services
│   ├── 📂 service/             # Demo API services
│   │   ├── 📄 CountryService.js
│   │   ├── 📄 CustomerService.js
│   │   ├── 📄 IconService.js
│   │   ├── 📄 NodeService.js
│   │   ├── 📄 PhotoService.js
│   │   └── 📄 ProductService.js
│   └── 📂 data/                # Demo data files
│       ├── 📄 cars.json
│       ├── 📄 customers.json
│       ├── 📄 icons.json
│       ├── 📄 nodes.json
│       ├── 📄 photos.json
│       └── 📄 products.json
├── 📂 styles/                   # Global Styles
│   ├── 📄 globals.scss        # Global SCSS styles
│   ├── 📄 variables.scss      # SCSS variables
│   ├── 📂 layout/             # Layout-specific styles
│   │   └── 📄 layout.scss
│   └── 📂 demo/               # Demo component styles
│       └── 📄 Demos.scss
└── 📂 public/                  # Static Assets
    ├── 📂 images/             # Image assets
    │   ├── 📂 layout/
    │   └── 📂 users/
    ├── 📂 icons/              # Icon assets
    ├── 📄 favicon.ico         # Site favicon
    └── 📄 next.svg            # Next.js logo
```

---

## 🎯 Layer Responsibilities

### 1. Presentation Layer (`app/`)

**Purpose**: Menangani UI dan routing
**Contains**:
- Pages dan layouts
- API routes untuk Next.js
- Route handlers

**Rules**:
- Jangan mengandung business logic
- Hanya memanggil hooks dan services dari layer lain
- Handle UI state dan user interactions

### 2. Business Logic Layer (`features/`)

**Purpose**: Mengandung domain logic dan business rules
**Contains**:
- Domain-specific types
- Custom hooks
- API services
- Business utilities

**Rules**:
- Tidak dependent pada UI framework
- Mengandung pure functions
- Handle data transformation dan validation

### 3. Data Layer (`utils/`)

**Purpose**: Handle external communication dan utilities
**Contains**:
- API client configuration
- Global constants
- Utility functions
- Data transformers

**Rules**:
- Tidak mengandung business logic
- Handle HTTP requests/responses
- Provide reusable utilities

### 4. Shared Layer (`components/`, `types/`, `hooks/`)

**Purpose**: Reusable components, global types, dan utilities
**Contains**:
- UI components
- Layout components
- Global TypeScript types
- Custom hooks

**Rules**:
- Components harus reusable
- Types harus domain-agnostic
- Layout components handle structure only
- Hooks harus composable dan reusable

---

## 🔄 Data Flow Pattern

```
User Interaction → Page (app/) → Custom Hook (features/) → API Service (features/) → API Client (utils/) → External API
                    ↓
                UI State ← Component ← Hook Response ← Service Response ← API Response
```

### 🔧 Data Transformation Layer

**API Response Transformation**:
- **API Fields**: `snake_case` (e.g., `article_title`, `merchant_banner_id`)
- **TypeScript**: `camelCase` (e.g., `articleTitle`, `merchantBannerId`)
- **Auto-transform**: Handled di `utils/api.ts` dengan response interceptor

**Example Transformation**:
```typescript
// utils/api.ts - Response interceptor
api.interceptors.response.use((response) => {
  // Auto-transform snake_case to camelCase
  return {
    ...response,
    data: camelizeKeys(response.data)
  };
});
```

### Example Flow: Get Articles

1. **Page Layer**: `app/(main)/articles/page.tsx`
   ```typescript
   const { articles, loading, error } = useArticles();
   ```

2. **Hook Layer**: `features/articles/hooks/useArticles.ts`
   ```typescript
   const { data, loading, error } = useQuery({
     queryKey: ['articles'],
     queryFn: () => articleService.getArticles()
   });
   ```

3. **Service Layer**: `features/articles/services/articleService.ts`
   ```typescript
   export const getArticles = async (params) => {
     const response = await api.get('/articles', { params });
     // Data already transformed to camelCase
     return response.data;
   };
   ```

4. **API Client**: `utils/api.ts`
   ```typescript
   // Axios configuration with auth headers + auto-transform
   ```

---

## 📝 Naming Conventions

### Files
- **Pages**: `kebab-case.tsx` (e.g., `article-categories.tsx`)
- **Components**: `PascalCase.tsx` (e.g., `ArticleCard.tsx`)
- **Hooks**: `camelCase.ts` (e.g., `useArticles.ts`)
- **Services**: `camelCase.ts` (e.g., `articleService.ts`)
- **Types**: `camelCase.ts` (e.g., `index.ts`)

### Folders
- **Features**: Domain names (e.g., `articles/`, `auth/`)
- **Components**: Category names (e.g., `ui/`, `common/`, `layout/`)
- **Multi-word folders**: kebab-case (e.g., `merchant-banners`, `merchant-categories`, `article-view`)
- **Utils**: Functionality names (e.g., `api/`, `helpers/`)

### Variables
- **API Fields**: `snake_case` (e.g., `article_title`)
- **TypeScript**: `camelCase` (e.g., `articleTitle`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `BASE_URL_ARTICLE`)

---

## 🏗️ Adding New Features

### 1. Create Feature Structure
```
features/
└── new-feature/
    ├── types/
    │   └── index.ts
    ├── hooks/
    │   └── useNewFeature.ts
    ├── services/
    │   └── newFeatureService.ts
    └── utils/
        └── helpers.ts
```

### 2. Define Types
```typescript
// features/new-feature/types/index.ts
export type NewFeature = {
  id: string;
  name: string;
  created_at: string;
};
```

### 3. Create Service
```typescript
// features/new-feature/services/newFeatureService.ts
import api from '@/utils/api';

export const newFeatureService = {
  getAll: async () => {
    const response = await api.get('/new-feature');
    return response.data;
  },
  
  create: async (data) => {
    const response = await api.post('/new-feature', data);
    return response.data;
  }
};
```

### 4. Create Hook
```typescript
// features/new-feature/hooks/useNewFeature.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { newFeatureService } from '../services/newFeatureService';

export const useNewFeature = () => {
  const { data, loading, error } = useQuery({
    queryKey: ['new-feature'],
    queryFn: newFeatureService.getAll
  });

  return { data, loading, error };
};
```

### 5. Create Page
```typescript
// app/(main)/new-feature/page.tsx
import { useNewFeature } from '@/features/new-feature/hooks/useNewFeature';

export default function NewFeaturePage() {
  const { data, loading, error } = useNewFeature();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {/* UI Components */}
    </div>
  );
}
```

---

## 🎨 Component Architecture

### Atomic Design Pattern
```
components/
├── ui/                    # Atoms (Button, Input, ButtonDemo, ChartDemo)
├── common/                # Molecules (HtmlEditor, Complex Forms)
├── layout/                # Organisms (Header, Sidebar, Footer)
└── features/              # Feature-specific components (moved to features/)
```

### Component Rules
- **Single Responsibility**: Setiap component punya satu tujuan
- **Composition over Inheritance**: Gunakan composition
- **Props Interface**: Selalu define props interface
- **Default Exports**: Gunakan default export untuk components
- **Feature Components**: Harus di `features/[feature]/components/` bukan `components/`

---

## 🔧 Best Practices

### 1. Separation of Concerns
- Business logic di `features/`
- UI logic di `components/`
- Data fetching di `utils/api.ts`
- Layout components di `components/layout/`

### 2. Type Safety
- Selalu gunakan TypeScript
- Define types di `features/*/types/`
- Avoid `any` type
- Gunakan auto-transform untuk API responses

### 3. Error Handling
- Centralized error handling di API client
- Error boundaries di components
- User-friendly error messages

### 4. Performance
- Lazy loading untuk routes
- Memoization untuk expensive computations
- Proper dependency arrays di hooks

### 5. Import Patterns
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

---

*Folder Structure Documentation v1.0 - Last Updated: 2025*
