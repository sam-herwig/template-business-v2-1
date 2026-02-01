import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { SmoothScroll } from '@/lib/lenis'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
}

export const metadata: Metadata = {
  title: 'Acme | Build and Deploy on the Modern Web',
  description: 'The platform for developers to build, deploy, and scale applications with zero configuration. Deploy in seconds across 100+ edge locations.',
  keywords: ['deployment', 'developer platform', 'edge computing', 'serverless', 'web hosting', 'CI/CD'],
  openGraph: {
    title: 'Acme | Build and Deploy on the Modern Web',
    description: 'Zero configuration deployment for modern web applications.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Acme | Build and Deploy on the Modern Web',
    description: 'Zero configuration deployment platform.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${plusJakarta.variable} font-sans antialiased bg-minimal-bg dark:bg-minimal-dark-bg text-minimal-text dark:text-minimal-dark-text`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
