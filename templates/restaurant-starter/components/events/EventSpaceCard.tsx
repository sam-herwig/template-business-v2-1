'use client'

import Image from 'next/image'
import { Users, DollarSign } from 'lucide-react'
import type { EventSpace } from '@/types'

interface EventSpaceCardProps {
  space: EventSpace
  onClick?: () => void
}

export function EventSpaceCard({ space, onClick }: EventSpaceCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl aspect-[16/10] w-full text-left"
    >
      <Image
        src={space.images[0]}
        alt={space.name}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-dark-950/40 to-transparent" />
      
      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <h3 className="font-display text-2xl text-white mb-2 group-hover:text-primary-400 transition-colors">
          {space.name}
        </h3>
        
        <p className="text-white/80 text-sm mb-4 line-clamp-2">
          {space.description}
        </p>
        
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5 text-white/90 text-sm">
            <Users className="w-4 h-4" />
            {space.capacity.min}-{space.capacity.max} guests
          </span>
          {space.minSpend && (
            <span className="inline-flex items-center gap-1.5 text-white/90 text-sm">
              <DollarSign className="w-4 h-4" />
              ${space.minSpend.toLocaleString()} min
            </span>
          )}
        </div>
        
        {/* Best For Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {space.bestFor.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-white/10 backdrop-blur-sm text-white/90 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  )
}
