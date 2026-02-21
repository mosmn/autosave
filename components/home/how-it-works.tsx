import { MessageSquare, ClipboardList, Car, CircleCheckBig } from "lucide-react"
import type { SiteContent } from "@/lib/content"

const icons = [MessageSquare, ClipboardList, Car, CircleCheckBig]

interface HowItWorksProps {
  content: SiteContent["home"]["howItWorks"]
}

export function HowItWorks({ content }: HowItWorksProps) {
  return (
    <section className="bg-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            {content.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-secondary-foreground text-balance md:text-4xl">
            {content.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {content.description}
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {content.steps.map((step, index) => {
            const Icon = icons[index] ?? MessageSquare

            return (
            <div key={step.step} className="relative">
              {index < content.steps.length - 1 && (
                <div className="absolute right-0 top-12 hidden h-px w-full translate-x-1/2 bg-border lg:block" />
              )}
              <div className="relative flex flex-col items-center text-center">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <Icon className="h-7 w-7" />
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                    {step.step}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-secondary-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
