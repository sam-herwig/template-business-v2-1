'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '@/lib/gsap'
import { Award } from 'lucide-react'
import type { TeamMember } from '@/types'

interface ChefBioProps {
  chef: TeamMember & {
    quote?: string
    credentials?: string[]
  }
}

export function ChefBio({ chef }: ChefBioProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLQuoteElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.chef-content', {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })

      gsap.from('.chef-image', {
        scale: 1.1,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })

      if (quoteRef.current && chef.quote) {
        const quoteSplit = new SplitText(quoteRef.current, { type: 'words' })
        gsap.from(quoteSplit.words, {
          y: 20,
          opacity: 0,
          stagger: 0.03,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 85%',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [chef.quote])

  return (
    <div ref={sectionRef} className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
      <div className="chef-content order-2 md:order-1">
        <span className="section-eyebrow">Meet Our Chef</span>
        <h2 className="font-display text-3xl md:text-4xl text-dark-900 dark:text-white mb-2">
          {chef.name}
        </h2>
        <p className="text-primary-600 dark:text-primary-400 font-medium mb-6">
          {chef.role}
        </p>

        <div className="text-[rgb(var(--muted-foreground))] text-lg leading-relaxed mb-6">
          {chef.bio}
        </div>

        {chef.quote && (
          <blockquote
            ref={quoteRef}
            className="relative pl-6 border-l-4 border-primary-500 italic text-xl text-dark-900 dark:text-white leading-relaxed mb-8"
          >
            <span className="absolute -left-3 -top-4 text-6xl text-primary-400/20 font-display">"</span>
            {chef.quote}
          </blockquote>
        )}

        {chef.credentials && chef.credentials.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {chef.credentials.map((credential, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-50 dark:bg-primary-950/50 text-primary-700 dark:text-primary-300 text-sm rounded-full"
              >
                <Award className="w-4 h-4" />
                {credential}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="order-1 md:order-2">
        <div className="chef-image relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-dark-950/10">
          <Image
            src={chef.photo}
            alt={`${chef.name}, ${chef.role}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}
