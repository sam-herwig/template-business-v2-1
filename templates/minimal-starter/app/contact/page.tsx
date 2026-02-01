'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { Mail, MessageCircle, Twitter, MapPin, ArrowRight, HelpCircle } from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'

const contactOptions = [
  {
    icon: Mail,
    title: 'Email',
    description: 'Our team typically responds within 24 hours.',
    action: 'support@acme.com',
    href: 'mailto:support@acme.com',
  },
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Available Mon-Fri, 9am-5pm PST.',
    action: 'Start Chat',
    href: '#chat',
  },
  {
    icon: Twitter,
    title: 'Twitter',
    description: 'Follow us for updates and quick support.',
    action: '@acme',
    href: 'https://twitter.com/acme',
  },
  {
    icon: MapPin,
    title: 'Office',
    description: '123 Developer Way\nSan Francisco, CA 94107',
    action: 'Get Directions',
    href: 'https://maps.google.com',
  },
]

const quickFaqs = [
  {
    question: 'How do I reset my password?',
    answer: 'Go to Settings → Security → Reset Password, or use the "Forgot Password" link on the login page.',
  },
  {
    question: 'How do I upgrade my plan?',
    answer: 'Visit the Billing section in your dashboard to view available plans and upgrade instantly.',
  },
  {
    question: 'What\'s your refund policy?',
    answer: 'We offer a 14-day money-back guarantee. Contact support within 14 days for a full refund.',
  },
  {
    question: 'How do I connect my custom domain?',
    answer: 'Go to Project Settings → Domains and follow the guided setup to connect your domain.',
  },
]

function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const ref = useRef<HTMLFormElement>(null)

  useGSAP(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.form-group', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="p-8 rounded-2xl border border-green-500/20 bg-green-500/5 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
          <Mail className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="font-bold text-xl mb-2">Message sent!</h3>
        <p className="text-minimal-muted dark:text-minimal-dark-muted">
          Thanks for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form ref={ref} onSubmit={handleSubmit} className="space-y-6">
      <div className="form-group grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 rounded-lg border border-minimal-border dark:border-minimal-dark-border bg-white dark:bg-minimal-dark-bg focus:border-[#0070f3] focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-lg border border-minimal-border dark:border-minimal-dark-border bg-white dark:bg-minimal-dark-bg focus:border-[#0070f3] focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="subject" className="block text-sm font-medium mb-2">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          className="w-full px-4 py-3 rounded-lg border border-minimal-border dark:border-minimal-dark-border bg-white dark:bg-minimal-dark-bg focus:border-[#0070f3] focus:ring-2 focus:ring-blue-500/20 transition-all"
        >
          <option value="">Select a topic</option>
          <option value="sales">Sales inquiry</option>
          <option value="support">Technical support</option>
          <option value="billing">Billing question</option>
          <option value="partnership">Partnership</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="w-full px-4 py-3 rounded-lg border border-minimal-border dark:border-minimal-dark-border bg-white dark:bg-minimal-dark-bg focus:border-[#0070f3] focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
          placeholder="How can we help?"
        />
      </div>

      <button type="submit" className="form-group btn-primary">
        Send Message <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  )
}

function ContactSidebar() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.contact-option', {
        x: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <aside ref={ref} className="space-y-8">
      {contactOptions.map((option) => (
        <div key={option.title} className="contact-option">
          <div className="flex items-center gap-3 mb-2">
            <option.icon className="w-5 h-5 text-[#0070f3]" />
            <h3 className="font-semibold">{option.title}</h3>
          </div>
          <p className="text-minimal-muted dark:text-minimal-dark-muted text-sm mb-2 whitespace-pre-line">
            {option.description}
          </p>
          {option.title === 'Live Chat' ? (
            <button className="btn-secondary text-sm py-2">
              {option.action}
            </button>
          ) : (
            <a
              href={option.href}
              className="text-[#0070f3] hover:underline text-sm font-medium"
              target={option.href.startsWith('http') ? '_blank' : undefined}
              rel={option.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {option.action}
            </a>
          )}
        </div>
      ))}
    </aside>
  )
}

function QuickFAQ() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.faq-card', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-16 md:py-24 px-4 md:px-16 bg-white dark:bg-minimal-dark-card border-t border-minimal-border dark:border-minimal-dark-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <HelpCircle className="w-6 h-6 text-[#0070f3]" />
          <h2 className="font-display text-2xl font-bold">Before you reach out...</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickFaqs.map((faq) => (
            <div
              key={faq.question}
              className="faq-card p-6 rounded-xl border border-minimal-border dark:border-minimal-dark-border bg-minimal-bg dark:bg-minimal-dark-bg"
            >
              <h3 className="font-semibold mb-2">{faq.question}</h3>
              <p className="text-minimal-muted dark:text-minimal-dark-muted text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a href="/docs" className="text-[#0070f3] hover:underline font-medium">
            Browse all documentation →
          </a>
        </div>
      </div>
    </section>
  )
}

export default function ContactPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header>
        <Nav />
      </header>
      <main id="main-content" tabIndex={-1}>
        <PageHeader
          tag="Contact"
          title="Get in touch"
          description="We'd love to hear from you. Send us a message and we'll respond as soon as possible."
        />

        <section className="py-12 px-4 md:px-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <ContactSidebar />
          </div>
        </section>

        <QuickFAQ />
      </main>
      <Footer />
    </>
  )
}
