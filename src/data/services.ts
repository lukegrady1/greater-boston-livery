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
    metaTitle: 'Boston Airport Car Service | Logan, Manchester & T.F. Green | Greater Boston Livery',
    metaDescription: 'Professional airport car service in Boston. Meet-and-greet at Logan International, Manchester-Boston Regional, and T.F. Green. Real-time flight tracking, 60-minute complimentary wait. Book online or call (855) 425-4661.',
    longDescription: [
      'Traveling through Boston should be the easiest part of your trip. Greater Boston Livery provides seamless door-to-door airport transportation to and from Logan International Airport (BOS), Manchester-Boston Regional Airport (MHT), and T.F. Green Airport (PVD) — plus any other regional airports on request.',
      'We monitor your flight from the moment it takes off. Gate changes, early arrivals, extended delays — your chauffeur knows before you do and adjusts accordingly. No frantic calls, no extra charges for delays. Just a polished professional waiting for you the moment you clear arrivals.',
      'Every airport pickup includes a complimentary 60-minute wait from the time your wheels touch down, giving you time to clear customs, collect your luggage, and take a breath. Your chauffeur will be standing inside the terminal with a name sign, ready to assist with your bags.',
    ],
    faqs: [
      {
        question: 'Which airports do you serve?',
        answer: 'We serve Logan International (BOS), Manchester-Boston Regional (MHT), and T.F. Green Airport (PVD). Service to other regional airports is available on request — just let us know when booking.',
      },
      {
        question: 'What happens if my flight is delayed?',
        answer: 'We track every flight in real time. Your chauffeur adjusts automatically to your updated arrival time — there is never a penalty charge for flight delays.',
      },
      {
        question: 'How much waiting time is included?',
        answer: 'All airport arrivals include a complimentary 60-minute wait from the moment your flight lands, giving you ample time to clear customs, collect baggage, and get settled.',
      },
      {
        question: 'How will I find my chauffeur?',
        answer: 'Your chauffeur will be waiting inside the terminal with a personalized name sign. You will also receive a text confirmation with their name, photo, and vehicle details before your flight lands.',
      },
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
    metaTitle: 'Corporate Chauffeur Service Boston | Executive Ground Transportation | Greater Boston Livery',
    metaDescription: 'Boston corporate car service and executive ground transportation. Dedicated accounts, monthly invoicing, on-board WiFi, and professional chauffeurs available 24/7. Serving Greater Boston and all of New England.',
    longDescription: [
      'In the corporate world, every detail signals how you operate. Greater Boston Livery provides executive ground transportation that reflects the standard your clients and colleagues expect — immaculate vehicles, suited chauffeurs, and zero-tolerance punctuality.',
      'We work with Boston-area companies ranging from financial services firms and law practices to biotech companies and consulting groups. Whether it\'s a single airport run for a visiting executive or a multi-vehicle roadshow across three states, we build our service around your schedule.',
      'Corporate accounts receive dedicated support, flexible monthly invoicing, and priority availability. Your executive assistant can manage all bookings through a single point of contact, and every ride is tracked and documented for seamless expense reporting.',
    ],
    faqs: [
      {
        question: 'Do you offer dedicated corporate accounts?',
        answer: 'Yes. We set up corporate accounts with centralized billing, monthly invoicing, priority booking, and a dedicated account manager. Contact us to get set up.',
      },
      {
        question: 'Can you handle last-minute bookings?',
        answer: 'We operate 24/7 and can typically accommodate urgent requests subject to availability. For time-sensitive needs, calling us directly is the fastest option.',
      },
      {
        question: 'Do your vehicles have WiFi?',
        answer: 'Our Mercedes-Benz Sprinter and select coaches are equipped with onboard WiFi. Executive sedans and SUVs have USB and power outlet charging and Bluetooth connectivity throughout.',
      },
      {
        question: 'Can you coordinate multiple vehicles for a roadshow?',
        answer: 'Absolutely. We regularly manage multi-vehicle logistics for roadshows, investor meetings, and corporate events across New England and to New York City. Let us handle the ground logistics while you focus on the meetings.',
      },
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
    metaTitle: 'Wedding Transportation Boston | Bridal Party Limo & Luxury Car Service | Greater Boston Livery',
    metaDescription: 'Luxury wedding transportation in Boston and throughout New England. Stretch limousines, SUVs, and full bridal party coordination. Decorated vehicles, red carpet service, and meticulous timeline planning. Call (855) 425-4661.',
    longDescription: [
      'Your wedding day is not the day for surprises. Greater Boston Livery brings the same precision to your transportation that your planner brings to every other detail — because getting to the church on time, in the right vehicle, looking immaculate, matters.',
      'We specialize in full-service wedding transportation across Greater Boston, the South Shore, Cape Cod, and throughout New England. From the morning-of logistics for the bridal party to the grand exit at the end of the night, we coordinate every vehicle, every arrival, every moment.',
      'Our fleet includes the white Chrysler 300 stretch limousine for the ultimate entrance, executive SUVs and sedans for the wedding party, and large coaches for guest shuttles between venues. Vehicle decoration is available, and every chauffeur is briefed on your timeline ahead of the day.',
    ],
    faqs: [
      {
        question: 'How far in advance should I book wedding transportation?',
        answer: 'We recommend booking 6 to 12 months in advance, especially for peak wedding season (May through October). Popular Saturdays fill quickly — the earlier you lock it in, the better.',
      },
      {
        question: 'Can you coordinate multiple vehicles for the bridal party?',
        answer: 'Yes. Multi-vehicle coordination is our specialty. We handle the entire transportation plan — from the bridal suite to the ceremony, cocktail hour, reception, and send-off.',
      },
      {
        question: 'Are your vehicles decorated for weddings?',
        answer: 'We offer tasteful vehicle decoration options including ribbon and floral accents. Let us know your preferences and color scheme when booking and we will take care of the rest.',
      },
      {
        question: 'What if the ceremony or reception runs over schedule?',
        answer: 'We build flexibility into every wedding timeline. Your chauffeur stays on standby and adjusts to the flow of your day — there are no rigid departure windows.',
      },
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
    metaTitle: 'Boston Charter & Roadshow Transportation | New England Day Trips | Greater Boston Livery',
    metaDescription: 'Full-day and multi-day chauffeured transportation for corporate roadshows and New England tours. Boston to Cape Cod, Newport, Berkshires, and NYC. Flexible itineraries and hourly rates available. Call (855) 425-4661.',
    longDescription: [
      'Some of the best business gets done on the road. Greater Boston Livery provides full-day and multi-day chauffeured transportation for investor roadshows, executive tours, and leisure trips throughout New England — and well beyond.',
      'Our chauffeurs are intimately familiar with the region\'s roads, venues, and logistics. Whether you\'re moving between investor meetings in Boston, Providence, and Hartford, or taking a leisure tour from Boston down to Newport and the Vineyard, we handle the routing so you can focus on the purpose of the trip.',
      'All charters are fully flexible — stops, route changes, extended time at a location. We work around your agenda, not the other way around.',
    ],
    faqs: [
      {
        question: 'What destinations do you cover?',
        answer: 'We serve all of New England and travel to New York City, Philadelphia, and beyond. Popular routes include Boston to Cape Cod, Newport, the Berkshires, Portland, Providence, and Hartford.',
      },
      {
        question: 'What is included in a full-day charter?',
        answer: 'A full-day charter includes your vehicle and professional chauffeur for up to 10 hours with a flexible, multi-stop itinerary. Extended hours are available at an hourly rate.',
      },
      {
        question: 'Do you offer hourly rates?',
        answer: 'Yes. Hourly rates are available for both local and long-distance charters. Contact us for custom pricing based on your vehicle preference and route.',
      },
      {
        question: 'Can we make multiple stops along the route?',
        answer: 'Absolutely. We accommodate any number of stops and are happy to suggest local dining, landmarks, or business venues based on your preferences.',
      },
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
    metaTitle: 'Special Occasion Limo Service Boston | Prom, Anniversary & Events | Greater Boston Livery',
    metaDescription: 'Luxury limousine and car service for proms, anniversaries, concerts, sporting events, and special occasions throughout Greater Boston. Stretch limos, party buses, and SUVs available. Call (855) 425-4661.',
    longDescription: [
      'Life\'s milestone moments deserve a vehicle worthy of the occasion. Whether it\'s a prom night to remember, a birthday that calls for the stretch limo, a concert, a casino run, or simply an anniversary dinner done right — Greater Boston Livery delivers the experience, not just the ride.',
      'We take the logistics off your plate entirely. Door-to-door service means no parking, no designated driver, and no ending the evening early. Your group travels together, arrives together, and enjoys the night without compromise.',
      'From our white 10-passenger Chrysler 300 stretch limousine to our Sprinter van and party buses, we have the vehicle that fits your group, your night, and your vision.',
    ],
    faqs: [
      {
        question: 'What is the most popular vehicle for prom?',
        answer: 'Our 10-passenger white Chrysler 300 stretch limousine is the top choice for proms and graduations. It accommodates up to 10 passengers and features an in-vehicle bar and premium interior.',
      },
      {
        question: 'How early should I book for prom season?',
        answer: 'Prom season runs April through June and is our busiest time of year. We strongly recommend booking 3 to 6 months in advance to secure your preferred vehicle and date.',
      },
      {
        question: 'Do you offer packages for special occasions?',
        answer: 'Yes. We offer custom packages for birthdays, bachelorette parties, anniversaries, and more. Call or email us to discuss your event and we will put together the right package.',
      },
      {
        question: 'Can we bring our own beverages?',
        answer: 'Select vehicles are alcohol-friendly and permit outside beverages. Please confirm when booking as the policy varies by vehicle type.',
      },
    ],
  },
]
