import { BASE_URL_QR_BOOK } from '@/utils/constants';
import { createProxyRouteHandlers } from '@/lib/upstreamProxy';

const handlers = createProxyRouteHandlers(
    () => process.env.NEXT_PUBLIC_BASE_URL_QR_BOOK ?? BASE_URL_QR_BOOK
);

export const { GET, POST, PUT, PATCH, DELETE } = handlers;
