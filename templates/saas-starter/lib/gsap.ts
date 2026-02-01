'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

// Register GSAP plugins (Shockingly Green license)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText)
  
  // Global defaults for smoother animations
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.8,
  })
  
  // ScrollTrigger defaults
  ScrollTrigger.defaults({
    toggleActions: 'play none none reverse',
  })
}

export { gsap, ScrollTrigger, SplitText }
