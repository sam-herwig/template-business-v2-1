'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '@/lib/gsap'
import Image from 'next/image'
import {
  Nav,
  Footer,
  PageHero,
  SectionHeader,
  PhotoGallery,
  BeliefCard,
  MediaLogos,
  CTASection,
} from '@/components'

// ═══════════════════════════════════════════════════════════════
// ABOUT PAGE DATA
// ═══════════════════════════════════════════════════════════════

const ABOUT = {
  name: 'Sarah Mitchell',
  title: 'Business Coach & Strategist',
  portrait: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=700&fit=crop',
  credentials: [
    'ICF Certified Coach',
    '10+ Years Business Strategy',
    'Featured in Forbes & Entrepreneur',
    '200+ Clients Served',
  ],
  story: {
    intro: "Ten years ago, I was exactly where you are now. Talented, driven, and completely overwhelmed trying to build something meaningful.",
    chapters: [
      {
        title: 'The Struggle',
        content: "I spent years in corporate, climbing the ladder and achieving everything I was \"supposed\" to want. But inside? I was burnt out, unfulfilled, and dreaming of something more. I quit twice before I finally figured it out.",
      },
      {
        title: 'The Breakthrough',
        content: "My breakthrough didn't come from a business course or a magic formula. It came when I finally stopped trying to fit myself into someone else's version of success. I started building a business around MY life, MY values, and MY definition of enough.",
      },
      {
        title: 'The Mission',
        content: "Now, I help women like you do the same thing. Not with cookie-cutter strategies or hustling until you burn out — but with clarity, intention, and a roadmap that actually fits who you are and how you want to live.",
      },
    ],
    pullQuote: "I realized it wasn't about working harder. It was about building a business that actually fits your life.",
  },
}

const PHOTOS = [
  { src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop', alt: 'Speaking at event' },
  { src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop', alt: 'Portrait' },
  { src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=400&fit=crop', alt: 'Working with client' },
  { src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop', alt: 'Group session' },
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', alt: 'Behind the scenes' },
  { src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=400&fit=crop', alt: 'Office space' },
]

const BELIEFS = [
  { emoji: '☯️', title: 'Life First, Business Second', description: "Your business should fit your life, not the other way around. Success means nothing if you're too burnt out to enjoy it." },
  { emoji: '🎯', title: 'Strategy + Mindset', description: "Strategy without mindset is just a to-do list. We work on both because lasting change requires both." },
  { emoji: '💫', title: 'You Already Have It', description: "You already have everything you need inside you. I'm just here to help you access it, trust it, and use it." },
]

const FUN_FACTS = [
  { emoji: '☕', text: 'Obsessed with oat milk lattes' },
  { emoji: '🐕', text: 'Dog mom to a golden named Luna' },
  { emoji: '📚', text: 'Currently reading: Atomic Habits' },
  { emoji: '🎵', text: 'Spotify playlist: 90s hip-hop' },
]

// ═══════════════════════════════════════════════════════════════
// ABOUT PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null)
  const storyRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Hero image reveal
      gsap.fromTo('.about-hero-image', 
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power4.out', delay: 0.3 }
      )

      gsap.fromTo('.about-hero-content', 
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.5 }
      )

      gsap.fromTo('.credential-chip', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out', delay: 0.8 }
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.story-chapter', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: storyRef.current, start: 'top 70%', toggleActions: 'play none none reverse' }
        }
      )

      gsap.fromTo('.pull-quote', 
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.pull-quote', start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      )
    }, storyRef)

    return () => ctx.revert()
  }, [])

  return (
    <main id="main-content" className="bg-cream-100">
      <Nav />
      
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-16 md:pt-40 md:pb-20 bg-cream-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 md:order-1">
              <div className="absolute -inset-4 bg-sage-400/30 rounded-3xl rotate-3" />
              <Image
                src={ABOUT.portrait}
                alt={ABOUT.name}
                width={500}
                height={600}
                className="about-hero-image relative rounded-2xl shadow-xl w-full object-cover aspect-[4/5]"
              />
            </div>
            
            <div className="about-hero-content order-1 md:order-2">
              <p className="section-eyebrow">My Story</p>
              <h1 className="font-display text-4xl md:text-5xl text-primary-900 leading-tight mb-4">
                Hey, I'm Sarah
              </h1>
              <p className="text-lg text-primary-800/70 leading-relaxed mb-6">
                {ABOUT.story.intro}
              </p>
              <div className="flex flex-wrap gap-3">
                {ABOUT.credentials.map((cred, i) => (
                  <span
                    key={i}
                    className="credential-chip bg-cream-200 text-primary-700 px-4 py-2 rounded-full text-sm font-medium border border-cream-300"
                  >
                    {cred}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-3xl text-primary-900 text-center mb-12">
            The Long Version
          </h2>
          
          <div className="space-y-8">
            {ABOUT.story.chapters.map((chapter, i) => (
              <div key={i} className="story-chapter">
                <h3 className="font-display text-xl text-primary-900 mb-3">{chapter.title}</h3>
                <p className="text-primary-800/70 leading-relaxed">{chapter.content}</p>
              </div>
            ))}
          </div>

          <blockquote className="pull-quote my-12 bg-sage-100 border-l-4 border-sage-400 rounded-r-xl px-8 py-6">
            <p className="font-display text-xl text-primary-900 italic leading-relaxed">
              "{ABOUT.story.pullQuote}"
            </p>
          </blockquote>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 md:py-20 bg-cream-100">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader title="Behind the Scenes" />
          <PhotoGallery photos={PHOTOS} />
        </div>
      </section>

      {/* Philosophy / Beliefs */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeader
            title="What I Believe"
            description="The principles that guide my work and my life."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {BELIEFS.map((belief, i) => (
              <BeliefCard key={i} {...belief} />
            ))}
          </div>
        </div>
      </section>

      {/* Media & Credentials */}
      <section className="py-16 md:py-20 bg-cream-100">
        <div className="max-w-5xl mx-auto px-6">
          <MediaLogos
            title="As Featured In"
            logos={[
              { name: 'Forbes' },
              { name: 'Entrepreneur' },
              { name: 'HuffPost' },
              { name: 'Inc.' },
            ]}
          />
        </div>
      </section>

      {/* Fun Facts */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeader title="When I'm Not Coaching..." />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FUN_FACTS.map((fact, i) => (
              <div
                key={i}
                className="bg-cream-100 rounded-2xl p-6 text-center border border-cream-300 hover:border-sage-300 transition-colors"
              >
                <div className="text-3xl mb-3">{fact.emoji}</div>
                <p className="text-sm text-primary-800/80">{fact.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Ready to Write Your Own Success Story?"
        description="Let's chat about where you are, where you want to be, and how I can help you get there."
        ctaLabel="Book a Free Discovery Call"
        ctaHref="/book"
      />

      <Footer />
    </main>
  )
}
