'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu as MenuIcon, 
  X, 
  Sun, 
  Moon, 
  ShoppingBag, 
  CalendarDays,
  Clock,
  Phone
} from 'lucide-react'

const NAV_LINKS = [
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
]

const RESTAURANT_NAME = 'Sunny Side'

export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), [])

  const toggleDarkMode = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    
    if (newIsDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  // On subpages, always show solid background
  const showSolidBg = scrolled || !isHomePage

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          showSolidBg
            ? 'bg-cream/95 backdrop-blur-lg shadow-sm border-b border-charcoal/5 dark:bg-dark-bg/95 dark:border-white/5'
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-[72px] lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
              aria-label={`${RESTAURANT_NAME} - Home`}
            >
              <span 
                className="text-2xl transition-transform duration-300 group-hover:rotate-[15deg]" 
                aria-hidden="true"
              >
                ☀️
              </span>
              <span className={`font-display text-xl lg:text-2xl font-semibold transition-colors duration-300 ${
                showSolidBg ? 'text-charcoal dark:text-cream' : 'text-white'
              }`}>
                {RESTAURANT_NAME}
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative font-medium transition-colors duration-200 group focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 rounded-sm ${
                      showSolidBg
                        ? 'text-charcoal-light hover:text-charcoal dark:text-cream/80 dark:hover:text-cream'
                        : 'text-white/90 hover:text-white'
                    } ${isActive ? 'text-coral dark:text-coral' : ''}`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      } ${showSolidBg ? 'bg-coral' : 'bg-white'}`}
                      aria-hidden="true"
                    />
                  </Link>
                )
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-coral ${
                  showSolidBg 
                    ? 'hover:bg-charcoal/10 dark:hover:bg-white/10' 
                    : 'hover:bg-white/10'
                }`}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? (
                  <Sun className={`w-5 h-5 ${showSolidBg ? 'text-charcoal dark:text-cream' : 'text-white'}`} />
                ) : (
                  <Moon className={`w-5 h-5 ${showSolidBg ? 'text-charcoal dark:text-cream' : 'text-white'}`} />
                )}
              </button>
              
              <Link
                href="/menu"
                className={`btn-ghost text-sm ${
                  !showSolidBg && 'border-white/50 text-white hover:bg-white/10 hover:text-white'
                }`}
              >
                Order Online
              </Link>
              
              <Link
                href="/contact#reserve"
                className={`btn-primary text-sm px-6 py-3 min-h-0 ${
                  !showSolidBg && 'bg-white text-charcoal hover:bg-white/90'
                }`}
              >
                Reserve a Table
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={toggleDarkMode}
                className={`p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-colors ${
                  showSolidBg 
                    ? 'hover:bg-charcoal/10 dark:hover:bg-white/10' 
                    : 'hover:bg-white/10'
                }`}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? (
                  <Sun className={`w-5 h-5 ${showSolidBg ? 'text-charcoal dark:text-cream' : 'text-white'}`} />
                ) : (
                  <Moon className={`w-5 h-5 ${showSolidBg ? 'text-charcoal dark:text-cream' : 'text-white'}`} />
                )}
              </button>
              
              <button
                className={`p-2 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-coral rounded-sm ${
                  showSolidBg ? 'text-charcoal dark:text-cream' : 'text-white'
                }`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <MenuIcon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-charcoal/60 dark:bg-black/80"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />
            
            {/* Drawer */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 w-[85%] max-w-sm h-full bg-cream dark:bg-dark-bg p-8 flex flex-col"
              aria-label="Mobile navigation"
            >
              <button
                onClick={closeMobileMenu}
                className="self-end p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-charcoal dark:text-cream"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex flex-col gap-6 mt-8">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`text-xl font-medium transition-colors py-2 ${
                        isActive 
                          ? 'text-coral' 
                          : 'text-charcoal dark:text-cream hover:text-coral'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </div>
              
              <div className="mt-8 pt-8 border-t border-charcoal/10 dark:border-white/10">
                <Link 
                  href="/menu" 
                  onClick={closeMobileMenu}
                  className="btn-ghost w-full justify-center mb-4"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Order Online
                </Link>
                <Link 
                  href="/contact#reserve" 
                  onClick={closeMobileMenu} 
                  className="btn-primary w-full justify-center"
                >
                  <CalendarDays className="w-4 h-4" />
                  Reserve a Table
                </Link>
              </div>
              
              <div className="mt-auto pt-8 text-charcoal-light dark:text-cream/70 text-sm">
                <p className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4" />
                  Mon-Sun 7am - 3pm
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  (303) 555-0147
                </p>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
