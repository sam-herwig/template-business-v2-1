'use client'

import Link from 'next/link'
import { Twitter, Linkedin, Instagram, Github } from 'lucide-react'

const FOOTER_LINKS = [
  { title: 'Product', links: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Changelog', href: '#' },
  ]},
  { title: 'Company', links: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '#' },
  ]},
  { title: 'Resources', links: [
    { label: 'Documentation', href: '#' },
    { label: 'Support', href: '/contact' },
    { label: 'API', href: '#' },
  ]},
]

const SOCIAL_LINKS = [
  { icon: <Twitter className="w-5 h-5" />, label: 'Follow us on X (Twitter)', href: '#' },
  { icon: <Linkedin className="w-5 h-5" />, label: 'Connect on LinkedIn', href: '#' },
  { icon: <Instagram className="w-5 h-5" />, label: 'Follow us on Instagram', href: '#' },
  { icon: <Github className="w-5 h-5" />, label: 'View our GitHub', href: '#' },
]

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 py-16 md:py-20 px-4 md:px-16" style={{ background: 'rgba(0, 0, 0, 0.4)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-3 text-2xl font-bold mb-4" aria-label="Lumina home">
              <span className="gradient-text" aria-hidden="true">◈</span>
              <span>Lumina</span>
            </Link>
            <p className="text-white/80 leading-relaxed">Design without boundaries. The next generation design platform for modern creators.</p>
          </div>
          
          {/* Links */}
          <nav className="flex flex-wrap gap-16" aria-label="Footer navigation">
            {FOOTER_LINKS.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-white/90 mb-2">{col.title}</h4>
                <ul className="flex flex-col gap-3 list-none p-0 m-0">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-white/70 hover:text-aurora-indigo transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/70">
          <p>© {new Date().getFullYear()} Lumina. All rights reserved.</p>
          <ul className="flex gap-6 list-none p-0 m-0" role="list" aria-label="Social media links">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a 
                  href={social.href} 
                  className="hover:text-aurora-indigo transition-all hover:-translate-y-0.5 inline-block"
                  aria-label={social.label}
                >
                  <span aria-hidden="true">{social.icon}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
