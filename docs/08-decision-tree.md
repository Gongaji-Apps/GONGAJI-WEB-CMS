# 🌳 AI Decision Tree for Problem Solving

## 🎯 Main Decision Flow

### START: User Request Analysis
```
┌─────────────────────────────────────┐
│         What does user want?        │
└─────────────────────────────────────┘
                    │
    ┌───────────────┼───────────────┐
    │               │               │
New Feature    Bug Fix      Enhancement
    │               │               │
    ▼               ▼               ▼
```

---

## 🚀 New Feature Branch

```
New Feature Request
        │
        ▼
┌─────────────────────┐
│ Is it CRUD related? │
└─────────────────────┘
        │
    ┌───┴───┐
    │       │
   Yes     No
    │       │
    ▼       ▼
┌─────────┐ ┌─────────────┐
│Use CRUD │ │Check similar│
│Template │ │features     │
└─────────┘ └─────────────┘
    │           │
    ▼           ▼
┌─────────┐ ┌─────────────┐
│Generate │ │Adapt pattern│
│code     │ │from existing│
└─────────┘ └─────────────┘
```

### CRUD Feature Sub-Tree
```
CRUD Feature
        │
        ▼
┌─────────────────────┐
│ Which domain?       │
│ (articles, auth,    │
│  store, new?)       │
└─────────────────────┘
        │
    ┌───┴───┐
    │       │
Existing  New
Domain   Domain
    │       │
    ▼       ▼
┌─────────┐ ┌─────────────┐
│Add to   │ │Create new   │
│existing │ │domain folder│
│folder   │ │structure    │
└─────────┘ └─────────────┘
```

---

## 🐛 Bug Fix Branch

```
Bug Fix Request
        │
        ▼
┌─────────────────────┐
│   Error type?       │
└─────────────────────┘
    │       │       │
    ▼       ▼       ▼
┌─────────┐ ┌─────────┐ ┌─────────┐
│Runtime  │ │TypeScript│ │Logic    │
│Error    │ │Error    │ │Error    │
└─────────┘ └─────────┘ └─────────┘
    │       │       │
    ▼       ▼       ▼
┌─────────┐ ┌─────────┐ ┌─────────┐
│Check    │ │Add      │ │Review   │
│console  │ │types    │ │logic    │
│logs     │ │         │ │         │
└─────────┘ └─────────┘ └─────────┘
```

### Runtime Error Sub-Tree
```
Runtime Error
        │
        ▼
┌─────────────────────┐
│   Where is error?    │
└─────────────────────┘
    │       │       │
    ▼       ▼       ▼
┌─────────┐ ┌─────────┐ ┌─────────┐
│API      │ │Component│ │Hook     │
│Call     │ │Render   │ │Logic    │
└─────────┘ └─────────┘ └─────────┘
    │       │       │
    ▼       ▼       ▼
┌─────────┐ ┌─────────┐ ┌─────────┐
│Check    │ │Debug    │ │Add      │
│network  │ │props    │ │console  │
│tab      │ │         │ │logs     │
└─────────┘ └─────────┘ └─────────┘
```

---

## 🔧 Enhancement Branch

```
Enhancement Request
        │
        ▼
┌─────────────────────┐
│   What to improve?  │
└─────────────────────┘
    │       │       │
    ▼       ▼       ▼
┌─────────┐ ┌─────────┐ ┌─────────┐
│UI/UX    │ │Performance│ │New      │
│Changes  │ │         │ │Feature  │
└─────────┘ └─────────┘ └─────────┘
    │       │       │
    ▼       ▼       ▼
┌─────────┐ ┌─────────┐ ┌─────────┐
│Update   │ │Profile   │ │Follow   │
│components│ │code     │ │new      │
│         │ │         │ │feature  │
│         │ │         │ │flow     │
└─────────┘ └─────────┘ └─────────┘
```

---

## 🧪 Testing Decision Tree

```
Testing Need
        │
        ▼
┌─────────────────────┐
│   What to test?     │
└─────────────────────┘
    │       │       │
    ▼       ▼       ▼
┌─────────┐ ┌─────────┐ ┌─────────┐
│New      │ │Bug Fix  │ │Existing │
│Feature  │ │         │ │Code     │
└─────────┘ └─────────┘ └─────────┘
    │       │       │
    ▼       ▼       ▼
┌─────────┐ ┌─────────┐ ┌─────────┐
│Write    │ │Add      │ │Run      │
│full     │ │regression│ │existing │
│test     │ │test     │ │tests    │
│suite    │ │         │ │         │
└─────────┘ └─────────┘ └─────────┘
```

---

## 🚨 Emergency Decision Tree

