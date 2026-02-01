'use client'

import { FAQAccordion } from '../shared/FAQAccordion'
import type { FAQItem } from '@/types'

const eventFAQs: FAQItem[] = [
  {
    question: 'What is included in the food and beverage minimum?',
    answer: 'The minimum includes all food and beverages consumed during your event. Tax and gratuity (typically 20%) are additional. We can work with you to create a custom menu that meets your budget and preferences.',
  },
  {
    question: 'Can we bring our own wine or cake?',
    answer: 'Yes! We allow outside cakes with no corkage fee. For wine and champagne, we charge a $25/bottle corkage fee. All other beverages must be purchased through the restaurant.',
  },
  {
    question: 'How far in advance should we book?',
    answer: 'We recommend booking at least 4-6 weeks in advance for smaller events, and 2-3 months for larger parties or peak season dates (holidays, graduation season, etc.). Popular dates can fill up quickly!',
  },
  {
    question: 'What is your cancellation policy for private events?',
    answer: 'A 50% deposit is required to secure your date. Cancellations more than 30 days out receive a full refund. Cancellations 14-30 days out forfeit 50% of the deposit. Cancellations less than 14 days out forfeit the full deposit.',
  },
  {
    question: 'Do you provide event decorations or floral arrangements?',
    answer: 'We partner with several local florists and event decorators who are familiar with our spaces. We\'re happy to provide recommendations, or you may bring your own decorations. Setup/cleanup time is included in your reservation.',
  },
  {
    question: 'Can you accommodate dietary restrictions and allergies?',
    answer: 'Absolutely! Our chef is experienced in creating menus for guests with allergies, vegetarian/vegan diets, gluten-free needs, and other dietary restrictions. Please let us know when planning your menu.',
  },
  {
    question: 'Is there a separate entrance for private events?',
    answer: 'Our Private Dining Room has a dedicated entrance from the side of the building. The Wine Cellar is accessed through the main restaurant. Full restaurant buyouts use the main entrance.',
  },
  {
    question: 'Do you have A/V equipment available?',
    answer: 'Yes, our Private Dining Room is equipped with a 65" TV, wireless presentation capabilities, and a microphone system. Additional A/V equipment can be arranged through our partners.',
  },
]

export function EventFAQ() {
  return (
    <div>
      <div className="text-center mb-10">
        <span className="section-eyebrow">Questions</span>
        <h2 className="font-display text-3xl md:text-4xl text-dark-900 dark:text-white">
          Frequently Asked Questions
        </h2>
      </div>
      <div className="max-w-3xl mx-auto">
        <FAQAccordion items={eventFAQs} />
      </div>
    </div>
  )
}
