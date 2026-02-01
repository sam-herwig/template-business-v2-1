'use client'

import { useRef, useState, useEffect, useCallback, useSyncExternalStore } from 'react'
import { motion, useInView, useMotionValue, useSpring, AnimatePresence, useScroll } from 'framer-motion'
import { Palette, Code, Star, Film, Target, Twitter, Linkedin, Instagram } from 'lucide-react'

// ═══════════════════════════════════════════════════════════════
// SKIP LINK
// ═══════════════════════════════════════════════════════════════
function SkipLink(): JSX.Element {
  return (
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>
  )
}

// ═══════════════════════════════════════════════════════════════
// HOOKS - SSR-safe media query with useSyncExternalStore
// ═══════════════════════════════════════════════════════════════
function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mediaQuery = window.matchMedia(query)
      mediaQuery.addEventListener('change', callback)
      return () => mediaQuery.removeEventListener('change', callback)
    },
    [query]
  )

  const getSnapshot = useCallback(() => {
    return window.matchMedia(query).matches
  }, [query])

  const getServerSnapshot = useCallback(() => false, [])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

const useIsMobile = (): boolean => useMediaQuery('(max-width: 768px)')
const useIsTablet = (): boolean => useMediaQuery('(max-width: 1024px)')

// ═══════════════════════════════════════════════════════════════
// COLORS
// ═══════════════════════════════════════════════════════════════
const colors = {
  violet: '#8B5CF6',
  blue: '#3B82F6',
  emerald: '#10B981',
  amber: '#F59E0B',
  pink: '#EC4899',
}

