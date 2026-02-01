'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { href: '/menu', label: 'Menu' },
  { href: '/reservations', label: 'Reservations' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
]

const RESTAURANT_NAME = 'The Golden Fork'

export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), [])

  // On subpages, always show solid background
  const showSolidBg = scrolled || !isHomePage

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showSolidBg
          ? 'bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100/50 dark:bg-dark-950/95 dark:border-gray-800/50'
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className={`font-display text-2xl transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-sm ${
              showSolidBg ? 'text-dark-900 dark:text-white' : 'text-white'
            }`}
            aria-label={`${RESTAURANT_NAME} - Home`}
          >
            {RESTAURANT_NAME}
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-medium transition-colors duration-200 group focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-sm ${
                    showSolidBg
                      ? 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                      : 'text-white/90 hover:text-white'
                  } ${isActive ? 'text-primary-600 dark:text-primary-400' : ''}`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    } ${showSolidBg ? 'bg-primary-500' : 'bg-white'}`}
                    aria-hidden="true"
                  />
                </Link>
              )
            })}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/reservations"
              className={`btn-primary text-sm focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                !showSolidBg && 'bg-white text-dark-900 hover:bg-white/90'
              }`}
            >
              Reserve a Table
            </Link>
          </div>

          <button
            className={`md:hidden p-2 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-sm ${
              showSolidBg ? 'text-dark-900 dark:text-white' : 'text-white'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-white dark:bg-dark-950 rounded-b-lg"
            >
              <div className="py-4 space-y-2 border-t border-gray-100 dark:border-gray-800 px-2">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block py-2 px-4 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 ${
                        isActive
                          ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20'
                          : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                      }`}
                      onClick={closeMobileMenu}
                    >
                      {link.label}
                    </Link>
                  )
                })}
                <Link
                  href="/reservations"
                  className="btn-primary text-center block mx-4 mt-4 focus-visible:ring-2 focus-visible:ring-primary-500"
                  onClick={closeMobileMenu}
                >
                  Reserve a Table
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
