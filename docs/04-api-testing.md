# 🧪 API Testing Guide

## 🎯 Testing Strategy

Proyek ini menggunakan pendekatan testing yang komprehensif untuk memastikan semua API endpoints berfungsi dengan benar. Testing dibagi menjadi 3 level:

1. **Unit Tests** - Testing individual functions dan services
2. **Integration Tests** - Testing API endpoints dengan mock server
3. **E2E Tests** - Testing user flow penuh

---

## 🛠️ Testing Tools & Setup

### Required Dependencies
```json
{
  "devDependencies": {
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^5.16.4",
    "jest": "^29.0.0",
    "jest-environment-jsdom": "^29.0.0",
    "msw": "^1.2.0",
    "@types/jest": "^29.0.0"
  }
}
```

### Install Commands
```bash
# Install testing dependencies
pnpm add -D @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom msw @types/jest

# Install for E2E testing
pnpm add -D playwright @playwright/test
```

---

## 📁 Testing Structure

```
__tests__/
├── unit/                    # Unit tests
│   ├── services/
│   │   ├── articleService.test.ts
│   │   ├── authService.test.ts
│   │   └── storeService.test.ts
│   ├── hooks/
│   │   ├── useArticles.test.ts
│   │   └── useAuth.test.ts
│   └── utils/
│       └── api.test.ts
├── integration/             # Integration tests
│   ├── api/
│   │   ├── articles.test.ts
│   │   ├── auth.test.ts
│   │   └── upload.test.ts
│   └── pages/
│       ├── articles.test.ts
│       └── login.test.ts
├── e2e/                    # E2E tests
│   ├── auth-flow.spec.ts
│   ├── article-management.spec.ts
│   └── file-upload.spec.ts
├── mocks/                  # Mock data & handlers
│   ├── handlers.ts
│   ├── data.ts
│   └── server.ts
└── setup/                  # Test setup files
    ├── jest.setup.js
    └── test-utils.tsx
```

---

## 🔧 Test Configuration

### Jest Configuration (`jest.config.js`)
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'features/**/*.{js,jsx,ts,tsx}',
    'utils/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}

module.exports = createJestConfig(customJestConfig)
```

### Test Setup (`__tests__/setup/jest.setup.js`)
```javascript
import '@testing-library/jest-dom'
import { server } from './mocks/server'

// Establish API mocking before all tests
beforeAll(() => server.listen())

// Reset any request handlers that are declared as a part of our tests
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished
afterAll(() => server.close())
```

---

## 🎭 Mock Server Setup (MSW)

### Mock Handlers (`__tests__/mocks/handlers.ts`)
```typescript
import { rest } from 'msw'

export const handlers = [
  // Auth handlers
  rest.post('https://gongaji-authentication-service-m3gra3glsq-et.a.run.app/auth/login', (req, res, ctx) => {
    const { username, password } = req.body as any
    
    if (username === 'admin' && password === 'password') {
      return res(
        ctx.status(200),
        ctx.json({
          access_token: 'mock-token-123',
          token_type: 'Bearer',
          expires_in: 3600
        })
      )
    }
    
    return res(
      ctx.status(401),
      ctx.json({
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid username or password'
        }
      })
    )
  }),

  // Article handlers
  rest.get('https://gongaji-article-service-m3gra3glsq-et.a.run.app/articles', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          {
            article_uuid: '1',
            article_slug: 'test-article',
            article_title: 'Test Article',
            article_description: 'Test Description',
            article_status: 'published',
            article_date: '2024-01-01T00:00:00.000Z',
            article_total_view: 100,
            article_total_like: 10,
            article_total_comment: 5,
            article_total_share: 2
          }
        ],
        pagination: {
          page: 1,
          limit: 10,
          total: 1,
          total_pages: 1
        }
      })
    )
  }),

  // Error handler
  rest.get('*', (req, res, ctx) => {
    console.error(`Unhandled request: ${req.method} ${req.url}`)
    return res(
      ctx.status(500),
      ctx.json({ error: { message: 'Unhandled request' } })
    )
  })
]
```

### Mock Server (`__tests__/mocks/server.ts`)
```typescript
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)
```

---

## 📝 Unit Tests Examples

### API Service Test (`__tests__/unit/services/articleService.test.ts`)
```typescript
import { articleService } from '@/features/articles/services/articleService'
import { server } from '../../mocks/server'
import { rest } from 'msw'

describe('ArticleService', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  describe('getArticles', () => {
    it('should fetch articles successfully', async () => {
      const result = await articleService.getArticles({ page: 1, limit: 10 })
      
      expect(result.data).toHaveLength(1)
      expect(result.data[0].article_title).toBe('Test Article')
      expect(result.pagination.page).toBe(1)
    })

    it('should handle API errors', async () => {
      server.use(
        rest.get(
          'https://gongaji-article-service-m3gra3glsq-et.a.run.app/articles',
          (req, res, ctx) => res(ctx.status(500))
        )
      )

      await expect(articleService.getArticles()).rejects.toThrow()
    })
  })

  describe('createArticle', () => {
    it('should create article successfully', async () => {
      const articleData = {
        article_title: 'New Article',
        article_content: 'Content here',
        article_status: 'draft'
      }

      const result = await articleService.createArticle(articleData)
      
      expect(result.article_title).toBe(articleData.article_title)
    })
  })
})
```

### Hook Test (`__tests__/unit/hooks/useArticles.test.ts`)
```typescript
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useArticles } from '@/features/articles/hooks/useArticles'

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
})

