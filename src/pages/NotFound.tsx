import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowRight, Phone } from 'lucide-react'
import { SITE_URL, BOOKING_URL } from '@/utils/seo'
import { PageTransition } from '@/components/motion/PageTransition'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'

export function NotFound() {
  return (
    <PageTransition>
      <Helmet>
        <title>Page Not Found | Greater Boston Livery</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to Greater Boston Livery's homepage or browse our fleet and services." />
        <link rel="canonical" href={`${SITE_URL}/404`} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <section className="bg-navy min-h-screen flex items-center section-padding relative overflow-hidden">
        {/* Background texture */}
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
              The page you're looking for has moved or doesn't exist. Let us get you back on track.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link to="/" className="btn-primary w-full sm:w-auto justify-center">
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
