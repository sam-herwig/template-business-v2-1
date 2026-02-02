import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://craftedkit.com'),
  title: 'Crafted Kit — Premium Next.js Templates | Ship in Days, Not Months',
  description: 'Premium Next.js templates with Sanity CMS baked in. Beautiful, responsive, dark mode ready—so you can skip the setup and get straight to the good part.',
  keywords: [
    'Next.js templates',
    'React templates',
    'Sanity CMS templates',
    'website templates',
    'SaaS template',
    'agency template',
    'Tailwind CSS',
    'TypeScript',
    'production-ready templates',
  ],
  authors: [{ name: 'Crafted Kit' }],
  openGraph: {
    title: 'Crafted Kit — Premium Next.js Templates',
    description: 'Ship in days, not months. Premium templates with Sanity CMS baked in.',
    url: 'https://craftedkit.com',
    siteName: 'Crafted Kit',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Crafted Kit - Premium Next.js Templates',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crafted Kit — Premium Next.js Templates',
    description: 'Ship in days, not months. Premium templates with Sanity CMS baked in.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
