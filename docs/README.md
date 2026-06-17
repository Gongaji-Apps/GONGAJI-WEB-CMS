# 📚 AI Developer Documentation Hub

## 🎯 Quick Start for AI

**New to this project? Start here:** [01-ai-developer-README.md](./01-ai-developer-README.md)

---

## 📋 Documentation Index

### 🚀 Getting Started
- [**01. AI Developer README**](./01-ai-developer-README.md) - Main overview and setup guide
- [**05. Quick Start Commands**](./05-quick-start-commands.md) - Essential commands and shortcuts

### 📡 API & Architecture  
- [**02. API Endpoints**](./02-api-endpoints.md) - Complete API documentation (termasuk **QR Service** & proxy `/api/qr`)
- [**03. Folder Structure**](./03-folder-structure.md) - Clean architecture guide (termasuk `features/qr`, `app/(main)/qr`)

### 🧪 Testing & Quality
- [**04. API Testing**](./04-api-testing.md) - Comprehensive testing strategies

### 🤖 AI Workflow & Patterns
- [**06. AI Development Workflow**](./06-ai-development-workflow.md) - Decision making framework
- [**07. Code Templates**](./07-code-templates.md) - Ready-to-use templates
- [**08. Decision Tree**](./08-decision-tree.md) - Problem solving flowcharts
- [**09. Code Patterns**](./09-code-patterns.md) - Common code patterns

---

## ⚡ AI Quick Reference

### 🎯 5-Minute Setup
```bash
pnpm install && pnpm dev
```

### 🚀 Common Tasks
| Task | Documentation | Time |
|------|---------------|------|
| New CRUD Feature | [Templates](./07-code-templates.md) | 20 min |
| Bug Fix | [Decision Tree](./08-decision-tree.md) | 15 min |
| API Integration | [API Docs](./02-api-endpoints.md) | 15 min |
| Testing | [Testing Guide](./04-api-testing.md) | 10 min |
| Folder Structure | [Folder Structure](./03-folder-structure.md) | 5 min |

### 🧠 AI Thinking Process
1. **Understand** → Read relevant docs
2. **Plan** → Use decision tree  
3. **Implement** → Use templates
4. **Test** → Follow testing guide
5. **Document** → Update if needed

### 📁 Key Structure Updates
- ✅ Layout merged into `components/layout/`
- ✅ Kebab-case folder naming (`merchant-banners`, `merchant-categories`)
- ✅ Feature components in `features/[feature]/components/`
- ✅ Import patterns updated
- ✅ **QR module**: browse books/contents/series/groups/playlist via `/api/qr` proxy (selaras Postman)

---

## 🎯 Success Metrics

### Speed Targets:
- ✅ New Feature: < 30 minutes
- ✅ Bug Fix: < 15 minutes  
- ✅ API Integration: < 20 minutes
- ✅ Component: < 12 minutes
- ✅ Folder Structure: < 5 minutes

### Quality Standards:
- ✅ All tests pass
- ✅ No TypeScript errors
- ✅ Follows patterns
- ✅ Documentation updated
- ✅ Clean architecture maintained

---

## 🔄 Documentation Usage

### For New AI Developers:
1. Read [AI Developer README](./01-ai-developer-README.md) first
2. Use [Quick Start Commands](./05-quick-start-commands.md) for setup
3. Reference [Decision Tree](./08-decision-tree.md) for problem solving

### For Feature Development:
1. Check [Code Templates](./07-code-templates.md) first
2. Follow [Folder Structure](./03-folder-structure.md) for organization
3. Use [API Documentation](./02-api-endpoints.md) for integration

### For Bug Fixes:
1. Use [Decision Tree](./08-decision-tree.md) to approach systematically
2. Reference [Code Patterns](./09-code-patterns.md) for solutions
3. Follow [Testing Guide](./04-api-testing.md) for verification

---

## 🚨 Emergency Procedures

### If API is Down:
1. Use mock data (see [Testing Guide](./04-api-testing.md))
2. Implement loading states
3. Document the issue

### If Stuck > 10 Minutes:
1. Check [Decision Tree](./08-decision-tree.md)
2. Look for similar patterns in codebase
3. Use [Code Templates](./07-code-templates.md)
4. Ask for clarification

---

## 📈 Continuous Improvement

This documentation evolves with the project. After completing tasks:

- [x] Updated folder structure documentation
- [x] QR API, proxy routes, Postman checklist (June 2026)
- [x] Added kebab-case naming conventions
- [x] Updated import patterns
- [ ] Update templates with new patterns
- [ ] Add new decision paths to tree
- [ ] Record time savings
- [ ] Enhance troubleshooting guides

---

*AI Documentation Hub v1.2 - Last Updated: June 2026*
