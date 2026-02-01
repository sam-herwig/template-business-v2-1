'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FAQ } from '../lib/data'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  
  return (
    <section id="faq" className="section-padding">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <span className="section-eyebrow">FAQ</span>
          <h2 className="section-title">Frequently asked questions</h2>
          <p className="section-description mx-auto">
            Everything you need to know about the product.
          </p>
        </div>
        
        <div className="space-y-4">
          {FAQ.map((item, i) => (
            <div key={i} className="faq-item">
              <button
                className="faq-button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span>{item.question}</span>
                <span className={`faq-icon ${openIndex === i ? 'faq-icon-open' : ''}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="faq-answer">{item.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
