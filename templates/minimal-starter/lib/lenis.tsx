'use client'

import { ReactNode, useEffect, useRef } from 'react'
import Lenis from 'lenis'

interface SmoothScrollProps {
  children: ReactNode
}

// Extend Window interface for Lenis
declare global {
  interface Window {
    lenis?: Lenis
  }
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    // Respect reduced motion preference
    if (typeof window === 'undefined') return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      rafIdRef.current = requestAnimationFrame(raf)
    }

    rafIdRef.current = requestAnimationFrame(raf)

    // Expose lenis to window for GSAP ScrollTrigger integration
    window.lenis = lenis

    return () => {
      // Properly clean up animation frame
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }
      
      lenis.destroy()
      lenisRef.current = null
      
      // Clean up window reference
      if (window.lenis === lenis) {
        delete window.lenis
      }
    }
  }, [])

  return <>{children}</>
}
