import { BASE_URL_STORE } from '@/utils/constants';
import { createProxyRouteHandlers } from '@/lib/upstreamProxy';

const handlers = createProxyRouteHandlers(
    () => process.env.NEXT_PUBLIC_BASE_URL_STORE ?? BASE_URL_STORE
);

export const { GET, POST, PUT, PATCH, DELETE } = handlers;
