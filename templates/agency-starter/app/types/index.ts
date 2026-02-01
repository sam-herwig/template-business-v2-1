// ═══════════════════════════════════════════════════════════════
// TYPESCRIPT INTERFACES
// Types for agency data structures (Sanity-compatible)
// ═══════════════════════════════════════════════════════════════

export interface HeroContent {
  headline: string[]
  subheadline: string
  cta: string
  clients: string[]
}

export interface CaseStudy {
  id: number
  title: string
  category: string
  tags: string[]
  image: string
  description: string
  link: string
}

export interface Service {
  number: string
  name: string
  description: string
  deliverables: string[]
}

export interface TeamMember {
  name: string
  role: string
  image: string
}

export interface Stat {
  value: string
  suffix: string
  label: string
}

export interface ProcessStep {
  step: string
  title: string
  description: string
}

// Sanity document types (for future CMS integration)
export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

export interface SanityCaseStudy extends SanityDocument {
  _type: 'caseStudy'
  title: string
  slug: { current: string }
  category: string
  tags: string[]
  mainImage: {
    asset: { _ref: string; _type: 'reference' }
    alt?: string
  }
  description: string
}

export interface SanityTeamMember extends SanityDocument {
  _type: 'teamMember'
  name: string
  role: string
  photo: {
    asset: { _ref: string; _type: 'reference' }
    alt?: string
  }
  bio?: string
}

export interface SanityService extends SanityDocument {
  _type: 'service'
  number: string
  name: string
  description: string
  deliverables: string[]
}
