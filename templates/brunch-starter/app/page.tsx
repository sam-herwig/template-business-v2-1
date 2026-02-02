'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ShoppingBag, 
  CalendarDays, 
  MapPin, 
  Instagram, 
  X,
  ChevronRight,
  Clock,
  Phone,
  Mail,
  ExternalLink,
  Sparkles
} from 'lucide-react'
import { Nav, Footer } from './_components'

// ═══════════════════════════════════════════════════════════════
// DATA - Would come from Sanity CMS in production
// ═══════════════════════════════════════════════════════════════

const siteConfig = {
  name: 'Sunny Side',
  tagline: "Denver's Favorite Brunch Spot",
  description: 'Farm-fresh breakfast & brunch in the heart of RiNo. Good vibes, great coffee, and food that makes you smile.',
  phone: '(303) 555-0147',
  email: 'hello@sunnysidedenver.com',
  address: {
    street: '2850 Larimer Street',
    city: 'Denver',
    state: 'CO',
    zip: '80205',
    neighborhood: 'RiNo Arts District',
  },
  hours: {
    weekday: '7am - 3pm',
    weekend: '8am - 4pm',
  },
  social: {
    instagram: 'https://instagram.com/sunnysidedenver',
    facebook: 'https://facebook.com/sunnysidedenver',
    tiktok: 'https://tiktok.com/@sunnysidedenver',
  },
  instagramHandle: '@SunnySideDenver',
}

const announcement = {
  active: true,
  message: '🥞 New: Pumpkin Spice Pancakes — Limited Time!',
  link: '/menu',
}

const menuHighlights = [
  {
    name: 'The Denver Scramble',
    description: 'Farm eggs, green chili, pepper jack, avocado, crispy potatoes',
    price: 16,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop',
    badge: 'favorite',
  },
  {
    name: 'Buttermilk Stack',
    description: 'Three fluffy pancakes, whipped butter, pure maple syrup',
    price: 14,
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
    badge: null,
  },
  {
    name: 'Avocado Toast',
    description: 'Sourdough, smashed avo, everything seasoning, poached eggs',
    price: 15,
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop',
    badge: 'veg',
  },
  {
    name: 'Huevos Rancheros',
    description: 'Crispy tortillas, black beans, ranchero sauce, queso fresco',
    price: 17,
    image: 'https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?w=400&h=300&fit=crop',
    badge: 'spicy',
  },
]

