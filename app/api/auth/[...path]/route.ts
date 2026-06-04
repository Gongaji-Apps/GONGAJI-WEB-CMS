import { BASE_URL_AUTH } from '@/utils/constants';
import { createProxyRouteHandlers } from '@/lib/upstreamProxy';

const handlers = createProxyRouteHandlers(
    () => process.env.NEXT_PUBLIC_BASE_URL_AUTH ?? BASE_URL_AUTH
);

export const { GET, POST, PUT, PATCH, DELETE } = handlers;
