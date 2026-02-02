'use client'

import { useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Blurs on route change to prevent focus persistence after SPA navigation
export function SkipLink() {
  const linkRef = useRef<HTMLAnchorElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    linkRef.current?.blur()
  }, [pathname])

  return (
    <a
      ref={linkRef}
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
    >
      Skip to main content
    </a>
  )
}
