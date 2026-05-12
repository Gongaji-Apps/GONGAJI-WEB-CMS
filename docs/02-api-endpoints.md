# 📡 API Endpoints Documentation

## 🔐 Authentication Service

Base URL: `https://gongaji-authentication-service-m3gra3glsq-et.a.run.app`

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "client_id": "cms-web",
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "access_token": "string",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

### Refresh Token
```http
POST /auth/refresh
Authorization: Bearer {token}
```

### Logout
```http
POST /auth/logout
Authorization: Bearer {token}
```

### Get User Profile
```http
GET /auth/profile
Authorization: Bearer {token}
```

---

## 📰 Article Service

Base URL: `https://gongaji-article-service-m3gra3glsq-et.a.run.app`

### Articles

#### Get All Articles
```http
GET /articles?page=1&limit=10&category=uuid&tag=uuid&status=published
Authorization: Bearer {token}
```

**Response:**
```json
{
  "data": [
    {
      "article_uuid": "string",
      "article_slug": "string",
      "article_title": "string",
      "article_description": "string",
      "article_author": "string",
      "article_content": "string",
      "article_category": "string",
      "article_status": "published|draft|archived",
      "article_image": "string",
      "article_date": "YYYY-MM-DDTHH:mm:ss.sssZ",
      "article_total_view": 0,
      "article_total_like": 0,
      "article_total_comment": 0,
      "article_total_share": 0,
      "category_uuid": "string|string[]",
      "tag_uuid": "string|string[]",
      "tag_name": "string",
      "article_source": "string",
      "article_source_url": "string"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "total_pages": 10
  }
}
```

#### Get Article by Slug
```http
GET /articles/{slug}
Authorization: Bearer {token}
```

#### Create Article
```http
POST /articles
Authorization: Bearer {token}
Content-Type: application/json

{
  "article_slug": "string",
  "article_title": "string",
  "article_description": "string",
  "article_author": "string",
  "article_content": "string",
  "article_category": "string",
  "article_status": "published|draft",
  "article_image": "string",
  "category_uuid": "string|string[]",
  "tag_uuid": "string|string[]",
  "article_source": "string",
  "article_source_url": "string"
}
```

#### Update Article
```http
PUT /articles/{uuid}
Authorization: Bearer {token}
Content-Type: application/json

{
  "article_title": "string",
  "article_description": "string",
  "article_content": "string",
  "article_status": "published|draft",
  "article_image": "string"
}
```

#### Delete Article
```http
DELETE /articles/{uuid}
Authorization: Bearer {token}
```

### Categories

#### Get All Categories
```http
GET /categories?active=true
Authorization: Bearer {token}
```

**Response:**
```json
{
  "data": [
    {
      "category_uuid": "string",
      "category_name": "string",
      "category_description": "string",
      "category_active": true
    }
  ]
}
```

#### Create Category
```http
POST /categories
Authorization: Bearer {token}
Content-Type: application/json

{
  "category_name": "string",
  "category_description": "string",
  "category_active": true
}
```

#### Update Category
```http
PUT /categories/{uuid}
Authorization: Bearer {token}
Content-Type: application/json

{
  "category_name": "string",
  "category_description": "string",
  "category_active": true
}
```

#### Delete Category
```http
DELETE /categories/{uuid}
Authorization: Bearer {token}
```

### Tags

#### Get All Tags
```http
GET /tags?active=true
Authorization: Bearer {token}
```

**Response:**
```json
{
  "data": [
    {
      "tag_uuid": "string",
      "tag_name": "string",
      "tag_description": "string",
      "tag_active": true
    }
  ]
}
```

#### Create Tag
```http
POST /tags
Authorization: Bearer {token}
Content-Type: application/json

{
  "tag_name": "string",
  "tag_description": "string",
  "tag_active": true
}
```

#### Update Tag
```http
PUT /tags/{uuid}
Authorization: Bearer {token}
Content-Type: application/json

{
  "tag_name": "string",
  "tag_description": "string",
  "tag_active": true
}
```

#### Delete Tag
```http
DELETE /tags/{uuid}
Authorization: Bearer {token}
```

---

## 🏪 Store Service

Base URL: `https://gongaji-store-service-m3gra3glsq-et.a.run.app`

### Upload File
```http
POST /upload
Authorization: Bearer {token}
Content-Type: multipart/form-data

file: File
```

**Response:**
```json
{
  "url": "string",
  "filename": "string",
  "size": 1024,
  "mime_type": "image/jpeg"
}
```

---

## 🚨 Error Responses

All endpoints return consistent error format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {}
  }
}
```

### Common Error Codes:
- `UNAUTHORIZED` (401): Invalid or missing token
- `FORBIDDEN` (403): Insufficient permissions
- `NOT_FOUND` (404): Resource not found
- `VALIDATION_ERROR` (400): Invalid request data
- `INTERNAL_ERROR` (500): Server error

---

## 🔧 Internal API Routes

### Upload Route (Local)
```http
POST /api/upload
```

**Response:**
```json
{
  "name": "Fake Upload Process"
}
```

*Note: This is a mock endpoint for development*

---

## 📝 Usage Examples

### Using API Client
```typescript
import api from '@/utils/api';

// Get articles
const response = await api.get('/articles', {
  params: { page: 1, limit: 10 }
});

// Create article
const newArticle = await api.post('/articles', {
  article_title: 'New Article',
  article_content: 'Content here...',
  article_status: 'draft'
});
```

### Authentication Flow
```typescript
// Login
const loginResponse = await api.post('/auth/login', {
  client_id: 'cms-web',
  username: 'admin',
  password: 'password'
});

// Store token
const { access_token } = loginResponse.data;
Cookies.set('authToken', access_token);

// All subsequent requests will include the token automatically
```

---

*API Documentation v1.0 - Last Updated: 2025*
