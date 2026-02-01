# Studio Starter Template

A modern, dark-themed Bento grid design system for digital agencies and design studios. Features glassmorphism, gradient accents, and responsive animations.

## Features

- 🎨 **Bento Grid Layout** - Modern card-based design system
- ✨ **Glassmorphism** - Frosted glass effects with subtle borders
- 🌈 **Gradient Accents** - Vibrant violet-to-emerald color palette
- 📱 **Fully Responsive** - Mobile-first with hamburger menu
- ⚡ **Framer Motion** - Smooth scroll reveals and interactions
- 🎯 **Next.js 14** - App Router with TypeScript
- ♿ **Accessible** - Skip links, focus states, reduced motion support
- 🔍 **SEO Optimized** - Structured data, meta tags, semantic HTML

## Lighthouse Estimates

| Metric | Score |
|--------|-------|
| Performance | 90+ |
| Accessibility | 95+ |
| Best Practices | 95+ |
| SEO | 100 |

## Accessibility Features

- ✅ Skip link to main content
- ✅ Focus-visible styles on all interactive elements
- ✅ `prefers-reduced-motion` support (disables all animations)
- ✅ Semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`)
- ✅ ARIA labels on icon-only buttons and interactive tiles
- ✅ Proper heading hierarchy (single h1, logical h2-h6)
- ✅ Keyboard accessible Bento tiles with Enter activation
- ✅ Touch targets minimum 44×44px
- ✅ Screen reader friendly with proper landmarks

## SEO Features

- ✅ Meta title and description optimized
- ✅ OpenGraph tags for social sharing
- ✅ Twitter Card meta tags
- ✅ JSON-LD structured data (Organization schema)
- ✅ Semantic HTML landmarks
- ✅ Proper heading hierarchy
- ✅ Robots meta tags

## Sections

1. **Navigation** - Sticky nav with scroll progress bar and mobile menu
2. **Hero** - Animated headline with floating orbs and Bento preview
3. **Clients** - Logo grid in Bento tiles
4. **Services** - Interactive service cards with hover reveals
5. **Work** - Portfolio showcase in Bento grid
6. **Stats** - Animated counter statistics
7. **CTA** - Contact section with email/location tiles
8. **Footer** - Multi-column footer with social links

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Background | `#0A0A0F` | Main dark background |
| Violet | `#8B5CF6` | Primary accent |
| Blue | `#3B82F6` | Secondary accent |
| Emerald | `#10B981` | Tertiary accent |
| Amber | `#F59E0B` | Quaternary accent |
| Pink | `#EC4899` | Quinary accent |

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
  studio: {
    bg: '#0A0A0F',
    violet: '#8B5CF6',
    blue: '#3B82F6',
    // ... customize colors
  },
},
```

### Fonts
The template uses Inter font. Change fonts in `app/layout.tsx`:

```tsx
import { Your_Font } from 'next/font/google'
```

### Content
All content is in `app/page.tsx`. Edit:
- Services array
- Projects array (Work section)
- Stats array
- Client logos array
- Contact information

### Structured Data
Update the JSON-LD schema in `app/page.tsx` with your business details.

## Dependencies

- `next` - React framework
- `react` & `react-dom` - UI library
- `framer-motion` - Animation library
- `tailwindcss` - CSS framework

## Performance Notes

- Lightweight bundle (~120KB gzipped)
- CSS-only animations for scroll progress
- Lazy-loaded sections with `useInView`
- Reduced motion users get static content

## robots.txt

Add to your `public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

## License

MIT - Use freely for personal and commercial projects.
