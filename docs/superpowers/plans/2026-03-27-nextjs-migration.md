# Next.js Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a new repo `greater-boston-livery-nextjs` with an exact 1:1 clone of the Greater Boston Livery site, migrated from React + Vite + vite-react-ssg to Next.js 15 App Router.

**Architecture:** Next.js 15 App Router with file-based routing. Pages are server components by default; interactive components get `"use client"` directives. Tailwind CSS, Framer Motion, Lenis, and Lucide React carry over unchanged. SEO shifts from react-helmet-async to Next.js Metadata API. Deployed on Netlify via `@netlify/plugin-nextjs`.

**Tech Stack:** Next.js 15, React 18, TypeScript (strict), Tailwind CSS 3, Framer Motion 11, Lenis, Lucide React, clsx + tailwind-merge, `@netlify/plugin-nextjs`.

**Source reference:** The current Vite site lives at `C:/Users/lukeg/client-websites/greater-boston-livery/greater-boston-livery/`. All file paths in this plan reference that location as `{SRC}` for brevity.

---

## File Structure

```
greater-boston-livery-nextjs/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout: fonts, default metadata, Navbar, Footer, Lenis, CustomCursor, NoiseOverlay
│   │   ├── page.tsx                # Home page (server component importing client sub-components)
│   │   ├── fleet/
│   │   │   └── page.tsx
│   │   ├── services/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx        # generateStaticParams for 5 service IDs
│   │   ├── reviews/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── team/
│   │   │   └── page.tsx
│   │   ├── not-found.tsx           # Custom 404
│   │   ├── sitemap.ts              # Auto-generated sitemap
│   │   └── robots.ts               # Auto-generated robots.txt
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # "use client"
│   │   │   ├── Footer.tsx          # "use client" (BostonClock uses useState/useEffect)
│   │   │   └── ScrollToTop.tsx     # "use client"
│   │   ├── motion/
│   │   │   ├── PageTransition.tsx  # "use client"
│   │   │   ├── RevealOnScroll.tsx  # "use client"
│   │   │   └── StaggerChildren.tsx # "use client"
│   │   ├── shared/
│   │   │   ├── VehicleCard.tsx     # "use client"
│   │   │   └── ReviewCard.tsx      # Server component (no hooks/state)
│   │   └── ui/
│   │       └── CustomCursor.tsx    # "use client"
│   ├── hooks/
│   │   ├── useLenis.ts            # "use client" (module-level singleton)
│   │   └── useScrolled.ts         # No change needed (used only in client components)
│   ├── data/
│   │   ├── services.ts            # Exact copy (no import.meta.env usage)
│   │   ├── vehicles.ts            # Replace import.meta.env.BASE_URL with "/"
│   │   └── reviews.ts             # Exact copy
│   ├── types/
│   │   └── index.ts               # Exact copy
│   ├── utils/
│   │   ├── seo.ts                 # Exact copy (schema builders + constants)
│   │   └── cn.ts                  # Exact copy
│   └── styles/
│       └── globals.css            # Exact copy
├── public/
│   ├── (all images from current public/)
│   └── favicon.svg
├── next.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── package.json
├── netlify.toml
└── .gitignore
```

---

### Task 1: Initialize Next.js Project and Install Dependencies

**Files:**
- Create: `greater-boston-livery-nextjs/package.json` (via create-next-app)
- Modify: `greater-boston-livery-nextjs/package.json` (add remaining deps)

- [ ] **Step 1: Create the new repo directory**

```bash
cd C:/Users/lukeg/client-websites/greater-boston-livery
npx create-next-app@latest greater-boston-livery-nextjs --typescript --tailwind --eslint --app --src-dir --no-turbopack --import-alias "@/*"
```

When prompted, accept defaults. This scaffolds a Next.js 15 project with App Router, TypeScript, Tailwind, ESLint, and `src/` directory.

- [ ] **Step 2: Install additional dependencies**

```bash
cd C:/Users/lukeg/client-websites/greater-boston-livery/greater-boston-livery-nextjs
npm install framer-motion@^11.18.0 lenis@^1.1.14 lucide-react@^0.468.0 clsx@^2.1.1 tailwind-merge@^2.5.4
```

- [ ] **Step 3: Install Netlify plugin**

```bash
npm install -D @netlify/plugin-nextjs
```

- [ ] **Step 4: Initialize git repo and commit**

```bash
cd C:/Users/lukeg/client-websites/greater-boston-livery/greater-boston-livery-nextjs
git init
git add -A
git commit -m "chore: initialize Next.js 15 project with dependencies"
```

---

### Task 2: Configure Tailwind, PostCSS, and TypeScript

**Files:**
- Modify: `tailwind.config.js` (replace with project theme — NOTE: if create-next-app generates `tailwind.config.ts`, rename to `.js` first or adapt)
- Modify: `postcss.config.js` (should already be correct from create-next-app)
- Modify: `tsconfig.json` (add strict mode settings)

- [ ] **Step 1: Replace tailwind.config with project theme**

Replace the contents of `tailwind.config.js` (or `.ts`) with:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A192F',
          dark: '#061120',
          light: '#112240',
        },
        black: {
          rich: '#020202',
        },
        gold: {
          DEFAULT: '#C5A059',
          light: '#D4B47A',
          dark: '#A8853E',
        },
        silver: '#E5E5E5',
        cream: '#F9F9F9',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '2px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'cursor-expand': 'cursorExpand 0.2s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
