import { notFound } from "next/navigation"
import BlogPostPage, {
  generateMetadata,
  generateStaticParams as generateBaseStaticParams,
} from "@/app/blog/[slug]/page"
import { isLanguage } from "@/lib/language"

interface LocalizedBlogPostPageProps {
  params: Promise<{ lang: string; slug: string }>
}

export { generateMetadata }

export async function generateStaticParams() {
  const baseParams = await generateBaseStaticParams()

  return ["en", "ar"].flatMap((lang) =>
    baseParams.map((entry) => ({
      lang,
      slug: entry.slug,
    })),
  )
}

export default async function LocalizedBlogPostPage({ params }: LocalizedBlogPostPageProps) {
  const { lang, slug } = await params

  if (!isLanguage(lang)) {
    notFound()
  }

  return <BlogPostPage params={Promise.resolve({ slug })} />
}
