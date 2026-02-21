import { ShieldCheck, Award, Clock, CircleCheck } from "lucide-react"
import type { SiteContent } from "@/lib/content"

const icons = [ShieldCheck, Award, Clock, CircleCheck]

interface TrustBadgesProps {
  items: SiteContent["home"]["trustBadges"]
}

export function TrustBadges({ items }: TrustBadgesProps) {
  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {items.map((badge, index) => {
            const Icon = icons[index] ?? ShieldCheck

            return (
            <div key={badge.label} className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">{badge.label}</div>
                <div className="text-xs text-muted-foreground">{badge.description}</div>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
