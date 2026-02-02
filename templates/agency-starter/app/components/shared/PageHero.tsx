'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '@/lib/gsap'

interface PageHeroProps {
  title: string
  subtitle?: string
  alignment?: 'left' | 'center'
}

export default function PageHero({ title, subtitle, alignment = 'left' }: PageHeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const split = new SplitText(titleRef.current, { type: 'words' })
        gsap.fromTo(split.words, 
          { y: 80, opacity: 0, rotateX: -45 },
          { y: 0, opacity: 1, rotateX: 0, stagger: 0.04, duration: 1, ease: 'power3.out', delay: 0.2 }
        )
      }

      if (subtitle) {
        gsap.fromTo('.page-hero-subtitle', 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.5 }
        )
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className={`pt-32 pb-16 md:pt-40 md:pb-24 bg-dark-950 relative overflow-hidden ${
        alignment === 'center' ? 'text-center' : ''
      }`}
    >
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary-500/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h1
          ref={titleRef}
          className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white"
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={`page-hero-subtitle text-xl text-dark-400 mt-6 ${
              alignment === 'center' ? 'max-w-2xl mx-auto' : 'max-w-xl'
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
