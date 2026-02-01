'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Leaf, Coffee, Apple, Mountain, UtensilsCrossed, Heart, Instagram as InstagramIcon, Facebook as FacebookIcon, Music2 } from 'lucide-react'

// ═══════════════════════════════════════════════════════════════
// SKIP LINK
// ═══════════════════════════════════════════════════════════════
function SkipLink() {
  return (
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>
  )
}

// ═══════════════════════════════════════════════════════════════
// MENU DATA
// ═══════════════════════════════════════════════════════════════
const menuHighlights = [
  {
    name: 'The Denver Scramble',
    description: 'Farm eggs, green chili, pepper jack, avocado, crispy potatoes',
    price: '$16',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop',
    tag: 'Fan Favorite',
  },
  {
    name: 'Buttermilk Stack',
    description: 'Three fluffy pancakes, whipped butter, pure maple syrup',
    price: '$14',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
    tag: null,
  },
  {
    name: 'Avocado Toast',
    description: 'Sourdough, smashed avo, everything seasoning, poached eggs',
    price: '$15',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop',
    tag: 'Vegetarian',
  },
  {
    name: 'Huevos Rancheros',
    description: 'Crispy tortillas, black beans, ranchero sauce, queso fresco',
    price: '$17',
    image: 'https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?w=400&h=300&fit=crop',
    tag: 'Spicy',
  },
]

