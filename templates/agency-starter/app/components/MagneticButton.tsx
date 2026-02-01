'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'

// ═══════════════════════════════════════════════════════════════
// MAGNETIC BUTTON COMPONENT
// Optimized with gsap.quickTo() for smooth mousemove performance
// ═══════════════════════════════════════════════════════════════

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

export default function MagneticButton({ children, className = '', ...props }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const btn = buttonRef.current
    if (!btn) return
    
    // Use gsap.quickTo() for optimized mousemove - creates cached setters
    const xTo = gsap.quickTo(btn, 'x', { duration: 0.15, ease: 'power2.out' })
    const yTo = gsap.quickTo(btn, 'y', { duration: 0.15, ease: 'power2.out' })
    
    const handleMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      xTo(x * 0.3)
      yTo(y * 0.3)
    }
    
    const handleLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
    }
    
    btn.addEventListener('mousemove', handleMove)
    btn.addEventListener('mouseleave', handleLeave)
    
    return () => {
      btn.removeEventListener('mousemove', handleMove)
      btn.removeEventListener('mouseleave', handleLeave)
    }
  }, [])
  
  return (
    <button ref={buttonRef} className={className} {...props}>
      {children}
    </button>
  )
}
