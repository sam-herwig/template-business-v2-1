'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { MEMBERSHIP } from './data'
import { fadeInUp, fadeInUpReduced, staggerContainer, staggerContainerReduced, useVariant } from './animations'
import type { MembershipPlan } from './types'

// ═══════════════════════════════════════════════════════════════
// Membership Section Component
// ═══════════════════════════════════════════════════════════════

interface PricingCardProps {
  plan: MembershipPlan
  variants: Variants
}

function PricingCard({ plan, variants }: PricingCardProps) {
  return (
    <motion.div variants={variants} className={`pricing-card ${plan.featured ? 'featured' : ''}`}>
      {plan.featured && <div className="pricing-badge">Most Popular</div>}
      <h3 className="pricing-name">{plan.name}</h3>
      <div className="pricing-amount">
        <span className="pricing-price">${plan.price}</span>
        <span className="pricing-period">{plan.period}</span>
      </div>
      {plan.note && <p className="pricing-note">{plan.note}</p>}
      <ul className="pricing-features">
        {plan.features.map((f, j) => (
          <li key={j} className="pricing-feature">
            <span className="pricing-feature-check" aria-hidden="true">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <button className={plan.featured ? 'pricing-cta-primary' : 'pricing-cta-secondary'}>
        Get Started
      </button>
    </motion.div>
  )
}

export function Membership() {
  const prefersReducedMotion = useReducedMotion()
  const itemVariants = useVariant(fadeInUp, fadeInUpReduced, prefersReducedMotion)
  const containerVariants = useVariant(staggerContainer, staggerContainerReduced, prefersReducedMotion)

  return (
    <section id="membership" className="section-padding bg-dark-950">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <span className="section-eyebrow">Plans</span>
          <h2 className="section-title">MEMBERSHIP</h2>
          <p className="section-description mx-auto">
            Choose your path to fitness — all plans include a 7-day free trial
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {MEMBERSHIP.map((plan, i) => (
            <PricingCard key={i} plan={plan} variants={itemVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
