'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageLayout } from '@/components/page-layout'
import { SectionHeader } from '@/components/ui/section-header'
import { GlassCard } from '@/components/ui/glass-card'
import { 
  Zap, Palette, RefreshCw, Lock, Smartphone, Rocket, 
  Layers, Wand2, Share2, Download, CheckCircle, ArrowRight 
} from 'lucide-react'

// ═══════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════
const CATEGORIES = ['All', 'Design', 'Collaboration', 'AI', 'Export']

const FEATURES = [
  { 
    category: 'Design',
    icon: <Zap className="w-8 h-8" />, 
    color: 'text-aurora-yellow',
    title: 'Lightning Fast', 
    description: 'Built for speed with instant previews and zero-lag editing experience.',
    bullets: ['Real-time rendering at 60fps', 'Instant undo/redo history', 'Smart caching for large files']
  },
  { 
    category: 'AI',
    icon: <Palette className="w-8 h-8" />, 
    color: 'text-aurora-pink',
    title: 'AI Design Tools', 
    description: 'Generate layouts, suggest colors, and create assets with AI assistance.',
    bullets: ['Auto-generate color palettes', 'Smart layout suggestions', 'AI-powered image editing']
  },
  { 
    category: 'Collaboration',
    icon: <RefreshCw className="w-8 h-8" />, 
    color: 'text-aurora-cyan',
    title: 'Real-time Sync', 
    description: 'Collaborate with your team in real-time with instant updates.',
    bullets: ['Live cursor tracking', 'Instant comment threads', 'Version branching']
  },
  { 
    category: 'Design',
    icon: <Lock className="w-8 h-8" />, 
    color: 'text-aurora-indigo',
    title: 'Enterprise Security', 
    description: 'Bank-level encryption and SOC 2 compliance for your data.',
    bullets: ['End-to-end encryption', 'SOC 2 Type II certified', 'GDPR compliant']
  },
  { 
    category: 'Export',
    icon: <Smartphone className="w-8 h-8" />, 
    color: 'text-aurora-pink',
    title: 'Responsive Export', 
    description: 'Export pixel-perfect designs for any device automatically.',
    bullets: ['Multi-resolution export', 'Responsive breakpoints', 'Asset optimization']
  },
  { 
    category: 'Export',
    icon: <Rocket className="w-8 h-8" />, 
    color: 'text-aurora-cyan',
    title: 'One-Click Deploy', 
    description: 'Push your designs to production with a single click.',
    bullets: ['Vercel integration', 'GitHub sync', 'Custom domain support']
  },
  { 
    category: 'Design',
    icon: <Layers className="w-8 h-8" />, 
    color: 'text-aurora-violet',
    title: 'Component System', 
    description: 'Build and reuse components across all your projects.',
    bullets: ['Nested components', 'Variant support', 'Auto-documentation']
  },
  { 
    category: 'AI',
    icon: <Wand2 className="w-8 h-8" />, 
    color: 'text-aurora-yellow',
    title: 'Magic Resize', 
    description: 'Instantly adapt designs to any format with smart resizing.',
    bullets: ['Content-aware scaling', 'Batch resize', 'Social media presets']
  },
  { 
    category: 'Collaboration',
    icon: <Share2 className="w-8 h-8" />, 
    color: 'text-aurora-fuchsia',
    title: 'Team Workspaces', 
    description: 'Organize projects and manage team permissions easily.',
    bullets: ['Role-based access', 'Shared libraries', 'Activity tracking']
  },
]

const COMPARISON = [
  { feature: 'AI-Powered Tools', lumina: true, figma: 'Limited', sketch: false },
  { feature: 'Real-time Collaboration', lumina: true, figma: true, sketch: 'Limited' },
  { feature: '60fps Performance', lumina: true, figma: '30fps', sketch: 'Varies' },
  { feature: 'One-Click Deploy', lumina: true, figma: false, sketch: false },
  { feature: 'Version Control', lumina: true, figma: true, sketch: 'Plugin' },
  { feature: 'Component Variants', lumina: true, figma: true, sketch: true },
]