describe('useArticles', () => {
  it('should fetch articles successfully', async () => {
    const queryClient = createTestQueryClient()
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )

    const { result } = renderHook(() => useArticles(), { wrapper })

    await waitFor(() => {
      expect(result.current.data).toBeDefined()
      expect(result.current.data.data).toHaveLength(1)
    })
  })

  it('should handle loading state', () => {
    const queryClient = createTestQueryClient()
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )

    const { result } = renderHook(() => useArticles(), { wrapper })

    expect(result.current.loading).toBe(true)
  })
})
```

---

## 🔗 Integration Tests Examples

### API Endpoint Test (`__tests__/integration/api/articles.test.ts`)
```typescript
import { createMocks } from 'node-mocks-http'
import handler from '@/app/api/articles/route'

describe('/api/articles', () => {
  it('should return articles on GET request', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { page: '1', limit: '10' }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.data).toBeDefined()
    expect(Array.isArray(data.data)).toBe(true)
  })

  it('should create article on POST request', async () => {
    const articleData = {
      article_title: 'Test Article',
      article_content: 'Test Content'
    }

    const { req, res } = createMocks({
      method: 'POST',
      body: articleData
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(201)
    const data = JSON.parse(res._getData())
    expect(data.article_title).toBe(articleData.article_title)
  })

  it('should handle validation errors', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { article_title: '' } // Invalid data
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.error).toBeDefined()
  })
})
```

### Page Component Test (`__tests__/integration/pages/articles.test.ts`)
```typescript
import { render, screen, waitFor } from '@testing-library/react'
import ArticlesPage from '@/app/(main)/articles/page'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
})

describe('ArticlesPage', () => {
  it('should render articles list', async () => {
    const queryClient = createTestQueryClient()
    
    render(
      <QueryClientProvider client={queryClient}>
        <ArticlesPage />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Test Article')).toBeInTheDocument()
    })
  })

  it('should show loading state', () => {
    const queryClient = createTestQueryClient()
    
    render(
      <QueryClientProvider client={queryClient}>
        <ArticlesPage />
      </QueryClientProvider>
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should show error state', async () => {
    const queryClient = createTestQueryClient()
    
    render(
      <QueryClientProvider client={queryClient}>
        <ArticlesPage />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument()
    })
  })
})
```

---

## 🎭 E2E Tests Examples (Playwright)

### Auth Flow Test (`__tests__/e2e/auth-flow.spec.ts`)
```typescript
import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    await page.goto('/login')
    
    await page.fill('[data-testid=username-input]', 'admin')
    await page.fill('[data-testid=password-input]', 'password')
    await page.click('[data-testid=login-button]')
    
    await expect(page).toHaveURL('/dashboard')
    await expect(page.locator('[data-testid=user-menu]')).toBeVisible()
  })

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto('/login')
    
    await page.fill('[data-testid=username-input]', 'invalid')
    await page.fill('[data-testid=password-input]', 'invalid')
    await page.click('[data-testid=login-button]')
    
    await expect(page.locator('[data-testid=error-message]')).toContainText('Invalid credentials')
  })

  test('should logout successfully', async ({ page }) => {
    // Login first
    await page.goto('/login')
    await page.fill('[data-testid=username-input]', 'admin')
    await page.fill('[data-testid=password-input]', 'password')
    await page.click('[data-testid=login-button]')
    
    // Then logout
    await page.click('[data-testid=user-menu]')
    await page.click('[data-testid=logout-button]')
    
    await expect(page).toHaveURL('/login')
  })
})
```

### Article Management Test (`__tests__/e2e/article-management.spec.ts`)
```typescript
import { test, expect } from '@playwright/test'

