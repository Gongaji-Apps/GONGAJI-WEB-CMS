import { NextRequest, NextResponse } from 'next/server';

export async function proxyUpstreamRequest(
    request: NextRequest,
    pathSegments: string[],
    upstreamBaseUrl: string
) {
    const base = upstreamBaseUrl.replace(/\/$/, '');
    const path = pathSegments.join('/');
    const targetUrl = `${base}/${path}${request.nextUrl.search}`;

    const headers = new Headers();
    const version = request.headers.get('version') ?? request.headers.get('Version') ?? 'V3';
    headers.set('Version', version);

    const authorization = request.headers.get('authorization');
    if (authorization) {
        headers.set('Authorization', authorization);
    }

    const contentType = request.headers.get('content-type');
    if (contentType) {
        headers.set('Content-Type', contentType);
    }

    const init: RequestInit = {
        method: request.method,
        headers
    };

    if (request.method !== 'GET' && request.method !== 'HEAD') {
        init.body = await request.arrayBuffer();
    }

    const upstream = await fetch(targetUrl, init);
    const body = await upstream.arrayBuffer();

    return new NextResponse(body, {
        status: upstream.status,
        headers: {
            'Content-Type': upstream.headers.get('content-type') || 'application/json'
        }
    });
}

export type ProxyRouteContext = { params: { path: string[] } };

export function createProxyRouteHandlers(resolveBaseUrl: () => string) {
    const handle = (request: NextRequest, context: ProxyRouteContext) =>
        proxyUpstreamRequest(request, context.params.path, resolveBaseUrl());

    return {
        GET: handle,
        POST: handle,
        PUT: handle,
        PATCH: handle,
        DELETE: handle
    };
}
