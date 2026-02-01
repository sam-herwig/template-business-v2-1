'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { Check, Zap, Shield, Globe, Database, GitBranch, BarChart, Terminal, Layers, Clock, Lock, Cpu } from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import CTA from '@/components/CTA'

const featureShowcases = [
  {
    tag: 'Deployment',
    title: 'Push to deploy',
    description: 'Connect your Git repository and every push automatically deploys to production. No manual steps, no waiting.',
    benefits: ['Automatic preview deployments', 'Instant rollbacks', 'Branch-based environments'],
    visual: 'deploy',
  },
  {
    tag: 'Performance',
    title: 'Edge-first architecture',
    description: 'Your code runs at the edge, closer to your users. Sub-50ms response times, globally.',
    benefits: ['100+ edge locations', 'Automatic scaling', 'Zero cold starts'],
    visual: 'edge',
  },
  {
    tag: 'Collaboration',
    title: 'Built for teams',
    description: 'Review deployments together, share preview links, and collaborate in real-time with your entire team.',
    benefits: ['Preview comments', 'Team workspaces', 'Role-based access'],
    visual: 'team',
  },
  {
    tag: 'Analytics',
    title: 'Real-time insights',
    description: 'Understand your traffic, performance, and user behavior with built-in analytics. No setup required.',
    benefits: ['Web vitals tracking', 'Real-time visitors', 'Error monitoring'],
    visual: 'analytics',
  },
]

const capabilities = [
  { icon: Zap, title: 'Edge Functions', desc: 'Execute code at the edge for ultra-low latency responses.' },
  { icon: Shield, title: 'DDoS Protection', desc: 'Enterprise-grade security and protection out of the box.' },
  { icon: Globe, title: 'Global CDN', desc: 'Content delivered from 100+ edge locations worldwide.' },
  { icon: Database, title: 'Serverless Storage', desc: 'Scalable databases with zero management overhead.' },
  { icon: GitBranch, title: 'Git Integration', desc: 'Works seamlessly with GitHub, GitLab, and Bitbucket.' },
  { icon: BarChart, title: 'Analytics', desc: 'Real-time insights into your traffic and performance.' },
  { icon: Terminal, title: 'CLI Tools', desc: 'Powerful command-line tools for advanced workflows.' },
  { icon: Layers, title: 'Framework Support', desc: 'First-class support for Next.js, Remix, Astro, and more.' },
  { icon: Clock, title: 'Cron Jobs', desc: 'Schedule functions to run on any interval you need.' },
  { icon: Lock, title: 'Environment Variables', desc: 'Secure secrets management with encryption at rest.' },
  { icon: Cpu, title: 'Serverless Functions', desc: 'Auto-scaling functions that handle any load.' },
  { icon: Shield, title: 'SSL Certificates', desc: 'Automatic HTTPS with free SSL certificates.' },
]

function FeatureVisual({ type }: { type: string }) {
  if (type === 'deploy') {
    return (
      <div className="bg-[#171717] rounded-xl p-6 font-mono text-sm">
        <div className="flex items-center gap-2 mb-4 text-gray-500">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <code className="text-gray-300">
          <span className="text-blue-400">$</span> git push origin main<br />
          <span className="text-gray-500">Deploying...</span><br />
          <span className="text-green-400">✓</span> Build completed in 12s<br />
          <span className="text-green-400">✓</span> Deployed to production<br />
          <span className="text-gray-500">→</span> <span className="text-blue-400">https://acme.vercel.app</span>
        </code>
      </div>
    )
  }
  
  if (type === 'edge') {
    return (
      <div className="relative h-64 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border-2 border-dashed border-blue-500/30 animate-spin" style={{ animationDuration: '20s' }} />
          <div className="absolute w-48 h-48 rounded-full border-2 border-dashed border-purple-500/20 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
        </div>
        <div className="relative z-10 flex flex-wrap gap-3 justify-center max-w-[200px]">
          {['US', 'EU', 'APAC', 'SA'].map((region) => (
            <span key={region} className="px-3 py-1.5 rounded-full bg-white dark:bg-minimal-dark-card border border-minimal-border dark:border-minimal-dark-border text-xs font-semibold">
              {region}
            </span>
          ))}
        </div>
      </div>
    )
  }
  
  if (type === 'team') {
    return (
      <div className="bg-white dark:bg-minimal-dark-card rounded-xl border border-minimal-border dark:border-minimal-dark-border p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 border-2 border-white dark:border-minimal-dark-card" style={{ opacity: 1 - i * 0.2 }} />
            ))}
          </div>
          <span className="text-sm text-minimal-muted dark:text-minimal-dark-muted">3 reviewing</span>
        </div>
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-minimal-bg dark:bg-minimal-dark-bg border border-minimal-border dark:border-minimal-dark-border">
            <p className="text-sm">&ldquo;Looks good! Ship it 🚀&rdquo;</p>
            <span className="text-xs text-minimal-muted dark:text-minimal-dark-muted">Sarah • 2m ago</span>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-white dark:bg-minimal-dark-card rounded-xl border border-minimal-border dark:border-minimal-dark-border p-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold">Live Visitors</span>
        <span className="text-2xl font-bold gradient-text">1,247</span>
      </div>
      <div className="h-24 flex items-end gap-1">
        {[40, 60, 45, 80, 65, 90, 75, 85, 70, 95].map((h, i) => (
          <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: 'linear-gradient(to top, #0070f3, #7928ca)' }} />
        ))}
      </div>
    </div>
  )
}

