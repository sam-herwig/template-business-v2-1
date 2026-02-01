'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorTextRef = useRef<HTMLSpanElement>(null)
  const tweensRef = useRef<gsap.core.Tween[]>([])

  useEffect(() => {
    // Skip on touch devices
    if ('ontouchstart' in window) return
    
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    const cursorText = cursorTextRef.current
    if (!cursor || !cursorDot || !cursorText) return

    // Show cursor
    document.body.style.cursor = 'none'
    cursor.style.opacity = '1'
    cursorDot.style.opacity = '1'

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        overwrite: 'auto',
      })
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.25,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    const handleMouseEnterLink = () => {
      tweensRef.current.push(
        gsap.to(cursor, {
          scale: 2.5,
          duration: 0.3,
          ease: 'power2.out',
        }),
        gsap.to(cursorDot, {
          opacity: 0,
          duration: 0.2,
        }),
        gsap.to(cursorText, {
          opacity: 1,
          duration: 0.3,
          delay: 0.1,
        })
      )
    }

    const handleMouseLeaveLink = () => {
      tweensRef.current.push(
        gsap.to(cursor, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        }),
        gsap.to(cursorDot, {
          opacity: 1,
          duration: 0.2,
        }),
        gsap.to(cursorText, {
          opacity: 0,
          duration: 0.2,
        })
      )
    }

    window.addEventListener('mousemove', moveCursor)

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], [data-cursor="pointer"]')
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
      // Kill all active tweens
      tweensRef.current.forEach(tween => tween.kill())
      tweensRef.current = []
      gsap.killTweensOf([cursor, cursorDot, cursorText])
    }
  }, [])

  return (
    <>
      {/* Main cursor ring with text inside */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex h-10 w-10 items-center justify-center rounded-full border border-white/30 opacity-0 mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <span
          ref={cursorTextRef}
          className="text-[8px] font-bold uppercase tracking-wider text-white opacity-0"
        >
          View
        </span>
      </div>
      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-white opacity-0 mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  )
}