// ═══════════════════════════════════════════════════════════════
// FLOATING ORB COMPONENT
// ═══════════════════════════════════════════════════════════════
function FloatingOrb({ 
  color, 
  size = 120, 
  delay = 0,
  className = ''
}: { 
  color: string
  size?: number
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={`absolute rounded-full blur-[40px] ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}80 0%, ${color}00 70%)`,
      }}
      animate={{
        x: [0, 30, -20, 10, 0],
        y: [0, -25, 15, -10, 0],
        scale: [1, 1.2, 0.9, 1.1, 1],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      aria-hidden="true"
    />
  )
}

// ═══════════════════════════════════════════════════════════════
// MAGNETIC WRAPPER (Desktop only)
// ═══════════════════════════════════════════════════════════════
function MagneticWrapper({ 
  children, 
  className = '',
  strength = 0.15
}: { 
  children: React.ReactNode
  className?: string
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springConfig = { damping: 15, stiffness: 400 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * strength)
    y.set((e.clientY - centerY) * strength)
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
      style={{ x: isMobile ? 0 : springX, y: isMobile ? 0 : springY }}
    >
      {children}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════
// BENTO TILE - Fixed responsive version
// ═══════════════════════════════════════════════════════════════
interface BentoTileProps {
  children: React.ReactNode
  span?: 'normal' | 'wide' | 'tall' | 'large'
  delay?: number
  accentColor?: string
  hoverContent?: React.ReactNode
  gradient?: boolean
  gradientColors?: string[]
  className?: string
}

function BentoTile({ 
  children, 
  span = 'normal',
  delay = 0,
  accentColor = colors.violet,
  hoverContent,
  gradient = false,
  gradientColors = [colors.violet, colors.blue],
  className = ''
}: BentoTileProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [isActive, setIsActive] = useState(false)
  const isMobile = useIsMobile()

  // Get responsive span classes
  const getSpanClasses = () => {
    switch (span) {
      case 'wide': return 'col-span-1 md:col-span-2'
      case 'tall': return 'col-span-1 row-span-1 md:row-span-2'
      case 'large': return 'col-span-1 md:col-span-2 row-span-1 md:row-span-2'
      default: return 'col-span-1'
    }
  }

  const handleInteraction = () => {
    if (isMobile && hoverContent) {
      setIsActive(!isActive)
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.7, 
        delay,
        ease: [0.215, 0.61, 0.355, 1] 
      }}
      onMouseEnter={() => !isMobile && setIsActive(true)}
      onMouseLeave={() => !isMobile && setIsActive(false)}
      onClick={handleInteraction}
      onKeyDown={(e) => e.key === 'Enter' && handleInteraction()}
      tabIndex={hoverContent ? 0 : undefined}
      role={hoverContent ? 'button' : undefined}
      aria-expanded={hoverContent ? isActive : undefined}
      className={`
        relative rounded-3xl border overflow-hidden
        min-h-[160px] p-6
        transition-all duration-300
        ${getSpanClasses()}
        ${className}
      `}
      style={{
        background: '#16161F',
        borderColor: isActive ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)',
        boxShadow: isActive 
          ? `0 20px 60px -15px ${accentColor}30, 0 0 0 1px ${accentColor}20`
          : '0 4px 20px rgba(0,0,0,0.3)',
      }}
    >
      {/* Animated gradient background */}
      {gradient && (
        <div className="absolute inset-0 overflow-hidden rounded-3xl" aria-hidden="true">
          <motion.div
            className="absolute inset-[-50%] gradient-bg-rotate"
            style={{
              background: `conic-gradient(from 0deg, ${gradientColors.join(', ')})`,
              filter: 'blur(60px)',
              opacity: isActive ? 0.15 : 0.08,
            }}
          />
        </div>
      )}

      {/* Hover/Tap reveal overlay */}
      <AnimatePresence>
        {isActive && hoverContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center p-6 rounded-3xl z-10"
            style={{
              background: `linear-gradient(135deg, ${accentColor}15 0%, #16161Fee 100%)`,
              backdropFilter: 'blur(8px)',
            }}
          >
            {hoverContent}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content with scale effect */}
      <motion.div
        animate={{ scale: isActive ? 1.02 : 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-[1] h-full"
      >
        {children}
      </motion.div>

      {/* Corner accent glow */}
      <motion.div
        animate={{ opacity: isActive ? 0.5 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute -top-12 -right-12 w-36 h-36 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${accentColor}40 0%, transparent 70%)`,
          filter: 'blur(30px)',
        }}
        aria-hidden="true"
      />

      {/* Mobile tap indicator */}
      {isMobile && hoverContent && (
        <div 
          className="absolute bottom-2 right-3 text-xs text-white/70 transition-opacity duration-300"
          style={{ opacity: isActive ? 0 : 0.6 }}
          aria-hidden="true"
        >
          Tap to explore
        </div>
      )}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════
// ANIMATED COUNTER - with proper RAF cleanup
// ═══════════════════════════════════════════════════════════════
interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
}

function AnimatedCounter({ 
  value, 
  suffix = '',
  prefix = ''
}: AnimatedCounterProps): JSX.Element {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const rafRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isInView) return
    
    const duration = 2000
    
    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp
      }
      
      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * value))
      
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }
    
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
      startTimeRef.current = null
    }
  }, [isInView, value])

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

// ═══════════════════════════════════════════════════════════════
// GLASS BUTTON
// ═══════════════════════════════════════════════════════════════
function GlassButton({ 
  children, 
  primary = false,
  onClick,
  href,
  ariaLabel
}: { 
  children: React.ReactNode
  primary?: boolean
  onClick?: () => void
  href?: string
  ariaLabel?: string
}) {
  const buttonClasses = `
    px-6 py-3 rounded-xl text-sm font-medium min-h-[44px]
    flex items-center gap-2 transition-all duration-300
    ${primary 
      ? 'bg-gradient-to-r from-studio-violet to-studio-blue text-white hover:shadow-lg hover:shadow-studio-violet/40' 
      : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
    }
  `

  const content = (
    <>
      {children}
      <motion.span
        className="inline-block"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
        aria-hidden="true"
      >
        →
      </motion.span>
    </>
  )

  if (href) {
    return (
      <a href={href} className={buttonClasses} aria-label={ariaLabel}>
        {content}
      </a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={buttonClasses}
      style={{ backdropFilter: primary ? 'none' : 'blur(12px)' }}
      aria-label={ariaLabel}
    >
      {content}
    </motion.button>
  )
}

// ═══════════════════════════════════════════════════════════════
// SCROLL PROGRESS BAR
// ═══════════════════════════════════════════════════════════════
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[9999] origin-left"
      style={{
        background: `linear-gradient(90deg, ${colors.violet}, ${colors.blue})`,
        scaleX: scrollYProgress,
      }}
      aria-hidden="true"
    />
  )
}

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
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 w-[80%] max-w-sm h-full bg-studio-bg border-l border-white/10 p-8 flex flex-col"
            aria-label="Mobile navigation"
          >
            <button
              onClick={onClose}
              className="self-end p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/60 hover:text-white"
              aria-label="Close menu"
            >
              <span className="text-2xl">✕</span>
            </button>
            <div className="flex flex-col gap-6 mt-8">
              {['Work', 'Services', 'Process', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={onClose}
                  className="text-xl font-medium text-white/80 hover:text-white transition-colors py-2"
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="mt-auto">
              <GlassButton primary>Let&apos;s Talk</GlassButton>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ═══════════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════════
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
        className={`
          fixed top-0 left-0 right-0 z-[1000] px-4 md:px-8 py-4
          flex justify-between items-center transition-all duration-400
          ${scrolled ? 'bg-studio-bg/85 backdrop-blur-xl border-b border-white/10' : ''}
        `}
        aria-label="Main navigation"
      >
        <MagneticWrapper>
          <a href="/" className="text-2xl font-extrabold tracking-tight">PRISM</a>
        </MagneticWrapper>

        <div className="flex items-center gap-4 md:gap-10">
          {!isMobile && ['Work', 'Services', 'Process', 'Contact'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors py-3 px-1 min-h-[44px] flex items-center"
            >
              {item}
            </motion.a>
          ))}
          <div className="hidden md:block">
            <GlassButton primary href="#contact">Let&apos;s Talk</GlassButton>
          </div>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="text-2xl">☰</span>
          </button>
        </div>
      </motion.nav>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  )
}

// ═══════════════════════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════════════════════
function Hero() {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  
  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden px-4 md:px-8 lg:px-16 pt-24 pb-12">
      {/* Floating orbs */}
      <FloatingOrb color={colors.violet} size={isMobile ? 120 : 200} delay={0} className="top-[10%] left-[10%]" />
      <FloatingOrb color={colors.blue} size={isMobile ? 90 : 150} delay={2} className="top-[60%] right-[20%]" />
      <FloatingOrb color={colors.emerald} size={isMobile ? 100 : 180} delay={4} className="bottom-[20%] left-[30%]" />

      {/* Content grid */}
      <div className={`
        grid gap-8 md:gap-16 items-center max-w-7xl mx-auto w-full
        ${isTablet ? 'grid-cols-1' : 'grid-cols-2'}
      `}>
        {/* Left: Text */}
        <div className={isTablet ? 'text-center' : ''}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block px-4 py-2 rounded-full text-sm text-studio-violet mb-6 border border-studio-violet/30"
            style={{ background: `linear-gradient(135deg, ${colors.violet}20 0%, ${colors.blue}20 100%)` }}
          >
            ✦ Digital Design Studio
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1.05] tracking-tight mb-6"
          >
            We craft
            <br />
            <span className="gradient-text">digital experiences</span>
            <br />
            that inspire.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-white/60 leading-relaxed max-w-lg mb-8 mx-auto md:mx-0"
          >
            Studio Prism transforms ambitious ideas into stunning digital 
            realities. From brand strategy to immersive web experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className={`flex gap-4 flex-wrap ${isTablet ? 'justify-center' : ''}`}
          >
            <GlassButton primary href="#work">View Our Work</GlassButton>
            <GlassButton href="#services">Learn More</GlassButton>
          </motion.div>
        </div>

        {/* Right: Bento Grid Preview - FIXED RESPONSIVE */}
        <div className={`
          grid gap-3 md:gap-4
          ${isMobile ? 'grid-cols-2 grid-rows-4' : 'grid-cols-3 grid-rows-3'}
        `} aria-label="Featured work preview">
          {/* Large feature tile */}
          <BentoTile 
            span="large" 
            delay={0.3}
            gradient
            gradientColors={[colors.violet, colors.pink]}
            accentColor={colors.violet}
          >
            <div className="flex flex-col justify-between h-full">
              <span className="text-xs text-white/70 uppercase tracking-widest">Featured</span>
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-1">Nexus AI</h3>
                <p className="text-sm text-white/60">Complete brand & web platform</p>
              </div>
            </div>
          </BentoTile>

          {/* Tall testimonial tile */}
          <BentoTile 
            span={isMobile ? 'normal' : 'tall'}
            delay={0.4}
            accentColor={colors.emerald}
            hoverContent={
              <div className="text-center">
                <p className="text-3xl mb-2" aria-hidden="true">🎨</p>
                <p className="text-sm text-white/60">View Project</p>
              </div>
            }
          >
            <div className="h-full flex flex-col justify-end">
              <p className="text-sm text-white/60 leading-relaxed">
                &ldquo;Prism understood our vision perfectly.&rdquo;
              </p>
              <p className="text-xs text-white/70 mt-3">— Sarah Chen, Founder</p>
            </div>
          </BentoTile>

          {/* Counter tiles */}
          <BentoTile delay={0.5} accentColor={colors.blue}>
            <div className="text-center h-full flex flex-col justify-center">
              <p className="text-3xl md:text-4xl font-extrabold gradient-text">
                <AnimatedCounter value={150} suffix="+" />
              </p>
              <p className="text-[10px] md:text-xs text-white/70 uppercase tracking-widest mt-1">
                Projects
              </p>
            </div>
          </BentoTile>

          <BentoTile delay={0.6} accentColor={colors.amber}>
            <div className="text-center h-full flex flex-col justify-center">
              <p className="text-3xl md:text-4xl font-extrabold" style={{
                background: `linear-gradient(135deg, ${colors.amber}, ${colors.pink})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                <AnimatedCounter value={98} suffix="%" />
              </p>
              <p className="text-[10px] md:text-xs text-white/70 uppercase tracking-widest mt-1">
                Satisfaction
              </p>
            </div>
          </BentoTile>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs text-white/70">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-white/20 flex justify-center pt-1.5">
          <motion.div
            animate={{ opacity: [1, 0, 1], y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-1 rounded-full bg-studio-violet"
          />
        </div>
      </motion.div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// CLIENTS SECTION
// ═══════════════════════════════════════════════════════════════
function Clients() {
  const isMobile = useIsMobile()
  
  const clients = [
    { name: 'Stripe', logo: '💳' },
    { name: 'Notion', logo: '📝' },
    { name: 'Linear', logo: '🎯' },
    { name: 'Vercel', logo: '▲' },
    { name: 'Figma', logo: '🎨' },
    { name: 'Framer', logo: '✨' },
  ]

  return (
    <section className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto" aria-labelledby="clients-heading">
      <motion.p
        id="clients-heading"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-xs text-white/70 uppercase tracking-[0.2em] mb-8"
      >
        Trusted by innovative teams
      </motion.p>
      
      <div className={`grid gap-3 ${isMobile ? 'grid-cols-3' : 'grid-cols-6'}`}>
        {clients.map((client, i) => (
          <BentoTile
            key={client.name}
            delay={i * 0.05}
            accentColor={colors.blue}
            className="min-h-[80px] md:min-h-[100px]"
          >
            <div className="h-full flex flex-col items-center justify-center gap-2">
              <span className="text-xl md:text-2xl" aria-hidden="true">{client.logo}</span>
              <span className="text-xs text-white/60 font-medium">{client.name}</span>
            </div>
          </BentoTile>
        ))}
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SERVICES SECTION
// ═══════════════════════════════════════════════════════════════
function Services() {
  const isMobile = useIsMobile()
  
  const services = [
    { icon: <Palette className="w-6 h-6" />, title: 'UI/UX Design', desc: 'Intuitive interfaces that users love', color: colors.violet },
    { icon: <Code className="w-6 h-6" />, title: 'Development', desc: 'Performant, scalable solutions', color: colors.blue },
    { icon: <Star className="w-6 h-6" />, title: 'Branding', desc: 'Memorable visual identities', color: colors.emerald },
    { icon: <Film className="w-6 h-6" />, title: 'Motion', desc: 'Animations that tell stories', color: colors.amber },
    { icon: <Target className="w-6 h-6" />, title: 'Strategy', desc: 'Data-driven decision making', color: colors.pink },
  ]

  return (
    <section id="services" className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto" aria-labelledby="services-heading">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 id="services-heading" className="text-[clamp(2rem,4vw,3rem)] font-bold mb-4">What we do</h2>
        <p className="text-white/60 max-w-md">
          Full-spectrum digital services tailored to your unique vision.
        </p>
      </motion.div>

      <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-5'}`}>
        {services.map((service, i) => (
          <BentoTile
            key={service.title}
            delay={i * 0.1}
            accentColor={service.color}
            span={isMobile && i === 4 ? 'wide' : 'normal'}
            hoverContent={
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="mb-2 flex justify-center"
                  aria-hidden="true"
                >
                  {service.icon}
                </motion.div>
                <p className="text-sm">Explore →</p>
              </div>
            }
          >
            <div className="h-full flex flex-col justify-between">
              <div aria-hidden="true">{service.icon}</div>
              <div>
                <h3 className="font-semibold mb-1">{service.title}</h3>
                <p className="text-xs text-white/60">{service.desc}</p>
              </div>
            </div>
          </BentoTile>
        ))}
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// WORK SECTION
// ═══════════════════════════════════════════════════════════════
function Work() {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  
  const projects = [
    { title: 'Quantum Labs', category: 'Brand + Web', colors: [colors.violet, colors.blue], span: 'large' as const },
    { title: 'Solace Health', category: 'App Design', colors: [colors.emerald, colors.blue], span: 'normal' as const },
    { title: 'Drift Commerce', category: 'E-commerce', colors: [colors.amber, colors.pink], span: 'tall' as const },
    { title: 'Echo Audio', category: 'Brand Identity', colors: [colors.pink, colors.violet], span: 'wide' as const },
    { title: 'Vertex Finance', category: 'Dashboard', colors: [colors.blue, colors.emerald], span: 'normal' as const },
    { title: 'Nova AI', category: 'AI Platform', colors: [colors.violet, colors.emerald], span: 'wide' as const },
  ]

  return (
    <section id="work" className="py-16 md:py-24 px-4 md:px-8" aria-labelledby="work-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12"
        >
          <div>
            <h2 id="work-heading" className="text-[clamp(2rem,4vw,3rem)] font-bold mb-4">Selected Work</h2>
            <p className="text-white/60 max-w-md">
              A glimpse into our latest projects and collaborations.
            </p>
          </div>
          <GlassButton href="#">View All</GlassButton>
        </motion.div>

        <div className={`
          grid gap-4
          ${isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-4'}
          auto-rows-[180px]
        `}>
          {projects.map((project, i) => (
            <BentoTile
              key={project.title}
              span={isMobile ? 'normal' : project.span}
              delay={Math.min(i * 0.05, 0.5)}
              gradient
              gradientColors={project.colors}
              accentColor={project.colors[0]}
              className={project.span === 'large' || project.span === 'tall' ? 'min-h-[240px]' : ''}
              hoverContent={
                <div className="text-center">
                  <p className="text-lg font-semibold mb-1">{project.title}</p>
                  <p className="text-sm text-white/60">View Case Study →</p>
                </div>
              }
            >
              <div className="h-full flex flex-col justify-end">
                <span className="text-[10px] text-white/70 uppercase tracking-widest mb-1">
                  {project.category}
                </span>
                <h3 className="text-lg md:text-xl font-bold">{project.title}</h3>
              </div>
            </BentoTile>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// STATS SECTION
// ═══════════════════════════════════════════════════════════════
function Stats() {
  const isMobile = useIsMobile()
  
  const stats = [
    { value: 8, suffix: '+', label: 'Years Experience', color: colors.violet },
    { value: 150, suffix: '+', label: 'Projects Delivered', color: colors.blue },
    { value: 45, suffix: 'M+', label: 'Users Reached', color: colors.emerald },
    { value: 12, suffix: '', label: 'Industry Awards', color: colors.amber },
  ]

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto" aria-label="Studio statistics">
      <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
        {stats.map((stat, i) => (
          <BentoTile
            key={stat.label}
            delay={i * 0.1}
            accentColor={stat.color}
            gradient
            gradientColors={[stat.color, '#16161F']}
            className="min-h-[120px] md:min-h-[150px]"
          >
            <div className="h-full flex flex-col justify-center items-center text-center">
              <p 
                className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold mb-1"
                style={{
                  background: `linear-gradient(135deg, ${stat.color} 0%, white 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-[10px] md:text-xs text-white/70 uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          </BentoTile>
        ))}
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// CTA SECTION
// ═══════════════════════════════════════════════════════════════
function CTA() {
  const isMobile = useIsMobile()
  
  return (
    <section id="contact" className="py-16 md:py-24 px-4 md:px-8" aria-labelledby="cta-heading">
      <div className="max-w-7xl mx-auto">
        <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
          {/* Main CTA tile */}
          <BentoTile
            gradient
            gradientColors={[colors.violet, colors.blue, colors.emerald]}
            accentColor={colors.violet}
            className={`min-h-[280px] md:min-h-[350px] p-8 md:p-12 ${isMobile ? '' : 'col-span-2'}`}
          >
            <div className="h-full flex flex-col justify-center">
              <h2 id="cta-heading" className="text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-tight mb-4">
                Ready to build
                <br />
                <span className="gradient-text">something extraordinary?</span>
              </h2>
              <p className="text-white/60 mb-8 max-w-md">
                Let&apos;s turn your vision into reality. We&apos;re ready when you are.
              </p>
              <div className="flex flex-wrap gap-4">
                <GlassButton primary href="mailto:hello@prism.studio">Start a Project</GlassButton>
                <GlassButton href="#">Schedule a Call</GlassButton>
              </div>
            </div>
          </BentoTile>

          {/* Side tiles */}
          <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-rows-2'}`}>
            <BentoTile
              accentColor={colors.amber}
              hoverContent={
                <div className="text-center">
                  <p className="text-2xl mb-2" aria-hidden="true">📧</p>
                  <p className="text-sm">hello@prism.studio</p>
                </div>
              }
            >
              <div className="h-full flex flex-col items-center justify-center text-center">
                <p className="text-3xl mb-2" aria-hidden="true">📧</p>
                <p className="text-sm text-white/60">Email Us</p>
              </div>
            </BentoTile>

            <BentoTile
              accentColor={colors.pink}
              hoverContent={
                <div className="text-center">
                  <p className="text-2xl mb-2" aria-hidden="true">📍</p>
                  <p className="text-sm">San Francisco, CA</p>
                </div>
              }
            >
              <div className="h-full flex flex-col items-center justify-center text-center">
                <p className="text-3xl mb-2" aria-hidden="true">📍</p>
                <p className="text-sm text-white/60">Visit Us</p>
              </div>
            </BentoTile>
          </div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════
function Footer() {
  const isMobile = useIsMobile()
  
  return (
    <footer className="border-t border-white/10 py-12 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className={`grid gap-8 mb-12 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
          {/* Brand */}
          <div className={isMobile ? 'col-span-2' : ''}>
            <span className="text-2xl font-extrabold">PRISM</span>
            <p className="text-sm text-white/70 mt-3">
              Design without boundaries.
              <br />
              Build without limits.
            </p>
          </div>
          
          {/* Links */}
          {[
            { title: 'Product', links: ['Features', 'Pricing', 'Changelog'] },
            { title: 'Company', links: ['About', 'Blog', 'Careers'] },
            { title: 'Resources', links: ['Documentation', 'Support', 'API'] },
          ].map((col) => (
            <nav key={col.title} aria-label={`${col.title} links`}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-4">
                {col.title}
              </h4>
              {col.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-sm text-white/70 hover:text-white transition-colors mb-2 py-1"
                >
                  {link}
                </a>
              ))}
            </nav>
          ))}
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
          <p>© 2026 Studio Prism. All rights reserved.</p>
          <div className="flex gap-6">
            {[
              { icon: <Twitter className="w-5 h-5" />, label: 'Twitter' },
              { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn' },
              { icon: <Instagram className="w-5 h-5" />, label: 'Instagram' }
            ].map((social) => (
              <a 
                key={social.label} 
                href="#" 
                className="hover:text-white transition-colors py-1"
                aria-label={`Follow us on ${social.label}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
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
    '@type': 'Organization',
    name: 'Studio Prism',
    description: 'Full-spectrum digital design services. We craft experiences that inspire and convert.',
    url: 'https://prism.studio',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@prism.studio',
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
export default function StudioPage() {
  return (
    <>
      <StructuredData />
      <SkipLink />
      <ScrollProgress />
      <Nav />
      <main id="main-content">
        <Hero />
        <Clients />
        <Services />
        <Work />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
