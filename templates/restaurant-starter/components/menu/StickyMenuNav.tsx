'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Salad, UtensilsCrossed, Cake, Wine, GlassWater, Beer } from 'lucide-react'

interface MenuNavItem {
  id: string
  name: string
}

interface StickyMenuNavProps {
  categories: MenuNavItem[]
  activeCategory: string
  onCategoryClick: (id: string) => void
}

const iconMap: Record<string, React.ReactNode> = {
  starters: <Salad className="w-4 h-4" />,
  mains: <UtensilsCrossed className="w-4 h-4" />,
  desserts: <Cake className="w-4 h-4" />,
  drinks: <GlassWater className="w-4 h-4" />,
  cocktails: <GlassWater className="w-4 h-4" />,
  beer: <Beer className="w-4 h-4" />,
  wine: <Wine className="w-4 h-4" />,
}

export function StickyMenuNav({ categories, activeCategory, onCategoryClick }: StickyMenuNavProps) {
  const [isSticky, setIsSticky] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const placeholderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current && placeholderRef.current) {
        const rect = placeholderRef.current.getBoundingClientRect()
        setIsSticky(rect.top <= 80) // 80px = nav height
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = useCallback((id: string) => {
    onCategoryClick(id)
    // Scroll to section
    const element = document.getElementById(`menu-${id}`)
    if (element) {
      const offset = 160 // Account for both navs
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      })
    }
  }, [onCategoryClick])

  return (
    <>
      {/* Placeholder to maintain scroll position */}
      <div ref={placeholderRef} className="h-16" />
      
      <nav
        ref={navRef}
        className={`${
          isSticky
            ? 'fixed top-20 left-0 right-0 z-40 bg-white/95 dark:bg-dark-950/95 backdrop-blur-lg shadow-sm border-b border-gray-100 dark:border-gray-800'
            : 'relative bg-transparent'
        } transition-all duration-300`}
        aria-label="Menu categories"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleClick(category.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25'
                    : 'bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))] hover:bg-secondary-100 hover:text-secondary-700'
                }`}
                aria-current={activeCategory === category.id ? 'true' : undefined}
              >
                {iconMap[category.id] || <UtensilsCrossed className="w-4 h-4" />}
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}
