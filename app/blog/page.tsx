import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getAllCategories, getAllTags, getBlogPosts } from "@/lib/blog-data"
import { getCurrentContent, getCurrentLanguage } from "@/lib/i18n"
import { localizeHref, withLanguagePrefix } from "@/lib/language"

export async function generateMetadata(): Promise<Metadata> {
  const language = await getCurrentLanguage()
  const baseUrl = "https://coolcar-ac.com"
  const pagePath = "/blog"
  const canonicalUrl = `${baseUrl}${withLanguagePrefix(pagePath, language)}`
  const alternates = {
    canonical: canonicalUrl,
    languages: {
      en: `${baseUrl}/en/blog`,
      ar: `${baseUrl}/ar/blog`,
      "x-default": `${baseUrl}/en/blog`,
    },
  }

  if (language === "ar") {
    return {
      title: "مدونة مكيف السيارة | نصائح وأدلة",
      description: "مقالات متخصصة في إصلاح وصيانة مكيف السيارة وتشخيص الأعطال وتقدير التكاليف.",
      keywords: ["مدونة المكيف", "إصلاح مكيف", "صيانة مكيف", "أعطال التبريد", "أدلة السيارات"],
      alternates,
      openGraph: {
        title: "مدونة مكيف السيارة | اوتو سيف",
        description: "مقالات متخصصة في إصلاح وصيانة مكيف السيارة وتشخيص الأعطال وتقدير التكاليف.",
        url: canonicalUrl,
        type: "website",
      },
    }
  }

  return {
    title: "Car AC Repair Blog | Tips, Guides & Expert Advice",
    description:
      "Expert articles on car air conditioning repair, maintenance tips, troubleshooting guides, and auto AC cost breakdowns. Stay informed about keeping your car cool.",
    keywords: [
      "car AC blog",
      "auto AC repair tips",
      "car air conditioning guide",
      "AC maintenance articles",
      "car cooling system blog",
      "auto air conditioning repair guide",
    ],
    alternates,
    openGraph: {
      title: "Car AC Repair Blog | AUTO SAVE",
      description:
        "Expert articles on car air conditioning repair, maintenance tips, troubleshooting guides, and auto AC cost breakdowns.",
      url: canonicalUrl,
      type: "website",
    },
  }
}

export default async function BlogPage() {
  const { content } = await getCurrentContent()
  const language = await getCurrentLanguage()
  const isArabic = language === "ar"
  const blogContent = content.blog.page
  const locale = language === "ar" ? "ar-SA" : "en-US"

  const localizedPosts = getBlogPosts(language)
  const featuredPost = localizedPosts[0]
  const remainingPosts = localizedPosts.slice(1)
  const categories = getAllCategories(language)
  const tags = getAllTags(language)

  if (!featuredPost) {
    return null
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/service-center.jpeg"
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

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              {blogContent.heroEyebrow}
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance md:text-5xl">
              {blogContent.heroTitle}
            </h1>
            <p className="mt-6 text-lg leading-relaxed opacity-80">
              {blogContent.heroDescription}
            </p>
          </div>

          {/* Category Tags */}
          <div className="mt-10 flex flex-wrap gap-2">
            <Badge
              variant="secondary"
              className="bg-background/10 text-background hover:bg-background/20"
            >
              {blogContent.allArticles}
            </Badge>
            {categories.map((cat) => (
              <Badge
                key={cat}
                variant="outline"
                className="border-background/20 text-background/70 hover:bg-background/10"
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="bg-background py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Link
            href={localizeHref(`/blog/${featuredPost.slug}`, language)}
            className="group grid overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg lg:grid-cols-2"
          >
            <div className="relative aspect-video lg:aspect-auto">
              <Image
                src={featuredPost.image}
                alt={featuredPost.imageAlt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute left-4 top-4">
                <Badge className="bg-primary text-primary-foreground">
                  {blogContent.featured}
                </Badge>
              </div>
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(featuredPost.date).toLocaleDateString(locale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {featuredPost.readTime}
                </span>
              </div>
              <Badge variant="outline" className="mt-4 w-fit">
                {featuredPost.category}
              </Badge>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground text-balance lg:text-3xl">
                {featuredPost.title}
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {featuredPost.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-2 font-medium text-primary transition-colors group-hover:text-primary/80">
                {blogContent.readFull}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* All Posts Grid */}
      <section className="bg-secondary pb-20 pt-16 lg:pb-28 lg:pt-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                {blogContent.allArticles}
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-secondary-foreground">
                {blogContent.latest}
              </h2>
            </div>
            <p className="hidden text-sm text-muted-foreground md:block">
              {localizedPosts.length} {blogContent.articles}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {remainingPosts.map((post) => (
              <Link
                key={post.slug}
                href={localizeHref(`/blog/${post.slug}`, language)}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3">
                    <Badge
                      variant="secondary"
                      className="bg-card/80 text-card-foreground backdrop-blur-sm"
                    >
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString(locale, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold leading-snug text-foreground text-balance">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary">
                    {blogContent.readMore}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Keywords Section */}
      <section className="bg-background py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {blogContent.popularTopics}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {blogContent.popularDescription}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="gap-1.5 px-3 py-1.5 text-xs"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
