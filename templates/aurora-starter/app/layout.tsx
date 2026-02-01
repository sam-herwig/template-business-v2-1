import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { SmoothScroll } from '@/lib/lenis'

// Using Google Fonts for consistent availability
// Space Grotesk as display font - geometric, modern feel similar to General Sans
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#030014',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://lumina.design'),
  title: 'Lumina | Design Without Boundaries',
  description: 'The next generation design platform that transforms your creative workflow with AI-powered tools and real-time collaboration. Join 50K+ designers.',
  keywords: ['design platform', 'AI design', 'collaboration', 'design tools', 'creative workflow'],
  openGraph: {
    title: 'Lumina | Design Without Boundaries',
    description: 'The next generation design platform with AI-powered tools and real-time collaboration.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lumina | Design Without Boundaries',
    description: 'AI-powered design platform for modern creative workflows.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${spaceGrotesk.variable} ${inter.variable} font-body antialiased bg-aurora-bg text-aurora-text`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
