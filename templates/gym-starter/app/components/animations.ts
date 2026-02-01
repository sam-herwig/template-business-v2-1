// ═══════════════════════════════════════════════════════════════
// GYM STARTER TEMPLATE - Animation Variants
// With reduced motion support for accessibility
// ═══════════════════════════════════════════════════════════════

import type { Variants, TargetAndTransition } from 'framer-motion'

// Standard animation targets
const EASE = [0.22, 1, 0.36, 1]

// ─────────────────────────────────────────────────────────────────
// Fade in with upward motion
// ─────────────────────────────────────────────────────────────────
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

export const fadeInUpReduced: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.01 } },
}

// ─────────────────────────────────────────────────────────────────
// Simple fade in
// ─────────────────────────────────────────────────────────────────
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8 } },
}

export const fadeInReduced: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.01 } },
}

// ─────────────────────────────────────────────────────────────────
// Scale in effect
// ─────────────────────────────────────────────────────────────────
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
}

export const scaleInReduced: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.01 } },
}

// ─────────────────────────────────────────────────────────────────
// Fade in from left/right
// ─────────────────────────────────────────────────────────────────
export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
}

export const fadeInLeftReduced: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.01 } },
}

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
}

export const fadeInRightReduced: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.01 } },
}

// ─────────────────────────────────────────────────────────────────
// Container with staggered children
// ─────────────────────────────────────────────────────────────────
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const staggerContainerReduced: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0,
      delayChildren: 0,
    },
  },
}

// ─────────────────────────────────────────────────────────────────
// Mobile menu animation
// ─────────────────────────────────────────────────────────────────
export const mobileMenu: Variants = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
}

export const mobileMenuReduced: Variants = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: 'auto', transition: { duration: 0.01 } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.01 } },
}

// ─────────────────────────────────────────────────────────────────
// Utility to pick variant based on reduced motion preference
// ─────────────────────────────────────────────────────────────────
export function useVariant(normal: Variants, reduced: Variants, prefersReducedMotion: boolean | null): Variants {
  return prefersReducedMotion ? reduced : normal
}

// Animation properties for whileInView usage
export interface AnimationProps {
  initial: TargetAndTransition
  animate: TargetAndTransition
  transition?: object
}

export function getAnimationProps(prefersReducedMotion: boolean | null): {
  fadeInUp: AnimationProps
  fadeIn: AnimationProps
  fadeInLeft: AnimationProps
  fadeInRight: AnimationProps
} {
  if (prefersReducedMotion) {
    return {
      fadeInUp: { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.01 } },
      fadeIn: { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.01 } },
      fadeInLeft: { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.01 } },
      fadeInRight: { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.01 } },
    }
  }
  return {
    fadeInUp: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: EASE } },
    fadeIn: { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.8 } },
    fadeInLeft: { initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.6, ease: EASE } },
    fadeInRight: { initial: { opacity: 0, x: 30 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.6, ease: EASE } },
  }
}
