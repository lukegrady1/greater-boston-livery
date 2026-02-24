import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'
import { SITE_URL } from '@/utils/seo'
import { PageTransition } from '@/components/motion/PageTransition'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'

const values = [
  { title: 'Punctuality', desc: 'We understand that your time is your most valuable asset. We are always on time — no exceptions.' },
  { title: 'Discretion', desc: 'Our team handles every ride with the utmost professionalism and confidentiality.' },
  { title: 'Hospitality', desc: 'From the moment you book to the moment you arrive, we treat every client like a VIP.' },
  { title: 'Safety', desc: 'All chauffeurs are fully licensed, insured, background-checked, and trained to the highest standard.' },
]

export function Team() {
  return (
    <PageTransition>
      <Helmet>
        <title>Meet the Team | Greater Boston Livery</title>
        <meta name="description" content="Meet the people behind Greater Boston Livery — led by founder John Grady, our team has provided premier chauffeured transportation throughout Greater Boston since 2008." />
        <link rel="canonical" href={`${SITE_URL}/team`} />
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
            <p className="label-sm mb-4">The People Behind the Service</p>
            <h1 className="heading-display text-cream max-w-2xl">
              Meet the<br />
              <span className="gold-gradient">Team</span>
            </h1>
            <p className="font-body text-silver/60 mt-6 max-w-xl leading-relaxed">
              Every great ride starts with great people. Our team is built on a culture of professionalism, discretion, and genuine care for every client we serve.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* John Grady — Featured */}
      <section className="section-padding py-28 bg-cream">
        <RevealOnScroll>
          <p className="label-sm mb-16">Founder &amp; Owner</p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl">
          <RevealOnScroll direction="left">
            {/* Photo placeholder */}
            <div className="relative">
              <div className="aspect-[4/5] bg-navy/5 border border-silver flex items-center justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}gbl_logo.PNG`}
                  alt="Greater Boston Livery"
                  className="w-2/3 object-contain"
                />
              </div>
              {/* Gold accent frame */}
              <div className="absolute -bottom-4 -right-4 w-2/3 h-2/3 border border-gold/20 -z-10" />
              {/* Name plate */}
              <div className="absolute -bottom-6 -left-6 bg-gold px-6 py-4">
                <p className="font-display text-lg text-navy font-medium">John Grady</p>
                <p className="font-body text-xs text-navy/70 mt-0.5 tracking-wider uppercase">Founder &amp; Owner</p>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="right" delay={0.2}>
            <h2 className="heading-lg mb-6">
              Built on Trust,<br />
              <span className="gold-gradient">Driven by Standards.</span>
            </h2>
            <div className="divider-gold mb-8" />
            <div className="space-y-4 font-body text-navy/60 leading-relaxed">
              <p>
                John Grady founded Greater Boston Coach in 2008 with a straightforward mission: deliver the kind of chauffeured transportation that Greater Boston's executives, families, and event planners could genuinely rely on.
              </p>
              <p>
                Over 15 years later, that mission hasn't changed. What began as a small operation has grown into a full-service luxury fleet — now operating under the name Greater Boston Livery — while maintaining the personal touch and attention to detail that John built the business on.
              </p>
              <p>
                John is hands-on in every aspect of the business, from fleet maintenance to client relationships. His standard is simple: every client should feel like their ride is the most important one of the day.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="tel:+18554254661" className="btn-primary">
                <Phone size={14} />
                Reach Our Team
              </a>
              <Link to="/contact" className="btn-outline">
                Send a Message <ArrowRight size={14} />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Our Chauffeurs */}
      <section className="bg-navy section-padding py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl">
          <RevealOnScroll>
            <p className="label-sm mb-6">Our Chauffeurs</p>
            <h2 className="heading-lg text-cream mb-6">
              Professionals You Can<br />
              <span className="gold-gradient">Count On.</span>
            </h2>
            <div className="divider-gold mb-8" />
            <p className="font-body text-silver/60 leading-relaxed mb-6">
              Every chauffeur on our team is hand-selected, background-checked, and trained to represent the Greater Boston Livery standard. They are not just drivers — they are hospitality professionals who take pride in making your experience seamless from pickup to drop-off.
            </p>
            <p className="font-body text-silver/60 leading-relaxed">
              Suited, courteous, and knowledgeable about the Greater Boston area, our chauffeurs are available 24/7/365 and are accustomed to serving corporate executives, wedding parties, and discerning travelers alike.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <StaggerChildren className="grid grid-cols-1 gap-0 border border-white/10">
              {values.map(({ title, desc }) => (
                <StaggerItem key={title}>
                  <div className="p-6 border-b border-white/10 last:border-b-0">
                    <h3 className="font-display text-base text-gold mb-2">{title}</h3>
                    <p className="font-body text-sm text-silver/60 leading-relaxed">{desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding py-24 bg-cream text-center">
        <RevealOnScroll>
          <p className="label-sm mb-6">Experience the Difference</p>
          <h2 className="heading-display mb-6 max-w-2xl mx-auto">
            Ready to ride with the best?
          </h2>
          <p className="font-body text-navy/60 max-w-lg mx-auto mb-10">
            Book your ride today or reach out to John and his team directly — we'd love to hear from you.
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
            <Link to="/contact" className="btn-outline">
              Contact Us <ArrowRight size={14} />
            </Link>
          </div>
        </RevealOnScroll>
      </section>
    </PageTransition>
  )
}
