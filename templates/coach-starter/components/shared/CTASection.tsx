'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import Link from 'next/link'

interface CTASectionProps {
  headline: string
  description?: string
  ctaLabel: string
  ctaHref: string
  note?: string
  variant?: 'dark' | 'sage' | 'cream'
}

export function CTASection({
  headline,
  description,
  ctaLabel,
  ctaHref,
  note,
  variant = 'dark',
}: CTASectionProps) {
  const ctaRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-content', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 75%', toggleActions: 'play none none reverse' }
        }
      )
    }, ctaRef)

    return () => ctx.revert()
  }, [])

  const bgClass = {
    dark: 'bg-primary-900',
    sage: 'bg-sage-400',
    cream: 'bg-cream-200',
  }[variant]

  const textClass = {
    dark: 'text-white',
    sage: 'text-white',
    cream: 'text-primary-900',
  }[variant]

  const subTextClass = {
    dark: 'text-white/70',
    sage: 'text-white/80',
    cream: 'text-primary-800/70',
  }[variant]

  const buttonClass = {
    dark: 'bg-white hover:bg-cream-100 text-primary-700',
    sage: 'bg-white hover:bg-cream-100 text-sage-700',
    cream: 'bg-primary-500 hover:bg-primary-600 text-white',
  }[variant]

  return (
    <section ref={ctaRef} className={`py-20 md:py-28 ${bgClass}`}>
      <div className="max-w-4xl mx-auto px-6 text-center cta-content">
        <h2 className={`font-display text-3xl md:text-4xl ${textClass} mb-6`}>{headline}</h2>
        {description && (
          <p className={`${subTextClass} text-lg max-w-2xl mx-auto mb-10`}>{description}</p>
        )}
        <Link
          href={ctaHref}
          className={`inline-block ${buttonClass} px-10 py-5 rounded-full font-medium text-lg transition-all hover:shadow-lg hover:-translate-y-0.5`}
        >
          {ctaLabel}
        </Link>
        {note && <p className={`${subTextClass} opacity-70 text-sm mt-6`}>{note}</p>}
      </div>
    </section>
  )
}

export default CTASection
