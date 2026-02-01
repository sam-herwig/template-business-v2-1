'use client'

import { useEffect, useRef, useMemo } from 'react'
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap'

/**
 * Check for reduced motion preference
 * Must be called inside useEffect or browser environment
 */
function getPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// ═══════════════════════════════════════════════════════════════
// SPLIT TEXT ANIMATION
// ═══════════════════════════════════════════════════════════════

export interface SplitTextOptions {
  type?: 'chars' | 'words' | 'chars, words'
  stagger?: number
  duration?: number
  delay?: number
  y?: number
  rotateX?: number
}

const DEFAULT_SPLIT_TEXT_OPTIONS: Required<SplitTextOptions> = {
  type: 'chars, words',
  stagger: 0.02,
  duration: 1,
  delay: 0,
  y: 100,
  rotateX: -90,
}

/**
 * SplitText animation for headlines
 * Animates characters/words from below with rotation
 */
export function useSplitTextAnimation(
  selector: string,
  options: SplitTextOptions = {}
) {
  const splitRef = useRef<SplitText | null>(null)
  
  // Memoize merged options to prevent unnecessary re-runs
  const mergedOptions = useMemo(() => ({
    ...DEFAULT_SPLIT_TEXT_OPTIONS,
    ...options,
  }), [options.type, options.stagger, options.duration, options.delay, options.y, options.rotateX])
  
  useEffect(() => {
    if (getPrefersReducedMotion()) return
    
    const element = document.querySelector(selector)
    if (!element) return
    
    splitRef.current = new SplitText(selector, { type: mergedOptions.type })
    const targets = mergedOptions.type.includes('chars') 
      ? splitRef.current.chars 
      : splitRef.current.words
    
    gsap.from(targets, {
      y: mergedOptions.y,
      opacity: 0,
      rotateX: mergedOptions.rotateX,
      stagger: mergedOptions.stagger,
      duration: mergedOptions.duration,
      delay: mergedOptions.delay,
      ease: 'back.out(1.7)',
    })
    
    return () => {
      splitRef.current?.revert()
    }
  }, [selector, mergedOptions])
  
  return splitRef
}

// ═══════════════════════════════════════════════════════════════
// REVEAL ANIMATION
// ═══════════════════════════════════════════════════════════════

export interface RevealOptions {
  y?: number
  duration?: number
  stagger?: number
  start?: string
}

const DEFAULT_REVEAL_OPTIONS: Required<RevealOptions> = {
  y: 60,
  duration: 1,
  stagger: 0,
  start: 'top 80%',
}

/**
 * Scroll-triggered reveal animation
 * Elements fade up as they enter viewport
 */
export function useRevealAnimation(
  selector: string,
  options: RevealOptions = {}
) {
  const mergedOptions = useMemo(() => ({
    ...DEFAULT_REVEAL_OPTIONS,
    ...options,
  }), [options.y, options.duration, options.stagger, options.start])

  useEffect(() => {
    if (getPrefersReducedMotion()) return
    
    const elements = gsap.utils.toArray(selector) as Element[]
    if (elements.length === 0) return
    
    const ctx = gsap.context(() => {
      gsap.from(elements, {
        y: mergedOptions.y,
        opacity: 0,
        duration: mergedOptions.duration,
        stagger: mergedOptions.stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elements[0],
          start: mergedOptions.start,
          toggleActions: 'play none none reverse',
        },
      })
    })
    
    return () => ctx.revert()
  }, [selector, mergedOptions])
}

// ═══════════════════════════════════════════════════════════════
// PARALLAX EFFECT
// ═══════════════════════════════════════════════════════════════

export interface ParallaxOptions {
  yPercent?: number
  trigger?: string
  start?: string
  end?: string
}

const DEFAULT_PARALLAX_OPTIONS: Required<ParallaxOptions> = {
  yPercent: -30,
  trigger: '',
  start: 'top top',
  end: 'bottom top',
}

/**
 * Parallax effect for background elements
 */
export function useParallax(
  selector: string,
  options: ParallaxOptions = {}
) {
  const mergedOptions = useMemo(() => ({
    ...DEFAULT_PARALLAX_OPTIONS,
    trigger: options.trigger || selector,
    ...options,
  }), [selector, options.yPercent, options.trigger, options.start, options.end])

  useEffect(() => {
    if (getPrefersReducedMotion()) return
    
    const element = document.querySelector(selector)
    if (!element) return
    
    const ctx = gsap.context(() => {
      gsap.to(selector, {
        yPercent: mergedOptions.yPercent,
        ease: 'none',
        scrollTrigger: {
          trigger: mergedOptions.trigger,
          start: mergedOptions.start,
          end: mergedOptions.end,
          scrub: true,
        },
      })
    })
    
    return () => ctx.revert()
  }, [selector, mergedOptions])
}

// ═══════════════════════════════════════════════════════════════
// MAGNETIC BUTTON
// ═══════════════════════════════════════════════════════════════

/**
 * Magnetic button effect
 * Button follows cursor within bounds
 */
export function useMagnetic<T extends HTMLElement>(strength: number = 0.3) {
  const ref = useRef<T>(null)
  
  useEffect(() => {
    if (getPrefersReducedMotion()) return
    
    const element = ref.current
    if (!element) return
    
    const handleMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      gsap.to(element, { x: x * strength, y: y * strength, duration: 0.3 })
    }
    
    const handleLeave = () => {
      gsap.to(element, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
    }
    
    element.addEventListener('mousemove', handleMove)
    element.addEventListener('mouseleave', handleLeave)
    
    return () => {
      element.removeEventListener('mousemove', handleMove)
      element.removeEventListener('mouseleave', handleLeave)
    }
  }, [strength])
  
  return ref
}

