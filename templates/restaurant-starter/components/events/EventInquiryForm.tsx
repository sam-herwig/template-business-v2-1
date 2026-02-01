'use client'

import { useState } from 'react'
import { Calendar, Users, Building2, User, Mail, Phone, MessageSquare, Loader2 } from 'lucide-react'
import type { EventInquiryData } from '@/types'

interface EventInquiryFormProps {
  onSubmit?: (data: EventInquiryData) => Promise<void>
}

const eventTypes = [
  { value: 'corporate', label: 'Corporate Event' },
  { value: 'wedding', label: 'Wedding / Rehearsal Dinner' },
  { value: 'birthday', label: 'Birthday / Anniversary' },
  { value: 'holiday', label: 'Holiday Party' },
  { value: 'other', label: 'Other' },
]

export function EventInquiryForm({ onSubmit }: EventInquiryFormProps) {
  const [formData, setFormData] = useState<EventInquiryData>({
    eventType: 'corporate',
    partySize: 20,
    preferredDate: '',
    flexibility: 'flexible',
    name: '',
    email: '',
    phone: '',
    company: '',
    details: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'partySize' ? parseInt(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
        <h3 className="font-display text-2xl text-dark-900 dark:text-white mb-2">Inquiry Submitted!</h3>
        <p className="text-[rgb(var(--muted-foreground))] mb-4">
          Our events team will be in touch within 24-48 hours. We look forward to hosting your event!
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Submit another inquiry
        </button>
      </div>
    )
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Event Type */}
        <div>
          <label htmlFor="eventType" className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
            Event Type *
          </label>
          <select
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-[rgb(var(--muted))] border border-[rgb(var(--border))] rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          >
            {eventTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Party Size */}
        <div>
          <label htmlFor="partySize" className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
            <Users className="w-4 h-4 inline mr-2" />
            Estimated Guest Count *
          </label>
          <input
            type="number"
            id="partySize"
            name="partySize"
            value={formData.partySize}
            onChange={handleChange}
            min={8}
            max={200}
            required
            className="w-full px-4 py-3 bg-[rgb(var(--muted))] border border-[rgb(var(--border))] rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Preferred Date */}
        <div>
          <label htmlFor="preferredDate" className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
            <Calendar className="w-4 h-4 inline mr-2" />
            Preferred Date *
          </label>
          <input
            type="date"
            id="preferredDate"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            min={today}
            required
            className="w-full px-4 py-3 bg-[rgb(var(--muted))] border border-[rgb(var(--border))] rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Date Flexibility */}
        <div>
          <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
            Date Flexibility
          </label>
          <div className="flex gap-4 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="flexibility"
                value="exact"
                checked={formData.flexibility === 'exact'}
                onChange={handleChange}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-[rgb(var(--foreground))]">Exact date</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="flexibility"
                value="flexible"
                checked={formData.flexibility === 'flexible'}
                onChange={handleChange}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-[rgb(var(--foreground))]">Flexible</span>
            </label>
          </div>
        </div>
      </div>

      <hr className="border-[rgb(var(--border))]" />

      {/* Contact Info */}
      <div className="grid md:grid-cols-2 gap-6">
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
          <label htmlFor="company" className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
            <Building2 className="w-4 h-4 inline mr-2" />
            Company <span className="text-[rgb(var(--muted-foreground))]">(optional)</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Acme Inc."
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
            Phone *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="(555) 123-4567"
            className="w-full px-4 py-3 bg-[rgb(var(--muted))] border border-[rgb(var(--border))] rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder:text-[rgb(var(--muted-foreground))]/50"
          />
        </div>
      </div>

      <div>
        <label htmlFor="details" className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
          <MessageSquare className="w-4 h-4 inline mr-2" />
          Tell us about your event
        </label>
        <textarea
          id="details"
          name="details"
          value={formData.details}
          onChange={handleChange}
          rows={4}
          placeholder="Share any details about your event, dietary requirements, special requests, or questions..."
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
        className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin inline" />
            Submitting...
          </>
        ) : (
          'Submit Inquiry'
        )}
      </button>
      
      <p className="text-center text-sm text-[rgb(var(--muted-foreground))]">
        We'll respond within 24-48 hours. For urgent inquiries, call (555) 123-4567
      </p>
    </form>
  )
}
