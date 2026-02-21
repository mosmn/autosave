"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ComingSoonLink } from "@/components/coming-soon-link"
import { LanguageToggle } from "@/components/language-toggle"
import { getContentByLanguage } from "@/lib/content"
import { localizeHref, type Language } from "@/lib/language"

interface SiteHeaderProps {
  language: Language
}

export function SiteHeader({ language }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const content = getContentByLanguage(language)
  const navigation = content.header.nav
  const titleImageSrc = language === "ar" ? "/arabic tiltle.png" : "/auto save title.png"

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link href={localizeHref("/", language)} className="flex items-center gap-2">
          <Image src="/logo.png" alt="AUTO SAVE logo" width={44} height={44} className="h-11 w-11 object-contain" priority />
          <Image src={titleImageSrc} alt="AUTO SAVE" width={190} height={34} className="h-8 w-auto object-contain" priority />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={localizeHref(item.href, language)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageToggle language={language} />
          <ComingSoonLink
            href="https://wa.me/?text=Hi%2C%20I%20need%20help%20with%20my%20car%20AC"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Phone className="h-4 w-4" />
              {content.header.quoteButton}
            </Button>
          </ComingSoonLink>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={content.header.menuToggle}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-card md:hidden">
          <div className="flex flex-col gap-1 px-4 py-4">
            <div className="mb-2">
              <LanguageToggle language={language} />
            </div>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={localizeHref(item.href, language)}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
            <ComingSoonLink
              href="https://wa.me/?text=Hi%2C%20I%20need%20help%20with%20my%20car%20AC"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                <Phone className="h-4 w-4" />
                {content.header.quoteButton}
              </Button>
            </ComingSoonLink>
          </div>
        </div>
      )}
    </header>
  )
}
