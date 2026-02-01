'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { FAQItem } from '@/types'

interface FAQAccordionProps {
  items: FAQItem[]
  className?: string
}

export function FAQAccordion({ items, className = '' }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-[rgb(var(--border))] rounded-lg overflow-hidden bg-[rgb(var(--surface))]"
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-[rgb(var(--muted))] transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500"
            aria-expanded={openIndex === index}
            aria-controls={`faq-content-${index}`}
          >
            <span className="font-medium text-[rgb(var(--foreground))] pr-4">
              {item.question}
            </span>
            <motion.span
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="shrink-0"
            >
              <ChevronDown className="w-5 h-5 text-[rgb(var(--muted-foreground))]" />
            </motion.span>
          </button>
          
          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                id={`faq-content-${index}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                <div className="px-5 pb-5 text-[rgb(var(--muted-foreground))] leading-relaxed border-t border-[rgb(var(--border))] pt-4">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
