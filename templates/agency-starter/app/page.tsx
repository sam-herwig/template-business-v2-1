import { Nav, Hero, HorizontalWork, Services, About, Process, CTA, Footer } from './components'
import type { HeroContent, CaseStudy, Service, TeamMember, Stat, ProcessStep } from './types'

// ═══════════════════════════════════════════════════════════════
// AGENCY STARTER TEMPLATE (Server Component)
// Bold, dark, portfolio-focused landing page for creative agencies
// Premium GSAP animations: SplitText, horizontal scroll, magnetic effects
// ═══════════════════════════════════════════════════════════════

// Static data (can be replaced with Sanity/CMS fetch in production)
const HERO_CONTENT: HeroContent = {
  headline: ['We create', 'digital experiences', 'that move people.'],
  subheadline: 'Award-winning studio crafting bold brands, immersive websites, and products that matter.',
  cta: 'View Our Work',
  clients: ['Spotify', 'Nike', 'Airbnb', 'Stripe', 'Notion'],
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 1,
    title: 'Spotify Wrapped 2024',
    category: 'Brand Campaign',
    tags: ['branding', 'web'],
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&h=1000&fit=crop',
    description: 'Reimagining the annual music celebration',
    link: '#',
  },
  {
    id: 2,
    title: 'Fintech App Redesign',
    category: 'Product Design',
    tags: ['product', 'mobile'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    description: 'Simplifying complex financial tools',
    link: '#',
  },
  {
    id: 3,
    title: 'Artisan Coffee Brand',
    category: 'Brand Identity',
    tags: ['branding'],
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop',
    description: 'Craft coffee deserves craft design',
    link: '#',
  },
  {
    id: 4,
    title: 'AI Startup Launch',
    category: 'Web Design',
    tags: ['web', 'branding'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    description: 'Making artificial intelligence human',
    link: '#',
  },
  {
    id: 5,
    title: 'Fitness Platform',
    category: 'Product Design',
    tags: ['product', 'web', 'mobile'],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
    description: 'Workout experiences reimagined',
    link: '#',
  },
  {
    id: 6,
    title: 'Luxury Real Estate',
    category: 'Web Design',
    tags: ['web'],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    description: 'Selling dreams through pixels',
    link: '#',
  },
]

const SERVICES: Service[] = [
  {
    number: '01',
    name: 'Brand Strategy',
    description: 'We help you find your voice, define your story, and build a brand that resonates. From naming to positioning, we lay the strategic foundation.',
    deliverables: ['Brand Audit', 'Positioning', 'Naming', 'Brand Architecture'],
  },
  {
    number: '02',
    name: 'Visual Identity',
    description: 'Logos, colors, typography, and systems that make your brand instantly recognizable and impossible to forget.',
    deliverables: ['Logo Design', 'Color Systems', 'Typography', 'Brand Guidelines'],
  },
  {
    number: '03',
    name: 'Web Design',
    description: 'Websites that convert. We design and build fast, beautiful, and accessible sites that tell your story and drive results.',
    deliverables: ['UX/UI Design', 'Development', 'CMS Integration', 'Performance'],
  },
  {
    number: '04',
    name: 'Product Design',
    description: 'From concept to launch, we design digital products that users love. Apps, platforms, and tools built for humans.',
    deliverables: ['User Research', 'Interface Design', 'Prototyping', 'Design Systems'],
  },
]

const TEAM: TeamMember[] = [
  { name: 'Alex Rivera', role: 'Creative Director', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Jordan Kim', role: 'Design Lead', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Sam Okonkwo', role: 'Strategy Director', image: 'https://randomuser.me/api/portraits/men/52.jpg' },
  { name: 'Maya Chen', role: 'Tech Lead', image: 'https://randomuser.me/api/portraits/women/68.jpg' },
]

const STATS: Stat[] = [
  { value: '150', suffix: '+', label: 'Projects Delivered' },
  { value: '12', suffix: '', label: 'Years in Business' },
  { value: '40', suffix: '+', label: 'Awards Won' },
  { value: '98', suffix: '%', label: 'Client Retention' },
]

const PROCESS_STEPS: ProcessStep[] = [
  { step: '01', title: 'Discovery', description: 'We dig deep. Research, interviews, audits — understanding your business before touching a pixel.' },
  { step: '02', title: 'Strategy', description: 'We define the plan. Positioning, messaging, creative direction — the blueprint for everything that follows.' },
  { step: '03', title: 'Design', description: 'We bring it to life. Iterative design sprints with constant collaboration until it feels right.' },
  { step: '04', title: 'Launch', description: 'We ship it. Pixel-perfect execution, thorough QA, and ongoing support to ensure success.' },
]

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE (Server Component)
// Renders client components with server-fetched data
// ═══════════════════════════════════════════════════════════════

export default function Home() {
  return (
    <main id="main-content">
      <Nav />
      <Hero content={HERO_CONTENT} />
      <HorizontalWork projects={CASE_STUDIES} />
      <Services services={SERVICES} />
      <About stats={STATS} team={TEAM} />
      <Process steps={PROCESS_STEPS} />
      <CTA />
      <Footer />
    </main>
  )
}
