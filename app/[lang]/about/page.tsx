import { notFound } from "next/navigation"
import AboutPage, { generateMetadata } from "@/app/about/page"
import { isLanguage } from "@/lib/language"

interface LocalizedPageProps {
  params: Promise<{ lang: string }>
}

export { generateMetadata }

export default async function LocalizedAboutPage({ params }: LocalizedPageProps) {
  const { lang } = await params

  if (!isLanguage(lang)) {
    notFound()
  }

  return <AboutPage />
}
