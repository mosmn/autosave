# AUTO SAVE — Car AC Service Website

Production-ready bilingual (English/Arabic) website for car air conditioning services, built with Next.js App Router and TypeScript.

## Overview

This project is a marketing and lead-generation website for car AC services, including:

- Home page sections (hero, pricing, benefits, testimonials, FAQ, CTA)
- Static pages: About, Contact, Terms
- SEO blog with dynamic post pages
- Arabic and English localized content
- Language-aware routing and cookie-based language persistence
- SEO support (metadata, `robots.txt`, `sitemap.xml`, Open Graph/Twitter tags)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **UI:** React 19 + Radix UI components
- **Styling:** Tailwind CSS v4
- **Forms/Validation:** React Hook Form + Zod
- **Theme:** `next-themes`
- **Analytics:** Vercel Analytics
- **Package manager:** pnpm (lockfile included)

## Languages Used

- **Code:** TypeScript / TSX, CSS
- **Content/UI languages:**
  - English (`en`)
  - Arabic (`ar`) with RTL support

## Project Structure (high level)

- `app/` — App Router pages, metadata, sitemap, robots
- `app/[lang]/` — localized routes (`/en/*`, `/ar/*`)
- `components/` — reusable UI and home sections
- `lib/` — i18n helpers, language utilities, blog/content data
- `public/` — static assets and images
- `styles/` — global styles

## Local Development Setup

### 1) Prerequisites

Install the following:

- **Node.js** 20+
- **pnpm** 9+
- **Git**

Check versions:

```bash
node -v
pnpm -v
git --version
```

### 2) Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd car-ac-service-website
```

### 3) Install dependencies

```bash
pnpm install
```

### 4) Configure environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> For production, set this to your real domain (for example: `https://yourdomain.com`).

### 5) Run locally

```bash
pnpm dev
```

Open: `http://localhost:3000`

## Available Scripts

- `pnpm dev` — start development server
- `pnpm build` — create production build
- `pnpm start` — run production server
- `pnpm lint` — run ESLint

## Build and Run in Production (local test)

```bash
pnpm build
pnpm start
```

## Routing & i18n Behavior

- Supported languages are `en` and `ar`
- Middleware/proxy redirects non-localized routes to a localized path
  - Example: `/about` → `/en/about` or `/ar/about` (based on cookie/default)
- Selected language is stored in `site_lang` cookie
- Arabic pages render with RTL direction

## SEO Notes

The app includes:

- Dynamic metadata by language
- Generated sitemap at `/sitemap.xml`
- Robots file at `/robots.txt`
- Open Graph + Twitter metadata

## Deploying

You can deploy on any Next.js-compatible platform (Vercel recommended).

Basic flow:

1. Push code to GitHub
2. Import repository in your hosting platform
3. Add environment variable:
   - `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`
4. Build command: `pnpm build`
5. Start command: `pnpm start` (if required by platform)

## Contributing

1. Create a feature branch
2. Make your changes
3. Run lint/build locally
4. Open a pull request

## License

Add your preferred license file (for example `MIT`) before publishing publicly.
