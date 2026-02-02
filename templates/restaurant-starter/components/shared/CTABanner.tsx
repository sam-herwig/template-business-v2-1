'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { ArrowRight } from 'lucide-react'

interface CTABannerProps {
  title: string
  description?: string
  primaryAction: { label: string; href: string }
  secondaryAction?: { label: string; href: string }
  variant?: 'primary' | 'dark' | 'image'
  backgroundImage?: string
}

export function CTABanner({
  title,
  description,
  primaryAction,
  secondaryAction,
  variant = 'primary',
  backgroundImage,
}: CTABannerProps) {
  const ctaRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.cta-banner-content', 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ctaRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
      }
    )
  }, [])

  const bgClasses = {
    primary: 'cta-section',
    dark: 'bg-dark-900',
    image: 'relative',
  }

  return (
    <section
      ref={ctaRef}
      className={`${bgClasses[variant]} section-padding-sm overflow-hidden`}
    >
      {/* Background image for image variant */}
      {variant === 'image' && backgroundImage && (
        <>
          <div className="absolute inset-0">
            <Image
              src={backgroundImage}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              quality={85}
            />
          </div>
          <div className="absolute inset-0 bg-dark-950/70" />
        </>
      )}

      <div className="cta-banner-content relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4">
          {title}
        </h2>
        
        {description && (
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            {description}
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryAction.href}
            className="bg-white text-primary-600 hover:bg-gray-50 px-8 py-4 rounded-sm font-medium text-lg transition-all duration-300 hover:shadow-xl group inline-flex items-center"
          >
            {primaryAction.label}
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
          
          {secondaryAction && (
            <Link
              href={secondaryAction.href}
              className="text-white hover:text-white/90 px-8 py-4 font-medium text-lg transition-colors border-2 border-white/30 hover:border-white/60 rounded-sm"
            >
              {secondaryAction.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
