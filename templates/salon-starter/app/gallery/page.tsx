'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Instagram, ArrowRight, Heart } from 'lucide-react'
import { Nav, Footer } from '@/components/layout'
import { PageHero, Breadcrumbs, Lightbox } from '@/components/shared'

const GALLERY_CATEGORIES = ['All', 'Balayage', 'Color', 'Cuts', 'Bridal', 'Before & After']

const GALLERY = [
  { src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop&q=85", alt: "Elegant blonde highlights with natural waves", category: "Balayage", stylist: "Sarah Johnson" },
  { src: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600&h=600&fit=crop&q=85", alt: "Rich brunette waves with glossy finish", category: "Color", stylist: "Jessica Rivera" },
  { src: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=600&fit=crop&q=85", alt: "Vibrant red hair color transformation", category: "Color", stylist: "Jessica Rivera" },
  { src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&h=600&fit=crop&q=85", alt: "Modern short cut with textured layers", category: "Cuts", stylist: "Michelle Chen" },
  { src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&h=600&fit=crop&q=85", alt: "Sun-kissed balayage highlights", category: "Balayage", stylist: "Sarah Johnson" },
  { src: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=600&h=600&fit=crop&q=85", alt: "Professional styling for special occasions", category: "Bridal", stylist: "Sarah Johnson" },
  { src: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&h=600&fit=crop&q=85", alt: "Dimensional highlights on dark hair", category: "Color", stylist: "Jessica Rivera" },
  { src: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&h=600&fit=crop&q=85", alt: "Natural curls defined and styled", category: "Cuts", stylist: "Emma Thompson" },
  { src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=600&fit=crop&q=85", alt: "Sleek bob haircut", category: "Cuts", stylist: "Michelle Chen" },
  { src: "https://images.unsplash.com/photo-1522337094846-8a818192de1f?w=600&h=600&fit=crop&q=85", alt: "Platinum blonde transformation", category: "Before & After", stylist: "Jessica Rivera" },
  { src: "https://images.unsplash.com/photo-1580618864180-f6d7d39b8ff6?w=600&h=600&fit=crop&q=85", alt: "Wedding day updo styling", category: "Bridal", stylist: "Sarah Johnson" },
  { src: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?w=600&h=600&fit=crop&q=85", alt: "Caramel balayage highlights", category: "Balayage", stylist: "Sarah Johnson" },
]

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
}

const staggerContainer = {
  animate: { 
    transition: { 
      staggerChildren: 0.06,
      delayChildren: 0.1
    } 
  }
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const filteredGallery = activeCategory === 'All'
    ? GALLERY
    : GALLERY.filter(img => img.category === activeCategory)
  
  const openLightbox = useCallback((index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }, [])
  
  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
  }, [])
  
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredGallery.length)
  }, [filteredGallery.length])
  
  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length)
  }, [filteredGallery.length])
  
  return (
    <>
      <Nav />
      <main id="main-content">
        <PageHero
          eyebrow="Gallery"
          title="Our Work"
          description="A glimpse of our transformations and styling magic"
          compact
        />
        
        <section className="section-padding bg-[rgb(var(--muted))]">
          <div className="max-w-6xl mx-auto px-6">
            <Breadcrumbs items={[{ label: 'Gallery' }]} className="mb-8" />
            
            {/* Category Filter */}
            <motion.div 
              className="flex flex-wrap justify-center gap-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {GALLERY_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={activeCategory === category ? 'category-tab-active' : 'category-tab-inactive'}
                >
                  {category}
                </button>
              ))}
            </motion.div>
            
            {/* Gallery Grid */}
            <motion.div
              key={activeCategory}
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            >
              {filteredGallery.map((img, i) => (
                <motion.button
                  key={`${img.src}-${i}`}
                  variants={scaleIn}
                  className="gallery-item group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                  onClick={() => openLightbox(i)}
                  aria-label={`View ${img.alt}`}
                >
                  <Image 
                    src={img.src} 
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                  />
                  <div className="gallery-overlay">
                    <div className="gallery-icon">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  {/* Hover info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-neutral-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-medium">{img.category}</p>
                    <p className="text-white/80 text-xs">by {img.stylist}</p>
                  </div>
                </motion.button>
              ))}
            </motion.div>
            
            {/* Instagram Section */}
            <motion.div
              className="mt-20 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 mb-6">
                <Instagram className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display text-2xl text-neutral-900 mb-3">
                Follow Us on Instagram
              </h3>
              <p className="text-neutral-600 mb-6">
                @luxehairstudio
              </p>
              <a 
                href="https://instagram.com/luxehairstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary group"
              >
                <Instagram className="w-5 h-5 mr-2" />
                Follow @luxehairstudio
              </a>
            </motion.div>
            
            {/* Booking CTA */}
            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-neutral-600 mb-4">
                Ready for your own transformation?
              </p>
              <Link href="/book" className="btn-primary group">
                Book Your Appointment
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </section>
        
        {/* Lightbox */}
        <Lightbox
          images={filteredGallery}
          currentIndex={currentImageIndex}
          isOpen={lightboxOpen}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      </main>
      <Footer />
    </>
  )
}
