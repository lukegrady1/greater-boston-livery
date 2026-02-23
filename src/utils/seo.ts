// ─── Business constants ────────────────────────────────────────────────────
export const SITE_URL = 'https://greaterbostonlivery.com'
export const BUSINESS_NAME = 'Greater Boston Livery'
export const PHONE = '+18554254661'
export const PHONE_DISPLAY = '(855) 425-4661'
export const EMAIL = 'info@greaterbostonlivery.com'
export const BOOKING_URL = 'https://customer.moovs.app/greater-boston-coach/request/new'
export const FACEBOOK_URL = 'https://www.facebook.com/GreaterBostonLivery/'
export const LOGO_URL = `${SITE_URL}/gbl_logo.webp`

// ─── LocalBusiness schema ─────────────────────────────────────────────────
export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'LimousineParkingAndTaxis'],
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS_NAME,
    alternateName: 'Greater Boston Coach',
    description:
      'Greater Boston Livery offers premium chauffeured transportation for airport transfers, corporate travel, weddings, and special occasions throughout Greater Boston and New England.',
    url: SITE_URL,
    telephone: PHONE,
    email: EMAIL,
    logo: LOGO_URL,
    image: LOGO_URL,
    priceRange: '$$$',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Credit Card',
    openingHours: 'Mo-Su 00:00-23:59',
    areaServed: [
      { '@type': 'City', name: 'Boston', sameAs: 'https://en.wikipedia.org/wiki/Boston' },
      { '@type': 'State', name: 'Massachusetts' },
      { '@type': 'AdministrativeArea', name: 'New England' },
    ],
    hasMap: 'https://maps.google.com/?q=Boston,MA',
    sameAs: [FACEBOOK_URL],
    foundingDate: '2008',
    knowsAbout: [
      'Airport Transfers',
      'Corporate Transportation',
      'Wedding Transportation',
      'Chauffeured Services',
      'Luxury Ground Transportation',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '8',
      bestRating: '5',
      worstRating: '1',
    },
  }
}

// ─── WebSite schema ───────────────────────────────────────────────────────
export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BUSINESS_NAME,
    description: 'Premium chauffeured transportation serving Greater Boston and New England.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/fleet?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

// ─── BreadcrumbList schema ────────────────────────────────────────────────
export interface BreadcrumbItem {
  name: string
  href: string
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  }
}

// ─── Service ItemList schema ──────────────────────────────────────────────
export interface ServiceSchemaInput {
  name: string
  description: string
  id: string
}

export function buildServiceSchema(services: ServiceSchemaInput[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Greater Boston Livery Services',
    description: 'Premium chauffeured transportation services in Greater Boston',
    url: `${SITE_URL}/services`,
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        '@id': `${SITE_URL}/services#${service.id}`,
        name: service.name,
        description: service.description,
        provider: {
          '@type': 'LocalBusiness',
          '@id': `${SITE_URL}/#business`,
          name: BUSINESS_NAME,
        },
        areaServed: { '@type': 'State', name: 'Massachusetts' },
        url: `${SITE_URL}/services#${service.id}`,
      },
    })),
  }
}

// ─── Review + AggregateRating schema ─────────────────────────────────────
export interface ReviewSchemaInput {
  author: string
  rating: number
  text: string
  datePublished: string
}

export function buildReviewPageSchema(
  reviewList: ReviewSchemaInput[],
  ratingValue: string,
  reviewCount: number
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS_NAME,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      reviewCount: String(reviewCount),
      bestRating: '5',
      worstRating: '1',
    },
    review: reviewList.map((r) => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(r.rating),
        bestRating: '5',
        worstRating: '1',
      },
      author: { '@type': 'Person', name: r.author },
      reviewBody: r.text,
      datePublished: r.datePublished,
    })),
  }
}

// ─── FAQPage schema ───────────────────────────────────────────────────────
export interface FaqItem {
  question: string
  answer: string
}

export function buildFaqSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// ─── Serializer ───────────────────────────────────────────────────────────
export function schemaToString(schema: object): string {
  return JSON.stringify(schema)
}
