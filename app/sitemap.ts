import type { MetadataRoute } from "next"
import { blogPosts } from "@/lib/blog-data"
import { SUPPORTED_LANGUAGES } from "@/lib/language"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://coolcar-ac.com"
  const now = new Date()

  const localizedUrl = (language: string, path: string) => {
    const normalizedPath = path === "/" ? "" : path
    return `${baseUrl}/${language}${normalizedPath}`
  }

  const createLocalizedEntries = (
    path: string,
    changeFrequency: "weekly" | "monthly" | "yearly",
    priority: number,
    lastModified: Date = now,
  ) => {
    const enUrl = localizedUrl("en", path)
    const arUrl = localizedUrl("ar", path)

    return SUPPORTED_LANGUAGES.map((language) => {
      const url = localizedUrl(language, path)

      return {
        url,
        lastModified,
        changeFrequency,
        priority,
        alternates: {
          languages: {
            en: enUrl,
            ar: arUrl,
            "x-default": enUrl,
          },
        },
      }
    })
  }

  const blogRoutes = blogPosts.flatMap((post) =>
    createLocalizedEntries(`/blog/${post.slug}`, "monthly", 0.7, new Date(post.date)),
  )

  return [
    ...createLocalizedEntries("/", "weekly", 1),
    ...createLocalizedEntries("/about", "monthly", 0.8),
    ...createLocalizedEntries("/blog", "weekly", 0.9),
    ...createLocalizedEntries("/contact", "monthly", 0.8),
    ...createLocalizedEntries("/terms", "yearly", 0.3),
    ...blogRoutes,
  ]
}
