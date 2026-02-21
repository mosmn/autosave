import { notFound } from "next/navigation"
import BlogPage, { generateMetadata } from "@/app/blog/page"
import { isLanguage } from "@/lib/language"

interface LocalizedPageProps {
  params: Promise<{ lang: string }>
}

export { generateMetadata }

export default async function LocalizedBlogPage({ params }: LocalizedPageProps) {
  const { lang } = await params

  if (!isLanguage(lang)) {
    notFound()
  }

  return <BlogPage />
}
