import { type NextRequest, NextResponse } from 'next/server';

const allowedOrigins = ['http://localhost:5173', 'https://devxuan.netlify.app'];

const corsOptions = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
};

export function middleware(request: NextRequest) {
    const origin = request.headers.get('origin') ?? '';
    const isAllowedOrigin = allowedOrigins.includes(origin);

    const isPreflight = request.method === 'OPTIONS';

    if (isPreflight) {
        const preflightHeaders = {
            ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
            ...corsOptions,
        };
        return new NextResponse(null, { headers: preflightHeaders, status: 200 });
    }

    const response = NextResponse.next();

    if (isAllowedOrigin) {
        response.headers.set('Access-Control-Allow-Origin', origin);
    }

    Object.entries(corsOptions).forEach(([key, value]) => {
        response.headers.set(key, value);
    });

    return response;
}

export const config = {
    matcher: '/api/:path*',
};
