"use client"

import { Check, ArrowRight, Truck, MapPin } from "lucide-react"
import { ComingSoonLink } from "@/components/coming-soon-link"
import { Button } from "@/components/ui/button"
import type { SiteContent } from "@/lib/content"
import { localizeHref, type Language } from "@/lib/language"

const icons = [MapPin, Truck]

interface PricingSectionProps {
  content: SiteContent["home"]["pricing"]
  language: Language
}

export function PricingSection({ content, language }: PricingSectionProps) {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            {content.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
            {content.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {content.description}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-2">
          {content.plans.map((plan, index) => {
            const Icon = icons[index] ?? MapPin
            const highlighted = index === 1

            return (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                highlighted
                  ? "border-primary bg-primary/5 shadow-xl shadow-primary/10"
                  : "border-border bg-card"
              }`}
            >
              {highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                    {content.popular}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${highlighted ? "bg-primary" : "bg-primary/10"}`}>
                  <Icon className={`h-5 w-5 ${highlighted ? "text-primary-foreground" : "text-primary"}`} />
                </div>
                <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
              </div>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tight text-foreground">{plan.price}</span>
                <span className="text-lg text-muted-foreground">{plan.currency}</span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{plan.description}</p>

              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <ComingSoonLink href={localizeHref("/contact", language)} className="mt-8 block">
                <Button
                  className={`w-full gap-2 ${
                    highlighted
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-foreground text-background hover:bg-foreground/90"
                  }`}
                  size="lg"
                >
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </ComingSoonLink>
            </div>
            )
          })}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          {content.note}
        </p>
      </div>
    </section>
  )
}
