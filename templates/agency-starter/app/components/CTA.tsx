'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '@/lib/gsap'
import MagneticButton from './MagneticButton'

// ═══════════════════════════════════════════════════════════════
// CTA SECTION
// Big headline with SplitText animation and parallax glow
// ═══════════════════════════════════════════════════════════════

export default function CTA() {
  const ctaRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const ctx = gsap.context(() => {
      // SplitText on CTA headline
      if (headlineRef.current) {
        const split = new SplitText(headlineRef.current, { type: 'words' })
        gsap.fromTo(split.words, 
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 70%', toggleActions: 'play none none reverse' }
          }
        )
      }
      
      gsap.fromTo('.cta-content', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.cta-content', start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      )
      
      // Background glow parallax
      gsap.to('.cta-glow', {
        scale: 1.2,
        ease: 'none',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, ctaRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={ctaRef} id="contact" className="py-24 md:py-32 bg-dark-950 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="cta-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-[200px]"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 ref={headlineRef} className="font-display text-5xl md:text-7xl font-bold mb-6">
          Let's build something great.
        </h2>
        <div className="cta-content">
          <p className="text-dark-300 text-xl mb-10 max-w-2xl mx-auto">
            Have a project in mind? We'd love to hear about it. Drop us a line and let's see what we can create together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <MagneticButton className="btn-primary text-sm uppercase tracking-wider">
                Start a Project →
              </MagneticButton>
            </Link>
            <a href="mailto:hello@studio.com" className="text-dark-300 hover:text-white transition-colors text-sm uppercase tracking-wider">
              hello@studio.com
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
