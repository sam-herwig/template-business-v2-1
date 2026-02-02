'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

interface ProcessStep {
  number: number
  title: string
  description: string
}

interface ProcessTimelineProps {
  steps: ProcessStep[]
  title?: string
}

export function ProcessTimeline({ steps, title }: ProcessTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.timeline-step', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: timelineRef.current, start: 'top 75%', toggleActions: 'play none none reverse' }
        }
      )

      gsap.fromTo('.timeline-line', 
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: timelineRef.current, start: 'top 75%', toggleActions: 'play none none reverse' }
        }
      )
    }, timelineRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={timelineRef}>
      {title && <h3 className="font-display text-2xl text-primary-900 text-center mb-12">{title}</h3>}
      
      {/* Desktop Timeline */}
      <div className="hidden md:block relative">
        <div className="timeline-line absolute top-12 left-0 right-0 h-0.5 bg-primary-200 origin-left" />
        <div className="grid grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="timeline-step text-center relative">
              <div className="w-24 h-24 mx-auto bg-sage-100 rounded-full flex items-center justify-center mb-4 relative z-10">
                <span className="font-display text-3xl text-sage-600">{step.number}</span>
              </div>
              <h4 className="font-display text-lg text-primary-900 mb-2">{step.title}</h4>
              <p className="text-sm text-primary-800/70 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Timeline */}
      <div className="md:hidden space-y-6">
        {steps.map((step, i) => (
          <div key={step.number} className="timeline-step flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="font-display text-xl text-sage-600">{step.number}</span>
              </div>
              {i < steps.length - 1 && <div className="w-0.5 flex-1 bg-primary-200 mt-2" />}
            </div>
            <div className="pb-6">
              <h4 className="font-display text-lg text-primary-900 mb-1">{step.title}</h4>
              <p className="text-sm text-primary-800/70 leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProcessTimeline
