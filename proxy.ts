import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import {
  DEFAULT_LANGUAGE,
  isLanguage,
  LANGUAGE_COOKIE,
  withLanguagePrefix,
} from "@/lib/language"

const EXCLUDED_PATHS = ["/robots.txt", "/sitemap.xml", "/favicon.ico"]

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    EXCLUDED_PATHS.some((path) => pathname === path)
  ) {
    return NextResponse.next()
  }

  const pathSegments = pathname.split("/").filter(Boolean)
  const firstSegment = pathSegments[0]

  if (isLanguage(firstSegment)) {
    const response = NextResponse.next()
    response.cookies.set(LANGUAGE_COOKIE, firstSegment, {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    })
    return response
  }

  const cookieLanguage = request.cookies.get(LANGUAGE_COOKIE)?.value
  const language = isLanguage(cookieLanguage) ? cookieLanguage : DEFAULT_LANGUAGE
  const localizedPath = withLanguagePrefix(pathname, language)

  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = localizedPath

  const response = NextResponse.redirect(redirectUrl)
  response.cookies.set(LANGUAGE_COOKIE, language, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  })

  return response
}

export const config = {
  matcher: ["/((?!.*\\..*).*)"],
}
