'use client'

import React, { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap'

// Check for reduced motion preference
const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Type definitions for hook options
interface SplitTextOptions {
  type?: 'chars' | 'words' | 'chars, words'
  stagger?: number
  duration?: number
  delay?: number
  y?: number
  rotateX?: number
}

interface RevealOptions {
  y?: number
  duration?: number
  stagger?: number
  start?: string
}

interface ParallaxOptions {
  yPercent?: number
  trigger?: string
  start?: string
  end?: string
}

interface CounterOptions {
  duration?: number
  start?: string
}

interface StaggeredCardsOptions {
  y?: number
  stagger?: number
  duration?: number
  start?: string
}

interface ImageRevealOptions {
  type?: 'clipPath' | 'scale'
  duration?: number
  start?: string
}

/**
 * SplitText animation for headlines
 * Animates characters/words from below with rotation
 */
export function useSplitTextAnimation(
  selector: string,
  options: SplitTextOptions = {}
): React.MutableRefObject<SplitText | null> {
  const splitRef = useRef<SplitText | null>(null)
  
  useEffect(() => {
    if (prefersReducedMotion()) return
    
    const {
      type = 'chars, words',
      stagger = 0.02,
      duration = 1,
      delay = 0,
      y = 100,
      rotateX = -90,
    } = options
    
    const element = document.querySelector(selector)
    if (!element) return
    
    splitRef.current = new SplitText(selector, { type })
    const targets = type.includes('chars') ? splitRef.current.chars : splitRef.current.words
    
    gsap.from(targets, {
      y,
      opacity: 0,
      rotateX,
      stagger,
      duration,
      delay,
      ease: 'back.out(1.7)',
    })
    
    return () => {
      splitRef.current?.revert()
    }
  }, [selector, options])
  
  return splitRef
}

/**
 * Scroll-triggered reveal animation
 * Elements fade up as they enter viewport
 */
export function useRevealAnimation(
  selector: string,
  options: RevealOptions = {}
): void {
  useEffect(() => {
    if (prefersReducedMotion()) return
    
    const {
      y = 60,
      duration = 1,
      stagger = 0,
      start = 'top 80%',
    } = options
    
    const elements = gsap.utils.toArray(selector) as Element[]
    if (elements.length === 0) return
    
    const ctx = gsap.context(() => {
      gsap.from(elements, {
        y,
        opacity: 0,
        duration,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elements[0],
          start,
          toggleActions: 'play none none reverse',
        },
      })
    })
    
    return () => ctx.revert()
  }, [selector, options])
}

/**
 * Parallax effect for background elements
 */
export function useParallax(
  selector: string,
  options: ParallaxOptions = {}
): void {
  useEffect(() => {
    if (prefersReducedMotion()) return
    
    const {
      yPercent = -30,
      trigger,
      start = 'top top',
      end = 'bottom top',
    } = options
    
    const element = document.querySelector(selector)
    if (!element) return
    
    const ctx = gsap.context(() => {
      gsap.to(selector, {
        yPercent,
        ease: 'none',
        scrollTrigger: {
          trigger: trigger || selector,
          start,
          end,
          scrub: true,
        },
      })
    })
    
    return () => ctx.revert()
  }, [selector, options])
}

/**
 * Magnetic button effect
 * Button follows cursor within bounds
 */
export function useMagnetic<T extends HTMLElement>(strength: number = 0.3): React.RefObject<T | null> {
  const ref = useRef<T>(null)
  
  useEffect(() => {
    if (prefersReducedMotion()) return
    
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

/**
 * Counter animation for stats
 * Animates number from 0 to target on scroll
 */
export function useCounter(
  selector: string,
  options: CounterOptions = {}
): void {
  useEffect(() => {
    if (prefersReducedMotion()) return
    
    const { duration = 2, start = 'top 80%' } = options
    
    const elements = gsap.utils.toArray(selector) as HTMLElement[]
    if (elements.length === 0) return
    
    const ctx = gsap.context(() => {
      elements.forEach((el) => {
        const text = el.textContent || '0'
        const target = parseInt(text.replace(/[^0-9]/g, ''), 10)
        if (isNaN(target)) return
        
        gsap.from(el, {
          textContent: 0,
          duration,
          snap: { textContent: 1 },
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start,
          },
        })
      })
    })
    
    return () => ctx.revert()
  }, [selector, options])
}

/**
 * Staggered card animation
 * Cards animate in sequence on scroll
 */
export function useStaggeredCards(
  containerSelector: string,
  cardSelector: string,
  options: StaggeredCardsOptions = {}
): void {
  useEffect(() => {
    if (prefersReducedMotion()) return
    
    const {
      y = 80,
      stagger = 0.15,
      duration = 0.8,
      start = 'top 75%',
    } = options
    
    const container = document.querySelector(containerSelector)
    const cards = gsap.utils.toArray(cardSelector) as Element[]
    if (!container || cards.length === 0) return
    
    const ctx = gsap.context(() => {
      gsap.from(cards, {
        y,
        opacity: 0,
        stagger,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start,
        },
      })
    })
    
    return () => ctx.revert()
  }, [containerSelector, cardSelector, options])
}

/**
 * Horizontal scroll section
 * Pins section and scrolls content horizontally
 */
export function useHorizontalScroll(
  containerSelector: string,
  contentSelector: string
): void {
  useEffect(() => {
    if (prefersReducedMotion()) return
    
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

/**
 * Image reveal animation
 * Reveals image with clip-path or scale
 */
export function useImageReveal(
  selector: string,
  options: ImageRevealOptions = {}
): void {
  useEffect(() => {
    if (prefersReducedMotion()) return
    
    const {
      type = 'clipPath',
      duration = 1.2,
      start = 'top 75%',
    } = options
    
    const images = gsap.utils.toArray(selector) as Element[]
    if (images.length === 0) return
    
    const ctx = gsap.context(() => {
      images.forEach((img) => {
        if (type === 'clipPath') {
          gsap.from(img, {
            clipPath: 'inset(100% 0 0 0)',
            duration,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: img,
              start,
            },
          })
        } else {
          gsap.from(img, {
            scale: 1.3,
            opacity: 0,
            duration,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: img,
              start,
            },
          })
        }
      })
    })
    
    return () => ctx.revert()
  }, [selector, options])
}

/**
 * Batch refresh ScrollTrigger
 * Call after dynamic content loads
 */
export function refreshScrollTrigger(): void {
  ScrollTrigger.refresh()
}