```

**Key difference from original:** Font family uses `var(--font-playfair)` and `var(--font-inter)` CSS variables (set by `next/font` in layout.tsx) instead of raw font names. This ensures the self-hosted fonts from `next/font` are used.

- [ ] **Step 2: Verify postcss.config**

Ensure `postcss.config.js` (or `.mjs`) contains:

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

If create-next-app generated a different format (e.g., Tailwind v4 with `@tailwindcss/postcss`), replace it with the above for Tailwind v3 compatibility.

- [ ] **Step 3: Update tsconfig.json**

Ensure `tsconfig.json` includes strict mode and the `@/*` path alias. create-next-app should have set this up, but verify:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.js postcss.config.js tsconfig.json
git commit -m "chore: configure Tailwind theme, PostCSS, and TypeScript"
```

---

### Task 3: Copy Static Assets, Data, Types, and Utilities

**Files:**
- Copy: All images from `{SRC}/public/` → `public/`
- Copy: `{SRC}/src/types/index.ts` → `src/types/index.ts`
- Copy: `{SRC}/src/utils/seo.ts` → `src/utils/seo.ts`
- Copy: `{SRC}/src/utils/cn.ts` → `src/utils/cn.ts`
- Copy: `{SRC}/src/data/services.ts` → `src/data/services.ts`
- Copy: `{SRC}/src/data/reviews.ts` → `src/data/reviews.ts`
- Create: `src/data/vehicles.ts` (modified — remove `import.meta.env.BASE_URL`)

- [ ] **Step 1: Copy public assets**

```bash
SRC="C:/Users/lukeg/client-websites/greater-boston-livery/greater-boston-livery"
DEST="C:/Users/lukeg/client-websites/greater-boston-livery/greater-boston-livery-nextjs"

# Remove default Next.js assets
rm -f "$DEST/public/file.svg" "$DEST/public/globe.svg" "$DEST/public/next.svg" "$DEST/public/vercel.svg" "$DEST/public/window.svg"

# Copy all project assets
cp "$SRC/public/"*.webp "$DEST/public/"
cp "$SRC/public/"*.svg "$DEST/public/"
cp "$SRC/public/"*.PNG "$DEST/public/" 2>/dev/null || true
```

- [ ] **Step 2: Copy types, utils, data directories**

```bash
mkdir -p "$DEST/src/types" "$DEST/src/utils" "$DEST/src/data"

cp "$SRC/src/types/index.ts" "$DEST/src/types/index.ts"
cp "$SRC/src/utils/seo.ts" "$DEST/src/utils/seo.ts"
cp "$SRC/src/utils/cn.ts" "$DEST/src/utils/cn.ts"
cp "$SRC/src/data/services.ts" "$DEST/src/data/services.ts"
cp "$SRC/src/data/reviews.ts" "$DEST/src/data/reviews.ts"
```

- [ ] **Step 3: Create modified vehicles.ts**

The original `vehicles.ts` uses `` `${import.meta.env.BASE_URL}filename.webp` `` for image paths. In Next.js, images in `public/` are served from `/` directly. Replace all instances with `"/filename.webp"`.

Create `src/data/vehicles.ts` with the exact same content as the original, but replace every occurrence of `` `${import.meta.env.BASE_URL}` `` with `"/"`. For example:

```typescript
image: `${import.meta.env.BASE_URL}chrysler_300.webp`,
```
becomes:
```typescript
image: '/chrysler_300.webp',
```

Copy the file and do a find-replace:

```bash
cp "$SRC/src/data/vehicles.ts" "$DEST/src/data/vehicles.ts"
sed -i 's/`${import.meta.env.BASE_URL}/`\//g' "$DEST/src/data/vehicles.ts"
```

Then simplify the backtick template literals to plain strings since there's no interpolation left:

```bash
sed -i "s/\`\//'\//g; s/\.webp\`/.webp'/g" "$DEST/src/data/vehicles.ts"
```

Verify the file looks correct — each vehicle `image` should be like `'/chrysler_300.webp'`.

- [ ] **Step 4: Verify the @/ path alias works for all copied files**

The data files use `import type { Vehicle } from '@/types'` etc. Since we set up the `@/*` → `./src/*` alias in tsconfig, these imports should work unchanged.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: copy static assets, data, types, and utilities from Vite project"
```

---

### Task 4: Port Global CSS

**Files:**
- Modify: `src/app/globals.css` (replace with project CSS)

- [ ] **Step 1: Replace globals.css**

Delete the default Next.js `globals.css` and replace with the exact content from `{SRC}/src/styles/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --navy: #0A192F;
    --navy-dark: #061120;
    --navy-light: #112240;
    --gold: #C5A059;
    --gold-light: #D4B47A;
    --gold-dark: #A8853E;
    --silver: #E5E5E5;
    --cream: #F9F9F9;
    --rich-black: #020202;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-cream text-navy font-body antialiased;
    cursor: none;
  }

  * {
    @apply box-border;
  }

  /* Hide default cursor globally */
  *, *::before, *::after {
    cursor: none !important;
  }
}

@layer components {
  .section-padding {
    @apply px-6 md:px-12 lg:px-24;
  }

  .gold-text {
    @apply text-gold;
  }

  .btn-primary {
    @apply inline-flex items-center gap-2 bg-gold text-navy px-8 py-3 font-body font-medium text-sm tracking-widest uppercase transition-all duration-300;
    @apply hover:bg-gold-dark hover:shadow-[0_0_24px_rgba(197,160,89,0.4)];
    @apply active:scale-[0.98];
  }

  .btn-outline {
    @apply inline-flex items-center gap-2 border border-gold text-gold px-8 py-3 font-body font-medium text-sm tracking-widest uppercase transition-all duration-300;
    @apply hover:bg-gold hover:text-navy hover:shadow-[0_0_24px_rgba(197,160,89,0.4)];
    @apply active:scale-[0.98];
  }

  .btn-ghost {
    @apply inline-flex items-center gap-2 text-gold px-0 py-1 font-body font-medium text-sm tracking-widest uppercase transition-all duration-300;
    @apply hover:gap-4;
  }

  /* Accessible contrast overrides for light backgrounds */
  .bg-cream .label-sm {
    color: rgb(10 25 47 / 0.7);
  }
  .bg-cream .btn-ghost {
    color: rgb(10 25 47 / 0.7);
  }
  .bg-cream .btn-ghost:hover {
    color: rgb(10 25 47 / 1);
  }

  .heading-display {
    @apply font-display text-4xl md:text-5xl lg:text-6xl font-medium leading-tight;
  }

  .heading-lg {
    @apply font-display text-3xl md:text-4xl font-medium leading-tight;
  }

  .heading-md {
    @apply font-display text-2xl md:text-3xl font-medium leading-tight;
  }

  .label-sm {
    @apply font-body text-xs tracking-[0.2em] uppercase text-gold font-medium;
  }

  .divider-gold {
    @apply w-12 h-px bg-gold;
  }

  .noise-overlay {
    @apply pointer-events-none fixed inset-0 z-[9999] opacity-[0.03];
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }

  .gold-gradient {
    background: linear-gradient(135deg, #C5A059 0%, #D4B47A 50%, #A8853E 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .navy-gradient {
    background: linear-gradient(180deg, #0A192F 0%, #061120 100%);
  }
}

/* Lenis smooth scroll */
html.lenis {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

.lenis.lenis-scrolling iframe {
  pointer-events: none;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "chore: port global CSS from Vite project"
```

---

### Task 5: Port Hooks

**Files:**
- Create: `src/hooks/useLenis.ts`
- Create: `src/hooks/useScrolled.ts`

- [ ] **Step 1: Create useLenis.ts**

Create `src/hooks/useLenis.ts` — exact copy from original. This file uses `useEffect` but doesn't need `"use client"` itself because it's only imported by client components. However, since it uses a module-level singleton (`lenisInstance`), it should work fine.

```typescript
'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

let lenisInstance: Lenis | null = null

export function getLenis() {
  return lenisInstance
}

export function useLenis() {
  useEffect(() => {
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenisInstance?.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenisInstance?.destroy()
      lenisInstance = null
    }
  }, [])

  return lenisInstance
}
```

- [ ] **Step 2: Create useScrolled.ts**

Create `src/hooks/useScrolled.ts` — exact copy from original, with `"use client"` directive:

```typescript
'use client'

import { useState, useEffect } from 'react'

export function useScrolled(threshold = 80) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrolled
}
```

- [ ] **Step 3: Commit**

```bash
git add src/hooks/
git commit -m "feat: port useLenis and useScrolled hooks"
```

---

### Task 6: Port Motion Components

**Files:**
- Create: `src/components/motion/PageTransition.tsx`
- Create: `src/components/motion/RevealOnScroll.tsx`
- Create: `src/components/motion/StaggerChildren.tsx`

- [ ] **Step 1: Create PageTransition.tsx**

Exact copy with `"use client"` directive added:

```tsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

export function PageTransition({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Create RevealOnScroll.tsx**

Exact copy with `"use client"` directive added:

```tsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealOnScrollProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
}

export function RevealOnScroll({
  children,
  delay = 0,
  direction = 'up',
  className,
}: RevealOnScrollProps) {
  const prefersReducedMotion = useReducedMotion()

  const directionMap = {
    up: { y: 32, x: 0 },
    down: { y: -32, x: 0 },
    left: { y: 0, x: 32 },
    right: { y: 0, x: -32 },
    none: { y: 0, x: 0 },
  }

  const initial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, ...directionMap[direction] }

  const animate = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, x: 0 }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 3: Create StaggerChildren.tsx**

Exact copy with `"use client"` directive added:

```tsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface StaggerChildrenProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  containerDelay?: number
}

export function StaggerChildren({
  children,
  className,
  staggerDelay = 0.1,
  containerDelay = 0,
}: StaggerChildrenProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
            delayChildren: containerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/motion/
git commit -m "feat: port motion components with 'use client' directives"
```

---

### Task 7: Port Shared and UI Components

**Files:**
- Create: `src/components/shared/ReviewCard.tsx`
- Create: `src/components/shared/VehicleCard.tsx`
- Create: `src/components/ui/CustomCursor.tsx`

- [ ] **Step 1: Create ReviewCard.tsx**

Exact copy from original — this component has NO hooks or state, so it does NOT need `"use client"`. However, it imports `Star` from lucide-react and lucide-react may need client context. Since it's used inside `StaggerItem` (a client component), it will be rendered as a client component by inheritance. Add `"use client"` to be safe:

```tsx
'use client'

import { Star } from 'lucide-react'
import type { Review } from '@/types'

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white border border-silver p-8 flex flex-col gap-4 h-full">
      {/* Stars */}
      <div className="flex items-center gap-1">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} size={14} className="fill-gold text-gold" />
        ))}
      </div>

      {/* Review text */}
      <blockquote className="font-body text-navy/80 text-sm leading-relaxed italic flex-1">
        &ldquo;{review.text}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center justify-between pt-4 border-t border-silver">
        <div>
          <p className="font-body font-medium text-navy text-sm">{review.author}</p>
          {review.service && (
            <p className="label-sm mt-0.5 text-gold/70">{review.service}</p>
          )}
        </div>
        <div className="text-right">
          <p className="font-body text-xs text-navy/40">{review.date}</p>
          <div className="flex items-center justify-end gap-1 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            <p className="text-xs font-body text-gold font-medium">Verified</p>
          </div>
        </div>
      </div>
    </div>
  )
}
```

**Note:** The original uses `"{review.text}"` with literal quote characters. Preserve that exactly.

- [ ] **Step 2: Create VehicleCard.tsx**

Exact copy with `"use client"` added. No other changes needed — the component uses `useState`, `motion`, and `AnimatePresence`:

```tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Wifi, Users, Check, Wine } from 'lucide-react'
import type { Vehicle } from '@/types'

