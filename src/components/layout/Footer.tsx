import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook } from 'lucide-react'
import { useEffect, useState } from 'react'

function BostonClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          timeZone: 'America/New_York',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      )
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
      <span className="font-body text-xs text-silver/50 tracking-widest uppercase">
        Boston Local Time
      </span>
      <span className="font-body text-xs text-gold font-medium">{time}</span>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-navy-dark border-t border-white/5">
      <div className="section-padding pt-20 pb-10">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <p className="font-display text-2xl text-cream font-medium">Greater Boston</p>
              <p className="font-body text-xs tracking-[0.3em] uppercase text-gold">Livery</p>
            </div>
            <p className="font-body text-sm text-silver/50 leading-relaxed mb-6">
              Formerly Greater Boston Coach. Premium chauffeured transportation serving Greater Boston, Cape Cod, South Shore, North Shore, and New York City. Available 24/7/365.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/GreaterBostonLivery/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2 border border-white/10 text-silver/40 hover:text-gold hover:border-gold transition-colors">
                <Facebook size={14} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="label-sm mb-6">Services</h4>
            <ul className="space-y-3">
              {['Airport Transfers', 'Corporate Travel', 'Weddings & Events', 'Roadshows & Tours', 'Special Occasions'].map((s) => (
                <li key={s}>
                  <Link to="/services" className="font-body text-sm text-silver/50 hover:text-gold transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Fleet */}
          <div>
            <h4 className="label-sm mb-6">Our Fleet</h4>
            <ul className="space-y-3">
              {['Luxury Sedans', 'Executive SUVs', 'Mercedes Sprinter', 'Stretch Limousine', 'View All Vehicles'].map((v) => (
                <li key={v}>
                  <Link to="/fleet" className="font-body text-sm text-silver/50 hover:text-gold transition-colors">
                    {v}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="label-sm mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+18554254661" className="flex items-start gap-3 text-silver/50 hover:text-gold transition-colors group">
                  <Phone size={14} className="mt-0.5 flex-shrink-0 group-hover:text-gold" />
                  <span className="font-body text-sm">(855) 425-4661</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@greaterbostonlivery.com" className="flex items-start gap-3 text-silver/50 hover:text-gold transition-colors group">
                  <Mail size={14} className="mt-0.5 flex-shrink-0 group-hover:text-gold" />
                  <span className="font-body text-sm">info@greaterbostonlivery.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-silver/50">
                  <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                  <span className="font-body text-sm">Serving Greater Boston<br />& All of New England</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="font-body text-xs text-silver/30">
              © {new Date().getFullYear()} Greater Boston Livery. All rights reserved.
            </p>
            <p className="font-body text-xs text-silver/20">
              Formerly operating as Greater Boston Coach.
            </p>
            <p className="font-body text-xs text-silver/20">
              Designed & built by{' '}
              <a
                href="https://gradydigital.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
              >
                Grady Digital
              </a>
            </p>
          </div>

          <BostonClock />

          <div className="flex items-center gap-6">
            <Link to="/contact" className="font-body text-xs text-silver/30 hover:text-gold transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="font-body text-xs text-silver/30 hover:text-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
