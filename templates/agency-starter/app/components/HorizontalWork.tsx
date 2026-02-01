'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import type { CaseStudy } from '@/app/types'

// ═══════════════════════════════════════════════════════════════
// HORIZONTAL WORK SECTION
// Horizontal scroll gallery with GSAP ScrollTrigger pinning
// ═══════════════════════════════════════════════════════════════

interface HorizontalWorkProps {
  projects: CaseStudy[]
}

export default function HorizontalWork({ projects }: HorizontalWorkProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const scrollAnimationRef = useRef<gsap.core.Tween | null>(null)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  
  // Hide scroll indicator once user starts scrolling
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return
      
      const rect = section.getBoundingClientRect()
      // Hide once section starts getting scrolled (pinned and moving)
      if (rect.top <= 0) {
        setShowScrollIndicator(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const ctx = gsap.context(() => {
      const track = trackRef.current
      if (!track) return
      
      // Calculate scroll distance
      const scrollWidth = track.scrollWidth - window.innerWidth + 100
      
      // Horizontal scroll animation - store reference for containerAnimation
      scrollAnimationRef.current = gsap.to(track, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })
      
      // Image reveal on each card - use stored animation reference
      if (scrollAnimationRef.current) {
        gsap.utils.toArray<HTMLElement>('.project-image').forEach((img) => {
          gsap.from(img, {
            scale: 1.3,
            opacity: 0.5,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: img,
              start: 'left 80%',
              end: 'left 20%',
              scrub: 1,
              containerAnimation: scrollAnimationRef.current!,
            },
          })
        })
      }
    }, sectionRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={sectionRef} id="work" className="relative bg-dark-950 overflow-hidden">
      {/* Section header - fixed during scroll */}
      <div className="absolute top-8 left-6 z-10">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
          Selected Work
        </h2>
        <p className="text-dark-400 text-lg max-w-md">
          Scroll to explore our projects →
        </p>
      </div>
      
      {/* Scroll indicator - positioned above cards, hides on scroll */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div 
            className="absolute top-32 right-8 z-10 flex flex-col items-center gap-2 text-dark-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-sm uppercase tracking-wider">Scroll</span>
            <motion.div 
              className="w-6 h-10 border-2 border-dark-500 rounded-full flex items-start justify-center p-1"
            >
              <motion.div 
                className="w-1.5 h-3 bg-primary-500 rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
            <motion.span 
              className="text-2xl"
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
            >
              →
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Horizontal track */}
      <div ref={trackRef} className="flex items-center gap-8 pt-40 pb-20 pl-6 pr-[50vw]">
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.link}
            className="project-card flex-shrink-0 w-[70vw] md:w-[50vw] lg:w-[40vw] group"
          >
            <div className="relative overflow-hidden aspect-[4/3] mb-6">
              <img 
                src={project.image}
                alt={project.title}
                className="project-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent opacity-60"></div>
            </div>
            <p className="text-primary-400 text-sm uppercase tracking-wider mb-2">
              {project.category}
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-dark-400">{project.description}</p>
          </a>
        ))}
      </div>
    </section>
  )
}