interface VehicleCardProps {
  vehicle: Vehicle
  onClick?: () => void
}

export function VehicleCard({ vehicle, onClick }: VehicleCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group relative overflow-hidden bg-navy cursor-pointer aspect-[4/3]"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      whileTap={{ scale: 0.99 }}
    >
      {/* Vehicle Image */}
      <motion.img
        src={vehicle.image}
        alt={`${vehicle.name} luxury vehicle`}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: isHovered ? 1.06 : 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy/40 to-transparent" />

      {/* Bottom info - always visible */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="label-sm mb-2">{vehicle.category}</p>
        <h3 className="font-display text-xl text-cream font-medium">{vehicle.name}</h3>

        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1.5 text-silver/80 text-xs font-body">
            <Users size={13} />
            <span>{vehicle.capacity} passengers</span>
          </div>
          {vehicle.hasWifi && (
            <div className="flex items-center gap-1.5 text-gold text-xs font-body">
              <Wifi size={13} />
              <span>WiFi</span>
            </div>
          )}
          {vehicle.alcoholFriendly && (
            <div className="flex items-center gap-1.5 text-gold text-xs font-body">
              <Wine size={13} />
              <span>Alcohol OK</span>
            </div>
          )}
        </div>
      </div>

      {/* Hover overlay — Quick Specs */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-navy/95 flex flex-col justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="label-sm mb-3">Quick Specs</p>
            <h3 className="font-display text-xl text-cream mb-6">{vehicle.name}</h3>

            <div className="mb-6">
              <div className="border border-navy-light p-3 inline-block">
                <p className="text-silver/60 text-xs font-body mb-1">Capacity</p>
                <p className="text-cream font-body font-medium">{vehicle.capacity} passengers</p>
              </div>
            </div>

            <ul className="space-y-2">
              {vehicle.features.slice(0, 5).map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-silver/80 text-sm font-body">
                  <Check size={12} className="text-gold flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-navy-light">
              <p className="text-gold text-xs font-body tracking-widest uppercase">View Fleet →</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gold accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-gold"
        animate={{ width: isHovered ? '100%' : '0%' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  )
}
```

- [ ] **Step 3: Create CustomCursor.tsx**

Exact copy with `"use client"` added:

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 28, stiffness: 400, mass: 0.4 }
  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleLeave = () => setIsVisible(false)
    const handleEnter = () => setIsVisible(true)

    const addHover = () => {
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true))
        el.addEventListener('mouseleave', () => setIsHovering(false))
      })
    }

    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseleave', handleLeave)
    document.addEventListener('mouseenter', handleEnter)

    // Re-attach on DOM changes
    const observer = new MutationObserver(addHover)
    observer.observe(document.body, { childList: true, subtree: true })
    addHover()

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('mouseenter', handleEnter)
      observer.disconnect()
    }
  }, [cursorX, cursorY, isVisible])

  return (
    <>
      {/* Outer ring */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full border border-gold"
          animate={{
            width: isHovering ? 56 : 32,
            height: isHovering ? 56 : 32,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full bg-gold"
          animate={{
            width: isHovering ? 6 : 4,
            height: isHovering ? 6 : 4,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/shared/ src/components/ui/
git commit -m "feat: port ReviewCard, VehicleCard, and CustomCursor components"
```

---

### Task 8: Port Layout Components (Navbar, Footer, ScrollToTop)

**Files:**
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/ScrollToTop.tsx`

**Key changes from original:**
- `import { Link } from 'react-router-dom'` → `import Link from 'next/link'`
- `<Link to="...">` → `<Link href="...">`
- `useLocation()` → `usePathname()` from `next/navigation`
- `import.meta.env.BASE_URL` → `/` (for logo image)
- All three get `"use client"` directive

- [ ] **Step 1: Create Navbar.tsx**

```tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useScrolled } from '@/hooks/useScrolled'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/fleet', label: 'Fleet' },
  { href: '/services', label: 'Services' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const scrolled = useScrolled(60)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-cream/95 backdrop-blur-md shadow-sm border-b border-silver'
            : 'bg-cream border-b border-silver'
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="section-padding flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/gbl_logo.webp"
              alt="Greater Boston Livery"
              width={243}
              height={134}
              className="h-16 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-body text-sm tracking-wide transition-colors duration-200 relative group',
                  pathname === link.href
                    ? 'text-gold'
                    : 'text-navy/60 hover:text-navy'
                )}
              >
                {link.label}
                <span className={cn(
                  'absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300',
                  pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                )} />
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+18554254661"
              className="flex items-center gap-2 text-navy/50 hover:text-gold transition-colors text-sm font-body"
            >
              <Phone size={14} />
              <span>(855) 425-4661</span>
            </a>
            <a
              href="https://customer.moovs.app/greater-boston-coach/request/new"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs py-2.5 px-6"
            >
              Book Now
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-navy"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-navy flex flex-col"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="section-padding flex flex-col pt-28 pb-12 h-full">
              <nav className="flex flex-col gap-2 flex-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        'block font-display text-4xl font-medium py-3 border-b border-white/10 transition-colors',
                        pathname === link.href ? 'text-gold' : 'text-cream hover:text-gold'
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="space-y-4 mt-8">
                <a
                  href="tel:+18554254661"
                  className="flex items-center gap-2 text-silver/70 text-sm font-body"
                >
                  <Phone size={14} className="text-gold" />
                  (855) 425-4661
                </a>
                <a
                  href="https://customer.moovs.app/greater-boston-coach/request/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center"
                >
                  Book Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

- [ ] **Step 2: Create Footer.tsx**

```tsx
'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook } from 'lucide-react'
import { useEffect, useState } from 'react'

function BostonClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          timeZone: 'America/New_York',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      )
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
      <span className="font-body text-xs text-silver/70 tracking-widest uppercase">
        Boston Local Time
      </span>
      <span className="font-body text-xs text-gold font-medium">{time}</span>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-navy-dark border-t border-white/5">
      <div className="section-padding pt-20 pb-10">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <p className="font-display text-2xl text-cream font-medium">Greater Boston</p>
              <p className="font-body text-xs tracking-[0.3em] uppercase text-gold">Livery</p>
            </div>
            <p className="font-body text-sm text-silver/70 leading-relaxed mb-6">
              Premium chauffeured transportation serving Greater Boston, Cape Cod, South Shore, North Shore, and New York City. Available 24/7/365.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/GreaterBostonLivery/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2 border border-white/10 text-silver/60 hover:text-gold hover:border-gold transition-colors">
                <Facebook size={14} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="label-sm mb-6">Services</p>
            <ul className="space-y-3">
              {[
                { label: 'Airport Transfers', slug: 'airport' },
                { label: 'Corporate Travel', slug: 'corporate' },
                { label: 'Weddings & Events', slug: 'weddings' },
                { label: 'Roadshows & Tours', slug: 'roadshows' },
                { label: 'Special Occasions', slug: 'nightlife' },
              ].map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="font-body text-sm text-silver/70 hover:text-gold transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Fleet */}
          <div>
            <p className="label-sm mb-6">Our Fleet</p>
            <ul className="space-y-3">
              {['Luxury Sedans', 'Executive SUVs', 'Mercedes Sprinter', 'Stretch Limousine', 'View All Vehicles'].map((v) => (
                <li key={v}>
                  <Link href="/fleet" className="font-body text-sm text-silver/70 hover:text-gold transition-colors">
                    {v}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="label-sm mb-6">Contact</p>
            <ul className="space-y-4">
              <li>
                <a href="tel:+18554254661" className="flex items-start gap-3 text-silver/70 hover:text-gold transition-colors group">
                  <Phone size={14} className="mt-0.5 flex-shrink-0 group-hover:text-gold" />
                  <span className="font-body text-sm">(855) 425-4661</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@greaterbostonlivery.com" className="flex items-start gap-3 text-silver/70 hover:text-gold transition-colors group">
                  <Mail size={14} className="mt-0.5 flex-shrink-0 group-hover:text-gold" />
                  <span className="font-body text-sm">info@greaterbostonlivery.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-silver/70">
                  <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                  <span className="font-body text-sm">Serving Greater Boston<br />& All of New England</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="font-body text-xs text-silver/50">
              © {new Date().getFullYear()} Greater Boston Livery. All rights reserved.
            </p>
            <p className="font-body text-xs text-silver/40">
              Designed & built by{' '}
              <a
                href="https://gradydigital.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
              >
                Grady Digital
              </a>
            </p>
          </div>

          <BostonClock />

          <div className="flex items-center gap-6">
            <Link href="/contact" className="font-body text-xs text-silver/50 hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="font-body text-xs text-silver/50 hover:text-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Create ScrollToTop.tsx**

In Next.js, the App Router handles scroll restoration automatically. However, with Lenis overriding scroll behavior, we still need this component. Replace `useLocation` with `usePathname`:

```tsx
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { getLenis } from '@/hooks/useLenis'

export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/
git commit -m "feat: port Navbar, Footer, and ScrollToTop for Next.js"
```

---

### Task 9: Create Root Layout

**Files:**
- Modify: `src/app/layout.tsx`

This replaces the old `Layout` component from `App.tsx` and the `index.html` metadata.

- [ ] **Step 1: Write layout.tsx**

```tsx
import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { NoiseOverlay } from './noise-overlay'
import { ClientProviders } from './client-providers'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Greater Boston Livery | Premium Chauffeured Transportation',
  description: 'Greater Boston Livery offers premium chauffeured transportation for corporate travel, weddings, and airport transfers throughout the New England area.',
  metadataBase: new URL('https://greaterbostonlivery.com'),
  openGraph: {
    type: 'website',
    url: 'https://greaterbostonlivery.com/',
    title: 'Greater Boston Livery | Premium Chauffeured Transportation',
    description: 'Luxury chauffeured transportation for corporate executives, weddings, and special occasions. Serving Greater Boston, Cape Cod, and New York City. Available 24/7.',
    images: [{ url: '/gbl_og.webp', width: 1200, height: 630 }],
    siteName: 'Greater Boston Livery',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Greater Boston Livery | Premium Chauffeured Transportation',
    description: 'Greater Boston Livery offers premium chauffeured transportation for corporate travel, weddings, and airport transfers throughout the New England area.',
    images: ['/gbl_og.webp'],
  },
  other: {
    'geo.region': 'US-MA',
    'geo.placename': 'Boston, Massachusetts',
    'geo.position': '42.3601;-71.0589',
    'ICBM': '42.3601, -71.0589',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <div className="relative min-h-screen">
          <ScrollToTop />
          <NoiseOverlay />
          <ClientProviders />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Create noise-overlay.tsx**

Simple server component — no hooks needed:

```tsx
export function NoiseOverlay() {
  return <div className="noise-overlay" aria-hidden="true" />
}
```

Save as `src/app/noise-overlay.tsx`.

- [ ] **Step 3: Create client-providers.tsx**

This handles the Lenis hook and CustomCursor (which need client-side hooks):

```tsx
'use client'

import { useState, useEffect } from 'react'
import { useLenis } from '@/hooks/useLenis'
import { CustomCursor } from '@/components/ui/CustomCursor'

function useHasFinePointer() {
  const [hasFinePointer, setHasFinePointer] = useState(false)
  useEffect(() => {
    setHasFinePointer(window.matchMedia('(pointer: fine)').matches)
  }, [])
  return hasFinePointer
}

export function ClientProviders() {
  const hasFinePointer = useHasFinePointer()
  useLenis()

  return hasFinePointer ? <CustomCursor /> : null
}
```

Save as `src/app/client-providers.tsx`.

- [ ] **Step 4: Delete the default page.tsx**

Delete the default Next.js `src/app/page.tsx` (we'll create the real one in the next task).

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx src/app/noise-overlay.tsx src/app/client-providers.tsx src/app/globals.css
git rm src/app/page.tsx 2>/dev/null || true
git commit -m "feat: create root layout with fonts, metadata, Navbar, Footer, Lenis, and CustomCursor"
```

---

### Task 10: Create next.config.ts and netlify.toml

**Files:**
- Modify: `next.config.ts`
- Create: `netlify.toml`

- [ ] **Step 1: Write next.config.ts**

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default nextConfig
```

The `remotePatterns` config is needed because the Services pages use Unsplash URLs for hero images. If we keep using `<img>` tags (not `next/image`) for those external images, this config isn't strictly needed — but it's good to have for future use.

- [ ] **Step 2: Write netlify.toml**

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

- [ ] **Step 3: Commit**

```bash
git add next.config.ts netlify.toml
git commit -m "chore: configure Next.js and Netlify deployment"
```

---

### Task 11: Create sitemap.ts and robots.ts

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`

- [ ] **Step 1: Create sitemap.ts**

```typescript
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://greaterbostonlivery.com'

  return [
    { url: `${baseUrl}/`, lastModified: '2026-03-27', changeFrequency: 'monthly', priority: 1.0 },
    { url: `${baseUrl}/fleet`, lastModified: '2026-03-27', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: '2026-03-27', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/reviews`, lastModified: '2026-03-27', changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: '2026-03-27', changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/team`, lastModified: '2026-03-27', changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/services/airport`, lastModified: '2026-03-27', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services/corporate`, lastModified: '2026-03-27', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services/weddings`, lastModified: '2026-03-27', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services/roadshows`, lastModified: '2026-03-27', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/nightlife`, lastModified: '2026-03-27', changeFrequency: 'monthly', priority: 0.8 },
  ]
}
```

- [ ] **Step 2: Create robots.ts**

```typescript
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://greaterbostonlivery.com/sitemap.xml',
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/sitemap.ts src/app/robots.ts
git commit -m "feat: add auto-generated sitemap and robots.txt"
```

---

### Task 12: Port Home Page

**Files:**
- Create: `src/app/page.tsx`
- Create: `src/app/home-sections.tsx` (client component with all the interactive home sections)

The Home page is the largest page. We split it into a server component (`page.tsx`) that exports metadata and a client component (`home-sections.tsx`) that contains all the Framer Motion interactive sections.

- [ ] **Step 1: Create home-sections.tsx**

This is the entire Home page UI — moved to a client component because it uses Framer Motion extensively. Create `src/app/home-sections.tsx` with the full content of the current `Home` component's JSX, but with these changes:

1. `"use client"` directive at top
2. `import Link from 'next/link'` instead of `import { Link } from 'react-router-dom'`
3. `<Link to="...">` → `<Link href="...">`
4. Remove the `<Head>` block entirely (metadata is handled by the server component)
5. Remove the schema `<script>` tags (moved to server component)
6. Replace `import.meta.env.BASE_URL` with `/` for the boston.webp and gbl_logo.webp image paths

```tsx
'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Shield, Clock, Star, Phone, Plane, Briefcase, Heart, MapPin } from 'lucide-react'
import { PageTransition } from '@/components/motion/PageTransition'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'
import { VehicleCard } from '@/components/shared/VehicleCard'
import { ReviewCard } from '@/components/shared/ReviewCard'
import { vehicles } from '@/data/vehicles'
import { reviews } from '@/data/reviews'

const featuredVehicles = [
  vehicles.find(v => v.id === 'chrysler-300')!,
  vehicles.find(v => v.id === 'jeep-wagoneer')!,
  vehicles.find(v => v.id === 'ford-expedition')!,
]
const featuredReviews = reviews.slice(0, 3)

const coreServices = [
  { icon: Plane, title: 'Airport Transfers', desc: 'Logan, Manchester & T.F. Green with real-time flight tracking.', href: '/services/airport' },
  { icon: Briefcase, title: 'Corporate Travel', desc: 'Executive accounts, invoicing, and on-demand fleet availability.', href: '/services/corporate' },
  { icon: Heart, title: 'Weddings & Events', desc: 'Impeccable coordination for your most important day.', href: '/services/weddings' },
  { icon: MapPin, title: 'Roadshows & Tours', desc: 'Full-day charters throughout New England and beyond.', href: '/services/roadshows' },
]

const trustMarkers = [
  { icon: Shield, label: 'Fully Licensed & Insured' },
  { icon: Clock, label: '24 / 7 Availability' },
  { icon: Star, label: '5-Star Rated Service' },
  { icon: Phone, label: 'Always Reachable' },
]

function HeroSection() {
  const prefersReducedMotion = useReducedMotion()
  const titleWords = ['Arrive.', 'Distinguished.']

  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/boston.webp"
          alt="Boston city skyline at night"
          fetchPriority="high"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-transparent to-navy/30" />
      </div>

      <div className="relative z-10 section-padding w-full">
        <div className="max-w-3xl">
          <h1 className="sr-only">
            Boston&apos;s Premier Chauffeured Transportation Service | Airport Transfers, Corporate Travel &amp; Wedding Car Service | Greater Boston Livery
          </h1>

          <motion.p
            className="label-sm mb-6 !text-silver/70"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Greater Boston&apos;s Premier Chauffeured Service
          </motion.p>

          <p aria-hidden="true" className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-cream font-medium leading-none mb-4">
            {titleWords.map((word, wi) => (
              <span key={word} className="block overflow-hidden pb-4">
                <motion.span
                  className="block"
                  initial={prefersReducedMotion ? { opacity: 0 } : { y: '110%' }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4 + wi * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word === 'Distinguished.' ? (
                    <span className="gold-gradient">{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
              </span>
            ))}
          </p>

          <motion.p
            className="font-body text-lg text-silver/70 max-w-xl leading-relaxed mt-8 mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Chauffeured luxury transportation for corporate executives, weddings, and special occasions — serving Greater Boston, Cape Cod, the South Shore, North Shore, and beyond to New York City. Available 24/7/365.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <a
              href="https://customer.moovs.app/greater-boston-coach/request/new"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto justify-center"
            >
              Reserve Your Ride
              <ArrowRight size={14} />
            </a>
            <a href="tel:+18554254661" className="btn-outline w-full sm:w-auto justify-center">
              <Phone size={14} />
              Call (855) 425-4661
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <p className="label-sm text-silver/30">Scroll</p>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-gold to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 'top' }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}

export function HomeContent() {
  return (
    <PageTransition>
      <HeroSection />

      {/* Trust Markers */}
      <section className="bg-navy border-b border-white/5">
        <div className="section-padding py-8">
          <StaggerChildren className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {trustMarkers.map(({ icon: Icon, label }) => (
              <StaggerItem key={label}>
                <div className="flex items-center gap-3">
                  <Icon size={18} className="text-gold flex-shrink-0" />
                  <span className="font-body text-sm text-silver/70">{label}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Core Services */}
      <section className="section-padding py-28 bg-cream">
        <RevealOnScroll>
          <p className="label-sm mb-4">What We Offer</p>
          <div className="flex items-end justify-between mb-16">
            <h2 className="heading-lg max-w-md">
              Precision. Discretion.<br />
              <span className="gold-gradient">White-Glove Service.</span>
            </h2>
            <Link href="/services" className="btn-ghost hidden md:flex">
              All Services <ArrowRight size={14} />
            </Link>
          </div>
        </RevealOnScroll>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-silver">
          {coreServices.map(({ icon: Icon, title, desc, href }) => (
            <StaggerItem key={title} className="h-full">
              <Link
                href={href}
                className="flex flex-col h-full p-8 border-r border-b border-silver hover:bg-navy group transition-colors duration-300 last:border-r-0"
              >
                <div className="w-10 h-10 border border-gold/30 flex items-center justify-center mb-6 group-hover:border-gold transition-colors">
                  <Icon size={18} className="text-gold" />
                </div>
                <h3 className="font-display text-lg text-navy group-hover:text-cream transition-colors mb-3">{title}</h3>
                <p className="font-body text-sm text-navy/60 group-hover:text-silver/60 transition-colors leading-relaxed">{desc}</p>
                <div className="flex items-center gap-1 mt-auto pt-6 text-gold text-xs tracking-widest uppercase font-medium">
                  Learn more <ArrowRight size={11} />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <div className="mt-8 md:hidden">
          <Link href="/services" className="btn-ghost">
            All Services <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Rebrand Story */}
      <section className="bg-navy section-padding py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/10 to-transparent" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl">
          <RevealOnScroll direction="left">
            <p className="label-sm mb-6">Our Story</p>
            <h2 className="heading-lg text-cream mb-6">
              Serving Greater Boston & Beyond<br />
              <span className="gold-gradient">Since 2013</span>
            </h2>
            <div className="divider-gold mb-8" />
            <div className="space-y-4 font-body text-silver/60 leading-relaxed">
              <p>Greater Boston Livery was built on a straightforward belief: that chauffeured transportation should feel as seamless as it looks. Since 2013, we&apos;ve been earning that trust one ride at a time.</p>
              <p>What began as a small operation has grown into a full-service luxury fleet — professionally staffed and available around the clock — while maintaining the personal touch and attention to detail that define us.</p>
              <p>Through our vast network of global affiliates, we arrange first-class ground transportation for passengers anywhere in the world.</p>
              <p>The fleet grows. The standard doesn&apos;t change.</p>
            </div>
            <div className="mt-8">
              <Link href="/team" className="btn-outline">
                Meet the Team <ArrowRight size={14} />
              </Link>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="right" delay={0.2}>
            <div className="relative">
              <div className="w-full aspect-[4/5] bg-white flex items-center justify-center">
                <img
                  src="/gbl_logo.webp"
                  alt="Greater Boston Livery"
                  className="w-2/3 object-contain"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-2/3 h-2/3 border border-gold/20 -z-10" />
              <div className="absolute -bottom-6 -left-6 bg-gold p-6">
                <p className="font-display text-3xl text-navy font-medium">15+</p>
                <p className="font-body text-xs text-navy/80 mt-1">Years Serving Boston</p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Featured Fleet */}
      <section className="section-padding py-28 bg-cream">
        <RevealOnScroll>
          <p className="label-sm mb-4">The Fleet</p>
          <div className="flex items-end justify-between mb-12">
            <h2 className="heading-lg">Curated for the<br />Discerning Traveler</h2>
            <Link href="/fleet" className="btn-ghost hidden md:flex">
              View Full Fleet <ArrowRight size={14} />
            </Link>
          </div>
        </RevealOnScroll>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredVehicles.map((vehicle) => (
            <StaggerItem key={vehicle.id}>
              <Link href="/fleet" className="block">
                <VehicleCard vehicle={vehicle} />
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <RevealOnScroll className="mt-12 md:hidden">
          <Link href="/fleet" className="btn-ghost">
            View Full Fleet <ArrowRight size={14} />
          </Link>
        </RevealOnScroll>
      </section>

      {/* Testimonials */}
      <section className="section-padding py-28 bg-navy">
        <RevealOnScroll>
          <p className="label-sm mb-4">Client Testimonials</p>
          <div className="flex items-end justify-between mb-12">
            <h2 className="heading-lg text-cream">What Our Clients Say</h2>
            <Link href="/reviews" className="btn-ghost hidden md:flex">
              All Reviews <ArrowRight size={14} />
            </Link>
          </div>
        </RevealOnScroll>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredReviews.map((review) => (
            <StaggerItem key={review.id} className="h-full">
              <ReviewCard review={review} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {/* Final CTA */}
      <section className="section-padding py-24 bg-cream text-center">
        <RevealOnScroll>
          <p className="label-sm mb-6">Ready to Ride?</p>
          <h2 className="heading-display mb-6 max-w-2xl mx-auto">Your journey begins with a single call.</h2>
          <p className="font-body text-navy/60 max-w-lg mx-auto mb-10">Available 24 hours a day, 7 days a week. Reservations, last-minute bookings, and corporate accounts welcome.</p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            <a
              href="https://customer.moovs.app/greater-boston-coach/request/new"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto justify-center"
            >
              Book a Ride <ArrowRight size={14} />
            </a>
            <a href="tel:+18554254661" className="btn-outline w-full sm:w-auto justify-center">
              <Phone size={14} />
              (855) 425-4661
            </a>
          </div>
        </RevealOnScroll>
      </section>
    </PageTransition>
  )
}
```

- [ ] **Step 2: Create page.tsx (server component)**

```tsx
import type { Metadata } from 'next'
import {
  buildLocalBusinessSchema,
  buildWebSiteSchema,
  buildBreadcrumbSchema,
  schemaToString,
  SITE_URL,
  OG_IMAGE_URL,
} from '@/utils/seo'
import { reviews } from '@/data/reviews'
import { HomeContent } from './home-sections'

export const metadata: Metadata = {
  title: 'Greater Boston Livery | Premium Chauffeured Transportation Boston',
  description: 'Greater Boston Livery offers premier chauffeured transportation for airport transfers, corporate travel, weddings and events throughout Greater Boston and New England. Call (855) 425-4661.',
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/`,
    title: 'Greater Boston Livery | Premium Chauffeured Transportation',
    description: 'Premier chauffeured transportation for airport transfers, corporate travel, weddings and events throughout Greater Boston and New England.',
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
    siteName: 'Greater Boston Livery',
    locale: 'en_US',
  },
}

export default function HomePage() {
  const localBusinessSchema = schemaToString(buildLocalBusinessSchema(reviews.length))
  const webSiteSchema = schemaToString(buildWebSiteSchema())
  const breadcrumbSchema = schemaToString(buildBreadcrumbSchema([{ name: 'Home', href: '/' }]))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: localBusinessSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webSiteSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
      <HomeContent />
    </>
  )
}
```

- [ ] **Step 3: Verify the dev server starts**

```bash
npm run dev
```

Open `http://localhost:3000` and verify the home page renders correctly.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx src/app/home-sections.tsx
git commit -m "feat: port Home page with metadata and JSON-LD schemas"
```

---

### Task 13: Port Fleet Page

**Files:**
- Create: `src/app/fleet/page.tsx`

The Fleet page uses `useState`, `useRef`, `AnimatePresence`, and `getLenis()` — it must be a client component for the interactive filtering. We split metadata into a separate export.

- [ ] **Step 1: Create fleet/page.tsx**

Since `generateMetadata` and `"use client"` can't coexist in the same file, we need to split. Create `src/app/fleet/page.tsx` as the server component with metadata, and `src/app/fleet/fleet-content.tsx` as the client component.

**`src/app/fleet/page.tsx`** (server component):

```tsx
import type { Metadata } from 'next'
import {
  buildBreadcrumbSchema,
  schemaToString,
  SITE_URL,
  BUSINESS_NAME,
  BOOKING_URL,
  OG_IMAGE_URL,
} from '@/utils/seo'
import { vehicles } from '@/data/vehicles'
import { FleetContent } from './fleet-content'

export const metadata: Metadata = {
  title: 'Luxury Fleet | Sedans, SUVs, Sprinters & Limos | Greater Boston Livery',
  description: "Browse Greater Boston Livery's luxury fleet: executive sedans, SUVs, Mercedes Sprinters, mini coaches, 55-passenger motor coaches, party buses, and stretch limousines. Available 24/7 in Boston.",
  alternates: { canonical: `${SITE_URL}/fleet` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/fleet`,
    title: 'Our Luxury Fleet | Greater Boston Livery',
    description: 'Browse our full fleet: sedans, SUVs, Mercedes Sprinters, motor coaches, and stretch limousines. Available 24/7 throughout Greater Boston.',
    images: [{ url: OG_IMAGE_URL }],
  },
}

const vehicleListSchema = schemaToString({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Greater Boston Livery Fleet',
  description: 'Luxury chauffeured vehicles available in Greater Boston',
  url: `${SITE_URL}/fleet`,
  numberOfItems: vehicles.length,
  itemListElement: vehicles.map((v, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Product',
      name: v.name,
      description: v.description,
      image: v.image,
      offers: {
        '@type': 'Offer',
        url: BOOKING_URL,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'LocalBusiness', name: BUSINESS_NAME },
      },
    },
  })),
})

const fleetBreadcrumb = schemaToString(
  buildBreadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Fleet', href: '/fleet' },
  ])
)

export default function FleetPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: vehicleListSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: fleetBreadcrumb }} />
      <FleetContent />
    </>
  )
}
```

**`src/app/fleet/fleet-content.tsx`** (client component):

Port the exact content of `Fleet` from the original, with these changes:
1. `"use client"` at top
2. Remove `<Head>` block
3. `import Link from 'next/link'` and `<Link href=...>`
4. Remove schema script tags (moved to server component)

The full component is identical to the original `Fleet` component minus the `Head` block and with the import/link changes. Copy the entire `Fleet` component body (the `VehicleDetailCard` subcomponent, the category constants, the filtering logic, and all JSX) from `{SRC}/src/pages/Fleet.tsx` and apply the changes listed above.

- [ ] **Step 2: Commit**

```bash
git add src/app/fleet/
git commit -m "feat: port Fleet page with category filtering and metadata"
```

---

### Task 14: Port Services Page

**Files:**
- Create: `src/app/services/page.tsx` (server component with metadata)
- Create: `src/app/services/services-content.tsx` (client component)

Same pattern as Fleet — metadata in server component, interactive content in client component.

- [ ] **Step 1: Create the files**

Apply the same transformation pattern as Fleet:
1. Server `page.tsx` exports `metadata` and renders JSON-LD schemas + `<ServicesContent />`
2. Client `services-content.tsx` has `"use client"`, contains the `ServiceBlock` component and all JSX
3. Replace `import { Link } from 'react-router-dom'` → `import Link from 'next/link'`
4. Replace `<Link to=` → `<Link href=`
5. Remove `<Head>` block

Copy the full content from `{SRC}/src/pages/Services.tsx` and apply changes.

- [ ] **Step 2: Commit**

```bash
git add src/app/services/page.tsx src/app/services/services-content.tsx
git commit -m "feat: port Services page with parallax image blocks"
```

---

### Task 15: Port Service Detail Page

**Files:**
- Create: `src/app/services/[id]/page.tsx`
- Create: `src/app/services/[id]/service-detail-content.tsx`

This is a dynamic route. Key differences from original:
- `useParams()` → page receives `params` prop
- `generateStaticParams()` replaces `getStaticPaths`
- `generateMetadata()` for dynamic metadata per service
- `notFound()` from `next/navigation` replaces `<Navigate>`

- [ ] **Step 1: Create page.tsx**

```tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  schemaToString,
  SITE_URL,
  BUSINESS_NAME,
} from '@/utils/seo'
import { services } from '@/data/services'
import { ServiceDetailContent } from './service-detail-content'

export function generateStaticParams() {
  return services.map((service) => ({
    id: service.id,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const service = services.find((s) => s.id === id)
  if (!service) return {}

  return {
    title: service.metaTitle ?? `${service.title} | Greater Boston Livery`,
    description: service.metaDescription ?? service.description,
    alternates: { canonical: `${SITE_URL}/services/${service.id}` },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/services/${service.id}`,
      title: service.metaTitle ?? service.title,
      description: service.metaDescription ?? service.description,
      images: [{ url: service.image }],
    },
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const service = services.find((s) => s.id === id)

  if (!service) notFound()

  const breadcrumbSchema = schemaToString(
    buildBreadcrumbSchema([
      { name: 'Home', href: '/' },
      { name: 'Services', href: '/services' },
      { name: service.title, href: `/services/${service.id}` },
    ])
  )

  const serviceSchema = schemaToString({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/services/${service.id}`,
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#business`,
      name: BUSINESS_NAME,
    },
    areaServed: { '@type': 'State', name: 'Massachusetts' },
    url: `${SITE_URL}/services/${service.id}`,
  })

  const faqSchema = service.faqs
    ? schemaToString(buildFaqSchema(service.faqs))
    : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceSchema }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />}
      <ServiceDetailContent serviceId={id} />
    </>
  )
}
```

- [ ] **Step 2: Create service-detail-content.tsx**

```tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Check, Phone, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { BOOKING_URL } from '@/utils/seo'
import { PageTransition } from '@/components/motion/PageTransition'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'
import { services } from '@/data/services'

