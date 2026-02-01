'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { Leaf, Sun, Heart, Utensils, Users, Sparkles } from 'lucide-react'
import type { ValueItem } from '@/types'

interface ValuesGridProps {
  values: ValueItem[]
}

const iconMap: Record<string, React.ReactNode> = {
  leaf: <Leaf className="w-8 h-8" />,
  sun: <Sun className="w-8 h-8" />,
  heart: <Heart className="w-8 h-8" />,
  utensils: <Utensils className="w-8 h-8" />,
  users: <Users className="w-8 h-8" />,
  sparkles: <Sparkles className="w-8 h-8" />,
}

export function ValuesGrid({ values }: ValuesGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.from('.value-card', {
      y: 40,
      opacity: 0,
      stagger: 0.12,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 80%',
      },
    })
  }, [])

  return (
    <div ref={gridRef} className="grid md:grid-cols-3 gap-8">
      {values.map((value, index) => (
        <div
          key={index}
          className="value-card text-center p-8 rounded-2xl bg-[rgb(var(--surface))] border border-[rgb(var(--border))] transition-all duration-300 hover:border-primary-200 hover:shadow-lg hover:-translate-y-1"
        >
          <div className="w-16 h-16 rounded-full bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center mx-auto mb-5 text-primary-600 dark:text-primary-400">
            {iconMap[value.icon] || <Sparkles className="w-8 h-8" />}
          </div>
          <h3 className="font-display text-xl text-dark-900 dark:text-white mb-3">
            {value.title}
          </h3>
          <p className="text-[rgb(var(--muted-foreground))]">
            {value.description}
          </p>
        </div>
      ))}
    </div>
  )
}
