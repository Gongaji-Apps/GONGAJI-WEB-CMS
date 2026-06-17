export const BASE_URL_AUTH = process.env.NEXT_PUBLIC_BASE_URL_AUTH ?? 'https://gongaji-authentication-service-m3gra3glsq-et.a.run.app';
export const BASE_URL_ARTICLE = process.env.NEXT_PUBLIC_BASE_URL_ARTICLE ?? 'https://gongaji-article-service-m3gra3glsq-et.a.run.app';
export const BASE_URL_STORE = process.env.NEXT_PUBLIC_BASE_URL_STORE ?? 'https://gongaji-store-service-m3gra3glsq-et.a.run.app';
export const BASE_URL_QR = process.env.NEXT_PUBLIC_BASE_URL_QR ?? 'https://gongaji-qr-service-396261734950.asia-southeast2.run.app';
export const BASE_URL_QR_BOOK =
    process.env.NEXT_PUBLIC_BASE_URL_QR_BOOK ?? BASE_URL_QR;

// Same-origin proxies for browser requests (avoids CORS). See app/api/[service]/[...path]/route.ts
export const API_BASE_AUTH = '/api/auth';
export const API_BASE_ARTICLE = '/api/article';
export const API_BASE_STORE = '/api/store';
export const API_BASE_QR = '/api/qr';
export const API_BASE_QR_BOOK = '/api/qr-book';
export const STATIC_BEARER_TOKEN = process.env.NEXT_PUBLIC_STATIC_BEARER_TOKEN ?? '';
export const AUTH_CLIENT_ID = process.env.NEXT_PUBLIC_AUTH_CLIENT_ID ?? 'cms-web';

export const AUTH_COOKIE_NAME = 'authToken';
