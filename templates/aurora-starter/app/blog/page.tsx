'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { PageLayout } from '@/components/page-layout'
import { ArrowRight, Calendar, Clock, Mail } from 'lucide-react'

// ═══════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════
const CATEGORIES = ['All', 'Product', 'Design', 'Engineering', 'Company']

const POSTS = [
  {
    slug: 'introducing-lumina-ai',
    title: 'Introducing Lumina AI: The Future of Intelligent Design',
    excerpt: 'Today we\'re excited to announce the biggest update in Lumina\'s history. Our new AI-powered features will transform how you design.',
    category: 'Product',
    date: 'Dec 15, 2024',
    readTime: '8 min read',
    author: { name: 'Alex Chen', role: 'CEO' },
    featured: true,
  },
  {
    slug: 'version-2-5-release',
    title: 'Version 2.5: What\'s New',
    excerpt: 'A detailed look at all the new features, improvements, and bug fixes in our latest release.',
    category: 'Product',
    date: 'Dec 10, 2024',
    readTime: '4 min read',
    author: { name: 'Jordan Taylor', role: 'Product' },
    featured: false,
  },
  {
    slug: '5-design-trends-2025',
    title: '5 Design Trends to Watch in 2025',
    excerpt: 'From AI-generated graphics to spatial design, here are the trends that will shape the industry next year.',
    category: 'Design',
    date: 'Dec 5, 2024',
    readTime: '6 min read',
    author: { name: 'Marcus Lee', role: 'Design Lead' },
    featured: false,
  },
  {
    slug: 'building-realtime-engine',
    title: 'How We Built Our Real-time Collaboration Engine',
    excerpt: 'A deep dive into the technical challenges and solutions behind Lumina\'s instant sync feature.',
    category: 'Engineering',
    date: 'Nov 28, 2024',
    readTime: '10 min read',
    author: { name: 'Sarah Kim', role: 'CTO' },
    featured: false,
  },
  {
    slug: 'series-b-announcement',
    title: 'Announcing Our Series B: $50M to Democratize Design',
    excerpt: 'We\'re thrilled to share that we\'ve raised $50M to continue our mission of making design accessible to everyone.',
    category: 'Company',
    date: 'Nov 15, 2024',
    readTime: '3 min read',
    author: { name: 'Alex Chen', role: 'CEO' },
    featured: false,
  },
  {
    slug: 'design-system-best-practices',
    title: 'Building Scalable Design Systems',
    excerpt: 'Learn how to create design systems that grow with your team and maintain consistency at scale.',
    category: 'Design',
    date: 'Nov 8, 2024',
    readTime: '7 min read',
    author: { name: 'Marcus Lee', role: 'Design Lead' },
    featured: false,
  },
]

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════
function FeaturedPost({ post }: { post: typeof POSTS[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Link href={`/blog/${post.slug}`} className="block group">
        <div className="blog-card p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Image Placeholder */}
            <div 
              className="md:w-1/2 aspect-video rounded-2xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(129, 140, 248, 0.3) 0%, rgba(192, 132, 252, 0.2) 100%)',
              }}
            >
              <span className="text-6xl opacity-50">◈</span>
            </div>
            
            {/* Content */}
            <div className="md:w-1/2 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-aurora-indigo/20 text-aurora-indigo">
                  Featured
                </span>
                <span className="text-sm text-white/50">{post.category}</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-aurora-indigo transition-colors">
                {post.title}
              </h2>
              
              <p className="text-white/70 mb-6 line-clamp-2">
                {post.excerpt}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-white/50">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function BlogCard({ post, index }: { post: typeof POSTS[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/blog/${post.slug}`} className="block group h-full">
        <div className="blog-card h-full flex flex-col">
          {/* Image Placeholder */}
          <div 
            className="aspect-[16/10] rounded-t-2xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(129, 140, 248, 0.2) 0%, rgba(192, 132, 252, 0.15) 100%)',
            }}
          >
            <span className="text-4xl opacity-30">◈</span>
          </div>
          
          {/* Content */}
          <div className="p-6 flex flex-col flex-grow">
            <span className="text-xs font-medium text-aurora-indigo uppercase tracking-wider mb-2">
              {post.category}
            </span>
            
            <h3 className="text-lg font-bold mb-2 group-hover:text-aurora-indigo transition-colors line-clamp-2">
              {post.title}
            </h3>
            
            <p className="text-white/60 text-sm mb-4 line-clamp-2 flex-grow">
              {post.excerpt}
            </p>
            
            <div className="flex items-center gap-3 text-xs text-white/50">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function Newsletter() {
  return (
    <motion.div 
      className="max-w-2xl mx-auto p-8 md:p-12 rounded-[32px] backdrop-blur-xl text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        background: 'linear-gradient(135deg, rgba(129, 140, 248, 0.15) 0%, rgba(192, 132, 252, 0.1) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
      }}
    >
      <Mail className="w-10 h-10 mx-auto mb-4 text-aurora-indigo" />
      <h2 className="text-2xl font-bold mb-2">Stay in the loop</h2>
      <p className="text-white/70 mb-6">
        Get the latest updates, tips, and insights delivered straight to your inbox. No spam, ever.
      </p>
      
      <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Enter your email"
          className="aurora-input flex-grow"
          aria-label="Email address"
        />
        <motion.button 
          className="btn-primary justify-center whitespace-nowrap"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
        >
          Subscribe
        </motion.button>
      </form>
      
      <p className="text-sm text-white/50 mt-4">Join 15,000+ subscribers</p>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  
  const featuredPost = POSTS.find(p => p.featured)
  const regularPosts = activeCategory === 'All' 
    ? POSTS.filter(p => !p.featured) 
    : POSTS.filter(p => p.category === activeCategory && !p.featured)

  return (
    <PageLayout>
      {/* Hero */}
      <section className="page-hero pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">BLOG</span>
        </motion.div>
        <motion.h1 
          className="text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-tight tracking-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Insights, updates, and
          <br />
          <span className="gradient-text">design inspiration</span>
        </motion.h1>
      </section>

      {/* Category Filters */}
      <section className="relative z-10 px-4 md:px-16 pb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-medium transition-all ${
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

      {/* Featured Post */}
      {activeCategory === 'All' && featuredPost && (
        <section className="relative z-10 px-4 md:px-16 pb-16">
          <div className="max-w-5xl mx-auto">
            <FeaturedPost post={featuredPost} />
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="relative z-10 py-8 px-4 md:px-16">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {regularPosts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
        
        {regularPosts.length === 0 && (
          <motion.p 
            className="text-center text-white/50 py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No posts in this category yet.
          </motion.p>
        )}
      </section>

      {/* Load More */}
      <section className="relative z-10 py-8 px-4 md:px-16 text-center">
        <motion.button 
          className="btn-secondary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Load More Posts
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </section>

      {/* Newsletter */}
      <section className="relative z-10 py-24 px-4 md:px-16">
        <Newsletter />
      </section>
    </PageLayout>
  )
}
