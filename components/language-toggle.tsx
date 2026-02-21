"use client"

import { useTransition } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LANGUAGE_COOKIE, type Language, withLanguagePrefix } from "@/lib/language"

interface LanguageToggleProps {
  language: Language
}

function setLanguageCookie(language: Language) {
  const oneYear = 60 * 60 * 24 * 365
  document.cookie = `${LANGUAGE_COOKIE}=${language}; path=/; max-age=${oneYear}; samesite=lax`
}

export function LanguageToggle({ language }: LanguageToggleProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = (nextLanguage: Language) => {
    if (nextLanguage === language) return

    setLanguageCookie(nextLanguage)
    const nextPathname = withLanguagePrefix(pathname, nextLanguage)

    startTransition(() => {
      router.replace(nextPathname)
      router.refresh()
    })
  }

  return (
    <div className="inline-flex items-center rounded-lg border border-border bg-background/60 p-0.5">
      <Button
        type="button"
        variant={language === "en" ? "default" : "ghost"}
        size="sm"
        disabled={isPending}
        onClick={() => switchLanguage("en")}
        className="h-8 px-2 text-xs"
      >
        EN
      </Button>
      <Button
        type="button"
        variant={language === "ar" ? "default" : "ghost"}
        size="sm"
        disabled={isPending}
        onClick={() => switchLanguage("ar")}
        className="h-8 px-2 text-xs"
      >
        AR
      </Button>
    </div>
  )
}
