import { BASE_URL_ARTICLE } from '@/utils/constants';
import { createProxyRouteHandlers } from '@/lib/upstreamProxy';

const handlers = createProxyRouteHandlers(
    () => process.env.NEXT_PUBLIC_BASE_URL_ARTICLE ?? BASE_URL_ARTICLE
);

export const { GET, POST, PUT, PATCH, DELETE } = handlers;
