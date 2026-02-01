'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Phone, Mail, Users } from 'lucide-react'
import { SkipLink } from '@/components/SkipLink'
import { PageHero, SectionWrapper } from '@/components/shared'
import { CustomBookingForm, PolicyAccordion } from '@/components/reservations'
import { BookingEmbed, type BookingConfig } from '@/components/BookingButton'
import { Nav, Footer } from '../_components'

// ═══════════════════════════════════════════════════════════════
// RESERVATIONS PAGE DATA
// ═══════════════════════════════════════════════════════════════

const BOOKING_CONFIG: BookingConfig = {
  enabled: false, // Set to true and add embedUrl when integrating OpenTable/Resy
  provider: 'custom',
  embedUrl: '',
  buttonText: 'Find a Table',
}

const RESTAURANT = {
  phone: '(555) 123-4567',
  email: 'reservations@goldenfork.com',
  eventsEmail: 'events@goldenfork.com',
  address: '123 Main Street, Downtown',
  hours: [
    { label: 'Mon - Thu', times: '11:00 AM - 10:00 PM' },
    { label: 'Fri - Sat', times: '11:00 AM - 11:00 PM' },
    { label: 'Sunday', times: '10:00 AM - 9:00 PM' },
  ],
}

// ═══════════════════════════════════════════════════════════════
// RESERVATIONS PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function ReservationsPage() {
  return (
    <>
      <SkipLink />
      <Nav />
      <main id="main-content">
        <PageHero
          title="Reserve Your Table"
          subtitle="Join us for an unforgettable dining experience"
          backgroundImage="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1920&h=1080&fit=crop&q=85"
          height="short"
          breadcrumbs={[{ label: 'Reservations', href: '/reservations' }]}
        />

        {/* Booking Section */}
        <SectionWrapper background="default">
          <div className="max-w-3xl mx-auto">
            {/* Widget or Custom Form */}
            {BOOKING_CONFIG.enabled && BOOKING_CONFIG.provider !== 'custom' ? (
              <div className="bg-[rgb(var(--surface))] p-8 rounded-2xl border border-[rgb(var(--border))] shadow-lg">
                <BookingEmbed config={BOOKING_CONFIG} height={550} />
              </div>
            ) : (
              <div className="bg-[rgb(var(--surface))] p-8 rounded-2xl border border-[rgb(var(--border))] shadow-lg">
                <h2 className="font-display text-2xl text-dark-900 dark:text-white mb-6 text-center">
                  Book Your Table
                </h2>
                <CustomBookingForm />
              </div>
            )}

            {/* Contact Fallback */}
            <div className="mt-8 p-6 bg-[rgb(var(--muted))] rounded-xl text-center">
              <p className="text-[rgb(var(--muted-foreground))] mb-4">
                Prefer to speak with us directly?
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`tel:${RESTAURANT.phone.replace(/\D/g, '')}`}
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                >
                  <Phone className="w-5 h-5" />
                  {RESTAURANT.phone}
                </a>
                <span className="text-[rgb(var(--muted-foreground))]">or</span>
                <a
                  href={`mailto:${RESTAURANT.email}`}
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                >
                  <Mail className="w-5 h-5" />
                  {RESTAURANT.email}
                </a>
              </div>
            </div>

            {/* Large Party Notice */}
            <div className="mt-8 p-6 bg-primary-50 dark:bg-primary-950/30 rounded-xl border border-primary-200 dark:border-primary-800">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-medium text-dark-900 dark:text-white mb-1">
                    Large Parties (8+)
                  </h3>
                  <p className="text-[rgb(var(--muted-foreground))] text-sm mb-3">
                    For parties of 8 or more, please contact our events team for personalized service.
                  </p>
                  <a
                    href={`mailto:${RESTAURANT.eventsEmail}`}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    {RESTAURANT.eventsEmail} →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Private Dining Teaser */}
        <section className="section-padding-sm bg-dark-900">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop&q=85"
                  alt="Private dining room with elegant table setting"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="text-white">
                <span className="text-primary-400 uppercase tracking-[0.2em] text-sm font-medium mb-3 block">
                  Private Dining
                </span>
                <h2 className="font-display text-3xl md:text-4xl mb-4">
                  Host Your Special Event
                </h2>
                <p className="text-gray-300 text-lg mb-6">
                  From intimate celebrations to corporate gatherings, our private dining spaces 
                  offer the perfect backdrop for your next event. Custom menus, dedicated service, 
                  and unforgettable experiences.
                </p>
                <Link
                  href="/events"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Explore Private Events
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Policies */}
        <SectionWrapper background="muted">
          <div className="max-w-3xl mx-auto">
            <PolicyAccordion />
          </div>
        </SectionWrapper>

        {/* Location Preview */}
        <section className="section-padding-sm bg-[rgb(var(--background))]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <span className="section-eyebrow">Find Us</span>
            <h2 className="font-display text-3xl md:text-4xl text-dark-900 dark:text-white mb-6">
              Location & Hours
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 text-left">
              {/* Address */}
              <div className="p-6 bg-[rgb(var(--muted))] rounded-xl">
                <h3 className="font-medium text-dark-900 dark:text-white mb-3">Address</h3>
                <p className="text-[rgb(var(--muted-foreground))] mb-4">{RESTAURANT.address}</p>
                <Link
                  href="/contact"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Get Directions →
                </Link>
              </div>
              
              {/* Hours */}
              <div className="p-6 bg-[rgb(var(--muted))] rounded-xl">
                <h3 className="font-medium text-dark-900 dark:text-white mb-3">Hours</h3>
                <div className="space-y-2">
                  {RESTAURANT.hours.map((h, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-[rgb(var(--foreground))]">{h.label}</span>
                      <span className="text-[rgb(var(--muted-foreground))]">{h.times}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
