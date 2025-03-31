import { NextResponse } from 'next/server';

export async function middleware(request) {
    // Get the token from localStorage
    const token = request.cookies.get('firebase-token');

    // Protect all onboarding routes except the auth page
    if (request.nextUrl.pathname.startsWith('/onboarding') &&
        !request.nextUrl.pathname.includes('/onboarding/auth')) {
        if (!token) {
            return NextResponse.redirect(new URL('/onboarding/auth', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/onboarding/:path*',
} 