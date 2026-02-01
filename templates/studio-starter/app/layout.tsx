import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SmoothScroll } from '@/lib/lenis'
import { CustomCursor } from '@/components/CustomCursor'

// Using Inter as a reliable Google Font fallback
// For custom fonts, download Satoshi from https://www.fontshare.com/fonts/satoshi
// and uncomment the localFont configuration below
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-satoshi',
  display: 'swap',
})

// Uncomment when fonts are available in public/fonts/
// import localFont from 'next/font/local'
// const satoshi = localFont({
//   src: [
//     { path: '../public/fonts/Satoshi-Regular.woff2', weight: '400', style: 'normal' },
//     { path: '../public/fonts/Satoshi-Medium.woff2', weight: '500', style: 'normal' },
//     { path: '../public/fonts/Satoshi-Bold.woff2', weight: '700', style: 'normal' },
//   ],
//   variable: '--font-satoshi',
//   display: 'swap',
// })

export const viewport: Viewport = {
  themeColor: '#0A0A0F',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://prism.studio'),
  title: 'Studio Prism | Digital Design Studio',
  description: 'Full-spectrum digital design services. We craft experiences that inspire and convert. 150+ projects delivered with 98% client satisfaction.',
  keywords: ['digital design', 'UI/UX design', 'branding', 'web development', 'motion design', 'design studio'],
  authors: [{ name: 'Studio Prism' }],
  creator: 'Studio Prism',
  openGraph: {
    title: 'Studio Prism | Digital Design Studio',
    description: 'Full-spectrum digital design services. We craft experiences that inspire and convert.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Studio Prism',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studio Prism | Digital Design Studio',
    description: 'Full-spectrum digital design services. We craft experiences that inspire and convert.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-studio-bg text-studio-text`}>
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
