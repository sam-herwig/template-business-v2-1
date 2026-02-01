'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import Image from 'next/image'
import { 
  Scissors, 
  Palette, 
  Sparkles, 
  Brush,
  Instagram, 
  Facebook, 
  Star,
  MapPin,
  Clock,
  Phone,
  ArrowRight,
  ChevronDown,
  Heart,
  Menu,
  X
} from 'lucide-react'

// ═══════════════════════════════════════════════════════════════
// SALON STARTER TEMPLATE
// Elegant, inviting site for hair salons & beauty studios
// Premium feminine aesthetic with sophisticated typography
// ═══════════════════════════════════════════════════════════════

const SALON = {
  name: "Luxe Hair Studio",
  tagline: "Where Style Meets Self-Care",
  description: "Award-winning stylists dedicated to bringing out your natural beauty. Experience the art of transformation.",
  phone: "(555) 234-5678",
  email: "hello@luxehairstudio.com",
  address: "456 Style Avenue, Suite 100",
  hours: { weekday: "9am - 7pm", saturday: "9am - 5pm", sunday: "Closed" },
  heroImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&h=1080&fit=crop&q=90",
  bookingUrl: "#book",
}

// Service category icons mapping
const SERVICE_ICONS = {
  "Hair Cuts": Scissors,
  "Color Services": Palette,
  "Treatments": Sparkles,
  "Styling": Brush,
} as const

const SERVICES = [
  {
    category: "Hair Cuts",
    items: [
      { name: "Women's Cut & Style", price: 65, duration: "60 min" },
      { name: "Men's Cut", price: 35, duration: "30 min" },
      { name: "Children's Cut (12 & under)", price: 25, duration: "30 min" },
      { name: "Bang Trim", price: 15, duration: "15 min" },
    ]
  },
  {
    category: "Color Services",
    items: [
      { name: "Single Process Color", price: 85, duration: "90 min" },
      { name: "Full Highlights", price: 150, duration: "120 min" },
      { name: "Partial Highlights", price: 100, duration: "90 min" },
      { name: "Balayage / Ombre", price: 200, duration: "180 min" },
      { name: "Color Correction", price: "Consultation", duration: "Varies" },
    ]
  },
  {
    category: "Treatments",
    items: [
      { name: "Deep Conditioning", price: 35, duration: "30 min" },
      { name: "Keratin Treatment", price: 250, duration: "180 min" },
      { name: "Scalp Treatment", price: 45, duration: "30 min" },
    ]
  },
  {
    category: "Styling",
    items: [
      { name: "Blowout", price: 45, duration: "45 min" },
      { name: "Special Occasion Style", price: 85, duration: "60 min" },
      { name: "Bridal Hair (trial included)", price: 200, duration: "120 min" },
    ]
  },
]

const STYLISTS = [
  { 
    name: "Sarah Johnson", 
    role: "Owner & Master Stylist", 
    specialty: "Balayage & Color", 
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=500&fit=crop&q=85", 
    instagram: "@sarahj_hair",
    bio: "15+ years of experience"
  },
  { 
    name: "Michelle Chen", 
    role: "Senior Stylist", 
    specialty: "Precision Cuts", 
    image: "https://images.unsplash.com/photo-1595959183082-7b570b7e1dfa?w=400&h=500&fit=crop&q=85", 
    instagram: "@michelle.cuts",
    bio: "Trained in NYC & LA"
  },
  { 
    name: "Jessica Rivera", 
    role: "Colorist", 
    specialty: "Vivid Colors & Blonding", 
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=500&fit=crop&q=85", 
    instagram: "@jess.color",
    bio: "Color specialist"
  },
  { 
    name: "Emma Thompson", 
    role: "Stylist", 
    specialty: "Curly Hair & Textures", 
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&q=85", 
    instagram: "@emma.curls",
    bio: "Curl expert certified"
  },
]

