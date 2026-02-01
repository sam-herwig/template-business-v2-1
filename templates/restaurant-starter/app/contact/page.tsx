'use client'

import Link from 'next/link'
import { Phone, MapPin, Calendar } from 'lucide-react'
import { SkipLink } from '@/components/SkipLink'
import { PageHero, SectionWrapper } from '@/components/shared'
import { ContactForm, ContactInfo, MapEmbed, ParkingInfo } from '@/components/contact'
import { Nav, Footer } from '../_components'
import type { ParkingOption } from '@/types'

// ═══════════════════════════════════════════════════════════════
// CONTACT PAGE DATA
// ═══════════════════════════════════════════════════════════════

const RESTAURANT = {
  name: 'The Golden Fork',
  address: '123 Main Street, Downtown, NY 10001',
  phone: '(555) 123-4567',
  email: 'hello@goldenfork.com',
  directionsUrl: 'https://maps.google.com/?q=123+Main+Street+Downtown+NY',
}

const HOURS = [
  { label: 'Monday - Thursday', times: '11:00 AM - 10:00 PM' },
  { label: 'Friday - Saturday', times: '11:00 AM - 11:00 PM' },
  { label: 'Sunday', times: '10:00 AM - 9:00 PM' },
  { label: 'Brunch (Sat-Sun)', times: '10:00 AM - 3:00 PM' },
]

const PARKING_OPTIONS: ParkingOption[] = [
  {
    type: 'street',
    label: 'Street Parking',
    details: 'Metered parking available on Main St and side streets. Free after 6 PM.',
  },
  {
    type: 'valet',
    label: 'Valet Service',
    details: 'Complimentary valet parking Fri-Sat evenings.',
  },
  {
    type: 'garage',
    label: 'Parking Garage',
    details: 'City Center Garage, 1 block east. $10 flat rate with validation.',
  },
  {
    type: 'transit',
    label: 'Public Transit',
    details: 'Blue Line - Downtown Station (2 min walk). Multiple bus routes.',
  },
]

// ═══════════════════════════════════════════════════════════════
// CONTACT PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function ContactPage() {
  return (
    <>
      <SkipLink />
      <Nav />
      <main id="main-content">
        <PageHero
          title="Contact Us"
          subtitle="We'd love to hear from you"
          backgroundImage="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1920&h=1080&fit=crop&q=85"
          height="short"
          breadcrumbs={[{ label: 'Contact', href: '/contact' }]}
        />

        {/* Main Contact Section */}
        <SectionWrapper background="default">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="font-display text-2xl text-dark-900 dark:text-white mb-6">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="font-display text-2xl text-dark-900 dark:text-white mb-6">
                Visit Us
              </h2>
              <ContactInfo
                address={RESTAURANT.address}
                phone={RESTAURANT.phone}
                email={RESTAURANT.email}
                hours={HOURS}
                directionsUrl={RESTAURANT.directionsUrl}
              />
            </div>
          </div>
        </SectionWrapper>

        {/* Map Section */}
        <section className="h-[400px] md:h-[500px]">
          <MapEmbed
            address={RESTAURANT.address}
            markerTitle={RESTAURANT.name}
            className="w-full h-full"
          />
        </section>

        {/* Parking & Directions */}
        <SectionWrapper background="muted">
          <div className="max-w-4xl mx-auto">
            <ParkingInfo options={PARKING_OPTIONS} />
          </div>
        </SectionWrapper>

        {/* Quick Actions */}
        <section className="section-padding-sm bg-[rgb(var(--background))]">
          <div className="max-w-4xl mx-auto px-6">
            <div className="grid sm:grid-cols-3 gap-4">
              <a
                href={`tel:${RESTAURANT.phone.replace(/\D/g, '')}`}
                className="flex items-center gap-4 p-6 bg-[rgb(var(--muted))] rounded-xl hover:bg-primary-50 dark:hover:bg-primary-950/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                  <Phone className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <div className="font-medium text-dark-900 dark:text-white">Call Now</div>
                  <div className="text-sm text-[rgb(var(--muted-foreground))]">{RESTAURANT.phone}</div>
                </div>
              </a>

              <a
                href={RESTAURANT.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 bg-[rgb(var(--muted))] rounded-xl hover:bg-primary-50 dark:hover:bg-primary-950/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                  <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <div className="font-medium text-dark-900 dark:text-white">Get Directions</div>
                  <div className="text-sm text-[rgb(var(--muted-foreground))]">Open in Maps</div>
                </div>
              </a>

              <Link
                href="/reservations"
                className="flex items-center gap-4 p-6 bg-[rgb(var(--muted))] rounded-xl hover:bg-primary-50 dark:hover:bg-primary-950/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                  <Calendar className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <div className="font-medium text-dark-900 dark:text-white">Reserve a Table</div>
                  <div className="text-sm text-[rgb(var(--muted-foreground))]">Book online</div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
