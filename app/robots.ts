import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: "https://coolcar-ac.com",
    sitemap: "https://coolcar-ac.com/sitemap.xml",
  }
}
