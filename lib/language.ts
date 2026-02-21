export const LANGUAGE_COOKIE = "site_lang"
export const SUPPORTED_LANGUAGES = ["en", "ar"] as const

export type Language = (typeof SUPPORTED_LANGUAGES)[number]

export function isLanguage(value: string | undefined): value is Language {
  return value === "en" || value === "ar"
}

export const DEFAULT_LANGUAGE: Language = "en"

export function stripLanguagePrefix(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean)
  const first = segments[0]

  if (isLanguage(first)) {
    const rest = segments.slice(1).join("/")
    return rest ? `/${rest}` : "/"
  }

  return pathname || "/"
}

export function withLanguagePrefix(pathname: string, language: Language): string {
  const normalized = stripLanguagePrefix(pathname)
  if (normalized === "/") {
    return `/${language}`
  }

  return `/${language}${normalized}`
}

export function localizeHref(href: string, language: Language): string {
  if (!href.startsWith("/")) {
    return href
  }

  return withLanguagePrefix(href, language)
}

export function getLanguageFromPathname(pathname: string | null | undefined): Language {
  if (!pathname) {
    return DEFAULT_LANGUAGE
  }

  const firstSegment = pathname.split("/").filter(Boolean)[0]

  return isLanguage(firstSegment) ? firstSegment : DEFAULT_LANGUAGE
}
