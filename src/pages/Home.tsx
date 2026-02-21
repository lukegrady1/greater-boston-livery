import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Shield, Clock, Star, Phone, Plane, Briefcase, Heart, MapPin } from 'lucide-react'
import { PageTransition } from '@/components/motion/PageTransition'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'
import { VehicleCard } from '@/components/shared/VehicleCard'
import { ReviewCard } from '@/components/shared/ReviewCard'
import { vehicles } from '@/data/vehicles'
import { reviews } from '@/data/reviews'

const featuredVehicles = vehicles.slice(0, 3)
const featuredReviews = reviews.slice(0, 3)

const coreServices = [
  { icon: Plane, title: 'Airport Transfers', desc: 'Logan, Manchester & T.F. Green with real-time flight tracking.', href: '/services' },
  { icon: Briefcase, title: 'Corporate Travel', desc: 'Executive accounts, invoicing, and on-demand fleet availability.', href: '/services' },
  { icon: Heart, title: 'Weddings & Events', desc: 'Impeccable coordination for your most important day.', href: '/services' },
  { icon: MapPin, title: 'Roadshows & Tours', desc: 'Full-day charters throughout New England and beyond.', href: '/services' },
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
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1800&q=90"
          alt="Boston city skyline at night"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-transparent to-navy/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding w-full">
        <div className="max-w-3xl">
          {/* Label */}
          <motion.p
            className="label-sm mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Greater Boston's Premier Chauffeured Service
          </motion.p>

          {/* Main heading — staggered word reveal */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-cream font-medium leading-none mb-4">
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
          </h1>

          {/* Subheading */}
          <motion.p
            className="font-body text-lg text-silver/70 max-w-xl leading-relaxed mt-8 mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Chauffeured luxury transportation for corporate executives, weddings, and special occasions — serving Greater Boston, Cape Cod, the South Shore, North Shore, and beyond to New York City. Available 24/7/365.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <a
              href="https://customer.moovs.app/greater-boston-coach/request/new"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Reserve Your Ride
              <ArrowRight size={14} />
            </a>
            <a href="tel:+18554254661" className="btn-outline">
              <Phone size={14} />
              Call (855) 425-4661
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
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

export function Home() {
  return (
    <PageTransition>
      <Helmet>
        <title>Greater Boston Livery | Premium Chauffeured Transportation</title>
        <meta name="description" content="Greater Boston Livery offers premier chauffeured transportation for airport transfers, corporate travel, weddings and events throughout Greater Boston and New England." />
      </Helmet>

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
            <Link to="/services" className="btn-ghost hidden md:flex">
              All Services <ArrowRight size={14} />
            </Link>
          </div>
        </RevealOnScroll>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-silver">
          {coreServices.map(({ icon: Icon, title, desc, href }) => (
            <StaggerItem key={title} className="h-full">
              <Link
                to={href}
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
          <Link to="/services" className="btn-ghost">
            All Services <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Rebrand Story */}
      <section className="bg-navy section-padding py-28 relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/10 to-transparent" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl">
          <RevealOnScroll direction="left">
            <p className="label-sm mb-6">Our Story</p>
            <h2 className="heading-lg text-cream mb-6">
              From Greater Boston Coach<br />
              to <span className="gold-gradient">Greater Boston Livery</span>
            </h2>
            <div className="divider-gold mb-8" />
            <div className="space-y-4 font-body text-silver/60 leading-relaxed">
              <p>
                We've been serving the Greater Boston area since 2008 under the name Greater Boston Coach — building a reputation for punctuality, discretion, and genuine hospitality that no app can replicate.
              </p>
              <p>
                Our new name, Greater Boston Livery, reflects the elevated standard our clients have always known: a full-service, professionally staffed fleet that goes beyond transportation to deliver an experience.
              </p>
              <p>
                The name changes. The standard doesn't.
              </p>
            </div>
            <div className="mt-8">
              <Link to="/contact" className="btn-outline">
                Meet the Team <ArrowRight size={14} />
              </Link>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="right" delay={0.2}>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80"
                alt="Professional chauffeur with luxury vehicle"
                loading="lazy"
                className="w-full aspect-[4/5] object-cover"
              />
              {/* Gold accent frame */}
              <div className="absolute -bottom-4 -right-4 w-2/3 h-2/3 border border-gold/20 -z-10" />
              {/* Stat callout */}
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
            <h2 className="heading-lg">
              Curated for the<br />Discerning Traveler
            </h2>
            <Link to="/fleet" className="btn-ghost hidden md:flex">
              View Full Fleet <ArrowRight size={14} />
            </Link>
          </div>
        </RevealOnScroll>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredVehicles.map((vehicle) => (
            <StaggerItem key={vehicle.id}>
              <VehicleCard vehicle={vehicle} />
            </StaggerItem>
          ))}
        </StaggerChildren>

        <RevealOnScroll className="mt-12 md:hidden">
          <Link to="/fleet" className="btn-ghost">
            View Full Fleet <ArrowRight size={14} />
          </Link>
        </RevealOnScroll>
      </section>

      {/* Testimonials */}
      <section className="section-padding py-28 bg-navy">
        <RevealOnScroll>
          <p className="label-sm mb-4">Client Testimonials</p>
          <div className="flex items-end justify-between mb-12">
            <h2 className="heading-lg text-cream">
              What Our Clients Say
            </h2>
            <Link to="/reviews" className="btn-ghost hidden md:flex">
              All Reviews <ArrowRight size={14} />
            </Link>
          </div>
        </RevealOnScroll>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredReviews.map((review) => (
            <StaggerItem key={review.id}>
              <ReviewCard review={review} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {/* Final CTA */}
      <section className="section-padding py-24 bg-cream text-center">
        <RevealOnScroll>
          <p className="label-sm mb-6">Ready to Ride?</p>
          <h2 className="heading-display mb-6 max-w-2xl mx-auto">
            Your journey begins with a single call.
          </h2>
          <p className="font-body text-navy/60 max-w-lg mx-auto mb-10">
            Available 24 hours a day, 7 days a week. Reservations, last-minute bookings, and corporate accounts welcome.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://customer.moovs.app/greater-boston-coach/request/new"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Book a Ride <ArrowRight size={14} />
            </a>
            <a href="tel:+18554254661" className="btn-outline">
              <Phone size={14} />
              (855) 425-4661
            </a>
          </div>
        </RevealOnScroll>
      </section>
    </PageTransition>
  )
}
