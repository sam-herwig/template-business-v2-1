'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// ═══════════════════════════════════════════════════════════════
// ANIMATED SPLIT TEXT (renamed to avoid GSAP SplitText collision)
// ═══════════════════════════════════════════════════════════════
function AnimatedSplitText({ 
  children, 
  className = '',
  delay = 0,
  stagger = 0.03,
  type = 'chars'
}: { 
  children: string
  className?: string
  delay?: number
  stagger?: number
  type?: 'chars' | 'words' | 'lines'
}) {
  const items = useMemo(() => {
    if (type === 'words') return children.split(' ')
    if (type === 'lines') return children.split('\n')
    return children.split('')
  }, [children, type])

  return (
    <span className={className} aria-label={children} role="text">
      {items.map((item, i) => (
        <motion.span
          key={i}
          className="inline-block"
          aria-hidden="true"
          initial={{ opacity: 0, y: 60, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + i * stagger,
            ease: [0.215, 0.61, 0.355, 1]
          }}
          style={{ transformOrigin: 'bottom' }}
        >
          {item === ' ' ? '\u00A0' : item}
          {type === 'words' && i < items.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </span>
  )
}

// ═══════════════════════════════════════════════════════════════
// MAGNETIC TEXT (Desktop only)
// ═══════════════════════════════════════════════════════════════
function MagneticText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 150 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || window.innerWidth < 768) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.15)
    y.set((e.clientY - centerY) * 0.15)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════
// WAVE TEXT (Hover animation)
// ═══════════════════════════════════════════════════════════════
function WaveText({ children, className = '' }: { children: string; className?: string }) {
  const [isHovered, setIsHovered] = useState(false)
  const chars = children.split('')

  return (
    <motion.span
      className={`inline-flex ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          animate={isHovered ? {
            y: [0, -20, 0],
            color: ['#ffffff', '#60a5fa', '#ffffff']
          } : { y: 0 }}
          transition={{
            duration: 0.4,
            delay: i * 0.03,
            ease: 'easeOut'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

// ═══════════════════════════════════════════════════════════════
// SCRAMBLE TEXT
// ═══════════════════════════════════════════════════════════════
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

function ScrambleText({ children, className = '' }: { children: string; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [displayText, setDisplayText] = useState(children)

  useEffect(() => {
    if (!isInView) return
    
    let iteration = 0
    const interval = setInterval(() => {
      setDisplayText(
        children
          .split('')
          .map((char, i) => {
            if (i < iteration) return children[i]
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
          })
          .join('')
      )
      
      iteration += 1/3
      if (iteration >= children.length) {
        clearInterval(interval)
        setDisplayText(children)
      }
    }, 30)

    return () => clearInterval(interval)
  }, [isInView, children])

  return (
    <span ref={ref} className={className} aria-label={children}>
      <span aria-hidden="true">{displayText}</span>
    </span>
  )
}

// ═══════════════════════════════════════════════════════════════
// TYPEWRITER EFFECT
// ═══════════════════════════════════════════════════════════════
function Typewriter({ words, className = '' }: { words: string[]; className?: string }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[currentWordIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWordIndex, words])

  return (
    <span className={className} role="text" aria-label={words.join(', ')}>
      <span aria-hidden="true">{currentText}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="cursor"
        aria-hidden="true"
      >
        |
      </motion.span>
    </span>
  )
}

// ═══════════════════════════════════════════════════════════════
// ROTATING WORDS
// ═══════════════════════════════════════════════════════════════
function RotatingWords({ words, className = '' }: { words: string[]; className?: string }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [words.length])

  return (
    <span 
      className={`inline-block relative ${className}`} 
      style={{ perspective: '500px', minWidth: '4ch' }}
      role="text"
      aria-label={words.join(', ')}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="inline-block gradient-text italic"
          aria-hidden="true"
          initial={{ y: 50, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: -50, opacity: 0, rotateX: 90 }}
          transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
          style={{ transformOrigin: 'center bottom' }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

// ═══════════════════════════════════════════════════════════════
// MARQUEE
// ═══════════════════════════════════════════════════════════════
function Marquee({ children, speed = 20, direction = 'left' }: { 
  children: React.ReactNode
  speed?: number
  direction?: 'left' | 'right'
}) {
  return (
    <div className="marquee-container" aria-hidden="true" role="presentation">
      <motion.div
        className="marquee-track"
        animate={{ 
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%']
        }}
        transition={{
          duration: speed,
          ease: 'linear',
          repeat: Infinity
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// SCROLL REVEAL TEXT
// ═══════════════════════════════════════════════════════════════
function ScrollRevealText({ 
  children, 
  className = '',
  direction = 'up' 
}: { 
  children: React.ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
      x: direction === 'left' ? 80 : direction === 'right' ? -80 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════════
function Nav() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-8 py-6"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{ background: 'linear-gradient(to bottom, rgba(10, 10, 11, 0.9), transparent)', backdropFilter: 'blur(8px)' }}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <MagneticText className="text-2xl font-bold tracking-tight">
          <a href="/" className="nav-link" aria-label="Kinetic - Home">
            <WaveText>kinetic.</WaveText>
          </a>
        </MagneticText>
        <div className="nav-links hidden sm:flex gap-10 items-center" role="list">
          {['Work', 'About', 'Contact'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="nav-link text-kinetic-muted font-medium hover:text-kinetic-text transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              role="listitem"
            >
              {item}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}

// ═══════════════════════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════════════════════
function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  return (
    <section ref={containerRef} className="min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-8 pt-32 pb-16 relative">
      <motion.div className="max-w-4xl" style={{ opacity, y, scale }}>
        {/* Badge */}
        <motion.div
          className="badge mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span className="badge-dot" />
          Typography in Motion
        </motion.div>
        
        {/* Title */}
        <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-extrabold leading-none tracking-tight mb-6">
          <AnimatedSplitText delay={0.6} stagger={0.04}>
            Words that
          </AnimatedSplitText>
          <br />
          <span className="block min-h-[1.2em]">
            <RotatingWords 
              words={['move', 'inspire', 'dance', 'connect']} 
            />
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          className="text-[clamp(1.1rem,2vw,1.4rem)] text-kinetic-muted max-w-xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          We create <Typewriter words={['experiences', 'emotions', 'stories', 'impact']} className="text-kinetic-accent font-semibold" />
          <br />
          through kinetic typography.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            Start a Project
            <motion.span initial={{ x: 0 }} whileHover={{ x: 5 }}>→</motion.span>
          </motion.button>
          <motion.button
            className="btn-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Reel
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-2xl text-kinetic-dim"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, y: { duration: 1.5, repeat: Infinity } }}
      >
        ↓
      </motion.div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// MARQUEE SECTION
// ═══════════════════════════════════════════════════════════════
function MarqueeSection() {
  return (
    <section className="py-12 border-y border-kinetic-border" style={{ background: 'rgba(250, 250, 250, 0.02)' }}>
      <Marquee speed={25}>
        <span className="marquee-text">
          MOTION • TYPOGRAPHY • DESIGN • ANIMATION • KINETIC • CREATIVE • 
        </span>
      </Marquee>
      <Marquee speed={30} direction="right">
        <span className="marquee-text-outline">
          STORYTELLING • IMPACT • BRAND • EXPERIENCE • VISUAL • DYNAMIC • 
        </span>
      </Marquee>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SERVICES SECTION
// ═══════════════════════════════════════════════════════════════
function Services() {
  const services = [
    { number: '01', title: 'Kinetic Branding', description: 'Transform static logos into living, breathing brand expressions that captivate and engage.' },
    { number: '02', title: 'Motion Systems', description: 'Comprehensive animation guidelines that bring consistency and life to every touchpoint.' },
    { number: '03', title: 'Type Experiences', description: 'Interactive typography that responds, morphs, and creates memorable digital moments.' },
    { number: '04', title: 'Video & Titles', description: 'Cinematic title sequences and video typography that elevate your visual storytelling.' }
  ]

  return (
    <section className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
      <ScrollRevealText className="mb-16">
        <span className="section-label">What we do</span>
        <h2 className="section-title">
          <ScrambleText>Services</ScrambleText>
        </h2>
      </ScrollRevealText>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list">
        {services.map((service, i) => (
          <motion.article
            key={service.number}
            className="service-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            whileHover={{ y: -8 }}
            whileFocus={{ y: -8 }}
            tabIndex={0}
            role="listitem"
            aria-labelledby={`service-title-${service.number}`}
          >
            <span className="block text-sm font-semibold text-kinetic-subtle mb-6" aria-hidden="true">{service.number}</span>
            <h3 id={`service-title-${service.number}`} className="text-2xl font-bold tracking-tight mb-4">
              <WaveText>{service.title}</WaveText>
            </h3>
            <p className="text-kinetic-muted leading-relaxed mb-6">{service.description}</p>
            <motion.span className="text-xl text-kinetic-accent" whileHover={{ x: 5 }} aria-hidden="true">→</motion.span>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// STATEMENT SECTION
// ═══════════════════════════════════════════════════════════════
function Statement() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const words = 'Typography is the voice of design. When it moves, it speaks louder.'.split(' ')

  return (
    <section ref={ref} className="py-24 md:py-40 px-4 md:px-8 max-w-5xl mx-auto text-center">
      <p className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-snug tracking-tight">
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.3em]"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
          >
            {word}
          </motion.span>
        ))}
      </p>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// STATS SECTION
// ═══════════════════════════════════════════════════════════════
function Stats() {
  const stats = [
    { value: '150+', label: 'Projects Completed' },
    { value: '12', label: 'Years Experience' },
    { value: '40+', label: 'Global Clients' },
    { value: '8', label: 'Design Awards' }
  ]

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 md:py-24 px-4 md:px-8 max-w-6xl mx-auto border-y border-kinetic-border">
      {stats.map((stat, i) => (
        <ScrollRevealText key={stat.label} direction={i % 2 === 0 ? 'up' : 'down'}>
          <div className="text-center">
            <span className="block text-[clamp(2.5rem,5vw,4rem)] font-extrabold tracking-tight stat-gradient">
              {stat.value}
            </span>
            <span className="block text-sm text-kinetic-muted mt-2">{stat.label}</span>
          </div>
        </ScrollRevealText>
      ))}
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// WORK SECTION
// ═══════════════════════════════════════════════════════════════
function Work() {
  const projects = [
    { title: 'Nike Motion', category: 'Brand Animation', image: 'https://picsum.photos/800/600?random=1' },
    { title: 'Spotify Wrapped', category: 'Type System', image: 'https://picsum.photos/800/600?random=2' },
    { title: 'Apple Events', category: 'Title Sequence', image: 'https://picsum.photos/800/600?random=3' }
  ]

  return (
    <section className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
      <ScrollRevealText className="mb-16">
        <span className="section-label">Featured</span>
        <h2 className="section-title">
          <ScrambleText>Selected Work</ScrambleText>
        </h2>
      </ScrollRevealText>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
        {projects.map((project, i) => (
          <motion.article
            key={project.title}
            className="work-card"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.7 }}
            role="listitem"
          >
            <a 
              href={`#project-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="block focus-ring rounded-2xl"
              aria-label={`View ${project.title} project - ${project.category}`}
            >
              <motion.div 
                className="work-image-container"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <Image 
                  src={project.image} 
                  alt={`${project.title} - ${project.category} project thumbnail`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="work-image" 
                />
                <motion.div
                  className="work-overlay"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  aria-hidden="true"
                >
                  <span>View Project →</span>
                </motion.div>
              </motion.div>
              <div className="py-5 px-2">
                <span className="block text-xs text-kinetic-accent uppercase tracking-widest mb-2">{project.category}</span>
                <h3 className="text-xl font-bold tracking-tight">{project.title}</h3>
              </div>
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// CTA SECTION
// ═══════════════════════════════════════════════════════════════
function CTA() {
  return (
    <section className="py-24 md:py-40 px-4 md:px-8 text-center" style={{ background: 'linear-gradient(to bottom, transparent, rgba(96, 165, 250, 0.03))' }}>
      <ScrollRevealText>
        <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold tracking-tight mb-12 max-w-4xl mx-auto">
          <AnimatedSplitText type="words" stagger={0.08}>
            Ready to bring your words to life?
          </AnimatedSplitText>
        </h2>
      </ScrollRevealText>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <motion.a
          href="#"
          className="btn-primary text-lg px-12 py-5"
          whileHover={{ scale: 1.05, backgroundColor: '#60a5fa' }}
          whileTap={{ scale: 0.95 }}
        >
          <WaveText>Let&apos;s Talk</WaveText>
        </motion.a>
      </motion.div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════
function Footer() {
  return (
    <footer className="border-t border-kinetic-border" role="contentinfo">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex-1 min-w-[200px]">
          <MagneticText className="text-3xl font-extrabold tracking-tight mb-2 block">
            <a href="/" className="nav-link" aria-label="Kinetic - Home">kinetic.</a>
          </MagneticText>
          <p className="text-sm text-kinetic-subtle">Typography in motion since 2014</p>
        </div>
        <nav className="flex gap-16 flex-wrap" aria-label="Footer navigation">
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-kinetic-muted uppercase tracking-widest mb-2">Connect</h4>
            {[
              { name: 'Twitter', url: 'https://twitter.com/kinetic' },
              { name: 'Instagram', url: 'https://instagram.com/kinetic' },
              { name: 'LinkedIn', url: 'https://linkedin.com/company/kinetic' }
            ].map((link) => (
              <a 
                key={link.name} 
                href={link.url}
                className="footer-link text-kinetic-muted hover:text-kinetic-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${link.name} (opens in new tab)`}
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-kinetic-muted uppercase tracking-widest mb-2">Contact</h4>
            <a 
              href="mailto:hello@kinetic.design" 
              className="footer-link text-kinetic-muted hover:text-kinetic-accent transition-colors"
            >
              hello@kinetic.design
            </a>
            <a 
              href="tel:+15551234567" 
              className="footer-link text-kinetic-muted hover:text-kinetic-accent transition-colors"
            >
              +1 (555) 123-4567
            </a>
          </div>
        </nav>
      </div>
      <div className="border-t border-kinetic-border py-6 overflow-hidden">
        <p className="sr-only">© 2026 Kinetic Design Studio. All Rights Reserved.</p>
        <Marquee speed={40}>
          <span className="footer-marquee">
            © 2026 Kinetic Design Studio • All Rights Reserved • Made with ♥ and lots of keyframes • 
          </span>
        </Marquee>
      </div>
    </footer>
  )
}

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE EXPORT
// ═══════════════════════════════════════════════════════════════
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
    '@type': 'Organization',
    name: 'Kinetic',
    description: 'We create experiences through kinetic typography. Motion design studio specializing in animated text and brand expression.',
    url: 'https://kinetic.design',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@kinetic.design',
      contactType: 'customer service',
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
export default function TypographyPage() {
  return (
    <>
      <StructuredData />
      <SkipLink />
      <header>
        <Nav />
      </header>
      <main id="main-content">
        <Hero />
        <MarqueeSection />
        <Services />
        <Statement />
        <Stats />
        <Work />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
