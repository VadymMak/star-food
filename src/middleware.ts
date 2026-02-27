// src/middleware.ts — Locale detection + redirect
import { NextRequest, NextResponse } from "next/server";
import {
  locales,
  defaultLocale,
  detectLocaleFromHeader,
  isValidLocale,
} from "@/lib/locale";

// Paths that should NOT be locale-prefixed
const PUBLIC_PATHS = [
  "/api",
  "/images",
  "/icons",
  "/fonts",
  "/_next",
  "/favicon",
  "/robots.txt",
  "/sitemap.xml",
  "/og-image",
  "/manifest",
];
// Helper: get visitor country from Vercel geo headers
function getCountry(request: NextRequest): string | null {
  return request.headers.get("x-vercel-ip-country");
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip public/static files
  if (
    PUBLIC_PATHS.some((p) => pathname.startsWith(p)) ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a valid locale prefix
  const segments = pathname.split("/");
  const firstSegment = segments[1];

  if (firstSegment && isValidLocale(firstSegment)) {
    return NextResponse.next();
  }

  // No locale in URL — detect and redirect
  // 1. Check cookie (returning visitor)
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    // Apply same UA restriction

    const url = request.nextUrl.clone();
    url.pathname = `/${cookieLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // 2. Detect from browser Accept-Language header
  const acceptLanguage = request.headers.get("accept-language");
  let detectedLocale = detectLocaleFromHeader(acceptLanguage);

  // 3. If detected Ukrainian, verify country

  // Redirect to locale-prefixed URL
  const url = request.nextUrl.clone();
  url.pathname = `/${detectedLocale}${pathname}`;
  const response = NextResponse.redirect(url);

  // Set cookie for future visits (30 days)
  response.cookies.set("NEXT_LOCALE", detectedLocale, {
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return response;
}

export const config = {
  // Match all paths except static files
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
