'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Zap, Palette, RefreshCw, Lock, Smartphone, Rocket, Twitter, Linkedin, Instagram } from 'lucide-react'

// ═══════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════
interface GradientPoint {
  x: number
  y: number
  vx: number
  vy: number
  color: string
}

interface FeatureData {
  icon: React.ReactNode
  title: string
  description: string
}

interface TestimonialData {
  quote: string
  author: string
  role: string
}

interface StatData {
  num: string
  label: string
}

// ═══════════════════════════════════════════════════════════════
// AURORA MESH BACKGROUND
// ═══════════════════════════════════════════════════════════════
function AuroraMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    let animationId: number
    let time = 0
    
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resize()
    window.addEventListener('resize', resize)
    
    const gradientPoints: GradientPoint[] = [
      { x: 0.2, y: 0.3, vx: 0.0004, vy: 0.0003, color: '#6366f1' },
      { x: 0.8, y: 0.2, vx: -0.0003, vy: 0.0004, color: '#8b5cf6' },
      { x: 0.5, y: 0.7, vx: 0.0003, vy: -0.0003, color: '#c026d3' },
      { x: 0.3, y: 0.8, vx: 0.0002, vy: -0.0002, color: '#ec4899' },
      { x: 0.7, y: 0.5, vx: -0.0004, vy: 0.0002, color: '#06b6d4' },
      { x: 0.1, y: 0.1, vx: 0.0003, vy: 0.0003, color: '#8b5cf6' },
    ]
    
    const animate = () => {
      time += 1
      
      // Update gradient points
      gradientPoints.forEach(point => {
        point.x += point.vx + Math.sin(time * 0.01) * 0.0001
        point.y += point.vy + Math.cos(time * 0.01) * 0.0001
        
        if (point.x < 0 || point.x > 1) point.vx *= -1
        if (point.y < 0 || point.y > 1) point.vy *= -1
        
        point.x = Math.max(0, Math.min(1, point.x))
        point.y = Math.max(0, Math.min(1, point.y))
      })
      
      // Clear with dark background
      ctx.fillStyle = '#030014'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Draw radial gradients
      gradientPoints.forEach(point => {
        const gradient = ctx.createRadialGradient(
          point.x * canvas.width,
          point.y * canvas.height,
          0,
          point.x * canvas.width,
          point.y * canvas.height,
          canvas.width * 0.5
        )
        
        gradient.addColorStop(0, point.color + '70')
        gradient.addColorStop(0.4, point.color + '30')
        gradient.addColorStop(1, 'transparent')
        
        ctx.globalCompositeOperation = 'screen'
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      })
      
      animationId = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])
  
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true" />
}

// ═══════════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════════
function Nav() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-4 md:px-16 py-5 backdrop-blur-xl bg-aurora-bg/70 border-b border-white/10"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Main navigation"
    >
      <a href="/" className="flex items-center gap-3 text-2xl font-bold tracking-tight" aria-label="Lumina home">
        <span className="text-2xl gradient-text" aria-hidden="true">◈</span>
        <span>Lumina</span>
      </a>
      
      <div className="hidden md:flex items-center gap-10">
        {['Features', 'About', 'Pricing'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-white font-medium hover:text-aurora-indigo transition-colors"
          >
            {item}
          </a>
        ))}
        <motion.button 
          className="nav-cta"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Get started with Lumina"
        >
          Get Started
        </motion.button>
      </div>
    </motion.nav>
  )
}

