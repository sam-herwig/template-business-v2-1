'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { COMPANY, SERVICES } from '@/lib/data'
import { ChevronDown, Phone, X, Menu } from 'lucide-react'

export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setServicesOpen(false)
  }, [pathname])

  const navItems = [
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  const isActive = (href: string) => pathname === href
  const isServicesActive = pathname.startsWith('/services')
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-md dark:bg-dark-900/95' 
        : 'bg-white shadow-sm dark:bg-dark-900'
    }`}>
      <nav aria-label="Main navigation" className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="font-display text-xl text-dark-900 flex items-center gap-2">
            <span className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white text-lg font-bold">
              B
            </span>
            <span className="hidden sm:inline">{COMPANY.name}</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className={`nav-link flex items-center gap-1 ${isServicesActive ? 'text-primary-600' : ''}`}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[600px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-3">
                        {SERVICES.map((service, i) => (
                          <Link
                            key={i}
                            href={`/services/${service.slug}`}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                            onClick={() => setServicesOpen(false)}
                          >
                            <span className="text-2xl">{service.icon}</span>
                            <div>
                              <span className="font-medium text-dark-900 group-hover:text-primary-600 transition-colors block">
                                {service.name}
                              </span>
                              <span className="text-xs text-gray-500 line-clamp-1">
                                {service.shortDescription}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <Link
                          href="/services"
                          className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm hover:gap-3 transition-all"
                          onClick={() => setServicesOpen(false)}
                        >
                          View All Services
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other Nav Items */}
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={`nav-link ${isActive(item.href) ? 'text-primary-600' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-2 font-semibold text-primary-600 hover:text-primary-700 transition-colors">
              <Phone className="w-5 h-5" />
              {COMPANY.phone}
            </a>
            <Link href="/contact" className="btn-primary text-sm py-3">Get Free Quote</Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              id="mobile-menu"
              role="navigation"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden border-t border-gray-100"
            >
              <div className="py-6 space-y-2">
                {/* Services Accordion */}
                <div>
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg"
                  >
                    Services
                    <ChevronDown className={`w-5 h-5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 space-y-1 py-2">
                          {SERVICES.slice(0, 6).map((service, i) => (
                            <Link
                              key={i}
                              href={`/services/${service.slug}`}
                              className="block px-4 py-2 text-gray-600 hover:text-primary-600 text-sm"
                            >
                              {service.icon} {service.name}
                            </Link>
                          ))}
                          <Link
                            href="/services"
                            className="block px-4 py-2 text-primary-600 font-medium text-sm"
                          >
                            View All Services →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Other Nav Items */}
                {navItems.map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className={`block px-4 py-3 font-medium rounded-lg transition-colors ${
                      isActive(item.href) 
                        ? 'text-primary-600 bg-primary-50' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* Mobile CTA */}
                <div className="pt-4 border-t border-gray-100 space-y-3 px-4">
                  <a 
                    href={`tel:${COMPANY.phone}`} 
                    className="flex items-center gap-2 font-semibold text-primary-600"
                  >
                    <Phone className="w-5 h-5" />
                    {COMPANY.phone}
                  </a>
                  <Link href="/contact" className="btn-primary text-center block">
                    Get Free Quote
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
