'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Home as HomeIcon, Hammer, Wrench, Paintbrush, Check, Facebook, Instagram } from 'lucide-react'

// ═══════════════════════════════════════════════════════════════
// CONTRACTOR STARTER TEMPLATE
// Professional, trust-building site for contractors & tradespeople
// Designed for credibility and lead conversion
// ═══════════════════════════════════════════════════════════════

// TypeScript interfaces
interface Service {
  icon: React.ReactNode
  name: string
  description: string
  features: string[]
}

interface Project {
  title: string
  category: string
  description: string
  image: string
}

interface Testimonial {
  quote: string
  author: string
  location: string
  rating: number
  project: string
}

interface FAQItem {
  q: string
  a: string
}

interface AnimationVariant {
  initial: { opacity: number; y?: number; scale?: number }
  animate: { opacity: number; y?: number; scale?: number }
  transition: { duration: number; ease?: number[]; delay?: number }
}

const COMPANY = {
  name: "BuildRight Construction",
  tagline: "Quality Craftsmanship, Honest Service",
  phone: "(555) 987-6543",
  email: "info@buildright.com",
  license: "License #ABC123456",
  insurance: "Fully Insured & Bonded",
  yearsInBusiness: 15,
  projectsCompleted: 500,
  heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&h=1080&fit=crop&q=90",
}

const SERVICES: Service[] = [
  {
    icon: <HomeIcon className="w-7 h-7 text-primary-600" />,
    name: 'Home Remodeling',
    description: 'Complete home renovations from concept to completion. We transform your vision into reality with expert craftsmanship.',
    features: ['Kitchen Remodels', 'Bathroom Renovations', 'Basement Finishing', 'Room Additions'],
  },
  {
    icon: <Hammer className="w-7 h-7 text-primary-600" />,
    name: 'New Construction',
    description: 'Custom home building and commercial construction. Quality materials and expert craftsmanship on every project.',
    features: ['Custom Homes', 'Garages & Workshops', 'Commercial Buildings', 'Accessory Dwelling Units'],
  },
  {
    icon: <Wrench className="w-7 h-7 text-primary-600" />,
    name: 'Repairs & Maintenance',
    description: 'From minor repairs to major fixes, we handle it all with fast response times and reliable service.',
    features: ['Drywall Repair', 'Deck & Fence Repair', 'Door & Window Installation', 'General Handyman'],
  },
  {
    icon: <Paintbrush className="w-7 h-7 text-primary-600" />,
    name: 'Exterior Work',
    description: 'Boost your curb appeal and protect your investment with quality exterior improvements.',
    features: ['Siding Installation', 'Roofing', 'Deck Building', 'Outdoor Living Spaces'],
  },
]

const PROJECTS: Project[] = [
  { 
    title: 'Modern Kitchen Remodel', 
    category: 'Kitchen',
    description: 'Complete kitchen transformation with custom cabinetry',
    image: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=800&h=600&fit=crop&q=85'
  },
  { 
    title: 'Master Bathroom Renovation', 
    category: 'Bathroom',
    description: 'Luxury spa-inspired bathroom redesign',
    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop&q=85'
  },
  { 
    title: 'Backyard Deck Build', 
    category: 'Outdoor',
    description: 'Custom composite deck with built-in seating',
    image: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800&h=600&fit=crop&q=85'
  },
  { 
    title: 'Basement Finishing', 
    category: 'Basement',
    description: 'Full basement conversion with home theater',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&q=85'
  },
]

const TESTIMONIALS: Testimonial[] = [
  { 
    quote: "BuildRight completely transformed our kitchen. Professional from start to finish, and they finished ahead of schedule!", 
    author: "Jennifer M.", 
    location: "Denver, CO", 
    rating: 5,
    project: "Kitchen Remodel"
  },
  { 
    quote: "Honest, reliable, and skilled. They fixed issues that other contractors missed. Highly recommend!", 
    author: "Michael S.", 
    location: "Aurora, CO", 
    rating: 5,
    project: "Home Repair"
  },
  { 
    quote: "Our deck is beautiful and built to last. Fair price, great communication, quality work.", 
    author: "David & Lisa T.", 
    location: "Lakewood, CO", 
    rating: 5,
    project: "Deck Build"
  },
]

const SERVICE_AREAS = ["Denver", "Aurora", "Lakewood", "Littleton", "Centennial", "Englewood", "Golden", "Arvada", "Westminster", "Thornton"]

