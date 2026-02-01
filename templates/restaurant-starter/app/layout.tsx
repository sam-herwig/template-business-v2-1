import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'
import { SmoothScroll } from '@/lib/lenis'

// Using Google Fonts as fallback (Playfair Display is similar to Zodiak)
// For custom fonts: Download Zodiak from https://www.fontshare.com/fonts/zodiak
// Place woff2 files in public/fonts/ and use localFont
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Restaurant Name | Fine Dining',
  description: 'Experience exceptional cuisine in an unforgettable atmosphere.',
  openGraph: {
    title: 'Restaurant Name | Fine Dining',
    description: 'Experience exceptional cuisine in an unforgettable atmosphere.',
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
      <body className={`${playfair.variable} ${plusJakarta.variable} font-body antialiased`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
