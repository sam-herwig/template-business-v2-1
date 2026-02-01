'use client'

import { FAQAccordion } from '../shared/FAQAccordion'
import type { FAQItem } from '@/types'

const policies: FAQItem[] = [
  {
    question: 'What is your cancellation policy?',
    answer: 'We kindly request at least 24 hours notice for cancellations. For parties of 6 or more, we require 48 hours notice. Cancellations with less notice may result in a fee.',
  },
  {
    question: 'Do you have a dress code?',
    answer: 'We maintain a smart casual dress code. We ask that guests refrain from wearing athletic wear, flip-flops, or overly casual attire. Jackets are not required but appreciated for evening service.',
  },
  {
    question: 'How long will you hold our reservation?',
    answer: 'Tables are held for 15 minutes past the reservation time. If you\'re running late, please call us and we\'ll do our best to accommodate you.',
  },
  {
    question: 'Do you accommodate dietary restrictions?',
    answer: 'Absolutely! Please note any allergies or dietary requirements when making your reservation, and our kitchen will prepare appropriate options. We can accommodate vegetarian, vegan, gluten-free, and most allergy concerns.',
  },
  {
    question: 'Is the restaurant wheelchair accessible?',
    answer: 'Yes, our restaurant is fully wheelchair accessible with an accessible entrance, restrooms, and seating options. Please let us know when booking if you have any specific accessibility needs.',
  },
  {
    question: 'Do you accommodate large parties?',
    answer: 'For parties of 8 or more, please contact us directly at (555) 123-4567 or email events@goldenfork.com. We also have private dining options available for larger celebrations.',
  },
]

export function PolicyAccordion() {
  return (
    <div>
      <h3 className="font-display text-2xl text-dark-900 dark:text-white mb-6">
        Dining Policies
      </h3>
      <FAQAccordion items={policies} />
    </div>
  )
}
