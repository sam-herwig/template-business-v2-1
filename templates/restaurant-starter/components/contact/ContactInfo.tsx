'use client'

import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react'

interface ContactInfoProps {
  address: string
  phone: string
  email: string
  hours: { label: string; times: string }[]
  directionsUrl?: string
}

export function ContactInfo({ address, phone, email, hours, directionsUrl }: ContactInfoProps) {
  return (
    <div className="space-y-8">
      {/* Address */}
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
          <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <h3 className="font-medium text-dark-900 dark:text-white mb-1">Address</h3>
          <p className="text-[rgb(var(--muted-foreground))]">{address}</p>
          {directionsUrl && (
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              Get Directions <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* Phone */}
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
          <Phone className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <h3 className="font-medium text-dark-900 dark:text-white mb-1">Phone</h3>
          <a
            href={`tel:${phone.replace(/\D/g, '')}`}
            className="text-[rgb(var(--muted-foreground))] hover:text-primary-600 transition-colors"
          >
            {phone}
          </a>
        </div>
      </div>

      {/* Email */}
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
          <Mail className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <h3 className="font-medium text-dark-900 dark:text-white mb-1">Email</h3>
          <a
            href={`mailto:${email}`}
            className="text-[rgb(var(--muted-foreground))] hover:text-primary-600 transition-colors"
          >
            {email}
          </a>
        </div>
      </div>

      {/* Hours */}
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
          <Clock className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <h3 className="font-medium text-dark-900 dark:text-white mb-2">Hours</h3>
          <div className="space-y-1">
            {hours.map((h, index) => (
              <div key={index} className="flex justify-between gap-4 text-sm">
                <span className="text-[rgb(var(--foreground))]">{h.label}</span>
                <span className="text-[rgb(var(--muted-foreground))]">{h.times}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
