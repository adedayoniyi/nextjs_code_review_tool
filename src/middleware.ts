// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Define the protected and public routes
const protectedRoutes = ["/dashboard", "/explore", "/upload", "/profile"];
const publicRoutes = ["/", "/login", "/register", "/verify-otp"];

// Define the secret for JWT (should match NEXTAUTH_SECRET)
const secret = process.env.NEXTAUTH_SECRET;

// Middleware function
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the request is for a static file or Next.js internals
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/static") ||
        pathname.startsWith("/favicon.ico")
    ) {
        return NextResponse.next();
    }

    // Check if the route is protected
    const isProtected = protectedRoutes.some((path) =>
        pathname.startsWith(path)
    );

    // Check if the route is public
    const isPublic = publicRoutes.includes(pathname);

    // Get the token from the request
    const token = await getToken({ req: request, secret });

    // If the route is protected and no token, redirect to login
    if (isProtected && !token) {
        const loginUrl = new URL("/login", request.nextUrl.origin);
        loginUrl.searchParams.set("callbackUrl", request.nextUrl.href);
        return NextResponse.redirect(loginUrl);
    }

    // Optionally, redirect authenticated users away from public routes like login/register
    if (isPublic && token) {
        if (pathname === "/login" || pathname === "/register") {
            const exploreUrl = new URL("/explore", request.nextUrl.origin);
            return NextResponse.redirect(exploreUrl);
        }
    }

    // If none of the above, allow the request
    return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api/auth
         * - _next
         * - static files
         */
        "/((?!api/auth|_next|static|favicon.ico).*)",
    ],
};
