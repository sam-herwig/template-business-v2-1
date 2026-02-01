'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import type { ProcessStep } from '@/app/types'

// ═══════════════════════════════════════════════════════════════
// PROCESS SECTION
// Four-step process with connecting lines and stagger animation
// ═══════════════════════════════════════════════════════════════

interface ProcessProps {
  steps: ProcessStep[]
}

export default function Process({ steps }: ProcessProps) {
  const processRef = useRef<HTMLElement>(null)
  
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const ctx = gsap.context(() => {
      gsap.from('.process-header', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: processRef.current,
          start: 'top 75%',
        },
      })
      
      gsap.from('.process-step', {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.process-grid',
          start: 'top 75%',
        },
      })
    }, processRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={processRef} className="py-24 md:py-32 bg-dark-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="process-header mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Our Process
          </h2>
          <p className="text-dark-400 text-lg max-w-xl">
            A proven methodology that turns complex challenges into elegant solutions.
          </p>
        </div>
        
        <div className="process-grid grid md:grid-cols-4 gap-8">
          {steps.map((phase, i) => (
            <div key={i} className="process-step relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-full w-full h-px bg-dark-700 -z-10"></div>
              )}
              <div className="text-primary-500 font-mono text-sm mb-4">{phase.step}</div>
              <h3 className="font-display text-2xl font-bold mb-3">{phase.title}</h3>
              <p className="text-dark-400">{phase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
