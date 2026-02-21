"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { getLanguageFromPathname } from "@/lib/language"

interface ComingSoonLinkProps {
  href: string
  children: ReactNode
  className?: string
  target?: string
  rel?: string
  onClick?: () => void
}

export function ComingSoonLink({
  href,
  children,
  className,
  target,
  rel,
  onClick,
}: ComingSoonLinkProps) {
  const pathname = usePathname()
  const language = getLanguageFromPathname(pathname)
  const message =
    language === "ar"
      ? "قريباً سنخدمك بطريقة احترافية."
      : "Soon we will serve you in a professional way."

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onClick?.()
    window.alert(message)
  }

  return (
    <Link
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={handleClick}
      title={message}
    >
      {children}
    </Link>
  )
}
