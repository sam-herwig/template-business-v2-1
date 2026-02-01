'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import Image from 'next/image'
import { TRAINERS } from './data'
import { fadeInUp, fadeInUpReduced, scaleIn, scaleInReduced, staggerContainer, staggerContainerReduced, useVariant } from './animations'
import type { Trainer } from './types'

// ═══════════════════════════════════════════════════════════════
// Trainers Section Component
// ═══════════════════════════════════════════════════════════════

interface TrainerCardProps {
  trainer: Trainer
  variants: Variants
}

function TrainerCard({ trainer, variants }: TrainerCardProps) {
  return (
    <motion.div variants={variants} className="trainer-card group">
      <div className="trainer-card-image">
        <Image
          src={trainer.image}
          alt={trainer.name}
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
        />
        <div className="trainer-card-overlay" />
      </div>
      <h3 className="trainer-card-name">{trainer.name}</h3>
      <p className="trainer-card-specialty">{trainer.specialty}</p>
      <p className="trainer-card-cert">{trainer.cert}</p>
    </motion.div>
  )
}

export function Trainers() {
  const prefersReducedMotion = useReducedMotion()
  const headerVariants = useVariant(fadeInUp, fadeInUpReduced, prefersReducedMotion)
  const cardVariants = useVariant(scaleIn, scaleInReduced, prefersReducedMotion)
  const containerVariants = useVariant(staggerContainer, staggerContainerReduced, prefersReducedMotion)

  return (
    <section id="trainers" className="section-padding bg-dark-900">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          <span className="section-eyebrow">Team</span>
          <h2 className="section-title">OUR TRAINERS</h2>
          <p className="section-description mx-auto">
            Expert coaches dedicated to helping you reach your goals
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {TRAINERS.map((trainer, i) => (
            <TrainerCard key={i} trainer={trainer} variants={cardVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