const GALLERY = [
  { src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop&q=85", alt: "Elegant blonde highlights with natural waves" },
  { src: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600&h=600&fit=crop&q=85", alt: "Rich brunette waves with glossy finish" },
  { src: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=600&fit=crop&q=85", alt: "Vibrant red hair color transformation" },
  { src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&h=600&fit=crop&q=85", alt: "Modern short cut with textured layers" },
  { src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&h=600&fit=crop&q=85", alt: "Sun-kissed balayage highlights" },
  { src: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=600&h=600&fit=crop&q=85", alt: "Professional styling for special occasions" },
]

const TESTIMONIALS = [
  { 
    quote: "Best salon experience I've ever had! Sarah understood exactly what I wanted and delivered beyond my expectations. I've never felt more beautiful.", 
    author: "Amanda K.", 
    service: "Balayage",
    rating: 5
  },
  { 
    quote: "Finally found a stylist who knows how to work with curly hair. Emma is amazing and my curls have never looked better!", 
    author: "Rachel M.", 
    service: "Curly Cut",
    rating: 5
  },
  { 
    quote: "The vibe here is so relaxing and the team is incredibly talented. I always leave feeling pampered and beautiful.", 
    author: "Jennifer L.", 
    service: "Color & Style",
    rating: 5
  },
]

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 }
}

const staggerContainer = {
  animate: { 
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.1
    } 
  }
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
}

// ═══════════════════════════════════════════════════════════════
// SKIP LINK COMPONENT
// ═══════════════════════════════════════════════════════════════

function SkipLink() {
  return (
    <a 
      href="#main-content" 
      className="skip-link"
    >
      Skip to main content
    </a>
  )
}

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [mobileMenuOpen])

  // Focus trap for mobile menu
  useEffect(() => {
    if (mobileMenuOpen && menuRef.current) {
      const focusableElements = menuRef.current.querySelectorAll(
        'a[href], button:not([disabled])'
      )
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return
        
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }

      document.addEventListener('keydown', handleTabKey)
      firstElement?.focus()
      
      return () => document.removeEventListener('keydown', handleTabKey)
    }
  }, [mobileMenuOpen])
  
  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#team', label: 'Our Team' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Contact' },
  ]
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-sm border-b border-neutral-100/50' 
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <a 
            href="/" 
            className={`font-display text-2xl font-semibold transition-colors duration-300 ${
              scrolled ? 'text-neutral-900' : 'text-white'
            }`}
            aria-label={`${SALON.name} - Home`}
          >
            {SALON.name}
          </a>
          
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((item) => (
              <a 
                key={item.href}
                href={item.href} 
                className={`relative font-medium transition-colors duration-200 group ${
                  scrolled ? 'text-neutral-600 hover:text-primary-600' : 'text-white/90 hover:text-white'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-full ${
                  scrolled ? 'bg-primary-500' : 'bg-white'
                }`} aria-hidden="true" />
              </a>
            ))}
          </div>
          
          <a 
            href={SALON.bookingUrl} 
            className={`hidden md:inline-flex btn-primary ${
              !scrolled && 'bg-white text-neutral-900 hover:bg-white/90'
            }`}
          >
            Book Now
          </a>
          
          <button 
            ref={menuButtonRef}
            className={`md:hidden p-2 transition-colors rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
              scrolled ? 'text-neutral-900' : 'text-white'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              ref={menuRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-white rounded-b-2xl shadow-lg"
            >
              <div className="py-6 px-2 space-y-4">
                {navLinks.map((item) => (
                  <a 
                    key={item.href}
                    href={item.href} 
                    className="block px-4 py-2 text-neutral-600 hover:text-primary-600 font-medium transition-colors rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="pt-4 px-4">
                  <a 
                    href={SALON.bookingUrl} 
                    className="btn-primary w-full text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" aria-label="Welcome to Luxe Hair Studio">
      {/* Background with parallax */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image 
          src={SALON.heroImage} 
          alt="Elegant salon interior showcasing our modern styling stations"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/40 via-neutral-900/50 to-neutral-900/70" aria-hidden="true" />
      </motion.div>
      
      <motion.div 
        className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white py-32"
        style={{ opacity }}
      >
        <motion.div initial="initial" animate="animate" variants={staggerContainer}>
          {/* Decorative element */}
          <motion.div variants={fadeIn} className="flourish mb-8" aria-hidden="true">
            <Star className="w-6 h-6 flourish-icon" fill="currentColor" />
          </motion.div>
          
          {/* Main headline */}
          <motion.h1 variants={fadeInUp} className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold mb-6">
            {SALON.name}
          </motion.h1>
          
          {/* Tagline */}
          <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-white/90 font-light mb-4">
            {SALON.tagline}
          </motion.p>
          
          {/* Description */}
          <motion.p variants={fadeInUp} className="text-lg text-white/80 max-w-xl mx-auto mb-10">
            {SALON.description}
          </motion.p>
          
          {/* CTAs */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={SALON.bookingUrl} className="btn-primary text-lg px-10 group">
              Book Your Appointment
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a href="#services" className="btn-outline text-lg">
              View Services
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  )
}

function Services() {
  const [activeCategory, setActiveCategory] = useState(SERVICES[0].category)
  const activeService = SERVICES.find(s => s.category === activeCategory)
  const activeItems = activeService?.items || []
  
  return (
    <section id="services" className="section-padding bg-[rgb(var(--muted))]" aria-labelledby="services-heading">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-eyebrow">Services</span>
          <h2 id="services-heading" className="section-title">Our Services</h2>
          <div className="divider" aria-hidden="true" />
          <p className="section-description mx-auto">
            Experience the art of beautiful hair with our talented team of stylists
          </p>
        </motion.div>
        
        {/* Category Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          role="tablist"
          aria-label="Service categories"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {SERVICES.map(cat => {
            const IconComponent = SERVICE_ICONS[cat.category as keyof typeof SERVICE_ICONS]
            return (
              <button
                key={cat.category}
                role="tab"
                aria-selected={activeCategory === cat.category}
                aria-controls={`panel-${cat.category.toLowerCase().replace(' ', '-')}`}
                onClick={() => setActiveCategory(cat.category)}
                className={activeCategory === cat.category ? 'category-tab-active' : 'category-tab-inactive'}
              >
                <IconComponent className="w-4 h-4 mr-2" aria-hidden="true" />
                {cat.category}
              </button>
            )
          })}
        </motion.div>
        
        {/* Service List */}
        <motion.div 
          id={`panel-${activeCategory.toLowerCase().replace(' ', '-')}`}
          role="tabpanel"
          aria-label={`${activeCategory} services`}
          className="service-menu"
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="divide-y divide-[rgb(var(--border))]">
            {activeItems.map((service, i) => (
              <li key={i} className="service-menu-item">
                <div>
                  <h3 className="service-menu-name">{service.name}</h3>
                  <p className="service-menu-duration">{service.duration}</p>
                </div>
                <div className="service-menu-price" aria-label={`Price: ${typeof service.price === 'number' ? `$${service.price}` : service.price}`}>
                  {typeof service.price === 'number' ? `$${service.price}` : service.price}
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a href={SALON.bookingUrl} className="btn-primary group">
            Book Your Service
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function Team() {
  return (
    <section id="team" className="section-padding bg-[rgb(var(--background))]" aria-labelledby="team-heading">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-eyebrow">Our Team</span>
          <h2 id="team-heading" className="section-title">Meet Our Stylists</h2>
          <div className="divider" aria-hidden="true" />
          <p className="section-description mx-auto">
            Talented artists dedicated to making you look and feel your absolute best
          </p>
        </motion.div>
        
        <motion.ul 
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          role="list"
          aria-label="Our stylists"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {STYLISTS.map((stylist, i) => (
            <motion.li key={i} variants={fadeInUp} className="stylist-card">
              <div className="stylist-card-image">
                <Image 
                  src={stylist.image} 
                  alt={`${stylist.name}, ${stylist.role}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <h3 className="stylist-card-name">{stylist.name}</h3>
              <p className="stylist-card-role">{stylist.role}</p>
              <p className="stylist-card-specialty">{stylist.specialty}</p>
              <a 
                href="#" 
                className="stylist-card-social"
                aria-label={`Follow ${stylist.name} on Instagram at ${stylist.instagram}`}
              >
                {stylist.instagram}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

function GallerySection() {
  return (
    <section id="gallery" className="section-padding bg-[rgb(var(--muted))]" aria-labelledby="gallery-heading">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-eyebrow">Gallery</span>
          <h2 id="gallery-heading" className="section-title">Our Work</h2>
          <div className="divider" aria-hidden="true" />
          <p className="section-description mx-auto">
            A glimpse of our transformations and styling magic
          </p>
        </motion.div>
        
        <motion.ul 
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
          role="list"
          aria-label="Gallery of our styling work"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {GALLERY.map((img, i) => (
            <motion.li key={i} variants={scaleIn} className="gallery-item">
              <Image 
                src={img.src} 
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover"
              />
              <div className="gallery-overlay" aria-hidden="true">
                <div className="gallery-icon">
                  <Heart className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors group"
            aria-label="Follow us on Instagram for more styling inspiration"
          >
            <Instagram className="w-5 h-5" aria-hidden="true" />
            Follow us on Instagram
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="section-padding bg-primary-600 relative overflow-hidden" aria-labelledby="testimonials-heading">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2" />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 id="testimonials-heading" className="font-display text-4xl md:text-5xl text-white font-semibold mb-4">
            What Our Clients Say
          </h2>
          <div className="divider-gold" aria-hidden="true" />
        </motion.div>
        
        <motion.ul 
          className="grid md:grid-cols-3 gap-6"
          role="list"
          aria-label="Client testimonials"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.li key={i} variants={fadeInUp}>
              <article className="testimonial-card h-full">
                <div className="testimonial-stars" aria-label={`${t.rating} out of 5 stars`}>
                  {'★'.repeat(t.rating)}
                </div>
                <blockquote className="testimonial-quote">"{t.quote}"</blockquote>
                <footer>
                  <cite className="testimonial-author not-italic">{t.author}</cite>
                  <div className="testimonial-service">{t.service}</div>
                </footer>
              </article>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

function BookingCTA() {
  return (
    <section id="book" className="section-padding bg-[rgb(var(--background))]" aria-labelledby="booking-heading">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          className="booking-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative z-10">
            <div className="mb-4" aria-hidden="true">
              <Sparkles className="w-8 h-8 text-primary-300" />
            </div>
            <h2 id="booking-heading" className="font-display text-3xl md:text-4xl text-white font-semibold mb-4">
              Ready for Your Transformation?
            </h2>
            <p className="text-neutral-300 mb-10 max-w-xl mx-auto text-lg">
              Book your appointment online and let our talented stylists create your perfect look.
            </p>
            <a href={SALON.bookingUrl} className="btn-primary text-lg px-10 group">
              Book on Fresha
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <p className="text-neutral-400 text-sm mt-6">
              Or call us at{' '}
              <a 
                href={`tel:${SALON.phone}`} 
                className="text-primary-400 hover:text-primary-300 underline underline-offset-2"
              >
                {SALON.phone}
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="section-padding bg-[rgb(var(--muted))]" aria-labelledby="contact-heading">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-eyebrow">Contact</span>
            <h2 id="contact-heading" className="section-title mb-10">Visit Us</h2>
            
            <address className="not-italic space-y-2">
              <div className="contact-item">
                <div className="contact-icon" aria-hidden="true">
                  <MapPin className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="contact-label">Location</h3>
                  <p className="contact-value">{SALON.address}</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon" aria-hidden="true">
                  <Clock className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="contact-label">Hours</h3>
                  <p className="contact-value">Monday - Friday: {SALON.hours.weekday}</p>
                  <p className="contact-value">Saturday: {SALON.hours.saturday}</p>
                  <p className="contact-value">Sunday: {SALON.hours.sunday}</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon" aria-hidden="true">
                  <Phone className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="contact-label">Contact</h3>
                  <p className="contact-value">
                    <a href={`tel:${SALON.phone}`} className="hover:text-primary-600 transition-colors">
                      {SALON.phone}
                    </a>
                  </p>
                  <p className="contact-value">
                    <a href={`mailto:${SALON.email}`} className="hover:text-primary-600 transition-colors">
                      {SALON.email}
                    </a>
                  </p>
                </div>
              </div>
            </address>
            
            {/* Social links */}
            <nav className="flex gap-3 mt-8" aria-label="Social media links">
              <a 
                href="#" 
                className="social-link" 
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
              <a 
                href="#" 
                className="social-link" 
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
              <a 
                href="#" 
                className="social-link" 
                aria-label="Follow us on Yelp"
              >
                <Star className="w-5 h-5" aria-hidden="true" />
              </a>
            </nav>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-neutral-200 dark:bg-neutral-700 rounded-3xl h-80 md:h-auto min-h-[400px] flex items-center justify-center relative overflow-hidden"
            role="img"
            aria-label="Map showing salon location at 456 Style Avenue, Suite 100"
          >
            <div className="text-center">
              <MapPin className="w-12 h-12 text-neutral-400 mx-auto mb-3" strokeWidth={1.5} aria-hidden="true" />
              <span className="text-neutral-500 dark:text-neutral-400 font-medium">Google Maps Embed</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-neutral-900 text-white py-12" role="contentinfo">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-display text-2xl font-semibold mb-2">{SALON.name}</div>
            <p className="text-neutral-400 text-sm">{SALON.tagline}</p>
          </div>
          
          <nav className="flex items-center gap-6" aria-label="Footer social links">
            {['Instagram', 'Facebook', 'Yelp'].map((social) => (
              <a 
                key={social} 
                href="#" 
                className="text-neutral-400 hover:text-white transition-colors text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
                aria-label={`Follow us on ${social}`}
              >
                {social}
              </a>
            ))}
          </nav>
        </div>
        
        <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-neutral-400 text-sm">
          © {currentYear} {SALON.name}. All rights reserved.
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
      <Nav />
      <main id="main-content">
        <Hero />
        <Services />
        <Team />
        <GallerySection />
        <Testimonials />
        <BookingCTA />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