// ═══════════════════════════════════════════════════════════════
// COUNTER ANIMATION
// ═══════════════════════════════════════════════════════════════

export interface CounterOptions {
  duration?: number
  start?: string
}

const DEFAULT_COUNTER_OPTIONS: Required<CounterOptions> = {
  duration: 2,
  start: 'top 80%',
}

/**
 * Counter animation for stats
 * Animates number from 0 to target on scroll
 */
export function useCounter(
  selector: string,
  options: CounterOptions = {}
) {
  const mergedOptions = useMemo(() => ({
    ...DEFAULT_COUNTER_OPTIONS,
    ...options,
  }), [options.duration, options.start])

  useEffect(() => {
    if (getPrefersReducedMotion()) return
    
    const elements = gsap.utils.toArray(selector) as HTMLElement[]
    if (elements.length === 0) return
    
    const ctx = gsap.context(() => {
      elements.forEach((el) => {
        const text = el.textContent || '0'
        const target = parseInt(text.replace(/[^0-9]/g, ''), 10)
        if (isNaN(target)) return
        
        gsap.from(el, {
          textContent: 0,
          duration: mergedOptions.duration,
          snap: { textContent: 1 },
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: mergedOptions.start,
          },
        })
      })
    })
    
    return () => ctx.revert()
  }, [selector, mergedOptions])
}

// ═══════════════════════════════════════════════════════════════
// STAGGERED CARDS
// ═══════════════════════════════════════════════════════════════

export interface StaggeredCardsOptions {
  y?: number
  stagger?: number
  duration?: number
  start?: string
}

const DEFAULT_STAGGERED_OPTIONS: Required<StaggeredCardsOptions> = {
  y: 80,
  stagger: 0.15,
  duration: 0.8,
  start: 'top 75%',
}

/**
 * Staggered card animation
 * Cards animate in sequence on scroll
 */
export function useStaggeredCards(
  containerSelector: string,
  cardSelector: string,
  options: StaggeredCardsOptions = {}
) {
  const mergedOptions = useMemo(() => ({
    ...DEFAULT_STAGGERED_OPTIONS,
    ...options,
  }), [options.y, options.stagger, options.duration, options.start])

  useEffect(() => {
    if (getPrefersReducedMotion()) return
    
    const container = document.querySelector(containerSelector)
    const cards = gsap.utils.toArray(cardSelector) as Element[]
    if (!container || cards.length === 0) return
    
    const ctx = gsap.context(() => {
      gsap.from(cards, {
        y: mergedOptions.y,
        opacity: 0,
        stagger: mergedOptions.stagger,
        duration: mergedOptions.duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: mergedOptions.start,
        },
      })
    })
    
    return () => ctx.revert()
  }, [containerSelector, cardSelector, mergedOptions])
}

// ═══════════════════════════════════════════════════════════════
// HORIZONTAL SCROLL
// ═══════════════════════════════════════════════════════════════

/**
 * Horizontal scroll section
 * Pins section and scrolls content horizontally
 */
export function useHorizontalScroll(
  containerSelector: string,
  contentSelector: string
) {
  useEffect(() => {
    if (getPrefersReducedMotion()) return
    
    const container = document.querySelector(containerSelector)
    const content = document.querySelector(contentSelector)
    if (!container || !content) return
    
    const ctx = gsap.context(() => {
      const scrollWidth = content.scrollWidth - window.innerWidth
      
      gsap.to(content, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })
    })
    
    return () => ctx.revert()
  }, [containerSelector, contentSelector])
}

// ═══════════════════════════════════════════════════════════════
// IMAGE REVEAL
// ═══════════════════════════════════════════════════════════════

export interface ImageRevealOptions {
  type?: 'clipPath' | 'scale'
  duration?: number
  start?: string
}

const DEFAULT_IMAGE_REVEAL_OPTIONS: Required<ImageRevealOptions> = {
  type: 'clipPath',
  duration: 1.2,
  start: 'top 75%',
}

/**
 * Image reveal animation
 * Reveals image with clip-path or scale
 */
export function useImageReveal(
  selector: string,
  options: ImageRevealOptions = {}
) {
  const mergedOptions = useMemo(() => ({
    ...DEFAULT_IMAGE_REVEAL_OPTIONS,
    ...options,
  }), [options.type, options.duration, options.start])

  useEffect(() => {
    if (getPrefersReducedMotion()) return
    
    const images = gsap.utils.toArray(selector) as Element[]
    if (images.length === 0) return
    
    const ctx = gsap.context(() => {
      images.forEach((img) => {
        if (mergedOptions.type === 'clipPath') {
          gsap.from(img, {
            clipPath: 'inset(100% 0 0 0)',
            duration: mergedOptions.duration,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: img,
              start: mergedOptions.start,
            },
          })
        } else {
          gsap.from(img, {
            scale: 1.3,
            opacity: 0,
            duration: mergedOptions.duration,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: img,
              start: mergedOptions.start,
            },
          })
        }
      })
    })
    
    return () => ctx.revert()
  }, [selector, mergedOptions])
}

// ═══════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════

/**
 * Batch refresh ScrollTrigger
 * Call after dynamic content loads
 */
export function refreshScrollTrigger(): void {
  ScrollTrigger.refresh()
}
