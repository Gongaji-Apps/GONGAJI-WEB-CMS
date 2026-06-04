import { BASE_URL_QR } from '@/utils/constants';
import { createProxyRouteHandlers } from '@/lib/upstreamProxy';

const handlers = createProxyRouteHandlers(() => process.env.NEXT_PUBLIC_BASE_URL_QR ?? BASE_URL_QR);

export const { GET, POST, PUT, PATCH, DELETE } = handlers;