const FAQ: FAQItem[] = [
  { 
    q: "Are you licensed and insured?", 
    a: "Yes! We are fully licensed (License #ABC123456) and carry comprehensive liability insurance and workers' compensation coverage. We're happy to provide documentation upon request." 
  },
  { 
    q: "Do you offer free estimates?", 
    a: "Absolutely. We provide free, no-obligation estimates for all projects. We'll visit your property, discuss your needs, and provide a detailed written quote within 48 hours." 
  },
  { 
    q: "What is your typical timeline?", 
    a: "Timelines vary by project scope. A bathroom remodel typically takes 2-3 weeks, while a kitchen remodel may take 4-6 weeks. We'll provide a detailed timeline in your estimate." 
  },
  { 
    q: "Do you pull permits?", 
    a: "Yes, we handle all necessary permits and inspections. This ensures your project meets local building codes and protects your investment." 
  },
  { 
    q: "What warranty do you offer?", 
    a: "We stand behind our work with a 2-year workmanship warranty. Many of the materials we use also come with manufacturer warranties extending up to 25 years." 
  },
]

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
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
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-md dark:bg-dark-900/95' 
        : 'bg-white shadow-sm dark:bg-dark-900'
    }`}>
      <nav aria-label="Main navigation" className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="font-display text-xl text-dark-900 flex items-center gap-2">
            <span className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white text-lg font-bold">
              B
            </span>
            <span className="hidden sm:inline">{COMPANY.name}</span>
          </a>
          
          <div className="hidden lg:flex items-center gap-8">
            {['Services', 'Work', 'About', 'FAQ'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="nav-link"
              >
                {item === 'Work' ? 'Our Work' : item}
              </a>
            ))}
          </div>
          
          <div className="hidden lg:flex items-center gap-4">
            <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-2 font-semibold text-primary-600 hover:text-primary-700 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {COMPANY.phone}
            </a>
            <a href="#quote" className="btn-primary text-sm">Get Free Quote</a>
          </div>
          
          <button 
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              id="mobile-menu"
              role="navigation"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden border-t border-gray-100"
            >
              <div className="py-6 space-y-4">
                {['Services', 'Our Work', 'About', 'FAQ'].map((item) => (
                  <a 
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`} 
                    className="block text-gray-600 hover:text-primary-600 font-medium transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-2 font-semibold text-primary-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {COMPANY.phone}
                  </a>
                  <a href="#quote" className="btn-primary text-center block">Get Free Quote</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  
  return (
    <section className="relative pt-20">
      {/* Background with parallax */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image 
          src={COMPANY.heroImage} 
          alt="Professional construction workers on site demonstrating quality craftsmanship" 
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950/80 via-dark-950/60 to-dark-950/40" />
      </motion.div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-32 lg:py-40">
        <motion.div 
          initial="initial" 
          animate="animate" 
          variants={staggerContainer}
          className="max-w-2xl"
        >
          {/* Trust badges */}
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 mb-8">
            <span className="trust-badge-light">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {COMPANY.license}
            </span>
            <span className="trust-badge-light">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {COMPANY.insurance}
            </span>
          </motion.div>
          
          {/* Headline */}
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            {COMPANY.tagline}
          </motion.h1>
          
          {/* Description */}
          <motion.p variants={fadeInUp} className="text-xl text-gray-300 mb-10 leading-relaxed">
            Trusted by homeowners for over {COMPANY.yearsInBusiness} years. From small repairs to complete renovations, we deliver quality work on time and on budget.
          </motion.p>
          
          {/* CTAs */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
            <a href="#quote" className="btn-accent text-lg group">
              Get Your Free Estimate
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href={`tel:${COMPANY.phone}`} className="btn-secondary bg-white text-lg group">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call {COMPANY.phone}
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Stats bar */}
      <div className="stats-bar relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {[
              { number: `${COMPANY.yearsInBusiness}+`, label: 'Years Experience' },
              { number: `${COMPANY.projectsCompleted}+`, label: 'Projects Completed' },
              { number: '5.0', label: 'Google Rating' },
              { number: '100%', label: 'Satisfaction Guarantee' },
            ].map((stat, i) => (
              <div key={i} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="section-padding bg-[rgb(var(--muted))]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-eyebrow">What We Do</span>
          <h2 className="section-title">Our Services</h2>
          <p className="section-description mx-auto">
            From minor repairs to major renovations, we have the skills and experience to handle any project with precision and care.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 gap-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {SERVICES.map((service, i) => (
            <motion.div 
              key={i}
              variants={fadeInUp}
              className="service-card group"
            >
              <div className="service-card-icon">
                {service.icon}
              </div>
              <h3 className="service-card-title">{service.name}</h3>
              <p className="service-card-description">{service.description}</p>
              <ul className="service-card-features">
                {service.features.map((f, j) => (
                  <li key={j} className="service-card-feature">
                    <span className="service-card-feature-check">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-600">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Portfolio() {
  return (
    <section id="work" className="section-padding bg-[rgb(var(--background))]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-eyebrow">Portfolio</span>
          <h2 className="section-title">Our Work</h2>
          <p className="section-description mx-auto">
            See the quality of our craftsmanship in these recent projects.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {PROJECTS.map((project, i) => (
            <motion.div key={i} variants={scaleIn} className="project-card group">
              <div className="project-card-image relative">
                <Image 
                  src={project.image}
                  alt={`${project.title} - ${project.description}`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <span className="project-card-badge">
                  {project.category}
                </span>
              </div>
              <div className="project-card-content">
                <h3 className="project-card-title">{project.title}</h3>
                <p className="text-[rgb(var(--muted-foreground))] text-sm mt-1">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a href="#quote" className="btn-primary group">
            Get a Quote for Your Project
            <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section className="section-padding bg-primary-600 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl text-white mb-4">What Our Customers Say</h2>
          <div className="flex items-center justify-center gap-1 text-accent-400 text-2xl mb-2">
            {'★★★★★'}
          </div>
          <p className="text-primary-100">5.0 rating from 150+ Google reviews</p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} variants={fadeInUp} className="testimonial-card">
              <div className="testimonial-stars">{'★'.repeat(t.rating)}</div>
              <p className="testimonial-quote">"{t.quote}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="testimonial-author">{t.author}</div>
                  <div className="testimonial-location">{t.location}</div>
                </div>
                <span className="text-xs text-primary-200 bg-white/10 px-2 py-1 rounded-full">
                  {t.project}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Review links */}
        <motion.div 
          className="mt-12 flex flex-wrap items-center justify-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {[
            { name: 'Google', rating: '5.0' },
            { name: 'Yelp', rating: '4.9' },
            { name: 'Angi', rating: '4.8' },
          ].map((platform) => (
            <a 
              key={platform.name}
              href="#" 
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
            >
              <span className="font-medium">{platform.rating} on {platform.name}</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function QuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  return (
    <section id="quote" className="section-padding bg-[rgb(var(--muted))]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          className="quote-form-wrapper p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-10">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-100 mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </span>
            <h2 className="section-title">Get Your Free Estimate</h2>
            <p className="text-[rgb(var(--muted-foreground))] text-lg">
              Tell us about your project and we'll get back to you within 24 hours.
            </p>
          </div>
          
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="form-group">
                <label htmlFor="quote-name" className="form-label">Name *</label>
                <input type="text" id="quote-name" name="name" required className="form-input" placeholder="John Smith" autoComplete="name" />
              </div>
              <div className="form-group">
                <label htmlFor="quote-phone" className="form-label">Phone *</label>
                <input type="tel" id="quote-phone" name="phone" required className="form-input" placeholder="(555) 123-4567" autoComplete="tel" />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="quote-email" className="form-label">Email *</label>
              <input type="email" id="quote-email" name="email" required className="form-input" placeholder="john@example.com" autoComplete="email" />
            </div>
            
            <div className="form-group">
              <label htmlFor="quote-project-type" className="form-label">Type of Project *</label>
              <select id="quote-project-type" name="projectType" required className="form-select">
                <option value="">Select a service...</option>
                <option value="kitchen">Kitchen Remodel</option>
                <option value="bathroom">Bathroom Remodel</option>
                <option value="basement">Basement Finishing</option>
                <option value="addition">Room Addition</option>
                <option value="outdoor">Deck/Outdoor</option>
                <option value="repairs">Repairs/Maintenance</option>
                <option value="construction">New Construction</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="quote-description" className="form-label">Project Description *</label>
              <textarea 
                id="quote-description"
                name="description"
                rows={4} 
                required 
                className="form-textarea" 
                placeholder="Tell us about your project, including any specific requirements or timeline..."
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="quote-address" className="form-label">Address (for on-site estimate)</label>
              <input 
                type="text" 
                id="quote-address"
                name="address"
                className="form-input" 
                placeholder="123 Main St, Denver, CO 80202"
                autoComplete="street-address"
              />
            </div>
            
            <button 
              type="submit" 
              className="btn-primary w-full text-lg group"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                <>
                  Request Free Estimate
                  <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>
            
            <p className="text-center text-sm text-[rgb(var(--muted-foreground))]">
              🔒 We respect your privacy. Your information will never be shared.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  
  return (
    <section id="faq" className="section-padding bg-[rgb(var(--background))]">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-eyebrow">FAQ</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
        </motion.div>
        
        <motion.div 
          className="space-y-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {FAQ.map((item, i) => (
            <motion.div key={i} variants={fadeInUp} className="faq-item">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="faq-button"
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-button-${i}`}
              >
                <span>{item.q}</span>
                <span className={`faq-icon ${openIndex === i ? 'faq-icon-open' : ''}`} aria-hidden="true">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-button-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="faq-answer">{item.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ServiceArea() {
  return (
    <section id="about" className="section-padding bg-[rgb(var(--muted))]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-eyebrow">About Us</span>
            <h2 className="section-title mb-6">
              Proudly Serving the Denver Metro Area
            </h2>
            <p className="text-[rgb(var(--muted-foreground))] text-lg mb-8">
              For over {COMPANY.yearsInBusiness} years, we've been helping homeowners throughout the Denver area with quality construction and remodeling services. Our commitment to excellence has earned us a reputation as one of the most trusted contractors in the region.
            </p>
            
            {/* Service area chips */}
            <div className="flex flex-wrap gap-2 mb-10">
              {SERVICE_AREAS.map((area, i) => (
                <span key={i} className="location-chip">{area}</span>
              ))}
            </div>
            
            {/* Credentials */}
            <div className="space-y-3">
              {[
                COMPANY.license,
                COMPANY.insurance,
                'BBB A+ Rating',
                '2-Year Workmanship Warranty',
              ].map((text, i) => (
                <div key={i} className="credential-item">
                  <div className="credential-icon">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Map placeholder */}
            <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center relative overflow-hidden">
              <div className="text-center">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span className="text-gray-500 font-medium">Service Area Map</span>
              </div>
            </div>
            
            {/* Floating card */}
            <motion.div 
              className="absolute -bottom-6 -left-6 bg-white p-5 rounded-xl shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-dark-900">10+</div>
                  <div className="text-sm text-gray-500">Cities Served</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-dark-900 text-white">
      {/* CTA strip */}
      <div className="bg-primary-600 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">Ready to start your project?</h3>
              <p className="text-primary-100">Get a free estimate today.</p>
            </div>
            <a href="#quote" className="btn-accent">
              Get Free Estimate
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white text-lg font-bold">
                B
              </span>
              <span className="font-display text-xl">{COMPANY.name}</span>
            </div>
            <p className="text-gray-400 text-sm mb-4 max-w-sm">{COMPANY.tagline}</p>
            <div className="text-sm text-gray-500 space-y-1 mb-6">
              <p>{COMPANY.license}</p>
              <p>{COMPANY.insurance}</p>
            </div>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                aria-label="Follow us on Facebook"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary-600 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
              <a 
                href="#" 
                aria-label="Follow us on Instagram"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary-600 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <address className="space-y-3 text-gray-400 text-sm not-italic">
              <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{COMPANY.phone}</span>
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{COMPANY.email}</span>
              </a>
            </address>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Hours</h4>
            <div className="text-gray-400 text-sm space-y-1">
              <p>Monday - Friday: 7am - 6pm</p>
              <p>Saturday: 8am - 4pm</p>
              <p>Sunday: Closed</p>
              <p className="mt-3 text-primary-400 font-medium">24/7 Emergency Service</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} {COMPANY.name}. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex items-center gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-900 rounded">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-900 rounded">Terms of Service</a>
          </nav>
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
      {/* Skip link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        Skip to main content
      </a>
      <Nav />
      <main id="main-content" className="overflow-hidden">
        <Hero />
        <Services />
        <Portfolio />
        <TestimonialsSection />
        <QuoteForm />
        <FAQSection />
        <ServiceArea />
      </main>
      <Footer />
    </>
  )
}
