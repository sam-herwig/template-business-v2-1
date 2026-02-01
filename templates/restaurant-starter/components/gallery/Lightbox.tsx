'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { GalleryImage } from '@/types'

interface LightboxProps {
  images: GalleryImage[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
}

export function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrevious,
  onNext,
}: LightboxProps) {
  const currentImage = images[currentIndex]

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return
      
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          onPrevious()
          break
        case 'ArrowRight':
          onNext()
          break
      }
    },
    [isOpen, onClose, onPrevious, onNext]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    
    // Prevent body scroll when lightbox is open
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown])

  return (
    <AnimatePresence>
      {isOpen && currentImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-dark-950/95 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 z-10 text-white/70 text-sm">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Previous button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onPrevious()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          {/* Next button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onNext()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          {/* Image container */}
          <div
            className="flex items-center justify-center w-full h-full p-8 md:p-16"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              key={currentIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-full max-h-full"
            >
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                width={currentImage.width || 1200}
                height={currentImage.height || 800}
                className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-lg"
                priority
              />
              
              {/* Caption */}
              {currentImage.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark-950/80 to-transparent rounded-b-lg">
                  <p className="text-white text-center">{currentImage.caption}</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Thumbnail strip (optional for many images) */}
          {images.length > 1 && images.length <= 10 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-dark-950/50 rounded-full">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    // You'd need to add setCurrentIndex prop or handle this differently
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-white w-4'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
