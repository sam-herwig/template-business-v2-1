'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import Image from 'next/image'
import * as THREE from 'three'
import { 
  Palette, 
  Code, 
  Smartphone, 
  Rocket, 
  TrendingUp, 
  Sparkles,
  Twitter,
  Instagram,
  Dribbble,
  Linkedin
} from 'lucide-react'

// ═══════════════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════
interface Service {
  readonly icon: React.ReactNode
  readonly title: string
  readonly description: string
  readonly color: string
}

interface Project {
  readonly title: string
  readonly category: string
  readonly image: string
  readonly color: string
}

interface Testimonial {
  readonly quote: string
  readonly author: string
  readonly role: string
  readonly color: string
}

interface Stat {
  readonly num: string
  readonly label: string
}

interface FloatingShape {
  readonly color: string
  readonly size: number
  readonly top: string
  readonly left?: string
  readonly right?: string
  readonly rotate: number
}

// ═══════════════════════════════════════════════════════════════
// SKIP LINK COMPONENT
// ═══════════════════════════════════════════════════════════════
function SkipLink(): JSX.Element {
  return (
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>
  )
}

// ═══════════════════════════════════════════════════════════════
// BRUTAL BUTTON COMPONENT
// ═══════════════════════════════════════════════════════════════
interface BrutalButtonProps {
  readonly children: React.ReactNode
  readonly color?: string
  readonly shadowColor?: string
  readonly onClick?: () => void
  readonly size?: 'normal' | 'large'
  readonly ariaLabel?: string
  readonly href?: string
  readonly type?: 'button' | 'submit' | 'reset'
}

