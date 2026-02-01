// Restaurant configuration
export interface RestaurantConfig {
  name: string
  tagline: string
  description: string
  phone: string
  email: string
  address: string
  hours: {
    weekday: string
    weekend: string
  }
  heroImage: string
}

// Menu types
export interface MenuCategory {
  id: string
  name: string
  icon: string
}

export type DietaryType = 'v' | 'vg' | 'gf'

export interface MenuItem {
  id: number
  category: string
  name: string
  description: string
  price: number
  dietary: DietaryType[]
  image?: string
  featured?: boolean
}

// Gallery
export interface GalleryImage {
  id?: string
  src: string
  alt: string
  category?: 'food' | 'interior' | 'events' | 'team'
  caption?: string
  width?: number
  height?: number
}

// Testimonials
export interface Testimonial {
  quote: string
  author: string
  role: string
  rating: number
}

// Contact info item
export interface ContactItem {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}

// Event Space
export interface EventSpace {
  id: string
  name: string
  description: string
  capacity: { min: number; max: number }
  minSpend?: number
  features: string[]
  images: string[]
  bestFor: string[]
}

// Chef/Team
export interface TeamMember {
  name: string
  role: string
  bio: string
  photo: string
  socials?: { platform: string; url: string }[]
}

// Press Item
export interface PressItem {
  source: string
  logo: string
  quote?: string
  link?: string
  date?: string
}

// Hours (enhanced)
export interface BusinessHours {
  day: string
  open: string
  close: string
  closed?: boolean
}

// Parking/Transit
export interface ParkingOption {
  type: 'street' | 'valet' | 'garage' | 'transit'
  label: string
  details: string
}

// Value Item for About page
export interface ValueItem {
  icon: string
  title: string
  description: string
}

// Daily Special
export interface DailySpecial {
  name: string
  description: string
  price: number
  image: string
  chefNote?: string
}

// FAQ Item
export interface FAQItem {
  question: string
  answer: string
}

// Event Inquiry
export interface EventInquiryData {
  eventType: 'corporate' | 'wedding' | 'birthday' | 'holiday' | 'other'
  partySize: number
  preferredDate: string
  flexibility: 'exact' | 'flexible'
  name: string
  email: string
  phone: string
  company?: string
  details: string
}

// Contact Form
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: 'general' | 'feedback' | 'catering' | 'press' | 'careers' | 'other'
  message: string
}

// Booking Form
export interface BookingFormData {
  partySize: number
  date: string
  time: string
  name: string
  email: string
  phone: string
  specialRequests?: string
}
