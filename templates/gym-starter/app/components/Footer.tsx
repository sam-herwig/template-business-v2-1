'use client'

import { GYM } from './data'
import { InstagramIcon, FacebookIcon, YouTubeIcon } from './icons'

// ═══════════════════════════════════════════════════════════════
// Footer Component
// ═══════════════════════════════════════════════════════════════

const SOCIAL_LINKS = [
  { name: 'Instagram', icon: InstagramIcon, href: '#' },
  { name: 'Facebook', icon: FacebookIcon, href: '#' },
  { name: 'YouTube', icon: YouTubeIcon, href: '#' },
] as const

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-950 border-t border-dark-800 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-display text-2xl text-white tracking-[0.2em]">{GYM.name}</div>
          <div className="flex gap-6">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="text-gray-500 hover:text-white transition-colors p-2"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
        <div className="text-center text-gray-600 text-sm mt-8">
          © {currentYear} {GYM.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
