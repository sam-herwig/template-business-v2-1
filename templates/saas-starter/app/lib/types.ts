// ═══════════════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════

export interface Product {
  name: string
  tagline: string
  description: string
}

export interface HeroContent {
  badge: string
  headline: string
  headlineHighlight: string
  subheadline: string
  primaryCta: string
  secondaryCta: string
}

export interface Feature {
  icon: string
  title: string
  description: string
}

export interface Stat {
  number: string
  label: string
  suffix: string
}

export interface PricingPlan {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  cta: string
  popular: boolean
}

export interface Testimonial {
  quote: string
  author: string
  role: string
  avatar: string
  company: string
}

export interface FAQItem {
  question: string
  answer: string
}
