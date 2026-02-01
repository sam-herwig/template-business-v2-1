'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/docs', label: 'Docs' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 md:px-16 py-4 bg-minimal-bg/80 dark:bg-minimal-dark-bg/80 backdrop-blur-xl border-b border-minimal-border dark:border-minimal-dark-border" aria-label="Main navigation">
      <div className="flex items-center gap-12">
        <Link href="/" className="text-xl font-bold tracking-tight" aria-label="Acme - Home">▲ Acme</Link>
        <div className="hidden md:flex gap-8" role="navigation">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`text-sm font-medium transition-colors ${
                pathname === link.href 
                  ? 'text-minimal-text dark:text-minimal-dark-text' 
                  : 'text-minimal-muted dark:text-minimal-dark-muted hover:text-minimal-text dark:hover:text-minimal-dark-text'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <Link href="#login" className="hidden md:block text-minimal-muted dark:text-minimal-dark-muted text-sm font-medium hover:text-minimal-text dark:hover:text-minimal-dark-text transition-colors">
          Log In
        </Link>
        <button className="nav-cta hidden md:block" aria-label="Sign up for an account">Sign Up</button>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 -mr-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-minimal-bg dark:bg-minimal-dark-bg border-b border-minimal-border dark:border-minimal-dark-border md:hidden">
          <div className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`text-sm font-medium py-2 transition-colors ${
                  pathname === link.href 
                    ? 'text-minimal-text dark:text-minimal-dark-text' 
                    : 'text-minimal-muted dark:text-minimal-dark-muted'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-minimal-border dark:border-minimal-dark-border flex flex-col gap-3">
              <Link href="#login" className="text-sm font-medium text-minimal-muted dark:text-minimal-dark-muted">Log In</Link>
              <button className="nav-cta w-full">Sign Up</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
