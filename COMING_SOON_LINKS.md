# Coming Soon Buttons and Links Inventory

This document lists all buttons/links that currently show the localized **Coming Soon** message:
- English: `Soon we will serve you in a professional way.`
- Arabic: `قريباً سنخدمك بطريقة احترافية.`

## Shared handler
- Component: `components/coming-soon-link.tsx` (starts at line 17)
- Logic source: language from current pathname (`/en/...` or `/ar/...`)
- Path language resolver: `lib/language.ts` (line 41)

## Buttons and links using ComingSoonLink

| # | UI action | Type | Target path/link | File location | Line |
|---|---|---|---|---|---|
| 1 | Header quote button (desktop) | Button Link | `https://wa.me/?text=...` | `components/site-header.tsx` | 45 |
| 2 | Header quote button (mobile menu) | Button Link | `https://wa.me/?text=...` | `components/site-header.tsx` | 86 |
| 3 | Home hero primary CTA | Button Link | `/contact` (localized) | `components/home/hero-section.tsx` | 53 |
| 4 | Home hero WhatsApp CTA | Button Link | `https://wa.me/?text=...` | `components/home/hero-section.tsx` | 59 |
| 5 | Home CTA section primary button | Button Link | `/contact` (localized) | `components/home/cta-section.tsx` | 26 |
| 6 | Home CTA section WhatsApp button | Button Link | `https://wa.me/?text=...` | `components/home/cta-section.tsx` | 32 |
| 7 | Pricing plan CTA button (per plan card) | Button Link | `/contact` (localized) | `components/home/pricing-section.tsx` | 77 |
| 8 | Contact page "Book Now" (Drop-Off) | Button Link | `https://wa.me/?text=...` | `app/contact/page.tsx` | 130 |
| 9 | Contact page "Book Now" (Pickup) | Button Link | `https://wa.me/?text=...` | `app/contact/page.tsx` | 148 |
| 10 | Contact page sidebar WhatsApp button | Button Link | `https://wa.me/?text=...` | `app/contact/page.tsx` | 176 |
| 11 | About page CTA button | Button Link | `/contact` (localized) | `app/about/page.tsx` | 208 |
| 12 | Blog post sidebar "Request Service" button | Button Link | `/contact` (localized) | `app/blog/[slug]/page.tsx` | 264 |
| 13 | Blog post sidebar WhatsApp button | Button Link | `https://wa.me/?text=...` | `app/blog/[slug]/page.tsx` | 273 |
| 14 | Terms inline contact link | Text Link | `/contact` (localized) | `app/terms/page.tsx` | 109 |

## Buttons and links using equivalent local handler (same message)

| # | UI action | Type | Target path/link | File location | Line |
|---|---|---|---|---|---|
| 1 | Floating WhatsApp button | Floating Link Button | `https://wa.me/?text=...` | `components/whatsapp-float.tsx` | 28 |

## Notes
- "localized" means it resolves to `/en/contact` or `/ar/contact` based on current language.
- The floating WhatsApp button uses a local handler in its own component but shows the same localized message.
