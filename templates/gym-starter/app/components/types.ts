// ═══════════════════════════════════════════════════════════════
// GYM STARTER TEMPLATE - TypeScript Interfaces
// ═══════════════════════════════════════════════════════════════

export interface GymInfo {
  name: string
  tagline: string
  description: string
  phone: string
  email: string
  address: string
  heroImage: string
  bookingUrl: string
}

export interface FitnessClass {
  name: string
  time: string
  duration: string
  instructor: string
  intensity: 'High' | 'Medium' | 'Low'
  spots: number
  image: string
}

export interface MembershipPlan {
  name: string
  price: number
  period: string
  features: string[]
  featured: boolean
  note?: string
}

export interface Trainer {
  name: string
  specialty: string
  cert: string
  image: string
}

export interface Amenity {
  icon: React.ReactNode
  name: string
  desc: string
}

export interface Stat {
  value: string
  label: string
}

export type IntensityLevel = 'high' | 'medium' | 'low'