// ═══════════════════════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════════════════════
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  return (
    <section ref={ref} className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 md:px-8 pt-32 pb-16 text-center">
      <motion.div className="max-w-4xl" style={{ y, opacity }}>
        {/* Badge */}
        <motion.div
          className="badge mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="badge-dot" />
          Now in Public Beta
        </motion.div>
        
        {/* Title */}
        <motion.h1
          className="text-[clamp(3.5rem,10vw,7rem)] font-extrabold leading-none tracking-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textShadow: '0 4px 30px rgba(0, 0, 0, 0.5)' }}
        >
          Design without
          <br />
          <span className="gradient-text">boundaries</span>
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p
          className="text-[clamp(1.15rem,2.5vw,1.5rem)] text-white/90 leading-relaxed max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)' }}
        >
          The next generation design platform that transforms your creative
          workflow with AI-powered tools and real-time collaboration.
        </motion.p>
        
        {/* CTAs */}
        <motion.div
          className="flex gap-4 justify-center flex-wrap mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <motion.button 
            className="btn-primary"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            Start Free Trial
            <span className="text-xl">→</span>
          </motion.button>
          <motion.button 
            className="btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Watch Demo
          </motion.button>
        </motion.div>
        
        {/* Stats */}
        <motion.div
          className="flex justify-center items-center gap-8 md:gap-12 flex-wrap px-6 md:px-12 py-8 rounded-3xl backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
          role="list"
          aria-label="Platform statistics"
        >
          {([
            { num: '50K+', label: 'Active Users' },
            { num: '99.9%', label: 'Uptime' },
            { num: '4.9★', label: 'Rating' },
          ] as StatData[]).map((stat, i) => (
            <div key={i} className="flex flex-col gap-1" role="listitem">
              <span className="text-3xl font-extrabold tracking-tight">{stat.num}</span>
              <span className="text-sm text-white font-medium">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="w-7 h-11 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-0.5 h-3.5 bg-white/70 rounded scroll-line" />
        </div>
      </motion.div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// MARQUEE SECTION (Decorative)
// ═══════════════════════════════════════════════════════════════
function Marquee() {
  const words = ['DESIGN', 'CREATE', 'INNOVATE', 'TRANSFORM', 'BUILD', 'IMAGINE']
  
  return (
    <div 
      className="relative z-10 overflow-hidden py-16 border-y border-white/10" 
      style={{ background: 'linear-gradient(180deg, rgba(129, 140, 248, 0.1) 0%, transparent 100%)' }}
      aria-hidden="true"
    >
      <div className="flex whitespace-nowrap animate-marquee">
        {[...words, ...words].map((word, i) => (
          <span key={i} className="text-[clamp(3rem,6vw,5rem)] font-black tracking-tight text-white/10 px-8 flex items-center gap-8" style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.15)' }}>
            {word}
            <span className="text-2xl text-aurora-indigo/40">◈</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// FEATURES SECTION
// ═══════════════════════════════════════════════════════════════
const FEATURES: FeatureData[] = [
  { icon: <Zap className="w-12 h-12 text-aurora-yellow" />, title: 'Lightning Fast', description: 'Built for speed with instant previews and zero lag editing experience.' },
  { icon: <Palette className="w-12 h-12 text-aurora-pink" />, title: 'AI Design Tools', description: 'Generate layouts, suggest colors, and create assets with AI assistance.' },
  { icon: <RefreshCw className="w-12 h-12 text-aurora-cyan" />, title: 'Real-time Sync', description: 'Collaborate with your team in real-time with instant updates.' },
  { icon: <Lock className="w-12 h-12 text-aurora-indigo" />, title: 'Enterprise Security', description: 'Bank-level encryption and SOC 2 compliance for your data.' },
  { icon: <Smartphone className="w-12 h-12 text-aurora-pink" />, title: 'Responsive Export', description: 'Export pixel-perfect designs for any device automatically.' },
  { icon: <Rocket className="w-12 h-12 text-aurora-cyan" />, title: 'One-Click Deploy', description: 'Push your designs to production with a single click.' },
]

function Features() {
  return (
    <section id="features" className="relative z-10 py-24 md:py-40 px-4 md:px-16" aria-labelledby="features-heading">
      {/* Header */}
      <div className="text-center mb-20">
        <motion.span 
          className="section-tag"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Features
        </motion.span>
        <motion.h2 
          id="features-heading"
          className="text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-tight tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Everything you need to
          <br />
          <span className="gradient-text">create magic</span>
        </motion.h2>
      </div>
      
      {/* Grid */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto list-none p-0 m-0" role="list">
        {FEATURES.map((feature, i) => (
          <FeatureCard key={feature.title} {...feature} index={i} />
        ))}
      </ul>
    </section>
  )
}

interface FeatureCardProps extends FeatureData {
  index: number
}

function FeatureCard({ icon, title, description, index }: FeatureCardProps) {
  const ref = useRef<HTMLLIElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  return (
    <motion.li
      ref={ref}
      className="feature-card"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <span className="block mb-5" aria-hidden="true">{icon}</span>
      <h3 className="text-xl font-bold mb-3 tracking-tight">{title}</h3>
      <p className="text-white/90 leading-relaxed">{description}</p>
    </motion.li>
  )
}

// ═══════════════════════════════════════════════════════════════
// TESTIMONIALS SECTION
// ═══════════════════════════════════════════════════════════════
const TESTIMONIALS: TestimonialData[] = [
  { quote: 'Lumina transformed how our team designs. We ship 3x faster now.', author: 'Sarah Chen', role: 'Design Lead, Stripe' },
  { quote: 'The AI features are mind-blowing. It\'s like having a design assistant.', author: 'Marcus Johnson', role: 'Creative Director, Figma' },
  { quote: 'Best investment we made for our design workflow this year.', author: 'Elena Rodriguez', role: 'VP Design, Airbnb' },
]

function Testimonials() {
  const [active, setActive] = useState(0)
  const totalTestimonials = TESTIMONIALS.length
  
  useEffect(() => {
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % totalTestimonials)
    }, 5000)
    return () => clearInterval(timer)
  }, [totalTestimonials])
  
  const handleDotClick = useCallback((index: number) => {
    setActive(index)
  }, [])
  
  return (
    <section 
      className="relative z-10 py-24 md:py-32 px-4 md:px-16" 
      style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(129, 140, 248, 0.08) 50%, transparent 100%)' }}
      aria-labelledby="testimonials-heading"
      role="region"
    >
      <h2 id="testimonials-heading" className="sr-only">Customer Testimonials</h2>
      <div className="max-w-4xl mx-auto text-center relative min-h-[300px]" aria-live="polite" aria-atomic="true">
        {TESTIMONIALS.map((t, i) => (
          <motion.figure
            key={t.author}
            className={`w-full ${active === i ? 'relative' : 'absolute top-0 left-0'}`}
            initial={false}
            animate={{ 
              opacity: active === i ? 1 : 0,
              scale: active === i ? 1 : 0.95,
            }}
            transition={{ duration: 0.5 }}
            aria-hidden={active !== i}
          >
            <blockquote className="text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-snug tracking-tight mb-10">
              <p>&ldquo;{t.quote}&rdquo;</p>
            </blockquote>
            <figcaption className="flex items-center justify-center gap-5">
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl"
                style={{
                  background: 'linear-gradient(135deg, #818cf8, #c084fc)',
                  boxShadow: '0 8px 30px rgba(129, 140, 248, 0.4)',
                }}
                aria-hidden="true"
              >
                {t.author[0]}
              </div>
              <div className="text-left">
                <cite className="font-bold not-italic">{t.author}</cite>
                <div className="text-white text-sm">{t.role}</div>
              </div>
            </figcaption>
          </motion.figure>
        ))}
        
        {/* Dots */}
        <div className="flex justify-center gap-3 mt-12" role="tablist" aria-label="Testimonial navigation">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.author}
              className={`testimonial-dot ${active === i ? 'active' : ''}`}
              onClick={() => handleDotClick(i)}
              role="tab"
              aria-selected={active === i}
              aria-label={`View testimonial from ${t.author}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// CTA SECTION
// ═══════════════════════════════════════════════════════════════
function CTA() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true })
  
  return (
    <section ref={ref} className="relative z-10 py-24 md:py-40 px-4 md:px-16 text-center" aria-labelledby="cta-heading">
      <motion.div 
        className="max-w-3xl mx-auto p-12 md:p-20 rounded-[40px] backdrop-blur-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{
          background: 'linear-gradient(135deg, rgba(129, 140, 248, 0.15) 0%, rgba(192, 132, 252, 0.1) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
        }}
      >
        <h2 id="cta-heading" className="text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-tight tracking-tight mb-6">
          Ready to transform your
          <br />
          <span className="gradient-text">design workflow?</span>
        </h2>
        <p className="text-xl text-white mb-12">
          Join 50,000+ designers who are already creating the future.
        </p>
        <motion.button 
          className="btn-primary"
          whileHover={{ scale: 1.05, boxShadow: '0 25px 60px rgba(255, 255, 255, 0.3)' }}
          whileTap={{ scale: 0.95 }}
          aria-label="Start your free trial today"
        >
          Start Your Free Trial
        </motion.button>
        <p className="text-white text-sm mt-6">No credit card required · 14-day free trial</p>
      </motion.div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════
const FOOTER_LINKS = [
  { title: 'Product', links: ['Features', 'Pricing', 'Changelog'] },
  { title: 'Company', links: ['About', 'Blog', 'Careers'] },
  { title: 'Resources', links: ['Documentation', 'Support', 'API'] },
] as const

const SOCIAL_LINKS = [
  { icon: <Twitter className="w-5 h-5" />, label: 'Follow us on X (Twitter)', href: '#' },
  { icon: <Linkedin className="w-5 h-5" />, label: 'Connect on LinkedIn', href: '#' },
  { icon: <Instagram className="w-5 h-5" />, label: 'Follow us on Instagram', href: '#' },
]

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 py-16 md:py-20 px-4 md:px-16" style={{ background: 'rgba(0, 0, 0, 0.4)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          {/* Brand */}
          <div className="max-w-xs">
            <a href="/" className="flex items-center gap-3 text-2xl font-bold mb-4" aria-label="Lumina home">
              <span className="gradient-text" aria-hidden="true">◈</span>
              <span>Lumina</span>
            </a>
            <p className="text-white leading-relaxed">Design without boundaries.</p>
          </div>
          
          {/* Links */}
          <nav className="flex flex-wrap gap-16" aria-label="Footer navigation">
            {FOOTER_LINKS.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-white/90 mb-2">{col.title}</h4>
                <ul className="flex flex-col gap-3 list-none p-0 m-0">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-white hover:text-aurora-indigo transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white">
          <p>© 2026 Lumina. All rights reserved.</p>
          <ul className="flex gap-6 list-none p-0 m-0" role="list" aria-label="Social media links">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a 
                  href={social.href} 
                  className="hover:text-aurora-indigo transition-all hover:-translate-y-0.5 inline-block"
                  aria-label={social.label}
                >
                  <span aria-hidden="true">{social.icon}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
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
// STRUCTURED DATA
// ═══════════════════════════════════════════════════════════════
function StructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Lumina',
    applicationCategory: 'DesignApplication',
    description: 'The next generation design platform that transforms your creative workflow with AI-powered tools and real-time collaboration.',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: '14-day free trial',
    },
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
export default function AuroraPage() {
  return (
    <>
      <StructuredData />
      <SkipLink />
      <AuroraMesh />
      <div className="grain-overlay" aria-hidden="true" />
      <header>
        <Nav />
      </header>
      <main id="main-content">
        <Hero />
        <Marquee />
        <Features />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