// ═══════════════════════════════════════════════════════════════
// INSTAGRAM DATA
// ═══════════════════════════════════════════════════════════════
const instagramPosts = [
  { image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400&h=400&fit=crop', caption: 'Sunday morning vibes ☀️' },
  { image: 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=400&h=400&fit=crop', caption: 'Fresh from the garden 🌿' },
  { image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=400&fit=crop', caption: 'Stack em high 🥞' },
  { image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=400&fit=crop', caption: 'Brunch squad goals 👯' },
  { image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop', caption: 'Coffee first ☕' },
  { image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop', caption: 'Sweet treats 🍩' },
]

// ═══════════════════════════════════════════════════════════════
// MOBILE MENU
// ═══════════════════════════════════════════════════════════════
function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] md:hidden"
        >
          <motion.div
            className="absolute inset-0 bg-brunch-brown/80 dark:bg-black/80"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 w-[80%] max-w-sm h-full bg-brunch-cream dark:bg-[#1F1A16] p-8 flex flex-col"
            aria-label="Mobile navigation"
          >
            <button
              onClick={onClose}
              className="self-end p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-brunch-brown dark:text-brunch-cream"
              aria-label="Close menu"
            >
              <span className="text-2xl">✕</span>
            </button>
            <div className="flex flex-col gap-6 mt-8">
              {['Menu', 'About', 'Visit'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={onClose}
                  className="text-xl font-medium text-brunch-brown dark:text-brunch-cream hover:text-brunch-terracotta transition-colors py-2"
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="mt-auto">
              <a href="#reserve" onClick={onClose} className="btn-primary text-center block">
                Reserve a Table
              </a>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ═══════════════════════════════════════════════════════════════
// DARK MODE TOGGLE
// ═══════════════════════════════════════════════════════════════
function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check initial state
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggleDarkMode = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    
    if (newIsDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-brunch-brown/10 dark:hover:bg-white/10 transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="text-xl" aria-hidden="true">{isDark ? '☀️' : '🌙'}</span>
    </button>
  )
}

// ═══════════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════════
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 md:px-16 py-4 transition-all duration-300 ${scrolled ? 'nav-scrolled py-3' : ''}`}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl transition-transform hover:rotate-12" aria-hidden="true">☀️</span>
          <span className="font-display text-xl md:text-2xl font-bold text-brunch-brown dark:text-brunch-cream">Sunny Side</span>
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#menu" className="text-brunch-brownLight dark:text-brunch-cream/80 font-medium hover:text-brunch-brown dark:hover:text-brunch-cream transition-colors py-2">Menu</a>
          <a href="#about" className="text-brunch-brownLight dark:text-brunch-cream/80 font-medium hover:text-brunch-brown dark:hover:text-brunch-cream transition-colors py-2">About</a>
          <a href="#location" className="text-brunch-brownLight dark:text-brunch-cream/80 font-medium hover:text-brunch-brown dark:hover:text-brunch-cream transition-colors py-2">Visit</a>
          <DarkModeToggle />
          <a href="#reserve" className="btn-primary text-sm px-6 py-3">Reserve a Table</a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <DarkModeToggle />
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="text-2xl text-brunch-brown dark:text-brunch-cream">☰</span>
          </button>
        </div>
      </nav>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  )
}

// ═══════════════════════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════════════════════
function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 px-4 md:px-16 pt-24 pb-8 md:pt-32 md:pb-16 max-w-7xl mx-auto items-center">
      {/* Content */}
      <div className="text-center lg:text-left">
        <p className="section-tag">Denver&apos;s Favorite Brunch Spot</p>
        
        <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-tight text-brunch-brown dark:text-brunch-cream mb-6">
          Start Your Day
          <br />
          <span className="text-brunch-terracotta">Sunny Side Up</span>
        </h1>
        
        <p className="text-lg md:text-xl text-brunch-brownLight dark:text-brunch-cream/80 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
          Farm-fresh breakfast & brunch in the heart of RiNo. 
          Good vibes, great coffee, and food that makes you smile.
        </p>
        
        <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
          <a href="#menu" className="btn-primary">View Menu</a>
          <a href="#reserve" className="btn-secondary">Make Reservation</a>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl animate-float">
          <Image
            src="https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&h=500&fit=crop"
            alt="Delicious brunch spread with fresh eggs, avocado toast, and fresh juice"
            width={600}
            height={500}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
        {/* Decorative background */}
        <div className="hidden lg:block absolute -top-5 -right-5 w-full h-full bg-brunch-peach dark:bg-brunch-terracotta/20 rounded-3xl -z-10" aria-hidden="true" />
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// FEATURES MARQUEE
// ═══════════════════════════════════════════════════════════════
function FeaturesMarquee() {
  const features = [
    { icon: Leaf, text: 'Locally Sourced' },
    { icon: Coffee, text: 'Fresh Roasted Coffee' },
    { icon: Apple, text: 'Veggie Friendly' },
    { icon: Mountain, text: 'Mountain Views' },
    { icon: UtensilsCrossed, text: 'Made Fresh Daily' },
    { icon: Heart, text: 'Family Owned' },
  ]

  return (
    <section className="py-4 bg-brunch-sageDark overflow-hidden" aria-label="Restaurant features">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...features, ...features].map((feature, i) => {
          const IconComponent = feature.icon
          return (
            <div key={i} className="flex items-center gap-2 text-white font-semibold px-4">
              <IconComponent className="w-5 h-5" aria-hidden="true" />
              <span>{feature.text}</span>
              <span className="text-white/50 mx-4" aria-hidden="true">✦</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// ABOUT SECTION
// ═══════════════════════════════════════════════════════════════
function About() {
  return (
    <section id="about" className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 px-4 md:px-16 py-16 md:py-24 max-w-7xl mx-auto items-center" aria-labelledby="about-heading">
      {/* Image */}
      <div className="relative rounded-3xl overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=500&h=600&fit=crop"
          alt="Sunny restaurant interior with natural light and modern decor"
          width={500}
          height={600}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Content */}
      <div>
        <p className="section-tag">Our Story</p>
        <h2 id="about-heading" className="section-title dark:text-brunch-cream mb-6">Where Every Morning Feels Like Sunday</h2>
        
        <p className="text-lg text-brunch-brownLight dark:text-brunch-cream/80 leading-relaxed mb-4">
          We started Sunny Side in 2019 with a simple idea: breakfast should make you happy. 
          Not just fed — genuinely, ridiculously happy.
        </p>
        
        <p className="text-lg text-brunch-brownLight dark:text-brunch-cream/80 leading-relaxed mb-8">
          Our team sources ingredients from Colorado farms, roasts our coffee in-house, 
          and treats every guest like a neighbor popping by for a bite. Whether you&apos;re 
          fueling up for a mountain adventure or recovering from one, we&apos;ve got you.
        </p>
        
        <div className="flex flex-col">
          <span className="font-display text-xl italic text-brunch-brown dark:text-brunch-cream">— Maria & Jake</span>
          <span className="text-brunch-brownLight dark:text-brunch-cream/70 text-sm mt-1">Founders</span>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// MENU SECTION
// ═══════════════════════════════════════════════════════════════
function Menu() {
  return (
    <section id="menu" className="px-4 md:px-16 py-16 md:py-24 bg-brunch-white dark:bg-[#252019]" aria-labelledby="menu-heading">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="section-tag">The Good Stuff</p>
        <h2 id="menu-heading" className="section-title dark:text-brunch-cream mb-4">Menu Highlights</h2>
        <p className="text-lg text-brunch-brownLight dark:text-brunch-cream/80">
          Can&apos;t-miss dishes that keep our regulars coming back every weekend
        </p>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {menuHighlights.map((item) => (
          <article key={item.name} className="menu-card bg-brunch-cream dark:bg-[#2A2320] rounded-2xl overflow-hidden shadow-md">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              {item.tag && (
                <span className="absolute top-3 left-3 bg-brunch-terracotta text-white text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
                  {item.tag}
                </span>
              )}
            </div>
            
            {/* Content */}
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-display text-lg font-medium text-brunch-brown dark:text-brunch-cream">{item.name}</h3>
                <span className="text-brunch-terracotta font-semibold">{item.price}</span>
              </div>
              <p className="text-sm text-brunch-brownLight dark:text-brunch-cream/70 leading-relaxed">{item.description}</p>
            </div>
          </article>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <a href="#" className="btn-outline">See Full Menu →</a>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// LOCATION SECTION
// ═══════════════════════════════════════════════════════════════
function Location() {
  return (
    <section id="location" className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 px-4 md:px-16 py-16 md:py-24 max-w-7xl mx-auto" aria-labelledby="location-heading">
      {/* Content */}
      <div>
        <p className="section-tag">Find Us</p>
        <h2 id="location-heading" className="section-title dark:text-brunch-cream mb-8">In the Heart of RiNo</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-brunch-terracotta text-xs font-semibold uppercase tracking-widest mb-2">Address</h3>
            <address className="text-brunch-brownLight dark:text-brunch-cream/80 leading-relaxed not-italic">
              2850 Larimer Street<br />
              Denver, CO 80205
            </address>
          </div>
          <div>
            <h3 className="text-brunch-terracotta text-xs font-semibold uppercase tracking-widest mb-2">Hours</h3>
            <p className="text-brunch-brownLight dark:text-brunch-cream/80 leading-relaxed">
              Mon–Fri: 7am – 3pm<br />
              Sat–Sun: 8am – 4pm
            </p>
          </div>
          <div>
            <h3 className="text-brunch-terracotta text-xs font-semibold uppercase tracking-widest mb-2">Contact</h3>
            <p className="text-brunch-brownLight dark:text-brunch-cream/80 leading-relaxed">
              <a href="tel:+13035550147" className="hover:text-brunch-terracotta transition-colors">(303) 555-0147</a><br />
              <a href="mailto:hello@sunnysidedenver.com" className="hover:text-brunch-terracotta transition-colors">hello@sunnysidedenver.com</a>
            </p>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-brunch-sage dark:bg-brunch-sageDark rounded-2xl flex items-center justify-center min-h-[300px]">
        <div className="text-center text-white">
          <span className="text-5xl block mb-4" aria-hidden="true">📍</span>
          <p className="text-xl font-semibold mb-4">RiNo Arts District</p>
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-white underline hover:no-underline">
            Get Directions →
          </a>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// RESERVE CTA SECTION
// ═══════════════════════════════════════════════════════════════
function Reserve() {
  return (
    <section id="reserve" className="relative bg-brunch-peach dark:bg-brunch-terracotta/20 py-16 md:py-24 px-4 text-center overflow-hidden" aria-labelledby="reserve-heading">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-radial from-white/10 to-transparent animate-pulse-bg" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto">
        <h2 id="reserve-heading" className="font-display text-[clamp(2rem,4vw,2.75rem)] font-medium text-brunch-brown dark:text-brunch-cream mb-4">
          Ready for the Best Brunch in Denver?
        </h2>
        <p className="text-lg text-brunch-brownLight dark:text-brunch-cream/80 mb-8">
          Walk-ins welcome, but weekends fill up fast. 
          Reserve ahead and skip the wait.
        </p>
        <a href="#" className="inline-block bg-brunch-brown dark:bg-brunch-terracotta text-white px-10 py-5 rounded-full font-semibold text-lg hover:bg-brunch-brownLight dark:hover:bg-brunch-terracottaDark transition-all min-h-[44px]">
          Book a Table
        </a>
        <p className="text-brunch-brownLight dark:text-brunch-cream/70 mt-4">
          Or call us at <a href="tel:+13035550147" className="hover:text-brunch-brown dark:hover:text-brunch-terracotta transition-colors">(303) 555-0147</a>
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// INSTAGRAM SECTION
// ═══════════════════════════════════════════════════════════════
function Instagram() {
  return (
    <section className="px-4 md:px-16 py-16 md:py-24 bg-brunch-white dark:bg-[#252019]" aria-labelledby="instagram-heading">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="section-tag">Follow Along</p>
        <h2 id="instagram-heading" className="section-title dark:text-brunch-cream">@SunnySideDenver</h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-1 max-w-6xl mx-auto mb-8">
        {instagramPosts.map((post, i) => (
          <a 
            key={i} 
            href="https://instagram.com/sunnysidedenver" 
            target="_blank" 
            rel="noopener noreferrer"
            className="instagram-item relative aspect-square overflow-hidden cursor-pointer block"
            aria-label={post.caption}
          >
            <Image
              src={post.image}
              alt=""
              fill
              className="object-cover transition-transform duration-500"
              sizes="(max-width: 768px) 33vw, 16vw"
            />
            <div className="instagram-overlay absolute inset-0 bg-brunch-terracotta/90 flex items-center justify-center opacity-0 transition-opacity duration-300">
              <span className="text-white font-semibold text-sm text-center px-4">{post.caption}</span>
            </div>
          </a>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <a href="https://instagram.com/sunnysidedenver" target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center gap-2 group">
          <span>Follow on Instagram</span>
          <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════
function Footer() {
  return (
    <footer className="bg-brunch-brown dark:bg-[#151210] px-4 md:px-16 py-12 md:py-16">
      {/* Top */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 max-w-6xl mx-auto pb-8 border-b border-white/10">
        {/* Brand */}
        <div>
          <span className="font-display text-2xl text-white font-semibold">☀️ Sunny Side</span>
          <p className="text-white/60 mt-2">Denver&apos;s happiest breakfast.</p>
        </div>

        {/* Links */}
        <nav className="flex gap-8 flex-wrap" aria-label="Footer navigation">
          {['Menu', 'About', 'Catering', 'Careers'].map((link) => (
            <a key={link} href="#" className="text-white/80 hover:text-white transition-colors py-1">
              {link}
            </a>
          ))}
        </nav>

        {/* Social */}
        <nav className="flex gap-6" aria-label="Social media links">
          <a href="#" className="text-white/80 hover:text-white transition-colors py-1" aria-label="Follow us on Instagram">
            <InstagramIcon className="w-5 h-5" />
          </a>
          <a href="#" className="text-white/80 hover:text-white transition-colors py-1" aria-label="Follow us on Facebook">
            <FacebookIcon className="w-5 h-5" />
          </a>
          <a href="#" className="text-white/80 hover:text-white transition-colors py-1" aria-label="Follow us on TikTok">
            <Music2 className="w-5 h-5" />
          </a>
        </nav>
      </div>

      {/* Bottom */}
      <div className="text-center pt-8 max-w-6xl mx-auto">
        <p className="text-white/50 text-sm flex items-center justify-center gap-1">© 2026 Sunny Side Denver. Made with <UtensilsCrossed className="w-4 h-4 inline" /> in Colorado.</p>
      </div>
    </footer>
  )
}

// ═══════════════════════════════════════════════════════════════
// STRUCTURED DATA
// ═══════════════════════════════════════════════════════════════
function StructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Sunny Side',
    description: 'Farm-fresh breakfast & brunch in the heart of RiNo. Good vibes, great coffee, and food that makes you smile.',
    url: 'https://sunnysidedenver.com',
    telephone: '+1-303-555-0147',
    email: 'hello@sunnysidedenver.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2850 Larimer Street',
      addressLocality: 'Denver',
      addressRegion: 'CO',
      postalCode: '80205',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 39.7648,
      longitude: -104.9808,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '15:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '08:00',
        closes: '16:00',
      },
    ],
    servesCuisine: ['American', 'Brunch', 'Breakfast'],
    priceRange: '$$',
    acceptsReservations: true,
    sameAs: [
      'https://instagram.com/sunnysidedenver',
      'https://facebook.com/sunnysidedenver',
      'https://tiktok.com/@sunnysidedenver',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE EXPORT
// ═══════════════════════════════════════════════════════════════
export default function BrunchPage() {
  return (
    <>
      <StructuredData />
      <SkipLink />
      <Nav />
      <main id="main-content">
        <Hero />
        <FeaturesMarquee />
        <About />
        <Menu />
        <Location />
        <Reserve />
        <Instagram />
      </main>
      <Footer />
    </>
  )
}
