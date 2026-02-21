import { notFound } from "next/navigation"
import TermsPage, { generateMetadata } from "@/app/terms/page"
import { isLanguage } from "@/lib/language"

interface LocalizedPageProps {
  params: Promise<{ lang: string }>
}

export { generateMetadata }

export default async function LocalizedTermsPage({ params }: LocalizedPageProps) {
  const { lang } = await params

  if (!isLanguage(lang)) {
    notFound()
  }

  return <TermsPage />
}
