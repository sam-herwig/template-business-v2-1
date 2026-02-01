// ═══════════════════════════════════════════════════════════════
// SAAS STARTER TEMPLATE
// Modern, clean landing page for SaaS products & startups
// Tech-forward design with gradient accents + Premium GSAP animations
// ═══════════════════════════════════════════════════════════════

import {
  Nav,
  Hero,
  Stats,
  Features,
  Pricing,
  Testimonials,
  FAQ,
  CTA,
  Footer,
} from './components'

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Nav />
      <Hero />
      <Stats />
      <Features />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
