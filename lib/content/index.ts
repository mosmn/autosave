import { arContent } from "@/lib/content/ar"
import { enContent } from "@/lib/content/en"
import type { Language } from "@/lib/language"

export type SiteContent = typeof enContent

export function getContentByLanguage(language: Language): SiteContent {
  return language === "ar" ? arContent : enContent
}
