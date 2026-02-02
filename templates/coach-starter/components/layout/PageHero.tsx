'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '@/lib/gsap'
import Link from 'next/link'

interface PageHeroProps {
  eyebrow?: string
  headline: string
  subheadline?: string
  cta?: {
    label: string
    href: string
    variant?: 'primary' | 'secondary'
  }
  secondaryCta?: {
    label: string
    href: string
  }
  alignment?: 'left' | 'center'
  background?: 'cream' | 'white' | 'gradient'
  checkmarks?: string[]
}

export function PageHero({
  eyebrow,
  headline,
  subheadline,
  cta,
  secondaryCta,
  alignment = 'center',
  background = 'cream',
  checkmarks,
}: PageHeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        const split = new SplitText(headlineRef.current, { type: 'words' })
        gsap.fromTo(split.words, 
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.06, duration: 1, ease: 'power3.out', delay: 0.1 }
        )
      }

      if (eyebrow) {
        gsap.fromTo('.hero-eyebrow', 
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
        )
      }

      gsap.fromTo('.hero-subheadline', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.4 }
      )

      gsap.fromTo('.hero-cta', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out', delay: 0.6 }
      )

      gsap.fromTo('.hero-check', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power3.out', delay: 0.7 }
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const bgClass = {
    cream: 'bg-cream-200',
    white: 'bg-white',
    gradient: 'bg-gradient-to-b from-cream-200 to-white',
  }[background]

  return (
    <section ref={heroRef} className={`pt-32 pb-16 md:pt-40 md:pb-20 ${bgClass}`}>
      <div className={`max-w-4xl mx-auto px-6 ${alignment === 'center' ? 'text-center' : ''}`}>
        {eyebrow && (
          <p className="hero-eyebrow section-eyebrow mb-4">{eyebrow}</p>
        )}
        
        <h1
          ref={headlineRef}
          className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-900 leading-tight mb-6"
        >
          {headline}
        </h1>

        {subheadline && (
          <p className="hero-subheadline text-lg md:text-xl text-primary-800/70 max-w-2xl mx-auto leading-relaxed mb-8">
            {subheadline}
          </p>
        )}

        {checkmarks && checkmarks.length > 0 && (
          <div className={`flex flex-wrap gap-4 mb-8 ${alignment === 'center' ? 'justify-center' : ''}`}>
            {checkmarks.map((item, i) => (
              <div key={i} className="hero-check flex items-center gap-2 text-primary-800/80">
                <svg className="w-5 h-5 text-sage-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        )}

        {(cta || secondaryCta) && (
          <div className={`flex flex-col sm:flex-row gap-4 ${alignment === 'center' ? 'justify-center' : ''}`}>
            {cta && (
              <Link
                href={cta.href}
                className={`hero-cta ${cta.variant === 'secondary' ? 'btn-secondary' : 'btn-primary'}`}
              >
                {cta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="hero-cta text-primary-700 hover:text-primary-800 px-8 py-4 font-medium text-lg transition-colors"
              >
                {secondaryCta.label} →
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default PageHero
