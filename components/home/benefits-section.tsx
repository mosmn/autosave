import { Search, Wallet, Wrench, Truck, Thermometer, HeadphonesIcon } from "lucide-react"
import type { SiteContent } from "@/lib/content"

const icons = [Search, Wallet, Wrench, Truck, Thermometer, HeadphonesIcon]

interface BenefitsSectionProps {
  content: SiteContent["home"]["benefits"]
}

export function BenefitsSection({ content }: BenefitsSectionProps) {
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

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {content.items.map((benefit, index) => {
            const Icon = icons[index] ?? Search

            return (
            <div
              key={benefit.title}
              className="group rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                <Icon className="h-6 w-6 text-primary transition-colors group-hover:text-primary-foreground" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
