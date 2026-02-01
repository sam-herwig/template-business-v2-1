'use client'

import { motion } from 'framer-motion'

interface SectionHeaderProps {
  tag?: string
  title: string
  titleGradient?: string
  description?: string
  center?: boolean
}

export function SectionHeader({ tag, title, titleGradient, description, center = true }: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${center ? 'text-center' : ''}`}>
      {tag && (
        <motion.span 
          className="section-tag"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {tag}
        </motion.span>
      )}
      <motion.h2 
        className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight tracking-tight"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        {title}
        {titleGradient && (
          <>
            <br />
            <span className="gradient-text">{titleGradient}</span>
          </>
        )}
      </motion.h2>
      {description && (
        <motion.p 
          className="text-lg text-white/80 max-w-2xl mx-auto mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
