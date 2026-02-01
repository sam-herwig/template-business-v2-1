'use client'

import Link from 'next/link'

const footerLinks = [
  { 
    title: 'Product', 
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Changelog', href: '/blog' },
    ]
  },
  { 
    title: 'Company', 
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/about#careers' },
    ]
  },
  { 
    title: 'Resources', 
    links: [
      { label: 'Docs', href: '/docs' },
      { label: 'Support', href: '/contact' },
      { label: 'Contact', href: '/contact' },
    ]
  },
]

export default function Footer() {
  return (
    <footer className="py-12 md:py-16 px-4 md:px-16 border-t border-minimal-border dark:border-minimal-dark-border" role="contentinfo">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
          <div className="max-w-xs">
            <Link href="/" className="text-xl font-bold tracking-tight" aria-label="Acme - Home">▲ Acme</Link>
            <p className="text-minimal-muted dark:text-minimal-dark-muted text-sm mt-3">Build faster. Deploy smarter.</p>
          </div>
          
          <div className="flex flex-wrap gap-12 md:gap-20">
            {footerLinks.map((col) => (
              <nav key={col.title} aria-label={`${col.title} navigation`} className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-minimal-muted dark:text-minimal-dark-muted mb-2">{col.title}</h3>
                <ul role="list">
                  {col.links.map((link) => (
                    <li key={link.label} className="mb-2">
                      <Link href={link.href} className="text-minimal-muted dark:text-minimal-dark-muted hover:text-minimal-text dark:hover:text-minimal-dark-text transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        
        <div className="pt-8 border-t border-minimal-border dark:border-minimal-dark-border text-center">
          <p className="text-minimal-muted dark:text-minimal-dark-muted text-sm">© 2026 Acme Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
