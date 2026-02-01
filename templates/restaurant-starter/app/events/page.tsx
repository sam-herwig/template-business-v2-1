'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { FileText, Phone } from 'lucide-react'
import { SkipLink } from '@/components/SkipLink'
import { PageHero, SectionWrapper } from '@/components/shared'
import { EventSpaceCard, SpaceDetail, EventInquiryForm, EventFAQ } from '@/components/events'
import { Nav, Footer } from '../_components'
import type { EventSpace } from '@/types'

// ═══════════════════════════════════════════════════════════════
// EVENTS PAGE DATA
// ═══════════════════════════════════════════════════════════════

const EVENT_SPACES: EventSpace[] = [
  {
    id: 'private-room',
    name: 'The Reserve',
    description: 'Our intimate private dining room offers an elegant setting for special celebrations. With its own entrance, dedicated server, and customizable ambiance, it\'s perfect for milestone occasions.',
    capacity: { min: 12, max: 24 },
    minSpend: 1500,
    features: [
      'Private entrance',
      'Dedicated server',
      'Custom menu options',
      'A/V equipment',
      'Complimentary valet',
      'Flexible seating',
    ],
    images: [
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop&q=85',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&q=85',
    ],
    bestFor: ['Intimate celebrations', 'Corporate dinners', 'Rehearsal dinners'],
  },
  {
    id: 'wine-cellar',
    name: 'The Wine Cellar',
    description: 'Surrounded by our curated wine collection, this unique space offers an unforgettable backdrop for wine dinners and sophisticated gatherings. The sommelier can guide a tasting experience.',
    capacity: { min: 8, max: 16 },
    minSpend: 1200,
    features: [
      'Ambient wine storage display',
      'Sommelier-led tastings available',
      'Climate controlled',
      'Custom wine pairing menus',
      'Exclusive wine selections',
    ],
    images: [
      'https://images.unsplash.com/photo-1528823872057-9c018a7a7553?w=800&h=600&fit=crop&q=85',
      'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&h=600&fit=crop&q=85',
    ],
    bestFor: ['Wine dinners', 'Client entertainment', 'Intimate gatherings'],
  },
  {
    id: 'full-buyout',
    name: 'Full Restaurant Buyout',
    description: 'Transform the entire restaurant into your private venue. Perfect for large celebrations, corporate events, and weddings. Our team will work with you to create a truly bespoke experience.',
    capacity: { min: 60, max: 100 },
    minSpend: 8000,
    features: [
      'Exclusive use of entire venue',
      'Custom menu development',
      'Full bar service',
      'Live music permitted',
      'Décor flexibility',
      'Event coordinator',
    ],
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&q=85',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&q=85',
    ],
    bestFor: ['Weddings', 'Corporate galas', 'Holiday parties', 'Launch events'],
  },
]

// ═══════════════════════════════════════════════════════════════
// EVENTS PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function EventsPage() {
  const spacesRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.from('.space-card', {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: spacesRef.current,
        start: 'top 80%',
      },
    })
  }, [])

  const scrollToSpace = (id: string) => {
    const element = document.getElementById(`space-${id}`)
    if (element) {
      const offset = 120
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      })
    }
  }

  return (
    <>
      <SkipLink />
      <Nav />
      <main id="main-content">
        <PageHero
          title="Private Events"
          subtitle="Create unforgettable moments in our stunning spaces"
          backgroundImage="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1920&h=1080&fit=crop&q=85"
          height="medium"
          breadcrumbs={[{ label: 'Private Events', href: '/events' }]}
        />

        {/* Intro */}
        <SectionWrapper background="default">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-[rgb(var(--muted-foreground))] leading-relaxed">
              From intimate gatherings to grand celebrations, The Golden Fork offers unique spaces 
              to host your most important occasions. Our dedicated events team will work with you 
              to craft a personalized experience that exceeds expectations.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {['Corporate Events', 'Weddings', 'Birthdays', 'Holiday Parties', 'Wine Dinners'].map((type) => (
                <span
                  key={type}
                  className="px-4 py-2 bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))] text-sm rounded-full"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Space Cards */}
        <section className="section-padding-sm bg-[rgb(var(--muted))]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="section-eyebrow">Our Spaces</span>
              <h2 className="font-display text-3xl md:text-4xl text-dark-900 dark:text-white">
                Choose Your Setting
              </h2>
            </div>
            
            <div ref={spacesRef} className="grid md:grid-cols-3 gap-6">
              {EVENT_SPACES.map((space) => (
                <div key={space.id} className="space-card">
                  <EventSpaceCard space={space} onClick={() => scrollToSpace(space.id)} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Space Details */}
        <SectionWrapper background="default">
          {EVENT_SPACES.map((space, index) => (
            <SpaceDetail
              key={space.id}
              space={space}
              imagePosition={index % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </SectionWrapper>

        {/* Custom Menus Section */}
        <section className="section-padding-sm bg-dark-900">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-primary-400 uppercase tracking-[0.2em] text-sm font-medium mb-3 block">
                  Custom Menus
                </span>
                <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
                  Crafted for Your Event
                </h2>
                <p className="text-gray-300 text-lg mb-6">
                  Our events team will work with Chef Marcus to design a custom menu that reflects 
                  your vision and accommodates all dietary needs. From passed hors d'oeuvres to 
                  multi-course seated dinners, every detail is tailored to your event.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium"
                  >
                    <FileText className="w-5 h-5" />
                    Sample Event Menu (PDF)
                  </a>
                  <a
                    href="tel:5551234567"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-medium"
                  >
                    <Phone className="w-5 h-5" />
                    (555) 123-4567
                  </a>
                </div>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop&q=85"
                  alt="Chef preparing elegant dishes for a private event"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Inquiry Form */}
        <SectionWrapper
          background="default"
          eyebrow="Get Started"
          title="Request Information"
          description="Tell us about your event and we'll be in touch within 24-48 hours"
        >
          <div className="max-w-2xl mx-auto">
            <div className="bg-[rgb(var(--surface))] p-8 rounded-2xl border border-[rgb(var(--border))] shadow-lg">
              <EventInquiryForm />
            </div>
          </div>
        </SectionWrapper>

        {/* FAQ */}
        <SectionWrapper background="muted">
          <EventFAQ />
        </SectionWrapper>

        <Footer />
      </main>
    </>
  )
}
