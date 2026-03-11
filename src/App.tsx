import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
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
    <HelmetProvider>
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
    </HelmetProvider>
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
