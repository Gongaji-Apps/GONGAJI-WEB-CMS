# ⚡ Quick Start Commands for AI

## 🚀 One-Command Setup

```bash
# Complete setup for new AI developer
pnpm install && pnpm dev
```

## 📋 Essential Commands

### Development
```bash
pnpm dev          # Start development server (http://localhost:3000)
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
```

### Testing
```bash
pnpm test         # Run all tests
pnpm test:watch   # Run tests in watch mode
pnpm test:coverage # Run tests with coverage report
```

### File Operations
```bash
# Create new feature structure
mkdir -p features/new-feature/{types,hooks,services,utils}

# Create new page
mkdir -p app/(main)/new-feature

# Create test structure
mkdir -p __tests__/{unit,integration,e2e}/{services,hooks,api,pages}
```

## 🔍 Debug Commands

### API Testing
```bash
# Test API endpoints
curl -X GET "https://gongaji-article-service-m3gra3glsq-et.a.run.app/articles" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Test authentication
curl -X POST "https://gongaji-authentication-service-m3gra3glsq-et.a.run.app/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"client_id":"cms-web","username":"admin","password":"password"}'
```

### Component Debugging
```bash
# Check component rendering
grep -r "ArticleCard" components/ app/

# Find type definitions
find . -name "*.ts" -exec grep -l "Article" {} \;
```

## 🎯 Common Tasks

### Add New API Endpoint
1. Define types in `features/domain/types/`
2. Create service in `features/domain/services/`
3. Create hook in `features/domain/hooks/`
4. Add page in `app/(main)/domain/`

### Add New Component
1. Create component in `components/ui/` or `components/forms/`
2. Add types if needed
3. Export in index file
4. Add tests in `__tests__/unit/components/`

### Fix TypeScript Errors
```bash
# Check TypeScript
npx tsc --noEmit

# Find specific type issues
grep -r "any" features/ --include="*.ts"
```

## 🛠️ Environment Setup

### Copy Environment Template
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

### Verify Services
```bash
# Test service connectivity
curl -I https://gongaji-authentication-service-m3gra3glsq-et.a.run.app/health
curl -I https://gongaji-article-service-m3gra3glsq-et.a.run.app/health
curl -I https://gongaji-store-service-m3gra3glsq-et.a.run.app/health
```

---

*Quick Start Commands v1.0 - Last Updated: 2025*
