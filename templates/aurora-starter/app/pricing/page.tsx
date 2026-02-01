'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PageLayout } from '@/components/page-layout'
import { SectionHeader } from '@/components/ui/section-header'
import { Accordion, AccordionItem } from '@/components/ui/accordion'
import { GlassCard } from '@/components/ui/glass-card'
import { Check, Shield, CreditCard, Globe, ArrowRight } from 'lucide-react'

// ═══════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════
const PLANS = [
  {
    name: 'Starter',
    price: { monthly: 0, annual: 0 },
    description: 'Free forever',
    features: [
      '3 projects',
      'Basic AI tools',
      'Community support',
      '1GB storage',
      'Standard export'
    ],
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Professional',
    price: { monthly: 29, annual: 23 },
    description: 'per month',
    features: [
      'Unlimited projects',
      'Full AI suite',
      'Priority support',
      '100GB storage',
      'Team collaboration',
      'Version history',
      'Advanced export',
      'Custom fonts'
    ],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    price: { monthly: null, annual: null },
    description: 'Custom pricing',
    features: [
      'Everything in Pro',
      'SSO & SAML',
      'Dedicated support',
      'Unlimited storage',
      'Custom SLA',
      'On-premise option',
      'API access',
      'Audit logs'
    ],
    cta: 'Contact Sales',
    popular: false
  }
]

const FEATURE_BREAKDOWN = [
  {
    category: 'Design Tools',
    features: [
      { name: 'Canvas size', starter: 'Limited', pro: 'Unlimited', enterprise: 'Unlimited' },
      { name: 'Components', starter: 'Basic', pro: 'Full library', enterprise: 'Full + Custom' },
      { name: 'AI generations', starter: '10/month', pro: 'Unlimited', enterprise: 'Unlimited' },
    ]
  },
  {
    category: 'Collaboration',
    features: [
      { name: 'Team members', starter: '1', pro: 'Up to 10', enterprise: 'Unlimited' },
      { name: 'Real-time editing', starter: false, pro: true, enterprise: true },
      { name: 'Comments', starter: true, pro: true, enterprise: true },
    ]
  },
  {
    category: 'Export & Integrations',
    features: [
      { name: 'Export formats', starter: 'PNG, JPG', pro: 'All formats', enterprise: 'All + Custom' },
      { name: 'API access', starter: false, pro: true, enterprise: true },
      { name: 'Webhooks', starter: false, pro: true, enterprise: true },
    ]
  },
  {
    category: 'Support & Security',
    features: [
      { name: 'Support', starter: 'Community', pro: 'Priority', enterprise: 'Dedicated' },
      { name: 'SSO/SAML', starter: false, pro: false, enterprise: true },
      { name: 'SLA', starter: false, pro: '99.9%', enterprise: 'Custom' },
    ]
  }
]

const FAQS = [
  {
    question: 'Can I switch plans anytime?',
    answer: 'Yes! You can upgrade your plan instantly and the new features will be available immediately. If you downgrade, the change will take effect at the end of your current billing cycle.'
  },
  {
    question: 'What happens when my trial ends?',
    answer: 'After your 14-day free trial, you\'ll be automatically moved to the free Starter plan. You can upgrade to a paid plan at any time to keep your Professional features.'
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied, contact our support team for a full refund.'
  },
  {
    question: 'Is there a student discount?',
    answer: 'Yes! Students and educators get 50% off Professional plans. Verify your academic status to unlock the discount.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for Enterprise plans.'
  }
]

