'use client'

import { SkipLink } from '@/components/SkipLink'
import { PageHero, SectionWrapper, CTABanner } from '@/components/shared'
import { StorySection, ChefBio, ValuesGrid, PressLogos } from '@/components/about'
import { Nav, Footer } from '../_components'
import type { ValueItem, PressItem, TeamMember } from '@/types'

// ═══════════════════════════════════════════════════════════════
// ABOUT PAGE DATA
// ═══════════════════════════════════════════════════════════════

const STORY_CONTENT = {
  title: 'A Passion for Great Food',
  content: [
    'Founded in 2015, The Golden Fork started with a simple mission: bring farm-fresh ingredients and creative cuisine to our community. What began as a small neighborhood bistro has grown into one of the city\'s most beloved dining destinations.',
    'Our founders, Maria and David Chen, met while working in some of New York\'s finest restaurants. They shared a dream of creating a place where exceptional food, warm hospitality, and community could come together.',
    'Today, that dream is realized in every plate we serve. We partner directly with local farmers and producers to source the finest seasonal ingredients, ensuring every dish tells a story of the land and the people who cultivate it.',
  ],
  image: {
    src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=750&fit=crop&q=85',
    alt: 'The Golden Fork restaurant exterior with warm lighting',
  },
  timeline: [
    { year: '2015', event: 'The Golden Fork opens its doors' },
    { year: '2017', event: 'Expanded to include private dining room' },
    { year: '2019', event: 'Named Best New Restaurant by City Magazine' },
    { year: '2021', event: 'Launched farm partnership program' },
    { year: '2024', event: 'Celebrating 10,000+ happy guests' },
  ],
}

const CHEF: TeamMember & { quote: string; credentials: string[] } = {
  name: 'Chef Marcus Thompson',
  role: 'Executive Chef',
  bio: 'A graduate of the Culinary Institute of America, Chef Marcus brings over 15 years of fine dining experience to The Golden Fork. After honing his craft in Michelin-starred kitchens across Europe, Marcus returned to his hometown with a vision to celebrate local ingredients through refined technique. His menus change with the seasons, reflecting his deep commitment to sustainability and his relationships with local farmers.',
  photo: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&h=750&fit=crop&q=85',
  quote: 'The best dishes start with the best ingredients. My job is simply to let them shine.',
  credentials: ['CIA Graduate', 'Former Le Bernardin', 'James Beard Nominee 2023'],
}

const VALUES: ValueItem[] = [
  {
    icon: 'leaf',
    title: 'Farm to Table',
    description: 'We source 80% of our ingredients from farms within 50 miles, supporting local agriculture and ensuring peak freshness.',
  },
  {
    icon: 'sun',
    title: 'Seasonality',
    description: 'Our menu evolves with the seasons, celebrating each ingredient at its natural peak for the best possible flavor.',
  },
  {
    icon: 'heart',
    title: 'Sustainability',
    description: 'From composting to renewable energy, we\'re committed to minimizing our environmental footprint.',
  },
]

const PRESS_ITEMS: PressItem[] = [
  {
    source: 'City Magazine',
    logo: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=200&h=60&fit=crop&q=80',
    quote: 'A masterclass in farm-to-table dining that sets the standard for the region.',
    date: '2024',
    link: '#',
  },
  {
    source: 'Food & Wine',
    logo: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=200&h=60&fit=crop&q=80',
    quote: 'Chef Thompson\'s seasonal tasting menu is not to be missed.',
    date: '2023',
    link: '#',
  },
  {
    source: 'The Daily Gazette',
    logo: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=200&h=60&fit=crop&q=80',
    quote: 'An intimate atmosphere paired with extraordinary cuisine.',
    date: '2023',
    link: '#',
  },
]

const PARTNERS = [
  { name: 'Miller Family Farms', description: 'Organic vegetables & herbs', logo: '' },
  { name: 'Sunrise Dairy', description: 'Artisan cheeses & butter', logo: '' },
  { name: 'Pacific Catch', description: 'Sustainable seafood', logo: '' },
  { name: 'Heritage Meats', description: 'Grass-fed beef & pork', logo: '' },
]

// ═══════════════════════════════════════════════════════════════
// ABOUT PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function AboutPage() {
  return (
    <>
      <SkipLink />
      <Nav />
      <main id="main-content">
        <PageHero
          title="Our Story"
          subtitle="A decade of farm-to-table excellence"
          backgroundImage="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1920&h=1080&fit=crop&q=85"
          height="medium"
          breadcrumbs={[{ label: 'About', href: '/about' }]}
        />

        {/* Origin Story */}
        <SectionWrapper background="default">
          <StorySection
            title={STORY_CONTENT.title}
            content={STORY_CONTENT.content}
            image={STORY_CONTENT.image}
            imagePosition="right"
            timeline={STORY_CONTENT.timeline}
          />
        </SectionWrapper>

        {/* Chef Bio */}
        <SectionWrapper background="muted">
          <ChefBio chef={CHEF} />
        </SectionWrapper>

        {/* Values */}
        <SectionWrapper
          background="default"
          eyebrow="Our Philosophy"
          title="What We Believe"
          description="These core values guide everything we do, from sourcing to service"
        >
          <ValuesGrid values={VALUES} />
        </SectionWrapper>

        {/* Sourcing Partners */}
        <SectionWrapper background="muted">
          <div className="text-center mb-10">
            <span className="section-eyebrow">Our Partners</span>
            <h2 className="font-display text-3xl md:text-4xl text-dark-900 dark:text-white mb-4">
              Local Sourcing
            </h2>
            <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
              We're proud to work with these incredible local producers who share our commitment to quality and sustainability.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PARTNERS.map((partner, index) => (
              <div
                key={index}
                className="text-center p-6 bg-[rgb(var(--background))] rounded-xl border border-[rgb(var(--border))]"
              >
                <div className="w-16 h-16 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌾</span>
                </div>
                <h3 className="font-medium text-dark-900 dark:text-white mb-1">
                  {partner.name}
                </h3>
                <p className="text-sm text-[rgb(var(--muted-foreground))]">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* Press */}
        <SectionWrapper background="default">
          <PressLogos items={PRESS_ITEMS} showQuotes={true} />
        </SectionWrapper>

        {/* CTA */}
        <CTABanner
          title="Experience Our Story"
          description="Join us for a meal that celebrates local ingredients and culinary craftsmanship"
          primaryAction={{ label: 'Make a Reservation', href: '/reservations' }}
          secondaryAction={{ label: 'View Menu', href: '/menu' }}
        />

        <Footer />
      </main>
    </>
  )
}
