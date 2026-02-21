import { notFound } from "next/navigation"
import { SUPPORTED_LANGUAGES, isLanguage } from "@/lib/language"

interface LocalizedLayoutProps {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }))
}

export default async function LocalizedLayout({ children, params }: LocalizedLayoutProps) {
  const { lang } = await params

  if (!isLanguage(lang)) {
    notFound()
  }

  return children
}
