'use client';

import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  ShoppingCart, 
  Check, 
  Code2, 
  FileText, 
  Image as ImageIcon, 
  RefreshCw,
  Monitor,
  Smartphone,
  Sparkles,
  Layers,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { type Template, getRelatedTemplates } from '@/lib/templates';
import Navbar from '@/components/Navbar';

const categoryColors: Record<string, string> = {
  SaaS: 'from-purple-500 to-violet-500',
  Agency: 'from-orange-500 to-red-500',
  Local: 'from-emerald-500 to-teal-500',
  Creative: 'from-pink-500 to-rose-500',
  Coach: 'from-blue-500 to-cyan-500',
};

const techStackIcons: Record<string, string> = {
  'Next.js 14': '▲',
  'TypeScript': 'TS',
  'Tailwind CSS': '🎨',
  'Framer Motion': '✨',
  'GSAP': '🟢',
  'MDX': '📝',
  'SplitType': 'Aa',
  'Cal.com': '📅',
};

interface TemplateDetailProps {
  template: Template;
}

export default function TemplateDetail({ template }: TemplateDetailProps) {
  const relatedTemplates = getRelatedTemplates(template);
  const gumroadUrl = `https://launchkit.gumroad.com/l/${template.slug}`;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[template.category]} opacity-5`} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Category Badge */}
              <span className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-r ${categoryColors[template.category]} text-sm font-semibold uppercase tracking-wide mb-6`}>
                {template.category}
              </span>
              
              {/* Template Name */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {template.name}
              </h1>
              
              {/* Description */}
              <p className="text-xl text-gray-400 mb-6">
                {template.longDescription}
              </p>
              
              {/* Price Badge */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-bold">${template.price}</span>
                <span className="text-gray-500 line-through text-xl">${template.price + 40}</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                  Save ${40}
                </span>
              </div>
              
              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={template.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 glass rounded-xl font-medium hover:bg-white/10 transition-all"
                >
                  <ExternalLink className="w-5 h-5" />
                  Live Demo
                </a>
                <a
                  href={gumroadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Buy Template — ${template.price}
                </a>
              </div>
            </motion.div>
            
            {/* Right: Browser Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden glass p-2">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-900/50 rounded-t-xl">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-800 rounded-lg px-4 py-1.5 text-sm text-gray-400 text-center">
                      {template.demoUrl}
                    </div>
                  </div>
                </div>
                {/* Preview area */}
                <div className="aspect-[16/10] bg-gradient-to-br from-gray-900 to-gray-800 rounded-b-xl flex items-center justify-center">
                  <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${categoryColors[template.category]} flex items-center justify-center`}>
                    <span className="text-5xl font-bold">{template.name[0]}</span>
                  </div>
                </div>
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-sm font-semibold shadow-lg shadow-purple-500/25">
                ✨ Production Ready
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Screenshots Gallery */}
      <section className="py-20 relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Preview Gallery</h2>
            <p className="text-gray-400">See how {template.name} looks across devices</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Desktop Preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2 glass rounded-2xl p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <Monitor className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-400">Desktop</span>
              </div>
              <div className="aspect-[16/10] bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${categoryColors[template.category]} flex items-center justify-center`}>
                    <span className="text-3xl font-bold">{template.name[0]}</span>
                  </div>
                  <p className="text-gray-500">Desktop Preview</p>
                </div>
              </div>
            </motion.div>
            
            {/* Mobile Preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <Smartphone className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-400">Mobile</span>
              </div>
              <div className="aspect-[9/16] bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex items-center justify-center max-h-80 mx-auto">
                <div className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br ${categoryColors[template.category]} flex items-center justify-center`}>
                    <span className="text-xl font-bold">{template.name[0]}</span>
                  </div>
                  <p className="text-gray-500 text-sm">Mobile</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features & Pages */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
        
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Pages Included */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold">Pages Included</h3>
              </div>
              <p className="text-gray-400 mb-6">{template.pages.length} beautifully designed pages</p>
              <div className="grid grid-cols-2 gap-3">
                {template.pages.map((page, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-300">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>{page}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold">Features</h3>
              </div>
              <p className="text-gray-400 mb-6">Everything you need to launch</p>
              <div className="space-y-3">
                {template.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-300">
                    <div className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
                      <Check className="w-4 h-4" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tech Stack</h2>
            <p className="text-gray-400">Built with modern, production-ready technologies</p>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {template.techStack.map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl px-6 py-4 flex items-center gap-3 hover:bg-white/10 transition-colors"
              >
                <span className="text-2xl">{techStackIcons[tech] || '📦'}</span>
                <span className="font-medium">{tech}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" />
        
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What&apos;s Included</h2>
            <p className="text-gray-400">Everything you need to launch your project</p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Code2, title: 'Source Code', desc: 'Clean, commented TypeScript code' },
              { icon: FileText, title: 'Documentation', desc: 'Detailed README with setup guide' },
              { icon: ImageIcon, title: 'Screenshots', desc: 'High-quality preview images' },
              { icon: RefreshCw, title: 'Lifetime Updates', desc: 'Free updates forever' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 text-center hover:bg-white/5 transition-colors"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[template.category]} opacity-20`} />
            <div className="absolute inset-0 bg-black/60" />
            
            <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Ready to launch with {template.name}?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Get started in minutes with production-ready code and beautiful design.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href={gumroadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center justify-center gap-2 text-lg px-8 py-4"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Buy Template — ${template.price}
                </a>
                <Link
                  href="/#pricing"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 glass rounded-xl font-medium hover:bg-white/10 transition-all text-lg"
                >
                  <Zap className="w-5 h-5" />
                  Get Full Bundle — $249
                </Link>
              </div>
              
              <p className="mt-6 text-gray-500 text-sm">
                One-time purchase • Instant download • Lifetime updates
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Templates */}
      {relatedTemplates.length > 0 && (
        <section className="py-20">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Related Templates</h2>
              <p className="text-gray-400">You might also like these</p>
            </motion.div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedTemplates.map((related, i) => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={`/templates/${related.slug}`}
                    className="block glass rounded-2xl overflow-hidden hover:bg-white/5 transition-all group"
                  >
                    {/* Preview */}
                    <div className="aspect-[16/10] bg-gradient-to-br from-gray-900 to-gray-800 relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[related.category]} opacity-20`} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categoryColors[related.category]} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <span className="text-2xl font-bold">{related.name[0]}</span>
                        </div>
                      </div>
                      {/* Price badge */}
                      <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-bold">
                        ${related.price}
                      </div>
                    </div>
                    
                    {/* Info */}
                    <div className="p-4">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${categoryColors[related.category]} mb-2`}>
                        {related.category}
                      </span>
                      <h3 className="font-semibold group-hover:text-purple-400 transition-colors">
                        {related.name}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                        {related.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              ← Back to LaunchKit
            </Link>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} LaunchKit. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
