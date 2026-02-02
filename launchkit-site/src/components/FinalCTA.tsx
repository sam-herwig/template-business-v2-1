'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const accentGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate the primary glow effect
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        scale: 1.15,
        opacity: 0.7,
        duration: 3,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      });
    }

    // Animate the accent glow effect
    if (accentGlowRef.current) {
      gsap.to(accentGlowRef.current, {
        scale: 1.2,
        opacity: 0.5,
        duration: 4,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.5,
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none" />
      
      {/* Primary glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/25 rounded-full blur-[150px] pointer-events-none"
      />
      
      {/* Accent glow */}
      <div
        ref={accentGlowRef}
        className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-accent/20 rounded-full blur-[120px] pointer-events-none"
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50 pointer-events-none" />

      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-8 relative"
            style={{ 
              background: 'linear-gradient(135deg, #8B5CF6 0%, #FF6B6B 100%)',
              boxShadow: '0 0 60px rgba(139, 92, 246, 0.5)'
            }}
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Your Weekend Project{' '}
            <span className="gradient-text">Starts Here.</span>
          </h2>

          {/* Subheadline */}
          <p className="text-xl text-foreground-muted mb-10 max-w-2xl mx-auto">
            Stop wasting sprints on scaffolding. Grab a template, ship something real, 
            and finally clear that &quot;someday&quot; list.
          </p>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link 
              href="#templates" 
              className="btn-primary text-lg px-10 py-5 inline-flex items-center gap-3 group"
            >
              Browse Templates
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-foreground-subtle text-sm"
          >
            Trusted by 500+ developers and agencies
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
