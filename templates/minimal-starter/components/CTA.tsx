'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '@/lib/gsap'

interface CTAProps {
  title?: string
  description?: string
  buttonText?: string
}

export default function CTA({ 
  title = "Start building today.", 
  description = "Join thousands of developers shipping faster with Acme.",
  buttonText = "Get Started Free"
}: CTAProps) {
  const ctaRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        const split = new SplitText(headlineRef.current, { type: 'words' })
        gsap.from(split.words, {
          y: 40,
          opacity: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 75%',
          },
        })
      }

      gsap.from('.cta-subheadline', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 70%',
        },
      })

      gsap.from('.cta-button', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 65%',
        },
      })
    }, ctaRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ctaRef} className="py-16 md:py-32 px-4 md:px-16 text-center bg-white dark:bg-minimal-dark-card border-t border-minimal-border dark:border-minimal-dark-border" aria-labelledby="cta-heading">
      <h2 id="cta-heading" ref={headlineRef} className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight mb-4">
        {title}
      </h2>
      <p className="cta-subheadline text-xl text-minimal-muted dark:text-minimal-dark-muted mb-10">
        {description}
      </p>
      <button className="cta-button btn-primary text-lg" aria-label={buttonText}>
        {buttonText} <span aria-hidden="true">→</span>
      </button>
    </section>
  )
}
