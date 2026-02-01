'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap'
import { HERO_CONTENT, PRODUCT } from '../lib/data'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const highlightRef = useRef<HTMLSpanElement>(null)
  
  useGSAP(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const ctx = gsap.context(() => {
      // SplitText animation for headline
      const headlineSplit = new SplitText(headlineRef.current, { type: 'chars, words' })
      const highlightSplit = new SplitText(highlightRef.current, { type: 'chars, words' })
      
      const tl = gsap.timeline({ defaults: { ease: 'back.out(1.7)' } })
      
      // Animate headline chars
      tl.from(headlineSplit.chars, {
        y: 100,
        opacity: 0,
        rotateX: -90,
        stagger: 0.02,
        duration: 1,
      })
      
      // Animate highlight chars with a slight delay
      tl.from(highlightSplit.chars, {
        y: 80,
        opacity: 0,
        rotateX: -90,
        stagger: 0.02,
        duration: 0.8,
      }, '-=0.5')
      
      // Animate badge
      tl.from('.hero-badge', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, 0)
      
      // Animate subheadline
      tl.from('.hero-subheadline', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.4')
      
      // Animate CTAs
      tl.from('.hero-cta', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.4')
      
      // Animate trust badges
      tl.from('.trust-badge', {
        y: 15,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: 'power3.out',
      }, '-=0.3')
      
      // Product screenshot parallax
      gsap.to('.product-screenshot', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, heroRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={heroRef} className="pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden relative">
      <div className="container-default">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="hero-badge badge-primary badge-pulse pl-8 mb-8">
            {HERO_CONTENT.badge}
          </div>
          
          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span ref={headlineRef}>{HERO_CONTENT.headline}</span>
            <br />
            <span ref={highlightRef} className="gradient-text">{HERO_CONTENT.headlineHighlight}</span>
          </h1>
          
          {/* Subheadline */}
          <p className="hero-subheadline text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            {HERO_CONTENT.subheadline}
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="hero-cta btn-primary text-lg px-8 py-4 group">
              {HERO_CONTENT.primaryCta}
              <svg className="w-5 h-5 ml-2 inline-block transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button className="hero-cta btn-secondary text-lg px-8 py-4 group">
              <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {HERO_CONTENT.secondaryCta}
            </button>
          </div>
          
          {/* Trust badges */}
          <div className="mt-14 trust-badges">
            <span className="trust-badge">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Trusted by 10,000+ teams
            </span>
            <span className="text-gray-300">•</span>
            <span className="trust-badge">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              4.9/5 on G2
            </span>
            <span className="text-gray-300">•</span>
            <span className="trust-badge">
              <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              SOC 2 Certified
            </span>
          </div>
        </div>
        
        {/* Product screenshot */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="product-screenshot">
            <div className="product-screenshot-bar">
              <div className="product-screenshot-dot bg-red-400"></div>
              <div className="product-screenshot-dot bg-yellow-400"></div>
              <div className="product-screenshot-dot bg-green-400"></div>
            </div>
            <div className="product-screenshot-content">
              <div className="text-center">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-400 text-lg font-medium">Product Screenshot</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
