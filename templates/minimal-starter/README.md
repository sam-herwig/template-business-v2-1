# Minimal Starter Template

A clean, professional SaaS landing page inspired by modern deployment platforms. Features Bento grid layout, animated prism graphic, and subtle micro-interactions.

## Features

- 🎯 **Vercel-Inspired Design** - Clean, professional, developer-focused
- 📦 **Bento Grid** - Asymmetric card layout for feature highlights
- 🔮 **Animated Prism** - CSS-animated 3D prism hero graphic
- 📱 **Fully Responsive** - Mobile-first with adaptive grids
- ⚡ **Lightweight** - Minimal dependencies, fast loading
- ♿ **Accessible** - Skip links, focus states, reduced motion support
- 🔍 **SEO Optimized** - Structured data and semantic HTML

## Lighthouse Estimates

| Metric | Score |
|--------|-------|
| Performance | 95+ |
| Accessibility | 95+ |
| Best Practices | 95+ |
| SEO | 100 |

## Accessibility Features

- ✅ Skip link to main content
- ✅ Focus-visible styles on all interactive elements
- ✅ `prefers-reduced-motion` support
- ✅ Semantic HTML landmarks
- ✅ Proper heading hierarchy

## SEO Features

- ✅ Meta title and description optimized
- ✅ OpenGraph and Twitter Card tags
- ✅ JSON-LD structured data (SoftwareApplication schema)
- ✅ Semantic HTML structure

## Sections

1. **Navigation** - Fixed nav with product links and CTA
2. **Hero** - Two-column layout with prism graphic
3. **Logo Bar** - Trusted by section with company logos
4. **Bento Grid** - Asymmetric feature cards with animations
5. **Features** - Three-column feature breakdown
6. **CTA** - Simple call-to-action section
7. **Footer** - Multi-column footer with links

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Background | `#fafafa` | Main background |
| Text | `#171717` | Primary text |
| Muted | `#666666` | Secondary text |
| Border | `#eaeaea` | Card borders |
| Accent | Gradient | Pink → Purple → Blue |

## Quick Start

```bash
npm install
npm run dev
```

## Customization

All content is in `app/page.tsx`. Edit:
- Features array
- Logos array
- Bento card content

## Dependencies

- `next`, `react`, `framer-motion`, `tailwindcss`

## Performance Notes

- Lightweight bundle (~100KB gzipped)
- CSS-only prism animation
- Minimal JavaScript
- Reduced motion users get static content

## License

MIT - Use freely for personal and commercial projects.
