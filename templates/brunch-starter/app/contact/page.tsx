'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  CalendarDays,
  ExternalLink,
  Car,
  Coffee,
  Users,
  Send,
  Check
} from 'lucide-react'
import { Nav, Footer } from '../_components'
import { PageHero, CTABanner, SectionWrapper } from '@/components/shared'

// ═══════════════════════════════════════════════════════════════
// CONTACT PAGE DATA
// ═══════════════════════════════════════════════════════════════

const RESTAURANT = {
  name: 'Sunny Side',
  phone: '(303) 555-0147',
  email: 'hello@sunnysidedenver.com',
  address: {
    street: '2850 Larimer Street',
    city: 'Denver',
    state: 'CO',
    zip: '80205',
    neighborhood: 'RiNo Arts District',
  },
  hours: [
    { days: 'Monday - Friday', time: '7:00 AM - 3:00 PM' },
    { days: 'Saturday - Sunday', time: '8:00 AM - 4:00 PM' },
  ],
  parking: 'Street parking available. Paid lot on Blake Street.',
  transit: 'Near 38th & Blake RTD station (A Line)',
}

const CONTACT_REASONS = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'reservation', label: 'Large Party Reservation' },
  { value: 'catering', label: 'Catering Request' },
  { value: 'event', label: 'Private Event' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'press', label: 'Press & Media' },
]

const FAQ = [
  {
    question: 'Do you take reservations?',
    answer: "Yes! We accept reservations for parties of 4 or more. Walk-ins are welcome for smaller groups, and we do our best to seat everyone promptly.",
  },
  {
    question: 'Is there parking available?',
    answer: "Street parking is available on Larimer and surrounding streets. There's also a paid lot on Blake Street, about a 2-minute walk away.",
  },
  {
    question: 'Do you accommodate dietary restrictions?',
    answer: "Absolutely! We have vegetarian, vegan, and gluten-free options clearly marked on our menu. Please let your server know about any allergies.",
  },
  {
    question: 'Do you offer catering or private events?',
    answer: "Yes! We cater events of all sizes and can host private parties in our space. Contact us for more details and custom menus.",
  },
]

