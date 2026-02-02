'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import type { GalleryImage } from '@/types'

interface GalleryGridProps {
  images: GalleryImage[]
  onImageClick: (index: number) => void
}

export function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.gallery-grid-item').forEach((item) => {
        gsap.fromTo(item, 
          { scale: 0.95, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none reverse' }
          }
        )
      })
    }, gridRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={gridRef}
      className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
    >
      {images.map((image, index) => (
        <button
          key={image.id || index}
          onClick={() => onImageClick(index)}
          className="gallery-grid-item block w-full relative overflow-hidden rounded-lg group break-inside-avoid mb-4"
          aria-label={`View ${image.alt}`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width || 600}
            height={image.height || 450}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-dark-950/0 group-hover:bg-dark-950/40 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                <svg className="w-6 h-6 text-dark-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Caption */}
          {image.caption && (
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-dark-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-sm">{image.caption}</p>
            </div>
          )}
        </button>
      ))}
    </div>
  )
}
