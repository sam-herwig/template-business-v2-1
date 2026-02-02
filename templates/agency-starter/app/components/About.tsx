'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import type { Stat, TeamMember } from '@/app/types'

// ═══════════════════════════════════════════════════════════════
// ABOUT SECTION
// Stats with counter animation and team grid with image reveals
// ═══════════════════════════════════════════════════════════════

interface AboutProps {
  stats: Stat[]
  team: TeamMember[]
}

export default function About({ stats, team }: AboutProps) {
  const aboutRef = useRef<HTMLElement>(null)
  
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const ctx = gsap.context(() => {
      // Counter animation for stats
      gsap.utils.toArray<HTMLElement>('.stat-value').forEach((el) => {
        const value = parseFloat(el.dataset.value || '0')
        const obj = { value: 0 }
        
        gsap.to(obj, {
          value,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
          onUpdate: () => {
            el.textContent = Math.floor(obj.value).toString()
          },
        })
      })
      
      // Stats stagger
      gsap.fromTo('.stat-item', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.stats-grid', start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      )
      
      // Team header
      gsap.fromTo('.team-header', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.team-header', start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      )
      
      // Team members with image reveal
      gsap.utils.toArray<HTMLElement>('.team-member').forEach((member) => {
        gsap.fromTo(member, 
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: member, start: 'top 85%', toggleActions: 'play none none reverse' }
          }
        )
        
        // Image clip reveal
        const img = member.querySelector('.team-image')
        if (img) {
          gsap.fromTo(img, 
            { clipPath: 'inset(100% 0 0 0)' },
            { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power4.out',
              scrollTrigger: { trigger: member, start: 'top 85%', toggleActions: 'play none none reverse' }
            }
          )
        }
      })
    }, aboutRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={aboutRef} id="about" className="py-24 md:py-32 bg-dark-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Stats */}
        <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item text-center">
              <div className="font-display text-5xl md:text-6xl font-bold text-white mb-2">
                <span className="stat-value" data-value={stat.value}>0</span>
                <span>{stat.suffix}</span>
              </div>
              <div className="text-dark-400 uppercase tracking-wider text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        
        {/* Team */}
        <div className="team-header mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            The Team
          </h2>
          <p className="text-dark-400 text-lg max-w-xl">
            A tight-knit crew of strategists, designers, and developers who genuinely love what we do.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <div key={i} className="team-member group">
              <div className="relative overflow-hidden mb-4 aspect-[3/4]">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="team-image w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/20 transition-colors duration-300"></div>
              </div>
              <h3 className="font-display text-lg font-bold">{member.name}</h3>
              <p className="text-dark-400 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
