'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

interface Photo {
  src: string
  alt: string
  aspectRatio?: '1:1' | '4:3' | '16:9'
}

interface PhotoGalleryProps {
  photos: Photo[]
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.gallery-item', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: galleryRef.current, start: 'top 75%', toggleActions: 'play none none reverse' }
        }
      )
    }, galleryRef)

    return () => ctx.revert()
  }, [])

  const getAspectClass = (ratio?: string) => {
    switch (ratio) {
      case '4:3':
        return 'aspect-[4/3]'
      case '16:9':
        return 'aspect-video'
      default:
        return 'aspect-square'
    }
  }

  return (
    <>
      {/* Desktop Grid */}
      <div ref={galleryRef} className="hidden md:grid grid-cols-3 gap-4">
        {photos.slice(0, 6).map((photo, i) => (
          <button
            key={i}
            onClick={() => setSelectedPhoto(photo)}
            className={`gallery-item relative overflow-hidden rounded-2xl group ${
              i === 1 ? 'row-span-2' : ''
            }`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={400}
              height={i === 1 ? 600 : 300}
              className={`object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                i === 1 ? 'aspect-[4/5]' : 'aspect-square'
              }`}
            />
            <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/10 transition-colors" />
          </button>
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
        {photos.map((photo, i) => (
          <button
            key={i}
            onClick={() => setSelectedPhoto(photo)}
            className="flex-shrink-0 w-64 aspect-square rounded-2xl overflow-hidden"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={256}
              height={256}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-900/90"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              onClick={() => setSelectedPhoto(null)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                width={800}
                height={600}
                className="rounded-xl object-contain max-h-[80vh]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default PhotoGallery
