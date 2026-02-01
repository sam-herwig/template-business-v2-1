'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { PageLayout } from '@/components/page-layout'
import { SectionHeader } from '@/components/ui/section-header'
import { GlassCard } from '@/components/ui/glass-card'
import { Target, Rocket, Users, ArrowRight, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'

// ═══════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════
const TIMELINE = [
  { year: '2021', title: 'Founded', description: 'The spark began in a small garage with a big vision.' },
  { year: '2022', title: 'Beta Launch', description: 'First believers joined us, shaping the product.' },
  { year: '2023', title: '50K Users', description: 'Momentum built as creators discovered Lumina.' },
  { year: '2024', title: 'AI Launch', description: 'Introduced AI-powered design tools.' },
]

const VALUES = [
  { 
    icon: <Target className="w-8 h-8" />, 
    title: 'User First', 
    description: 'Every decision starts with "how does this help our users?" We obsess over the details that make your work easier.' 
  },
  { 
    icon: <Rocket className="w-8 h-8" />, 
    title: 'Ship Fast', 
    description: 'We believe in learning from real users, not perfect plans. Move fast, iterate faster.' 
  },
  { 
    icon: <Users className="w-8 h-8" />, 
    title: 'Collaborate', 
    description: 'Great products are built by diverse teams working together. We value every voice.' 
  },
]

const TEAM = [
  { name: 'Alex Chen', role: 'CEO & Co-founder', image: null, linkedin: '#', twitter: '#' },
  { name: 'Sarah Kim', role: 'CTO', image: null, linkedin: '#', twitter: '#' },
  { name: 'Marcus Lee', role: 'Design Lead', image: null, linkedin: '#', twitter: '#' },
  { name: 'Elena Ross', role: 'Head of AI', image: null, linkedin: '#', twitter: '#' },
  { name: 'Jordan Taylor', role: 'Head of Product', image: null, linkedin: '#', twitter: '#' },
  { name: 'Priya Sharma', role: 'VP Engineering', image: null, linkedin: '#', twitter: '#' },
]

const STATS = [
  { value: 50000, label: 'Users', suffix: '+' },
  { value: 15, label: 'Countries', suffix: '+' },
  { value: 99.9, label: 'Uptime', suffix: '%' },
  { value: 4.9, label: 'Rating', suffix: '' },
]

const INVESTORS = ['a16z', 'Sequoia', 'Index Ventures', 'First Round']

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════
function AnimatedCounter({ value, suffix }: { value: number, suffix: string }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest): string => {
    if (value >= 1000) return Math.round(latest).toLocaleString()
    if (value % 1 !== 0) return latest.toFixed(1)
    return String(Math.round(latest))
  })
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2,
      ease: 'easeOut',
    })
    return controls.stop
  }, [count, value])

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-extrabold">
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  )
}