const TRUST_BADGES = [
  { icon: <Shield className="w-5 h-5" />, label: 'SOC 2 Certified' },
  { icon: <CreditCard className="w-5 h-5" />, label: 'Secure Payments' },
  { icon: <Globe className="w-5 h-5" />, label: 'GDPR Compliant' },
]

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════
function PricingCard({ plan, isAnnual, index }: { plan: typeof PLANS[0], isAnnual: boolean, index: number }) {
  const price = isAnnual ? plan.price.annual : plan.price.monthly
  
  return (
    <motion.div
      className={`relative rounded-3xl p-8 flex flex-col h-full ${
        plan.popular 
          ? 'pricing-card-featured' 
          : 'bg-white/5 border border-white/10'
      }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-aurora-indigo text-white">
            Most Popular
          </span>
        </div>
      )}
      
      <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
      
      <div className="mb-6">
        {price !== null ? (
          <>
            <span className="text-5xl font-extrabold">${price}</span>
            <span className="text-white/60 ml-2">{plan.description}</span>
          </>
        ) : (
          <span className="text-3xl font-bold">{plan.description}</span>
        )}
      </div>
      
      <ul className="space-y-3 mb-8 flex-grow">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-white/80">
            <Check className="w-5 h-5 text-aurora-indigo flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      
      <motion.button 
        className={plan.popular ? 'btn-primary w-full justify-center' : 'btn-secondary w-full justify-center'}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {plan.cta}
      </motion.button>
    </motion.div>
  )
}

function FeatureBreakdownTable() {
  const renderValue = (val: boolean | string) => {
    if (val === true) return <span className="text-green-400">✓</span>
    if (val === false) return <span className="text-white/30">—</span>
    return <span className="text-white/80">{val}</span>
  }

  return (
    <Accordion className="max-w-4xl mx-auto">
      {FEATURE_BREAKDOWN.map((section, i) => (
        <AccordionItem key={section.category} title={section.category} defaultOpen={i === 0}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="text-sm text-white/50">
                  <th className="text-left py-2 font-medium">Feature</th>
                  <th className="text-center py-2 font-medium">Starter</th>
                  <th className="text-center py-2 font-medium">Pro</th>
                  <th className="text-center py-2 font-medium">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {section.features.map((feature) => (
                  <tr key={feature.name} className="border-t border-white/5">
                    <td className="py-3 text-sm">{feature.name}</td>
                    <td className="text-center py-3 text-sm">{renderValue(feature.starter)}</td>
                    <td className="text-center py-3 text-sm">{renderValue(feature.pro)}</td>
                    <td className="text-center py-3 text-sm">{renderValue(feature.enterprise)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

// ═══════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════
export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true)

  return (
    <PageLayout>
      {/* Hero */}
      <section className="page-hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">PRICING</span>
        </motion.div>
        <motion.h1 
          className="text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-tight tracking-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Simple, transparent
          <br />
          <span className="gradient-text">pricing</span>
        </motion.h1>
        <motion.p 
          className="text-xl text-white/80 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          No hidden fees. Cancel anytime.
        </motion.p>

        {/* Billing Toggle */}
        <motion.div 
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className={`font-medium transition-colors ${!isAnnual ? 'text-white' : 'text-white/50'}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-16 h-8 rounded-full bg-white/10 border border-white/20 transition-colors hover:bg-white/15"
            aria-label={`Switch to ${isAnnual ? 'monthly' : 'annual'} billing`}
          >
            <motion.div
              className="absolute top-1 w-6 h-6 rounded-full bg-aurora-indigo"
              animate={{ left: isAnnual ? '34px' : '4px' }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={`font-medium transition-colors ${isAnnual ? 'text-white' : 'text-white/50'}`}>
            Annual
            <span className="ml-2 text-xs px-2 py-1 rounded-full bg-aurora-indigo/20 text-aurora-indigo">
              Save 20%
            </span>
          </span>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="relative z-10 py-16 px-4 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PLANS.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} isAnnual={isAnnual} index={i} />
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="relative z-10 py-8 px-4 md:px-16">
        <div className="flex flex-wrap justify-center gap-6">
          {TRUST_BADGES.map((badge) => (
            <motion.div
              key={badge.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              {badge.icon}
              {badge.label}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature Breakdown */}
      <section className="relative z-10 py-24 px-4 md:px-16 border-t border-white/10">
        <SectionHeader 
          title="Detailed feature comparison"
          description="Everything included in each plan, broken down by category."
        />
        <FeatureBreakdownTable />
      </section>

      {/* FAQ */}
      <section className="relative z-10 py-24 px-4 md:px-16 border-t border-white/10">
        <SectionHeader 
          tag="FAQ"
          title="Frequently asked questions"
        />
        <div className="max-w-2xl mx-auto">
          <Accordion>
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} title={faq.question}>
                {faq.answer}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24 px-4 md:px-16">
        <motion.div 
          className="max-w-3xl mx-auto text-center p-12 md:p-16 rounded-[40px] backdrop-blur-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: 'linear-gradient(135deg, rgba(129, 140, 248, 0.15) 0%, rgba(192, 132, 252, 0.1) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold mb-4">
            Still have questions?
          </h2>
          <p className="text-white/80 mb-8">Our team is here to help you find the perfect plan.</p>
          <motion.button 
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Sales
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </section>
    </PageLayout>
  )
}
