import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SmoothScroll } from '@/lib/lenis'
import { CustomCursor } from '@/components/CustomCursor'

// Using Inter as a reliable fallback - replace with Satoshi when fonts are available
// Download Satoshi from https://www.fontshare.com/fonts/satoshi and place woff2 in public/fonts/
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-satoshi',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#0a0a0b',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Kinetic | Typography in Motion',
  description: 'We create experiences through kinetic typography. Motion design studio specializing in animated text, title sequences, and brand expression.',
  keywords: ['kinetic typography', 'motion design', 'animation', 'title sequences', 'brand motion', 'animated text'],
  openGraph: {
    title: 'Kinetic | Typography in Motion',
    description: 'Motion design studio specializing in animated text and brand expression.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kinetic | Typography in Motion',
    description: 'Motion design studio specializing in kinetic typography.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-kinetic-bg text-kinetic-text`}>
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
