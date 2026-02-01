'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '@/lib/gsap'
import { Breadcrumb } from './Breadcrumb'

interface PageHeroProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  height?: 'short' | 'medium' | 'tall'
  overlay?: boolean
  breadcrumbs?: { label: string; href: string }[]
}

const heightClasses = {
  short: 'min-h-[40vh]',
  medium: 'min-h-[50vh]',
  tall: 'min-h-[70vh]',
}

export function PageHero({
  title,
  subtitle,
  backgroundImage,
  height = 'short',
  overlay = true,
  breadcrumbs,
}: PageHeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Parallax background
      if (backgroundImage) {
        gsap.to('.page-hero-image', {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // Title animation
      if (titleRef.current) {
        const titleSplit = new SplitText(titleRef.current, { type: 'words' })
        gsap.from(titleSplit.words, {
          y: 50,
          opacity: 0,
          stagger: 0.06,
          duration: 1,
          ease: 'power3.out',
          delay: 0.2,
        })
      }

      // Subtitle animation
      if (subtitle) {
        gsap.from('.page-hero-subtitle', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.5,
        })
      }

      // Breadcrumb animation
      gsap.from('.page-hero-breadcrumb', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.1,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [backgroundImage, subtitle])

  return (
    <section
      ref={heroRef}
      className={`relative ${heightClasses[height]} flex items-center justify-center overflow-hidden`}
      aria-labelledby="page-title"
    >
      {/* Background */}
      {backgroundImage ? (
        <>
          <div className="absolute inset-0">
            <Image
              src={backgroundImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="page-hero-image object-cover"
              quality={85}
            />
          </div>
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-b from-dark-950/50 via-dark-950/60 to-dark-950/80" />
          )}
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-primary-600 to-primary-700" />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white pt-24 pb-16">
        {breadcrumbs && (
          <div className="page-hero-breadcrumb mb-6">
            <Breadcrumb items={breadcrumbs} light />
          </div>
        )}
        
        <h1
          id="page-title"
          ref={titleRef}
          className="font-display text-4xl md:text-5xl lg:text-6xl mb-4"
        >
          {title}
        </h1>
        
        {subtitle && (
          <p className="page-hero-subtitle text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
