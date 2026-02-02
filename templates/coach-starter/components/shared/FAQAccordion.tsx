'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
  title?: string
  description?: string
}

export function FAQAccordion({ items, title, description }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const faqRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Refresh ScrollTrigger on mount to handle SPA navigation
    ScrollTrigger.refresh()

    const ctx = gsap.context(() => {
      if (title) {
        gsap.fromTo('.faq-header', 
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: faqRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      gsap.fromTo('.faq-item', 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.faq-list',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, faqRef)

    return () => {
      ctx.revert()
      ScrollTrigger.refresh()
    }
  }, [title])

  return (
    <div ref={faqRef}>
      {(title || description) && (
        <div className="faq-header text-center mb-12">
          {title && <h2 className="section-title">{title}</h2>}
          {description && <p className="section-description mx-auto">{description}</p>}
        </div>
      )}

      <div className="faq-list space-y-4 max-w-3xl mx-auto">
        {items.map((item, i) => (
          <div key={i} className="faq-item bg-white rounded-xl overflow-hidden border border-cream-300">
            <button
              className="w-full px-6 py-5 text-left flex items-center justify-between font-medium text-primary-900 hover:bg-cream-50 transition-colors"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
            >
              <span className="font-display text-lg pr-4">{item.question}</span>
              <svg
                className={`w-5 h-5 text-primary-500 transition-transform flex-shrink-0 ${
                  openIndex === i ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0.1 : 0.3 }}
                >
                  <div className="px-6 pb-5 text-primary-800/70 leading-relaxed">{item.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQAccordion
