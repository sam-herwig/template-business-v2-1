'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbProps {
  items: { label: string; href: string }[]
  light?: boolean
}

export function Breadcrumb({ items, light = false }: BreadcrumbProps) {
  const textClass = light 
    ? 'text-white/70 hover:text-white' 
    : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'
  const activeClass = light ? 'text-white' : 'text-[rgb(var(--foreground))]'
  const separatorClass = light ? 'text-white/40' : 'text-[rgb(var(--muted-foreground))]/50'

  return (
    <nav aria-label="Breadcrumb">
      <ol 
        className="flex items-center gap-2 text-sm"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <li 
          className="flex items-center"
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link 
            href="/" 
            className={`${textClass} transition-colors flex items-center gap-1`}
            itemProp="item"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            <span itemProp="name" className="sr-only">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const position = index + 2
          
          return (
            <li 
              key={item.href}
              className="flex items-center"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <ChevronRight 
                className={`w-4 h-4 mx-1 ${separatorClass}`} 
                aria-hidden="true" 
              />
              {isLast ? (
                <span className={activeClass} itemProp="name" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link 
                  href={item.href} 
                  className={`${textClass} transition-colors`}
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              )}
              <meta itemProp="position" content={String(position)} />
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
