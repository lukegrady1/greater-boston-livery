# SSG Migration Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the SPA to static site generation so Google can index pre-rendered HTML for all 11 routes.

**Architecture:** Replace `createRoot` with `vite-react-ssg`'s `ViteReactSSG` entry point. Refactor `App.tsx` from inline `<BrowserRouter>/<Routes>` to a route config array consumed by the data router. Each route gets a static HTML file at build time. `AnimatePresence` exit animations are removed (enter animations via `PageTransition` on each page are preserved).

**Tech Stack:** vite-react-ssg, react-router-dom v6 data router, react-helmet-async

---

## Task 1: Install vite-react-ssg

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install the package**

```bash
npm install vite-react-ssg
```

- [ ] **Step 2: Verify installation**

```bash
node -e "require('vite-react-ssg/package.json').version"
```

---

## Task 2: Fix SSR-unsafe `hasFinePointer` in App.tsx

**Files:**
- Modify: `src/App.tsx:42-43`

The module-level `window.matchMedia` call will crash during SSG build (no `window` on server). Move it into a hook.

- [ ] **Step 1: Replace the module-level constant with a hook**

Replace lines 42-43:
```typescript
const hasFinePointer =
  typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
```

With a hook used inside the Layout component:
```typescript
import { useState, useEffect } from 'react'

function useHasFinePointer() {
  const [hasFinePointer, setHasFinePointer] = useState(false)
  useEffect(() => {
    setHasFinePointer(window.matchMedia('(pointer: fine)').matches)
  }, [])
  return hasFinePointer
}
```

Then inside `Layout`:
```typescript
function Layout() {
  const hasFinePointer = useHasFinePointer()
  // ...rest unchanged
}
```

---

## Task 3: Refactor App.tsx to export route config array

**Files:**
- Rewrite: `src/App.tsx`

Convert from `<BrowserRouter>` with inline `<Routes>` to a `RouteRecord[]` array export. The `Layout` component uses `<Outlet>` instead of rendering `<AnimatedRoutes>`. `AnimatePresence` around the router is removed (each page already has its own `<PageTransition>` wrapper for enter animations).

- [ ] **Step 1: Rewrite App.tsx**

```typescript
import { useState, useEffect } from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import type { RouteRecord } from 'vite-react-ssg'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { useLenis } from '@/hooks/useLenis'
import { Home } from '@/pages/Home'
import { Fleet } from '@/pages/Fleet'
import { Services } from '@/pages/Services'
import { Reviews } from '@/pages/Reviews'
import { Contact } from '@/pages/Contact'
import { Team } from '@/pages/Team'
import { ServiceDetail } from '@/pages/ServiceDetail'
import { NotFound } from '@/pages/NotFound'

function NoiseOverlay() {
  return <div className="noise-overlay" aria-hidden="true" />
}

function useHasFinePointer() {
  const [hasFinePointer, setHasFinePointer] = useState(false)
  useEffect(() => {
    setHasFinePointer(window.matchMedia('(pointer: fine)').matches)
  }, [])
  return hasFinePointer
}

function Layout() {
  const hasFinePointer = useHasFinePointer()
  useLenis()

  return (
    <div className="relative min-h-screen">
      <ScrollToTop />
      <NoiseOverlay />
      {hasFinePointer && <CustomCursor />}
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/App.tsx',
    children: [
      { index: true, element: <Home /> },
      { path: 'fleet', element: <Fleet /> },
      { path: 'services', element: <Services /> },
      { path: 'reviews', element: <Reviews /> },
      { path: 'contact', element: <Contact /> },
      { path: 'team', element: <Team /> },
      {
        path: 'services/:id',
        element: <ServiceDetail />,
        getStaticPaths: () => [
          'services/airport',
          'services/corporate',
          'services/weddings',
          'services/roadshows',
          'services/nightlife',
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]
```

---

## Task 4: Refactor main.tsx to use ViteReactSSG

**Files:**
- Rewrite: `src/main.tsx`

Replace `createRoot` with `ViteReactSSG`. Wrap the app in `HelmetProvider` via the `rootContainer` callback.

- [ ] **Step 1: Rewrite main.tsx**

```typescript
import { ViteReactSSG } from 'vite-react-ssg'
import { HelmetProvider } from 'react-helmet-async'
import { routes } from './App'
import './styles/globals.css'

export const createRoot = ViteReactSSG(
  {
    routes,
    basename: import.meta.env.BASE_URL,
  },
  ({ isClient }) => {
    // Client-only setup can go here if needed
  },
  ({ app }) => {
    // Wrap root with HelmetProvider
    return <HelmetProvider>{app}</HelmetProvider>
  },
)
```

---

## Task 5: Update build scripts in package.json

**Files:**
- Modify: `package.json` scripts

- [ ] **Step 1: Update scripts**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite-react-ssg build",
    "build:prod": "tsc -b && vite-react-ssg build --base /",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

Note: `dev` stays as `vite` (CSR in dev is fine). Only `build` changes to use `vite-react-ssg build`.

---

## Task 6: Update GitHub Actions deploy workflow

**Files:**
- Modify: `.github/workflows/deploy.yml`

SSG generates individual HTML files per route (e.g., `dist/fleet/index.html`). We still need a `404.html` for unknown routes on GitHub Pages.

- [ ] **Step 1: Keep the 404.html copy step (still needed)**

No change needed — the existing `cp dist/index.html dist/404.html` step still serves as the fallback for unmatched routes. The generated `dist/index.html` now contains pre-rendered Home page content, which is fine as a 404 fallback (the client-side router will render the NotFound page).

---

## Task 7: Build and verify

- [ ] **Step 1: Run the build**

```bash
npm run build
```

Expected: Build succeeds, generates HTML files in `dist/` for all routes.

- [ ] **Step 2: Verify static HTML files exist**

```bash
ls dist/index.html
ls dist/fleet/index.html
ls dist/services/index.html
ls dist/reviews/index.html
ls dist/contact/index.html
ls dist/team/index.html
ls dist/services/airport/index.html
ls dist/services/corporate/index.html
ls dist/services/weddings/index.html
ls dist/services/roadshows/index.html
ls dist/services/nightlife/index.html
```

All 11 files should exist.

- [ ] **Step 3: Verify HTML contains pre-rendered content**

```bash
grep -l "Greater Boston Livery" dist/index.html
grep -l "fleet" dist/fleet/index.html
```

The HTML should contain actual page content, not just an empty `<div id="root"></div>`.

- [ ] **Step 4: Preview locally**

```bash
npm run preview
```

Navigate through all pages and verify they load correctly.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add SSG via vite-react-ssg for search engine indexing"
```
