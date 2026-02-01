'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap'
import Image from 'next/image'

// ═══════════════════════════════════════════════════════════════
// COACH STARTER TEMPLATE
// A warm, personal landing page for coaches, consultants & creators
// Premium GSAP animations: warm, personal, not too flashy
// ═══════════════════════════════════════════════════════════════

const HERO_CONTENT = {
  headline: 'Helping Ambitious Women',
  headlineHighlight: 'Build Businesses They Love',
  subheadline: "You've got the expertise. You've got the drive. But turning your gifts into a thriving business? That's where I come in.",
  primaryCta: 'Book a Free Discovery Call',
  secondaryCta: 'Learn About My Approach',
  image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=700&fit=crop',
}

const ABOUT_CONTENT = {
  title: 'Hey there, I\'m Sarah',
  subtitle: 'Business Coach & Strategist',
  story: [
    "Ten years ago, I was exactly where you are now. Talented, driven, and completely overwhelmed trying to build something meaningful.",
    "After burning out twice in corporate, I finally cracked the code — and it wasn't about working harder. It was about building a business that actually fits your life.",
    "Now I've helped over 200 women launch and scale businesses that give them freedom, fulfillment, and (yes) a really good income.",
  ],
  credentials: ['ICF Certified Coach', '10+ Years Business Strategy', 'Featured in Forbes & Entrepreneur', '200+ Clients Served'],
  image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=500&fit=crop',
}

const SERVICES = [
  { name: '1:1 Coaching', description: 'Personalized support to build your business strategy, overcome mindset blocks, and take consistent action.', features: ['12 weekly sessions', 'Unlimited Voxer access', 'Custom action plans', 'Accountability check-ins'], price: 'Starting at $3,500', cta: 'Apply Now' },
  { name: 'Group Program', description: 'Join a community of ambitious women building businesses together. Learn, grow, and celebrate wins as a group.', features: ['8-week program', 'Weekly group calls', 'Private community', 'Templates & resources'], price: '$997', cta: 'Join Waitlist' },
  { name: 'VIP Intensive', description: 'A full day together to map out your entire business strategy. Leave with clarity and a complete action plan.', features: ['6-hour session', 'Full business audit', '90-day roadmap', '30 days follow-up support'], price: '$2,500', cta: 'Book Your Day' },
]

const RESULTS = [
  { metric: '200', suffix: '+', label: 'Clients Helped' },
  { metric: '2.4', suffix: 'M', label: 'Revenue Generated', prefix: '$' },
  { metric: '94', suffix: '%', label: 'Hit Their Goals' },
  { metric: '4.9', suffix: '★', label: 'Average Rating' },
]

