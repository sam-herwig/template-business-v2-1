'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

interface Breadcrumb {
  label: string
  href: string
}

interface PageHeroProps {
  title: string
  subtitle?: string
  backgroundImage: string
  height?: 'short' | 'medium' | 'tall'
  breadcrumbs?: Breadcrumb[]
}

export function PageHero({
  title,
  subtitle,
  backgroundImage,
  height = 'medium',
  breadcrumbs,
}: PageHeroProps) {
  const heightClasses = {
    short: 'min-h-[40vh]',
    medium: 'min-h-[50vh]',
    tall: 'min-h-[70vh]',
  }

  return (
    <section 
      className={`relative ${heightClasses[height]} flex items-center justify-center overflow-hidden`}
      aria-labelledby="page-hero-title"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={85}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/40 to-charcoal/60" 
          aria-hidden="true" 
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 pt-20">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav 
            aria-label="Breadcrumb" 
            className="mb-6"
          >
            <ol className="flex items-center justify-center gap-2 text-sm text-white/70">
              <li>
                <Link 
                  href="/" 
                  className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-white rounded-sm"
                >
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-white" aria-current="page">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link 
                      href={crumb.href} 
                      className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-white rounded-sm"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Title */}
        <motion.h1
          id="page-hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-4"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
