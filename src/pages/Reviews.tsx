import { Helmet } from 'react-helmet-async'
import { Star } from 'lucide-react'
import {
  buildReviewPageSchema,
  buildBreadcrumbSchema,
  schemaToString,
  SITE_URL,
} from '@/utils/seo'
import { PageTransition } from '@/components/motion/PageTransition'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'
import { ReviewCard } from '@/components/shared/ReviewCard'
import { reviews } from '@/data/reviews'

const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)

// Map review IDs to ISO 8601 dates (approximate for undated reviews)
const reviewDateMap: Record<string, string> = {
  '1': '2023-06-01',
  '2': '2024-10-01',
  '3': '2024-09-01',
  '4': '2024-08-01',
  '5': '2024-07-01',
  '6': '2024-06-01',
  '7': '2024-05-01',
  '8': '2024-04-01',
}

const reviewSchema = schemaToString(
  buildReviewPageSchema(
    reviews.map((r) => ({
      author: r.author,
      rating: r.rating,
      text: r.text,
      datePublished: reviewDateMap[r.id] ?? '2024-01-01',
    })),
    avgRating,
    reviews.length
  )
)

const reviewsBreadcrumb = schemaToString(
  buildBreadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Reviews', href: '/reviews' },
  ])
)

export function Reviews() {
  return (
    <PageTransition>
      <Helmet>
        <title>Client Reviews | 5-Star Chauffeured Service Boston | Greater Boston Livery</title>
        <meta name="description" content={`Greater Boston Livery has earned a perfect ${avgRating}-star rating from ${reviews.length} verified clients. Read reviews from corporate executives, wedding couples, and frequent travelers.`} />
        <link rel="canonical" href={`${SITE_URL}/reviews`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/reviews`} />
        <meta property="og:title" content={`${avgRating}-Star Reviews | Greater Boston Livery`} />
        <meta property="og:description" content={`${reviews.length} verified 5-star reviews from corporate executives, wedding couples, and travelers. Boston's premier chauffeured service.`} />
        <meta property="og:image" content={`${SITE_URL}/gbl_logo.webp`} />
        <script type="application/ld+json">{reviewSchema}</script>
        <script type="application/ld+json">{reviewsBreadcrumb}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-navy pt-40 pb-20 section-padding">
        <RevealOnScroll>
          <p className="label-sm mb-4">Testimonials</p>
          <h1 className="heading-display text-cream max-w-2xl">
            Trusted by Boston's<br />
            <span className="gold-gradient">Most Discerning Clients</span>
          </h1>
        </RevealOnScroll>

        {/* Rating summary */}
        <RevealOnScroll delay={0.2} className="mt-12 flex flex-wrap items-center gap-8">
          <div className="flex items-center gap-4">
            <span className="font-display text-6xl text-gold">{avgRating}</span>
            <div>
              <div className="flex gap-1 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="font-body text-silver/50 text-sm">{reviews.length} verified reviews</p>
            </div>
          </div>

          <div className="h-12 w-px bg-white/10 hidden md:block" />

          <div className="font-body text-silver/40 text-sm">
            <p>Reviews sourced from Yelp and direct client feedback.</p>
            <p>Attributed with client permission as First Name + Last Initial.</p>
          </div>
        </RevealOnScroll>
      </section>

      {/* Masonry Grid */}
      <section className="section-padding py-20 bg-cream">
        <StaggerChildren className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {reviews.map((review) => (
            <StaggerItem key={review.id} className="break-inside-avoid">
              <ReviewCard review={review} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {/* CTA */}
      <section className="bg-navy section-padding py-20 text-center">
        <RevealOnScroll>
          <h2 className="heading-lg text-cream mb-4">Join Our Satisfied Clients</h2>
          <p className="font-body text-silver/60 mb-8 max-w-lg mx-auto">
            Experience the Greater Boston Livery difference for yourself.
          </p>
          <a href="https://customer.moovs.app/greater-boston-coach/request/new" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex">Book Your First Ride</a>
        </RevealOnScroll>
      </section>
    </PageTransition>
  )
}
