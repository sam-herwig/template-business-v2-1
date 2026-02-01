'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { Heart, Zap, Users, Target, Twitter, Linkedin, ArrowRight } from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'

const stats = [
  { value: '10M+', label: 'Deployments' },
  { value: '100+', label: 'Edge Regions' },
  { value: '50K+', label: 'Customers' },
  { value: '2019', label: 'Founded' },
]

const values = [
  {
    icon: Zap,
    title: 'Ship fast',
    description: 'We believe in rapid iteration. Ship early, get feedback, improve. Perfection is the enemy of progress.',
  },
  {
    icon: Heart,
    title: 'Developer love',
    description: 'Every decision we make starts with the developer experience. If it\'s not delightful, we\'re not done.',
  },
  {
    icon: Users,
    title: 'Community first',
    description: 'We\'re building in public with our community. Your feedback shapes our roadmap.',
  },
  {
    icon: Target,
    title: 'Radical focus',
    description: 'We do a few things exceptionally well rather than many things poorly. Focus enables excellence.',
  },
]

const team = [
  { name: 'Alex Rivera', role: 'CEO & Co-founder', gradient: 'from-pink-500 to-rose-500' },
  { name: 'Sarah Chen', role: 'Head of Product', gradient: 'from-blue-500 to-cyan-500' },
  { name: 'Marcus Johnson', role: 'CTO', gradient: 'from-purple-500 to-violet-500' },
  { name: 'Emily Park', role: 'Head of Engineering', gradient: 'from-green-500 to-emerald-500' },
  { name: 'David Kim', role: 'Head of Design', gradient: 'from-orange-500 to-amber-500' },
  { name: 'Lisa Wang', role: 'Head of Marketing', gradient: 'from-indigo-500 to-blue-500' },
  { name: 'James Wilson', role: 'Head of Sales', gradient: 'from-red-500 to-pink-500' },
  { name: 'Ana Martinez', role: 'Head of Support', gradient: 'from-teal-500 to-cyan-500' },
]

function StatsBar() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.stat-item', {
        y: 30,
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
    <section ref={ref} className="py-12 px-4 md:px-16 border-y border-minimal-border dark:border-minimal-dark-border bg-white dark:bg-minimal-dark-card">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-item">
            <span className="block font-display text-4xl md:text-5xl font-bold gradient-text">
              {stat.value}
            </span>
            <span className="text-minimal-muted dark:text-minimal-dark-muted text-sm mt-1">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function StorySection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.story-image', {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
        },
      })

      gsap.from('.story-content', {
        x: 50,
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

  return (
    <section ref={ref} className="py-16 md:py-24 px-4 md:px-16 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="story-image aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
          <div className="text-8xl">🚀</div>
        </div>

        <div className="story-content">
          <h2 className="font-display text-3xl font-bold tracking-tight mb-6">Our Story</h2>
          <div className="space-y-4 text-minimal-muted dark:text-minimal-dark-muted leading-relaxed">
            <p>
              Acme started in 2019 with a simple idea: deploying web applications should be as easy as pushing code. 
              We were frustrated with the complexity of existing solutions—too many steps, too much configuration, 
              too much time wasted.
            </p>
            <p>
              What began as a side project quickly grew into something bigger. Developers around the world 
              resonated with our vision of zero-configuration deployment. Within a year, we had thousands of 
              projects deployed on our platform.
            </p>
            <p>
              Today, Acme powers millions of deployments for companies of all sizes, from solo developers 
              to Fortune 500 enterprises. But we&apos;re just getting started. Our mission remains the same: 
              make the web faster and more accessible for everyone.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ValuesSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.value-card', {
        y: 40,
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
    <section ref={ref} className="py-16 md:py-24 px-4 md:px-16 bg-white dark:bg-minimal-dark-card border-y border-minimal-border dark:border-minimal-dark-border">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl font-bold text-center mb-4">What we believe</h2>
        <p className="text-center text-minimal-muted dark:text-minimal-dark-muted mb-12 max-w-2xl mx-auto">
          Our values guide everything we do—from the products we build to how we treat each other.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value) => (
            <article key={value.title} className="value-card p-8 rounded-2xl border border-minimal-border dark:border-minimal-dark-border bg-minimal-bg dark:bg-minimal-dark-bg">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 flex items-center justify-center mb-4">
                <value.icon className="w-6 h-6 text-[#7928ca]" />
              </div>
              <h3 className="font-bold text-xl mb-3">{value.title}</h3>
              <p className="text-minimal-muted dark:text-minimal-dark-muted leading-relaxed">{value.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.team-card', {
        y: 40,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
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
    <section ref={ref} className="py-16 md:py-24 px-4 md:px-16 max-w-6xl mx-auto">
      <h2 className="font-display text-3xl font-bold text-center mb-4">Meet the team</h2>
      <p className="text-center text-minimal-muted dark:text-minimal-dark-muted mb-12 max-w-2xl mx-auto">
        We&apos;re a remote-first team spread across the globe, united by our passion for building great products.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {team.map((member) => (
          <article key={member.name} className="team-card text-center">
            <div className={`w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br ${member.gradient}`}>
              <div className="w-full h-full flex items-center justify-center text-white text-3xl font-bold">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
            <h3 className="font-bold text-lg">{member.name}</h3>
            <p className="text-minimal-muted dark:text-minimal-dark-muted text-sm">{member.role}</p>
            <div className="flex justify-center gap-3 mt-3">
              <a href="#" className="text-minimal-muted dark:text-minimal-dark-muted hover:text-[#0070f3] transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="text-minimal-muted dark:text-minimal-dark-muted hover:text-[#0070f3] transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function CareersCTA() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.careers-content', {
        y: 30,
        opacity: 0,
        duration: 0.8,
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
    <section ref={ref} id="careers" className="py-16 md:py-24 px-4 md:px-16">
      <div className="careers-content max-w-4xl mx-auto text-center p-12 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-minimal-border dark:border-minimal-dark-border">
        <h2 className="font-display text-3xl font-bold mb-4">We&apos;re hiring!</h2>
        <p className="text-minimal-muted dark:text-minimal-dark-muted mb-8 max-w-2xl mx-auto">
          Join our team and help shape the future of web deployment. We&apos;re looking for passionate people 
          who want to make a difference.
        </p>
        <a href="/careers" className="btn-primary inline-flex">
          View Open Positions <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header>
        <Nav />
      </header>
      <main id="main-content" tabIndex={-1}>
        <PageHeader
          tag="About"
          title="We're building the future of deployment"
          description="Our mission is to make the web faster and more accessible for developers everywhere."
        />

        <StatsBar />
        <StorySection />
        <ValuesSection />
        <TeamSection />
        <CareersCTA />
      </main>
      <Footer />
    </>
  )
}
