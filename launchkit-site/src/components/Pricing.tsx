'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Sparkles, Crown, Shield } from 'lucide-react';
import Link from 'next/link';

const pricingTiers = [
  {
    name: 'Single Template',
    price: 99,
    description: 'Grab exactly what you need.',
    icon: Sparkles,
    features: [
      'Full source code (no obfuscation, ever)',
      'Sanity CMS integration + schemas',
      'Figma design file',
      '6 months of updates',
      'Commercial license for 1 project',
      'Discord community access',
    ],
    cta: 'Get This Template',
    popular: false,
  },
  {
    name: 'Complete Bundle',
    price: 299,
    originalPrice: 1700,
    description: 'Every template. One price. Forever yours.',
    icon: Crown,
    features: [
      'All 17 templates (current + future additions)',
      'All Figma files',
      'Lifetime updates',
      'Unlimited commercial projects',
      'Priority Discord support',
      'Early access to new releases',
    ],
    cta: 'Get the Full Bundle',
    popular: true,
    badge: 'BEST VALUE',
  },
];

function PricingCard({ tier, index }: { tier: typeof pricingTiers[0] & { originalPrice?: number; badge?: string }; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });
  const Icon = tier.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`relative ${tier.popular ? 'lg:-mt-4 lg:mb-4' : ''}`}
    >
      {/* Popular Badge */}
      {tier.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="px-4 py-1.5 bg-gradient-to-r from-primary to-accent rounded-full text-xs font-bold uppercase tracking-wide text-white shadow-lg shadow-primary/30">
            {tier.badge}
          </div>
        </div>
      )}

      <div className={`relative h-full p-8 rounded-2xl overflow-hidden transition-all duration-300 ${
        tier.popular 
          ? 'bg-gradient-to-b from-primary/10 to-accent/5 border-2 border-primary/50 shadow-glow'
          : 'bg-background-muted border border-border hover:border-border-hover'
      }`}>
        {/* Background glow for popular */}
        {tier.popular && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        )}

        <div className="relative">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              tier.popular 
                ? 'bg-gradient-to-br from-primary to-accent'
                : 'bg-background-subtle border border-border'
            }`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
            </div>
          </div>

          {/* Price */}
          <div className="mb-2">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-foreground">${tier.price}</span>
              {tier.originalPrice && (
                <span className="text-lg text-foreground-subtle line-through">${tier.originalPrice}+</span>
              )}
            </div>
            {tier.originalPrice && (
              <p className="text-sm text-foreground-muted mt-1">if bought separately</p>
            )}
          </div>

          {/* Description */}
          <p className="text-foreground-muted mb-8">{tier.description}</p>

          {/* CTA Button */}
          <Link 
            href="#"
            className={`block w-full py-4 rounded-xl font-semibold text-center transition-all duration-200 mb-8 ${
              tier.popular
                ? 'btn-primary'
                : 'bg-background-subtle border border-border text-foreground hover:bg-background hover:border-border-hover'
            }`}
          >
            {tier.cta} →
          </Link>

          {/* Includes label */}
          <p className="text-sm font-semibold text-foreground mb-4">Includes:</p>

          {/* Features */}
          <ul className="space-y-4">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  tier.popular
                    ? 'bg-gradient-to-br from-primary to-accent'
                    : 'bg-primary/20'
                }`}>
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-foreground-muted text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 section-gradient pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-custom relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-primary-muted text-primary text-sm font-semibold mb-6"
          >
            Pricing
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Simple Pricing.{' '}
            <span className="gradient-text">Serious Value.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-foreground-muted max-w-2xl mx-auto"
          >
            No subscriptions. No hidden fees. Buy once, use forever.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <PricingCard key={tier.name} tier={tier} index={index} />
          ))}
        </div>

        {/* Money-Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <div className="flex items-start gap-4 p-6 bg-background-muted rounded-xl border border-border">
            <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-success" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">14-Day Money-Back Guarantee</h4>
              <p className="text-foreground-muted text-sm leading-relaxed">
                Not what you expected? Email us within 14 days for a full refund. No forms, 
                no guilt trips, no questions. We&apos;d rather you be happy.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Trust Elements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap justify-center gap-8 text-foreground-muted text-sm"
        >
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-success" />
            <span>Secure checkout</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-success" />
            <span>Instant download</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-success" />
            <span>Lifetime access</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
