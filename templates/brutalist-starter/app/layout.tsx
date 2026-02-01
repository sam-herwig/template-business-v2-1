import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Sora } from 'next/font/google'
import './globals.css'
import { SmoothScroll } from '@/lib/lenis'
import { CustomCursor } from '@/components/CustomCursor'

// Using Google Fonts (Sora as Cabinet Grotesk alternative)
// For production, download Cabinet Grotesk from https://www.fontshare.com/fonts/cabinet-grotesk
// and place woff2 files in public/fonts/, then switch to localFont
const displayFont = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFEF5' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
}

export const metadata: Metadata = {
  title: 'SMASH Studio | Bold Creative Agency in Denver',
  description: 'Denver\'s boldest creative agency. Strategy, design, and development for brands that refuse to be ignored. 150+ projects shipped with 100% client satisfaction.',
  keywords: ['creative agency', 'Denver', 'branding', 'web design', 'app design', 'motion design', 'brand strategy'],
  authors: [{ name: 'SMASH Studio' }],
  creator: 'SMASH Studio',
  openGraph: {
    title: 'SMASH Studio | Bold Creative Agency in Denver',
    description: 'Denver\'s boldest creative agency. Strategy, design, and development for brands that refuse to be ignored.',
    type: 'website',
    locale: 'en_US',
    siteName: 'SMASH Studio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SMASH Studio | Bold Creative Agency',
    description: 'Denver\'s boldest creative agency. Strategy, design, and development for brands that refuse to be ignored.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://picsum.photos" crossOrigin="anonymous" />
      </head>
      <body 
        className={`${displayFont.variable} ${spaceGrotesk.variable} font-body antialiased bg-brutal-bg text-brutal-text`}
      >
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
