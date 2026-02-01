// ═══════════════════════════════════════════════════════════════
// GYM STARTER TEMPLATE - Data Arrays
// ═══════════════════════════════════════════════════════════════

import type { GymInfo, FitnessClass, MembershipPlan, Trainer, Amenity, Stat } from './types'
import {
  WeightIcon,
  BikeIcon,
  YogaIcon,
  BoxingIcon,
  ShowerIcon,
  ParkingIcon,
} from './icons'

export const GYM: GymInfo = {
  name: "IRON ATHLETICS",
  tagline: "Transform Your Body. Elevate Your Mind.",
  description: "Denver's premier fitness community. World-class equipment, expert trainers, and 50+ weekly classes.",
  phone: "(555) 345-6789",
  email: "info@ironathletics.com",
  address: "789 Fitness Blvd",
  heroImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop&q=90",
  bookingUrl: "#join",
}

export const CLASSES: FitnessClass[] = [
  { name: "HIIT", time: "6:00 AM", duration: "45 min", instructor: "Mike", intensity: "High", spots: 3, image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop&q=85" },
  { name: "Yoga Flow", time: "7:00 AM", duration: "60 min", instructor: "Sarah", intensity: "Low", spots: 12, image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop&q=85" },
  { name: "Spin", time: "8:00 AM", duration: "45 min", instructor: "Carlos", intensity: "High", spots: 5, image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=600&h=400&fit=crop&q=85" },
  { name: "Strength", time: "12:00 PM", duration: "60 min", instructor: "Alex", intensity: "Medium", spots: 10, image: "https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=600&h=400&fit=crop&q=85" },
  { name: "Boxing", time: "5:30 PM", duration: "60 min", instructor: "Maria", intensity: "High", spots: 6, image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&h=400&fit=crop&q=85" },
  { name: "Pilates", time: "6:30 PM", duration: "50 min", instructor: "Emma", intensity: "Medium", spots: 15, image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop&q=85" },
]

export const MEMBERSHIP: MembershipPlan[] = [
  {
    name: "Day Pass",
    price: 25,
    period: "per visit",
    features: ["Full gym access", "All classes included", "Locker room access", "Free parking"],
    featured: false,
  },
  {
    name: "Monthly",
    price: 79,
    period: "/month",
    features: ["Unlimited gym access", "All classes included", "1 PT session/month", "Free parking", "Towel service", "Guest pass (1/month)"],
    featured: true,
  },
  {
    name: "Annual",
    price: 59,
    period: "/month",
    features: ["Everything in Monthly", "2 PT sessions/month", "Guest passes (2/month)", "Nutrition consultation", "Merchandise discount", "Priority booking"],
    featured: false,
    note: "Billed annually ($708/year) — Save $240",
  },
]

export const TRAINERS: Trainer[] = [
  { name: "Mike Johnson", specialty: "HIIT & Conditioning", cert: "NASM-CPT", image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=500&h=600&fit=crop&q=85" },
  { name: "Sarah Chen", specialty: "Yoga & Mobility", cert: "RYT-500", image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=500&h=600&fit=crop&q=85" },
  { name: "Carlos Rivera", specialty: "Cycling & Cardio", cert: "ACE-CPT", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&h=600&fit=crop&q=85" },
  { name: "Alex Thompson", specialty: "Strength & Power", cert: "CSCS", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=600&fit=crop&q=85" },
]

export const AMENITIES: Amenity[] = [
  { icon: <WeightIcon className="w-8 h-8" />, name: "Weight Room", desc: "10,000 sq ft of free weights & machines" },
  { icon: <BikeIcon className="w-8 h-8" />, name: "Spin Studio", desc: "30 bikes with immersive screens" },
  { icon: <YogaIcon className="w-8 h-8" />, name: "Yoga Studio", desc: "Heated studio for hot yoga" },
  { icon: <BoxingIcon className="w-8 h-8" />, name: "Boxing Area", desc: "Heavy bags & speed bags" },
  { icon: <ShowerIcon className="w-8 h-8" />, name: "Locker Rooms", desc: "Luxury amenities & sauna" },
  { icon: <ParkingIcon className="w-8 h-8" />, name: "Free Parking", desc: "Convenient lot parking" },
]

export const STATS: Stat[] = [
  { value: "10K+", label: "Members" },
  { value: "50+", label: "Classes/Week" },
  { value: "15", label: "Trainers" },
  { value: "24/7", label: "Access" },
]
