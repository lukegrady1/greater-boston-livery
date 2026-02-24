import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { ArrowRight, Check, Phone, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  schemaToString,
  SITE_URL,
  BUSINESS_NAME,
  BOOKING_URL,
} from '@/utils/seo'
import { PageTransition } from '@/components/motion/PageTransition'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'
import { services } from '@/data/services'

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

export function ServiceDetail() {
  const { id } = useParams<{ id: string }>()
  const service = services.find((s) => s.id === id)

  if (!service) return <Navigate to="/services" replace />

  const currentIndex = services.findIndex((s) => s.id === id)
  const otherServices = services.filter((s) => s.id !== id).slice(0, 3)

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
    <PageTransition>
      <Helmet>
        <title>{service.metaTitle ?? `${service.title} | Greater Boston Livery`}</title>
        <meta
          name="description"
          content={service.metaDescription ?? service.description}
        />
        <link rel="canonical" href={`${SITE_URL}/services/${service.id}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/services/${service.id}`} />
        <meta property="og:title" content={service.metaTitle ?? service.title} />
        <meta property="og:description" content={service.metaDescription ?? service.description} />
        <meta property="og:image" content={`${SITE_URL}/gbl_logo.PNG`} />
        <script type="application/ld+json">{breadcrumbSchema}</script>
        <script type="application/ld+json">{serviceSchema}</script>
        {faqSchema && <script type="application/ld+json">{faqSchema}</script>}
      </Helmet>

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[480px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/10" />
        </div>
        <div className="relative z-10 section-padding pb-16 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-6 font-body text-xs text-silver/40">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-gold transition-colors">Services</Link>
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

          {/* Left: Description + Features */}
          <div className="lg:col-span-2">
            <RevealOnScroll>
              <div className="divider-gold mb-8" />
              <div className="space-y-4 font-body text-navy/60 leading-relaxed mb-12">
                {(service.longDescription ?? [service.description]).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <h2 className="font-display text-xl text-navy mb-6">What's Included</h2>
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

          {/* Right: Booking CTA card */}
          <RevealOnScroll delay={0.15} className="lg:col-span-1">
            <div className="bg-navy p-8 sticky top-28">
              <p className="label-sm mb-4">Ready to Book?</p>
              <h3 className="font-display text-xl text-cream mb-4">{service.title}</h3>
              <div className="divider-gold mb-6" />
              <p className="font-body text-sm text-silver/60 leading-relaxed mb-8">
                Contact our team to discuss your needs and receive a custom quote — or book instantly online.
              </p>
              <div className="space-y-3">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center"
                >
                  Book Now <ArrowRight size={14} />
                </a>
                <a
                  href="tel:+18554254661"
                  className="btn-outline w-full justify-center"
                >
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
                to={`/services/${sid}`}
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
