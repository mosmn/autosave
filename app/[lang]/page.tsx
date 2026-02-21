import { notFound } from "next/navigation"
import HomePage from "@/app/page"
import { isLanguage } from "@/lib/language"

interface LocalizedPageProps {
  params: Promise<{ lang: string }>
}

export default async function LocalizedHomePage({ params }: LocalizedPageProps) {
  const { lang } = await params

  if (!isLanguage(lang)) {
    notFound()
  }

  return <HomePage />
}
