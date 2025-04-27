import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// This is a simple middleware to handle authentication
// You would replace this with your own authentication implementation

export async function middleware(request: NextRequest) {
  // Check if the request is for a specific path
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  // let isAuthenticated = false

  // if (accessToken) {
  //   try {
  //     // Use your JWT secret here - in production use environment variables
  //     const secret = new TextEncoder().encode(process.env.JWT_SECRET)

  //     await jwtVerify(accessToken, secret)
  //     isAuthenticated = true

  //   } catch (error) {
  //     // Token invalid or expired
  //     isAuthenticated = false
  //   }
  // }

  // Define routes that don't require authentication
  const publicRoutes = [
    "auth/login",
    "auth/signup",
    "/auth/google",
    "/api/auth/google/*",
    "/password-reset",
  ];
  const isPublicRoute = publicRoutes.some((route) => pathname.includes(route));

  const staticAssets = [
    "/_next/",
    "/favicon.ico",
    "/images/",
    "/styles/",
    ".js",
    ".css",
    ".svg",
    ".jpg",
    ".png",
  ];

  // Add this check early in your middleware
  const isStaticAsset = staticAssets.some(
    (path) => pathname.startsWith(path) || pathname.endsWith(path)
  );

  // If it's a static asset, allow the request without auth check
  if (isStaticAsset) {
    return NextResponse.next();
  }
  // If no access token but has refresh token, allow the request
  // Client-side code will handle the refresh
  if (!accessToken && refreshToken) {
    // Let the request proceed - client will handle refresh
    return NextResponse.next();
  }

  // Regular auth flow for other cases
  if (!accessToken && !refreshToken && !isPublicRoute) {
    const url = new URL("/auth/login", request.url);
    url.searchParams.set("callbackUrl", encodeURI(pathname));
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
