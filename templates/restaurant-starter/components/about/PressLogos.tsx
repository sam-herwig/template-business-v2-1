'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import type { PressItem } from '@/types'

interface PressLogosProps {
  items: PressItem[]
  showQuotes?: boolean
}

export function PressLogos({ items, showQuotes = true }: PressLogosProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.from('.press-item', {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    })
  }, [])

  return (
    <div ref={sectionRef}>
      <div className="text-center mb-10">
        <span className="section-eyebrow">In the Press</span>
        <h2 className="font-display text-3xl md:text-4xl text-dark-900 dark:text-white">
          What They're Saying
        </h2>
      </div>

      {/* Logo Grid */}
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-12">
        {items.map((item, index) => (
          <a
            key={index}
            href={item.link || '#'}
            target={item.link ? '_blank' : undefined}
            rel={item.link ? 'noopener noreferrer' : undefined}
            className="press-item relative h-12 w-32 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            aria-label={`Featured in ${item.source}`}
          >
            <Image
              src={item.logo}
              alt={item.source}
              fill
              className="object-contain"
            />
          </a>
        ))}
      </div>

      {/* Quotes */}
      {showQuotes && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items
            .filter((item) => item.quote)
            .map((item, index) => (
              <div
                key={index}
                className="press-item p-6 rounded-xl bg-[rgb(var(--muted))] border border-[rgb(var(--border))]"
              >
                <blockquote className="text-[rgb(var(--foreground))] italic mb-4 leading-relaxed">
                  "{item.quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="relative h-8 w-20">
                    <Image
                      src={item.logo}
                      alt={item.source}
                      fill
                      className="object-contain object-left opacity-60"
                    />
                  </div>
                  {item.date && (
                    <span className="text-sm text-[rgb(var(--muted-foreground))]">
                      {item.date}
                    </span>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
