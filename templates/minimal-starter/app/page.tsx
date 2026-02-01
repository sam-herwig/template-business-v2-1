'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap'
import { Zap, Globe, TrendingUp } from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CTA from '@/components/CTA'

// ═══════════════════════════════════════════════════════════════
// MINIMAL STARTER TEMPLATE
// Clean, modern SaaS landing page with premium GSAP animations
// ═══════════════════════════════════════════════════════════════

const logos = [
  { name: 'OpenAI', icon: '◯' },
  { name: 'Stripe', icon: '◈' },
  { name: 'Shopify', icon: '◇' },
  { name: 'Netflix', icon: '◆' },
  { name: 'Notion', icon: '□' },
  { name: 'Linear', icon: '◎' },
] as const

const features = [
  { title: 'Lightning Fast', description: 'Deploy in seconds with zero configuration. Your code goes live the moment you push.', icon: Zap },
  { title: 'Global Edge', description: 'Automatically distributed across 100+ edge locations for instant loading worldwide.', icon: Globe },
  { title: 'Built for Scale', description: 'From prototype to production, handle millions of requests without breaking a sweat.', icon: TrendingUp },
]

// ═══════════════════════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════════════════════
function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  
  useGSAP(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const ctx = gsap.context(() => {
      // SplitText animation for headline
      if (headlineRef.current) {
        const split = new SplitText(headlineRef.current, { type: 'chars, words' })
        gsap.from(split.chars, {
          y: 80,
          opacity: 0,
          rotateX: -90,
          stagger: 0.02,
          duration: 1,
          ease: 'back.out(1.7)',
        })
      }
      
      gsap.from('.hero-subheadline', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.6,
      })
      
      gsap.from('.hero-cta', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.8,
      })
      
      // Prism animation
      gsap.from('.prism-animate', {
        scale: 0.8,
        opacity: 0,
        rotateY: 20,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3,
      })
      
      // Parallax on prism
      gsap.to('.prism-animate', {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, heroRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-between px-4 md:px-16 lg:px-32 pt-24 pb-16 gap-16 max-w-7xl mx-auto hero-grid grid grid-cols-1 lg:grid-cols-2" aria-labelledby="hero-heading">
      <div className="flex-1 max-w-xl">
        <h1 id="hero-heading" ref={headlineRef} className="font-display text-[clamp(3rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-tight mb-6">
          Build and deploy
          <br />
          <span className="gradient-text">on the modern web.</span>
        </h1>
        <p className="hero-subheadline text-xl text-minimal-muted dark:text-minimal-dark-muted leading-relaxed mb-10 max-w-lg">
          The platform for developers to build, deploy, and scale applications with zero configuration.
        </p>
        <div className="flex gap-4 flex-wrap">
          <button className="hero-cta btn-primary" aria-label="Start deploying your application">
            Start Deploying <span aria-hidden="true">→</span>
          </button>
          <button className="hero-cta btn-secondary" aria-label="Request a demo of Acme">
            Get a Demo
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center relative" aria-hidden="true">
        <div className="prism-animate relative w-[300px] h-[350px]">
          <div className="absolute inset-0 opacity-90" style={{ background: 'linear-gradient(135deg, #ff0080 0%, #ff00ff 50%, #7928ca 100%)', clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
          <div className="absolute inset-0 opacity-70" style={{ background: 'linear-gradient(135deg, #7928ca 0%, #0070f3 100%)', clipPath: 'polygon(50% 0%, 100% 100%, 50% 70%)' }} />
          <div className="absolute inset-0 opacity-80" style={{ background: 'linear-gradient(135deg, #0070f3 0%, #00d4ff 100%)', clipPath: 'polygon(50% 0%, 50% 70%, 0% 100%)' }} />
        </div>
        <div className="absolute w-[400px] h-[400px] rounded-full -z-10" style={{ background: 'radial-gradient(circle, rgba(121, 40, 202, 0.3) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// LOGO BAR
// ═══════════════════════════════════════════════════════════════
function LogoBar() {
  const logoRef = useRef<HTMLElement>(null)
  
  useGSAP(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const ctx = gsap.context(() => {
      gsap.from('.logo-item', {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: logoRef.current,
          start: 'top 85%',
        },
      })
    }, logoRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={logoRef} className="py-16 px-4 md:px-16 border-y border-minimal-border dark:border-minimal-dark-border bg-white dark:bg-minimal-dark-card" aria-labelledby="trusted-by-heading">
      <h2 id="trusted-by-heading" className="text-center text-xs text-minimal-muted dark:text-minimal-dark-muted uppercase tracking-widest mb-8">Trusted by the best teams</h2>
      <ul className="flex justify-center items-center gap-8 md:gap-16 flex-wrap" role="list">
        {logos.map((logo) => (
          <li key={logo.name} className="logo-item flex items-center gap-2 text-minimal-muted dark:text-minimal-dark-muted hover:text-minimal-text dark:hover:text-minimal-dark-text transition-colors">
            <span className="text-2xl" aria-hidden="true">{logo.icon}</span>
            <span className="hidden md:inline font-semibold">{logo.name}</span>
            <span className="md:hidden sr-only">{logo.name}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// BENTO SECTION
// ═══════════════════════════════════════════════════════════════
function BentoSection() {
  const bentoRef = useRef<HTMLElement>(null)
  
  useGSAP(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const ctx = gsap.context(() => {
      gsap.from('.bento-card', {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bentoRef.current,
          start: 'top 75%',
        },
      })
    }, bentoRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={bentoRef} className="py-16 md:py-24 px-4 md:px-16 max-w-6xl mx-auto" aria-labelledby="bento-heading">
      <h2 id="bento-heading" className="sr-only">Platform Statistics</h2>
      <div className="bento-grid grid grid-cols-3 grid-rows-2 gap-4" style={{ gridTemplateRows: 'repeat(2, 240px)' }}>
        <article className="bento-card bento-large">
          <div className="absolute top-0 left-0 right-0 h-[60%] rounded-t-2xl opacity-10" style={{ background: 'linear-gradient(135deg, #ff0080 0%, #7928ca 50%, #0070f3 100%)' }} aria-hidden="true" />
          <div className="absolute top-6 right-6 text-right">
            <span className="block font-display text-5xl font-bold tracking-tight" style={{ background: 'linear-gradient(135deg, #ff0080, #7928ca)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>~50ms</span>
            <span className="text-sm text-minimal-muted dark:text-minimal-dark-muted">avg deploy</span>
          </div>
          <div className="relative z-10">
            <span className="block text-xs font-semibold uppercase tracking-wider text-minimal-muted dark:text-minimal-dark-muted mb-2">Performance</span>
            <h3 className="font-display text-xl font-semibold tracking-tight mb-1">Sub-second deploys</h3>
            <p className="text-sm text-minimal-muted dark:text-minimal-dark-muted">From git push to live in milliseconds.</p>
          </div>
        </article>
        
        <article className="bento-card">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[120px] h-[120px]" aria-hidden="true">
            <div className="absolute top-0 left-[30px] w-[60px] h-[60px] rounded-full opacity-80 orb-animate" style={{ background: 'linear-gradient(135deg, #ff0080, #ff00ff)' }} />
            <div className="absolute bottom-[10px] left-0 w-[40px] h-[40px] rounded-full opacity-70 orb-animate" style={{ background: 'linear-gradient(135deg, #7928ca, #0070f3)', animationDelay: '0.5s' }} />
            <div className="absolute bottom-[20px] right-0 w-[50px] h-[50px] rounded-full opacity-60 orb-animate" style={{ background: 'linear-gradient(135deg, #0070f3, #00d4ff)', animationDelay: '1s' }} />
          </div>
          <div className="relative z-10">
            <span className="block text-xs font-semibold uppercase tracking-wider text-minimal-muted dark:text-minimal-dark-muted mb-2">Scale</span>
            <h3 className="font-display text-xl font-semibold tracking-tight">100+ edge locations</h3>
          </div>
        </article>
        
        <article className="bento-card">
          <div className="absolute top-6 left-6 right-6 h-[80px] flex flex-col gap-2" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-1 rounded line-animate" style={{ background: 'linear-gradient(90deg, #e5e5e5 0%, #0070f3 50%, #e5e5e5 100%)', backgroundSize: '200% 100%', animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
          <div className="relative z-10">
            <span className="block text-xs font-semibold uppercase tracking-wider text-minimal-muted dark:text-minimal-dark-muted mb-2">Analytics</span>
            <h3 className="font-display text-xl font-semibold tracking-tight">Real-time insights</h3>
          </div>
        </article>
        
        <article className="bento-card bento-wide">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-6 rounded-xl" style={{ background: '#171717', fontFamily: 'SF Mono, Fira Code, monospace' }}>
            <code className="text-gray-300">
              <span className="text-gray-500">// Deploy with one command</span><br/>
              <span className="text-blue-400">$</span> vercel --prod
            </code>
          </div>
        </article>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// FEATURES SECTION
// ═══════════════════════════════════════════════════════════════
function Features() {
  const featuresRef = useRef<HTMLElement>(null)
  
  useGSAP(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const ctx = gsap.context(() => {
      gsap.from('.features-header', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 75%',
        },
      })
      
      gsap.from('.feature-card', {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.features-grid',
          start: 'top 75%',
        },
      })
    }, featuresRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={featuresRef} id="features" className="py-16 md:py-32 px-4 md:px-16 max-w-6xl mx-auto" aria-labelledby="features-heading">
      <div className="features-header text-center mb-16">
        <span className="feature-tag mb-6">Features</span>
        <h2 id="features-heading" className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tight">
          Everything you need.
          <br />
          Nothing you don&apos;t.
        </h2>
      </div>
      
      <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-8" role="list">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <article key={feature.title} className="feature-card" role="listitem">
              <Icon className="w-10 h-10 mb-4" aria-hidden="true" />
              <h3 className="text-xl font-bold tracking-tight mb-3">{feature.title}</h3>
              <p className="text-minimal-muted dark:text-minimal-dark-muted leading-relaxed">{feature.description}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE EXPORT
// ═══════════════════════════════════════════════════════════════
export default function MinimalPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header>
        <Nav />
      </header>
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <LogoBar />
        <BentoSection />
        <Features />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
