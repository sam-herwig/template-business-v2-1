'use client'

import { ReactNode } from 'react'
import { AuroraMesh } from './aurora-mesh'
import { Nav } from './nav'
import { Footer } from './footer'

interface PageLayoutProps {
  children: ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <AuroraMesh />
      <div className="grain-overlay" aria-hidden="true" />
      <header>
        <Nav />
      </header>
      <main id="main-content">
        {children}
      </main>
      <Footer />
    </>
  )
}
