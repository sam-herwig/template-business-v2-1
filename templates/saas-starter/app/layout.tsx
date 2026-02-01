import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { SmoothScroll } from '@/lib/lenis'

// Using Space Grotesk as display font (similar to General Sans)
// For custom fonts, download from https://www.fontshare.com/fonts/general-sans
// and place woff2 files in public/fonts/
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SaaS Starter - Launch Your Product Today',
  description: 'A premium landing page template for SaaS products, startups, and web apps.',
  openGraph: {
    title: 'SaaS Starter - Launch Your Product Today',
    description: 'A premium landing page template for SaaS products, startups, and web apps.',
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
      <body className={`${spaceGrotesk.variable} ${inter.variable} font-body antialiased`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
