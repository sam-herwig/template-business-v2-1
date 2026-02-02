'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Moon, 
  Database, 
  Smartphone, 
  Palette, 
  Rocket, 
  Wrench 
} from 'lucide-react';

const features = [
  {
    icon: Moon,
    title: 'Instant Dark Mode',
    description: 'Toggle-ready theming that respects system preferences. No hacky CSS overrides—just clean, scoped variables that work.',
    gradient: 'from-indigo-500 to-purple-500',
    iconBg: 'bg-indigo-500/20',
    iconColor: 'text-indigo-400',
  },
  {
    icon: Database,
    title: 'Sanity CMS Wired',
    description: 'Content schemas, GROQ queries, and preview mode already configured. Hand it off to clients without writing a CMS tutorial.',
    gradient: 'from-accent to-orange-500',
    iconBg: 'bg-accent/20',
    iconColor: 'text-accent',
  },
  {
    icon: Smartphone,
    title: 'Responsive Everything',
    description: 'Every component stress-tested from 320px to ultrawide. Your users don\'t all have MacBooks—we remembered that.',
    gradient: 'from-secondary to-cyan-400',
    iconBg: 'bg-secondary/20',
    iconColor: 'text-secondary',
  },
  {
    icon: Palette,
    title: 'Tailwind + Clean Code',
    description: 'No spaghetti. Consistent naming, modular components, and a codebase you\'ll actually want to maintain.',
    gradient: 'from-pink-500 to-rose-500',
    iconBg: 'bg-pink-500/20',
    iconColor: 'text-pink-400',
  },
  {
    icon: Rocket,
    title: 'Deploy in Minutes',
    description: 'One-click Vercel deploy, environment variables documented, zero config headaches. Push to main and go live.',
    gradient: 'from-primary to-violet-500',
    iconBg: 'bg-primary/20',
    iconColor: 'text-primary',
  },
  {
    icon: Wrench,
    title: 'Built for Customization',
    description: 'Not a black box. Sensible defaults, commented code, and a structure that invites you to make it yours.',
    gradient: 'from-emerald-500 to-teal-500',
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-400',
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div className="relative h-full p-6 bg-background-subtle rounded-xl border border-border transition-all duration-300 hover:border-primary/30 hover:bg-background-muted">
        {/* Gradient glow on hover */}
        <div className={`absolute -inset-px rounded-xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-sm`} />
        
        {/* Icon */}
        <div className={`relative w-12 h-12 ${feature.iconBg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-6 h-6 ${feature.iconColor}`} />
        </div>

        {/* Content */}
        <h3 className="relative text-lg font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
          {feature.title}
        </h3>
        <p className="relative text-foreground-muted leading-relaxed text-sm">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="features" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] translate-x-1/2 pointer-events-none" />

      <div className="container-custom relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-primary-muted text-primary text-sm font-semibold mb-6"
          >
            Why Crafted Kit
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Built Different.{' '}
            <span className="gradient-text">Built Right.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-foreground-muted max-w-2xl mx-auto"
          >
            Every template is built with the same care and attention we put into our own products. 
            No corners cut.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: '17', label: 'Templates' },
            { value: '100+', label: 'Components' },
            { value: '50+', label: 'Pages' },
            { value: '500+', label: 'Developers' },
          ].map((stat, index) => (
            <motion.div 
              key={stat.label} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="text-center p-6 bg-background-muted rounded-xl border border-border"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-foreground-muted text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
