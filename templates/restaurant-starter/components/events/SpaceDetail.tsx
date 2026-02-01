'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { Users, DollarSign, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import type { EventSpace } from '@/types'

interface SpaceDetailProps {
  space: EventSpace
  imagePosition?: 'left' | 'right'
}

export function SpaceDetail({ space, imagePosition = 'left' }: SpaceDetailProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [currentImage, setCurrentImage] = useState(0)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.space-content', {
        x: imagePosition === 'left' ? 40 : -40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })

      gsap.from('.space-image-container', {
        x: imagePosition === 'left' ? -40 : 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [imagePosition])

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % space.images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + space.images.length) % space.images.length)
  }

  const ImageCarousel = () => (
    <div className="space-image-container relative aspect-[4/3] rounded-2xl overflow-hidden">
      <Image
        src={space.images[currentImage]}
        alt={`${space.name} - Image ${currentImage + 1}`}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-opacity duration-300"
      />
      
      {space.images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors shadow-lg"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 text-dark-900" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors shadow-lg"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 text-dark-900" />
          </button>
          
          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {space.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImage
                    ? 'bg-white w-4'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )

  const Content = () => (
    <div className="space-content">
      <h3 className="font-display text-3xl text-dark-900 dark:text-white mb-4">
        {space.name}
      </h3>
      
      <p className="text-[rgb(var(--muted-foreground))] text-lg mb-6">
        {space.description}
      </p>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-3 p-4 bg-[rgb(var(--muted))] rounded-xl">
          <Users className="w-6 h-6 text-primary-600" />
          <div>
            <div className="text-sm text-[rgb(var(--muted-foreground))]">Capacity</div>
            <div className="font-medium text-dark-900 dark:text-white">
              {space.capacity.min}–{space.capacity.max} guests
            </div>
          </div>
        </div>
        {space.minSpend && (
          <div className="flex items-center gap-3 p-4 bg-[rgb(var(--muted))] rounded-xl">
            <DollarSign className="w-6 h-6 text-primary-600" />
            <div>
              <div className="text-sm text-[rgb(var(--muted-foreground))]">Minimum</div>
              <div className="font-medium text-dark-900 dark:text-white">
                ${space.minSpend.toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Features */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-[rgb(var(--foreground))] uppercase tracking-wider mb-3">
          Included Features
        </h4>
        <ul className="grid grid-cols-2 gap-2">
          {space.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-[rgb(var(--muted-foreground))]">
              <Check className="w-4 h-4 text-primary-500 shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Best For */}
      <div>
        <h4 className="text-sm font-medium text-[rgb(var(--foreground))] uppercase tracking-wider mb-3">
          Perfect For
        </h4>
        <div className="flex flex-wrap gap-2">
          {space.bestFor.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-primary-50 dark:bg-primary-950/50 text-primary-700 dark:text-primary-300 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div ref={sectionRef} id={`space-${space.id}`} className="grid md:grid-cols-2 gap-12 items-center py-12 border-b border-[rgb(var(--border))] last:border-0">
      {imagePosition === 'left' ? (
        <>
          <ImageCarousel />
          <Content />
        </>
      ) : (
        <>
          <Content />
          <ImageCarousel />
        </>
      )}
    </div>
  )
}
