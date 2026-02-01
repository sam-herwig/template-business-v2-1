'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import Image from 'next/image'
import { CLASSES } from './data'
import { ArrowRightIcon } from './icons'
import { fadeInUp, fadeInUpReduced, fadeIn, fadeInReduced, staggerContainer, staggerContainerReduced, useVariant } from './animations'
import type { FitnessClass, IntensityLevel } from './types'

// ═══════════════════════════════════════════════════════════════
// Classes Section Component
// ═══════════════════════════════════════════════════════════════

interface ClassCardProps {
  cls: FitnessClass
  variants: Variants
}

function ClassCard({ cls, variants }: ClassCardProps) {
  const intensityClass = `intensity-${cls.intensity.toLowerCase() as IntensityLevel}`

  return (
    <motion.div variants={variants} className="class-card">
      <div className="class-card-image">
        <Image
          src={cls.image}
          alt={cls.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className={`class-card-spots ${cls.spots <= 5 ? 'low' : ''}`}>
          {cls.spots <= 5 ? `Only ${cls.spots} left!` : `${cls.spots} spots`}
        </span>
      </div>
      <div className="class-card-content">
        <div className="class-card-header">
          <h3 className="class-card-title">{cls.name}</h3>
          <span className={`intensity-badge ${intensityClass}`}>{cls.intensity}</span>
        </div>
        <div className="class-card-meta">
          {cls.time} · {cls.duration} · {cls.instructor}
        </div>
        <button className="class-card-book">Book Class</button>
      </div>
    </motion.div>
  )
}

export function Classes() {
  const prefersReducedMotion = useReducedMotion()
  const itemVariants = useVariant(fadeInUp, fadeInUpReduced, prefersReducedMotion)
  const fadeVariants = useVariant(fadeIn, fadeInReduced, prefersReducedMotion)
  const containerVariants = useVariant(staggerContainer, staggerContainerReduced, prefersReducedMotion)

  return (
    <section id="classes" className="section-padding bg-dark-900">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <span className="section-eyebrow">Schedule</span>
          <h2 className="section-title">TODAY&apos;S CLASSES</h2>
          <p className="section-description mx-auto">Book your spot — classes fill up fast</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {CLASSES.map((cls, i) => (
            <ClassCard key={i} cls={cls} variants={itemVariants} />
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeVariants}
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-bold uppercase tracking-widest text-sm transition-colors group"
          >
            View Full Schedule
            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
