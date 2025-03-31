import { NextResponse } from 'next/server';

export async function middleware(request) {
    // Only check auth for protected routes
    if (request.nextUrl.pathname.startsWith('/onboarding') &&
        !request.nextUrl.pathname.includes('/onboarding/auth')) {
        const token = request.cookies.get('firebase-token');

        if (!token) {
            // Create the URL with the original URL as the callback
            const callbackUrl = encodeURIComponent(request.nextUrl.pathname);
            return NextResponse.redirect(new URL(`/onboarding/auth?callback=${callbackUrl}`, request.url));
        }
    }

    return NextResponse.next();
}

// Add matcher to optimize middleware execution
export const config = {
    matcher: '/onboarding/:path*'
} 