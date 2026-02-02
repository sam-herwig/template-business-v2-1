'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
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
            Terms of Service
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
          Welcome to Crafted Kit. These Terms of Service (&ldquo;Terms&rdquo;) govern your use of craftedkit.io and purchase of our digital products. By using our website or purchasing templates, you agree to these Terms.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">1. Products and Services</h2>
        <p className="text-foreground-muted">
          Crafted Kit sells digital website templates built with Next.js, Sanity CMS, and Tailwind CSS. Templates are delivered as downloadable source code files. You receive access to download links immediately upon successful payment.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">2. License Grant</h2>
        
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Single Template License ($99)</h3>
        <p className="text-foreground-muted mb-4">When you purchase a single template, you receive:</p>
        <ul className="text-foreground-muted space-y-2">
          <li>A non-exclusive, perpetual license to use the template</li>
          <li>Rights to use in <strong className="text-foreground">one (1) commercial project</strong></li>
          <li>Rights to modify and customize the code</li>
          <li>6 months of updates to the template</li>
        </ul>

        <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Complete Bundle License ($299)</h3>
        <p className="text-foreground-muted mb-4">When you purchase the complete bundle, you receive:</p>
        <ul className="text-foreground-muted space-y-2">
          <li>A non-exclusive, perpetual license to all templates</li>
          <li>Rights to use in <strong className="text-foreground">unlimited commercial projects</strong></li>
          <li>Rights to modify and customize all code</li>
          <li>Lifetime updates to all templates</li>
          <li>Access to all future templates at no additional cost</li>
        </ul>

        <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">What You Cannot Do</h3>
        <ul className="text-foreground-muted space-y-2">
          <li><strong className="text-foreground">Resell or redistribute</strong> the templates as-is or as part of a template/theme product</li>
          <li><strong className="text-foreground">Share access</strong> to download links or source files with others</li>
          <li><strong className="text-foreground">Claim ownership</strong> of the original template design or code</li>
          <li><strong className="text-foreground">Use in competing products</strong> that sell website templates</li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">3. Refund Policy</h2>
        <p className="text-foreground-muted">
          We offer a <strong className="text-foreground">14-day money-back guarantee</strong>. If you&apos;re not satisfied with your purchase for any reason, email us within 14 days of purchase and we&apos;ll issue a full refund. No questions asked, no forms to fill out.
        </p>
        <p className="text-foreground-muted mt-4">
          Refund requests after 14 days will be considered on a case-by-case basis but are not guaranteed.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">4. Delivery</h2>
        <p className="text-foreground-muted">
          Digital products are delivered via email immediately after successful payment. You&apos;ll receive download links to access your purchased templates. If you don&apos;t receive your email within 15 minutes, check your spam folder or contact us.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">5. Updates</h2>
        <p className="text-foreground-muted">
          We regularly update templates with bug fixes, security patches, and improvements. Single template purchases include 6 months of updates. Bundle purchases include lifetime updates. Updates are delivered through the same download system.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">6. Support</h2>
        <ul className="text-foreground-muted space-y-2">
          <li><strong className="text-foreground">Bundle customers:</strong> Priority support via Discord and email</li>
          <li><strong className="text-foreground">Single template customers:</strong> Community Discord access</li>
        </ul>
        <p className="text-foreground-muted mt-4">
          Support covers questions about template functionality and setup. We do not provide support for custom modifications, third-party integrations, or general web development questions.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">7. Intellectual Property</h2>
        <p className="text-foreground-muted">
          Crafted Kit retains all intellectual property rights to the templates. Your license grants you rights to use the templates, not ownership of the underlying code, design, or intellectual property.
        </p>
        <p className="text-foreground-muted mt-4">
          Projects you create using our templates are your property. We claim no rights to your final products, content, or customizations.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">8. Disclaimer of Warranties</h2>
        <p className="text-foreground-muted">
          Templates are provided &ldquo;as is&rdquo; without warranty of any kind. While we strive for quality and test our templates thoroughly, we cannot guarantee they will be error-free or suitable for your specific use case. We are not responsible for any damages arising from the use of our templates.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">9. Limitation of Liability</h2>
        <p className="text-foreground-muted">
          To the maximum extent permitted by law, Crafted Kit LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our products. Our total liability shall not exceed the amount you paid for the product.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">10. Account Termination</h2>
        <p className="text-foreground-muted">
          We reserve the right to terminate access to our services for violations of these Terms, including but not limited to: unauthorized redistribution, fraudulent purchases, or abusive behavior.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">11. Changes to Terms</h2>
        <p className="text-foreground-muted">
          We may update these Terms from time to time. Significant changes will be communicated via email or website notice. Continued use of our services after changes constitutes acceptance of the new Terms.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">12. Governing Law</h2>
        <p className="text-foreground-muted">
          These Terms are governed by the laws of the State of Colorado, United States. Any disputes shall be resolved in the courts of Colorado.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">13. Contact</h2>
        <p className="text-foreground-muted">
          Questions about these Terms? Contact us:
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
