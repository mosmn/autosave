import { cookies } from "next/headers"
import { getContentByLanguage as getContentByLanguageFromDictionary, type SiteContent } from "@/lib/content"
import { isLanguage, LANGUAGE_COOKIE, type Language } from "@/lib/language"

export async function getCurrentLanguage(): Promise<Language> {
  const cookieStore = await cookies()
  const cookieValue = cookieStore.get(LANGUAGE_COOKIE)?.value

  if (isLanguage(cookieValue)) {
    return cookieValue
  }

  return "en"
}

export function getContentByLanguage(language: Language): SiteContent {
  return getContentByLanguageFromDictionary(language)
}

export async function getCurrentContent() {
  const language = await getCurrentLanguage()
  const content = getContentByLanguage(language)

  return { language, content }
}
