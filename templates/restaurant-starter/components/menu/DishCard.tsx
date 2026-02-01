'use client'

import Image from 'next/image'
import type { MenuItem, DietaryType } from '@/types'

interface DishCardProps {
  item: MenuItem
  showImage?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const DIETARY_LABELS: Record<DietaryType, string> = {
  v: 'Vegetarian',
  vg: 'Vegan',
  gf: 'Gluten-Free',
}

export function DishCard({ item, showImage = false, size = 'md' }: DishCardProps) {
  if (!showImage || !item.image) {
    // List view (no image)
    return (
      <article className="menu-item group">
        <div className="relative z-10 flex items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <h3 className="menu-item-name">{item.name}</h3>
              <div className="flex gap-1.5">
                {item.dietary.map((d) => (
                  <span
                    key={d}
                    className={`dietary-icon dietary-${d}`}
                    title={DIETARY_LABELS[d]}
                    aria-label={DIETARY_LABELS[d]}
                  >
                    {d === 'v' ? 'V' : d === 'vg' ? 'VG' : 'GF'}
                  </span>
                ))}
              </div>
            </div>
            <p className="menu-item-description">{item.description}</p>
          </div>
          <div className="menu-item-price shrink-0" aria-label={`Price: ${item.price} dollars`}>
            ${item.price}
          </div>
        </div>
      </article>
    )
  }

  // Card view (with image)
  const sizeClasses = {
    sm: 'aspect-[4/3]',
    md: 'aspect-[16/10]',
    lg: 'aspect-[16/9]',
  }

  return (
    <article className="card-interactive overflow-hidden group">
      <div className={`relative ${sizeClasses[size]} overflow-hidden`}>
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {item.featured && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-primary-500 text-white text-xs font-medium rounded">
              Featured
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3 flex gap-1">
          {item.dietary.map((d) => (
            <span
              key={d}
              className={`dietary-icon dietary-${d}`}
              title={DIETARY_LABELS[d]}
              aria-label={DIETARY_LABELS[d]}
            >
              {d === 'v' ? 'V' : d === 'vg' ? 'VG' : 'GF'}
            </span>
          ))}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-display text-lg text-dark-900 dark:text-white line-clamp-1">
            {item.name}
          </h3>
          <span className="font-display text-lg text-primary-600 dark:text-primary-400 shrink-0">
            ${item.price}
          </span>
        </div>
        <p className="text-sm text-[rgb(var(--muted-foreground))] line-clamp-2">
          {item.description}
        </p>
      </div>
    </article>
  )
}
