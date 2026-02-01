'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap'
import Image from 'next/image'
import { GYM, STATS } from './data'
import { ArrowRightIcon } from './icons'
import { fadeInUp, fadeInUpReduced, staggerContainer, staggerContainerReduced, useVariant } from './animations'

// ═══════════════════════════════════════════════════════════════
// Hero Section Component
// ═══════════════════════════════════════════════════════════════

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const { scrollY } = useScroll()
  const prefersReducedMotion = useReducedMotion()

  // Parallax only if motion is allowed
  const y = useTransform(scrollY, [0, 500], prefersReducedMotion ? [0, 0] : [0, 200])
  const opacity = useTransform(scrollY, [0, 400], prefersReducedMotion ? [1, 1] : [1, 0])

  useGSAP(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const ctx = gsap.context(() => {
      // Bold SplitText animation for headline
      if (headlineRef.current) {
        const split = new SplitText(headlineRef.current, { type: 'chars, words' })
        gsap.from(split.chars, {
          y: 100,
          opacity: 0,
          rotateX: -90,
          stagger: 0.02,
          duration: 1,
          ease: 'back.out(1.7)',
        })
      }

      // Stats counter animation
      gsap.utils.toArray<HTMLElement>('.stat-number-gsap').forEach((el) => {
        const text = el.textContent || '0'
        const numMatch = text.match(/\d+/)
        if (numMatch) {
          const target = parseInt(numMatch[0], 10)
          const suffix = text.replace(/\d+/, '')
          const obj = { value: 0 }

          gsap.to(obj, {
            value: target,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
            },
            onUpdate: () => {
              el.textContent = Math.floor(obj.value) + suffix
            },
          })
        }
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const itemVariants = useVariant(fadeInUp, fadeInUpReduced, prefersReducedMotion)
  const containerVariants = useVariant(staggerContainer, staggerContainerReduced, prefersReducedMotion)

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with parallax */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src={GYM.heroImage}
          alt="Gym"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950/90 via-dark-950/70 to-dark-950/50" />
      </motion.div>

      <motion.div className="relative z-10 max-w-6xl mx-auto px-6 py-32" style={{ opacity }}>
        <motion.div
          className="max-w-3xl"
          initial="initial"
          animate="animate"
          variants={containerVariants}
        >
          {/* Headline with GSAP SplitText */}
          <h1
            ref={headlineRef}
            className="font-display text-6xl md:text-8xl lg:text-9xl text-white leading-[0.9] mb-8 tracking-wider"
          >
            <span className="block">TRANSFORM</span>
            <span className="block">
              YOUR <span className="text-primary-500">BODY</span>.
            </span>
          </h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 mb-10 max-w-xl leading-relaxed"
          >
            {GYM.description}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <a href={GYM.bookingUrl} className="btn-primary text-lg group">
              Start Your Free Week
              <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#classes" className="btn-outline text-lg">
              View Schedule
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 stats-bar">
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <div key={i} className="stat-item">
                <div className="stat-number stat-number-gsap">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
