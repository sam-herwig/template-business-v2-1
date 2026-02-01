'use client'

import { ReactNode, useEffect, useRef } from 'react'
import Lenis from 'lenis'

interface SmoothScrollProps {
  readonly children: ReactNode
}

// Extend window type for lenis
declare global {
  interface Window {
    lenis?: Lenis
  }
}

export function SmoothScroll({ children }: SmoothScrollProps): JSX.Element {
  const lenisRef = useRef<Lenis | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    function raf(time: number): void {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }

    rafRef.current = requestAnimationFrame(raf)

    // Expose lenis to window for GSAP ScrollTrigger integration
    window.lenis = lenis

    // Cleanup function
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      
      lenis.destroy()
      lenisRef.current = null
      
      // Clean up global reference
      if (window.lenis === lenis) {
        delete window.lenis
      }
    }
  }, [])

  return <>{children}</>
}
