# Next.js Migration Design Spec

**Date:** 2026-03-27
**Goal:** Create a new repo with an exact 1:1 clone of the Greater Boston Livery site, migrated from React + Vite + vite-react-ssg to Next.js App Router for true SSR.

## Project Setup

- **New repo:** `greater-boston-livery-nextjs`
- **Framework:** Next.js 15 (App Router, TypeScript strict mode)
- **Package manager:** npm
- **Node version:** 20
- **Hosting:** Netlify (same GitHub push-to-deploy workflow)

## Directory Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout (fonts, metadata, Navbar, Footer, Lenis, CustomCursor)
│   ├── page.tsx             # Home page
│   ├── fleet/page.tsx
│   ├── services/page.tsx
│   ├── services/[id]/page.tsx   # Dynamic service detail (generateStaticParams)
│   ├── reviews/page.tsx
│   ├── contact/page.tsx
│   ├── team/page.tsx
│   ├── not-found.tsx        # 404 page
│   ├── sitemap.ts           # Auto-generated sitemap
│   └── robots.ts            # Auto-generated robots.txt
├── components/
│   ├── layout/              # Navbar, Footer, ScrollToTop
│   ├── motion/              # RevealOnScroll, PageTransition, StaggerChildren
│   ├── shared/              # VehicleCard, ReviewCard
│   └── ui/                  # CustomCursor
├── hooks/                   # useLenis, useScrolled
├── data/                    # services.ts, vehicles.ts, reviews.ts (exact copies)
├── types/                   # Vehicle, Service, Review, FormData (exact copies)
├── utils/                   # seo.ts (schema builders), cn.ts
└── styles/                  # globals.css
public/
├── (all vehicle images, logo, og image — exact copies)
```

## Component Migration Rules

### Server Components (default)
Pages that just render data with no hooks or event handlers. Page files can be server components that import client sub-components.

### Client Components (`"use client"`)
Anything using `useState`, `useEffect`, `useRef`, Framer Motion `motion.*`, Lenis, or event handlers:
- All motion components (RevealOnScroll, PageTransition, StaggerChildren)
- Navbar (scroll state, mobile menu toggle)
- CustomCursor
- VehicleCard (hover state)
- Contact form
- Lenis hook

No logic changes — components keep their exact same internal logic, just add the `"use client"` directive.

## SEO Migration

| Current (Vite + SSG) | Next.js Equivalent |
|---|---|
| `react-helmet-async` `<Head>` | `next/metadata` API (per-route `metadata` exports) |
| `vite-react-ssg` | Built-in SSR/SSG (no extra library) |
| Manual `public/sitemap.xml` | `app/sitemap.ts` (auto-generated) |
| React Router DOM | File-based routing (`app/` directory) |
| Manual WebP images in `public/` | `next/image` with auto-optimization |
| Google Fonts via `<link>` | `next/font/google` (self-hosted, zero CLS) |

### Metadata
- **Root `layout.tsx`:** Default metadata (site name, OG defaults, icons)
- **Each `page.tsx`:** Exports `metadata` or `generateMetadata()` with the same titles, descriptions, and OG tags currently set via `<Head>` in each page
- **JSON-LD schemas:** Render as `<script type="application/ld+json">` in page components using the same `seo.ts` builder functions

### Sitemap & Robots
- **`app/sitemap.ts`:** Exports function returning all routes with `changeFrequency` and `priority` (matching current sitemap.xml values)
- **`app/robots.ts`:** Same rules as current robots.txt

## Font Loading

```tsx
// app/layout.tsx
import { Playfair_Display, Inter } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
```

Replaces the current Google Fonts `<link>` tags. CSS variables keep the same names so the Tailwind config doesn't change.

## Image Handling

- Use `next/image` for all vehicle photos and the logo — automatic optimization, lazy loading, responsive sizing
- OG image (`gbl_og.webp`) stays in `public/` as-is (OG images must be statically served)

## Routing

- **No `react-router-dom`** — file-based routing replaces it entirely
- **Dynamic routes:** `services/[id]/page.tsx` with `generateStaticParams()` returning the 5 service IDs (airport, corporate, weddings, roadshows, nightlife)
- **404:** `app/not-found.tsx` replaces the wildcard route
- **No `ScrollToTop` component needed** — Next.js handles scroll restoration natively
- **Page transitions:** Wrap `{children}` in `layout.tsx` with the existing `PageTransition` component

## Netlify Deployment

- Install `@netlify/plugin-nextjs`
- `netlify.toml`:
  ```toml
  [build]
  command = "npm run build"
  publish = ".next"

  [[plugins]]
  package = "@netlify/plugin-nextjs"
  ```
- Same GitHub integration — push to main, Netlify builds and deploys

## What Does NOT Change

- All Tailwind config (colors, fonts, spacing, plugins)
- All CSS in `globals.css`
- All data files (`services.ts`, `vehicles.ts`, `reviews.ts`)
- All type definitions (`Vehicle`, `Service`, `Review`, `FormData`)
- All component visual output and animation behavior
- All copy/content
- All images
- Moovs booking URL (`customer.moovs.app/greater-boston-coach/request/new`)
- `cn.ts` utility

## Dependencies

### Keep (same libraries)
- `framer-motion`
- `lenis`
- `lucide-react`
- `clsx`
- `tailwind-merge`

### Add
- `next` (15.x)
- `@netlify/plugin-nextjs`

### Remove (replaced by Next.js built-ins)
- `react-router-dom`
- `react-helmet-async`
- `vite-react-ssg`
- `vite` (and all vite plugins)