// ═══════════════════════════════════════════════════════════════
// CONTACT PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    reason: 'general',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false)
      setFormState({ name: '', email: '', phone: '', reason: 'general', message: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <>
      <Nav />
      <main id="main-content">
        <PageHero
          title="Visit Us"
          subtitle="We'd love to see you! Find us in the heart of RiNo."
          backgroundImage="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1920&h=1080&fit=crop"
          height="short"
          breadcrumbs={[{ label: 'Contact', href: '/contact' }]}
        />

        {/* Location & Hours Section */}
        <SectionWrapper background="default">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative bg-sage rounded-3xl overflow-hidden min-h-[400px]"
            >
              {/* In production, replace with actual map embed */}
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="text-center p-8">
                  <MapPin className="w-12 h-12 mx-auto mb-4" />
                  <p className="text-2xl font-display font-semibold mb-2">
                    {RESTAURANT.address.neighborhood}
                  </p>
                  <p className="text-white/80 mb-6">
                    {RESTAURANT.address.street}<br />
                    {RESTAURANT.address.city}, {RESTAURANT.address.state} {RESTAURANT.address.zip}
                  </p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(`${RESTAURANT.address.street}, ${RESTAURANT.address.city}, ${RESTAURANT.address.state}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white font-semibold hover:underline"
                  >
                    Get Directions
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-tag">Find Us</span>
              <h2 className="font-display text-3xl md:text-4xl text-charcoal dark:text-cream mb-8">
                Come Hungry, Leave Happy
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Address */}
                <div>
                  <h3 className="text-coral text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Address
                  </h3>
                  <address className="text-charcoal-light dark:text-cream/80 leading-relaxed not-italic">
                    {RESTAURANT.address.street}<br />
                    {RESTAURANT.address.city}, {RESTAURANT.address.state} {RESTAURANT.address.zip}
                  </address>
                </div>

                {/* Hours */}
                <div>
                  <h3 className="text-coral text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Hours
                  </h3>
                  <div className="text-charcoal-light dark:text-cream/80 leading-relaxed">
                    {RESTAURANT.hours.map((item, index) => (
                      <p key={index}>
                        <span className="font-medium text-charcoal dark:text-cream">{item.days}:</span><br />
                        {item.time}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <h3 className="text-coral text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone
                  </h3>
                  <p className="text-charcoal-light dark:text-cream/80">
                    <a
                      href={`tel:${RESTAURANT.phone.replace(/[^0-9]/g, '')}`}
                      className="hover:text-coral transition-colors"
                    >
                      {RESTAURANT.phone}
                    </a>
                  </p>
                </div>

                {/* Email */}
                <div>
                  <h3 className="text-coral text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </h3>
                  <p className="text-charcoal-light dark:text-cream/80">
                    <a
                      href={`mailto:${RESTAURANT.email}`}
                      className="hover:text-coral transition-colors"
                    >
                      {RESTAURANT.email}
                    </a>
                  </p>
                </div>
              </div>

              {/* Getting Here */}
              <div className="mt-8 pt-8 border-t border-charcoal/10 dark:border-white/10 space-y-4">
                <div className="flex items-start gap-3">
                  <Car className="w-5 h-5 text-coral mt-0.5" />
                  <div>
                    <span className="font-medium text-charcoal dark:text-cream">Parking: </span>
                    <span className="text-charcoal-light dark:text-cream/80">{RESTAURANT.parking}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Coffee className="w-5 h-5 text-coral mt-0.5" />
                  <div>
                    <span className="font-medium text-charcoal dark:text-cream">Transit: </span>
                    <span className="text-charcoal-light dark:text-cream/80">{RESTAURANT.transit}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </SectionWrapper>

        {/* Reservation Section */}
        <SectionWrapper
          background="muted"
          id="reserve"
          eyebrow="Book a Table"
          title="Make a Reservation"
          description="For parties of 4 or more, we recommend booking ahead"
        >
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-cream dark:bg-dark-bg rounded-3xl p-8 md:p-12 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-coral/10 mb-6">
                <CalendarDays className="w-8 h-8 text-coral" />
              </div>
              
              <h3 className="font-display text-2xl text-charcoal dark:text-cream mb-4">
                Reserve Your Spot
              </h3>
              
              <p className="text-charcoal-light dark:text-cream/80 mb-8 max-w-md mx-auto">
                Book online through OpenTable or give us a call. We look forward to hosting you!
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#"
                  className="btn-primary w-full sm:w-auto"
                >
                  <CalendarDays className="w-5 h-5" />
                  Book on OpenTable
                </a>
                <a
                  href={`tel:${RESTAURANT.phone.replace(/[^0-9]/g, '')}`}
                  className="btn-secondary w-full sm:w-auto"
                >
                  <Phone className="w-5 h-5" />
                  {RESTAURANT.phone}
                </a>
              </div>
              
              <p className="text-sm text-charcoal-light dark:text-cream/60 mt-6">
                Walk-ins always welcome! We do our best to accommodate everyone.
              </p>
            </motion.div>
          </div>
        </SectionWrapper>

        {/* Contact Form Section */}
        <SectionWrapper
          background="default"
          eyebrow="Get in Touch"
          title="Send Us a Message"
          description="Questions about catering, private events, or just want to say hi?"
        >
          <div className="max-w-2xl mx-auto">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmit}
              className="bg-white dark:bg-dark-card rounded-3xl p-8 md:p-10 shadow-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-charcoal dark:text-cream mb-2"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-charcoal/10 dark:border-white/10 bg-cream dark:bg-dark-bg text-charcoal dark:text-cream focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-charcoal dark:text-cream mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-charcoal/10 dark:border-white/10 bg-cream dark:bg-dark-bg text-charcoal dark:text-cream focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-charcoal dark:text-cream mb-2"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-charcoal/10 dark:border-white/10 bg-cream dark:bg-dark-bg text-charcoal dark:text-cream focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none transition-colors"
                    placeholder="(303) 555-0000"
                  />
                </div>

                {/* Reason */}
                <div>
                  <label
                    htmlFor="reason"
                    className="block text-sm font-medium text-charcoal dark:text-cream mb-2"
                  >
                    Reason for Contact
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    value={formState.reason}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-charcoal/10 dark:border-white/10 bg-cream dark:bg-dark-bg text-charcoal dark:text-cream focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none transition-colors"
                  >
                    {CONTACT_REASONS.map((reason) => (
                      <option key={reason.value} value={reason.value}>
                        {reason.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-charcoal dark:text-cream mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-charcoal/10 dark:border-white/10 bg-cream dark:bg-dark-bg text-charcoal dark:text-cream focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none transition-colors resize-none"
                  placeholder="How can we help?"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`btn-primary w-full ${
                  isSubmitted ? 'bg-sage border-sage' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : isSubmitted ? (
                  <>
                    <Check className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </motion.form>
          </div>
        </SectionWrapper>

        {/* FAQ Section */}
        <SectionWrapper
          background="muted"
          eyebrow="Questions?"
          title="Frequently Asked"
        >
          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              {FAQ.map((item, index) => (
                <motion.details
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group bg-cream dark:bg-dark-bg rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none font-medium text-charcoal dark:text-cream hover:bg-charcoal/5 dark:hover:bg-white/5 transition-colors">
                    {item.question}
                    <span className="text-coral transition-transform group-open:rotate-45">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-charcoal-light dark:text-cream/80">
                    {item.answer}
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </SectionWrapper>

        <CTABanner
          title="See You Soon!"
          description="We can't wait to serve you the best brunch in Denver"
          primaryAction={{ label: 'View Menu', href: '/menu' }}
          secondaryAction={{ label: 'About Us', href: '/about' }}
          emoji="☀️"
        />
      </main>
      <Footer />
    </>
  )
}
