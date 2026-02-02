'use client'

import Link from 'next/link'
import { Instagram, Facebook, Heart } from 'lucide-react'

const RESTAURANT = {
  name: 'Sunny Side',
  tagline: "Denver's happiest breakfast spot.",
  phone: '(303) 555-0147',
  email: 'hello@sunnysidedenver.com',
  address: {
    street: '2850 Larimer Street',
    city: 'Denver',
    state: 'CO',
    zip: '80205',
  },
  hours: {
    weekday: '7am - 3pm',
    weekend: '8am - 4pm',
  },
  social: {
    instagram: 'https://instagram.com/sunnysidedenver',
    facebook: 'https://facebook.com/sunnysidedenver',
    tiktok: 'https://tiktok.com/@sunnysidedenver',
  },
}

const NAV_LINKS = [
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
  { href: '#', label: 'Catering' },
  { href: '#', label: 'Careers' },
  { href: '#', label: 'Gift Cards' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-charcoal text-white px-4 md:px-16 pt-16 pb-8" role="contentinfo">
      <div className="max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl" aria-hidden="true">☀️</span>
              <span className="font-display text-xl font-semibold">{RESTAURANT.name}</span>
            </Link>
            <p className="text-white/60 mb-6 max-w-sm">
              {RESTAURANT.tagline}
            </p>
            <div className="flex items-center gap-4">
              <a
                href={RESTAURANT.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href={RESTAURANT.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href={RESTAURANT.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
                aria-label="Follow us on TikTok"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation">
            <h4 className="font-medium text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-coral rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-white mb-4">Contact</h4>
            <address className="space-y-3 text-white/60 not-italic">
              <p>
                {RESTAURANT.address.street}<br />
                {RESTAURANT.address.city}, {RESTAURANT.address.state} {RESTAURANT.address.zip}
              </p>
              <p>
                <a 
                  href={`tel:${RESTAURANT.phone.replace(/\D/g, '')}`} 
                  className="hover:text-white transition-colors"
                >
                  {RESTAURANT.phone}
                </a>
              </p>
              <p>
                <a 
                  href={`mailto:${RESTAURANT.email}`} 
                  className="hover:text-white transition-colors"
                >
                  {RESTAURANT.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="text-center">
            <p className="text-white/50 text-sm mb-4">
              {RESTAURANT.hours.weekday} Mon–Fri • {RESTAURANT.hours.weekend} Sat–Sun • {RESTAURANT.phone}
            </p>
            <p className="text-white/40 text-xs">
              © {currentYear} {RESTAURANT.name}. Made with{' '}
              <Heart className="w-3 h-3 inline text-coral" aria-hidden="true" />{' '}
              in Colorado. •{' '}
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link> •{' '}
              <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
