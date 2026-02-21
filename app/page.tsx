import { HeroSection } from "@/components/home/hero-section"
import { BenefitsSection } from "@/components/home/benefits-section"
import { HowItWorks } from "@/components/home/how-it-works"
import { PricingSection } from "@/components/home/pricing-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { TrustBadges } from "@/components/home/trust-badges"
import { FaqSection } from "@/components/home/faq-section"
import { CtaSection } from "@/components/home/cta-section"
import { LocalBusinessSchema, WebsiteSchema, FAQSchema } from "@/components/json-ld"
import { BlogPreview } from "@/components/home/blog-preview"
import { getCurrentContent } from "@/lib/i18n"
import { getBlogPosts } from "@/lib/blog-data"

export default async function HomePage() {
  const { content, language } = await getCurrentContent()
  const blogPosts = getBlogPosts(language).slice(0, 3)

  return (
    <>
      <LocalBusinessSchema />
      <WebsiteSchema language={language} />
      <FAQSchema />
      <HeroSection content={content.home.hero} language={language} />
      <TrustBadges items={content.home.trustBadges} />
      <BenefitsSection content={content.home.benefits} />
      <HowItWorks content={content.home.howItWorks} />
      <PricingSection content={content.home.pricing} language={language} />
      {/*<TestimonialsSection content={content.home.testimonials} />*/}
      <BlogPreview content={content.home.blogPreview} posts={blogPosts} language={language} />
      <FaqSection content={content.home.faq} />
      <CtaSection content={content.home.cta} language={language} />
    </>
  )
}
