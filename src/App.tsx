import { useState, useEffect, lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import type { RouteRecord } from 'vite-react-ssg'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { useLenis } from '@/hooks/useLenis'
import { Home } from '@/pages/Home'

const Fleet = lazy(() => import('@/pages/Fleet').then(m => ({ default: m.Fleet })))
const Services = lazy(() => import('@/pages/Services').then(m => ({ default: m.Services })))
const Reviews = lazy(() => import('@/pages/Reviews').then(m => ({ default: m.Reviews })))
const Contact = lazy(() => import('@/pages/Contact').then(m => ({ default: m.Contact })))
const Team = lazy(() => import('@/pages/Team').then(m => ({ default: m.Team })))
const ServiceDetail = lazy(() => import('@/pages/ServiceDetail').then(m => ({ default: m.ServiceDetail })))
const NotFound = lazy(() => import('@/pages/NotFound').then(m => ({ default: m.NotFound })))

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
        <Suspense>
          <Outlet />
        </Suspense>
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
