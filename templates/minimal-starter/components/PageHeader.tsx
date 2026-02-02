'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '@/lib/gsap'

interface PageHeaderProps {
  tag?: string
  title: string
  description?: string
  centered?: boolean
  children?: React.ReactNode
}

export default function PageHeader({ tag, title, description, centered = true, children }: PageHeaderProps) {
  const headerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const split = new SplitText(titleRef.current, { type: 'words' })
        gsap.fromTo(split.words, 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03, duration: 0.8, ease: 'power3.out' }
        )
      }

      gsap.fromTo('.page-header-tag', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      )

      gsap.fromTo('.page-header-desc', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out' }
      )

      gsap.fromTo('.page-header-children', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.4, ease: 'power3.out' }
      )
    }, headerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={headerRef} className={`pt-32 pb-16 md:pb-24 px-4 md:px-16 ${centered ? 'text-center' : ''}`}>
      {tag && <span className="page-header-tag feature-tag mb-6">{tag}</span>}
      <h1 ref={titleRef} className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight mb-6">
        {title}
      </h1>
      {description && (
        <p className={`page-header-desc text-xl text-minimal-muted dark:text-minimal-dark-muted ${centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
          {description}
        </p>
      )}
      {children && <div className="page-header-children mt-8">{children}</div>}
    </section>
  )
}
