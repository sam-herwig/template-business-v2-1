'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { ArrowRight } from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'

const categories = ['All', 'Engineering', 'Product', 'Changelog']

const featuredPost = {
  slug: 'introducing-edge-functions-v2',
  title: 'Introducing Edge Functions v2: Faster, Smarter, Global',
  excerpt: 'Today we\'re announcing Edge Functions v2, bringing sub-10ms execution times, expanded runtime support, and seamless integration with your existing workflows.',
  category: 'Product',
  date: 'January 15, 2025',
  image: '/blog/edge-functions.jpg',
  author: {
    name: 'Sarah Chen',
    role: 'Head of Product',
    avatar: '/team/sarah.jpg',
  },
}

const posts = [
  {
    slug: 'building-realtime-apps',
    title: 'Building Real-time Applications with WebSockets',
    category: 'Engineering',
    date: 'January 12, 2025',
    image: '/blog/websockets.jpg',
  },
  {
    slug: 'analytics-deep-dive',
    title: 'Deep Dive: How We Built Our Analytics Engine',
    category: 'Engineering',
    date: 'January 10, 2025',
    image: '/blog/analytics.jpg',
  },
  {
    slug: 'nextjs-15-support',
    title: 'Full Support for Next.js 15 Now Available',
    category: 'Changelog',
    date: 'January 8, 2025',
    image: '/blog/nextjs.jpg',
  },
  {
    slug: 'security-best-practices',
    title: 'Security Best Practices for Modern Web Apps',
    category: 'Engineering',
    date: 'January 5, 2025',
    image: '/blog/security.jpg',
  },
  {
    slug: 'year-in-review',
    title: 'Acme 2024: A Year in Review',
    category: 'Product',
    date: 'December 31, 2024',
    image: '/blog/review.jpg',
  },
  {
    slug: 'performance-optimization',
    title: 'Performance Optimization Tips from Our Team',
    category: 'Engineering',
    date: 'December 28, 2024',
    image: '/blog/performance.jpg',
  },
]

function CategoryTabs({ activeCategory, setActiveCategory }: { activeCategory: string; setActiveCategory: (cat: string) => void }) {
  return (
    <div className="flex gap-2 justify-center flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeCategory === cat
              ? 'bg-minimal-text dark:bg-minimal-dark-text text-minimal-bg dark:text-minimal-dark-bg'
              : 'bg-minimal-border/50 dark:bg-minimal-dark-border/50 text-minimal-muted dark:text-minimal-dark-muted hover:bg-minimal-border dark:hover:bg-minimal-dark-border'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

function FeaturedPost() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.featured-image', {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
        },
      })

      gsap.from('.featured-content', {
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
    <article ref={ref} className="py-12 px-4 md:px-16 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="featured-image aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500">
          <div className="w-full h-full flex items-center justify-center text-white text-6xl">
            ⚡
          </div>
        </div>

        <div className="featured-content">
          <span className="feature-tag mb-4">{featuredPost.category}</span>
          <h2 className="font-display text-3xl font-bold tracking-tight mb-4 hover:text-[#0070f3] transition-colors">
            <a href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</a>
          </h2>
          <p className="text-minimal-muted dark:text-minimal-dark-muted text-lg leading-relaxed mb-6">
            {featuredPost.excerpt}
          </p>
          <div className="flex items-center gap-4 text-sm text-minimal-muted dark:text-minimal-dark-muted">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500" />
            <div>
              <span className="block font-medium text-minimal-text dark:text-minimal-dark-text">{featuredPost.author.name}</span>
              <span>{featuredPost.date}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

function PostGrid({ activeCategory }: { activeCategory: string }) {
  const ref = useRef<HTMLElement>(null)
  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === activeCategory)

  useGSAP(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.post-card', {
        y: 50,
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
  }, [activeCategory])

  const gradients = [
    'from-pink-500 to-rose-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-purple-500 to-violet-500',
    'from-orange-500 to-amber-500',
    'from-indigo-500 to-blue-500',
  ]

  return (
    <section ref={ref} className="py-12 px-4 md:px-16 max-w-6xl mx-auto">
      <h2 className="font-display text-2xl font-bold mb-8">Recent Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post, i) => (
          <article key={post.slug} className="post-card group">
            <a href={`/blog/${post.slug}`}>
              <div className={`aspect-video rounded-xl overflow-hidden bg-gradient-to-br ${gradients[i % gradients.length]} mb-4`}>
                <div className="w-full h-full flex items-center justify-center text-white text-3xl group-hover:scale-110 transition-transform duration-300">
                  {post.category === 'Engineering' ? '⚙️' : post.category === 'Changelog' ? '📝' : '🚀'}
                </div>
              </div>

              <span className="text-xs font-semibold uppercase tracking-wider text-[#0070f3]">
                {post.category}
              </span>

              <h3 className="font-bold text-lg mt-2 mb-2 group-hover:text-[#0070f3] transition-colors line-clamp-2">
                {post.title}
              </h3>

              <time className="text-sm text-minimal-muted dark:text-minimal-dark-muted">{post.date}</time>
            </a>
          </article>
        ))}
      </div>

      {filteredPosts.length > 0 && (
        <div className="text-center mt-12">
          <button className="btn-secondary">
            Load More Posts <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  )
}

function NewsletterSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('.newsletter-content', {
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
    <section ref={ref} className="py-16 md:py-24 px-4 md:px-16 bg-white dark:bg-minimal-dark-card border-y border-minimal-border dark:border-minimal-dark-border">
      <div className="newsletter-content max-w-xl mx-auto text-center">
        <h2 className="font-display text-2xl font-bold mb-4">
          Subscribe to our newsletter
        </h2>
        <p className="text-minimal-muted dark:text-minimal-dark-muted mb-8">
          Get the latest updates, tutorials, and product news delivered to your inbox.
        </p>

        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="you@example.com"
            className="flex-1 px-4 py-3 rounded-lg border border-minimal-border dark:border-minimal-dark-border bg-minimal-bg dark:bg-minimal-dark-bg focus:border-[#0070f3] focus:ring-2 focus:ring-blue-500/20 transition-all"
            required
          />
          <button type="submit" className="btn-primary whitespace-nowrap">
            Subscribe
          </button>
        </form>

        <p className="text-xs text-minimal-muted dark:text-minimal-dark-muted mt-4">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header>
        <Nav />
      </header>
      <main id="main-content" tabIndex={-1}>
        <PageHeader
          tag="Blog"
          title="Blog"
          description="Updates, tutorials, and insights from the Acme team."
        >
          <CategoryTabs activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        </PageHeader>

        <FeaturedPost />
        <PostGrid activeCategory={activeCategory} />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  )
}
