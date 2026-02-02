'use client';

import { Sparkles, Twitter, Github, Mail } from 'lucide-react';
import Link from 'next/link';

const footerLinks = {
  product: [
    { name: 'Templates', href: '#templates' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ],
  resources: [
    { name: 'Documentation', href: '#templates' },
    { name: 'Getting Started', href: '#features' },
    { name: 'Support', href: 'mailto:hello@craftedkit.io' },
    { name: 'Discord', href: '#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'License', href: '/terms#license-grant' },
  ],
};

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/craftedkit' },
  { name: 'GitHub', icon: Github, href: 'https://github.com/craftedkit' },
  { name: 'Email', icon: Mail, href: 'mailto:hello@craftedkit.io' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-custom py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">Crafted Kit</span>
            </Link>
            <p className="text-foreground-muted mb-6 max-w-xs leading-relaxed">
              Premium templates, crafted with intention. Built by developers, for developers who ship.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-background-muted border border-border flex items-center justify-center text-foreground-muted hover:text-foreground hover:bg-background-subtle hover:border-border-hover transition-colors"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-foreground-muted hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-foreground-muted hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-foreground-muted hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-foreground-subtle text-sm">
            © {new Date().getFullYear()} Crafted Kit LLC. All rights reserved.
          </p>
          <p className="text-foreground-subtle text-sm">
            Made with ❤️ for developers who ship
          </p>
        </div>
      </div>
    </footer>
  );
}
