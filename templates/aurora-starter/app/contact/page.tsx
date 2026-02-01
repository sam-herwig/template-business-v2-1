'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PageLayout } from '@/components/page-layout'
import { SectionHeader } from '@/components/ui/section-header'
import { GlassCard } from '@/components/ui/glass-card'
import { 
  MessageSquare, Mail, Phone, MapPin, 
  FileText, Video, Lightbulb, Send, CheckCircle 
} from 'lucide-react'

// ═══════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════
const CONTACT_OPTIONS = [
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'Live Chat',
    description: 'Get instant help from our AI or support team.',
    action: 'Start Chat',
    available: 'Available 24/7'
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: 'Email',
    description: 'Send us a detailed message anytime.',
    action: 'hello@lumina.design',
    available: 'Response within 24h'
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: 'Phone',
    description: 'Talk to sales for enterprise inquiries.',
    action: '+1 (888) 555-0123',
    available: 'Mon-Fri, 9am-6pm PT'
  },
]

const OFFICES = [
  { city: 'San Francisco', subtitle: 'Headquarters', address: '123 Design Street, CA 94105' },
  { city: 'London', subtitle: 'Europe', address: '456 Tech Lane, EC2A 4BX' },
  { city: 'Singapore', subtitle: 'Asia Pacific', address: '789 Innovation Way, 018956' },
]

const RESOURCES = [
  { icon: <FileText className="w-6 h-6" />, title: 'Documentation', description: 'Browse our guides and API docs.', link: '#' },
  { icon: <Video className="w-6 h-6" />, title: 'Tutorials', description: 'Learn with video walkthroughs.', link: '#' },
  { icon: <Lightbulb className="w-6 h-6" />, title: 'Feature Requests', description: 'Share ideas for new features.', link: '#' },
]

const TOPICS = [
  'General Inquiry',
  'Technical Support',
  'Sales & Pricing',
  'Partnership',
  'Press & Media',
  'Careers',
]

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════
function ContactOption({ option, index }: { option: typeof CONTACT_OPTIONS[0], index: number }) {
  return (
    <GlassCard delay={index * 0.1} className="p-6 text-center">
      <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-aurora-indigo/20 flex items-center justify-center text-aurora-indigo">
        {option.icon}
      </div>
      <h3 className="font-bold text-lg mb-2">{option.title}</h3>
      <p className="text-white/60 text-sm mb-4">{option.description}</p>
      <div className="font-medium text-aurora-indigo mb-1">{option.action}</div>
      <div className="text-xs text-white/40">{option.available}</div>
    </GlassCard>
  )
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    topic: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (submitted) {
    return (
      <motion.div 
        className="text-center py-16"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
        <p className="text-white/60">We&apos;ll get back to you within 24 hours.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium mb-2">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="aurora-input"
            placeholder="John"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium mb-2">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="aurora-input"
            placeholder="Doe"
            required
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="aurora-input"
          placeholder="john@example.com"
          required
        />
      </div>
      
      <div>
        <label htmlFor="topic" className="block text-sm font-medium mb-2">Topic</label>
        <select
          id="topic"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          className="aurora-input cursor-pointer"
          required
        >
          <option value="">Select a topic...</option>
          {TOPICS.map(topic => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="aurora-input min-h-[150px] resize-y"
          placeholder="Tell us how we can help..."
          required
        />
      </div>
      
      <motion.button 
        type="submit"
        className="btn-primary w-full justify-center"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Send Message
        <Send className="w-5 h-5" />
      </motion.button>
      
      <p className="text-center text-sm text-white/50">
        We typically respond within 24 hours.
      </p>
    </form>
  )
}

// ═══════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════
export default function ContactPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="page-hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">GET IN TOUCH</span>
        </motion.div>
        <motion.h1 
          className="text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-tight tracking-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          We&apos;d love to
          <br />
          <span className="gradient-text">hear from you</span>
        </motion.h1>
        <motion.p 
          className="text-xl text-white/80 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Whether you have a question, feedback, or just want to say hi — our team is here to help.
        </motion.p>
      </section>

      {/* Contact Options */}
      <section className="relative z-10 py-8 px-4 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {CONTACT_OPTIONS.map((option, i) => (
            <ContactOption key={option.title} option={option} index={i} />
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative z-10 py-24 px-4 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <motion.div 
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <GlassCard hover={false} className="p-8 md:p-10">
                <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                <ContactForm />
              </GlassCard>
            </motion.div>
            
            {/* Info Sidebar */}
            <motion.div 
              className="lg:col-span-2 space-y-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {/* Offices */}
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-aurora-indigo" />
                  Our Offices
                </h3>
                <div className="space-y-4">
                  {OFFICES.map((office) => (
                    <div key={office.city} className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="font-semibold">{office.city}</div>
                      <div className="text-sm text-aurora-indigo">{office.subtitle}</div>
                      <div className="text-sm text-white/50 mt-1">{office.address}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Map Placeholder */}
              <div 
                className="aspect-video rounded-2xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(129, 140, 248, 0.2) 0%, rgba(192, 132, 252, 0.1) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <MapPin className="w-10 h-10 text-white/30" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Support Resources */}
      <section className="relative z-10 py-24 px-4 md:px-16 border-t border-white/10">
        <SectionHeader 
          title="Looking for something else?"
          description="Explore our self-service resources."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {RESOURCES.map((resource, i) => (
            <motion.a
              key={resource.title}
              href={resource.link}
              className="block group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-6 text-center h-full">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-white/10 flex items-center justify-center text-aurora-indigo group-hover:bg-aurora-indigo/20 transition-colors">
                  {resource.icon}
                </div>
                <h3 className="font-bold mb-2 group-hover:text-aurora-indigo transition-colors">{resource.title}</h3>
                <p className="text-white/60 text-sm">{resource.description}</p>
              </GlassCard>
            </motion.a>
          ))}
        </div>
      </section>
    </PageLayout>
  )
}
