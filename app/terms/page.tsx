import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ComingSoonLink } from "@/components/coming-soon-link"
import { getCurrentContent, getCurrentLanguage } from "@/lib/i18n"
import { localizeHref, withLanguagePrefix } from "@/lib/language"

export async function generateMetadata(): Promise<Metadata> {
  const language = await getCurrentLanguage()
  const baseUrl = "https://coolcar-ac.com"
  const pagePath = "/terms"
  const canonicalUrl = `${baseUrl}${withLanguagePrefix(pagePath, language)}`
  const alternates = {
    canonical: canonicalUrl,
    languages: {
      en: `${baseUrl}/en/terms`,
      ar: `${baseUrl}/ar/terms`,
      "x-default": `${baseUrl}/en/terms`,
    },
  }

  if (language === "ar") {
    return {
      title: "شروط الخدمة",
      description: "شروط وأحكام خدمة  اوتو سيف وسياسة الخصوصية الخاصة بخدمات إصلاح وصيانة مكيف السيارة.",
      alternates,
      openGraph: {
        title: "شروط الخدمة | اوتو سيف",
        description: "شروط وأحكام خدمة اوتو سيف وسياسة الخصوصية الخاصة بخدمات إصلاح وصيانة مكيف السيارة.",
        url: canonicalUrl,
        type: "website",
      },
    }
  }

  return {
    title: "Terms of Service",
    description:
      "AUTO SAVE terms of service, privacy policy, and service agreement for car air conditioning repair and maintenance services.",
    alternates,
    openGraph: {
      title: "Terms of Service | AUTO SAVE",
      description:
        "AUTO SAVE terms of service, privacy policy, and service agreement for car air conditioning repair and maintenance services.",
      url: canonicalUrl,
      type: "website",
    },
  }
}

export default async function TermsPage() {
  const { content, language } = await getCurrentContent()
  const isArabic = language === "ar"
  const terms = content.terms

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-car-ac.jpeg"
            alt="Car air conditioning dashboard with cool air flowing from vents"
            fill
            className="object-cover opacity-38"
            priority
          />
          <div
            className={
              isArabic
                ? "absolute inset-0 bg-gradient-to-l from-foreground/85 via-foreground/70 to-foreground/50"
                : "absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/70 to-foreground/50"
            }
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            {terms.eyebrow}
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            {terms.title}
          </h1>
          <p className="mt-4 text-background/60">{terms.lastUpdatedPrefix} {terms.lastUpdatedDate}</p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="space-y-10 text-muted-foreground">
            {terms.sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
                {section.body && <p className="mt-3 leading-relaxed">{section.body}</p>}
                {section.bullets && (
                  <ul className="mt-3 space-y-2">
                    {section.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.bodyPrefix && (
                  <p className="mt-3 leading-relaxed">
                    {section.bodyPrefix}{" "}
                    <ComingSoonLink href={localizeHref("/contact", language)} className="font-medium text-primary hover:underline">
                      {section.bodyLink}
                    </ComingSoonLink>{" "}
                    {section.bodySuffix}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
