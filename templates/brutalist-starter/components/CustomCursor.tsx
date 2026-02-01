'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'

export function CustomCursor(): JSX.Element {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const isInitialized = useRef(false)

  // Memoize event handlers
  const moveCursor = useCallback((e: MouseEvent) => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    gsap.to(cursorDot, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.05,
    })
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.15,
      ease: 'power2.out',
    })
  }, [])

  const handleMouseEnterLink = useCallback(() => {
    const cursor = cursorRef.current
    if (!cursor) return
    
    gsap.to(cursor, {
      scale: 1.5,
      rotation: 45,
      duration: 0.3,
      ease: 'power2.out',
    })
  }, [])

  const handleMouseLeaveLink = useCallback(() => {
    const cursor = cursorRef.current
    if (!cursor) return
    
    gsap.to(cursor, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: 'power2.out',
    })
  }, [])

  useEffect(() => {
    // Prevent double initialization
    if (isInitialized.current) return
    
    // Skip on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return
    
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    isInitialized.current = true

    // Show cursor
    document.body.style.cursor = 'none'
    cursor.style.opacity = '1'
    cursorDot.style.opacity = '1'

    window.addEventListener('mousemove', moveCursor, { passive: true })

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"], [tabindex]:not([tabindex="-1"])'
    )
    
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnterLink)
      el.addEventListener('mouseleave', handleMouseLeaveLink)
    })

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.body.style.cursor = ''
      
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterLink)
        el.removeEventListener('mouseleave', handleMouseLeaveLink)
      })
      
      // Kill any pending GSAP animations
      if (cursor) gsap.killTweensOf(cursor)
      if (cursorDot) gsap.killTweensOf(cursorDot)
      
      isInitialized.current = false
    }
  }, [moveCursor, handleMouseEnterLink, handleMouseLeaveLink])

  return (
    <>
      {/* Square cursor for brutalist - Yellow border, rotates on hover */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-6 w-6 border-2 border-brutal-yellow bg-transparent opacity-0 will-change-transform"
        style={{ transform: 'translate(-50%, -50%)' }}
        aria-hidden="true"
      />
      {/* Square dot */}
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 bg-brutal-yellow opacity-0 will-change-transform"
        style={{ transform: 'translate(-50%, -50%)' }}
        aria-hidden="true"
      />
    </>
  )
}
