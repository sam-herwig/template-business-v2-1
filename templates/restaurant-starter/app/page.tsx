'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap'
import { SkipLink } from '@/components/SkipLink'
import { 
  Salad, 
  UtensilsCrossed, 
  Cake, 
  Wine,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react'
import type { 
  RestaurantConfig, 
  MenuCategory, 
  MenuItem, 
  GalleryImage, 
  Testimonial,
  DietaryType 
} from '@/types'

// ═══════════════════════════════════════════════════════════════
// RESTAURANT STARTER TEMPLATE
// A warm, sophisticated landing page for fine dining establishments
// Premium GSAP animations: elegant reveals, parallax, SplitText
// ═══════════════════════════════════════════════════════════════

const RESTAURANT: RestaurantConfig = {
  name: "The Golden Fork",
  tagline: "Farm to Table Excellence",
  description: "Experience the finest locally-sourced ingredients prepared with passion and creativity. Every dish tells a story of the land and the people who cultivate it.",
  phone: "(555) 123-4567",
  email: "hello@goldenfork.com",
  address: "123 Main Street, Downtown",
  hours: {
    weekday: "11:00 AM - 10:00 PM",
    weekend: "10:00 AM - 11:00 PM",
  },
  heroImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop&q=90",
}

const MENU_CATEGORIES: { id: string; name: string; icon: React.ReactNode }[] = [
  { id: 'starters', name: 'Starters', icon: <Salad className="w-5 h-5" /> },
  { id: 'mains', name: 'Main Courses', icon: <UtensilsCrossed className="w-5 h-5" /> },
  { id: 'desserts', name: 'Desserts', icon: <Cake className="w-5 h-5" /> },
  { id: 'drinks', name: 'Drinks', icon: <Wine className="w-5 h-5" /> },
]

const MENU_ITEMS: MenuItem[] = [
  { id: 1, category: 'starters', name: 'Burrata & Heirloom Tomatoes', description: 'Fresh burrata, seasonal tomatoes, basil oil, aged balsamic', price: 16, dietary: ['v', 'gf'] },
  { id: 2, category: 'starters', name: 'Crispy Calamari', description: 'Lightly fried, lemon aioli, fresh herbs', price: 14, dietary: [] },
  { id: 3, category: 'starters', name: 'Soup of the Day', description: 'Chef\'s daily creation, artisan bread', price: 9, dietary: ['v'] },
  { id: 4, category: 'starters', name: 'Roasted Beet Salad', description: 'Goat cheese, candied walnuts, arugula, honey vinaigrette', price: 13, dietary: ['v', 'gf'] },
  { id: 5, category: 'mains', name: 'Pan-Seared Salmon', description: 'Wild-caught salmon, lemon butter, seasonal vegetables, herb rice', price: 32, dietary: ['gf'] },
  { id: 6, category: 'mains', name: 'Grilled Ribeye', description: '12oz prime cut, garlic mashed potatoes, red wine reduction', price: 45, dietary: ['gf'] },
  { id: 7, category: 'mains', name: 'Wild Mushroom Risotto', description: 'Arborio rice, truffle oil, parmesan, fresh herbs', price: 26, dietary: ['v', 'gf'] },
  { id: 8, category: 'mains', name: 'Herb-Crusted Chicken', description: 'Free-range chicken, roasted vegetables, pan jus', price: 28, dietary: ['gf'] },
  { id: 9, category: 'desserts', name: 'Chocolate Lava Cake', description: 'Warm chocolate center, vanilla bean ice cream', price: 12, dietary: ['v'] },
  { id: 10, category: 'desserts', name: 'Crème Brûlée', description: 'Classic vanilla custard, caramelized sugar', price: 10, dietary: ['v', 'gf'] },
  { id: 11, category: 'desserts', name: 'Seasonal Fruit Tart', description: 'Fresh fruits, pastry cream, almond crust', price: 11, dietary: ['v'] },
  { id: 12, category: 'drinks', name: 'House Red Wine', description: 'Cabernet Sauvignon, Napa Valley', price: 14, dietary: ['v', 'gf'] },
  { id: 13, category: 'drinks', name: 'Craft Cocktail', description: 'Ask your server about today\'s creations', price: 16, dietary: [] },
  { id: 14, category: 'drinks', name: 'Local Craft Beer', description: 'Rotating selection of local favorites', price: 8, dietary: ['v'] },
]

const GALLERY: GalleryImage[] = [
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=450&fit=crop&q=85', alt: 'Elegantly plated gourmet dish with microgreens' },
  { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=450&fit=crop&q=85', alt: 'Fresh farm ingredients including vegetables and herbs' },
  { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=450&fit=crop&q=85', alt: 'Warm restaurant interior with ambient lighting' },
  { src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&h=450&fit=crop&q=85', alt: 'Intimate dining table setting with candles' },
  { src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&h=450&fit=crop&q=85', alt: 'Chef carefully preparing a signature dish' },
  { src: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=450&fit=crop&q=85', alt: 'Artisan cocktail with fresh garnish' },
]

const TESTIMONIALS: Testimonial[] = [
  { quote: "The best dining experience we've had in years. Every dish was a work of art, and the service was impeccable.", author: "Sarah Mitchell", role: "Food Critic, The Daily Gazette", rating: 5 },
  { quote: "Impeccable service and incredible food. This is our go-to spot for special occasions and celebrations.", author: "James Thompson", role: "Regular Guest", rating: 5 },
  { quote: "Fresh, creative, delicious. The seasonal menu keeps us coming back again and again.", author: "Emily Rodriguez", role: "Anniversary Dinner", rating: 5 },
]

// Dietary label helper
const DIETARY_LABELS: Record<DietaryType, string> = {
  v: 'Vegetarian',
  vg: 'Vegan',
  gf: 'Gluten-Free',
}

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), [])
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100/50 dark:bg-dark-950/95 dark:border-gray-800/50' : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <a 
            href="/" 
            className={`font-display text-2xl transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-sm ${scrolled ? 'text-dark-900 dark:text-white' : 'text-white'}`}
            aria-label={`${RESTAURANT.name} - Home`}
          >
            {RESTAURANT.name}
          </a>
          
          <div className="hidden md:flex items-center gap-10">
            {['Menu', 'About', 'Gallery', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className={`relative font-medium transition-colors duration-200 group focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-sm ${scrolled ? 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400' : 'text-white/90 hover:text-white'}`}
              >
                {item}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-full ${scrolled ? 'bg-primary-500' : 'bg-white'}`} aria-hidden="true" />
              </a>
            ))}
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="#reservations" 
              className={`btn-primary text-sm focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${!scrolled && 'bg-white text-dark-900 hover:bg-white/90'}`}
            >
              Reserve a Table
            </a>
          </div>
          
          <button 
            className={`md:hidden p-2 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-sm ${scrolled ? 'text-dark-900 dark:text-white' : 'text-white'}`} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
        
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-white dark:bg-dark-950 rounded-b-lg"
            >
              <div className="py-4 space-y-4 border-t border-gray-100 dark:border-gray-800 px-2">
                {['Menu', 'About', 'Gallery', 'Contact'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`} 
                    className="block text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-2 px-4 rounded-md focus-visible:ring-2 focus-visible:ring-primary-500" 
                    onClick={closeMobileMenu}
                  >
                    {item}
                  </a>
                ))}
                <a 
                  href="#reservations" 
                  className="btn-primary text-center block mx-4 focus-visible:ring-2 focus-visible:ring-primary-500"
                  onClick={closeMobileMenu}
                >
                  Reserve a Table
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const ctx = gsap.context(() => {
      // Parallax background image
      gsap.to('.hero-image', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      
      // SplitText animation for title (words, not chars - more elegant)
      if (titleRef.current) {
        const titleSplit = new SplitText(titleRef.current, { type: 'words' })
        gsap.from(titleSplit.words, {
          y: 60,
          opacity: 0,
          stagger: 0.08,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.3,
        })
      }
      
      // Tagline animation
      gsap.from('.hero-tagline', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.1,
      })
      
      // Description with SplitText (words)
      if (descRef.current) {
        const descSplit = new SplitText(descRef.current, { type: 'words' })
        gsap.from(descSplit.words, {
          y: 20,
          opacity: 0,
          stagger: 0.02,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.8,
        })
      }
      
      // CTAs
      gsap.from('.hero-cta', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1.2,
      })
      
      // Scroll indicator
      gsap.from('.scroll-indicator', {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1.5,
      })
      
      // Fade out content on scroll
      gsap.to('.hero-content', {
        opacity: 0,
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '50% top',
          scrub: true,
        },
      })
    }, heroRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden" aria-labelledby="hero-title">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0">
        <Image 
          src={RESTAURANT.heroImage} 
          alt="Restaurant ambiance with warm lighting and elegant dining setup" 
          fill
          priority
          sizes="100vw"
          className="hero-image object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950/40 via-dark-950/50 to-dark-950/70" aria-hidden="true" />
      </div>
      
      <div className="hero-content relative z-10 max-w-6xl mx-auto px-6 text-center text-white py-32">
        {/* Eyebrow */}
        <div className="hero-tagline inline-flex items-center gap-3 mb-6">
          <span className="w-12 h-px bg-primary-400" aria-hidden="true" />
          <span className="text-primary-400 uppercase tracking-[0.25em] text-sm font-medium">{RESTAURANT.tagline}</span>
          <span className="w-12 h-px bg-primary-400" aria-hidden="true" />
        </div>
        
        {/* Main headline */}
        <h1 id="hero-title" ref={titleRef} className="font-display text-5xl md:text-7xl lg:text-8xl mb-6 leading-[1.05]">
          {RESTAURANT.name}
        </h1>
        
        {/* Subheadline */}
        <p ref={descRef} className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed">
          {RESTAURANT.description}
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#reservations" className="hero-cta btn-primary text-lg group focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950">
            Make a Reservation
            <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a href="#menu" className="hero-cta btn-outline text-lg focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950">View Menu</a>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70" aria-hidden="true">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <motion.svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </motion.svg>
        </div>
      </div>
    </section>
  )
}