function BrutalButton({ 
  children, 
  color = '#FFE600', 
  shadowColor = '#1a1a1a', 
  onClick, 
  size = 'normal',
  ariaLabel,
  href,
  type = 'button'
}: BrutalButtonProps): JSX.Element {
  const padding = size === 'large' ? 'px-10 py-5' : 'px-7 py-3.5'
  const fontSize = size === 'large' ? 'text-lg' : 'text-base'
  
  // Determine text color based on button background for proper contrast
  const getTextColor = (bg: string): string => {
    const darkBgs = ['#3B82F6', '#A855F7', '#1a1a1a', '#000000']
    return darkBgs.includes(bg) ? '#FFFEF5' : '#1a1a1a'
  }
  const textColor = getTextColor(color)
  
  const buttonContent = (
    <motion.button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${padding} ${fontSize} font-display font-bold cursor-pointer border-[3px] border-brutal-black dark:border-brutal-bg relative min-h-[44px] min-w-[44px]`}
      style={{
        background: color,
        color: textColor,
        boxShadow: `6px 6px 0 ${shadowColor}`,
      }}
      whileHover={{ 
        x: -3, 
        y: -3,
        boxShadow: `9px 9px 0 ${shadowColor}`,
      }}
      whileTap={{ 
        x: 3, 
        y: 3,
        boxShadow: `3px 3px 0 ${shadowColor}`,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.button>
  )

  if (href) {
    return <a href={href}>{buttonContent}</a>
  }

  return buttonContent
}

// ═══════════════════════════════════════════════════════════════
// BRUTAL CARD COMPONENT
// ═══════════════════════════════════════════════════════════════
interface BrutalCardProps {
  readonly children: React.ReactNode
  readonly color?: string
  readonly delay?: number
}

function BrutalCard({ children, color = '#fff', delay = 0 }: BrutalCardProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  
  // Determine text color based on background for WCAG AA compliance
  // Use explicit colors that work regardless of dark/light mode
  const getTextColor = (bg: string): string => {
    const darkBgs = ['#3B82F6', '#A855F7', '#1a1a1a', '#000000']
    return darkBgs.includes(bg) ? '#FFFEF5' : '#1a1a1a'
  }
  const textColor = getTextColor(color)
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      className="border-[3px] border-brutal-black dark:border-brutal-bg p-8 relative"
      style={{
        background: color,
        color: textColor,
        boxShadow: '8px 8px 0 #1a1a1a',
      }}
      whileHover={{
        x: -4,
        y: -4,
        boxShadow: '12px 12px 0 #1a1a1a',
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════
// MARQUEE STRIP COMPONENT
// ═══════════════════════════════════════════════════════════════
interface MarqueeStripProps {
  readonly text: string
  readonly bgColor?: string
  readonly textColor?: string
  readonly direction?: 'left' | 'right'
}

function MarqueeStrip({ 
  text, 
  bgColor = '#FFE600', 
  textColor = '#1a1a1a', 
  direction = 'left' 
}: MarqueeStripProps): JSX.Element {
  const content = Array(10).fill(text).join(' ★ ')
  
  return (
    <div 
      className="border-y-[3px] border-brutal-black dark:border-brutal-bg py-4 overflow-hidden relative"
      style={{ background: bgColor }}
      aria-hidden="true"
      role="presentation"
    >
      <motion.div
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="flex whitespace-nowrap font-display font-bold text-2xl uppercase tracking-wider"
        style={{ color: textColor }}
      >
        {content} ★ {content}
      </motion.div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// MOBILE MENU COMPONENT
// ═══════════════════════════════════════════════════════════════
interface MobileMenuProps {
  readonly isOpen: boolean
  readonly onClose: () => void
}

function MobileMenu({ isOpen, onClose }: MobileMenuProps): JSX.Element {
  // Handle body scroll lock
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

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-brutal-black/80"
            onClick={onClose}
            aria-hidden="true"
          />
          {/* Menu */}
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 w-[80%] max-w-sm h-full bg-brutal-bg dark:bg-brutal-black border-l-[3px] border-brutal-black dark:border-brutal-bg p-8 flex flex-col"
            aria-label="Mobile navigation"
          >
            <button
              onClick={onClose}
              className="self-end p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-sm"
              aria-label="Close navigation menu"
            >
              <span className="font-display font-bold text-2xl" aria-hidden="true">✕</span>
            </button>
            <ul className="flex flex-col gap-6 mt-8 list-none" role="list">
              {['Work', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={onClose}
                    className="font-display font-semibold text-2xl text-brutal-black dark:text-brutal-bg uppercase hover:text-brutal-pink transition-colors py-2 block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-auto">
              <BrutalButton color="#FF5CAA" ariaLabel="Start a conversation">
                Let&apos;s Talk
              </BrutalButton>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ═══════════════════════════════════════════════════════════════
// NAVIGATION COMPONENT
// ═══════════════════════════════════════════════════════════════
function Nav(): JSX.Element {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const handleCloseMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <header>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 flex justify-between items-center transition-all duration-300 ${
          scrolled 
            ? 'bg-brutal-bg dark:bg-brutal-black border-b-[3px] border-brutal-black dark:border-brutal-bg' 
            : 'bg-transparent'
        }`}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <motion.a
          href="/"
          className="font-display font-extrabold text-2xl text-brutal-black dark:text-brutal-bg flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          aria-label="SMASH Studio - Home"
        >
          <span 
            className="inline-block w-8 h-8 bg-brutal-pink border-[3px] border-brutal-black dark:border-brutal-bg transform rotate-45" 
            aria-hidden="true" 
          />
          <span>SMASH</span>
        </motion.a>
        
        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-8 items-center">
          {['Work', 'About', 'Contact'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-display font-semibold text-brutal-black dark:text-brutal-bg uppercase hover:text-brutal-pink transition-colors py-2 px-1"
              whileHover={{ y: -2 }}
            >
              {item}
            </motion.a>
          ))}
          <BrutalButton color="#FF5CAA" ariaLabel="Start a conversation">
            Let&apos;s Talk
          </BrutalButton>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-sm"
          aria-label="Open navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className="font-display font-bold text-2xl text-brutal-black dark:text-brutal-bg" aria-hidden="true">☰</span>
        </button>
      </motion.nav>

      <MobileMenu isOpen={mobileMenuOpen} onClose={handleCloseMenu} />
    </header>
  )
}

// ═══════════════════════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════════════════════
const HERO_SHAPES: readonly FloatingShape[] = [
  { color: '#FFE600', size: 120, top: '15%', left: '8%', rotate: 15 },
  { color: '#3B82F6', size: 80, top: '60%', left: '5%', rotate: -20 },
  { color: '#22C55E', size: 60, top: '75%', right: '10%', rotate: 45 },
  { color: '#A855F7', size: 100, top: '20%', right: '12%', rotate: -10 },
  { color: '#FF6B35', size: 50, top: '45%', right: '5%', rotate: 30 },
] as const

