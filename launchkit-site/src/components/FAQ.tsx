'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "What tech stack do these templates use?",
    answer: "All templates are built with Next.js 14 (App Router), Sanity CMS, Tailwind CSS, and TypeScript. Deployment is optimized for Vercel, but they'll run anywhere Node.js does.",
  },
  {
    question: "Can I use these for client projects?",
    answer: "Absolutely. The single template license covers one commercial project. The bundle license? Unlimited projects. Use them for clients, startups, side hustles—whatever you're building.",
  },
  {
    question: "How do updates work?",
    answer: "When we improve a template (bug fixes, dependency updates, new features), you get access to the updated files. Single templates include 6 months of updates; the bundle includes lifetime updates.",
  },
  {
    question: "Is the code actually clean, or is this another \"starter template\" nightmare?",
    answer: "We're developers too—we've inherited the spaghetti codebases. Every template is modular, well-commented, and follows conventions you'd actually want on your team. No vendor lock-in, no weird abstractions.",
  },
  {
    question: "Do I need to know Sanity CMS?",
    answer: "Helps, but not required. We include documentation, pre-built schemas, and the setup is straightforward. If you can use a CMS, you can use Sanity. And if you hate it, rip it out—the templates work without it too.",
  },
  {
    question: "What if the template doesn't work for my project?",
    answer: "You've got 14 days to decide. If it's not the right fit, email us and we'll refund you—no bureaucracy. We want you building, not regretting.",
  },
  {
    question: "Do you offer support?",
    answer: "Bundle buyers get priority support in our Discord. Single template buyers get community access. We're around, we answer questions, and we don't ghost.",
  },
  {
    question: "Will there be more templates?",
    answer: "Yes. We're actively building. Bundle buyers get every new template automatically—no upsells, no \"premium packs.\"",
  },
];

function FAQItem({ faq, index, isOpen, onToggle }: { 
  faq: typeof faqs[0]; 
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-border last:border-b-0"
    >
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-6 text-left group"
      >
        <span className="text-lg font-medium text-foreground pr-8 group-hover:text-primary transition-colors">
          {faq.question}
        </span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
          isOpen 
            ? 'bg-primary text-white rotate-0' 
            : 'bg-background-subtle text-foreground-muted group-hover:bg-background group-hover:text-foreground'
        }`}>
          {isOpen ? (
            <Minus className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-foreground-muted leading-relaxed pr-12">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

      <div className="container-custom relative">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-muted text-primary text-sm font-semibold mb-6"
            >
              <HelpCircle className="w-4 h-4" />
              FAQ
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Questions?{' '}
              <span className="gradient-text">Answers.</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-foreground-muted"
            >
              Everything you need to know about Crafted Kit
            </motion.p>
          </div>

          {/* FAQ List */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-background-muted rounded-2xl border border-border p-6 md:p-8"
          >
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </motion.div>

          {/* Still have questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-foreground-muted mb-4">
              Still have questions? We&apos;re here to help.
            </p>
            <a
              href="mailto:hello@craftedkit.com"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-hover transition-colors font-medium"
            >
              hello@craftedkit.com
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
