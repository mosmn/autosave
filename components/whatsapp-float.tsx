"use client"

import { MessageCircle } from "lucide-react"
import { usePathname } from "next/navigation"
import { getContentByLanguage } from "@/lib/content"
import { getLanguageFromPathname, type Language } from "@/lib/language"

interface WhatsAppFloatProps {
  language: Language
}

export function WhatsAppFloat({ language }: WhatsAppFloatProps) {
  const content = getContentByLanguage(language)
  const pathname = usePathname()
  const pathLanguage = getLanguageFromPathname(pathname)
  const soonMessage =
    pathLanguage === "ar"
      ? "قريباً سنخدمك بطريقة احترافية."
      : "Soon we will serve you in a professional way."

  const handleWhatsAppClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    window.alert(soonMessage)
  }

  return (
    <a
      href="https://wa.me/?text=Hi%2C%20I%20need%20help%20with%20my%20car%20AC.%20Can%20you%20assist%3F"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleWhatsAppClick}
      title={soonMessage}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 transition-all hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40"
      aria-label={content.shared.whatsappAria}
    >
      <MessageCircle className="h-7 w-7 text-[#ffffff]" />
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
        <span className="relative inline-flex h-4 w-4 rounded-full bg-[#25D366]" />
      </span>
    </a>
  )
}
