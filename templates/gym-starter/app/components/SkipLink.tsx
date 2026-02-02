'use client'

import { useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'

// ═══════════════════════════════════════════════════════════════
// Skip to Main Content Link - Accessibility
// Blurs on route change to prevent focus persistence after SPA navigation
// ═══════════════════════════════════════════════════════════════

export function SkipLink() {
  const linkRef = useRef<HTMLAnchorElement>(null)
  const pathname = usePathname()

  // Blur the skip link on route change to prevent it from showing
  useEffect(() => {
    linkRef.current?.blur()
  }, [pathname])

  return (
    <a
      ref={linkRef}
      href="#main-content"
      className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-primary-500 focus:text-white focus:font-bold focus:uppercase focus:tracking-widest focus:text-sm focus:outline-none focus:ring-2 focus:ring-white"
    >
      Skip to main content
    </a>
  )
}
