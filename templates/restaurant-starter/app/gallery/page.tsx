'use client'

import { useState, useMemo } from 'react'
import { Instagram } from 'lucide-react'
import { SkipLink } from '@/components/SkipLink'
import { PageHero, CTABanner } from '@/components/shared'
import { GalleryGrid, Lightbox, CategoryFilter } from '@/components/gallery'
import { Nav, Footer } from '../_components'
import type { GalleryImage } from '@/types'

// ═══════════════════════════════════════════════════════════════
// GALLERY PAGE DATA
// ═══════════════════════════════════════════════════════════════

const GALLERY_IMAGES: GalleryImage[] = [
  // Food
  { id: '1', src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&q=85', alt: 'Elegantly plated gourmet dish', category: 'food', width: 800, height: 600 },
  { id: '2', src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=1000&fit=crop&q=85', alt: 'Fresh seasonal ingredients', category: 'food', width: 800, height: 1000 },
  { id: '3', src: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop&q=85', alt: 'Grilled ribeye steak', category: 'food', width: 800, height: 600 },
  { id: '4', src: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=800&fit=crop&q=85', alt: 'Pan-seared salmon', category: 'food', width: 800, height: 800 },
  { id: '5', src: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&h=600&fit=crop&q=85', alt: 'Chocolate lava cake dessert', category: 'food', width: 800, height: 600 },
  { id: '6', src: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=1000&fit=crop&q=85', alt: 'Artisan cocktail with garnish', category: 'food', width: 800, height: 1000 },
  { id: '7', src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop&q=85', alt: 'Colorful fresh salad', category: 'food', width: 800, height: 600 },
  { id: '8', src: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&h=800&fit=crop&q=85', alt: 'Wild mushroom risotto', category: 'food', width: 800, height: 800 },
  
  // Interior
  { id: '9', src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&q=85', alt: 'Restaurant interior with warm lighting', category: 'interior', width: 800, height: 600 },
  { id: '10', src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=1000&fit=crop&q=85', alt: 'Elegant dining room setup', category: 'interior', width: 800, height: 1000 },
  { id: '11', src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=600&fit=crop&q=85', alt: 'Intimate table setting with candles', category: 'interior', width: 800, height: 600 },
  { id: '12', src: 'https://images.unsplash.com/photo-1528823872057-9c018a7a7553?w=800&h=800&fit=crop&q=85', alt: 'Wine cellar with curated collection', category: 'interior', width: 800, height: 800 },
  { id: '13', src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop&q=85', alt: 'Restaurant exterior at dusk', category: 'interior', width: 800, height: 600 },
  
  // Events
  { id: '14', src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop&q=85', alt: 'Private event celebration', category: 'events', width: 800, height: 600 },
  { id: '15', src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=1000&fit=crop&q=85', alt: 'Wedding reception setup', category: 'events', width: 800, height: 1000 },
  { id: '16', src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop&q=85', alt: 'Corporate dinner event', category: 'events', width: 800, height: 600 },
  
  // Team
  { id: '17', src: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&h=1000&fit=crop&q=85', alt: 'Chef at work in the kitchen', category: 'team', width: 800, height: 1000 },
  { id: '18', src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop&q=85', alt: 'Chef carefully plating a dish', category: 'team', width: 800, height: 600 },
  { id: '19', src: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&h=800&fit=crop&q=85', alt: 'Kitchen team in action', category: 'team', width: 800, height: 800 },
]

const CATEGORIES = ['food', 'interior', 'events', 'team']
const INSTAGRAM_HANDLE = '@goldenfork'

// ═══════════════════════════════════════════════════════════════
// GALLERY PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const filteredImages = useMemo(() => {
    if (!activeCategory) return GALLERY_IMAGES
    return GALLERY_IMAGES.filter((img) => img.category === activeCategory)
  }, [activeCategory])

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const goToPrevious = () => {
    setLightboxIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)
  }

  const goToNext = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredImages.length)
  }

  return (
    <>
      <SkipLink />
      <Nav />
      <main id="main-content">
        <PageHero
          title="Gallery"
          subtitle="A visual journey through The Golden Fork"
          backgroundImage="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=1080&fit=crop&q=85"
          height="short"
          breadcrumbs={[{ label: 'Gallery', href: '/gallery' }]}
        />

        {/* Gallery Section */}
        <section className="section-padding bg-[rgb(var(--background))]">
          <div className="max-w-6xl mx-auto px-6">
            {/* Category Filter */}
            <CategoryFilter
              categories={CATEGORIES}
              activeCategory={activeCategory}
              onSelect={setActiveCategory}
            />

            {/* Gallery Grid */}
            <GalleryGrid images={filteredImages} onImageClick={openLightbox} />

            {/* Photo count */}
            <p className="text-center text-sm text-[rgb(var(--muted-foreground))] mt-10">
              Showing {filteredImages.length} {filteredImages.length === 1 ? 'photo' : 'photos'}
              {activeCategory && ` in "${activeCategory}"`}
            </p>
          </div>
        </section>

        {/* Instagram CTA */}
        <section className="section-padding-sm bg-[rgb(var(--muted))]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center mx-auto mb-6">
              <Instagram className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-display text-3xl text-dark-900 dark:text-white mb-4">
              Follow Our Journey
            </h2>
            <p className="text-[rgb(var(--muted-foreground))] text-lg mb-6 max-w-2xl mx-auto">
              Stay up to date with our latest dishes, behind-the-scenes moments, and special events. 
              Tag us in your photos!
            </p>
            <a
              href={`https://instagram.com/${INSTAGRAM_HANDLE.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Instagram className="w-5 h-5" />
              {INSTAGRAM_HANDLE}
            </a>
          </div>
        </section>

        {/* CTA */}
        <CTABanner
          title="Visit Us In Person"
          description="Experience the ambiance, taste the food, and create your own memories"
          primaryAction={{ label: 'Make a Reservation', href: '/reservations' }}
          secondaryAction={{ label: 'Get Directions', href: '/contact' }}
        />

        <Footer />

        {/* Lightbox */}
        <Lightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          isOpen={lightboxOpen}
          onClose={closeLightbox}
          onPrevious={goToPrevious}
          onNext={goToNext}
        />
      </main>
    </>
  )
}
