export interface Template {
  id: string;
  slug: string;
  name: string;
  category: 'SaaS' | 'Agency' | 'Local' | 'Creative' | 'Coach';
  price: number;
  description: string;
  longDescription: string;
  image: string;
  featured?: boolean;
  demoUrl: string;
  pages: string[];
  features: string[];
  techStack: string[];
}

export const templates: Template[] = [
  {
    id: 'minimal-starter',
    slug: 'minimal-starter',
    name: 'Minimal Starter',
    category: 'SaaS',
    price: 59,
    description: 'Clean, modern SaaS landing with GSAP animations',
    longDescription: 'A beautifully minimal SaaS landing page that focuses on clarity and conversion. Features smooth GSAP scroll animations, a clean hero section, and optimized for fast load times.',
    image: '/templates/minimal-starter.png',
    featured: true,
    demoUrl: 'https://minimal-starter.vercel.app',
    pages: ['Home', 'Features', 'Pricing', 'Contact'],
    features: ['GSAP scroll animations', 'Responsive hero section', 'Feature grid', 'Pricing table', 'Contact form', 'Dark mode'],
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'GSAP'],
  },
  {
    id: 'aurora-starter',
    slug: 'aurora-starter',
    name: 'Aurora Starter',
    category: 'SaaS',
    price: 69,
    description: 'Glassmorphism SaaS with smooth transitions',
    longDescription: 'Stunning glassmorphism design with aurora-inspired gradients and buttery smooth transitions. Perfect for modern SaaS products that want to stand out.',
    image: '/templates/aurora-starter.png',
    featured: true,
    demoUrl: 'https://aurora-starter.vercel.app',
    pages: ['Home', 'Features', 'Pricing', 'About', 'Contact'],
    features: ['Glassmorphism design', 'Aurora gradients', 'Framer Motion animations', 'Interactive pricing', 'Newsletter signup', 'Dark mode'],
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 'saas-starter',
    slug: 'saas-starter',
    name: 'SaaS Starter',
    category: 'SaaS',
    price: 79,
    description: 'Full SaaS marketing site with pricing & blog',
    longDescription: 'The most comprehensive SaaS template in the bundle. Includes everything you need: marketing pages, blog with MDX support, pricing with toggle, testimonials, and more.',
    image: '/templates/saas-starter.png',
    featured: true,
    demoUrl: 'https://saas-starter.vercel.app',
    pages: ['Home', 'Features', 'Pricing', 'Blog', 'Blog Post', 'About', 'Contact', 'Terms', 'Privacy'],
    features: ['Complete marketing site', 'Blog with MDX', 'Pricing toggle', 'Testimonial carousel', 'FAQ accordion', 'Newsletter integration', 'Dark mode'],
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'MDX'],
  },
  {
    id: 'agency-starter',
    slug: 'agency-starter',
    name: 'Agency Starter',
    category: 'Agency',
    price: 69,
    description: 'Bold agency portfolio with case studies',
    longDescription: 'A bold and confident agency template designed to showcase your best work. Features dynamic case study pages, team section, and impressive scroll animations.',
    image: '/templates/agency-starter.png',
    featured: true,
    demoUrl: 'https://agency-starter.vercel.app',
    pages: ['Home', 'Work', 'Case Study', 'About', 'Team', 'Contact'],
    features: ['Case study showcase', 'Project grid', 'Team profiles', 'Client logos', 'Scroll animations', 'Contact form', 'Dark mode'],
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
  },
  {
    id: 'studio-starter',
    slug: 'studio-starter',
    name: 'Studio Starter',
    category: 'Agency',
    price: 69,
    description: 'Refined design studio with project showcase',
    longDescription: 'An elegant and refined template for design studios and creative agencies. Minimalist approach with sophisticated typography and smooth reveal animations.',
    image: '/templates/studio-starter.png',
    demoUrl: 'https://studio-starter.vercel.app',
    pages: ['Home', 'Projects', 'Project Detail', 'Studio', 'Contact'],
    features: ['Project showcase', 'Minimal design', 'Typography focus', 'Image galleries', 'Reveal animations', 'Dark mode'],
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 'typography-starter',
    slug: 'typography-starter',
    name: 'Typography Starter',
    category: 'Creative',
    price: 59,
    description: 'Typography-focused creative portfolio',
    longDescription: 'For designers and creatives who appreciate the art of typography. Large, bold text treatments with creative layouts and smooth text animations.',
    image: '/templates/typography-starter.png',
    demoUrl: 'https://typography-starter.vercel.app',
    pages: ['Home', 'Work', 'About', 'Contact'],
    features: ['Typography-first design', 'Creative layouts', 'Text animations', 'Portfolio grid', 'Dark mode'],
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'GSAP', 'SplitType'],
  },
  {
    id: 'brutalist-starter',
    slug: 'brutalist-starter',
    name: 'Brutalist Starter',
    category: 'Creative',
    price: 59,
    description: 'Edgy brutalist design with raw aesthetics',
    longDescription: 'Break the mold with this edgy brutalist template. Raw, unpolished aesthetics that make a bold statement. Perfect for experimental brands and artists.',
    image: '/templates/brutalist-starter.png',
    demoUrl: 'https://brutalist-starter.vercel.app',
    pages: ['Home', 'Projects', 'Manifesto', 'Contact'],
    features: ['Brutalist aesthetics', 'Bold typography', 'Raw design elements', 'Unconventional layouts', 'Dark mode'],
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 'restaurant-starter',
    slug: 'restaurant-starter',
    name: 'Restaurant Starter',
    category: 'Local',
    price: 59,
    description: 'Elegant restaurant with menu & reservations',
    longDescription: 'An elegant and appetizing template for restaurants and fine dining establishments. Features beautiful menu displays, reservation system integration, and gallery.',
    image: '/templates/restaurant-starter.png',
    demoUrl: 'https://restaurant-starter.vercel.app',
    pages: ['Home', 'Menu', 'About', 'Gallery', 'Reservations', 'Contact'],
    features: ['Menu display', 'Reservation form', 'Photo gallery', 'Hours & location', 'Chef profiles', 'Dark mode'],
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 'brunch-starter',
    slug: 'brunch-starter',
    name: 'Brunch Starter',
    category: 'Local',
    price: 49,
    description: 'Warm cafe/brunch spot template',
    longDescription: 'A warm and inviting template perfect for cafes, brunch spots, and coffee shops. Cozy vibes with beautiful food photography layouts and simple menu display.',
    image: '/templates/brunch-starter.png',
    demoUrl: 'https://brunch-starter.vercel.app',
    pages: ['Home', 'Menu', 'About', 'Contact'],
    features: ['Cozy design', 'Menu sections', 'Instagram feed', 'Location map', 'Hours display', 'Dark mode'],
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 'salon-starter',
    slug: 'salon-starter',
    name: 'Salon Starter',
    category: 'Local',
    price: 59,
    description: 'Luxurious salon/spa with booking',
    longDescription: 'A luxurious and relaxing template for salons, spas, and beauty businesses. Features elegant service displays, staff profiles, and online booking integration.',
    image: '/templates/salon-starter.png',
    demoUrl: 'https://salon-starter.vercel.app',
    pages: ['Home', 'Services', 'Team', 'Gallery', 'Book Now', 'Contact'],
    features: ['Service menu', 'Online booking', 'Staff profiles', 'Before/after gallery', 'Testimonials', 'Dark mode'],
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 'gym-starter',
    slug: 'gym-starter',
    name: 'Gym Starter',
    category: 'Local',
    price: 59,
    description: 'Energetic fitness center template',
    longDescription: 'An energetic and motivating template for gyms, fitness centers, and personal trainers. Bold design with class schedules, membership tiers, and trainer profiles.',
    image: '/templates/gym-starter.png',
    demoUrl: 'https://gym-starter.vercel.app',
    pages: ['Home', 'Classes', 'Trainers', 'Membership', 'Contact'],
    features: ['Class schedule', 'Trainer profiles', 'Membership pricing', 'Facility gallery', 'Trial signup', 'Dark mode'],
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 'contractor-starter',
    slug: 'contractor-starter',
    name: 'Contractor Starter',
    category: 'Local',
    price: 59,
    description: 'Trustworthy home services contractor',
    longDescription: 'A professional and trustworthy template for contractors, plumbers, electricians, and home service businesses. Builds trust with testimonials, certifications, and project galleries.',
    image: '/templates/contractor-starter.png',
    demoUrl: 'https://contractor-starter.vercel.app',
    pages: ['Home', 'Services', 'Projects', 'About', 'Contact', 'Quote'],
    features: ['Service list', 'Project gallery', 'Trust badges', 'Testimonials', 'Quote request form', 'Dark mode'],
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 'coach-starter',
    slug: 'coach-starter',
    name: 'Coach Starter',
    category: 'Coach',
    price: 69,
    description: 'Personal coach/consultant with booking',
    longDescription: 'A personal and inspiring template for coaches, consultants, and mentors. Features about story, service packages, testimonials, and integrated booking.',
    image: '/templates/coach-starter.png',
    demoUrl: 'https://coach-starter.vercel.app',
    pages: ['Home', 'About', 'Services', 'Testimonials', 'Blog', 'Book a Call', 'Contact'],
    features: ['Personal branding', 'Service packages', 'Testimonial showcase', 'Blog section', 'Booking integration', 'Newsletter signup', 'Dark mode'],
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Cal.com'],
  },
];

export const categories = ['All', 'SaaS', 'Agency', 'Local', 'Creative', 'Coach'] as const;
export type Category = (typeof categories)[number];

export function getTemplateBySlug(slug: string): Template | undefined {
  return templates.find((t) => t.slug === slug);
}

export function getRelatedTemplates(template: Template, limit = 4): Template[] {
  return templates
    .filter((t) => t.id !== template.id && t.category === template.category)
    .slice(0, limit)
    .concat(
      templates
        .filter((t) => t.id !== template.id && t.category !== template.category)
        .slice(0, limit)
    )
    .slice(0, limit);
}