// ... (copy the FaqItem component exactly from original)
// ... (copy the ServiceDetail component body, but receive serviceId as prop instead of useParams)

interface ServiceDetailContentProps {
  serviceId: string
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-white/10 last:border-b-0">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="font-display text-base text-cream">{question}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0"
        >
          <ChevronDown size={18} className="text-gold" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="font-body text-sm text-silver/60 leading-relaxed pb-5">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function ServiceDetailContent({ serviceId }: ServiceDetailContentProps) {
  const service = services.find((s) => s.id === serviceId)!
  const currentIndex = services.findIndex((s) => s.id === serviceId)
  const otherServices = services.filter((s) => s.id !== serviceId).slice(0, 3)

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[480px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/10" />
        </div>
        <div className="relative z-10 section-padding pb-16 w-full">
          <nav className="flex items-center gap-2 mb-6 font-body text-xs text-silver/40">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-gold transition-colors">Services</Link>
            <span>/</span>
            <span className="text-silver/70">{service.title}</span>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="label-sm mb-3">{`Service 0${currentIndex + 1}`}</p>
            <h1 className="heading-display text-cream">{service.title}</h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding py-20 bg-cream">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 max-w-7xl">
          <div className="lg:col-span-2">
            <RevealOnScroll>
              <div className="divider-gold mb-8" />
              <div className="space-y-4 font-body text-navy/60 leading-relaxed mb-12">
                {(service.longDescription ?? [service.description]).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <h2 className="font-display text-xl text-navy mb-6">What&apos;s Included</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 font-body text-sm text-navy/80">
                    <div className="w-5 h-5 border border-gold flex items-center justify-center flex-shrink-0">
                      <Check size={10} className="text-gold" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={0.15} className="lg:col-span-1">
            <div className="bg-navy p-8 sticky top-28">
              <p className="label-sm mb-4">Ready to Book?</p>
              <h3 className="font-display text-xl text-cream mb-4">{service.title}</h3>
              <div className="divider-gold mb-6" />
              <p className="font-body text-sm text-silver/60 leading-relaxed mb-8">
                Contact our team to discuss your needs and receive a custom quote — or book instantly online.
              </p>
              <div className="space-y-3">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center">
                  Book Now <ArrowRight size={14} />
                </a>
                <a href="tel:+18554254661" className="btn-outline w-full justify-center">
                  <Phone size={14} />
                  (855) 425-4661
                </a>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* FAQ */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="section-padding py-20 bg-navy">
          <RevealOnScroll>
            <p className="label-sm mb-4">Common Questions</p>
            <h2 className="heading-lg text-cream mb-12 max-w-xl">
              Frequently Asked<br />
              <span className="gold-gradient">Questions</span>
            </h2>
          </RevealOnScroll>
          <div className="max-w-3xl">
            {service.faqs.map((faq) => (
              <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </section>
      )}

      {/* Other Services */}
      <section className="section-padding py-20 bg-cream">
        <RevealOnScroll>
          <p className="label-sm mb-4">Explore More</p>
          <h2 className="heading-lg mb-12">Other Services</h2>
        </RevealOnScroll>
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-silver">
          {otherServices.map(({ id: sid, title, description }) => (
            <StaggerItem key={sid}>
              <Link
                href={`/services/${sid}`}
                className="flex flex-col h-full p-8 border-r border-b border-silver hover:bg-navy group transition-colors duration-300 last:border-r-0"
              >
                <h3 className="font-display text-lg text-navy group-hover:text-cream transition-colors mb-3">{title}</h3>
                <p className="font-body text-sm text-navy/60 group-hover:text-silver/60 transition-colors leading-relaxed line-clamp-3">{description}</p>
                <div className="flex items-center gap-1 mt-auto pt-6 text-gold text-xs tracking-widest uppercase font-medium">
                  Learn more <ArrowRight size={11} />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>
    </PageTransition>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/services/\[id\]/
git commit -m "feat: port ServiceDetail page with dynamic routing and FAQ accordion"
```

---

### Task 16: Port Reviews, Contact, Team, and NotFound Pages

**Files:**
- Create: `src/app/reviews/page.tsx` + `src/app/reviews/reviews-content.tsx`
- Create: `src/app/contact/page.tsx` + `src/app/contact/contact-content.tsx`
- Create: `src/app/team/page.tsx` + `src/app/team/team-content.tsx`
- Create: `src/app/not-found.tsx`

Same pattern for each: server `page.tsx` with metadata + JSON-LD, client content component with UI.

- [ ] **Step 1: Port Reviews page**

Apply the same transformation:
- Server component: metadata, JSON-LD schemas (reviewSchema, reviewsBreadcrumb)
- Client component: all JSX from original `Reviews`, with `Link` import swapped

- [ ] **Step 2: Port Contact page**

Same pattern. Contact has 4 JSON-LD schemas (localBusiness, contactPage, faq, breadcrumb).

- [ ] **Step 3: Port Team page**

Same pattern. Team has simpler metadata (no JSON-LD schemas in original).

- [ ] **Step 4: Create not-found.tsx**

This is special in Next.js — `app/not-found.tsx` is automatically used for 404s. It should be a client component since it uses Framer Motion:

```tsx
'use client'

import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { BOOKING_URL } from '@/utils/seo'
import { PageTransition } from '@/components/motion/PageTransition'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'

export default function NotFound() {
  return (
    <PageTransition>
      <section className="bg-navy min-h-screen flex items-center section-padding relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/10 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <RevealOnScroll>
            <p className="label-sm mb-6 text-gold">404</p>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-cream font-medium leading-none mb-6">
              Page Not<br />
              <span className="gold-gradient">Found.</span>
            </h1>
            <div className="w-16 h-px bg-gold mb-8" />
            <p className="font-body text-silver/60 leading-relaxed mb-10 max-w-md">
              The page you&apos;re looking for has moved or doesn&apos;t exist. Let us get you back on track.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link href="/" className="btn-primary w-full sm:w-auto justify-center">
                Back to Home <ArrowRight size={14} />
              </Link>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline w-full sm:w-auto justify-center"
              >
                Book a Ride <ArrowRight size={14} />
              </a>
            </div>

            <div className="mt-12 pt-12 border-t border-white/10">
              <p className="font-body text-sm text-silver/40 mb-4">Need immediate assistance?</p>
              <a href="tel:+18554254661" className="flex items-center gap-2 text-gold font-body text-sm hover:text-gold/80 transition-colors">
                <Phone size={14} />
                (855) 425-4661 — Available 24/7
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </PageTransition>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add src/app/reviews/ src/app/contact/ src/app/team/ src/app/not-found.tsx
git commit -m "feat: port Reviews, Contact, Team, and 404 pages"
```

---

### Task 17: Verify Build and Clean Up

**Files:**
- Possibly modify: any files with TypeScript errors or build issues

- [ ] **Step 1: Run the build**

```bash
npm run build
```

Fix any TypeScript errors or build issues that arise.

- [ ] **Step 2: Run the dev server and test all routes**

```bash
npm run dev
```

Test each route manually:
- `/` — Home page loads, hero animation plays, all sections visible
- `/fleet` — Category filter works, vehicles display
- `/services` — Service blocks with parallax images
- `/services/airport` (and other service detail pages) — FAQ accordion works
- `/reviews` — Masonry grid displays
- `/contact` — Contact cards and booking CTA
- `/team` — Team page with founder section
- Navigate to a non-existent URL — 404 page displays

- [ ] **Step 3: Verify SEO output**

View page source on `/` and verify:
- `<title>` tag is correct
- `<meta name="description">` is present
- Open Graph tags are present
- JSON-LD scripts are in the HTML
- Fonts are self-hosted (no Google Fonts external request in `<head>`)

- [ ] **Step 4: Clean up default Next.js files**

Remove any remaining default Next.js boilerplate that wasn't already cleaned up:

```bash
rm -f src/app/favicon.ico 2>/dev/null
```

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: fix build issues and clean up boilerplate"
```

---

### Task 18: Push to GitHub

- [ ] **Step 1: Create the GitHub repo**

```bash
gh repo create lukegrady1/greater-boston-livery-nextjs --public --source=. --remote=origin
```

- [ ] **Step 2: Push**

```bash
git push -u origin main
```

- [ ] **Step 3: Connect to Netlify**

In the Netlify dashboard, create a new site from the `lukegrady1/greater-boston-livery-nextjs` repo. The `netlify.toml` will configure the build automatically.

---

## Migration Cheat Sheet

| Vite/React Router Pattern | Next.js Equivalent |
|---|---|
| `import { Link } from 'react-router-dom'` | `import Link from 'next/link'` |
| `<Link to="/fleet">` | `<Link href="/fleet">` |
| `useLocation()` | `usePathname()` from `next/navigation` |
| `useParams<{ id: string }>()` | `params` prop on page component |
| `<Navigate to="/services" replace />` | `notFound()` from `next/navigation` |
| `<Head>` from `vite-react-ssg` | `export const metadata` / `generateMetadata()` |
| `import.meta.env.BASE_URL` | `/` (not needed — `public/` serves from root) |
| `<script type="application/ld+json">{schema}</script>` | `<script ... dangerouslySetInnerHTML={{ __html: schema }} />` |
| Route config array in `App.tsx` | File-based routing in `app/` directory |
| `getStaticPaths` on route | `generateStaticParams()` export |
| `lazy(() => import(...))` | Automatic code splitting by Next.js |