const INTEGRATIONS = [
  'Slack', 'Notion', 'GitHub', 'Jira', 'Linear', 'Vercel', 'Figma', 'Sketch'
]

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════
function FeatureCard({ feature, index }: { feature: typeof FEATURES[0], index: number }) {
  return (
    <GlassCard delay={index * 0.05} className="p-8">
      <div className={`${feature.color} mb-4`}>{feature.icon}</div>
      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
      <p className="text-white/80 mb-4">{feature.description}</p>
      <ul className="space-y-2">
        {feature.bullets.map((bullet, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-white/70">
            <CheckCircle className="w-4 h-4 text-aurora-indigo flex-shrink-0" />
            {bullet}
          </li>
        ))}
      </ul>
    </GlassCard>
  )
}

function ComparisonTable() {
  const renderValue = (val: boolean | string) => {
    if (val === true) return <span className="text-green-400">✓</span>
    if (val === false) return <span className="text-white/40">✗</span>
    return <span className="text-white/60">{val}</span>
  }

  return (
    <motion.div 
      className="overflow-x-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="border-b border-white/20">
            <th className="text-left py-4 px-4 font-semibold">Feature</th>
            <th className="text-center py-4 px-4 font-semibold gradient-text">Lumina</th>
            <th className="text-center py-4 px-4 font-semibold text-white/60">Figma</th>
            <th className="text-center py-4 px-4 font-semibold text-white/60">Sketch</th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON.map((row, i) => (
            <motion.tr 
              key={row.feature}
              className="border-b border-white/10 hover:bg-white/5 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <td className="py-4 px-4">{row.feature}</td>
              <td className="text-center py-4 px-4">{renderValue(row.lumina)}</td>
              <td className="text-center py-4 px-4">{renderValue(row.figma)}</td>
              <td className="text-center py-4 px-4">{renderValue(row.sketch)}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════
export default function FeaturesPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  
  const filteredFeatures = activeCategory === 'All' 
    ? FEATURES 
    : FEATURES.filter(f => f.category === activeCategory)

  return (
    <PageLayout>
      {/* Hero */}
      <section className="page-hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">FEATURES</span>
        </motion.div>
        <motion.h1 
          className="text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-tight tracking-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Powerful tools for
          <br />
          <span className="gradient-text">modern designers</span>
        </motion.h1>
        <motion.p 
          className="text-xl text-white/80 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Everything you need to bring your creative vision to life, powered by cutting-edge AI.
        </motion.p>
      </section>

      {/* Category Tabs */}
      <section className="relative z-10 px-4 md:px-16 pb-8">
        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                activeCategory === cat 
                  ? 'bg-aurora-indigo text-white' 
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-16 px-4 md:px-16">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredFeatures.map((feature, i) => (
              <FeatureCard key={feature.title} feature={feature} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Comparison Section */}
      <section className="relative z-10 py-24 px-4 md:px-16">
        <div className="max-w-4xl mx-auto">
          <SectionHeader 
            title="Why Lumina?"
            description="See how we stack up against the competition."
          />
          <GlassCard hover={false} className="p-6 md:p-8">
            <ComparisonTable />
          </GlassCard>
        </div>
      </section>

      {/* Integrations */}
      <section className="relative z-10 py-24 px-4 md:px-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            tag="INTEGRATIONS"
            title="Works with your stack"
            description="Connect Lumina with the tools you already use."
          />
          <div className="flex flex-wrap justify-center gap-4">
            {INTEGRATIONS.map((integration, i) => (
              <motion.div
                key={integration}
                className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 font-medium hover:bg-white/10 hover:border-aurora-indigo/50 transition-all cursor-default"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
              >
                {integration}
              </motion.div>
            ))}
          </div>
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
            Ready to experience the future?
          </h2>
          <p className="text-white/80 mb-8">Start your free trial today. No credit card required.</p>
          <motion.button 
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </section>
    </PageLayout>
  )
}
