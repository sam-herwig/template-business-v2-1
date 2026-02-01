'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { Check, Minus, ChevronDown } from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'

const tiers = [
  {
    name: 'Hobby',
    description: 'Perfect for side projects and experiments.',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      '100 deployments/month',
      '100GB bandwidth',
      'Automatic HTTPS',
      'Community support',
      '1 team member',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    description: 'For professional developers and small teams.',
    monthlyPrice: 20,
    yearlyPrice: 16,
    features: [
      'Unlimited deployments',
      '1TB bandwidth',
      'Advanced analytics',
      'Priority support',
      'Up to 10 team members',
      'Password protection',
      'Custom domains',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'For large teams with custom requirements.',
    monthlyPrice: 'Custom',
    yearlyPrice: 'Custom',
    features: [
      'Unlimited everything',
      'Custom bandwidth',
      'Advanced security',
      'Dedicated support',
      'Unlimited team members',
      'SLA guarantee',
      'SSO/SAML',
      'Audit logs',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

const comparisonFeatures = [
  { name: 'Deployments', hobby: '100/mo', pro: 'Unlimited', enterprise: 'Unlimited' },
  { name: 'Bandwidth', hobby: '100GB', pro: '1TB', enterprise: 'Custom' },
  { name: 'Build Minutes', hobby: '6,000/mo', pro: '20,000/mo', enterprise: 'Custom' },
  { name: 'Team Members', hobby: '1', pro: '10', enterprise: 'Unlimited' },
  { name: 'Custom Domains', hobby: false, pro: true, enterprise: true },
  { name: 'Analytics', hobby: 'Basic', pro: 'Advanced', enterprise: 'Advanced' },
  { name: 'Password Protection', hobby: false, pro: true, enterprise: true },
  { name: 'Priority Support', hobby: false, pro: true, enterprise: true },
  { name: 'SLA', hobby: false, pro: false, enterprise: true },
  { name: 'SSO/SAML', hobby: false, pro: false, enterprise: true },
]

const faqs = [
  {
    question: 'What counts as a deployment?',
    answer: 'A deployment is triggered each time you push to a connected Git branch or use our CLI to deploy. Preview deployments to non-production branches are included in your count.',
  },
  {
    question: 'Can I change plans anytime?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. When upgrading, you\'ll be prorated for the remainder of the billing cycle. Downgrades take effect at the next billing date.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 14-day money-back guarantee for all paid plans. If you\'re not satisfied, contact support within 14 days of purchase for a full refund.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express) as well as PayPal. Enterprise customers can also pay via invoice.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! The Pro plan comes with a 14-day free trial, no credit card required. You can explore all Pro features before committing.',
  },
]

function PricingToggle({ yearly, setYearly }: { yearly: boolean; setYearly: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className={`text-sm ${!yearly ? 'font-semibold text-minimal-text dark:text-minimal-dark-text' : 'text-minimal-muted dark:text-minimal-dark-muted'}`}>
        Monthly
      </span>
      <button
        onClick={() => setYearly(!yearly)}
        className="relative w-14 h-7 rounded-full bg-minimal-border dark:bg-minimal-dark-border transition-colors"
        role="switch"
        aria-checked={yearly}
        aria-label="Toggle yearly billing"
      >
        <span className={`absolute top-1 w-5 h-5 rounded-full bg-minimal-text dark:bg-minimal-dark-text transition-transform ${yearly ? 'left-8' : 'left-1'}`} />
      </button>
      <span className={`text-sm ${yearly ? 'font-semibold text-minimal-text dark:text-minimal-dark-text' : 'text-minimal-muted dark:text-minimal-dark-muted'}`}>
        Yearly <span className="text-green-500 font-semibold">-20%</span>
      </span>
    </div>
  )
}

function PricingCards({ yearly }: { yearly: boolean }) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.pricing-card', {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4 md:px-16 py-12">
      {tiers.map((tier) => {
        const price = yearly ? tier.yearlyPrice : tier.monthlyPrice
        return (
          <article
            key={tier.name}
            className={`pricing-card relative rounded-2xl p-8 border transition-all ${
              tier.popular
                ? 'border-[#0070f3] shadow-lg shadow-blue-500/10'
                : 'border-minimal-border dark:border-minimal-dark-border hover:border-minimal-muted dark:hover:border-minimal-dark-muted'
            } bg-white dark:bg-minimal-dark-card`}
          >
            {tier.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold bg-[#0070f3] text-white">
                Most Popular
              </span>
            )}

            <h3 className="font-display text-xl font-bold mb-2">{tier.name}</h3>
            <p className="text-minimal-muted dark:text-minimal-dark-muted text-sm mb-6">{tier.description}</p>

            <div className="mb-6">
              {typeof price === 'number' ? (
                <>
                  <span className="font-display text-4xl font-bold">${price}</span>
                  <span className="text-minimal-muted dark:text-minimal-dark-muted">/month</span>
                </>
              ) : (
                <span className="font-display text-4xl font-bold">Custom</span>
              )}
            </div>

            <ul className="space-y-3 mb-8">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button className={tier.popular ? 'btn-primary w-full justify-center' : 'btn-secondary w-full justify-center'}>
              {tier.cta}
            </button>
          </article>
        )
      })}
    </div>
  )
}

function ComparisonTable() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.comparison-table', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  const renderValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-500 mx-auto" />
      ) : (
        <Minus className="w-5 h-5 text-minimal-muted dark:text-minimal-dark-muted mx-auto" />
      )
    }
    return value
  }

  return (
    <section ref={ref} className="py-16 md:py-24 px-4 md:px-16 max-w-5xl mx-auto">
      <h2 className="font-display text-2xl font-bold text-center mb-12">Compare plans</h2>
      <div className="comparison-table overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-minimal-border dark:border-minimal-dark-border">
              <th className="py-4 px-4 font-semibold">Feature</th>
              <th className="py-4 px-4 text-center font-semibold">Hobby</th>
              <th className="py-4 px-4 text-center font-semibold">Pro</th>
              <th className="py-4 px-4 text-center font-semibold">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {comparisonFeatures.map((row) => (
              <tr key={row.name} className="border-b border-minimal-border dark:border-minimal-dark-border">
                <td className="py-4 px-4">{row.name}</td>
                <td className="py-4 px-4 text-center">{renderValue(row.hobby)}</td>
                <td className="py-4 px-4 text-center">{renderValue(row.pro)}</td>
                <td className="py-4 px-4 text-center">{renderValue(row.enterprise)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.faq-item', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-16 md:py-24 px-4 md:px-16 max-w-3xl mx-auto">
      <h2 className="font-display text-2xl font-bold text-center mb-12">Frequently asked questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={faq.question}
            className="faq-item border border-minimal-border dark:border-minimal-dark-border rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-6 text-left font-semibold hover:bg-minimal-bg dark:hover:bg-minimal-dark-bg transition-colors"
              aria-expanded={openIndex === i}
            >
              {faq.question}
              <ChevronDown className={`w-5 h-5 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === i && (
              <div className="px-6 pb-6 text-minimal-muted dark:text-minimal-dark-muted">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default function PricingPage() {
  const [yearly, setYearly] = useState(false)

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header>
        <Nav />
      </header>
      <main id="main-content" tabIndex={-1}>
        <PageHeader
          tag="Pricing"
          title="Simple, transparent pricing"
          description="No hidden fees. No surprises. Cancel anytime."
        >
          <PricingToggle yearly={yearly} setYearly={setYearly} />
        </PageHeader>

        <PricingCards yearly={yearly} />
        <ComparisonTable />
        <FAQSection />
      </main>
      <Footer />
    </>
  )
}
