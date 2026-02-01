'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { PageLayout } from '@/components/page-layout'
import { GlassCard } from '@/components/ui/glass-card'
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react'

// ═══════════════════════════════════════════════════════════════
// DATA (In a real app, this would come from a CMS/database)
// ═══════════════════════════════════════════════════════════════
const POSTS: Record<string, {
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  author: { name: string; role: string }
  content: string
}> = {
  'introducing-lumina-ai': {
    title: 'Introducing Lumina AI: The Future of Intelligent Design',
    excerpt: 'Today we\'re excited to announce the biggest update in Lumina\'s history.',
    category: 'Product',
    date: 'Dec 15, 2024',
    readTime: '8 min read',
    author: { name: 'Alex Chen', role: 'CEO' },
    content: `
## The Vision

When we founded Lumina three years ago, we had a vision: to create design tools that don't just execute commands, but understand intent. Today, we're taking the biggest step toward that vision with Lumina AI.

## What's New

### Smart Layout Generation

Our new AI can analyze your content and suggest optimal layouts. Simply describe what you're building, and watch as Lumina generates multiple options in seconds.

\`\`\`
// Example: Generating a landing page layout
lumina.generateLayout({
  type: 'landing-page',
  sections: ['hero', 'features', 'testimonials', 'cta'],
  style: 'modern-minimal'
})
\`\`\`

### Intelligent Color Palettes

No more struggling with color theory. Lumina AI analyzes your content, brand assets, and industry trends to suggest color combinations that work.

### Context-Aware Components

Our component library now learns from your usage patterns. The more you design, the smarter it gets at suggesting the right components at the right time.

## How It Works

Lumina AI is powered by a custom model trained specifically for design tasks. Unlike general-purpose AI, it understands:

- **Visual hierarchy** — What draws the eye and in what order
- **Spacing and rhythm** — How elements should breathe
- **Brand consistency** — How to maintain your visual identity
- **Accessibility** — Ensuring designs work for everyone

> "This isn't about replacing designers—it's about amplifying their capabilities." — Sarah Kim, CTO

## What's Next

This is just the beginning. Over the coming months, we'll be rolling out:

1. **AI-powered prototyping** — Go from concept to interactive prototype instantly
2. **Voice commands** — Design by describing what you want
3. **Predictive editing** — Lumina anticipates your next action

## Try It Today

Lumina AI is available now for all Professional and Enterprise users. Starter users can try it with 10 free generations per month.

[Start your free trial →](/pricing)

---

*We'd love to hear your thoughts. Share your creations and tag us @LuminaDesign on Twitter.*
    `.trim()
  },
  'version-2-5-release': {
    title: 'Version 2.5: What\'s New',
    excerpt: 'A detailed look at all the new features, improvements, and bug fixes.',
    category: 'Product',
    date: 'Dec 10, 2024',
    readTime: '4 min read',
    author: { name: 'Jordan Taylor', role: 'Product' },
    content: `
## Overview

Version 2.5 brings significant improvements to performance, collaboration, and our component library. Here's everything you need to know.

## New Features

### Enhanced Real-time Collaboration

- Cursor positions now update 2x faster
- New presence indicators show who's viewing each frame
- Improved conflict resolution when multiple users edit simultaneously

### Component Library Updates

We've added 50+ new components including:

- Data visualization charts
- Dashboard widgets
- Marketing page sections
- Mobile app UI patterns

### Performance Improvements

- 40% faster canvas rendering
- Reduced memory usage for large files
- Instant undo/redo (was 100ms, now <10ms)

## Bug Fixes

- Fixed rare crash when duplicating nested components
- Resolved export issues with certain gradient types
- Fixed keyboard shortcuts not working after extended sessions

## Breaking Changes

None! This is a fully backward-compatible release.

## Upgrade Now

Version 2.5 is available now. Your app will update automatically, or you can force an update from Settings → About → Check for Updates.
    `.trim()
  }
}

const RELATED_POSTS = [
  { slug: 'version-2-5-release', title: 'Version 2.5: What\'s New', category: 'Product' },
  { slug: '5-design-trends-2025', title: '5 Design Trends to Watch in 2025', category: 'Design' },
  { slug: 'building-realtime-engine', title: 'How We Built Our Real-time Engine', category: 'Engineering' },
]

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════
function ShareButtons() {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-white/50 mr-2">Share:</span>
      <a 
        href="#" 
        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </a>
      <a 
        href="#" 
        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </a>
      <button 
        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Copy link"
        onClick={() => navigator.clipboard.writeText(window.location.href)}
      >
        <LinkIcon className="w-4 h-4" />
      </button>
    </div>
  )
}

