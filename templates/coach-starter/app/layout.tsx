import type { Metadata } from 'next'
import { Fraunces, Outfit } from 'next/font/google'
import './globals.css'
import { SmoothScroll } from '@/lib/lenis'

const fraunces = Fraunces({ 
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Coach Name | Transform Your Life',
  description: 'Personal coaching and consulting to help you achieve your biggest goals.',
  openGraph: {
    title: 'Coach Name | Transform Your Life',
    description: 'Personal coaching and consulting to help you achieve your biggest goals.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${fraunces.variable} ${outfit.variable} font-body antialiased`}>
        {/* Skip link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:rounded-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