function FeatureShowcase({ feature, reversed }: { feature: typeof featureShowcases[0]; reversed: boolean }) {
  const ref = useRef<HTMLElement>(null)
  
  useGSAP(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.showcase-visual', {
        x: reversed ? 50 : -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
        },
      })

      gsap.from('.showcase-content', {
        x: reversed ? -50 : 50,
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
  }, [reversed])

  return (
    <section ref={ref} className="py-16 md:py-24 px-4 md:px-16 max-w-6xl mx-auto">
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${reversed ? 'lg:flex-row-reverse' : ''}`}>
        <div className={`showcase-visual ${reversed ? 'lg:order-2' : ''}`}>
          <div className="relative rounded-2xl overflow-hidden border border-minimal-border dark:border-minimal-dark-border bg-white dark:bg-minimal-dark-card p-6">
            <FeatureVisual type={feature.visual} />
          </div>
        </div>

        <div className={`showcase-content ${reversed ? 'lg:order-1' : ''}`}>
          <span className="feature-tag mb-4">{feature.tag}</span>
          <h2 className="font-display text-3xl font-bold tracking-tight mb-4">
            {feature.title}
          </h2>
          <p className="text-minimal-muted dark:text-minimal-dark-muted text-lg mb-6 leading-relaxed">
            {feature.description}
          </p>
          <ul className="space-y-3">
            {feature.benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function CapabilitiesGrid() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.capability-card', {
        y: 40,
        opacity: 0,
        stagger: 0.05,
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
    <section ref={ref} className="py-16 md:py-24 px-4 md:px-16 bg-white dark:bg-minimal-dark-card border-y border-minimal-border dark:border-minimal-dark-border">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center font-display text-3xl font-bold mb-4">
          And so much more
        </h2>
        <p className="text-center text-minimal-muted dark:text-minimal-dark-muted mb-12 max-w-2xl mx-auto">
          Everything you need to build, deploy, and scale modern web applications.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap) => (
            <div key={cap.title} className="capability-card p-6 rounded-2xl border border-minimal-border dark:border-minimal-dark-border bg-minimal-bg dark:bg-minimal-dark-bg hover:border-[#0070f3] transition-colors">
              <cap.icon className="w-8 h-8 mb-4 text-[#0070f3]" />
              <h3 className="font-bold text-lg mb-2">{cap.title}</h3>
              <p className="text-sm text-minimal-muted dark:text-minimal-dark-muted">{cap.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function FeaturesPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header>
        <Nav />
      </header>
      <main id="main-content" tabIndex={-1}>
        <PageHeader
          tag="Features"
          title="Built for modern developers"
          description="Everything you need to ship faster—from instant deploys to real-time collaboration."
        />

        {featureShowcases.map((feature, i) => (
          <FeatureShowcase key={feature.title} feature={feature} reversed={i % 2 === 1} />
        ))}

        <CapabilitiesGrid />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
