'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap'
import MagneticButton from './MagneticButton'
import type { HeroContent } from '@/app/types'

// ═══════════════════════════════════════════════════════════════
// HERO COMPONENT
// Premium animated hero with SplitText, parallax, and marquee
// ═══════════════════════════════════════════════════════════════

interface HeroProps {
  content: HeroContent
}

export default function Hero({ content }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  const headlineRefs = useRef<(HTMLSpanElement | null)[]>([])
  const marqueeRef = useRef<HTMLDivElement>(null)
  
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    // Refresh ScrollTrigger on mount for SPA navigation
    ScrollTrigger.refresh()
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      
      // SplitText animation for each headline line - use fromTo to fix SPA navigation
      headlineRefs.current.forEach((ref, i) => {
        if (!ref) return
        const split = new SplitText(ref, { type: 'chars, words' })
        tl.fromTo(split.chars, 
          { y: 120, opacity: 0, rotateX: -90 },
          { y: 0, opacity: 1, rotateX: 0, stagger: 0.02, duration: 1.2 },
          i * 0.2
        )
      })
      
      // Subheadline
      tl.fromTo('.hero-subheadline', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      )
      
      // CTAs with stagger
      tl.fromTo('.hero-cta', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 },
        '-=0.4'
      )
      
      // Clients marquee
      tl.fromTo('.clients-section', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.3'
      )
      
      // Infinite marquee animation
      if (marqueeRef.current) {
        const marqueeContent = marqueeRef.current.querySelector('.marquee-content')
        if (marqueeContent) {
          gsap.to(marqueeContent, {
            xPercent: -50,
            ease: 'none',
            duration: 20,
            repeat: -1,
          })
        }
      }
      
      // Background parallax
      gsap.to('.hero-bg-glow', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, heroRef)
    
    return () => {
      ctx.revert()
      ScrollTrigger.refresh()
    }
  }, [])
  
  return (
    <section ref={heroRef} className="min-h-screen flex items-center pt-20 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950"></div>
      <div className="hero-bg-glow absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary-500/10 rounded-full blur-[150px]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="max-w-5xl">
          {/* Headline */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-8">
            {content.headline.map((line, i) => (
              <span 
                key={i} 
                ref={el => { headlineRefs.current[i] = el }}
                className="block overflow-hidden"
              >
                {i === 1 ? (
                  <span className="text-gradient inline-block">{line}</span>
                ) : (
                  <span className="inline-block">{line}</span>
                )}
              </span>
            ))}
          </h1>
          
          {/* Subheadline */}
          <p className="hero-subheadline text-xl md:text-2xl text-dark-300 max-w-2xl mb-12">
            {content.subheadline}
          </p>
          
          {/* CTA */}
          <div className="flex flex-wrap gap-4 mb-20">
            <Link href="/work">
              <MagneticButton className="hero-cta btn-primary text-sm uppercase tracking-wider">
                {content.cta} ↓
              </MagneticButton>
            </Link>
            <Link href="/contact">
              <MagneticButton className="hero-cta btn-outline text-sm uppercase tracking-wider">
                Get in Touch
              </MagneticButton>
            </Link>
          </div>
          
          {/* Clients marquee */}
          <div className="clients-section">
            <p className="text-dark-500 text-sm uppercase tracking-wider mb-6">Trusted by</p>
            <div ref={marqueeRef} className="overflow-hidden">
              <div className="marquee-content flex items-center gap-12 text-dark-400 whitespace-nowrap">
                {[...content.clients, ...content.clients].map((client, i) => (
                  <span key={i} className="text-2xl font-display font-bold opacity-50 hover:opacity-100 transition-opacity">
                    {client}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
