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
}

// Gallery
export interface GalleryImage {
  src: string
  alt: string
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