function TeamMember({ member, index }: { member: typeof TEAM[0], index: number }) {
  const initials = member.name.split(' ').map(n => n[0]).join('')
  
  return (
    <motion.div
      className="team-card group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Avatar */}
      <div 
        className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl font-bold"
        style={{
          background: 'linear-gradient(135deg, #818cf8, #c084fc)',
          boxShadow: '0 8px 30px rgba(129, 140, 248, 0.3)',
        }}
      >
        {initials}
      </div>
      
      <h3 className="font-bold text-lg mb-1">{member.name}</h3>
      <p className="text-white/60 text-sm mb-4">{member.role}</p>
      
      {/* Social Links */}
      <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <a 
          href={member.linkedin} 
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label={`${member.name} on LinkedIn`}
        >
          <Linkedin className="w-4 h-4" />
        </a>
        <a 
          href={member.twitter} 
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label={`${member.name} on Twitter`}
        >
          <Twitter className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════
export default function AboutPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="page-hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">OUR STORY</span>
        </motion.div>
        <motion.h1 
          className="text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-tight tracking-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Building the future of
          <br />
          <span className="gradient-text">creative expression</span>
        </motion.h1>
        <motion.p 
          className="text-xl text-white/80 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          We started Lumina with a simple belief: design tools should empower creativity, not limit it.
        </motion.p>
      </section>

      {/* Mission Statement */}
      <section className="relative z-10 py-16 px-4 md:px-16">
        <motion.div 
          className="max-w-4xl mx-auto text-center p-12 md:p-16 rounded-[40px] backdrop-blur-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{
            background: 'linear-gradient(135deg, rgba(129, 140, 248, 0.1) 0%, rgba(192, 132, 252, 0.05) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <p className="text-[clamp(1.5rem,3vw,2rem)] font-medium leading-relaxed text-white/90">
            &ldquo;Our mission is to democratize design by making professional-grade tools accessible to everyone.&rdquo;
          </p>
          <div className="mt-8 text-aurora-indigo text-3xl">◈</div>
        </motion.div>
      </section>

      {/* Timeline */}
      <section className="relative z-10 py-24 px-4 md:px-16 border-t border-white/10">
        <SectionHeader 
          tag="JOURNEY"
          title="Our story so far"
        />
        
        <div className="max-w-4xl mx-auto">
          {/* Desktop Timeline */}
          <div className="hidden md:block relative">
            {/* Line */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-white/10" />
            
            <div className="grid grid-cols-4 gap-8">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  className="relative text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  {/* Node */}
                  <div className="timeline-node mx-auto mb-6" />
                  
                  <div className="text-2xl font-bold gradient-text mb-2">{item.year}</div>
                  <div className="font-semibold mb-1">{item.title}</div>
                  <div className="text-sm text-white/60">{item.description}</div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Mobile Timeline */}
          <div className="md:hidden space-y-8">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                className="flex gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="timeline-node flex-shrink-0 mt-1" />
                <div>
                  <div className="text-xl font-bold gradient-text">{item.year}</div>
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-sm text-white/60">{item.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative z-10 py-24 px-4 md:px-16 border-t border-white/10">
        <SectionHeader 
          tag="VALUES"
          title="What we believe in"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {VALUES.map((value, i) => (
            <GlassCard key={value.title} delay={i * 0.1} className="p-8 text-center">
              <div className="text-aurora-indigo mb-4 flex justify-center">{value.icon}</div>
              <h3 className="text-xl font-bold mb-3">{value.title}</h3>
              <p className="text-white/70">{value.description}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 py-16 px-4 md:px-16">
        <motion.div 
          className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 p-8 md:p-12 rounded-3xl backdrop-blur-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {STATS.map((stat, i) => (
            <motion.div 
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <div className="text-white/60 mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Team */}
      <section className="relative z-10 py-24 px-4 md:px-16 border-t border-white/10">
        <SectionHeader 
          tag="TEAM"
          title="Meet the people behind Lumina"
        />
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {TEAM.map((member, i) => (
            <TeamMember key={member.name} member={member} index={i} />
          ))}
        </div>
      </section>

      {/* Investors */}
      <section className="relative z-10 py-24 px-4 md:px-16 border-t border-white/10">
        <SectionHeader 
          title="Backed by world-class investors"
        />
        
        <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
          {INVESTORS.map((investor, i) => (
            <motion.div
              key={investor}
              className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 font-semibold text-xl text-white/70"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {investor}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Careers CTA */}
      <section className="relative z-10 py-24 px-4 md:px-16">
        <motion.div 
          className="max-w-3xl mx-auto p-12 md:p-16 rounded-[40px] backdrop-blur-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: 'linear-gradient(135deg, rgba(129, 140, 248, 0.15) 0%, rgba(192, 132, 252, 0.1) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          <div className="text-center">
            <span className="text-4xl mb-4 block">💼</span>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold mb-4">
              Join our team
            </h2>
            <p className="text-white/80 mb-8">
              We&apos;re always looking for talented people who share our passion for design and innovation.
            </p>
            <motion.button 
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Open Positions
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </section>
    </PageLayout>
  )
}
