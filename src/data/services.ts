import type { Service } from '@/types'

export const services: Service[] = [
  {
    id: 'airport',
    title: 'Airport Transfers',
    description: 'Meet-and-greet service at Logan International, Manchester-Boston, and T.F. Green airports. We track your flight in real time — arrivals, delays, gate changes. Your chauffeur will be waiting, regardless of when you land.',
    icon: 'Plane',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80',
    features: [
      'Real-time flight tracking',
      'Complimentary 60-min wait on arrivals',
      'Meet & greet inside terminal',
      'Luggage assistance',
      'All major airports served',
    ],
  },
  {
    id: 'corporate',
    title: 'Corporate Travel',
    description: 'First impressions matter. Whether transporting C-suite executives, hosting client roadshows, or coordinating team offsites across New England, our corporate fleet delivers quiet luxury on every mile.',
    icon: 'Briefcase',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    features: [
      'Dedicated corporate accounts',
      'Monthly invoicing available',
      'On-board WiFi & chargers',
      'Professional, vetted chauffeurs',
      'Flexible scheduling 24/7',
    ],
  },
  {
    id: 'weddings',
    title: 'Weddings & Events',
    description: 'Your wedding day deserves perfection. We coordinate bridal party transportation with military precision, ensuring every arrival is picture-perfect and every departure is seamless — while you focus on the moment.',
    icon: 'Heart',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
    features: [
      'Decorated vehicles available',
      'Multi-vehicle coordination',
      'Bridal party specialists',
      'Red carpet service',
      'Event timeline planning',
    ],
  },
  {
    id: 'roadshows',
    title: 'Roadshows & Tours',
    description: 'Full-day and multi-day chauffeured services throughout New England. From Boston to Cape Cod, the Berkshires to Newport — curated routes and local expertise from drivers who know every back road.',
    icon: 'MapPin',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80',
    features: [
      'Full & half-day charters',
      'Multi-city routing',
      'Local area expertise',
      'Flexible itineraries',
      'Hourly rates available',
    ],
  },
  {
    id: 'nightlife',
    title: 'Special Occasions',
    description: 'Anniversaries, proms, concerts, sporting events — celebrate in style with door-to-door luxury. The stretch limo or Escalade awaits. No parking, no designated drivers, no compromise.',
    icon: 'Star',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80',
    features: [
      'Prom & graduation packages',
      'Casino & entertainment runs',
      'Concert & sports shuttles',
      'Anniversary specials',
      'Fully stocked bar options',
    ],
  },
]
