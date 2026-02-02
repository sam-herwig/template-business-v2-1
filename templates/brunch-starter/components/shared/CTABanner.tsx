'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface CTAAction {
  label: string
  href: string
}

interface CTABannerProps {
  title: string
  description: string
  primaryAction: CTAAction
  secondaryAction?: CTAAction
  emoji?: string
}

export function CTABanner({
  title,
  description,
  primaryAction,
  secondaryAction,
  emoji = '🍳',
}: CTABannerProps) {
  return (
    <section className="section-padding" aria-labelledby="cta-banner-title">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-peach dark:bg-coral/20 rounded-[32px] p-8 md:p-16 text-center"
        >
          {/* Emoji */}
          <span className="text-5xl mb-4 block" aria-hidden="true">
            {emoji}
          </span>

          {/* Title */}
          <h2 
            id="cta-banner-title" 
            className="font-display text-3xl md:text-4xl text-charcoal dark:text-cream mb-4"
          >
            {title}
          </h2>

          {/* Description */}
          <p className="text-charcoal-light dark:text-cream/80 text-lg max-w-lg mx-auto mb-8">
            {description}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={primaryAction.href} className="btn-primary">
              {primaryAction.label}
            </Link>
            {secondaryAction && (
              <Link href={secondaryAction.href} className="btn-secondary">
                {secondaryAction.label}
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