```
Critical Issue
        │
        ▼
┌─────────────────────┐
│   Issue severity?   │
└─────────────────────┘
    │       │       │
    ▼       ▼       ▼
┌─────────┐ ┌─────────┐ ┌─────────┐
│Critical │ │High     │ │Medium   │
│(Production)│ │         │ │         │
└─────────┘ └─────────┘ └─────────┘
    │       │       │
    ▼       ▼       ▼
┌─────────┐ ┌─────────┐ ┌─────────┐
│Hotfix   │ │Schedule │ │Add to   │
│immediate│ │fix      │ │backlog  │
│         │ │         │ │         │
└─────────┘ └─────────┘ └─────────┘
```

---

## 📊 API Decision Tree

```
API Related Task
        │
        ▼
┌─────────────────────┐
│   API task type?    │
└─────────────────────┘
    │       │       │
    ▼       ▼       ▼
┌─────────┐ ┌─────────┐ ┌─────────┐
│New      │ │Modify   │ │Debug    │
│Endpoint │ │Existing │ │API      │
└─────────┘ └─────────┘ └─────────┘
    │       │       │
    ▼       ▼       ▼
┌─────────┐ ┌─────────┐ ┌─────────┐
│Check    │ │Update   │ │Test with │
│docs     │ │service  │ │curl/Postman│
└─────────┘ └─────────┘ └─────────┘
```

---

## 🎨 UI Component Decision Tree

```
UI Component Task
        │
        ▼
┌─────────────────────┐
│   Component type?   │
└─────────────────────┘
    │       │       │
    ▼       ▼       ▼
┌─────────┐ ┌─────────┐ ┌─────────┐
│Form     │ │List     │ │Layout   │
│Component│ │Component│ │Component│
└─────────┘ └─────────┘ └─────────┘
    │       │       │
    ▼       ▼       ▼
┌─────────┐ ┌─────────┐ ┌─────────┐
│Use form │ │Use data │ │Check    │
│template │ │table    │ │layout   │
│         │ │template │ │patterns │
└─────────┘ └─────────┘ └─────────┘
```

---

## 🔍 Quick Reference Decision Matrix

| Situation | First Action | Template | Time Estimate |
|-----------|--------------|----------|---------------|
| New CRUD Feature | Check existing patterns | CRUD Template | 20-30 min |
| Bug in API | Test endpoint manually | Debug Template | 10-15 min |
| UI Issue | Check component props | Component Debug | 5-10 min |
| TypeScript Error | Add missing types | Type Fix | 5-10 min |
| Performance Issue | Profile code | Performance Fix | 15-25 min |
| New Page | Copy existing page | Page Template | 10-15 min |
| Form Component | Use form template | Form Template | 15-20 min |

---

## 🎯 Decision Questions (Ask Yourself)

### Before Starting:
1. **Have I seen this before?** → Look for similar patterns
2. **Is there a template?** → Use code templates
3. **What's the scope?** → Estimate time accurately
4. **Are tests needed?** → Plan testing approach

### During Development:
1. **Is this working?** → Test frequently
2. **Am I following patterns?** → Check existing code
3. **Are types correct?** → TypeScript check
4. **Is error handling present?** → Add error boundaries

### Before Completion:
1. **Does it match requirements?** → Review user request
2. **Are tests passing?** → Run test suite
3. **Is code formatted?** → Run linter
4. **Is documentation updated?** → Update docs

---

## 🚀 Speed Optimization Rules

### Rule 1: Template First
```
Need code? → Check templates → Adapt → Customize
```

### Rule 2: Pattern Recognition
```
Similar feature? → Copy pattern → Modify → Test
```

### Rule 3: Progressive Enhancement
```
Basic version → Add features → Optimize → Document
```

### Rule 4: Test-Driven
```
Write test → Implement → Refactor → Document
```

---

## 🔄 Loop Detection (Avoid Getting Stuck)

### If you're spending >10 minutes on something:
1. **Stop** → Take a step back
2. **Ask**: Is there a template?
3. **Search**: Has this been solved?
4. **Simplify**: Can I do this differently?
5. **Ask for help**: Document the issue

### Common Time Traps:
- Perfecting code before testing
- Reinventing existing patterns
- Over-engineering simple solutions
- Not using templates
- Not asking for clarification

---

## 🎯 Success Indicators

### ✅ Good Decisions:
- Used existing templates
- Followed established patterns
- Tests pass quickly
- Code is maintainable
- Documentation is updated

### ❌ Bad Decisions:
- Ignored existing patterns
- Created unnecessary complexity
- No tests written
- Code doesn't follow conventions
- No documentation

---

*Decision Tree v1.0 - Last Updated: 2025*
