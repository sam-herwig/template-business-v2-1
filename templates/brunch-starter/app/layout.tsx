import type { Metadata, Viewport } from 'next'
import { Fraunces, DM_Sans, Caveat } from 'next/font/google'
import './globals.css'
import { SmoothScroll } from '@/lib/lenis'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-script',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF7F2' },
    { media: '(prefers-color-scheme: dark)', color: '#1A1614' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Sunny Side | Denver\'s Favorite Brunch Spot',
  description: 'Farm-fresh breakfast & brunch in the heart of RiNo. Good vibes, great coffee, and food that makes you smile. Open daily 7am-3pm.',
  keywords: ['brunch', 'breakfast', 'Denver', 'RiNo', 'restaurant', 'farm fresh', 'coffee', 'reservations', 'brunch spot'],
  authors: [{ name: 'Sunny Side' }],
  creator: 'Sunny Side',
  openGraph: {
    title: 'Sunny Side | Denver\'s Favorite Brunch Spot',
    description: 'Farm-fresh breakfast & brunch in the heart of RiNo. Good vibes, great coffee, and food that makes you smile.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Sunny Side',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sunny Side | Denver\'s Favorite Brunch Spot',
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
      <body 
        className={`
          ${fraunces.variable} 
          ${dmSans.variable} 
          ${caveat.variable} 
          font-body antialiased 
          bg-cream text-charcoal 
          dark:bg-dark-bg dark:text-cream 
          transition-colors
        `}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
