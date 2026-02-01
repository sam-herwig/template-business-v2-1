import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SmoothScroll } from '@/lib/lenis'
import { CustomCursor } from '@/components/CustomCursor'

// Using Inter as fallback. For production, download Satoshi from:
// https://www.fontshare.com/fonts/satoshi
// Place woff2 files in public/fonts/ and uncomment the localFont config below:
// 
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

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-satoshi',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Agency Name | Digital Studio',
  description: 'Award-winning digital agency crafting bold brands and unforgettable experiences.',
  openGraph: {
    title: 'Agency Name | Digital Studio',
    description: 'Award-winning digital agency crafting bold brands and unforgettable experiences.',
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
      <body className={`${inter.variable} font-sans antialiased bg-dark-950 text-white`}>
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
