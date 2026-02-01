'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { AMENITIES } from './data'
import { fadeInUp, fadeInUpReduced, staggerContainer, staggerContainerReduced, useVariant } from './animations'
import type { Amenity } from './types'

// ═══════════════════════════════════════════════════════════════
// Amenities Section Component
// ═══════════════════════════════════════════════════════════════

interface AmenityCardProps {
  item: Amenity
  variants: Variants
}

function AmenityCard({ item, variants }: AmenityCardProps) {
  return (
    <motion.div variants={variants} className="amenity-card">
      <div className="amenity-icon text-primary-400">{item.icon}</div>
      <h3 className="amenity-name">{item.name}</h3>
      <p className="amenity-desc">{item.desc}</p>
    </motion.div>
  )
}

export function Amenities() {
  const prefersReducedMotion = useReducedMotion()
  const itemVariants = useVariant(fadeInUp, fadeInUpReduced, prefersReducedMotion)
  const containerVariants = useVariant(staggerContainer, staggerContainerReduced, prefersReducedMotion)

  return (
    <section className="section-padding bg-dark-950">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <span className="section-eyebrow">Facilities</span>
          <h2 className="section-title">AMENITIES</h2>
          <p className="section-description mx-auto">Everything you need under one roof</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {AMENITIES.map((item, i) => (
            <AmenityCard key={i} item={item} variants={itemVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
