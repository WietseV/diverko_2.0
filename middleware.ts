import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { LANG_COOKIE, LANGUAGES, normalizeLanguage } from "@/lib/locales";

const LOCALE_PATTERN = new RegExp(`^/(?:${LANGUAGES.join("|")})(?=/|$)`);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const match = pathname.match(LOCALE_PATTERN);
  const nextUrl = request.nextUrl.clone();
  let locale: string | undefined;

  if (match) {
    locale = match[0].slice(1);
    nextUrl.pathname = pathname.replace(LOCALE_PATTERN, "") || "/";
  } else {
    locale = request.cookies.get(LANG_COOKIE)?.value;
    const normalized = normalizeLanguage(locale);
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${normalized}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(redirectUrl);
  }

  const normalized = normalizeLanguage(locale);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-diverko-lang", normalized);

  const response = NextResponse.rewrite(nextUrl, {
    request: { headers: requestHeaders },
  });

  response.cookies.set(LANG_COOKIE, normalized, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  response.cookies.set("NEXT_LOCALE", normalized, { path: "/", maxAge: 60 * 60 * 24 * 365 });

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|studio).*)"],
};
