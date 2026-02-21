"use client"

import Image from "next/image"
import { ArrowRight, Phone } from "lucide-react"
import { ComingSoonLink } from "@/components/coming-soon-link"
import { Button } from "@/components/ui/button"
import type { SiteContent } from "@/lib/content"
import { localizeHref, type Language } from "@/lib/language"

interface HeroSectionProps {
  content: SiteContent["home"]["hero"]
  language: Language
}

export function HeroSection({ content, language }: HeroSectionProps) {
  const isArabic = language === "ar"

  return (
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

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start px-4 py-24 lg:flex-row lg:items-center lg:gap-16 lg:px-8 lg:py-32">
        <div className="max-w-2xl flex-1">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/10 px-4 py-1.5 text-sm backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-accent" />
            {content.badge}
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-balance md:text-5xl lg:text-6xl">
            {content.title}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-80">
            {content.description}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <ComingSoonLink href={localizeHref("/contact", language)}>
              <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                {content.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </ComingSoonLink>
            <ComingSoonLink
              href="https://wa.me/?text=Hi%2C%20I%20need%20help%20with%20my%20car%20AC"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="gap-2 border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background">
                <Phone className="h-4 w-4" />
                {content.secondaryCta}
              </Button>
            </ComingSoonLink>
          </div>

          <div className="mt-12 flex items-center gap-8">
            <div>
              <div className="text-3xl font-bold text-accent">{content.stats[0]?.value}</div>
              <div className="text-sm opacity-60">{content.stats[0]?.label}</div>
            </div>
            <div className="h-10 w-px bg-background/20" />
            <div>
              <div className="text-3xl font-bold text-accent">{content.stats[1]?.value}</div>
              <div className="text-sm opacity-60">{content.stats[1]?.label}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