function Menu() {
  const [activeCategory, setActiveCategory] = useState('starters')
  const menuRef = useRef<HTMLElement>(null)
  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory)
  
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const ctx = gsap.context(() => {
      gsap.from('.menu-header', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: menuRef.current,
          start: 'top 75%',
        },
      })
      
      gsap.from('.category-tab', {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.category-tabs',
          start: 'top 80%',
        },
      })
    }, menuRef)
    
    return () => ctx.revert()
  }, [])
  
  // Animate menu items when category changes
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    gsap.from('.menu-item', {
      y: 30,
      opacity: 0,
      stagger: 0.08,
      duration: 0.6,
      ease: 'power2.out',
    })
  }, [activeCategory])
  
  return (
    <section ref={menuRef} id="menu" className="section-padding bg-[rgb(var(--background))]" aria-labelledby="menu-title">
      <div className="max-w-4xl mx-auto px-6">
        <div className="menu-header text-center mb-16">
          <span className="section-eyebrow">Our Menu</span>
          <h2 id="menu-title" className="section-title">Seasonal Favorites</h2>
          <div className="divider mt-6 mb-6" aria-hidden="true" />
          <p className="section-description mx-auto">
            Fresh, locally-sourced ingredients prepared with care and creativity.
          </p>
        </div>
        
        {/* Category Tabs */}
        <div className="category-tabs flex flex-wrap justify-center gap-3 mb-14" role="tablist" aria-label="Menu categories">
          {MENU_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              aria-controls={`panel-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`category-tab focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${activeCategory === cat.id ? 'category-tab-active' : 'category-tab-inactive'}`}
            >
              <span className="mr-2" aria-hidden="true">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
        
        {/* Menu Items */}
        <div 
          id={`panel-${activeCategory}`}
          role="tabpanel"
          aria-label={`${MENU_CATEGORIES.find(c => c.id === activeCategory)?.name} menu items`}
          className="space-y-2" 
          key={activeCategory}
        >
          {filteredItems.map((item) => (
            <article key={item.id} className="menu-item">
              <div className="relative z-10 flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <h3 className="menu-item-name">{item.name}</h3>
                    <div className="flex gap-1.5">
                      {item.dietary.map(d => (
                        <span 
                          key={d} 
                          className={`dietary-icon dietary-${d}`} 
                          title={DIETARY_LABELS[d]}
                          aria-label={DIETARY_LABELS[d]}
                        >
                          {d === 'v' ? 'V' : d === 'vg' ? 'VG' : 'GF'}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="menu-item-description">{item.description}</p>
                </div>
                <div className="menu-item-price shrink-0" aria-label={`Price: ${item.price} dollars`}>${item.price}</div>
              </div>
            </article>
          ))}
        </div>
        
        {/* Dietary Legend */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-[rgb(var(--muted-foreground))]" aria-label="Dietary legend">
          <span className="flex items-center gap-2"><span className="dietary-icon dietary-v" aria-hidden="true">V</span> Vegetarian</span>
          <span className="flex items-center gap-2"><span className="dietary-icon dietary-gf" aria-hidden="true">GF</span> Gluten-Free</span>
        </div>
        
        {/* Order Online CTA */}
        <div className="mt-16 text-center p-10 bg-primary-50 dark:bg-primary-950/30 rounded-2xl border border-primary-100 dark:border-primary-900/50">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-100 dark:bg-primary-900/50 mb-4" aria-hidden="true">
            <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="font-display text-2xl text-dark-900 dark:text-white mb-2">Order Online</h3>
          <p className="text-[rgb(var(--muted-foreground))] mb-6">Skip the wait — order pickup or delivery</p>
          <button className="btn-primary focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
            Order Now 
            <svg className="w-4 h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

function About() {
  const aboutRef = useRef<HTMLElement>(null)
  
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const ctx = gsap.context(() => {
      gsap.from('.about-content', {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 70%',
        },
      })
      
      // Image reveal with clip-path
      gsap.from('.about-image', {
        clipPath: 'inset(100% 0 0 0)',
        duration: 1.4,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.about-image',
          start: 'top 75%',
        },
      })
      
      // Stats counter
      gsap.utils.toArray<HTMLElement>('.stat-number').forEach((el) => {
        const value = el.dataset.value || '0'
        const numValue = parseFloat(value.replace(/[^0-9.]/g, ''))
        const suffix = value.replace(/[0-9.]/g, '')
        const obj = { value: 0 }
        
        gsap.to(obj, {
          value: numValue,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
          onUpdate: () => {
            el.textContent = (numValue % 1 === 0 ? Math.floor(obj.value) : obj.value.toFixed(1)) + suffix
          },
        })
      })
      
      // Floating badge
      gsap.from('.about-badge', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-badge',
          start: 'top 90%',
        },
      })
    }, aboutRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={aboutRef} id="about" className="section-padding bg-[rgb(var(--muted))]" aria-labelledby="about-title">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="about-content">
            <span className="section-eyebrow">Our Story</span>
            <h2 id="about-title" className="section-title mb-8">A Passion for<br />Great Food</h2>
            <div className="space-y-5 text-[rgb(var(--muted-foreground))] text-lg leading-relaxed">
              <p>Founded in 2015, The Golden Fork started with a simple mission: bring farm-fresh ingredients and creative cuisine to our community.</p>
              <p>Our chef partners directly with local farmers and producers to source the finest seasonal ingredients. Every dish tells a story of the land and the people who cultivate it.</p>
              <p>Whether you're celebrating a special occasion or enjoying a casual dinner with friends, we're honored to be part of your experience.</p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-[rgb(var(--border))]" role="list" aria-label="Restaurant statistics">
              {[{ number: '10+', label: 'Years' }, { number: '50k', label: 'Guests Served' }, { number: '4.9', label: 'Rating' }].map((stat) => (
                <div key={stat.label} role="listitem">
                  <div className="font-display text-3xl text-primary-600 dark:text-primary-400 mb-1">
                    <span className="stat-number" data-value={stat.number}>0</span>
                  </div>
                  <div className="text-sm text-[rgb(var(--muted-foreground))]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="about-image rounded-2xl shadow-2xl shadow-dark-950/10 overflow-hidden relative aspect-[4/5]">
              <Image 
                src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=600&h=750&fit=crop&q=85" 
                alt="Chef carefully plating a gourmet dish with precision and artistry" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="about-badge absolute -bottom-6 -left-6 bg-white dark:bg-dark-900 p-6 rounded-xl shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center" aria-hidden="true">
                  <svg className="w-6 h-6 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <div className="font-display text-2xl text-dark-900 dark:text-white">Award</div>
                  <div className="text-sm text-[rgb(var(--muted-foreground))]">Best Fine Dining 2024</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  const galleryRef = useRef<HTMLElement>(null)
  
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const ctx = gsap.context(() => {
      gsap.from('.gallery-header', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: galleryRef.current,
          start: 'top 75%',
        },
      })
      
      // Staggered image reveals
      gsap.utils.toArray<HTMLElement>('.gallery-item').forEach((item) => {
        gsap.from(item, {
          scale: 0.9,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          },
        })
        
        // Parallax on images
        const img = item.querySelector('img')
        if (img) {
          gsap.to(img, {
            yPercent: -15,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
        }
      })
    }, galleryRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={galleryRef} id="gallery" className="section-padding bg-[rgb(var(--background))]" aria-labelledby="gallery-title">
      <div className="max-w-6xl mx-auto px-6">
        <div className="gallery-header text-center mb-16">
          <span className="section-eyebrow">Gallery</span>
          <h2 id="gallery-title" className="section-title">A Feast for the Eyes</h2>
          <div className="divider mt-6" aria-hidden="true" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6" role="list" aria-label="Restaurant photo gallery">
          {GALLERY.map((img, i) => (
            <div key={i} className="gallery-item overflow-hidden rounded-lg relative aspect-[4/3]" role="listitem">
              <Image 
                src={img.src} 
                alt={img.alt} 
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const testimonialsRef = useRef<HTMLElement>(null)
  
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const ctx = gsap.context(() => {
      gsap.from('.testimonials-header', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: 'top 75%',
        },
      })
      
      // Testimonial cards with SplitText on quotes
      gsap.utils.toArray<HTMLElement>('.testimonial-card').forEach((card) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        })
      })
    }, testimonialsRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={testimonialsRef} className="section-padding bg-dark-900" aria-labelledby="testimonials-title">
      <div className="max-w-6xl mx-auto px-6">
        <div className="testimonials-header text-center mb-16">
          <span className="text-primary-400 uppercase tracking-[0.2em] text-sm font-medium mb-3 block">Reviews</span>
          <h2 id="testimonials-title" className="font-display text-4xl md:text-5xl text-white mb-6">What Our Guests Say</h2>
          <div className="w-16 h-1 bg-primary-500 rounded-full mx-auto" aria-hidden="true" />
        </div>
        
        <div className="grid md:grid-cols-3 gap-8" role="list" aria-label="Guest testimonials">
          {TESTIMONIALS.map((review, i) => (
            <article key={i} className="testimonial-card" role="listitem">
              <div className="quote-mark mb-2" aria-hidden="true">"</div>
              <div className="testimonial-stars" role="img" aria-label={`${review.rating} out of 5 stars`}>{'★'.repeat(review.rating)}</div>
              <blockquote className="testimonial-quote">{review.quote}</blockquote>
              <footer className="border-t border-white/10 pt-4">
                <cite className="testimonial-author not-italic">{review.author}</cite>
                <div className="text-sm text-gray-400">{review.role}</div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Reservations() {
  const ctaRef = useRef<HTMLElement>(null)
  
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const ctx = gsap.context(() => {
      gsap.from('.cta-content', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 75%',
        },
      })
    }, ctaRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={ctaRef} id="reservations" className="cta-section section-padding-sm" aria-labelledby="reservations-title">
      <div className="cta-content relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <h2 id="reservations-title" className="font-display text-4xl md:text-5xl mb-4">Make a Reservation</h2>
        <p className="text-white/90 text-lg mb-10 max-w-xl mx-auto">Book your table online or call us directly. We look forward to welcoming you.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="bg-white text-primary-600 hover:bg-gray-50 px-8 py-4 rounded-sm font-medium text-lg transition-all duration-300 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600">
            Book on OpenTable
          </button>
          <a 
            href={`tel:${RESTAURANT.phone}`} 
            className="flex items-center gap-2 text-white hover:text-white/90 px-8 py-4 font-medium text-lg transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600 rounded-sm"
            aria-label={`Call us at ${RESTAURANT.phone}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {RESTAURANT.phone}
          </a>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const contactRef = useRef<HTMLElement>(null)
  
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const ctx = gsap.context(() => {
      gsap.from('.contact-info', {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 75%',
        },
      })
      
      gsap.from('.contact-map', {
        x: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 75%',
        },
      })
    }, contactRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={contactRef} id="contact" className="section-padding bg-[rgb(var(--background))]" aria-labelledby="contact-title">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="contact-info">
            <span className="section-eyebrow">Visit Us</span>
            <h2 id="contact-title" className="section-title mb-10">Location & Hours</h2>
            
            <address className="space-y-8 not-italic">
              {[
                { icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></>, label: 'Address', value: RESTAURANT.address },
                { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />, label: 'Hours', value: <><span className="block">Mon - Fri: {RESTAURANT.hours.weekday}</span><span className="block">Sat - Sun: {RESTAURANT.hours.weekend}</span></> },
                { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />, label: 'Contact', value: <><span className="block">{RESTAURANT.phone}</span><span className="block">{RESTAURANT.email}</span></> },
              ].map((item) => (
                <div key={item.label} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center shrink-0" aria-hidden="true">
                    <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">{item.icon}</svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-dark-900 dark:text-white mb-1">{item.label}</h3>
                    <div className="text-[rgb(var(--muted-foreground))]">{item.value}</div>
                  </div>
                </div>
              ))}
            </address>
          </div>
          
          <div className="contact-map relative rounded-2xl overflow-hidden bg-gray-200 dark:bg-dark-900 h-80 md:h-auto min-h-[400px]" role="img" aria-label="Map showing restaurant location">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span className="text-gray-500">Google Maps Embed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-dark-950 text-white py-16" role="contentinfo">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="font-display text-2xl mb-4">{RESTAURANT.name}</div>
            <p className="text-gray-400 mb-6 max-w-sm">Farm to table excellence. Experience the finest locally-sourced ingredients prepared with passion.</p>
            <div className="flex items-center gap-4">
              {[
                { name: 'Instagram', icon: <Instagram className="w-5 h-5" /> },
                { name: 'Facebook', icon: <Facebook className="w-5 h-5" /> },
                { name: 'Twitter', icon: <Twitter className="w-5 h-5" /> },
              ].map((social) => (
                <a 
                  key={social.name} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950" 
                  aria-label={`Follow us on ${social.name}`}
                >
                  <span aria-hidden="true">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
          
          <nav aria-label="Footer navigation">
            <h4 className="font-medium text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['Menu', 'About', 'Gallery', 'Contact'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase()}`} 
                    className="text-gray-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 rounded-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          
          <div>
            <h4 className="font-medium text-white mb-4">Contact</h4>
            <address className="space-y-3 text-gray-400 not-italic">
              <p>{RESTAURANT.address}</p>
              <p>{RESTAURANT.phone}</p>
              <p>{RESTAURANT.email}</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-500 text-sm">© {currentYear} {RESTAURANT.name}. All rights reserved.</div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 rounded-sm">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 rounded-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════

export default function Home() {
  return (
    <>
      <SkipLink />
      <main id="main-content" className="overflow-hidden">
        <Nav />
        <Hero />
        <Menu />
        <About />
        <Gallery />
        <Testimonials />
        <Reservations />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
