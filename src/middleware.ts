import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


// This is a simple middleware to handle authentication
// You would replace this with your own authentication implementation

export async function middleware(request: NextRequest) {
  // Check if the request is for a specific path
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value
  const refresh = request.cookies.get("refresh_token")?.value

  // console.log(!token)

  // Define routes that don't require authentication
  const publicRoutes = [
    '/',
    '/auth/login',
    '/auth/signup',
    '/auth/google',
    '/api/auth/google/*',
    '/password-reset',
  ];

  const isPublicRoute = pathname === '/' || publicRoutes.some((route) =>
    route !== '/' && (pathname === route || pathname.startsWith('/' + route))
  );

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

  // Regular auth flow for other cases
  if (!token && !refresh && !isPublicRoute) {
    const url = new URL("/auth/login", request.url);
    url.searchParams.set("callbackUrl", encodeURI(pathname));
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
