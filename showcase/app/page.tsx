'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

const templates = [
  {
    id: 'restaurant',
    name: 'Restaurant Starter',
    category: 'Local Business',
    description: 'Perfect for restaurants, cafes, and bars. Menu management, reservations, and gallery.',
    features: ['Menu Categories', 'OpenTable/Resy Integration', 'Photo Gallery', 'Hours & Location'],
    color: 'from-orange-500 to-red-500',
    accent: '#F97316',
    price: 149,
    originalPrice: 249,
    popular: false,
    preview: {
      bg: 'from-amber-900/20 to-orange-900/30',
      accent: 'bg-orange-500',
    },
  },
  {
    id: 'contractor',
    name: 'Contractor Starter',
    category: 'Local Business',
    description: 'Built for contractors, plumbers, and electricians. Showcase your work and build trust.',
    features: ['Before/After Gallery', 'Service Areas', 'Trust Badges', 'Free Quote Form'],
    color: 'from-amber-500 to-orange-500',
    accent: '#F59E0B',
    price: 149,
    originalPrice: 249,
    popular: false,
    preview: {
      bg: 'from-amber-900/20 to-yellow-900/30',
      accent: 'bg-amber-500',
    },
  },
  {
    id: 'salon',
    name: 'Salon Starter',
    category: 'Local Business',
    description: 'Designed for salons, spas, and beauty services. Team profiles and booking integration.',
    features: ['Service Menu', 'Team Profiles', 'Booking Integration', 'Instagram Gallery'],
    color: 'from-pink-500 to-rose-500',
    accent: '#EC4899',
    price: 149,
    originalPrice: 249,
    popular: true,
    preview: {
      bg: 'from-pink-900/20 to-rose-900/30',
      accent: 'bg-pink-500',
    },
  },
  {
    id: 'gym',
    name: 'Gym Starter',
    category: 'Local Business',
    description: 'Ideal for gyms and fitness studios. Class schedules, memberships, and trainer bios.',
    features: ['Class Schedule', 'Membership Tiers', 'Trainer Profiles', 'Trial Signup'],
    color: 'from-emerald-500 to-teal-500',
    accent: '#10B981',
    price: 149,
    originalPrice: 249,
    popular: false,
    preview: {
      bg: 'from-emerald-900/20 to-teal-900/30',
      accent: 'bg-emerald-500',
    },
  },
  {
    id: 'saas',
    name: 'SaaS Starter',
    category: 'Digital Business',
    description: 'Launch your software product. Feature highlights, pricing tables, and social proof.',
    features: ['Feature Grid', 'Pricing Tables', 'Testimonials', 'FAQ Section'],
    color: 'from-violet-500 to-purple-500',
    accent: '#8B5CF6',
    price: 199,
    originalPrice: 349,
    popular: true,
    preview: {
      bg: 'from-violet-900/20 to-purple-900/30',
      accent: 'bg-violet-500',
    },
  },
  {
    id: 'coach',
    name: 'Coach Starter',
    category: 'Digital Business',
    description: 'Personal brand for coaches and consultants. Services, testimonials, and lead capture.',
    features: ['Personal Branding', 'Service Packages', 'Lead Magnets', 'Calendly Integration'],
    color: 'from-cyan-500 to-blue-500',
    accent: '#06B6D4',
    price: 179,
    originalPrice: 299,
    popular: false,
    preview: {
      bg: 'from-cyan-900/20 to-blue-900/30',
      accent: 'bg-cyan-500',
    },
  },
  {
    id: 'agency',
    name: 'Agency Starter',
    category: 'Digital Business',
    description: 'Showcase your agency work. Portfolio grid, case studies, and process sections.',
    features: ['Portfolio Grid', 'Case Studies', 'Team Section', 'Process Timeline'],
    color: 'from-fuchsia-500 to-pink-500',
    accent: '#D946EF',
    price: 199,
    originalPrice: 349,
    popular: false,
    preview: {
      bg: 'from-fuchsia-900/20 to-pink-900/30',
      accent: 'bg-fuchsia-500',
    },
  },
]

const categories = ['All', 'Local Business', 'Digital Business']

