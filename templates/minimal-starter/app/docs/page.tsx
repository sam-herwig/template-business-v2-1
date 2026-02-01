'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { Search, Rocket, BookOpen, Code, ArrowRight, ExternalLink } from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'

const quickStartCards = [
  {
    icon: Rocket,
    title: 'Quick Start',
    description: 'Get up and running in under 5 minutes with our step-by-step guide.',
    href: '/docs/quickstart',
  },
  {
    icon: BookOpen,
    title: 'Guides',
    description: 'Learn best practices and advanced patterns for building with Acme.',
    href: '/docs/guides',
  },
  {
    icon: Code,
    title: 'API Reference',
    description: 'Complete API documentation with examples and type definitions.',
    href: '/docs/api',
  },
]

const topicCategories = [
  {
    title: 'Getting Started',
    links: [
      { title: 'Installation', href: '/docs/installation' },
      { title: 'Project Setup', href: '/docs/project-setup' },
      { title: 'First Deploy', href: '/docs/first-deploy' },
      { title: 'Environment Variables', href: '/docs/env-vars' },
    ],
  },
  {
    title: 'Frameworks',
    links: [
      { title: 'Next.js', href: '/docs/nextjs' },
      { title: 'Remix', href: '/docs/remix' },
      { title: 'Astro', href: '/docs/astro' },
      { title: 'SvelteKit', href: '/docs/sveltekit' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { title: 'Edge Functions', href: '/docs/edge-functions' },
      { title: 'Serverless Functions', href: '/docs/serverless' },
      { title: 'Domains', href: '/docs/domains' },
      { title: 'Analytics', href: '/docs/analytics' },
    ],
  },
  {
    title: 'Integrations',
    links: [
      { title: 'GitHub', href: '/docs/github' },
      { title: 'GitLab', href: '/docs/gitlab' },
      { title: 'Databases', href: '/docs/databases' },
      { title: 'CMS', href: '/docs/cms' },
    ],
  },
  {
    title: 'CLI',
    links: [
      { title: 'Installation', href: '/docs/cli/install' },
      { title: 'Commands', href: '/docs/cli/commands' },
      { title: 'Configuration', href: '/docs/cli/config' },
      { title: 'Debugging', href: '/docs/cli/debug' },
    ],
  },
  {
    title: 'Security',
    links: [
      { title: 'Authentication', href: '/docs/auth' },
      { title: 'Secrets', href: '/docs/secrets' },
      { title: 'Firewalls', href: '/docs/firewalls' },
      { title: 'Compliance', href: '/docs/compliance' },
    ],
  },
]

const frameworks = [
  { name: 'Next.js', icon: '▲' },
  { name: 'React', icon: '⚛' },
  { name: 'Vue', icon: '🟢' },
  { name: 'Svelte', icon: '🔥' },
  { name: 'Astro', icon: '🚀' },
  { name: 'Nuxt', icon: '💚' },
  { name: 'Remix', icon: '💿' },
  { name: 'Gatsby', icon: '🟣' },
]

function DocsSearch() {
  return (
    <div className="relative max-w-2xl mx-auto mt-8">
      <input
        type="search"
        placeholder="Search documentation..."
        className="w-full px-6 py-4 pl-12 rounded-xl border border-minimal-border dark:border-minimal-dark-border bg-white dark:bg-minimal-dark-card focus:border-[#0070f3] focus:ring-2 focus:ring-blue-500/20 transition-all text-lg"
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-minimal-muted dark:text-minimal-dark-muted" />
      <kbd className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-minimal-border dark:bg-minimal-dark-border text-xs font-mono text-minimal-muted dark:text-minimal-dark-muted">
        ⌘K
      </kbd>
    </div>
  )
}

function QuickStartCards() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.quick-start-card', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-16 px-4 md:px-16 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickStartCards.map((card) => (
          <a
            key={card.title}
            href={card.href}
            className="quick-start-card group p-6 rounded-2xl border border-minimal-border dark:border-minimal-dark-border bg-white dark:bg-minimal-dark-card hover:border-[#0070f3] hover:shadow-lg hover:shadow-blue-500/5 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center mb-4">
              <card.icon className="w-6 h-6 text-[#0070f3]" />
            </div>
            <h3 className="font-bold text-lg mb-2 group-hover:text-[#0070f3] transition-colors">
              {card.title}
            </h3>
            <p className="text-minimal-muted dark:text-minimal-dark-muted text-sm mb-4">{card.description}</p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-[#0070f3]">
              Learn more <ArrowRight className="w-4 h-4" />
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}

function TopicGrid() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.topic-category', {
        y: 30,
        opacity: 0,
        stagger: 0.08,
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
    <section ref={ref} className="py-16 px-4 md:px-16 max-w-6xl mx-auto">
      <h2 className="font-display text-2xl font-bold mb-8">Popular Topics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topicCategories.map((category) => (
          <div key={category.title} className="topic-category">
            <h3 className="font-semibold mb-4 text-minimal-muted dark:text-minimal-dark-muted uppercase text-xs tracking-wider">
              {category.title}
            </h3>
            <ul className="space-y-2">
              {category.links.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-[#0070f3] transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-minimal-border dark:bg-minimal-dark-border" />
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

function FrameworksSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.framework-badge', {
        scale: 0.8,
        opacity: 0,
        stagger: 0.05,
        duration: 0.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-16 md:py-24 px-4 md:px-16 bg-white dark:bg-minimal-dark-card border-y border-minimal-border dark:border-minimal-dark-border">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-display text-2xl font-bold mb-4">Framework Guides</h2>
        <p className="text-minimal-muted dark:text-minimal-dark-muted mb-8">
          First-class support for all popular frameworks
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {frameworks.map((fw) => (
            <a
              key={fw.name}
              href={`/docs/${fw.name.toLowerCase()}`}
              className="framework-badge flex items-center gap-2 px-4 py-3 rounded-xl border border-minimal-border dark:border-minimal-dark-border bg-minimal-bg dark:bg-minimal-dark-bg hover:border-[#0070f3] transition-colors"
            >
              <span className="text-xl">{fw.icon}</span>
              <span className="font-medium">{fw.name}</span>
            </a>
          ))}
          <a
            href="/docs/frameworks"
            className="framework-badge flex items-center gap-2 px-4 py-3 rounded-xl border border-minimal-border dark:border-minimal-dark-border bg-minimal-bg dark:bg-minimal-dark-bg hover:border-[#0070f3] transition-colors text-[#0070f3]"
          >
            <span>More</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

function HelpSection() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-16 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl border border-minimal-border dark:border-minimal-dark-border bg-white dark:bg-minimal-dark-card">
          <h3 className="font-bold text-xl mb-3">Need help?</h3>
          <p className="text-minimal-muted dark:text-minimal-dark-muted mb-6">
            Can&apos;t find what you&apos;re looking for? Our support team is here to help.
          </p>
          <a href="/contact" className="btn-secondary inline-flex">
            Contact Support
          </a>
        </div>
        <div className="p-8 rounded-2xl border border-minimal-border dark:border-minimal-dark-border bg-white dark:bg-minimal-dark-card">
          <h3 className="font-bold text-xl mb-3">Join the community</h3>
          <p className="text-minimal-muted dark:text-minimal-dark-muted mb-6">
            Connect with other developers, share ideas, and get help from the community.
          </p>
          <a href="https://discord.gg/acme" className="btn-secondary inline-flex" target="_blank" rel="noopener noreferrer">
            Join Discord <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default function DocsPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header>
        <Nav />
      </header>
      <main id="main-content" tabIndex={-1}>
        <PageHeader
          tag="Documentation"
          title="Documentation"
          description="Learn how to build, deploy, and scale with Acme."
        >
          <DocsSearch />
        </PageHeader>

        <QuickStartCards />
        <TopicGrid />
        <FrameworksSection />
        <HelpSection />
      </main>
      <Footer />
    </>
  )
}
