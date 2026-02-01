'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { GYM } from './data'
import { InstagramIcon, FacebookIcon, YouTubeIcon, MapIcon } from './icons'
import { fadeInLeft, fadeInLeftReduced, fadeInRight, fadeInRightReduced, useVariant } from './animations'

// ═══════════════════════════════════════════════════════════════
// Contact Section Component
// ═══════════════════════════════════════════════════════════════

const SOCIAL_LINKS = [
  { name: 'Instagram', icon: InstagramIcon, href: '#' },
  { name: 'Facebook', icon: FacebookIcon, href: '#' },
  { name: 'YouTube', icon: YouTubeIcon, href: '#' },
] as const

export function Contact() {
  const prefersReducedMotion = useReducedMotion()
  const leftVariants = useVariant(fadeInLeft, fadeInLeftReduced, prefersReducedMotion)
  const rightVariants = useVariant(fadeInRight, fadeInRightReduced, prefersReducedMotion)

  return (
    <section id="contact" className="section-padding bg-dark-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={leftVariants}
          >
            <span className="section-eyebrow">Contact</span>
            <h2 className="section-title mb-10">VISIT US</h2>

            <div className="space-y-8">
              <div className="contact-item">
                <h3 className="contact-label">Location</h3>
                <p className="contact-value">{GYM.address}</p>
              </div>

              <div className="contact-item">
                <h3 className="contact-label">Hours</h3>
                <p className="contact-value">Open 24/7 for members</p>
                <p className="contact-value">Staffed Hours: 6am - 10pm daily</p>
              </div>

              <div className="contact-item">
                <h3 className="contact-label">Contact</h3>
                <p className="contact-value">{GYM.phone}</p>
                <p className="contact-value">{GYM.email}</p>
              </div>
            </div>

            {/* Social links with real SVG icons */}
            <div className="flex gap-4 mt-10">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-12 h-12 rounded-lg bg-dark-800 border border-dark-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary-500 transition-all"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={rightVariants}
            className="bg-dark-800 rounded-2xl h-80 md:h-auto min-h-[400px] flex items-center justify-center relative overflow-hidden border border-dark-700"
          >
            <div className="text-center">
              <MapIcon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <span className="text-gray-500 font-medium">Google Maps Embed</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
