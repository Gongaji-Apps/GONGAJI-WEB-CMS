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

## 📱 QR Service

**Upstream (Postman `{{base_url_qr}}`):**  
`https://gongaji-qr-service-396261734950.asia-southeast2.run.app`

**CMS client base:** `/api/qr` (proxy → upstream)

**Headers (semua request QR):**

```http
Authorization: Bearer {token}
Version: V3
```

**Response envelope (umum):**

```json
{
  "status_code": 200,
  "status": true,
  "message": "Permintaan berhasil diproses.",
  "data": [],
  "data_total": 0,
  "pagination": {
    "current": 1,
    "next": 2,
    "total": 1,
    "last": false
  },
  "version_status": "allow"
}
```

Service layer: `features/qr/services/qrService.js`

### Books

```http
GET /v1/book/get
GET /v1/book/get?book_code=MUHAMMAD-TELADAN-SEPANJANG-ZAMAN
GET /v1/book/get?book_group=QR-BOOK
```

| Query | Keterangan |
|-------|------------|
| `book_code` | Filter satu buku |
| `book_group` | Filter grup buku |

**CMS:** `/qr/books`, detail `/qr/books/view/[book_code]`

### Contents

```http
GET /v1/content/get
GET /v1/content/get?page=1
GET /v1/content/get?content_book=150KATA&page=2
GET /v1/content/get?content_qrcode=01
GET /v1/content/get?content_uuid={uuid}
```

| Query | Keterangan |
|-------|------------|
| *(kosong)* | Semua konten (Postman default; ~24k+ records, paginated) |
| `page` | Halaman server (CMS: 100 baris/halaman) |
| `content_book` | Filter per buku (opsional di CMS) |
| `content_qrcode` | Filter QR code |
| `content_uuid` | Satu record (dipakai detail view) |

**CMS:** `/qr/contents` — default **Semua buku**; filter buku & qrcode opsional; lazy pagination.

Detail: `/qr/contents/view/[content_uuid]?content_book=...` (query book opsional, mempercepat lookup).

### Series

```http
GET /v1/series/get
GET /v1/series/get?series_book=MUHAMMAD-TELADAN-SEPANJANG-ZAMAN
GET /v1/series/get?series_code=MUHAMMAD-TELADAN-SEPANJANG-ZAMAN-1
```

| Query | Keterangan |
|-------|------------|
| `series_book` | Series milik buku tertentu |
| `series_code` | Satu series |

**CMS:** `/qr/series`

### Groups

```http
GET /v1/group/get
```

**CMS:** `/qr/groups`

### Content playlist (QR Book)

**Upstream (Postman `{{base_url_qr_book}}`):** sama host default, path terpisah di CMS proxy `/api/qr-book`.

```http
GET /v1/content/get-playlist?content_book=150KATA
GET /v1/content/get-playlist?content_book=150KATA&content_series=24NR-1
GET /v1/content/get-playlist?content_book=150KATA&content_qrcode=01
```

| Query | Keterangan |
|-------|------------|
| `content_book` | **Wajib** |
| `content_series` | Opsional |
| `content_qrcode` | Opsional |

**CMS:** `/qr/playlist` — `getQrContentPlaylist()` via `API_BASE_QR_BOOK`.

> **Catatan deploy:** Jika upstream mengembalikan `404` + `"URL tidak ditemukan."`, route belum tersedia di environment tersebut (bukan masalah CMS). Endpoint lain (mis. `/v1/content/get`) biasanya mengembalikan `401` bila token salah — artinya route ada.

### CMS ↔ Postman mapping

| Postman (QR collection) | CMS route | Service function |
|-------------------------|-----------|------------------|
| BOOK → Get | `/qr/books` | `getQrBooks` |
| CONTENT → Get | `/qr/contents` | `getQrContents` |
| CONTENT → Get Playlist | `/qr/playlist` | `getQrContentPlaylist` |
| SERIES → Get | `/qr/series` | `getQrSeries` |
| GROUP → Get | `/qr/groups` | `getQrGroups` |

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

## 🔧 Internal API Routes (Next.js proxy)

Browser memanggil path same-origin; route meneruskan ke upstream dengan header `Authorization` dan `Version`.

| Route | Upstream env | Contoh |
|-------|--------------|--------|
| `/api/auth/[...path]` | `NEXT_PUBLIC_BASE_URL_AUTH` | `/api/auth/auth/login` |
| `/api/article/[...path]` | `NEXT_PUBLIC_BASE_URL_ARTICLE` | `/api/article/articles` |
| `/api/store/[...path]` | `NEXT_PUBLIC_BASE_URL_STORE` | `/api/store/upload` |
| `/api/qr/[...path]` | `NEXT_PUBLIC_BASE_URL_QR` | `/api/qr/v1/content/get?page=1` |
| `/api/qr-book/[...path]` | `NEXT_PUBLIC_BASE_URL_QR_BOOK` | `/api/qr-book/v1/content/get-playlist?...` |

Implementasi: `lib/upstreamProxy.ts`, `createProxyRouteHandlers()`.

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
import { API_BASE_QR } from '@/utils/constants';

// Get articles (via proxy)
const response = await api.get('/api/article/articles', {
  params: { page: 1, limit: 10 }
});

// Get QR contents — same as Postman GET /v1/content/get
const qrContents = await api.get(`${API_BASE_QR}/v1/content/get`, {
  headers: { Version: 'V3' },
  params: { page: 1 }
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

*API Documentation v1.1 - Last Updated: June 2026*
