'use client'

import Link from 'next/link'
import { Instagram, Facebook, Twitter } from 'lucide-react'

const RESTAURANT = {
  name: 'The Golden Fork',
  tagline: 'Farm to table excellence',
  description: 'Experience the finest locally-sourced ingredients prepared with passion.',
  address: '123 Main Street, Downtown',
  phone: '(555) 123-4567',
  email: 'hello@goldenfork.com',
}

const NAV_LINKS = [
  { href: '/menu', label: 'Menu' },
  { href: '/reservations', label: 'Reservations' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Private Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
]

const SOCIALS = [
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-950 text-white py-16" role="contentinfo">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="font-display text-2xl mb-4 block hover:text-primary-400 transition-colors">
              {RESTAURANT.name}
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              {RESTAURANT.tagline}. {RESTAURANT.description}
            </p>
            <div className="flex items-center gap-4">
              {SOCIALS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation">
            <h4 className="font-medium text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 rounded-sm"
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
            <address className="space-y-3 text-gray-400 not-italic">
              <p>{RESTAURANT.address}</p>
              <p>
                <a href={`tel:${RESTAURANT.phone.replace(/\D/g, '')}`} className="hover:text-white transition-colors">
                  {RESTAURANT.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${RESTAURANT.email}`} className="hover:text-white transition-colors">
                  {RESTAURANT.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-500 text-sm">
            © {currentYear} {RESTAURANT.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="#" className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 rounded-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 rounded-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
