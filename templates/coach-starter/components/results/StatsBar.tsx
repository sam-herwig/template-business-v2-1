'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

interface Stat {
  value: string | number
  prefix?: string
  suffix?: string
  label: string
}

interface StatsBarProps {
  stats: Stat[]
}

export function StatsBar({ stats }: StatsBarProps) {
  const statsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Counter animation
      gsap.utils.toArray<HTMLElement>('.stat-number').forEach((el) => {
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
            el.textContent = value % 1 === 0 ? Math.floor(obj.value).toString() : obj.value.toFixed(1)
          },
        })
      })

      gsap.fromTo('.stat-item', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      )
    }, statsRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={statsRef} className="py-16 bg-primary-500 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`
      }} />
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item text-center">
              <div className="font-display text-4xl md:text-5xl text-white mb-2">
                {stat.prefix || ''}
                <span className="stat-number" data-value={typeof stat.value === 'number' ? stat.value : parseFloat(stat.value)}>
                  0
                </span>
                {stat.suffix || ''}
              </div>
              <div className="text-white/80 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StatsBar
