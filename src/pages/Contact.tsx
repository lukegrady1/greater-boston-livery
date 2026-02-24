import { Helmet } from 'react-helmet-async'
import { ArrowRight, Phone, Mail, MapPin, Clock } from 'lucide-react'
import {
  buildLocalBusinessSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  schemaToString,
  SITE_URL,
  PHONE_DISPLAY,
  BOOKING_URL,
} from '@/utils/seo'
import { PageTransition } from '@/components/motion/PageTransition'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'

const MOOVS_URL = BOOKING_URL

const contactDetails = [
  {
    icon: Phone,
    label: 'Phone',
    value: '1-855-GB-LIMO',
    sub: '(855) 425-4661',
    href: 'tel:+18554254661',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@greaterbostonlivery.com',
    sub: 'We respond within one hour',
    href: 'mailto:info@greaterbostonlivery.com',
  },
  {
    icon: MapPin,
    label: 'Coverage Area',
    value: 'Greater Boston & New England',
    sub: 'Cape Cod · South Shore · North Shore · NYC',
    href: null,
  },
  {
    icon: Clock,
    label: 'Availability',
    value: '24 / 7 / 365',
    sub: 'Always reachable, always ready',
    href: null,
  },
]

const contactLocalBusiness = schemaToString(buildLocalBusinessSchema())

const contactPageSchema = schemaToString({
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Greater Boston Livery',
  url: `${SITE_URL}/contact`,
  description: 'Book a premium chauffeured ride or contact Greater Boston Livery directly.',
  mainEntity: { '@type': 'LocalBusiness', '@id': `${SITE_URL}/#business` },
})

const faqSchema = schemaToString(
  buildFaqSchema([
    {
      question: 'How do I book a ride with Greater Boston Livery?',
      answer: `You can book instantly online at ${BOOKING_URL} or call us at ${PHONE_DISPLAY}. We respond to all inquiries within one hour.`,
    },
    {
      question: 'What airports does Greater Boston Livery serve?',
      answer: 'We provide meet-and-greet chauffeur service at Logan International Airport (BOS), Manchester-Boston Regional Airport (MHT), and T.F. Green Airport (PVD) in Providence.',
    },
    {
      question: 'Does Greater Boston Livery offer corporate accounts?',
      answer: 'Yes. We offer dedicated corporate accounts with monthly invoicing, priority scheduling, and a dedicated fleet for executive travel throughout New England.',
    },
    {
      question: 'How far in advance should I book a limo or chauffeured vehicle?',
      answer: 'We recommend booking 48 hours in advance for standard trips. For weddings, proms, and large group events, we recommend booking 4–6 weeks ahead to ensure vehicle availability.',
    },
    {
      question: 'Do your vehicles have WiFi?',
      answer: 'Several vehicles in our fleet include complimentary WiFi, including the Mercedes-Benz Sprinter Van and the 36 Passenger Mini Coach. WiFi availability is listed on each vehicle on our Fleet page.',
    },
    {
      question: 'Is Greater Boston Livery the same as Greater Boston Coach?',
      answer: 'Yes. Greater Boston Livery was formerly known as Greater Boston Coach. We rebranded to reflect our expanded fleet and elevated service standard. Our team, ownership, and commitment to excellence remain the same since 2008.',
    },
  ])
)

const contactBreadcrumb = schemaToString(
  buildBreadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Contact', href: '/contact' },
  ])
)

export function Contact() {
  return (
    <PageTransition>
      <Helmet>
        <title>Book a Ride | Contact Greater Boston Livery | (855) 425-4661</title>
        <meta name="description" content="Reserve your premium chauffeured ride with Greater Boston Livery. Book online instantly or call 1-855-GB-LIMO (855) 425-4661. Airport transfers, corporate travel, and weddings throughout Boston and New England." />
        <link rel="canonical" href={`${SITE_URL}/contact`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/contact`} />
        <meta property="og:title" content="Book a Ride | Greater Boston Livery" />
        <meta property="og:description" content="Book online or call (855) 425-4661. Airport transfers, corporate travel, weddings, and special occasions — available 24/7 in Greater Boston." />
        <meta property="og:image" content={`${SITE_URL}/gbl_logo.PNG`} />
        <script type="application/ld+json">{contactLocalBusiness}</script>
        <script type="application/ld+json">{contactPageSchema}</script>
        <script type="application/ld+json">{faqSchema}</script>
        <script type="application/ld+json">{contactBreadcrumb}</script>
      </Helmet>

      <div className="min-h-screen bg-navy">
        {/* Hero */}
        <section className="section-padding pt-40 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1400&q=60"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 max-w-2xl">
            <RevealOnScroll>
              <p className="label-sm mb-4">Reservations</p>
              <h1 className="heading-display text-cream mb-6">
                Ready to Ride?<br />
                <span className="gold-gradient">Let's Book Your Journey.</span>
              </h1>
              <p className="font-body text-silver/60 leading-relaxed">
                All reservations are handled through our secure online booking portal. Select your vehicle, enter your details, and you're confirmed — it takes less than two minutes.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* Book Now CTA */}
        <section className="section-padding pb-20">
          <RevealOnScroll>
            <div className="border border-gold/30 p-12 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden">
              {/* Gold corner accent */}
              <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-gold/40 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-gold/40 pointer-events-none" />

              <div>
                <p className="label-sm mb-3">Online Booking</p>
                <h2 className="heading-md text-cream mb-3">Reserve Your Vehicle</h2>
                <p className="font-body text-silver/50 max-w-md leading-relaxed">
                  Choose your trip type, date, pickup location, and vehicle. Instant confirmation sent to your email.
                </p>
              </div>

              <a
                href={MOOVS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm px-10 py-4 whitespace-nowrap flex-shrink-0"
              >
                Book Now <ArrowRight size={15} />
              </a>
            </div>
          </RevealOnScroll>
        </section>

        {/* Contact details */}
        <section className="section-padding pb-24">
          <RevealOnScroll>
            <p className="label-sm mb-10">Or Reach Us Directly</p>
          </RevealOnScroll>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contactDetails.map(({ icon: Icon, label, value, sub, href }) => (
              <StaggerItem key={label}>
                {href ? (
                  <a
                    href={href}
                    className="flex items-start gap-5 p-8 border border-white/10 hover:border-gold/40 transition-colors group"
                  >
                    <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0 group-hover:border-gold transition-colors">
                      <Icon size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="label-sm mb-1">{label}</p>
                      <p className="font-body text-cream font-medium mb-1">{value}</p>
                      <p className="font-body text-xs text-silver/40">{sub}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-start gap-5 p-8 border border-white/10">
                    <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="label-sm mb-1">{label}</p>
                      <p className="font-body text-cream font-medium mb-1">{value}</p>
                      <p className="font-body text-xs text-silver/40">{sub}</p>
                    </div>
                  </div>
                )}
              </StaggerItem>
            ))}
          </StaggerChildren>
        </section>
      </div>
    </PageTransition>
  )
}
