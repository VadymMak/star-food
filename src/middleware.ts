// src/middleware.ts — next-intl locale routing middleware
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  // Geo-restriction: UA users can't see /ru/, RU users can't see /ua/
  const country = request.headers.get("x-vercel-ip-country");
  const pathname = request.nextUrl.pathname;

  if (country === "UA" && pathname.startsWith("/ru")) {
    const newPath = "/ua" + pathname.slice(3);
    return NextResponse.redirect(new URL(newPath, request.url));
  }
  if (country === "RU" && pathname.startsWith("/ua")) {
    const newPath = "/ru" + pathname.slice(3);
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files, API routes, etc.
    "/((?!api|_next|_vercel|gallery|favicon|robots|sitemap|google|og-|images|icons|fonts|manifest|.*\\..*).*)",
  ],
};
