'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import type { Service } from '@/app/types'

// ═══════════════════════════════════════════════════════════════
// SERVICES SECTION
// Interactive accordion with GSAP scroll animations
// ═══════════════════════════════════════════════════════════════

interface ServicesProps {
  services: Service[]
}

export default function Services({ services }: ServicesProps) {
  const [activeService, setActiveService] = useState(0)
  const servicesRef = useRef<HTMLElement>(null)
  
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.services-header', 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: servicesRef.current, start: 'top 75%', toggleActions: 'play none none reverse' }
        }
      )
      
      // Service items stagger
      gsap.fromTo('.service-item', 
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.services-list', start: 'top 70%', toggleActions: 'play none none reverse' }
        }
      )
    }, servicesRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={servicesRef} id="services" className="py-24 md:py-32 bg-dark-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="services-header mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            What We Do
          </h2>
          <p className="text-dark-400 text-lg max-w-xl">
            End-to-end creative services to take your brand from concept to launch.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="services-list space-y-0">
            {services.map((service, i) => (
              <div
                key={i}
                onClick={() => setActiveService(i)}
                className={`service-item border-t border-dark-700 py-8 cursor-pointer group transition-all ${
                  activeService === i ? '' : 'opacity-50 hover:opacity-100'
                }`}
              >
                <div className="flex items-start gap-6">
                  <span className="text-primary-500 font-mono text-sm">{service.number}</span>
                  <div>
                    <h3 className={`font-display text-2xl md:text-3xl font-bold mb-2 transition-colors ${
                      activeService === i ? 'text-white' : 'text-dark-300 group-hover:text-white'
                    }`}>
                      {service.name}
                    </h3>
                    {activeService === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="overflow-hidden"
                      >
                        <p className="text-dark-400 mb-4 max-w-lg">{service.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {service.deliverables.map((item, j) => (
                            <span key={j} className="text-sm text-dark-500 bg-dark-800 px-3 py-1">
                              {item}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-md">
              <div className="absolute inset-0 border border-dark-700"></div>
              <div className="absolute inset-8 border border-dark-600"></div>
              <div className="absolute inset-16 border border-dark-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-8xl font-bold text-dark-800">
                  {services[activeService].number}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