test.describe('Article Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login')
    await page.fill('[data-testid=username-input]', 'admin')
    await page.fill('[data-testid=password-input]', 'password')
    await page.click('[data-testid=login-button]')
    await expect(page).toHaveURL('/dashboard')
  })

  test('should create new article', async ({ page }) => {
    await page.goto('/articles/new')
    
    await page.fill('[data-testid=title-input]', 'Test Article Title')
    await page.fill('[data-testid=description-input]', 'Test Description')
    await page.fill('[data-testid=content-editor]', 'Test Content')
    
    await page.click('[data-testid=save-button]')
    
    await expect(page.locator('[data-testid=success-message]')).toBeVisible()
    await expect(page).toHaveURL(/\/articles\/.*/)
  })

  test('should edit existing article', async ({ page }) => {
    await page.goto('/articles')
    await page.click('[data-testid=edit-article-1]')
    
    await page.fill('[data-testid=title-input]', 'Updated Title')
    await page.click('[data-testid=save-button]')
    
    await expect(page.locator('[data-testid=success-message]')).toBeVisible()
    await expect(page.locator('[data-testid=title-input]')).toHaveValue('Updated Title')
  })

  test('should delete article', async ({ page }) => {
    await page.goto('/articles')
    
    await page.click('[data-testid=delete-article-1]')
    await page.click('[data-testid=confirm-delete]')
    
    await expect(page.locator('[data-testid=success-message]')).toBeVisible()
    await expect(page.locator('[data-testid=article-1]')).not.toBeVisible()
  })
})
```

---

## 🚀 Running Tests

### Package Scripts
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:integration": "jest --testPathPattern=integration",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug"
  }
}
```

### Commands
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run only integration tests
pnpm test:integration

# Run E2E tests
pnpm test:e2e

# Run E2E tests with UI
pnpm test:e2e:ui

# Debug E2E tests
pnpm test:e2e:debug
```

---

## 📊 Coverage Reports

Coverage reports akan dihasilkan di `coverage/` folder. Buka `coverage/lcov-report/index.html` untuk melihat detail coverage.

### Coverage Thresholds
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%
- **Statements**: 80%

---

## 🔧 Test Utilities

### Test Utils (`__tests__/setup/test-utils.tsx`)
```typescript
import { ReactElement } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, RenderOptions } from '@testing-library/react'

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
})

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
```

---

## 📱 QR Service — Manual / Postman

QR di CMS **read-only** dan harus selaras dengan koleksi Postman **GONGAJI [PRODUCTION]** → folder **QR**.

### Environment (Postman)

| Variable | Contoh nilai |
|----------|----------------|
| `base_url_qr` | `https://gongaji-qr-service-396261734950.asia-southeast2.run.app` |
| `base_url_qr_book` | Sama dengan `base_url_qr` (kecuali backend memisahkan host) |
| `token` | Bearer dari login authentication |

### Headers

```http
Authorization: Bearer {{token}}
Version: V3
```

### Checklist endpoint

| Request Postman | Verifikasi CMS |
|-----------------|----------------|
| `GET {{base_url_qr}}/v1/book/get` | Menu **QR Books** terisi |
| `GET {{base_url_qr}}/v1/content/get` (tanpa query) | **QR Contents**, default Semua buku, total ~`data_total` |
| `GET .../v1/content/get?content_book=X&page=2` | Filter buku + pagination |
| `GET {{base_url_qr}}/v1/series/get` | **QR Series** |
| `GET {{base_url_qr}}/v1/group/get` | **QR Groups** |
| `GET {{base_url_qr_book}}/v1/content/get-playlist?content_book=X` | **QR Playlist** (gagal 404 = backend belum deploy route) |

### CMS vs Postman (dev)

1. Login CMS → cookie `authToken` (setara `{{token}}`).
2. Buka DevTools → Network: request ke `/api/qr/v1/...`, bukan langsung ke `*.run.app`.
3. Jika **Network Error** / CORS: pastikan memakai proxy `/api/*` dan host `localhost:3000`.
4. Setelah ubah `.env.local`: `rm -rf .next && pnpm dev`.

### Troubleshooting

| Gejala | Penyebab umum |
|--------|----------------|
| Tabel QR kosong | Belum login / token expired (401) |
| Postman 200, CMS kosong | Dulu CMS wajib `content_book`; sekarang default tanpa filter — pastikan build terbaru |
| Playlist 404 | Route `get-playlist` belum ada di upstream production |
| 401 di Postman | Header `Authorization` atau `Version` belum diset |

---

## 🎯 Best Practices

### 1. Test Naming
- Use descriptive test names
- Follow `should [expected behavior] when [condition]` pattern
- Group related tests with `describe`

### 2. Test Structure
- Arrange-Act-Assert pattern
- Use meaningful test data
- Avoid testing implementation details

### 3. Mocking Strategy
- Mock external APIs
- Use MSW for API mocking
- Mock only what's necessary

### 4. Assertions
- Use specific assertions
- Test both success and error cases
- Verify UI changes, not just state

### 5. Performance
- Keep tests fast and isolated
- Use appropriate test levels
- Avoid unnecessary setup/teardown

---

## 🚨 Common Issues & Solutions

### 1. Async Testing
```typescript
// ❌ Wrong
expect(result.current.data).toHaveLength(1)

// ✅ Right
await waitFor(() => {
  expect(result.current.data).toHaveLength(1)
})
```

### 2. Mock Reset
```typescript
// Always reset mocks between tests
afterEach(() => {
  jest.clearAllMocks()
  server.resetHandlers()
})
```

### 3. Test Isolation
```typescript
// Use fresh query client for each test
const createTestQueryClient = () => new QueryClient({
  defaultOptions: { queries: { retry: false } }
})
```

---

*API Testing Guide v1.1 - Last Updated: June 2026*
