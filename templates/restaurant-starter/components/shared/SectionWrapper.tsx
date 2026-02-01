'use client'

import { useRef, ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

interface SectionWrapperProps {
  id?: string
  eyebrow?: string
  title?: string
  description?: string
  background?: 'default' | 'muted' | 'dark'
  children: ReactNode
  className?: string
  animate?: boolean
}

const bgClasses = {
  default: 'bg-[rgb(var(--background))]',
  muted: 'bg-[rgb(var(--muted))]',
  dark: 'bg-dark-900 text-white',
}

export function SectionWrapper({
  id,
  eyebrow,
  title,
  description,
  background = 'default',
  children,
  className = '',
  animate = true,
}: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!animate) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.section-header', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [animate])

  const isDark = background === 'dark'

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`section-padding ${bgClasses[background]} ${className}`}
      aria-labelledby={id ? `${id}-title` : undefined}
    >
      <div className="max-w-6xl mx-auto px-6">
        {(eyebrow || title || description) && (
          <div className="section-header text-center mb-16">
            {eyebrow && (
              <span className={`${isDark ? 'text-primary-400' : 'section-eyebrow'} block mb-3`}>
                {eyebrow}
              </span>
            )}
            {title && (
              <h2
                id={id ? `${id}-title` : undefined}
                className={`font-display text-4xl md:text-5xl ${isDark ? 'text-white' : 'text-dark-900 dark:text-white'} mb-4`}
              >
                {title}
              </h2>
            )}
            {(eyebrow || title) && (
              <div className={`w-16 h-1 ${isDark ? 'bg-primary-400' : 'bg-primary-500'} rounded-full mx-auto mb-6`} aria-hidden="true" />
            )}
            {description && (
              <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-[rgb(var(--muted-foreground))]'}`}>
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
