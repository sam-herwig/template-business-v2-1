'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Instagram, ArrowRight } from 'lucide-react'
import { Nav, Footer } from '@/components/layout'
import { PageHero, Breadcrumbs } from '@/components/shared'

const STYLISTS = [
  { 
    name: "Sarah Johnson", 
    role: "Owner & Master Stylist", 
    specialty: ["Balayage", "Color"], 
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=500&fit=crop&q=85", 
    instagram: "@sarahj_hair",
    bio: "With over 15 years of experience, Sarah founded Luxe Hair Studio with a vision of creating a space where artistry meets relaxation. Trained in New York and Paris, she specializes in balayage and dimensional color techniques.",
    yearsExperience: 15
  },
  { 
    name: "Michelle Chen", 
    role: "Senior Stylist", 
    specialty: ["Precision Cuts", "Short Hair"], 
    image: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?w=400&h=500&fit=crop&q=85", 
    instagram: "@michelle.cuts",
    bio: "Michelle brings NYC precision and LA creativity to every cut. Known for her meticulous attention to detail and ability to translate your vision into reality, she excels at both classic and avant-garde styles.",
    yearsExperience: 10
  },
  { 
    name: "Jessica Rivera", 
    role: "Colorist", 
    specialty: ["Vivid Colors", "Blonding"], 
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=500&fit=crop&q=85", 
    instagram: "@jess.color",
    bio: "A true color specialist, Jessica loves pushing boundaries with vivid fashion colors while maintaining hair health. Her blonding work is legendary, achieving the perfect platinum without damage.",
    yearsExperience: 8
  },
  { 
    name: "Emma Thompson", 
    role: "Stylist", 
    specialty: ["Curly Hair", "Natural Textures"], 
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&q=85", 
    instagram: "@emma.curls",
    bio: "Emma is our curl expert, certified in DevaCut and specialized techniques for all natural textures. She believes in embracing and enhancing your natural curl pattern for low-maintenance, gorgeous results.",
    yearsExperience: 6
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}

const staggerContainer = {
  animate: { 
    transition: { 
      staggerChildren: 0.15,
      delayChildren: 0.1
    } 
  }
}

export default function TeamPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <PageHero
          eyebrow="Our Team"
          title="Meet Our Stylists"
          description="Talented artists dedicated to making you look and feel your absolute best"
          backgroundImage="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1920&h=800&fit=crop&q=80"
        />
        
        <section className="section-padding bg-[rgb(var(--background))]">
          <div className="max-w-6xl mx-auto px-6">
            <Breadcrumbs items={[{ label: 'Our Team' }]} className="mb-12" />
            
            {/* Stylist Cards */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-16"
            >
              {STYLISTS.map((stylist, index) => {
                const isEven = index % 2 === 0
                return (
                  <motion.article
                    key={stylist.name}
                    variants={fadeInUp}
                    className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
                      !isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Image */}
                    <div className={`${!isEven ? 'md:order-2' : ''}`}>
                      <div className="relative aspect-[4/5] rounded-3xl overflow-hidden group">
                        <Image
                          src={stylist.image}
                          alt={`${stylist.name}, ${stylist.role}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className={`${!isEven ? 'md:order-1' : ''}`}>
                      <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mb-2">
                        {stylist.name}
                      </h2>
                      <p className="text-primary-600 font-medium mb-4">{stylist.role}</p>
                      
                      {/* Specialties */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {stylist.specialty.map((spec) => (
                          <span 
                            key={spec}
                            className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                      
                      <p className="text-neutral-600 leading-relaxed mb-6">
                        {stylist.bio}
                      </p>
                      
                      <div className="flex items-center gap-2 mb-6 text-sm text-neutral-500">
                        <span>{stylist.yearsExperience}+ years experience</span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4">
                        <Link 
                          href="/book" 
                          className="btn-primary"
                        >
                          Book with {stylist.name.split(' ')[0]}
                        </Link>
                        
                        {stylist.instagram && (
                          <a 
                            href={`https://instagram.com/${stylist.instagram.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-neutral-600 hover:text-primary-600 transition-colors"
                            aria-label={`Follow ${stylist.name} on Instagram`}
                          >
                            <Instagram className="w-5 h-5" />
                            <span className="text-sm">{stylist.instagram}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </motion.div>
            
            {/* Join the Team CTA */}
            <motion.div
              className="mt-24 text-center bg-neutral-50 rounded-3xl p-10 md:p-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-display text-2xl md:text-3xl text-neutral-900 mb-4">
                Join Our Team
              </h3>
              <p className="text-neutral-600 mb-8 max-w-lg mx-auto">
                We're always looking for talented stylists who share our passion for artistry and client care. 
                Think you'd be a great fit?
              </p>
              <Link href="/contact" className="btn-secondary group">
                Get in Touch
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
