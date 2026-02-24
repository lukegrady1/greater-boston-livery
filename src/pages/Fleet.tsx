import { useState, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  buildBreadcrumbSchema,
  schemaToString,
  SITE_URL,
  BUSINESS_NAME,
  BOOKING_URL,
} from '@/utils/seo'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Wifi, Users, Wine } from 'lucide-react'
import { PageTransition } from '@/components/motion/PageTransition'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'
import { vehicles } from '@/data/vehicles'
import { cn } from '@/utils/cn'
import type { Vehicle } from '@/types'

type Category = 'all' | 'sedan' | 'suv' | 'van' | 'mini-coach' | 'motor-coach' | 'limo' | 'party-bus'

const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'All Vehicles' },
  { value: 'sedan', label: 'Sedans' },
  { value: 'suv', label: 'SUVs' },
  { value: 'van', label: 'Vans' },
  { value: 'mini-coach', label: 'Mini Coaches' },
  { value: 'motor-coach', label: 'Motor Coaches' },
  { value: 'party-bus', label: 'Party Buses' },
  { value: 'limo', label: 'Limousines' },
]

const categoryLabels: Record<Category, string> = {
  'all': 'All',
  'sedan': 'Sedan',
  'suv': 'SUV',
  'van': 'Van',
  'mini-coach': 'Mini Coach',
  'motor-coach': 'Motor Coach',
  'limo': 'Limousine',
  'party-bus': 'Party Bus',
}

function VehicleDetailCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white border border-silver overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <motion.img
          src={vehicle.image}
          alt={vehicle.name}
          loading="lazy"
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="label-sm bg-gold text-navy px-3 py-1">
            {categoryLabels[vehicle.category as Category]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="font-display text-xl text-navy mb-3">{vehicle.name}</h3>
        <p className="font-body text-sm text-navy/60 leading-relaxed mb-6">{vehicle.description}</p>

        {/* Specs */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2 border border-silver px-3 py-2">
            <Users size={14} className="text-gold" />
            <span className="font-body text-sm text-navy font-medium">{vehicle.capacity} passengers</span>
          </div>
          {vehicle.hasWifi && (
            <div className="flex items-center gap-2 border border-silver px-3 py-2">
              <Wifi size={14} className="text-gold" />
              <span className="font-body text-sm text-navy font-medium">WiFi</span>
            </div>
          )}
          {vehicle.alcoholFriendly && (
            <div className="flex items-center gap-2 border border-silver px-3 py-2">
              <Wine size={14} className="text-gold" />
              <span className="font-body text-sm text-navy font-medium">Alcohol Friendly</span>
            </div>
          )}
        </div>

        {/* Features */}
        {vehicle.features.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-6">
            {vehicle.features.map((f) => (
              <div key={f} className="flex items-center gap-2 text-navy/70 text-sm font-body">
                <Check size={12} className="text-gold flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>
        )}

        <a
          href="https://customer.moovs.app/greater-boston-coach/request/new"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full justify-center text-center"
        >
          Request This Vehicle
        </a>
      </div>
    </motion.div>
  )
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

export function Fleet() {
  const [active, setActive] = useState<Category>('all')
  const gridRef = useRef<HTMLElement>(null)

  function selectCategory(value: Category) {
    setActive(value)
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const filtered = active === 'all'
    ? vehicles
    : vehicles.filter((v) => v.category === active)

  return (
    <PageTransition>
      <Helmet>
        <title>Luxury Fleet | Sedans, SUVs, Sprinters &amp; Limos | Greater Boston Livery</title>
        <meta name="description" content="Browse Greater Boston Livery's luxury fleet: executive sedans, SUVs, Mercedes Sprinters, mini coaches, 55-passenger motor coaches, party buses, and stretch limousines. Available 24/7 in Boston." />
        <link rel="canonical" href={`${SITE_URL}/fleet`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/fleet`} />
        <meta property="og:title" content="Our Luxury Fleet | Greater Boston Livery" />
        <meta property="og:description" content="Browse our full fleet: sedans, SUVs, Mercedes Sprinters, motor coaches, and stretch limousines. Available 24/7 throughout Greater Boston." />
        <meta property="og:image" content={`${SITE_URL}/gbl_logo.PNG`} />
        <script type="application/ld+json">{vehicleListSchema}</script>
        <script type="application/ld+json">{fleetBreadcrumb}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-navy pt-40 pb-20 section-padding relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=60"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10">
          <RevealOnScroll>
            <p className="label-sm mb-4">The Fleet</p>
            <h1 className="heading-display text-cream max-w-2xl">
              Vehicles Worthy of<br />
              <span className="gold-gradient">Your Journey</span>
            </h1>
            <p className="font-body text-silver/60 mt-6 max-w-xl leading-relaxed">
              From executive sedans to 55-passenger motor coaches, our diverse fleet is meticulously maintained and ready for any occasion.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Filter */}
      <section className="bg-cream border-b border-silver sticky top-20 z-30">
        <div className="section-padding">
          <div className="flex items-center gap-1 py-4 overflow-x-auto">
            {categories.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => selectCategory(value)}
                className={cn(
                  'font-body text-sm px-5 py-2 transition-all duration-200 whitespace-nowrap',
                  active === value
                    ? 'bg-navy text-cream'
                    : 'text-navy/60 hover:text-navy'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section ref={gridRef} className="section-padding py-16 bg-cream scroll-mt-36">
        <AnimatePresence mode="wait">
          <StaggerChildren
            key={active}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filtered.map((vehicle) => (
              <StaggerItem key={vehicle.id}>
                <VehicleDetailCard vehicle={vehicle} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </AnimatePresence>
      </section>

      {/* CTA */}
      <section className="bg-navy section-padding py-20 text-center">
        <RevealOnScroll>
          <h2 className="heading-lg text-cream mb-4">Not sure which vehicle is right?</h2>
          <p className="font-body text-silver/60 mb-8">Our team will help you find the perfect match for your needs and group size.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://customer.moovs.app/greater-boston-coach/request/new" target="_blank" rel="noopener noreferrer" className="btn-primary">Book Now</a>
            <a href="tel:+18554254661" className="btn-outline">Call Us Now</a>
          </div>
        </RevealOnScroll>
      </section>
    </PageTransition>
  )
}
