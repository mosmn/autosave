import { Star } from "lucide-react"
import type { SiteContent } from "@/lib/content"

interface TestimonialsSectionProps {
  content: SiteContent["home"]["testimonials"]
}

export function TestimonialsSection({ content }: TestimonialsSectionProps) {
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

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.items.map((testimonial) => (
            <div
              key={testimonial.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {`"${testimonial.text}"`}
              </p>
              <div className="mt-4 border-t border-border pt-4">
                <div className="text-sm font-semibold text-foreground">{testimonial.name}</div>
                <div className="text-xs text-muted-foreground">{testimonial.car}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
