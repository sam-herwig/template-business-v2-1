'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

interface TimelineEvent {
  year: string
  event: string
}

interface StorySectionProps {
  title: string
  content: string[]
  image: { src: string; alt: string }
  imagePosition?: 'left' | 'right'
  timeline?: TimelineEvent[]
}

export function StorySection({
  title,
  content,
  image,
  imagePosition = 'right',
  timeline,
}: StorySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.story-content', {
        x: imagePosition === 'right' ? -40 : 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })

      gsap.from('.story-image', {
        clipPath: imagePosition === 'right' ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)',
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })

      if (timeline) {
        gsap.from('.timeline-item', {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 80%',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [imagePosition, timeline])

  const ContentBlock = () => (
    <div className="story-content">
      <h2 className="font-display text-3xl md:text-4xl text-dark-900 dark:text-white mb-6">
        {title}
      </h2>
      <div className="space-y-4 text-[rgb(var(--muted-foreground))] text-lg leading-relaxed">
        {content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {timeline && (
        <div className="timeline-container mt-10 pt-8 border-t border-[rgb(var(--border))]">
          <h3 className="text-sm font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-4">
            Our Journey
          </h3>
          <div className="space-y-4">
            {timeline.map((item, index) => (
              <div key={index} className="timeline-item flex gap-4">
                <span className="font-display text-lg text-primary-600 dark:text-primary-400 w-16 shrink-0">
                  {item.year}
                </span>
                <span className="text-[rgb(var(--muted-foreground))]">{item.event}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const ImageBlock = () => (
    <div className="story-image relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-dark-950/10">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
    </div>
  )

  return (
    <div ref={sectionRef} className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
      {imagePosition === 'left' ? (
        <>
          <ImageBlock />
          <ContentBlock />
        </>
      ) : (
        <>
          <ContentBlock />
          <ImageBlock />
        </>
      )}
    </div>
  )
}