const HERO_STATS: readonly Stat[] = [
  { num: '150+', label: 'Projects Shipped' },
  { num: '8', label: 'Years Running' },
  { num: '100%', label: 'Client Satisfaction' },
] as const

function Hero(): JSX.Element {
  return (
    <section 
      className="min-h-screen bg-brutal-bg dark:bg-brutal-black relative flex items-center justify-center px-4 md:px-8 py-24 pt-32 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Floating shapes - decorative */}
      {HERO_SHAPES.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute border-[3px] border-brutal-black dark:border-brutal-bg z-[1] hidden md:block"
          style={{
            width: shape.size,
            height: shape.size,
            background: shape.color,
            top: shape.top,
            left: shape.left,
            right: shape.right,
            transform: `rotate(${shape.rotate}deg)`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [shape.rotate, shape.rotate + 5, shape.rotate],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          aria-hidden="true"
        />
      ))}
      
      {/* Hero content */}
      <div className="text-center max-w-4xl relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block bg-brutal-yellow border-[3px] border-brutal-black shadow-brutal px-5 py-2 mb-8 font-display font-bold text-sm uppercase text-brutal-black"
        >
          🔥 Denver&apos;s Boldest Creative Agency
        </motion.div>
        
        {/* Main headline */}
        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-display font-extrabold text-[clamp(2.5rem,10vw,7rem)] leading-none text-brutal-black dark:text-brutal-bg mb-8"
        >
          WE MAKE
          <br />
          <span 
            className="inline-block bg-brutal-pink px-2 border-[4px] border-brutal-black dark:border-brutal-bg shadow-brutal transform -rotate-2 text-brutal-black"
          >
            LOUD
          </span>
          {' '}BRANDS
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="font-body text-[clamp(1.125rem,2vw,1.35rem)] text-brutal-black/80 dark:text-brutal-bg/80 max-w-xl mx-auto mb-12 leading-relaxed"
        >
          Strategy. Design. Development. We build digital experiences 
          that refuse to be ignored.
        </motion.p>
        
        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex gap-4 md:gap-6 justify-center flex-wrap"
        >
          <BrutalButton color="#3B82F6" size="large" href="#work" ariaLabel="View our portfolio">
            <span className="text-brutal-bg">See Our Work →</span>
          </BrutalButton>
          <BrutalButton color="#FFE600" size="large" href="#contact" ariaLabel="Start a new project">
            <span className="text-brutal-black">Start a Project</span>
          </BrutalButton>
        </motion.div>
        
        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center gap-8 md:gap-12 mt-16 flex-wrap"
          role="list"
          aria-label="Company statistics"
        >
          {HERO_STATS.map((stat, i) => (
            <div key={i} className="text-center" role="listitem">
              <div className="font-display font-extrabold text-3xl md:text-4xl text-brutal-black dark:text-brutal-bg">
                {stat.num}
              </div>
              <div className="font-body text-sm text-brutal-black/60 dark:text-brutal-bg/60 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SERVICES SECTION
// ═══════════════════════════════════════════════════════════════
const SERVICES: readonly Service[] = [
  { icon: <Palette className="w-12 h-12 stroke-[2.5]" />, title: 'Brand Identity', description: 'Logos, colors, and visual systems that make competitors sweat.', color: '#FFE600' },
  { icon: <Code className="w-12 h-12 stroke-[2.5]" />, title: 'Web Design', description: 'Websites so good, users forget what they came for.', color: '#FF5CAA' },
  { icon: <Smartphone className="w-12 h-12 stroke-[2.5]" />, title: 'App Design', description: 'Mobile experiences that actually deserve screen time.', color: '#3B82F6' },
  { icon: <Rocket className="w-12 h-12 stroke-[2.5]" />, title: 'Development', description: 'We ship fast, we ship clean, we ship things that work.', color: '#22C55E' },
  { icon: <TrendingUp className="w-12 h-12 stroke-[2.5]" />, title: 'Strategy', description: 'Research and planning that makes everything else easier.', color: '#A855F7' },
  { icon: <Sparkles className="w-12 h-12 stroke-[2.5]" />, title: 'Motion Design', description: 'Animation that makes static stuff look sad.', color: '#FF6B35' },
]

function Services(): JSX.Element {
  return (
    <section 
      id="about" 
      className="bg-brutal-bg dark:bg-brutal-black py-16 md:py-24 px-4 md:px-8" 
      aria-labelledby="services-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block bg-brutal-green border-[3px] border-brutal-black shadow-brutal px-5 py-2 mb-6 font-display font-bold text-sm uppercase text-brutal-black"
          >
            What We Do
          </motion.div>
          <motion.h2
            id="services-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-extrabold text-[clamp(2rem,5vw,3.5rem)] text-brutal-black dark:text-brutal-bg"
          >
            Services That Slap
          </motion.h2>
        </div>
        
        {/* Services grid */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 list-none" role="list">
          {SERVICES.map((service, i) => (
            <li key={i}>
              <BrutalCard color={service.color} delay={i * 0.1}>
                <div className="mb-4" aria-hidden="true">
                  {service.icon}
                </div>
                <h3 className="font-display font-bold text-2xl mb-3">
                  {service.title}
                </h3>
                <p className="font-body leading-relaxed opacity-90">
                  {service.description}
                </p>
              </BrutalCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// TRUCHET TILES SHADER BACKGROUND
// ═══════════════════════════════════════════════════════════════
const truchetVertex = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const truchetFragment = `
varying vec2 vUv;
uniform float uTime;
uniform float uScale;
uniform float uLineWidth;
uniform float uAnimSpeed;
uniform float uColorSpeed;
uniform float uAntiAlias;
uniform float uAnimateTiles;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uBackgroundColor;
uniform float uAspect;

#define PI 3.14159265359

float hash21(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float sdRing(vec2 p, vec2 c, float r, float w) {
  return abs(length(p - c) - r) - w;
}

float truchetDoubleArcs(vec2 p, float flip, float w) {
  vec2 corner1 = flip > 0.5 ? vec2(0.0, 0.0) : vec2(1.0, 0.0);
  vec2 corner2 = flip > 0.5 ? vec2(1.0, 1.0) : vec2(0.0, 1.0);
  float d1 = sdRing(p, corner1, 0.5, w);
  float d2 = sdRing(p, corner2, 0.5, w);
  float d3 = sdRing(p, corner1, 0.25, w * 0.7);
  float d4 = sdRing(p, corner2, 0.25, w * 0.7);
  return min(min(d1, d2), min(d3, d4));
}

vec3 palette(float t) {
  t = fract(t);
  if (t < 0.33) {
    return mix(uColor1, uColor2, t * 3.0);
  } else if (t < 0.66) {
    return mix(uColor2, uColor3, (t - 0.33) * 3.0);
  } else {
    return mix(uColor3, uColor1, (t - 0.66) * 3.0);
  }
}

void main() {
  vec2 uv = vUv;
  uv.x *= uAspect;
  vec2 p = uv * uScale;
  vec2 cellId = floor(p);
  vec2 cellUv = fract(p);
  float time = uTime * uAnimSpeed;
  float hash = hash21(cellId);
  float flip = hash;
  if (uAnimateTiles > 0.5) {
    float flipPeriod = 4.0 + hash * 4.0;
    float flipPhase = floor(time / flipPeriod);
    flip = fract(hash + flipPhase * 0.5);
  }
  flip = step(0.5, flip);
  float w = uLineWidth / uScale;
  float d = truchetDoubleArcs(cellUv, flip, w);
  float aa = uAntiAlias / uScale;
  float mask = 1.0 - smoothstep(-aa, aa, d);
  float pathColor = length(uv) + time * uColorSpeed;
  float cellColor = hash21(cellId + vec2(127.1, 311.7));
  vec2 nearestCorner = flip > 0.5 ? 
    (length(cellUv) < length(cellUv - vec2(1.0, 1.0)) ? vec2(0.0) : vec2(1.0)) :
    (length(cellUv - vec2(1.0, 0.0)) < length(cellUv - vec2(0.0, 1.0)) ? vec2(1.0, 0.0) : vec2(0.0, 1.0));
  float arcProgress = atan(cellUv.y - nearestCorner.y, cellUv.x - nearestCorner.x) / PI;
  float colorIndex = pathColor * 0.3 + cellColor * 0.3 + arcProgress * 0.4;
  vec3 lineColor = palette(colorIndex);
  lineColor += vec3(0.15) * smoothstep(w * 0.8, w * 0.3, abs(d));
  vec3 color = mix(uBackgroundColor, lineColor, mask);
  color *= 1.0 - 0.3 * length(uv - 0.5);
  gl_FragColor = vec4(color, 1.0);
}
`

function TruchetPlane(): JSX.Element {
  const meshRef = useRef<THREE.Mesh>(null)
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScale: { value: 18.0 },
    uLineWidth: { value: 0.28 },
    uAnimSpeed: { value: 0.90 },
    uColorSpeed: { value: 0.55 },
    uAntiAlias: { value: 1.5 },
    uAnimateTiles: { value: 1.0 },
    uColor1: { value: new THREE.Color('#00d4ff') },
    uColor2: { value: new THREE.Color('#ff0080') },
    uColor3: { value: new THREE.Color('#ffcc00') },
    uBackgroundColor: { value: new THREE.Color('#171731') },
    uAspect: { value: 1.0 },
  }), [])
  
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms.uTime.value = state.clock.elapsedTime
      const aspect = state.viewport.width / state.viewport.height
      material.uniforms.uAspect.value = aspect
    }
  })
  
  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={truchetVertex}
        fragmentShader={truchetFragment}
        uniforms={uniforms}
      />
    </mesh>
  )
}

function TruchetBackground(): JSX.Element {
  return (
    <div className="absolute inset-0 z-0 w-full h-full" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 90 }}
        style={{ background: '#1a1a1a', width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: false }}
      >
        <TruchetPlane />
      </Canvas>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// WORK/PORTFOLIO SECTION
// ═══════════════════════════════════════════════════════════════
const PROJECTS: readonly Project[] = [
  { title: 'CRYPTO CHAOS', category: 'Branding + Web', image: 'https://picsum.photos/seed/crypto/800/600', color: '#A855F7' },
  { title: 'NEON NIGHTS', category: 'App Design', image: 'https://picsum.photos/seed/neon/800/600', color: '#FF5CAA' },
  { title: 'ORGANIC ORIGINS', category: 'Brand Identity', image: 'https://picsum.photos/seed/organic/800/600', color: '#22C55E' },
  { title: 'RETRO REWIND', category: 'Web + Motion', image: 'https://picsum.photos/seed/retro/800/600', color: '#FF6B35' },
] as const

function Work(): JSX.Element {
  return (
    <section 
      id="work" 
      className="bg-brutal-black py-16 md:py-24 px-4 md:px-8 relative overflow-hidden dark-section" 
      aria-labelledby="work-heading"
    >
      <TruchetBackground />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block bg-brutal-yellow border-[3px] border-brutal-bg shadow-brutal px-5 py-2 mb-6 font-display font-bold text-sm uppercase text-brutal-black"
          >
            Selected Work
          </motion.div>
          <motion.h2
            id="work-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-extrabold text-[clamp(2rem,5vw,3.5rem)] text-brutal-bg"
          >
            Work We&apos;re Proud Of
          </motion.h2>
        </div>
        
        {/* Projects grid */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 list-none" role="list">
          {PROJECTS.map((project, i) => (
            <li key={i}>
              <ProjectCard project={project} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

interface ProjectCardProps {
  readonly project: Project
  readonly index: number
}

function ProjectCard({ project, index }: ProjectCardProps): JSX.Element {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  
  // Determine text color for overlay based on background
  const needsLightText = project.color === '#A855F7'
  const overlayTextClass = needsLightText ? 'text-brutal-bg' : 'text-brutal-black'
  
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="relative aspect-[4/3] border-[4px] border-brutal-bg overflow-hidden cursor-pointer group"
      style={{ boxShadow: `8px 8px 0 ${project.color}` }}
    >
      <a 
        href="#" 
        className="block w-full h-full focus:outline-none focus-visible:ring-4 focus-visible:ring-brutal-yellow focus-visible:ring-offset-2" 
        aria-label={`View ${project.title} project - ${project.category}`}
      >
        {/* Image */}
        <motion.div
          className="w-full h-full"
          animate={{ scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={project.image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading={index < 2 ? 'eager' : 'lazy'}
          />
        </motion.div>
        
        {/* Overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`absolute inset-0 flex flex-col justify-center items-center p-8 ${overlayTextClass}`}
              style={{ background: project.color }}
            >
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="font-body text-sm uppercase tracking-widest mb-2 opacity-90"
              >
                {project.category}
              </motion.span>
              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="font-display font-extrabold text-2xl md:text-3xl text-center"
              >
                {project.title}
              </motion.h3>
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 font-display font-bold border-b-2 border-current"
              >
                View Project →
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </a>
    </motion.article>
  )
}

// ═══════════════════════════════════════════════════════════════
// TESTIMONIALS SECTION
// ═══════════════════════════════════════════════════════════════
const TESTIMONIALS: readonly Testimonial[] = [
  { quote: 'SMASH took our boring fintech brand and made it actually cool. Our conversion rate doubled.', author: 'Sarah Chen', role: 'CEO, PayFlow', color: '#FFE600' },
  { quote: 'Working with them was like having a creative SWAT team. Fast, precise, no BS.', author: 'Marcus Johnson', role: 'Founder, Hype Studios', color: '#FF5CAA' },
  { quote: 'They somehow made an enterprise SaaS product feel fun. Magic.', author: 'Alex Rivera', role: 'CPO, DataVault', color: '#3B82F6' },
] as const

function Testimonials(): JSX.Element {
  return (
    <section 
      className="bg-brutal-bg dark:bg-brutal-black py-16 md:py-24 px-4 md:px-8" 
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block bg-brutal-purple border-[3px] border-brutal-black shadow-brutal px-5 py-2 mb-6 font-display font-bold text-sm uppercase text-brutal-bg"
          >
            Kind Words
          </motion.div>
          <motion.h2
            id="testimonials-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-extrabold text-[clamp(2rem,5vw,3.5rem)] text-brutal-black dark:text-brutal-bg"
          >
            What Clients Say
          </motion.h2>
        </div>
        
        {/* Testimonials grid */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 list-none" role="list">
          {TESTIMONIALS.map((t, i) => (
            <li key={i}>
              <BrutalCard color={t.color} delay={i * 0.15}>
                <figure>
                  <div 
                    className="font-display text-6xl leading-none opacity-20 -mb-4" 
                    aria-hidden="true"
                  >
                    &ldquo;
                  </div>
                  <blockquote className="font-body text-lg leading-relaxed mb-6">
                    {t.quote}
                  </blockquote>
                  <figcaption className="border-t-2 border-current opacity-80 pt-4">
                    <cite className="not-italic">
                      <div className="font-display font-bold">
                        {t.author}
                      </div>
                      <div className="font-body text-sm opacity-80">
                        {t.role}
                      </div>
                    </cite>
                  </figcaption>
                </figure>
              </BrutalCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// CTA SECTION
// ═══════════════════════════════════════════════════════════════
function CTA(): JSX.Element {
  return (
    <section 
      id="contact"
      className="bg-brutal-pink border-y-[4px] border-brutal-black dark:border-brutal-bg py-16 md:py-24 px-4 md:px-8 relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-[50px] -right-[50px] w-[200px] h-[200px] border-[4px] border-brutal-black opacity-30"
        aria-hidden="true"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute -bottom-[30px] -left-[30px] w-[150px] h-[150px] border-[4px] border-brutal-black rounded-full opacity-30"
        aria-hidden="true"
      />
      
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.h2
          id="cta-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-extrabold text-[clamp(2rem,6vw,4rem)] text-brutal-black mb-6 leading-tight"
        >
          READY TO MAKE <br />
          <span 
            className="inline-block bg-brutal-yellow px-2 border-[4px] border-brutal-black shadow-brutal transform rotate-2 text-brutal-black"
          >
            SOME NOISE?
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-body text-[clamp(1rem,2vw,1.25rem)] text-brutal-black/90 mb-10 max-w-xl mx-auto"
        >
          Drop us a line. We&apos;ll buy the first round of coffee 
          and figure out how to make your brand unforgettable.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <BrutalButton 
            color="#1a1a1a" 
            shadowColor="#FFE600" 
            size="large"
            ariaLabel="Start a conversation with our team"
          >
            <span className="text-brutal-bg">Start a Conversation →</span>
          </BrutalButton>
        </motion.div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════
const FOOTER_NAV_LINKS = ['Work', 'Services', 'About', 'Careers'] as const

interface SocialLink {
  readonly name: string
  readonly icon: React.ReactNode
  readonly href: string
}

const SOCIAL_LINKS: readonly SocialLink[] = [
  { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com/smashstudio' },
  { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, href: 'https://instagram.com/smashstudio' },
  { name: 'Dribbble', icon: <Dribbble className="w-5 h-5" />, href: 'https://dribbble.com/smashstudio' },
  { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, href: 'https://linkedin.com/company/smashstudio' },
]

function Footer(): JSX.Element {
  return (
    <footer 
      className="bg-brutal-black dark:bg-brutal-bg py-12 md:py-16 px-4 md:px-8"
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {/* Brand */}
        <div>
          <div className="font-display font-extrabold text-3xl text-brutal-bg dark:text-brutal-black flex items-center gap-2 mb-4">
            <span 
              className="inline-block w-7 h-7 bg-brutal-pink border-[3px] border-brutal-bg dark:border-brutal-black transform rotate-45" 
              aria-hidden="true" 
            />
            <span>SMASH</span>
          </div>
          <p className="font-body text-brutal-bg/70 dark:text-brutal-black/70 leading-relaxed">
            Denver&apos;s boldest creative agency. <br />
            Making brands that refuse to blend in.
          </p>
        </div>
        
        {/* Links */}
        <nav aria-label="Footer navigation - Studio">
          <h4 className="font-display font-bold text-brutal-bg dark:text-brutal-black uppercase mb-4">
            Studio
          </h4>
          <ul className="list-none" role="list">
            {FOOTER_NAV_LINKS.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="block font-body text-brutal-bg/70 dark:text-brutal-black/70 hover:text-brutal-bg dark:hover:text-brutal-black transition-colors mb-2 py-1"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Social */}
        <nav aria-label="Social media links">
          <h4 className="font-display font-bold text-brutal-bg dark:text-brutal-black uppercase mb-4">
            Connect
          </h4>
          <ul className="list-none" role="list">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="flex items-center gap-2 font-body text-brutal-bg/70 dark:text-brutal-black/70 hover:text-brutal-bg dark:hover:text-brutal-black transition-colors mb-2 py-1"
                  aria-label={`Follow us on ${link.name} (opens in new tab)`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {link.icon}
                  <span>{link.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Contact */}
        <div>
          <h4 className="font-display font-bold text-brutal-bg dark:text-brutal-black uppercase mb-4">
            Say Hi
          </h4>
          <a
            href="mailto:hello@smash.studio"
            className="font-body text-brutal-yellow hover:underline focus:underline"
          >
            hello@smash.studio
          </a>
          <address className="font-body text-brutal-bg/70 dark:text-brutal-black/70 mt-4 leading-relaxed not-italic">
            1234 Larimer St<br />
            Denver, CO 80202
          </address>
        </div>
      </div>
      
      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-brutal-bg/20 dark:border-brutal-black/20 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="font-body text-sm text-brutal-bg/50 dark:text-brutal-black/50">
          © {new Date().getFullYear()} SMASH Studio. All rights reserved.
        </span>
        <span className="font-body text-sm text-brutal-bg/50 dark:text-brutal-black/50">
          Built with 🔥 in Denver
        </span>
      </div>
    </footer>
  )
}

// ═══════════════════════════════════════════════════════════════
// STRUCTURED DATA (Server-safe)
// ═══════════════════════════════════════════════════════════════
function StructuredData(): JSX.Element {
  const schema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SMASH Studio',
    description: "Denver's boldest creative agency. Strategy, design, and development for brands that refuse to be ignored.",
    url: 'https://smash.studio',
    logo: 'https://smash.studio/logo.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1234 Larimer St',
      addressLocality: 'Denver',
      addressRegion: 'CO',
      postalCode: '80202',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@smash.studio',
      contactType: 'customer service',
    },
    sameAs: [
      'https://twitter.com/smashstudio',
      'https://instagram.com/smashstudio',
      'https://dribbble.com/smashstudio',
      'https://linkedin.com/company/smashstudio',
    ],
  }), [])

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
export default function BrutalistPage(): JSX.Element {
  return (
    <>
      <StructuredData />
      <SkipLink />
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <MarqueeStrip text="STRATEGY • DESIGN • DEVELOPMENT • BRANDING • MOTION" />
        <Services />
        <Work />
        <MarqueeStrip 
          text="WE MAKE LOUD BRANDS • DENVER'S BOLDEST AGENCY" 
          bgColor="#3B82F6" 
          textColor="#FFFEF5"
          direction="right"
        />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
