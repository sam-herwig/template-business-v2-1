'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'

export function CustomCursor(): JSX.Element | null {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const isInitialized = useRef(false)

  const handleMouseEnterLink = useCallback(() => {
    const cursor = cursorRef.current
    if (!cursor) return
    gsap.to(cursor, {
      scale: 1.8,
      borderWidth: 2,
      duration: 0.3,
      ease: 'power2.out',
    })
    cursor.style.borderImage = 'linear-gradient(135deg, #a855f7, #ec4899, #f97316) 1'
  }, [])

  const handleMouseLeaveLink = useCallback(() => {
    const cursor = cursorRef.current
    if (!cursor) return
    gsap.to(cursor, {
      scale: 1,
      borderWidth: 1,
      duration: 0.3,
      ease: 'power2.out',
    })
    cursor.style.borderImage = ''
  }, [])

  useEffect(() => {
    // Skip on touch devices or if already initialized
    if (typeof window === 'undefined') return
    if ('ontouchstart' in window) return
    if (isInitialized.current) return
    
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

    const moveCursor = (e: MouseEvent): void => {
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      })
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.25,
        ease: 'power3.out',
      })
    }

    // Use event delegation for interactive elements
    const handleMouseOver = (e: MouseEvent): void => {
      const target = e.target as Element
      if (target.matches('a, button, [role="button"], input, textarea, [data-cursor="pointer"]')) {
        handleMouseEnterLink()
      }
    }

    const handleMouseOut = (e: MouseEvent): void => {
      const target = e.target as Element
      if (target.matches('a, button, [role="button"], input, textarea, [data-cursor="pointer"]')) {
        handleMouseLeaveLink()
      }
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.body.style.cursor = ''
      isInitialized.current = false
    }
  }, [handleMouseEnterLink, handleMouseLeaveLink])

  return (
    <>
      {/* Main cursor ring - Gradient style */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-5 -mt-5 h-10 w-10 rounded-full opacity-0 mix-blend-difference"
        style={{ 
          transform: 'translate(-50%, -50%)',
          border: '1px solid',
          borderImage: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899) 1',
          borderImageSlice: 1,
        }}
        aria-hidden="true"
      />
      {/* Cursor dot - Gradient */}
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-1 -mt-1 h-2 w-2 rounded-full opacity-0 mix-blend-difference"
        style={{ 
          transform: 'translate(-50%, -50%)',
          background: 'linear-gradient(135deg, #6366f1, #a855f7)',
        }}
        aria-hidden="true"
      />
    </>
  )
}
