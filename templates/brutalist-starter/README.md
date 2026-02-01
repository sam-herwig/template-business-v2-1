# Brutalist Starter Template

A bold, unapologetic neo-brutalist landing page template for creative agencies. Features hard shadows, high contrast colors, and an animated Truchet tiles shader background.

## Features

- 🎨 **Neo-Brutalist Design** - Bold colors, thick borders, offset shadows
- ✨ **Truchet Tiles Shader** - Animated procedural background using Three.js/R3F
- 🎭 **Framer Motion Animations** - Smooth scroll reveals and hover effects
- 📱 **Fully Responsive** - Mobile-first with hamburger menu
- ⚡ **Next.js 14** - App Router with TypeScript
- 🎯 **Tailwind CSS** - Utility-first styling with custom brutal theme
- ♿ **Accessible** - Skip links, focus states, reduced motion support
- 🔍 **SEO Optimized** - Structured data, meta tags, semantic HTML

## Lighthouse Estimates

| Metric | Score |
|--------|-------|
| Performance | ~75-85* |
| Accessibility | 95+ |
| Best Practices | 95+ |
| SEO | 100 |

*Performance impacted by Three.js bundle (~150KB gzipped). Consider lazy-loading the Work section or using a static fallback for users who prefer reduced motion.

## Accessibility Features

- ✅ Skip link to main content
- ✅ Focus-visible styles on all interactive elements
- ✅ `prefers-reduced-motion` support (disables all animations)
- ✅ Semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`)
- ✅ ARIA labels on icon-only buttons
- ✅ Proper heading hierarchy (single h1, logical h2-h6)
- ✅ Color contrast meets WCAG AA (4.5:1 for text)
- ✅ Touch targets minimum 44×44px
- ✅ Keyboard navigable throughout
- ✅ Screen reader friendly with proper landmarks

## SEO Features

- ✅ Meta title and description optimized
- ✅ OpenGraph tags for social sharing
- ✅ Twitter Card meta tags
- ✅ JSON-LD structured data (Organization schema)
- ✅ Semantic HTML landmarks
- ✅ Proper heading hierarchy
- ✅ Image alt text on all images
- ✅ Robots meta tags
- ✅ Canonical URL ready

## Sections

1. **Navigation** - Fixed nav with mobile hamburger menu
2. **Hero** - Bold headline with floating geometric shapes
3. **Marquee** - Infinite scrolling text strip
4. **Services** - Grid of service cards with hover effects
5. **Portfolio** - Project showcase with Truchet shader background
6. **Testimonials** - Client quotes in brutal card style
7. **CTA** - Call-to-action section
8. **Footer** - Multi-column footer with structured contact info

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Background | `#FFFEF5` | Main background (warm off-white) |
| Black | `#1a1a1a` | Text, borders, shadows |
| Yellow | `#FFE600` | Primary accent |
| Pink | `#FF5CAA` | Secondary accent |
| Blue | `#3B82F6` | Tertiary accent |
| Green | `#22C55E` | Quaternary accent |
| Purple | `#A855F7` | Quinary accent |
| Orange | `#FF6B35` | Senary accent |

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Customization

### Brand Colors
Edit `tailwind.config.js` to change the color palette:

```js
colors: {
  brutal: {
    bg: '#FFFEF5',
    black: '#1a1a1a',
    yellow: '#FFE600',
    // ... customize colors
  },
},
```

### Fonts
The template uses:
- **Space Grotesk** - Display/headings
- **Inter** - Body text

Change fonts in `app/layout.tsx`:

```tsx
import { Your_Font } from 'next/font/google'
```

### Content
All content is in `app/page.tsx`. Edit:
- Services array
- Projects array
- Testimonials array
- Contact information

### Structured Data
Update the JSON-LD schema in `app/page.tsx` with your business details:
- Organization name and description
- Address
- Social media links
- Contact information

## Dependencies

- `next` - React framework
- `react` & `react-dom` - UI library
- `framer-motion` - Animation library
- `@react-three/fiber` - React renderer for Three.js
- `three` - 3D graphics library
- `tailwindcss` - CSS framework

## Performance Notes

- The Truchet shader runs on GPU, minimal CPU impact
- Lazy-loaded sections with `useInView`
- Images use `next/image` optimization
- Consider removing Three.js section for simpler sites (~150KB savings)
- Reduced motion users get a static experience (no animations)

## robots.txt

Add to your `public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

## License

MIT - Use freely for personal and commercial projects.
