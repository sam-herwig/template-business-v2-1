'use client'

// ═══════════════════════════════════════════════════════════════
// GYM STARTER TEMPLATE
// Bold, energetic site for gyms, fitness studios & boutique fitness
// High-energy design with aggressive typography
// ═══════════════════════════════════════════════════════════════

import {
  SkipLink,
  Nav,
  Hero,
  Classes,
  Membership,
  Trainers,
  Amenities,
  TrialCTA,
  Contact,
  Footer,
} from './components'

export default function Home() {
  return (
    <>
      <SkipLink />
      <Nav />
      <main id="main-content" className="overflow-hidden">
        <Hero />
        <Classes />
        <Membership />
        <Trainers />
        <Amenities />
        <TrialCTA />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
