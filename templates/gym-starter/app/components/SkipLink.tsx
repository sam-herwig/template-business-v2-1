'use client'

// ═══════════════════════════════════════════════════════════════
// Skip to Main Content Link - Accessibility
// ═══════════════════════════════════════════════════════════════

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-primary-500 focus:text-white focus:font-bold focus:uppercase focus:tracking-widest focus:text-sm focus:outline-none focus:ring-2 focus:ring-white"
    >
      Skip to main content
    </a>
  )
}
