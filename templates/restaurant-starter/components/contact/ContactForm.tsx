'use client'

import { useState } from 'react'
import { User, Mail, Phone, MessageSquare, Loader2 } from 'lucide-react'
import type { ContactFormData } from '@/types'

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void>
}

const subjects = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'catering', label: 'Catering' },
  { value: 'press', label: 'Press / Media' },
  { value: 'careers', label: 'Careers' },
  { value: 'other', label: 'Other' },
]

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Honeypot field for spam prevention
  const [honeypot, setHoneypot] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Spam check
    if (honeypot) {
      console.log('Bot detected')
      return
    }
    
    setIsSubmitting(true)
    setError(null)

    try {
      if (onSubmit) {
        await onSubmit(formData)
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1500))
      }
      setIsSuccess(true)
    } catch {
      setError('Something went wrong. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-12 px-6 bg-green-50 dark:bg-green-950/30 rounded-2xl border border-green-200 dark:border-green-800">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl text-dark-900 dark:text-white mb-2">Message Sent!</h3>
        <p className="text-[rgb(var(--muted-foreground))] mb-4">
          Thank you for reaching out. We'll get back to you within 24-48 hours.
        </p>
        <button
          onClick={() => {
            setIsSuccess(false)
            setFormData({ name: '', email: '', phone: '', subject: 'general', message: '' })
          }}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot - hidden from real users */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
          <User className="w-4 h-4 inline mr-2" />
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="John Smith"
          className="w-full px-4 py-3 bg-[rgb(var(--muted))] border border-[rgb(var(--border))] rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder:text-[rgb(var(--muted-foreground))]/50"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
          <Mail className="w-4 h-4 inline mr-2" />
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="john@example.com"
          className="w-full px-4 py-3 bg-[rgb(var(--muted))] border border-[rgb(var(--border))] rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder:text-[rgb(var(--muted-foreground))]/50"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
          <Phone className="w-4 h-4 inline mr-2" />
          Phone <span className="text-[rgb(var(--muted-foreground))]">(optional)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(555) 123-4567"
          className="w-full px-4 py-3 bg-[rgb(var(--muted))] border border-[rgb(var(--border))] rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder:text-[rgb(var(--muted-foreground))]/50"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-[rgb(var(--muted))] border border-[rgb(var(--border))] rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        >
          {subjects.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
          <MessageSquare className="w-4 h-4 inline mr-2" />
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="How can we help you?"
          className="w-full px-4 py-3 bg-[rgb(var(--muted))] border border-[rgb(var(--border))] rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder:text-[rgb(var(--muted-foreground))]/50 resize-none"
        />
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin inline" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  )
}
