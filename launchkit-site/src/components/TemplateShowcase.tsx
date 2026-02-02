'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Eye, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { templates, categories, type Category, type Template } from '@/lib/templates';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const categoryColors: Record<string, string> = {
  SaaS: 'from-purple-500 to-violet-500',
  Agency: 'from-orange-500 to-red-500',
  Local: 'from-emerald-500 to-teal-500',
  Creative: 'from-pink-500 to-rose-500',
  Coach: 'from-blue-500 to-cyan-500',
};

function TemplateCard({ template, index }: { template: Template; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  // Determine card size based on featured status and position
  const isFeatured = template.featured;
  const isLarge = isFeatured && index % 3 === 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}`}
    >
      <Link href={`/templates/${template.slug}`} className="block h-full">
        <div className="relative h-full glass rounded-2xl overflow-hidden card-hover">
          {/* Image Container */}
          <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
            {/* Placeholder gradient when no image */}
            <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[template.category]} opacity-20`} />
            
            {/* Template preview placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-3xl font-bold">{template.name[0]}</span>
              </div>
              <span className="text-lg font-semibold text-white/80">{template.name}</span>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
              <span className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-medium">
                <Eye className="w-4 h-4" />
                View Details
              </span>
            </div>

            {/* Price Badge */}
            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
              <span className="text-sm font-bold">${template.price}</span>
            </div>

            {/* Category Badge */}
            <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full bg-gradient-to-r ${categoryColors[template.category]}`}>
              <span className="text-xs font-semibold uppercase tracking-wide">{template.category}</span>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-5">
            <h3 className="text-lg font-bold mb-2 group-hover:text-purple-400 transition-colors">
              {template.name}
            </h3>
            <p className="text-sm text-gray-400 mb-4">{template.description}</p>
            
            {/* Quick Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>Available</span>
              </div>
              <span className="text-purple-400 group-hover:text-purple-300 transition-colors flex items-center gap-1">
                View <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function TemplateShowcase() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const filteredTemplates = activeCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  useEffect(() => {
    // GSAP heading animation
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current.querySelectorAll('.animate-word'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, []);

  return (
    <section id="templates" ref={sectionRef} className="section-padding relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
      
      <div className="container-custom relative">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full glass text-sm text-purple-400 mb-6"
          >
            Template Showcase
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="animate-word inline-block">13</span>{' '}
            <span className="animate-word inline-block">Beautiful</span>{' '}
            <span className="animate-word inline-block gradient-text">Templates</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Each template is meticulously crafted with modern design principles, 
            smooth animations, and production-ready code.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25'
                  : 'glass text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {category}
              {category !== 'All' && (
                <span className="ml-2 text-xs opacity-70">
                  ({templates.filter(t => t.category === category).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredTemplates.map((template, index) => (
              <TemplateCard key={template.id} template={template} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            Want them all? Get the complete bundle and save over $500
          </p>
          <a href="#pricing" className="btn-primary inline-flex items-center gap-2">
            Get All 13 Templates — $249
            <ChevronRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
