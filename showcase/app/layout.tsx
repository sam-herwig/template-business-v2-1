import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Premium Website Templates | Launch Your Business Today',
  description: 'Production-ready Next.js templates for restaurants, contractors, salons, gyms, SaaS, coaches, and agencies. Built with Sanity CMS. Deploy in minutes.',
  keywords: 'website templates, Next.js templates, business websites, restaurant website, contractor website, salon website, gym website',
  openGraph: {
    title: 'Premium Website Templates | Launch Your Business Today',
    description: 'Production-ready templates that look like $5K custom designs. Next.js + Sanity CMS.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
