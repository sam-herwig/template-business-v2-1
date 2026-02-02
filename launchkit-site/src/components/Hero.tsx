'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';

const trustBadges = [
  'Next.js 14',
  'Sanity CMS',
  'Tailwind CSS',
  'TypeScript',
  'Vercel Ready',
];

const previewTemplates = [
  { name: 'SaaS Starter', category: 'SaaS', gradient: 'from-primary via-purple-500 to-accent' },
  { name: 'Agency Pro', category: 'Agency', gradient: 'from-accent via-orange-500 to-amber-500' },
  { name: 'Restaurant', category: 'Local', gradient: 'from-secondary via-teal-500 to-emerald-500' },
];

export default function Hero() {
  const browserRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [activePreview, setActivePreview] = useState(0);

  useEffect(() => {
    // GSAP floating animation for browser mockup
    if (browserRef.current) {
      gsap.to(browserRef.current, {
        y: 12,
        duration: 3,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      });
    }

    // Glow pulse animation
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        scale: 1.1,
        opacity: 0.6,
        duration: 2.5,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      });
    }

    // Auto-rotate previews
    const interval = setInterval(() => {
      setActivePreview((prev) => (prev + 1) % previewTemplates.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern" />
      
      {/* Primary glow - top center */}
      <div 
        ref={glowRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/30 rounded-full blur-[120px] pointer-events-none" 
      />
      
      {/* Accent glow - bottom right */}
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[600px] h-[400px] bg-accent/20 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Secondary glow - left */}
      <div className="absolute top-1/2 left-0 -translate-x-1/2 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="container-custom relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-muted border border-primary/20 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-primary">17 Premium Templates</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 text-balance">
              Ship in Days,{' '}
              <span className="gradient-text">Not Months.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-foreground-muted mb-8 max-w-xl leading-relaxed">
              Premium Next.js templates with Sanity CMS baked in. Beautiful, responsive, 
              dark mode ready—so you can skip the setup and get straight to the good part.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="#templates" className="btn-primary group">
                Browse Templates
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link href="#templates" className="btn-secondary group">
                <Play className="w-4 h-4 mr-2 text-primary" />
                View Live Demos
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={badge}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.08 }}
                  className="px-3 py-1.5 rounded-full bg-background-muted border border-border text-sm text-foreground-muted font-medium"
                >
                  {badge}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Browser Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:pl-8"
          >
            <div ref={browserRef} className="relative">
              {/* Glow Effect behind browser */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/10 to-secondary/20 rounded-3xl blur-2xl opacity-60" />
              
              {/* Browser Window */}
              <div className="relative bg-background-muted/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                {/* Browser Header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-background-subtle/50">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-accent/80" />
                    <div className="w-3 h-3 rounded-full bg-warning/80" />
                    <div className="w-3 h-3 rounded-full bg-success/80" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="w-full max-w-xs mx-auto px-4 py-1.5 rounded-lg bg-background text-sm text-foreground-subtle text-center font-mono">
                      craftedkit.com/templates
                    </div>
                  </div>
                </div>

                {/* Browser Content - Template Preview */}
                <div className="relative aspect-[16/10] bg-background">
                  {previewTemplates.map((template, index) => (
                    <motion.div
                      key={template.name}
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: activePreview === index ? 1 : 0,
                        scale: activePreview === index ? 1 : 0.98,
                      }}
                      transition={{ duration: 0.5 }}
                      className={`absolute inset-0 bg-gradient-to-br ${template.gradient} flex items-center justify-center`}
                    >
                      <div className="text-center p-8">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                          <span className="text-4xl font-bold text-white">{template.name[0]}</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-white">{template.name}</h3>
                        <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white/90 text-sm font-medium">
                          {template.category}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Template Indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {previewTemplates.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActivePreview(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          activePreview === index 
                            ? 'bg-white w-8' 
                            : 'bg-white/30 w-2 hover:bg-white/50'
                        }`}
                        aria-label={`View template ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Card - Top Right */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 md:-right-8 p-4 bg-background-muted/90 backdrop-blur-xl rounded-xl border border-white/10 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Production Ready</p>
                    <p className="text-xs text-foreground-muted">TypeScript + SEO</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card - Bottom Left */}
              <motion.div
                animate={{ y: [8, -8, 8] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-4 md:-left-8 p-4 bg-background-muted/90 backdrop-blur-xl rounded-xl border border-white/10 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="text-xl">🚀</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Deploy in Minutes</p>
                    <p className="text-xs text-foreground-muted">Vercel, Netlify, anywhere</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
