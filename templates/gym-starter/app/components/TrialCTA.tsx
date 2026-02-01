'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRightIcon } from './icons'
import { fadeInUp, fadeInUpReduced, useVariant } from './animations'

// ═══════════════════════════════════════════════════════════════
// Trial CTA Section Component
// ═══════════════════════════════════════════════════════════════

export function TrialCTA() {
  const prefersReducedMotion = useReducedMotion()
  const variants = useVariant(fadeInUp, fadeInUpReduced, prefersReducedMotion)

  return (
    <section id="join" className="cta-section section-padding">
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={variants}
        >
          <h2 className="font-display text-5xl md:text-7xl tracking-wider mb-6">
            START YOUR
            <br />
            FREE WEEK
          </h2>
          <p className="text-white/80 text-xl mb-10 max-w-xl mx-auto">
            No commitment. No credit card. Just show up and see what you&apos;re made of.
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center px-12 py-5 bg-white text-dark-950 font-bold uppercase tracking-widest text-lg hover:bg-gray-100 transition-colors group"
          >
            Claim Free Trial
            <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
