"use client"

import { ArrowRight, Phone } from "lucide-react"
import { ComingSoonLink } from "@/components/coming-soon-link"
import { Button } from "@/components/ui/button"
import type { SiteContent } from "@/lib/content"
import { localizeHref, type Language } from "@/lib/language"

interface CtaSectionProps {
  content: SiteContent["home"]["cta"]
  language: Language
}

export function CtaSection({ content, language }: CtaSectionProps) {
  return (
    <section className="bg-primary py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-primary-foreground text-balance md:text-4xl">
          {content.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
          {content.description}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ComingSoonLink href={localizeHref("/contact", language)}>
            <Button size="lg" className="gap-2 bg-background text-foreground hover:bg-background/90">
              {content.primary}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </ComingSoonLink>
          <ComingSoonLink
            href="https://wa.me/?text=Hi%2C%20I%20need%20help%20with%20my%20car%20AC%20repair"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" variant="outline" className="gap-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <Phone className="h-4 w-4" />
              {content.secondary}
            </Button>
          </ComingSoonLink>
        </div>
      </div>
    </section>
  )
}
