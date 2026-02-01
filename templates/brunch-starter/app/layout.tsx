import type { Metadata, Viewport } from 'next'
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

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FBF7F0' },
    { media: '(prefers-color-scheme: dark)', color: '#1F1A16' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Sunny Side | Denver Brunch Restaurant in RiNo',
  description: 'Farm-fresh breakfast & brunch in the heart of RiNo, Denver. Good vibes, great coffee, and food that makes you smile. Open daily.',
  keywords: ['brunch', 'breakfast', 'Denver', 'RiNo', 'restaurant', 'farm fresh', 'coffee', 'reservations'],
  authors: [{ name: 'Sunny Side' }],
  creator: 'Sunny Side',
  openGraph: {
    title: 'Sunny Side | Denver Brunch Restaurant',
    description: 'Farm-fresh breakfast & brunch in the heart of RiNo. Good vibes, great coffee, and food that makes you smile.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Sunny Side',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sunny Side | Denver Brunch Restaurant',
    description: 'Farm-fresh breakfast & brunch in the heart of RiNo. Good vibes, great coffee, and food that makes you smile.',
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
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Dark mode script - runs before body renders to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var mode = localStorage.getItem('theme');
                  if (mode === 'dark' || (!mode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${fraunces.variable} ${outfit.variable} font-body antialiased bg-brunch-cream text-brunch-brown dark:bg-[#1F1A16] dark:text-brunch-cream transition-colors`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