const stats = [
  { value: '7', label: 'Premium Templates', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
  { value: '10K+', label: 'Lines of Code', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
  { value: '< 5min', label: 'Deploy Time', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { value: '100', label: 'Lighthouse Score', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
]

const features = [
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'Next.js 14',
    description: 'App Router, Server Components, and all the latest features for blazing performance.',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
    title: 'Tailwind CSS',
    description: 'Fully customizable with semantic color tokens and a complete design system.',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    title: 'Sanity CMS',
    description: 'Edit content visually with live preview. No code changes needed for updates.',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Vercel Ready',
    description: 'One-click deploy with automatic rebuilds on content changes. Zero config.',
    gradient: 'from-gray-400 to-gray-600',
  },
  {
    icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
    title: 'Mobile First',
    description: 'Responsive by default with pixel-perfect layouts on every device size.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
    title: 'Accessible',
    description: 'WCAG compliant, screen reader friendly, and fully keyboard navigable.',
    gradient: 'from-pink-500 to-rose-500',
  },
]

const testimonials = [
  {
    quote: "These templates saved me weeks of development time. The code quality is exceptional.",
    author: "Sarah Chen",
    role: "Freelance Developer",
    avatar: "SC",
  },
  {
    quote: "Finally, templates that actually look modern. My clients are always impressed.",
    author: "Marcus Johnson",
    role: "Agency Owner",
    avatar: "MJ",
  },
  {
    quote: "The Sanity integration is seamless. Non-technical clients can update content easily.",
    author: "Emily Rodriguez",
    role: "Web Designer",
    avatar: "ER",
  },
]

const faqs = [
  {
    question: 'What\'s included in each template?',
    answer: 'Each template includes the complete Next.js application, Sanity CMS schemas, Tailwind configuration, and documentation. You get the full source code with no restrictions.',
  },
  {
    question: 'Do I need coding experience?',
    answer: 'Basic familiarity with React/Next.js is helpful for customization. However, once deployed, all content can be managed through Sanity\'s visual editor — no coding required.',
  },
  {
    question: 'Can I use these for client projects?',
    answer: 'Absolutely! Each purchase includes a license for one project. For agencies building multiple client sites, contact us about volume pricing.',
  },
  {
    question: 'Is support included?',
    answer: 'Yes, you get email support for setup questions. We also include detailed documentation and video tutorials to get you started quickly.',
  },
  {
    question: 'What if I need customization?',
    answer: 'The templates are fully open source — customize anything. If you need professional customization, we offer dev services starting at $500.',
  },
]

// Icon component for cleaner SVG rendering
const Icon = ({ path, className = "w-6 h-6" }: { path: string, className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
)

// Animated background orbs
const FloatingOrb = ({ className, delay = 0 }: { className: string, delay?: number }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl ${className}`}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  />
)

// Template preview mockup component
const TemplateMockup = ({ template }: { template: typeof templates[0] }) => (
  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
    {/* Background gradient */}
    <div className={`absolute inset-0 bg-gradient-to-br ${template.preview.bg}`} />
    
    {/* Browser chrome mockup */}
    <div className="absolute inset-3 rounded-lg border border-white/10 bg-surface/80 backdrop-blur-sm overflow-hidden shadow-2xl">
      {/* Title bar */}
      <div className="h-7 bg-surface-hover/80 border-b border-white/5 flex items-center px-3 gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-3 py-0.5 rounded-md bg-background/50 text-[9px] text-text-muted">
            {template.id}.vercel.app
          </div>
        </div>
      </div>
      
      {/* Page content mockup */}
      <div className="p-3 space-y-2">
        {/* Nav bar */}
        <div className="flex items-center justify-between">
          <div className={`w-6 h-2 rounded ${template.preview.accent}/60`} />
          <div className="flex gap-2">
            <div className="w-8 h-1.5 rounded bg-white/10" />
            <div className="w-8 h-1.5 rounded bg-white/10" />
            <div className="w-8 h-1.5 rounded bg-white/10" />
          </div>
        </div>
        
        {/* Hero section */}
        <div className="pt-4 space-y-2">
          <div className="w-3/4 h-3 rounded bg-white/20" />
          <div className="w-1/2 h-3 rounded bg-white/10" />
          <div className="flex gap-2 pt-2">
            <div className={`w-12 h-4 rounded ${template.preview.accent}/70`} />
            <div className="w-12 h-4 rounded bg-white/10" />
          </div>
        </div>
        
        {/* Feature grid mockup */}
        <div className="grid grid-cols-3 gap-1.5 pt-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="aspect-square rounded bg-white/5 p-1.5">
              <div className={`w-2 h-2 rounded-sm ${template.preview.accent}/40 mb-1`} />
              <div className="w-full h-1 rounded bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
    
    {/* Shine effect on hover */}
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
  </div>
)

export default function ShowcasePage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])
  
  useEffect(() => {
    setIsLoaded(true)
  }, [])
  
  const filteredTemplates = activeCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === activeCategory)

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="mx-4 mt-4">
          <div className="glass rounded-2xl border border-white/10">
            <div className="container-tight flex items-center justify-between h-14">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary via-accent-cyan to-accent-emerald p-[1px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-full h-full rounded-xl bg-surface flex items-center justify-center">
                    <span className="text-lg font-bold gradient-text">T</span>
                  </div>
                </motion.div>
                <span className="font-bold text-lg hidden sm:block">Templates</span>
              </div>
              <div className="hidden md:flex items-center gap-8">
                {['Templates', 'Features', 'Pricing', 'FAQ'].map((item) => (
                  <a 
                    key={item}
                    href={`#${item.toLowerCase()}`} 
                    className="text-text-secondary hover:text-white transition-colors duration-200 text-sm font-medium relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent-cyan group-hover:w-full transition-all duration-300" />
                  </a>
                ))}
              </div>
              <motion.a 
                href="#templates" 
                className="btn-primary text-sm px-5 py-2.5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Browse Templates
              </motion.a>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-32 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <FloatingOrb className="w-[600px] h-[600px] bg-primary/20 top-0 left-1/4" delay={0} />
          <FloatingOrb className="w-[400px] h-[400px] bg-accent-cyan/15 top-1/4 right-1/4" delay={2} />
          <FloatingOrb className="w-[300px] h-[300px] bg-accent-emerald/10 bottom-1/4 left-1/3" delay={4} />
          
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>
        
        <motion.div 
          className="container-tight relative"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Launch badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-emerald opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-emerald" />
              </span>
              <span className="badge">
                🎉 Launch Special — 40% Off All Templates
              </span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              Website templates that{' '}
              <span className="relative">
                <span className="gradient-text">actually convert</span>
                <motion.svg 
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <motion.path
                    d="M2 8 Q 75 2, 150 8 T 298 8"
                    fill="none"
                    stroke="url(#underline-gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="underline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="50%" stopColor="#06B6D4" />
                      <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>
            </h1>
            
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl text-text-secondary max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Production-ready Next.js templates for local businesses and digital products. 
              Deploy in minutes, not months.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.a 
                href="#templates" 
                className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center gap-2 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Browse Templates
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.a>
              <motion.a 
                href="#features" 
                className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                See Features
              </motion.a>
            </motion.div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent-cyan/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative p-4">
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-primary">
                        <Icon path={stat.icon} className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-text-muted text-sm">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Social Proof */}
      <section className="py-12 border-y border-surface-border bg-surface/20">
        <div className="container-tight">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60">
            {['Next.js', 'Tailwind CSS', 'Sanity', 'Vercel', 'TypeScript'].map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-text-muted font-semibold tracking-wider text-sm"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section id="templates" className="section-padding">
        <div className="container-tight">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="badge mb-4">Templates</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Choose Your Template</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Each template is designed for a specific industry with relevant features and integrations.
            </p>
          </motion.div>
          
          {/* Category Filter */}
          <motion.div 
            className="flex justify-center gap-2 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex p-1.5 rounded-2xl bg-surface border border-surface-border">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'text-white'
                      : 'text-text-secondary hover:text-white'
                  }`}
                >
                  {activeCategory === category && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 bg-primary rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              ))}
            </div>
          </motion.div>
          
          {/* Templates Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredTemplates.map((template, i) => (
                <motion.div
                  key={template.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: 0.4,
                    delay: i * 0.05,
                    layout: { type: "spring", bounce: 0.2 }
                  }}
                  className="card card-hover group relative"
                >
                  {/* Popular badge */}
                  {template.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <motion.div 
                        className="badge-success text-[10px] uppercase tracking-wider font-bold px-2.5 py-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.3 }}
                      >
                        ⭐ Popular
                      </motion.div>
                    </div>
                  )}
                  
                  {/* Preview */}
                  <div className="p-4 pb-0">
                    <TemplateMockup template={template} />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg mb-0.5">{template.name}</h3>
                        <span className="text-text-muted text-xs font-medium uppercase tracking-wider">{template.category}</span>
                      </div>
                    </div>
                    
                    <p className="text-text-secondary text-sm mb-4 line-clamp-2">{template.description}</p>
                    
                    <ul className="space-y-2 mb-6">
                      {template.features.slice(0, 3).map(feature => (
                        <li key={feature} className="flex items-center gap-2.5 text-sm text-text-secondary">
                          <span 
                            className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
                            style={{ backgroundColor: `${template.accent}20`, color: template.accent }}
                          >
                            ✓
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-surface-border">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold">${template.price}</span>
                        <span className="text-text-muted text-sm line-through">${template.originalPrice}</span>
                      </div>
                      <motion.button 
                        className="btn-primary text-sm py-2.5 px-5"
                        style={{ backgroundColor: template.accent }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Get Template
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding bg-surface/30 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="absolute top-1/2 right-0 w-1/2 h-px bg-gradient-to-l from-transparent via-accent-cyan/30 to-transparent" />
        </div>
        
        <div className="container-tight relative">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="badge mb-4">Features</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Built With Modern Tech</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Every template uses the same production-grade stack used by top companies.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="card p-6 group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-[1px] mb-5`}>
                  <div className="w-full h-full rounded-xl bg-surface flex items-center justify-center text-white">
                    <Icon path={feature.icon} className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-tight">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="badge mb-4">Testimonials</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Loved by Developers</h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="card p-6 relative"
              >
                <div className="text-4xl text-primary/20 font-serif absolute top-4 left-6">"</div>
                <p className="text-text-secondary mb-6 pt-4 relative z-10">{testimonial.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent-cyan flex items-center justify-center text-sm font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.author}</div>
                    <div className="text-text-muted text-xs">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section id="pricing" className="section-padding">
        <div className="container-tight">
          <motion.div 
            className="relative rounded-3xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 p-[1px] rounded-3xl bg-gradient-to-r from-primary via-accent-cyan to-accent-emerald">
              <div className="absolute inset-[1px] rounded-3xl bg-surface" />
            </div>
            
            {/* Content */}
            <div className="relative p-8 md:p-16 text-center">
              {/* Decorative elements */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <FloatingOrb className="w-[400px] h-[400px] bg-primary/10 -top-1/2 left-1/4" delay={0} />
              <FloatingOrb className="w-[300px] h-[300px] bg-accent-cyan/10 -bottom-1/2 right-1/4" delay={3} />
              
              <div className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="inline-flex items-center gap-2 badge-warning mb-6"
                >
                  🔥 Best Value
                </motion.div>
                
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  All Templates Bundle
                </h2>
                <p className="text-text-secondary text-lg max-w-xl mx-auto mb-10">
                  Get every template — current and future. Perfect for agencies and freelancers building multiple sites.
                </p>
                
                <div className="flex items-center justify-center gap-4 mb-8">
                  <span className="text-text-muted line-through text-2xl">$1,099</span>
                  <div className="relative">
                    <span className="text-6xl md:text-7xl font-bold gradient-text">$499</span>
                    <motion.div
                      className="absolute -top-2 -right-12 badge-success text-xs"
                      initial={{ rotate: -12, scale: 0 }}
                      whileInView={{ rotate: -12, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", delay: 0.4 }}
                    >
                      Save 55%
                    </motion.div>
                  </div>
                </div>
                
                <motion.button 
                  className="btn-primary text-lg px-12 py-5 mb-6"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get All Templates
                </motion.button>
                
                <p className="text-text-muted text-sm">
                  One-time purchase. Includes all 7 templates + future releases.
                </p>
                
                {/* Feature list */}
                <div className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-surface-border">
                  {['Lifetime access', 'Free updates', 'Email support', 'Source code'].map((item, i) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-text-secondary">
                      <svg className="w-4 h-4 text-accent-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-padding">
        <div className="container-tight max-w-3xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="badge mb-4">FAQ</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          </motion.div>
          
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full p-5 flex items-center justify-between text-left hover:bg-surface-hover transition-colors group"
                >
                  <span className="font-medium pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: expandedFaq === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-8 h-8 rounded-full bg-surface-hover group-hover:bg-primary/10 flex items-center justify-center flex-shrink-0"
                  >
                    <span className="text-xl text-text-muted group-hover:text-primary">+</span>
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {expandedFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-text-secondary leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
        <div className="container-tight relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to launch?</h2>
            <p className="text-text-secondary text-lg mb-8">Join hundreds of developers building with our templates.</p>
            <motion.a 
              href="#templates" 
              className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-surface-border py-12">
        <div className="container-tight">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary via-accent-cyan to-accent-emerald p-[1px]">
                <div className="w-full h-full rounded-xl bg-surface flex items-center justify-center">
                  <span className="text-sm font-bold gradient-text">T</span>
                </div>
              </div>
              <span className="font-semibold">Templates</span>
            </div>
            <p className="text-text-muted text-sm">
              © 2025 Sam Herwig. Built with Next.js + Sanity.
            </p>
            <div className="flex gap-6">
              {['Twitter', 'GitHub', 'Discord'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="text-text-muted hover:text-white transition-colors text-sm"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
