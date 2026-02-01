'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { DishCard } from './DishCard'
import type { MenuItem } from '@/types'

interface MenuSectionProps {
  id: string
  title: string
  description?: string
  items: MenuItem[]
  layout?: 'cards' | 'list'
}

export function MenuSection({ id, title, description, items, layout = 'list' }: MenuSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.menu-section-header', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      gsap.from('.menu-section-item', {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id={`menu-${id}`} className="py-12 first:pt-0">
      <div className="menu-section-header mb-8">
        <h2 className="font-display text-3xl text-dark-900 dark:text-white mb-2">{title}</h2>
        {description && (
          <p className="text-[rgb(var(--muted-foreground))]">{description}</p>
        )}
        <div className="w-12 h-0.5 bg-primary-500/50 rounded-full mt-4" />
      </div>

      {layout === 'cards' ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="menu-section-item">
              <DishCard item={item} showImage size="md" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="menu-section-item">
              <DishCard item={item} showImage={false} size="sm" />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