function RelatedPost({ post }: { post: typeof RELATED_POSTS[0] }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <div className="blog-card p-4">
        <div 
          className="aspect-video rounded-lg mb-3 flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(129, 140, 248, 0.2) 0%, rgba(192, 132, 252, 0.15) 100%)',
          }}
        >
          <span className="text-2xl opacity-30">◈</span>
        </div>
        <span className="text-xs text-aurora-indigo uppercase tracking-wider">{post.category}</span>
        <h4 className="font-semibold mt-1 group-hover:text-aurora-indigo transition-colors line-clamp-2">
          {post.title}
        </h4>
      </div>
    </Link>
  )
}

// ═══════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════
export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const post = POSTS[slug]
  
  // Fallback for posts not in our mock data
  if (!post) {
    return (
      <PageLayout>
        <section className="page-hero">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-white/70 mb-8">This blog post doesn&apos;t exist or has been moved.</p>
          <Link href="/blog" className="btn-primary inline-flex">
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </Link>
        </section>
      </PageLayout>
    )
  }

  // Simple markdown-like parsing
  const parseContent = (content: string) => {
    const lines = content.split('\n')
    const elements: JSX.Element[] = []
    let inCodeBlock = false
    let codeContent = ''
    let listItems: string[] = []
    
    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-2 my-4 text-white/80">
            {listItems.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        )
        listItems = []
      }
    }
    
    lines.forEach((line, i) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={`code-${i}`} className="bg-black/30 rounded-xl p-4 my-6 overflow-x-auto border border-white/10">
              <code className="text-sm text-aurora-cyan">{codeContent.trim()}</code>
            </pre>
          )
          codeContent = ''
        }
        inCodeBlock = !inCodeBlock
        return
      }
      
      if (inCodeBlock) {
        codeContent += line + '\n'
        return
      }
      
      if (line.startsWith('## ')) {
        flushList()
        elements.push(<h2 key={i} className="text-2xl font-bold mt-10 mb-4">{line.slice(3)}</h2>)
      } else if (line.startsWith('### ')) {
        flushList()
        elements.push(<h3 key={i} className="text-xl font-semibold mt-8 mb-3">{line.slice(4)}</h3>)
      } else if (line.startsWith('> ')) {
        flushList()
        elements.push(
          <blockquote key={i} className="border-l-4 border-aurora-indigo pl-4 my-6 text-xl italic text-white/90">
            {line.slice(2)}
          </blockquote>
        )
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        listItems.push(line.slice(2))
      } else if (line.match(/^\d+\. /)) {
        listItems.push(line.replace(/^\d+\. /, ''))
      } else if (line.startsWith('---')) {
        flushList()
        elements.push(<hr key={i} className="border-white/10 my-8" />)
      } else if (line.trim() === '') {
        flushList()
      } else if (line.startsWith('*') && line.endsWith('*')) {
        flushList()
        elements.push(<p key={i} className="text-white/60 italic my-4">{line.slice(1, -1)}</p>)
      } else {
        flushList()
        // Handle inline links
        const withLinks = line.replace(
          /\[([^\]]+)\]\(([^)]+)\)/g,
          '<a href="$2" class="text-aurora-indigo hover:underline">$1</a>'
        )
        elements.push(
          <p key={i} className="text-white/80 leading-relaxed my-4" dangerouslySetInnerHTML={{ __html: withLinks }} />
        )
      }
    })
    
    flushList()
    return elements
  }

  return (
    <PageLayout>
      {/* Back Link */}
      <section className="relative z-10 pt-32 px-4 md:px-16">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </section>

      {/* Header */}
      <section className="relative z-10 pt-8 pb-12 px-4 md:px-16">
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">{post.category}</span>
          
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight tracking-tight mb-6">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                style={{ background: 'linear-gradient(135deg, #818cf8, #c084fc)' }}
              >
                {post.author.name[0]}
              </div>
              <div>
                <div className="font-medium">{post.author.name}</div>
                <div className="text-sm text-white/50">{post.author.role}</div>
              </div>
            </div>
            
            {/* Meta */}
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
        </motion.div>
      </section>

      {/* Hero Image */}
      <section className="relative z-10 px-4 md:px-16 pb-12">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div 
            className="aspect-[21/9] rounded-3xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(129, 140, 248, 0.3) 0%, rgba(192, 132, 252, 0.2) 100%)',
            }}
          >
            <span className="text-8xl opacity-50">◈</span>
          </div>
        </motion.div>
      </section>

      {/* Content */}
      <section className="relative z-10 px-4 md:px-16 pb-16">
        <motion.article 
          className="max-w-3xl mx-auto prose-invert"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {parseContent(post.content)}
        </motion.article>
      </section>

      {/* Share */}
      <section className="relative z-10 px-4 md:px-16 pb-16">
        <div className="max-w-3xl mx-auto pt-8 border-t border-white/10">
          <ShareButtons />
        </div>
      </section>

      {/* Related Posts */}
      <section className="relative z-10 py-16 px-4 md:px-16 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RELATED_POSTS.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <RelatedPost post={p} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
