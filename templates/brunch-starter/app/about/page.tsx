'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Leaf, Sun, Heart, Coffee, Users, Award } from 'lucide-react'
import { Nav, Footer } from '../_components'
import { PageHero, CTABanner, SectionWrapper } from '@/components/shared'

// ═══════════════════════════════════════════════════════════════
// ABOUT PAGE DATA
// ═══════════════════════════════════════════════════════════════

const STORY = {
  title: 'Where Every Morning Feels Like Sunday',
  content: [
    "We started Sunny Side in 2019 with a simple idea: breakfast should make you happy. Not just fed — genuinely, ridiculously happy.",
    "Founders Maria and Jake met while working the morning shift at a downtown diner. They bonded over a shared love of perfectly poached eggs, locally roasted coffee, and the joy of watching people's faces light up over a great meal.",
    "Today, our RiNo location is a neighborhood gathering spot where regulars know each other by name, the coffee flows freely, and every dish is made with ingredients we're proud of. We partner with Colorado farms, roast our own coffee, and treat every guest like a neighbor popping by for a bite.",
  ],
  image: 'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=500&h=600&fit=crop',
}

const TEAM = [
  {
    name: 'Maria Chen',
    role: 'Co-Founder & Head Chef',
    bio: "Maria brings 15 years of culinary experience and an infectious enthusiasm for farm-fresh ingredients. Her scrambles are legendary.",
    photo: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=300&h=300&fit=crop',
  },
  {
    name: 'Jake Thompson',
    role: 'Co-Founder & Operations',
    bio: "Jake handles everything from sourcing to service. He's probably the reason your coffee is always the perfect temperature.",
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
  },
  {
    name: 'Sofia Rodriguez',
    role: 'Pastry Chef',
    bio: "Sofia's cinnamon rolls have their own fan club. Her baking philosophy: if it doesn't make you smile, start over.",
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop',
  },
]

const VALUES = [
  {
    icon: <Leaf className="w-6 h-6" />,
    title: 'Farm Fresh',
    description: "We source 80% of our ingredients from farms within 50 miles. You can taste the difference.",
  },
  {
    icon: <Sun className="w-6 h-6" />,
    title: 'Good Vibes',
    description: "Life's too short for bad breakfast. We bring the sunshine, even on cloudy days.",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Community First',
    description: "We're more than a restaurant — we're your neighborhood's living room.",
  },
]

const PARTNERS = [
  { name: 'Mountain View Farms', type: 'Eggs & Dairy', icon: '🥚' },
  { name: 'RiNo Coffee Roasters', type: 'Coffee Beans', icon: '☕' },
  { name: 'Sunrise Bakery', type: 'Breads & Pastries', icon: '🥐' },
  { name: 'Front Range Produce', type: 'Vegetables & Fruits', icon: '🥬' },
]

const TIMELINE = [
  { year: '2019', event: 'Sunny Side opens in RiNo' },
  { year: '2020', event: 'Launched community meal program' },
  { year: '2021', event: 'Started roasting our own coffee' },
  { year: '2022', event: "Named Denver's Best Brunch by Westword" },
  { year: '2023', event: 'Expanded to full weekend hours' },
  { year: '2024', event: 'Celebrating 100,000+ happy guests!' },
]

// ═══════════════════════════════════════════════════════════════
// ABOUT PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <PageHero
          title="Our Story"
          subtitle="Making mornings brighter since 2019"
          backgroundImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop"
          height="medium"
          breadcrumbs={[{ label: 'About', href: '/about' }]}
        />

        {/* Story Section */}
        <SectionWrapper background="default">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-3xl rounded-tr-[48px] overflow-hidden">
                <Image
                  src={STORY.image}
                  alt="Sunny Side restaurant interior with natural light"
                  width={500}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Floating photo accent */}
              <motion.div
                className="hidden lg:block absolute -bottom-6 -right-6 w-40"
                initial={{ opacity: 0, rotate: 10 }}
                whileInView={{ opacity: 1, rotate: 5 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="polaroid" style={{ transform: 'rotate(5deg)' }}>
                  <Image
                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=180&h=180&fit=crop"
                    alt="Beautiful latte art"
                    width={180}
                    height={180}
                    className="rounded"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-tag">Our Story</span>
              <h2 className="font-display text-3xl md:text-4xl text-charcoal dark:text-cream mb-6">
                {STORY.title}
              </h2>

              {STORY.content.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg text-charcoal-light dark:text-cream/80 leading-relaxed mb-4"
                >
                  {paragraph}
                </p>
              ))}

              <div className="flex flex-col mt-8">
                <span className="font-script text-2xl text-charcoal dark:text-cream">
                  — Maria & Jake
                </span>
                <span className="text-charcoal-light dark:text-cream/70 text-sm mt-1">
                  Founders
                </span>
              </div>
            </motion.div>
          </div>
        </SectionWrapper>

        {/* Values Section */}
        <SectionWrapper
          background="muted"
          eyebrow="Our Philosophy"
          title="What We Believe"
          description="These values guide everything we do, from sourcing to service"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {VALUES.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-8 bg-cream dark:bg-dark-bg rounded-2xl"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-coral/10 text-coral mb-4">
                  {value.icon}
                </div>
                <h3 className="font-display text-xl text-charcoal dark:text-cream mb-3">
                  {value.title}
                </h3>
                <p className="text-charcoal-light dark:text-cream/70">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>

        {/* Team Section */}
        <SectionWrapper
          background="default"
          eyebrow="The Crew"
          title="Meet Our Team"
          description="The people who make the magic happen every morning"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {TEAM.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-display text-xl text-charcoal dark:text-cream mb-1">
                  {member.name}
                </h3>
                <p className="text-coral font-medium text-sm mb-3">
                  {member.role}
                </p>
                <p className="text-charcoal-light dark:text-cream/70 text-sm">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>

        {/* Partners Section */}
        <SectionWrapper
          background="accent"
          eyebrow="Local Love"
          title="Our Partners"
          description="We're proud to work with these incredible local producers"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {PARTNERS.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center p-6 bg-white dark:bg-dark-card rounded-xl shadow-sm"
              >
                <span className="text-3xl mb-3 block" aria-hidden="true">
                  {partner.icon}
                </span>
                <h3 className="font-medium text-charcoal dark:text-cream mb-1 text-sm">
                  {partner.name}
                </h3>
                <p className="text-xs text-charcoal-light dark:text-cream/60">
                  {partner.type}
                </p>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>

        {/* Timeline Section */}
        <SectionWrapper
          background="muted"
          eyebrow="Our Journey"
          title="How We Got Here"
        >
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-coral/20 -translate-x-1/2" aria-hidden="true" />
              
              {TIMELINE.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`relative flex items-center gap-6 mb-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-coral -translate-x-1/2 z-10" aria-hidden="true" />
                  
                  {/* Content */}
                  <div className={`flex-1 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <span className="text-coral font-semibold">{item.year}</span>
                    <p className="text-charcoal dark:text-cream">{item.event}</p>
                  </div>
                  
                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        <CTABanner
          title="Come Say Hi!"
          description="We'd love to meet you. Stop by for brunch and become part of the Sunny Side family."
          primaryAction={{ label: 'Make a Reservation', href: '/contact#reserve' }}
          secondaryAction={{ label: 'View Menu', href: '/menu' }}
          emoji="👋"
        />
      </main>
      <Footer />
    </>
  )
}
