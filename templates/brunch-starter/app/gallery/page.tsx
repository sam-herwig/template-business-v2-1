'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Instagram, ChevronLeft, ChevronRight } from 'lucide-react'
import { Nav, Footer } from '../_components'
import { PageHero, CTABanner } from '@/components/shared'

// ═══════════════════════════════════════════════════════════════
// GALLERY DATA
// ═══════════════════════════════════════════════════════════════

const GALLERY_CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'food', name: 'Food' },
  { id: 'drinks', name: 'Drinks' },
  { id: 'space', name: 'Our Space' },
  { id: 'people', name: 'People' },
]

interface GalleryImage {
  id: number
  src: string
  alt: string
  category: string
  caption?: string
}

const GALLERY_IMAGES: GalleryImage[] = [
  // Food
  { id: 1, src: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&h=600&fit=crop', alt: 'Denver Scramble with farm eggs and green chili', category: 'food', caption: 'Our famous Denver Scramble' },
  { id: 2, src: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop', alt: 'Stack of fluffy buttermilk pancakes', category: 'food', caption: 'Buttermilk Stack - a guest favorite' },
  { id: 3, src: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&h=600&fit=crop', alt: 'Avocado toast with poached eggs', category: 'food', caption: 'Avocado Toast done right' },
  { id: 4, src: 'https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?w=800&h=600&fit=crop', alt: 'Huevos rancheros with ranchero sauce', category: 'food', caption: 'Huevos Rancheros - bring the heat!' },
  { id: 5, src: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=800&h=600&fit=crop', alt: 'Fresh cinnamon roll with frosting', category: 'food', caption: 'House-made cinnamon rolls' },
  { id: 6, src: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&h=600&fit=crop', alt: 'French toast with fresh berries', category: 'food', caption: 'Brioche French Toast' },
  
  // Drinks
  { id: 7, src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop', alt: 'Latte art in ceramic cup', category: 'drinks', caption: 'Crafted with care' },
  { id: 8, src: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop', alt: 'Mimosa with fresh orange juice', category: 'drinks', caption: 'Bottomless mimosas on weekends' },
  { id: 9, src: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&h=600&fit=crop', alt: 'Cold brew coffee', category: 'drinks', caption: '18-hour cold brew' },
  { id: 10, src: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=800&h=600&fit=crop', alt: 'Fresh squeezed orange juice', category: 'drinks', caption: 'Squeezed to order' },
  
  // Space
  { id: 11, src: 'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=800&h=600&fit=crop', alt: 'Sunny restaurant interior', category: 'space', caption: 'Natural light fills the space' },
  { id: 12, src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop', alt: 'Restaurant dining area', category: 'space', caption: 'Our cozy dining room' },
  { id: 13, src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=600&fit=crop', alt: 'Table setting with fresh flowers', category: 'space', caption: 'Fresh flowers on every table' },
  { id: 14, src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop', alt: 'Coffee bar area', category: 'space', caption: 'Our coffee bar' },
  
  // People
  { id: 15, src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop', alt: 'Chef plating a dish', category: 'people', caption: 'Chef Maria in action' },
  { id: 16, src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop', alt: 'Happy guests at brunch', category: 'people', caption: 'Weekend brunch vibes' },
  { id: 17, src: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&h=600&fit=crop', alt: 'Barista making coffee', category: 'people', caption: 'Our barista team' },
  { id: 18, src: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&h=600&fit=crop', alt: 'Friends sharing a meal', category: 'people', caption: 'Brunch is better with friends' },
]

const INSTAGRAM = {
  handle: '@SunnySideDenver',
  url: 'https://instagram.com/sunnysidedenver',
}

// ═══════════════════════════════════════════════════════════════
// GALLERY PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null)

  const filteredImages = activeCategory === 'all' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === activeCategory)

  const currentIndex = lightboxImage 
    ? filteredImages.findIndex(img => img.id === lightboxImage.id) 
    : -1

  const goToNext = () => {
    if (currentIndex < filteredImages.length - 1) {
      setLightboxImage(filteredImages[currentIndex + 1])
    }
  }

  const goToPrev = () => {
    if (currentIndex > 0) {
      setLightboxImage(filteredImages[currentIndex - 1])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') goToNext()
    if (e.key === 'ArrowLeft') goToPrev()
    if (e.key === 'Escape') setLightboxImage(null)
  }

  return (
    <>
      <Nav />
      <main id="main-content">
        <PageHero
          title="Gallery"
          subtitle="A peek behind the scenes and onto your plate"
          backgroundImage="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1920&h=1080&fit=crop"
          height="short"
          breadcrumbs={[{ label: 'Gallery', href: '/gallery' }]}
        />

        <section className="section-padding bg-cream dark:bg-dark-bg">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {GALLERY_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 ${
                    activeCategory === cat.id
                      ? 'bg-coral text-white shadow-md'
                      : 'bg-white dark:bg-dark-card text-charcoal-light dark:text-cream/80 hover:bg-coral/10 dark:hover:bg-coral/20'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <motion.div 
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredImages.map((image, index) => (
                  <motion.button
                    key={image.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => setLightboxImage(image)}
                    className="group relative aspect-square overflow-hidden rounded-xl focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
                    aria-label={`View ${image.alt}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors duration-300 flex items-end p-4">
                      <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                        {image.caption || image.alt}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Instagram CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16 text-center"
            >
              <p className="text-charcoal-light dark:text-cream/70 mb-4">
                Follow us for more deliciousness
              </p>
              <a
                href={INSTAGRAM.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline group"
              >
                <Instagram className="w-5 h-5" />
                {INSTAGRAM.handle}
              </a>
            </motion.div>
          </div>
        </section>

        <CTABanner
          title="Hungry Yet?"
          description="Stop scrolling and start eating! Join us for brunch."
          primaryAction={{ label: 'View Menu', href: '/menu' }}
          secondaryAction={{ label: 'Make a Reservation', href: '/contact#reserve' }}
          emoji="📸"
        />
      </main>
      <Footer />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal/95 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-white rounded-full"
              aria-label="Close lightbox"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation - Previous */}
            {currentIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-white rounded-full"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
            )}

            {/* Navigation - Next */}
            {currentIndex < filteredImages.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-white rounded-full"
                aria-label="Next image"
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            )}

            {/* Image */}
            <motion.div
              key={lightboxImage.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl max-h-[85vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Caption */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-white">
              <p className="text-lg font-medium mb-1">
                {lightboxImage.caption || lightboxImage.alt}
              </p>
              <p className="text-sm text-white/60">
                {currentIndex + 1} / {filteredImages.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
