'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Eye, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { templates, categories, type Category, type Template } from '@/lib/templates';

const categoryColors: Record<string, string> = {
  SaaS: 'from-primary to-purple-600',
  Agency: 'from-accent to-orange-500',
  Local: 'from-success to-teal-500',
  Creative: 'from-pink-500 to-rose-500',
  Coach: 'from-secondary to-cyan-400',
  Professional: 'from-blue-500 to-indigo-500',
  Education: 'from-amber-500 to-yellow-500',
};

function TemplateCard({ template, index }: { template: Template; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Link href={`/templates/${template.slug}`} className="block h-full">
        <article className="relative h-full bg-background-muted rounded-xl border border-border overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
          {/* Image Container */}
          <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-background-subtle to-background-muted">
            {/* Gradient placeholder */}
            <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[template.category]} opacity-20`} />
            
            {/* Template preview placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
              <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 border border-white/10">
                <span className="text-2xl font-bold text-white">{template.name[0]}</span>
              </div>
              <span className="text-sm font-medium text-white/70">{template.name}</span>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
              <span className="flex items-center gap-2 px-4 py-2 bg-white text-background rounded-full font-semibold text-sm">
                <Eye className="w-4 h-4" />
                Preview
              </span>
            </div>

            {/* Price Badge */}
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-background/80 backdrop-blur-sm border border-white/10">
              <span className="text-sm font-bold text-foreground">${template.price}</span>
            </div>

            {/* Category Badge */}
            <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-gradient-to-r ${categoryColors[template.category]}`}>
              <span className="text-xs font-semibold uppercase tracking-wide text-white">{template.category}</span>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-5">
            <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
              {template.name}
            </h3>
            <p className="text-sm text-foreground-muted line-clamp-2 mb-4">{template.description}</p>
            
            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-0.5 bg-primary-muted text-primary text-xs font-medium rounded">
                Next.js
              </span>
              <span className="px-2 py-0.5 bg-secondary-muted text-secondary text-xs font-medium rounded">
                Sanity
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

export default function TemplateShowcase() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const sectionRef = useRef<HTMLElement>(null);

  const filteredTemplates = activeCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  return (
    <section id="templates" ref={sectionRef} className="section-padding relative">
      {/* Background */}
      <div className="absolute inset-0 section-gradient pointer-events-none" />
      
      <div className="container-custom relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-primary-muted text-primary text-sm font-semibold mb-6"
          >
            Template Collection
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            17 Templates.{' '}
            <span className="gradient-text">Zero Compromises.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-foreground-muted max-w-2xl mx-auto"
          >
            Every template is production-ready out of the box—not a glorified starter kit. 
            Multi-page layouts, responsive down to mobile, dark mode included.
          </motion.p>
        </div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'bg-background-muted text-foreground-muted border border-border hover:text-foreground hover:border-border-hover'
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
        </motion.div>

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
          <p className="text-foreground-muted mb-6">
            Want them all? Get the complete bundle and save over $1,400
          </p>
          <Link href="#pricing" className="btn-primary inline-flex items-center gap-2">
            Get All 17 Templates — $299
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
