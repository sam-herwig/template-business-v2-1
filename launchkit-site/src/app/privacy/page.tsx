'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-foreground"
          >
            Privacy Policy
          </motion.h1>
          <p className="text-foreground-muted mt-2">Last updated: February 2, 2026</p>
        </div>
      </div>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-4xl mx-auto px-6 py-12 prose prose-invert prose-lg"
      >
        <p className="text-foreground-muted text-lg leading-relaxed">
          Crafted Kit LLC (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit craftedkit.io or purchase our products.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">1. Information We Collect</h2>
        
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Information You Provide</h3>
        <ul className="text-foreground-muted space-y-2">
          <li><strong className="text-foreground">Purchase Information:</strong> Name, email address, and payment details when you buy templates</li>
          <li><strong className="text-foreground">Account Information:</strong> Email address if you create an account or join our Discord</li>
          <li><strong className="text-foreground">Communications:</strong> Any information you provide when contacting support</li>
        </ul>

        <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Information Collected Automatically</h3>
        <ul className="text-foreground-muted space-y-2">
          <li><strong className="text-foreground">Usage Data:</strong> Pages visited, time spent, and interactions with our site</li>
          <li><strong className="text-foreground">Device Information:</strong> Browser type, operating system, and device identifiers</li>
          <li><strong className="text-foreground">IP Address:</strong> Used for analytics and fraud prevention</li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">2. How We Use Your Information</h2>
        <ul className="text-foreground-muted space-y-2">
          <li>Process and deliver your purchases</li>
          <li>Send purchase confirmations and product updates</li>
          <li>Provide customer support</li>
          <li>Improve our products and website</li>
          <li>Prevent fraud and abuse</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">3. Payment Processing</h2>
        <p className="text-foreground-muted">
          We use third-party payment processors (such as Stripe or Gumroad) to handle transactions. We do not store your full credit card number on our servers. Payment processors have their own privacy policies governing their use of your information.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">4. Data Sharing</h2>
        <p className="text-foreground-muted mb-4">We do not sell your personal information. We may share data with:</p>
        <ul className="text-foreground-muted space-y-2">
          <li><strong className="text-foreground">Service Providers:</strong> Payment processors, email services, and analytics tools that help us operate</li>
          <li><strong className="text-foreground">Legal Requirements:</strong> When required by law or to protect our rights</li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">5. Cookies and Analytics</h2>
        <p className="text-foreground-muted">
          We use cookies and similar technologies to analyze site traffic and improve your experience. You can control cookies through your browser settings. We may use privacy-focused analytics tools like Plausible or Fathom that do not track you across sites.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">6. Data Retention</h2>
        <p className="text-foreground-muted">
          We retain your information for as long as necessary to provide our services and comply with legal obligations. Purchase records are kept for accounting and tax purposes. You may request deletion of your data by contacting us.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">7. Your Rights</h2>
        <p className="text-foreground-muted mb-4">Depending on your location, you may have the right to:</p>
        <ul className="text-foreground-muted space-y-2">
          <li>Access the personal data we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to or restrict certain processing</li>
          <li>Data portability</li>
        </ul>
        <p className="text-foreground-muted mt-4">
          To exercise these rights, contact us at hello@craftedkit.io.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">8. Security</h2>
        <p className="text-foreground-muted">
          We implement appropriate technical and organizational measures to protect your data. However, no internet transmission is completely secure. We cannot guarantee absolute security.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">9. Children&apos;s Privacy</h2>
        <p className="text-foreground-muted">
          Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">10. Changes to This Policy</h2>
        <p className="text-foreground-muted">
          We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page and updating the &ldquo;Last updated&rdquo; date.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">11. Contact Us</h2>
        <p className="text-foreground-muted">
          If you have questions about this Privacy Policy, contact us at:
        </p>
        <p className="text-foreground-muted mt-4">
          <strong className="text-foreground">Crafted Kit LLC</strong><br />
          Email: hello@craftedkit.io<br />
          Denver, Colorado
        </p>
      </motion.div>
    </main>
  );
}
