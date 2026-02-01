'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Skip on touch devices
    if ('ontouchstart' in window) return
    
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    // Show cursor
    document.body.style.cursor = 'none'
    cursor.style.opacity = '1'
    cursorDot.style.opacity = '1'

    const moveCursor = (e: MouseEvent) => {
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

    const handleMouseEnterLink = () => {
      gsap.to(cursor, {
        scale: 1.5,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseLeaveLink = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    window.addEventListener('mousemove', moveCursor)

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, [data-cursor="pointer"]')
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnterLink)
      el.addEventListener('mouseleave', handleMouseLeaveLink)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.body.style.cursor = ''
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterLink)
        el.removeEventListener('mouseleave', handleMouseLeaveLink)
      })
    }
  }, [])

  return (
    <>
      {/* Main cursor ring - White with mix-blend-difference */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-5 -mt-5 h-10 w-10 rounded-full border border-white/50 opacity-0 mix-blend-difference transition-transform"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-1 -mt-1 h-2 w-2 rounded-full bg-white opacity-0 mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  )
}
