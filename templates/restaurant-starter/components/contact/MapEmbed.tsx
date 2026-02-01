'use client'

import { MapPin } from 'lucide-react'

interface MapEmbedProps {
  address: string
  markerTitle?: string
  className?: string
}

export function MapEmbed({ address, markerTitle = 'Our Location', className = '' }: MapEmbedProps) {
  // Create Google Maps embed URL from address
  const encodedAddress = encodeURIComponent(address)
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedAddress}`

  // For demo purposes, show a placeholder
  // In production, replace with actual Google Maps or Mapbox embed
  return (
    <div className={`relative bg-gray-200 dark:bg-dark-900 overflow-hidden ${className}`}>
      {/* Placeholder - Replace with actual map embed */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h3 className="font-display text-xl text-dark-900 dark:text-white mb-2">{markerTitle}</h3>
          <p className="text-[rgb(var(--muted-foreground))] mb-4">{address}</p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
      
      {/* 
        To use actual Google Maps embed:
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={markerTitle}
        />
      */}
    </div>
  )
}
