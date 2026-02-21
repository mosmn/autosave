import Link from "next/link"
import Image from "next/image"
import { getContentByLanguage } from "@/lib/content"
import { localizeHref, type Language } from "@/lib/language"

interface SiteFooterProps {
  language: Language
}

export function SiteFooter({ language }: SiteFooterProps) {
  const content = getContentByLanguage(language)
  const year = new Date().getFullYear()
  const titleImageSrc = language === "ar" ? "/arabic tiltle.png" : "/auto save title.png"

  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href={localizeHref("/", language)} className="flex items-center gap-2">
              <Image src="/logo.png" alt="AUTO SAVE logo" width={44} height={44} className="h-11 w-11 object-contain" />
              <Image src={titleImageSrc} alt="AUTO SAVE" width={190} height={34} className="h-8 w-auto object-contain" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed opacity-70">
              {content.footer.description}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider opacity-50">{content.footer.groups.services.title}</h3>
            <ul className="flex flex-col gap-3">
              {content.footer.groups.services.links.map((link) => (
                <li key={link.name}>
                  <Link href={localizeHref(link.href, language)} className="text-sm opacity-70 transition-opacity hover:opacity-100">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider opacity-50">{content.footer.groups.resources.title}</h3>
            <ul className="flex flex-col gap-3">
              {content.footer.groups.resources.links.map((link) => (
                <li key={link.name}>
                  <Link href={localizeHref(link.href, language)} className="text-sm opacity-70 transition-opacity hover:opacity-100">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider opacity-50">{content.footer.groups.company.title}</h3>
            <ul className="flex flex-col gap-3">
              {content.footer.groups.company.links.map((link) => (
                <li key={link.name}>
                  <Link href={localizeHref(link.href, language)} className="text-sm opacity-70 transition-opacity hover:opacity-100">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-8 md:flex-row">
          <p className="text-xs opacity-50">
            {year} {content.footer.copyright}
          </p>
          <div className="flex gap-6">
            {content.footer.bottomLinks.map((link) => (
              <Link key={link.href} href={localizeHref(link.href, language)} className="text-xs opacity-50 transition-opacity hover:opacity-100">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
