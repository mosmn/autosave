import { notFound } from "next/navigation"
import ContactPage, { generateMetadata } from "@/app/contact/page"
import { isLanguage } from "@/lib/language"

interface LocalizedPageProps {
  params: Promise<{ lang: string }>
}

export { generateMetadata }

export default async function LocalizedContactPage({ params }: LocalizedPageProps) {
  const { lang } = await params

  if (!isLanguage(lang)) {
    notFound()
  }

  return <ContactPage />
}
