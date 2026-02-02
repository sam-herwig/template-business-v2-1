'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SectionWrapperProps {
  children: ReactNode
  background?: 'default' | 'muted' | 'accent'
  eyebrow?: string
  title?: string
  description?: string
  className?: string
  id?: string
}

export function SectionWrapper({
  children,
  background = 'default',
  eyebrow,
  title,
  description,
  className = '',
  id,
}: SectionWrapperProps) {
  const bgClasses = {
    default: 'bg-cream dark:bg-dark-bg',
    muted: 'bg-white dark:bg-dark-card',
    accent: 'bg-sage-light dark:bg-sage/10',
  }

  return (
    <section
      id={id}
      className={`section-padding ${bgClasses[background]} ${className}`}
      aria-labelledby={title ? `section-${id || 'content'}-title` : undefined}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        {(eyebrow || title || description) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            {eyebrow && (
              <span className="section-tag">{eyebrow}</span>
            )}
            {title && (
              <h2 
                id={`section-${id || 'content'}-title`}
                className="font-display text-3xl md:text-4xl text-charcoal dark:text-cream mb-4"
              >
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg text-charcoal-light dark:text-cream/80">
                {description}
              </p>
            )}
          </motion.div>
        )}

        {/* Section Content */}
        {children}
      </div>
    </section>
  )
}
