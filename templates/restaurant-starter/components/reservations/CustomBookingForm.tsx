'use client'

import { useState } from 'react'
import { Calendar, Clock, Users, User, Mail, Phone, MessageSquare, Loader2 } from 'lucide-react'
import type { BookingFormData } from '@/types'

interface CustomBookingFormProps {
  onSubmit?: (data: BookingFormData) => Promise<void>
}

const partySizes = [1, 2, 3, 4, 5, 6, 7, 8]
const timeSlots = [
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '1:00 PM', '1:30 PM', '2:00 PM', '5:00 PM',
  '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM',
  '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM',
]

export function CustomBookingForm({ onSubmit }: CustomBookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    partySize: 2,
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
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
        // Simulate API call
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
        <h3 className="font-display text-2xl text-dark-900 dark:text-white mb-2">Reservation Confirmed!</h3>
        <p className="text-[rgb(var(--muted-foreground))] mb-6">
          We've sent a confirmation to {formData.email}. We look forward to seeing you!
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Make another reservation
        </button>
      </div>
    )
  }

  // Get today's date for min date input
  const today = new Date().toISOString().split('T')[0]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Quick Selection Row */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="partySize" className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
            <Users className="w-4 h-4 inline mr-2" />
            Party Size
          </label>
          <select
            id="partySize"
            name="partySize"
            value={formData.partySize}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-[rgb(var(--muted))] border border-[rgb(var(--border))] rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          >
            {partySizes.map((size) => (
              <option key={size} value={size}>
                {size} {size === 1 ? 'Guest' : 'Guests'}
              </option>
            ))}
            <option value={9}>8+ (Call us)</option>
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
            <Calendar className="w-4 h-4 inline mr-2" />
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={today}
            required
            className="w-full px-4 py-3 bg-[rgb(var(--muted))] border border-[rgb(var(--border))] rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
            <Clock className="w-4 h-4 inline mr-2" />
            Time
          </label>
          <select
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-[rgb(var(--muted))] border border-[rgb(var(--border))] rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          >
            <option value="">Select time</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
            <User className="w-4 h-4 inline mr-2" />
            Full Name
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
          <label htmlFor="phone" className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
            <Phone className="w-4 h-4 inline mr-2" />
            Phone
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
        <label htmlFor="email" className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
          <Mail className="w-4 h-4 inline mr-2" />
          Email
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
        <label htmlFor="specialRequests" className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
          <MessageSquare className="w-4 h-4 inline mr-2" />
          Special Requests <span className="text-[rgb(var(--muted-foreground))]">(optional)</span>
        </label>
        <textarea
          id="specialRequests"
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          rows={3}
          placeholder="Dietary restrictions, special occasions, seating preferences..."
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
            Confirming...
          </>
        ) : (
          'Complete Reservation'
        )}
      </button>
    </form>
  )
}
