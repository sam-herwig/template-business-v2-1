'use client'

import { gsap as gsapCore } from 'gsap'
import { ScrollTrigger as ScrollTriggerPlugin } from 'gsap/ScrollTrigger'
import { SplitText as SplitTextPlugin } from 'gsap/SplitText'

// Register GSAP plugins (Shockingly Green license)
if (typeof window !== 'undefined') {
  gsapCore.registerPlugin(ScrollTriggerPlugin, SplitTextPlugin)
  
  // Global defaults for smoother animations
  gsapCore.defaults({
    ease: 'power3.out',
    duration: 0.8,
  })
  
  // ScrollTrigger defaults
  ScrollTriggerPlugin.defaults({
    toggleActions: 'play none none reverse',
  })
}

// Re-export with proper types
export const gsap = gsapCore
export const ScrollTrigger = ScrollTriggerPlugin
export const SplitText = SplitTextPlugin