const instagramPosts = [
  { image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400&h=400&fit=crop', caption: 'Sunday morning vibes ☀️' },
  { image: 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=400&h=400&fit=crop', caption: 'Fresh from the garden 🌿' },
  { image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=400&fit=crop', caption: 'Stack em high 🥞' },
  { image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=400&fit=crop', caption: 'Brunch squad goals 👯' },
  { image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop', caption: 'Coffee first ☕' },
  { image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop', caption: 'Sweet treats 🍩' },
]

// ═══════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════

function formatPrice(price: number) {
  return `$${price}`
}

function getBadgeLabel(badge: string | null) {
  switch (badge) {
    case 'new': return 'New ✨'
    case 'veg': return 'Veggie 🌿'
    case 'spicy': return 'Spicy 🔥'
    case 'favorite': return 'Fan Favorite'
    default: return null
  }
}

function getBadgeClass(badge: string | null) {
  switch (badge) {
    case 'new': return 'badge badge-new'
    case 'veg': return 'badge badge-veg'
    case 'spicy': return 'badge badge-spicy'
    case 'favorite': return 'badge badge-favorite'
    default: return ''
  }
}

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
// ANNOUNCEMENT BAR
// ═══════════════════════════════════════════════════════════════

function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!announcement.active || !isVisible) return null

  return (
    <div className="announcement-bar bg-sage text-white relative">
      <Link href={announcement.link} className="hover:underline">
        {announcement.message}
      </Link>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
        aria-label="Dismiss announcement"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════════════════════

function Hero() {
  return (
    <section className="relative min-h-[90vh] pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
      {/* Background texture */}
      <div className="texture-paper" aria-hidden="true" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content */}
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-tag">{siteConfig.tagline}</p>
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-charcoal dark:text-cream mb-6 leading-tight">
              Start Your Day
              <br />
              <span className="text-coral">Sunny Side Up</span>
            </h1>
            
            <p className="text-lg md:text-xl text-charcoal-light dark:text-cream/80 max-w-lg mx-auto lg:mx-0 mb-8">
              {siteConfig.description}
            </p>
            
            <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
              <Link href="/menu" className="btn-primary">
                <ShoppingBag className="w-5 h-5" />
                Order Online
              </Link>
              <Link href="/contact#reserve" className="btn-secondary">
                Make a Reservation
              </Link>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Decorative blob */}
            <div 
              className="hidden lg:block absolute -top-6 -right-6 w-full h-full bg-peach dark:bg-coral/20 rounded-3xl -z-10"
              aria-hidden="true"
            />
            
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden shadow-hero animate-float">
              <Image
                src="https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&h=500&fit=crop"
                alt="Delicious brunch spread with fresh eggs, avocado toast, and fresh juice"
                width={600}
                height={500}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            
            {/* Floating polaroid */}
            <motion.div 
              className="hidden lg:block absolute -bottom-8 -left-8 w-32"
              initial={{ opacity: 0, rotate: -15 }}
              animate={{ opacity: 1, rotate: -5 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="polaroid">
                <Image
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=150&h=150&fit=crop"
                  alt="Beautiful latte art"
                  width={150}
                  height={150}
                  className="rounded"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// QUICK ACTIONS BAR
// ═══════════════════════════════════════════════════════════════

function QuickActions() {
  const actions = [
    { icon: ShoppingBag, label: 'Order Online', href: '/menu' },
    { icon: CalendarDays, label: 'Reservations', href: '/contact#reserve' },
    { icon: MapPin, label: 'Find Us', href: '/contact' },
  ]

  return (
    <section className="relative -mt-10 z-10 px-4 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-dark-elevated rounded-2xl shadow-card p-5 lg:p-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {actions.map((action, index) => (
            <Link
              key={action.label}
              href={action.href}
              className={`quick-action flex-1 justify-center sm:justify-start ${
                index < actions.length - 1 ? 'sm:border-r border-charcoal/10 dark:border-white/10' : ''
              }`}
            >
              <action.icon className="w-6 h-6 text-coral" />
              <span className="font-body font-medium text-charcoal dark:text-cream">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// ABOUT SECTION
// ═══════════════════════════════════════════════════════════════

function About() {
  return (
    <section id="about" className="section-padding" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-3xl rounded-tr-[48px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=500&h=600&fit=crop"
                alt="Sunny restaurant interior with natural light and modern decor"
                width={500}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Polaroid accent */}
            <motion.div 
              className="hidden lg:block absolute -bottom-6 -right-6 w-40"
              initial={{ opacity: 0, rotate: 10 }}
              whileInView={{ opacity: 1, rotate: 5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="polaroid" style={{ transform: 'rotate(5deg)' }}>
                <Image
                  src="https://images.unsplash.com/photo-1551024506-0bccd828d307?w=180&h=180&fit=crop"
                  alt="Fresh pastries"
                  width={180}
                  height={180}
                  className="rounded"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-tag">Our Story</p>
            <h2 id="about-heading" className="font-display text-3xl md:text-4xl text-charcoal dark:text-cream mb-6">
              Where Every Morning Feels Like Sunday
            </h2>
            
            <p className="text-lg text-charcoal-light dark:text-cream/80 leading-relaxed mb-4">
              We started Sunny Side in 2019 with a simple idea: breakfast should make you happy. 
              Not just fed — genuinely, ridiculously happy.
            </p>
            
            <p className="text-lg text-charcoal-light dark:text-cream/80 leading-relaxed mb-8">
              Our team sources ingredients from Colorado farms, roasts our coffee in-house, 
              and treats every guest like a neighbor popping by for a bite.
            </p>
            
            <Link href="/about" className="btn-text group">
              Learn More About Us
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// MENU HIGHLIGHTS SECTION
// ═══════════════════════════════════════════════════════════════

function MenuHighlights() {
  return (
    <section id="menu" className="section-padding bg-white dark:bg-dark-card" aria-labelledby="menu-heading">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-tag">The Good Stuff</p>
          <h2 id="menu-heading" className="font-display text-3xl md:text-4xl text-charcoal dark:text-cream mb-4">
            Menu Favorites
          </h2>
          <p className="text-lg text-charcoal-light dark:text-cream/80">
            Can't-miss dishes our regulars swear by
          </p>
        </motion.div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuHighlights.map((item, index) => (
            <motion.article 
              key={item.name}
              className="menu-card card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {item.badge && (
                  <span className={getBadgeClass(item.badge)}>
                    {getBadgeLabel(item.badge)}
                  </span>
                )}
              </div>
              
              {/* Content */}
              <div className="p-5">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="font-display text-lg text-charcoal dark:text-cream">
                    {item.name}
                  </h3>
                  <span className="text-coral font-semibold whitespace-nowrap">
                    {formatPrice(item.price)}
                  </span>
                </div>
                <p className="text-sm text-charcoal-light dark:text-cream/70">
                  {item.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/menu" className="btn-outline group">
            See Full Menu
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// LOCATION SECTION
// ═══════════════════════════════════════════════════════════════

function Location() {
  return (
    <section id="location" className="section-padding" aria-labelledby="location-heading">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Map Placeholder */}
          <motion.div 
            className="bg-sage dark:bg-sage/30 rounded-3xl flex items-center justify-center min-h-[400px] overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center text-white p-8">
              <MapPin className="w-12 h-12 mx-auto mb-4" />
              <p className="text-2xl font-display font-semibold mb-2">
                {siteConfig.address.neighborhood}
              </p>
              <p className="text-white/80 mb-6">
                {siteConfig.address.street}<br />
                {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
              </p>
              <a 
                href={`https://maps.google.com/?q=${encodeURIComponent(`${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.state}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white font-semibold hover:underline"
              >
                Get Directions
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-tag">Find Us</p>
            <h2 id="location-heading" className="font-display text-3xl md:text-4xl text-charcoal dark:text-cream mb-8">
              Come Hungry, Leave Happy
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-coral text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Address
                </h3>
                <address className="text-charcoal-light dark:text-cream/80 leading-relaxed not-italic">
                  {siteConfig.address.street}<br />
                  {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
                </address>
              </div>
              
              <div>
                <h3 className="text-coral text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Hours
                </h3>
                <p className="text-charcoal-light dark:text-cream/80 leading-relaxed">
                  Mon – Fri: {siteConfig.hours.weekday}<br />
                  Sat – Sun: {siteConfig.hours.weekend}
                </p>
              </div>
              
              <div>
                <h3 className="text-coral text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone
                </h3>
                <p className="text-charcoal-light dark:text-cream/80">
                  <a href={`tel:${siteConfig.phone.replace(/[^0-9]/g, '')}`} className="hover:text-coral transition-colors">
                    {siteConfig.phone}
                  </a>
                </p>
              </div>
              
              <div>
                <h3 className="text-coral text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </h3>
                <p className="text-charcoal-light dark:text-cream/80">
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-coral transition-colors">
                    {siteConfig.email}
                  </a>
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-charcoal/10 dark:border-white/10">
              <Link href="/contact#reserve" className="btn-primary">
                <CalendarDays className="w-5 h-5" />
                Book a Table
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// INSTAGRAM SECTION
// ═══════════════════════════════════════════════════════════════

function InstagramFeed() {
  return (
    <section className="section-padding bg-sage-light dark:bg-dark-card" aria-labelledby="instagram-heading">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-tag">Follow the Vibes</p>
          <h2 id="instagram-heading" className="font-display text-3xl md:text-4xl text-charcoal dark:text-cream">
            <a 
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-coral transition-colors"
            >
              {siteConfig.instagramHandle}
            </a>
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div 
          className="grid grid-cols-3 md:grid-cols-6 gap-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {instagramPosts.map((post, i) => (
            <a 
              key={i}
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-item aspect-square"
              aria-label={post.caption}
            >
              <Image
                src={post.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 16vw"
              />
              <div className="instagram-overlay">
                <Instagram className="w-6 h-6 text-white" />
              </div>
            </a>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a 
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline group"
          >
            <Instagram className="w-5 h-5" />
            Follow on Instagram
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// NEWSLETTER SECTION
// ═══════════════════════════════════════════════════════════════

function Newsletter() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  return (
    <section className="section-padding" aria-labelledby="newsletter-heading">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div 
          className="bg-peach dark:bg-coral/20 rounded-[32px] p-8 md:p-16 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Icon */}
          <span className="text-5xl mb-4 block" aria-hidden="true">🍳</span>
          
          <h2 id="newsletter-heading" className="font-display text-3xl md:text-4xl text-charcoal dark:text-cream mb-3">
            Get 10% Off Your First Order
          </h2>
          
          <p className="text-charcoal-light dark:text-cream/80 mb-8 max-w-md mx-auto">
            Plus insider updates on new dishes, events & specials. 
            Zero spam, we promise.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="input flex-1"
              required
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Sign Me Up
              <Sparkles className="w-4 h-4" />
            </button>
          </form>
          
          <p className="text-charcoal-light/70 dark:text-cream/50 text-sm mt-4">
            We promise not to spam. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// STRUCTURED DATA
// ═══════════════════════════════════════════════════════════════

function StructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: siteConfig.name,
    description: siteConfig.description,
    url: 'https://sunnysidedenver.com',
    telephone: '+1-303-555-0147',
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
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
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.tiktok,
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
      <AnnouncementBar />
      <Nav />
      <main id="main-content">
        <Hero />
        <QuickActions />
        <About />
        <MenuHighlights />
        <Location />
        <InstagramFeed />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
