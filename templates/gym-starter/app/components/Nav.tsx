'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { GYM } from './data'
import { MenuIcon, CloseIcon } from './icons'
import { mobileMenu, mobileMenuReduced, useVariant } from './animations'

// ═══════════════════════════════════════════════════════════════
// Navigation Component
// ═══════════════════════════════════════════════════════════════

const NAV_ITEMS = ['Classes', 'Membership', 'Trainers', 'Contact'] as const

export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuVariants = useVariant(mobileMenu, mobileMenuReduced, prefersReducedMotion)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-950/95 backdrop-blur-lg border-b border-dark-800'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="font-display text-2xl text-white tracking-[0.2em]">
            {GYM.name}
          </a>

          <div className="hidden md:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
                {item}
              </a>
            ))}
          </div>

          <a href={GYM.bookingUrl} className="hidden md:inline-flex btn-primary text-sm">
            Start Free Trial
          </a>

          <button
            className="md:hidden p-3 -m-1 text-white min-w-[48px] min-h-[48px] flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={menuVariants}
              className="md:hidden overflow-hidden border-t border-dark-800"
            >
              <div className="py-6 space-y-2">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block py-3 px-4 text-gray-400 uppercase tracking-widest text-sm font-medium hover:text-white hover:bg-dark-800 transition-colors min-h-[48px] flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <a
                  href={GYM.bookingUrl}
                  className="btn-primary text-center block mt-4 min-h-[48px] flex items-center justify-center"
                >
                  Start Free Trial
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
