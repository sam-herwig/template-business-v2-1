import type { Product, HeroContent, Feature, Stat, PricingPlan, Testimonial, FAQItem } from './types'

// ═══════════════════════════════════════════════════════════════
// DATA CONSTANTS
// ═══════════════════════════════════════════════════════════════

export const PRODUCT: Product = {
  name: "LaunchKit",
  tagline: "Build Products Faster Than Ever Before",
  description: "The all-in-one platform that helps teams ship better products. From idea to launch in days, not months.",
}

export const HERO_CONTENT: HeroContent = {
  badge: 'Now in Public Beta',
  headline: 'Build Products Faster',
  headlineHighlight: 'Than Ever Before',
  subheadline: 'The all-in-one platform that helps teams ship better products. From idea to launch in days, not months.',
  primaryCta: 'Start Free Trial',
  secondaryCta: 'Watch Demo',
}

export const FEATURES: Feature[] = [
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Built on modern infrastructure that scales automatically. Your users will never experience slow load times.',
  },
  {
    icon: '🔒',
    title: 'Enterprise Security',
    description: 'Bank-level encryption and SOC 2 compliance. Your data is protected with industry-leading security.',
  },
  {
    icon: '🔄',
    title: 'Real-time Sync',
    description: 'Changes propagate instantly across all devices. True collaboration without conflicts or delays.',
  },
  {
    icon: '📊',
    title: 'Advanced Analytics',
    description: 'Deep insights into user behavior and engagement. Make data-driven decisions with confidence.',
  },
  {
    icon: '🔌',
    title: 'API First',
    description: 'Integrate with any tool in your stack. RESTful API with comprehensive docs and SDKs.',
  },
  {
    icon: '🎨',
    title: 'Fully Customizable',
    description: 'Make it yours with themes, plugins, and custom workflows. No limits on what you can build.',
  },
]

export const STATS: Stat[] = [
  { number: '10000', label: 'Teams', suffix: '+' },
  { number: '99.9', label: 'Uptime', suffix: '%' },
  { number: '4.9', label: 'Rating', suffix: '/5' },
  { number: '150', label: 'Countries', suffix: '+' },
]

export const PRICING: PricingPlan[] = [
  {
    name: 'Starter',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out the platform',
    features: ['Up to 3 projects', '1 team member', 'Basic analytics', 'Community support', '1GB storage'],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For growing teams and businesses',
    features: ['Unlimited projects', 'Up to 10 team members', 'Advanced analytics', 'Priority support', 'Custom integrations', '50GB storage'],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large organizations',
    features: ['Everything in Pro', 'Unlimited team members', 'SSO & SAML', 'Dedicated support', 'Custom SLA', 'On-premise option'],
    cta: 'Contact Sales',
    popular: false,
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "This product transformed how our team works. We shipped 3x more features in the same amount of time. It's become essential to our workflow.",
    author: 'Sarah Chen',
    role: 'CTO at TechCorp',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    company: 'TechCorp',
  },
  {
    quote: "The best tool we've ever used for product development. Simple, powerful, and actually enjoyable to use. Our whole team loves it.",
    author: 'Marcus Johnson',
    role: 'Product Lead at Startup',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    company: 'Startup',
  },
  {
    quote: "Finally, a platform that gets out of your way and lets you focus on building great products. Worth every penny.",
    author: 'Emily Rodriguez',
    role: 'Founder at DevShop',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    company: 'DevShop',
  },
]

export const FAQ: FAQItem[] = [
  {
    question: 'How does the free trial work?',
    answer: 'Start with our Pro plan free for 14 days. No credit card required. If you love it, choose a plan that fits your needs. If not, you can downgrade to our free Starter plan anytime.',
  },
  {
    question: 'Can I switch plans later?',
    answer: 'Absolutely. Upgrade or downgrade anytime with just a few clicks. Changes take effect immediately, and we prorate billing automatically.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes. We use bank-level encryption (AES-256), are SOC 2 Type II compliant, and never sell your data. Your privacy and security are our top priorities.',
  },
  {
    question: 'Do you offer refunds?',
    answer: "Yes. If you're not satisfied within 30 days, we'll refund your payment in full. No questions asked, no hoops to jump through.",
  },
  {
    question: 'What integrations do you support?',
    answer: 'We integrate with 100+ tools including Slack, GitHub, Jira, Figma, Notion, and more. Our API also allows custom integrations with any tool in your stack.',
  },
]
