import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { Home } from '@/pages/Home'
import { Fleet } from '@/pages/Fleet'
import { Services } from '@/pages/Services'
import { Reviews } from '@/pages/Reviews'
import { Contact } from '@/pages/Contact'
import { useLenis } from '@/hooks/useLenis'

function NoiseOverlay() {
  return <div className="noise-overlay" aria-hidden="true" />
}

function AnimatedRoutes() {
  const location = useLocation()
  useLenis()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/fleet" element={<Fleet />} />
        <Route path="/services" element={<Services />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  )
}

// Only show custom cursor on devices with a fine pointer (mouse/trackpad), not touchscreens
const hasFinePointer =
  typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

function Layout() {
  return (
    <div className="relative min-h-screen">
      <ScrollToTop />
      <NoiseOverlay />
      {hasFinePointer && <CustomCursor />}
      <Navbar />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Layout />
    </BrowserRouter>
  )
}