const TESTIMONIALS = [
  { quote: "Working with Sarah completely transformed how I see my business. I went from barely scraping by to my first $10K month within 3 months. She doesn't just teach strategy — she helps you believe it's possible.", author: 'Jessica Martinez', role: 'Life Coach', result: '$10K month in 3 months', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { quote: "I've worked with other coaches before, but Sarah is different. She actually listens, meets you where you are, and gives you a roadmap that makes sense. I finally feel like I know what I'm doing.", author: 'Amanda Chen', role: 'Brand Strategist', result: 'Fully booked in 6 weeks', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { quote: "The VIP Intensive was worth every penny. I walked in overwhelmed and walked out with complete clarity. Six months later, I've tripled my revenue and actually take weekends off.", author: 'Rachel Thompson', role: 'Business Consultant', result: '3x revenue in 6 months', avatar: 'https://randomuser.me/api/portraits/women/33.jpg' },
]

const LEAD_MAGNET = {
  title: 'Free Guide: The 5 Shifts That Took Me From Burnout to $20K Months',
  description: "The exact mindset and strategy shifts I made (and now teach my clients) to build a business that actually works for me. No fluff, just what worked.",
  cta: 'Send Me the Guide',
  features: ['Actionable shifts you can make today', 'Real examples from my journey', 'Bonus: pricing calculator'],
}

const FAQ = [
  { question: 'How do I know if coaching is right for me?', answer: "Coaching is for you if you're ready to take action and want support getting there faster. If you're looking for someone to do the work for you, this isn't it. But if you want a partner who'll help you unlock your potential and hold you accountable? Let's talk." },
  { question: 'What makes your approach different?', answer: "I don't believe in one-size-fits-all. I've seen too many coaches push cookie-cutter strategies that work for them but not their clients. We'll build a plan that fits YOUR life, your strengths, and your goals — not mine." },
  { question: 'How long until I see results?', answer: "Most clients see mindset shifts immediately and tangible business results within 30-60 days. The timeline depends on where you're starting and how much action you take. I won't promise overnight success, but I will promise you'll move faster than going alone." },
  { question: 'Do you offer payment plans?', answer: "Yes! I believe money shouldn't be the only barrier to growth. All programs have payment plan options. We can discuss what works for you on our discovery call." },
]

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream-100/90 backdrop-blur-lg border-b border-cream-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="font-display text-2xl text-primary-700">Sarah Mitchell</a>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-primary-800/70 hover:text-primary-800 transition-colors">About</a>
            <a href="#services" className="text-primary-800/70 hover:text-primary-800 transition-colors">Services</a>
            <a href="#testimonials" className="text-primary-800/70 hover:text-primary-800 transition-colors">Results</a>
            <a href="#faq" className="text-primary-800/70 hover:text-primary-800 transition-colors">FAQ</a>
          </div>
          
          <div className="hidden md:block">
            <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-full font-medium transition-colors">Work With Me</button>
          </div>
          
          <button className="md:hidden p-2 text-primary-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-cream-300">
            <div className="flex flex-col gap-4">
              <a href="#about" className="text-primary-800/70 hover:text-primary-800">About</a>
              <a href="#services" className="text-primary-800/70 hover:text-primary-800">Services</a>
              <a href="#testimonials" className="text-primary-800/70 hover:text-primary-800">Results</a>
              <a href="#faq" className="text-primary-800/70 hover:text-primary-800">FAQ</a>
              <button className="bg-primary-500 text-white px-6 py-3 rounded-full font-medium w-full">Work With Me</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const ctx = gsap.context(() => {
      // SplitText on headline - words for warm, personal feel
      if (headlineRef.current) {
        const split = new SplitText(headlineRef.current, { type: 'words' })
        gsap.from(split.words, {
          y: 40,
          opacity: 0,
          stagger: 0.06,
          duration: 1,
          ease: 'power3.out',
          delay: 0.2,
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
        delay: 0.9,
      })
      
      // Image with subtle parallax
      gsap.from('.hero-image', {
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3,
      })
      
      gsap.to('.hero-image', {
        yPercent: 10,
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
    <section ref={heroRef} className="pt-32 pb-20 md:pt-40 md:pb-28 bg-cream-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 ref={headlineRef} className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-900 leading-tight mb-6">
              {HERO_CONTENT.headline}
              <br />
              <span className="text-primary-800">{HERO_CONTENT.headlineHighlight}</span>
            </h1>
            
            <p className="hero-subheadline text-lg md:text-xl text-primary-800/70 mb-8 leading-relaxed">
              {HERO_CONTENT.subheadline}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="hero-cta bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-full font-medium text-lg transition-all hover:shadow-lg">
                {HERO_CONTENT.primaryCta}
              </button>
              <button className="hero-cta text-primary-700 hover:text-primary-800 px-8 py-4 font-medium text-lg transition-colors">
                {HERO_CONTENT.secondaryCta} →
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-sage-400/30 rounded-3xl rotate-3"></div>
            <Image src={HERO_CONTENT.image} alt="Coach portrait" width={600} height={700} className="hero-image relative rounded-2xl shadow-xl w-full object-cover aspect-[4/5]" />
          </div>
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
      // Image clip-path reveal
      gsap.from('.about-image', {
        clipPath: 'inset(100% 0 0 0)',
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.about-image',
          start: 'top 80%',
        },
      })
      
      gsap.from('.about-content', {
        x: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 70%',
        },
      })
      
      // Credentials stagger
      gsap.from('.credential-badge', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.credentials-wrap',
          start: 'top 85%',
        },
      })
    }, aboutRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={aboutRef} id="about" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 md:order-1">
            <div className="absolute -inset-4 bg-primary-200/50 rounded-3xl -rotate-2"></div>
            <Image src={ABOUT_CONTENT.image} alt="About portrait" width={500} height={500} className="about-image relative rounded-2xl shadow-lg w-full max-w-md mx-auto aspect-square object-cover" />
          </div>
          
          <div className="about-content order-1 md:order-2">
            <p className="text-sage-500 font-medium mb-2">{ABOUT_CONTENT.subtitle}</p>
            <h2 className="font-display text-3xl md:text-4xl text-primary-900 mb-6">{ABOUT_CONTENT.title}</h2>
            
            <div className="space-y-4 text-primary-800/70 mb-8">
              {ABOUT_CONTENT.story.map((paragraph, i) => (
                <p key={i} className="leading-relaxed">{paragraph}</p>
              ))}
            </div>
            
            <div className="credentials-wrap flex flex-wrap gap-3">
              {ABOUT_CONTENT.credentials.map((cred, i) => (
                <span key={i} className="credential-badge bg-cream-200 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">{cred}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Results() {
  const resultsRef = useRef<HTMLElement>(null)
  
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const ctx = gsap.context(() => {
      // Counter animation
      gsap.utils.toArray<HTMLElement>('.result-number').forEach((el) => {
        const value = parseFloat(el.dataset.value || '0')
        const obj = { value: 0 }
        
        gsap.to(obj, {
          value,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
          onUpdate: () => {
            el.textContent = value % 1 === 0 ? Math.floor(obj.value).toString() : obj.value.toFixed(1)
          },
        })
      })
      
      gsap.from('.result-item', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: resultsRef.current,
          start: 'top 80%',
        },
      })
    }, resultsRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={resultsRef} className="py-16 bg-primary-500">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {RESULTS.map((result, i) => (
            <div key={i} className="result-item text-center">
              <div className="font-display text-4xl md:text-5xl text-white mb-2">
                {result.prefix || ''}<span className="result-number" data-value={result.metric}>0</span>{result.suffix}
              </div>
              <div className="text-white/80 font-medium">{result.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Services() {
  const servicesRef = useRef<HTMLElement>(null)
  
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const ctx = gsap.context(() => {
      gsap.from('.services-header', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 75%',
        },
      })
      
      gsap.from('.service-card', {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 75%',
        },
      })
    }, servicesRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={servicesRef} id="services" className="py-20 md:py-28 bg-cream-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="services-header text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl text-primary-900 mb-4">Ways We Can Work Together</h2>
          <p className="text-primary-800/70 text-lg">Choose the level of support that fits where you are right now. Every journey is different — and that's the point.</p>
        </div>
        
        <div className="services-grid grid md:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => (
            <div key={i} className="service-card bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-cream-300">
              <h3 className="font-display text-2xl text-primary-900 mb-3">{service.name}</h3>
              <p className="text-primary-800/70 mb-6">{service.description}</p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-primary-800/80">
                    <svg className="w-5 h-5 text-sage-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="pt-6 border-t border-cream-200">
                <div className="text-2xl font-display text-primary-900 mb-4">{service.price}</div>
                <button className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-full font-medium transition-colors">{service.cta}</button>
              </div>
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
      
      // SplitText on testimonial quotes for elegant reveal
      gsap.utils.toArray<HTMLElement>('.testimonial-card').forEach((card) => {
        gsap.from(card, {
          y: 40,
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
    <section ref={testimonialsRef} id="testimonials" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="testimonials-header text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl text-primary-900 mb-4">Real Women, Real Results</h2>
          <p className="text-primary-800/70 text-lg">Don't take my word for it. Here's what my clients have to say.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, i) => (
            <div key={i} className="testimonial-card bg-cream-100 rounded-2xl p-8">
              <div className="inline-block bg-sage-700 text-white text-sm font-medium px-3 py-1 rounded-full mb-4">{testimonial.result}</div>
              <p className="text-primary-800/80 mb-6 leading-relaxed">"{testimonial.quote}"</p>
              <div className="flex items-center gap-3">
                <Image src={testimonial.avatar} alt={testimonial.author} width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-medium text-primary-900">{testimonial.author}</div>
                  <div className="text-sm text-primary-800/60">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function LeadMagnet() {
  const [email, setEmail] = useState('')
  const leadRef = useRef<HTMLElement>(null)
  
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const ctx = gsap.context(() => {
      gsap.from('.lead-magnet-card', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: leadRef.current,
          start: 'top 75%',
        },
      })
    }, leadRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={leadRef} className="py-20 md:py-28 bg-sage-400">
      <div className="max-w-4xl mx-auto px-6">
        <div className="lead-magnet-card bg-white rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-primary-900 mb-4">{LEAD_MAGNET.title}</h2>
              <p className="text-primary-800/70 mb-6">{LEAD_MAGNET.description}</p>
              <ul className="space-y-2 text-sm text-primary-800/80">
                {LEAD_MAGNET.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-sage-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <div className="space-y-4">
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-5 py-4 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-primary-500 text-primary-900" />
                <button className="w-full bg-primary-500 hover:bg-primary-600 text-white py-4 rounded-xl font-medium text-lg transition-colors">{LEAD_MAGNET.cta}</button>
                <p className="text-xs text-primary-800/50 text-center">No spam, ever. Unsubscribe anytime.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const faqRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const ctx = gsap.context(() => {
      gsap.from('.faq-header', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: faqRef.current,
          start: 'top 75%',
        },
      })
      
      gsap.from('.faq-item', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.faq-list',
          start: 'top 75%',
        },
      })
    }, faqRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={faqRef} id="faq" className="py-20 md:py-28 bg-cream-100">
      <div className="max-w-3xl mx-auto px-6">
        <div className="faq-header text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl text-primary-900 mb-4">Questions? I've Got Answers.</h2>
          <p className="text-primary-800/70 text-lg">Still not sure? Here's what most people ask before we work together.</p>
        </div>
        
        <div className="faq-list space-y-4">
          {FAQ.map((item, i) => (
            <div key={i} className="faq-item bg-white rounded-xl overflow-hidden border border-cream-300">
              <button className="w-full px-6 py-5 text-left flex items-center justify-between font-medium text-primary-900 hover:bg-cream-50 transition-colors" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <span className="font-display text-lg">{item.question}</span>
                <svg className={`w-5 h-5 text-primary-500 transition-transform flex-shrink-0 ml-4 ${openIndex === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }} 
                    animate={prefersReducedMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }} 
                    exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }} 
                    transition={{ duration: prefersReducedMotion ? 0.1 : 0.3 }}>
                    <div className="px-6 pb-5 text-primary-800/70 leading-relaxed">{item.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
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
    <section ref={ctaRef} className="py-20 md:py-28 bg-primary-900">
      <div className="max-w-4xl mx-auto px-6 text-center cta-content">
        <h2 className="font-display text-3xl md:text-4xl text-white mb-6">Ready to Build a Business You Love?</h2>
        <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">Let's start with a free discovery call. No pressure, no pitch — just a conversation about where you are and where you want to go.</p>
        <button className="bg-white hover:bg-cream-100 text-primary-700 px-10 py-5 rounded-full font-medium text-lg transition-all hover:shadow-lg">Book Your Free Call →</button>
        <p className="text-white/50 text-sm mt-6">30 minutes • Video or phone • Zero obligation</p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-cream-200 py-12 border-t border-cream-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <a href="/" className="font-display text-2xl text-primary-700 block mb-4">Sarah Mitchell</a>
            <p className="text-primary-800/60 max-w-sm">Helping ambitious women build businesses that give them freedom, fulfillment, and a really good income.</p>
          </div>
          
          <div>
            <h4 className="font-medium text-primary-900 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-primary-800/60 text-sm">
              <li><a href="#about" className="hover:text-primary-700">About</a></li>
              <li><a href="#services" className="hover:text-primary-700">Services</a></li>
              <li><a href="#testimonials" className="hover:text-primary-700">Results</a></li>
              <li><a href="#faq" className="hover:text-primary-700">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-primary-900 mb-4">Connect</h4>
            <ul className="space-y-2 text-primary-800/60 text-sm">
              <li><a href="#" className="hover:text-primary-700">Instagram</a></li>
              <li><a href="#" className="hover:text-primary-700">LinkedIn</a></li>
              <li><a href="#" className="hover:text-primary-700">Podcast</a></li>
              <li><a href="#" className="hover:text-primary-700">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-cream-300 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-800/50 text-sm">© {new Date().getFullYear()} Sarah Mitchell Coaching. All rights reserved.</p>
          <div className="flex items-center gap-6 text-primary-800/50 text-sm">
            <a href="#" className="hover:text-primary-700">Privacy</a>
            <a href="#" className="hover:text-primary-700">Terms</a>
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
    <main id="main-content" className="bg-cream-100">
      <Nav />
      <Hero />
      <About />
      <Results />
      <Services />
      <Testimonials />
      <LeadMagnet />
      <FAQSection />
      <CTA />
      <Footer />
    </main>
  )
}
