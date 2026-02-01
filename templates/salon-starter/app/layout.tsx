import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'
import { SmoothScroll } from '@/lib/lenis'

// Elegant display font for headings
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

// Clean body font
const dmSans = DM_Sans({ 
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Luxe Hair Studio | Premium Hair & Beauty Services',
  description: 'Award-winning stylists dedicated to bringing out your natural beauty. Book your appointment for cuts, color, styling, and treatments.',
  openGraph: {
    title: 'Luxe Hair Studio | Premium Hair & Beauty Services',
    description: 'Award-winning stylists dedicated to bringing out your natural beauty. Book your appointment for cuts, color, styling, and treatments.',
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
      <body className={`${playfair.variable} ${dmSans.variable} font-body antialiased`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
