'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export function Nav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-4 md:px-16 py-5 backdrop-blur-xl bg-aurora-bg/70 border-b border-white/10"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center gap-3 text-2xl font-bold tracking-tight" aria-label="Lumina home">
          <span className="text-2xl gradient-text" aria-hidden="true">◈</span>
          <span>Lumina</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-medium transition-colors ${
                pathname === item.href 
                  ? 'text-aurora-indigo' 
                  : 'text-white hover:text-aurora-indigo'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <motion.button 
            className="nav-cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Get started with Lumina"
          >
            Get Started
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[99] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-aurora-bg/95 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              className="absolute top-20 left-0 right-0 bottom-0 flex flex-col items-center justify-center gap-8 p-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ delay: 0.1 }}
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={`text-2xl font-semibold transition-colors ${
                      pathname === item.href 
                        ? 'text-aurora-indigo' 
                        : 'text-white hover:text-aurora-indigo'
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.button 
                className="btn-primary mt-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
