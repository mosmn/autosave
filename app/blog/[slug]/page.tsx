import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ComingSoonLink } from "@/components/coming-soon-link"
import { blogPosts, getBlogPost, getRelatedPosts } from "@/lib/blog-data"
import { getCurrentContent, getCurrentLanguage } from "@/lib/i18n"
import { localizeHref, withLanguagePrefix } from "@/lib/language"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const language = await getCurrentLanguage()
  const { slug } = await params
  const post = getBlogPost(slug, language)
  if (!post) return {}

  const baseUrl = "https://coolcar-ac.com"
  const pagePath = `/blog/${slug}`
  const canonicalUrl = `${baseUrl}${withLanguagePrefix(pagePath, language)}`

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/blog/${slug}`,
        ar: `${baseUrl}/ar/blog/${slug}`,
        "x-default": `${baseUrl}/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: canonicalUrl,
      publishedTime: post.date,
      tags: post.tags,
      images: [{ url: post.image, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { content } = await getCurrentContent()
  const language = await getCurrentLanguage()
  const locale = language === "ar" ? "ar-SA" : "en-US"
  const blogContent = content.blog.post

  const { slug } = await params
  const post = getBlogPost(slug, language)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(slug, 3, language)

  const contentSections = post.content
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => line.trim())

  return (
    <>
      {/* Article Header */}
      <section className="bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
          <Link
            href={localizeHref("/blog", language)}
            className="mb-8 inline-flex items-center gap-2 text-sm text-background/60 transition-colors hover:text-background"
          >
            <ArrowLeft className="h-4 w-4" />
            {blogContent.backToBlog}
          </Link>

          <div className="mt-6 max-w-3xl">
            <div className="flex items-center gap-3">
              <Badge className="bg-primary text-primary-foreground">
                {post.category}
              </Badge>
              <span className="flex items-center gap-1.5 text-sm text-background/60">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(post.date).toLocaleDateString(locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-background/60">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
            </div>

            <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-balance md:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-background/70">
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="relative -mt-1 aspect-[21/9] w-full overflow-hidden bg-foreground">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
      </div>

      {/* Article Content */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            {/* Main Content */}
            <article className="prose prose-lg max-w-none">
              {contentSections.map((line, index) => {
                if (line.startsWith("## ")) {
                  return (
                    <h2
                      key={index}
                      className="mt-12 text-2xl font-bold tracking-tight text-foreground first:mt-0 md:text-3xl"
                    >
                      {line.replace("## ", "")}
                    </h2>
                  )
                }
                if (line.startsWith("### ")) {
                  return (
                    <h3
                      key={index}
                      className="mt-8 text-xl font-semibold text-foreground"
                    >
                      {line.replace("### ", "")}
                    </h3>
                  )
                }
                if (line.startsWith("**") && line.endsWith("**")) {
                  return (
                    <p
                      key={index}
                      className="mt-4 font-semibold leading-relaxed text-foreground"
                    >
                      {line.replace(/\*\*/g, "")}
                    </p>
                  )
                }
                if (line.startsWith("- **") || line.startsWith("- ")) {
                  const boldMatch = line.match(/^- \*\*(.+?)\*\*(.*)$/)
                  if (boldMatch) {
                    return (
                      <div key={index} className="mt-2 flex gap-3 text-muted-foreground">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <p className="leading-relaxed">
                          <strong className="text-foreground">{boldMatch[1]}</strong>
                          {boldMatch[2]}
                        </p>
                      </div>
                    )
                  }
                  return (
                    <div key={index} className="mt-2 flex gap-3 text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <p className="leading-relaxed">{line.replace(/^- /, "")}</p>
                    </div>
                  )
                }
                if (line.match(/^\d+\.\s\*\*/)) {
                  const match = line.match(/^\d+\.\s\*\*(.+?)\*\*\s*[—-]?\s*(.*)$/)
                  if (match) {
                    return (
                      <div key={index} className="mt-3 flex gap-3 text-muted-foreground">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          {line.match(/^(\d+)/)?.[1]}
                        </span>
                        <p className="leading-relaxed">
                          <strong className="text-foreground">{match[1]}</strong>
                          {match[2] ? ` — ${match[2]}` : ""}
                        </p>
                      </div>
                    )
                  }
                }
                if (line.startsWith("| ")) {
                  return null
                }
                if (line.startsWith("**") && line.includes(":**")) {
                  const match = line.match(/^\*\*(.+?):\*\*\s*(.*)$/)
                  if (match) {
                    return (
                      <p key={index} className="mt-3 leading-relaxed text-muted-foreground">
                        <strong className="text-foreground">{match[1]}:</strong> {match[2]}
                      </p>
                    )
                  }
                }
                if (line.startsWith("**") && !line.endsWith("**")) {
                  const match = line.match(/^\*\*(.+?)\*\*\s*(.*)$/)
                  if (match) {
                    return (
                      <p key={index} className="mt-3 leading-relaxed text-muted-foreground">
                        <strong className="text-foreground">{match[1]}</strong> {match[2]}
                      </p>
                    )
                  }
                }
                return (
                  <p
                    key={index}
                    className="mt-4 leading-relaxed text-muted-foreground"
                  >
                    {line}
                  </p>
                )
              })}

              {/* Share & Tags */}
              <div className="mt-16 border-t border-border pt-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* CTA Card */}
              <div className="rounded-2xl bg-primary p-8 text-primary-foreground">
                <h3 className="text-lg font-bold">{blogContent.needRepairTitle}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-80">
                  {blogContent.needRepairText}
                </p>
                <ComingSoonLink href={localizeHref("/contact", language)}>
                  <Button
                    size="sm"
                    className="mt-6 w-full gap-2 bg-background text-foreground hover:bg-background/90"
                  >
                    {blogContent.requestService}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </ComingSoonLink>
                <ComingSoonLink
                  href="https://wa.me/?text=Hi%2C%20I%20need%20help%20with%20my%20car%20AC"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-3 w-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  >
                    {blogContent.chatWhatsApp}
                  </Button>
                </ComingSoonLink>
              </div>

              {/* Share */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="flex items-center gap-2 font-semibold text-foreground">
                  <Share2 className="h-4 w-4" />
                  {blogContent.shareTitle}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {blogContent.shareText}
                </p>
              </div>

              {/* Related Posts */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">{blogContent.relatedArticles}</h3>
                <div className="mt-4 space-y-4">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.slug}
                      href={localizeHref(`/blog/${related.slug}`, language)}
                      className="group flex gap-3"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={related.image}
                          alt={related.imageAlt}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-medium leading-snug text-foreground line-clamp-2 group-hover:text-primary">
                          {related.title}
                        </h4>
                        <span className="mt-1 text-xs text-muted-foreground">
                          {related.readTime}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">{blogContent.quickLinks}</h3>
                <ul className="mt-4 space-y-2">
                  {blogContent.quickLinkItems.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={localizeHref(link.href, language)}
                        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        <ArrowRight className="h-3 w-3" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* More Articles CTA */}
      <section className="bg-secondary py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-secondary-foreground">
              {blogContent.continueReading}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {blogContent.continueDescription}
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={localizeHref(`/blog/${related.slug}`, language)}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={related.image}
                    alt={related.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <Badge variant="outline" className="w-fit text-xs">
                    {related.category}
                  </Badge>
                  <h3 className="mt-3 font-semibold leading-snug text-foreground text-balance">
                    {related.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-2">
                    {related.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary">
                    {blogContent.readArticle}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
