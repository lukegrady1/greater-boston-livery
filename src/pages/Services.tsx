import { useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  buildServiceSchema,
  buildBreadcrumbSchema,
  schemaToString,
  SITE_URL,
} from '@/utils/seo'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { PageTransition } from '@/components/motion/PageTransition'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { services } from '@/data/services'

function ServiceBlock({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <div
      id={service.id}
      ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[70vh] ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
    >
      {/* Image with parallax */}
      <div className={`relative overflow-hidden ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
        <motion.img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ y }}
        />
        <div className="absolute inset-0 bg-navy/30" />
      </div>

      {/* Text */}
      <div className={`bg-cream flex items-center section-padding py-20 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
        <div className="max-w-lg">
          <RevealOnScroll>
            <p className="label-sm mb-4">{`0${index + 1}`}</p>
            <h2 className="heading-lg mb-6">{service.title}</h2>
            <div className="divider-gold mb-6" />
            <p className="font-body text-navy/60 leading-relaxed mb-8">{service.description}</p>

            <ul className="space-y-3 mb-10">
              {service.features.map((f) => (
                <li key={f} className="flex items-center gap-3 font-body text-sm text-navy/80">
                  <div className="w-5 h-5 border border-gold flex items-center justify-center flex-shrink-0">
                    <Check size={10} className="text-gold" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              to={`/services/${service.id}`}
              className="btn-primary"
            >
              Learn More <ArrowRight size={14} />
            </Link>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  )
}

const serviceListSchema = schemaToString(
  buildServiceSchema(
    services.map((s) => ({ name: s.title, description: s.description, id: s.id }))
  )
)

const servicesBreadcrumb = schemaToString(
  buildBreadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
  ])
)

export function Services() {
  return (
    <PageTransition>
      <Helmet>
        <title>Airport Transfers, Corporate &amp; Wedding Transportation | Greater Boston Livery</title>
        <meta name="description" content="Greater Boston Livery provides airport car service at Logan, Manchester &amp; T.F. Green, corporate chauffeur service, wedding transportation, roadshows, and special occasions throughout New England." />
        <link rel="canonical" href={`${SITE_URL}/services`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/services`} />
        <meta property="og:title" content="Chauffeured Services | Greater Boston Livery" />
        <meta property="og:description" content="Airport transfers at Logan, Manchester &amp; T.F. Green, corporate travel, weddings, roadshows, and special occasions throughout Greater Boston and New England." />
        <meta property="og:image" content={`${SITE_URL}/gbl_logo.webp`} />
        <script type="application/ld+json">{serviceListSchema}</script>
        <script type="application/ld+json">{servicesBreadcrumb}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-navy pt-40 pb-20 section-padding relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=60"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10">
          <RevealOnScroll>
            <p className="label-sm mb-4">What We Offer</p>
            <h1 className="heading-display text-cream max-w-2xl">
              Every Journey.<br />
              <span className="gold-gradient">Executed Flawlessly.</span>
            </h1>
            <p className="font-body text-silver/60 mt-6 max-w-xl leading-relaxed">
              From early morning airport runs to multi-day executive roadshows, we have the expertise, fleet, and professionalism to exceed expectations.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Service blocks */}
      <div className="border-t border-silver">
        {services.map((service, i) => (
          <ServiceBlock key={service.id} service={service} index={i} />
        ))}
      </div>

      {/* CTA */}
      <section className="bg-navy section-padding py-20 text-center">
        <RevealOnScroll>
          <h2 className="heading-lg text-cream mb-4">Ready to experience the difference?</h2>
          <p className="font-body text-silver/60 mb-8 max-w-lg mx-auto">Contact us today to discuss your transportation needs and receive a custom quote.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://customer.moovs.app/greater-boston-coach/request/new" target="_blank" rel="noopener noreferrer" className="btn-primary">Request a Quote</a>
            <a href="tel:+18554254661" className="btn-outline">(855) 425-4661</a>
          </div>
        </RevealOnScroll>
      </section>
    </PageTransition>
  )
}
