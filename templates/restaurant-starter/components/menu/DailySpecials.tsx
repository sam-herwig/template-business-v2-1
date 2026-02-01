'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { Sparkles } from 'lucide-react'
import type { DailySpecial } from '@/types'

interface DailySpecialsProps {
  specials: DailySpecial[]
}

export function DailySpecials({ specials }: DailySpecialsProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.from('.special-card', {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    })
  }, [])

  if (!specials.length) return null

  return (
    <div ref={sectionRef} className="mb-16">
      <div className="flex items-center justify-center gap-3 mb-8">
        <Sparkles className="w-5 h-5 text-primary-500" />
        <h2 className="font-display text-2xl text-dark-900 dark:text-white">Today's Specials</h2>
        <Sparkles className="w-5 h-5 text-primary-500" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {specials.map((special, index) => (
          <div
            key={index}
            className="special-card relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-950/50 dark:to-primary-900/30 border-2 border-primary-200 dark:border-primary-800"
          >
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-full">
                <Sparkles className="w-4 h-4" />
                Chef's Special
              </span>
            </div>

            <div className="flex flex-col md:flex-row">
              {special.image && (
                <div className="relative w-full md:w-1/3 aspect-[4/3] md:aspect-auto">
                  <Image
                    src={special.image}
                    alt={special.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              )}
              
              <div className="flex-1 p-6 pt-12 md:pt-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-display text-xl text-dark-900 dark:text-white">
                    {special.name}
                  </h3>
                  <span className="font-display text-xl text-primary-600 dark:text-primary-400 shrink-0">
                    ${special.price}
                  </span>
                </div>
                
                <p className="text-[rgb(var(--muted-foreground))] mb-4">
                  {special.description}
                </p>

                {special.chefNote && (
                  <blockquote className="italic text-sm text-primary-700 dark:text-primary-300 border-l-2 border-primary-400 pl-3">
                    "{special.chefNote}"
                  </blockquote>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
