# Brunch Starter Template

A warm, inviting restaurant landing page template perfect for cafes, brunch spots, and breakfast restaurants. Features organic typography, earthy colors, and appetizing food photography.

## Features

- 🍳 **Restaurant-Focused Design** - Menu highlights, hours, location, reservations
- 🌿 **Organic Aesthetic** - Warm cream tones with terracotta accents
- 📸 **Instagram Integration** - Photo grid with hover captions
- 📱 **Fully Responsive** - Mobile-first with hamburger menu
- ⚡ **Next.js 14** - App Router with optimized images
- ♿ **Accessible** - Skip links, focus states, reduced motion support
- 🔍 **SEO Optimized** - Restaurant structured data, local SEO ready

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
- ✅ `prefers-reduced-motion` support (disables all animations)
- ✅ Semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`)
- ✅ Proper heading hierarchy (single h1, logical h2-h6)
- ✅ Touch targets minimum 44×44px
- ✅ Alt text on all food images
- ✅ Keyboard navigable throughout

## SEO Features

- ✅ Meta title and description optimized for local search
- ✅ OpenGraph tags for social sharing
- ✅ Twitter Card meta tags
- ✅ JSON-LD structured data (Restaurant schema with hours, location, menu)
- ✅ Semantic HTML landmarks
- ✅ Local business schema for Google Maps

## Sections

1. **Navigation** - Sticky nav with reservation CTA and mobile menu
2. **Hero** - Appetizing hero image with tagline
3. **Features Marquee** - Scrolling feature badges
4. **About** - Restaurant story with founders
5. **Menu** - Highlighted dishes with photos and prices
6. **Location** - Address, hours, contact, map placeholder
7. **Reserve** - Reservation CTA with phone number
8. **Instagram** - Photo grid with hover overlays
9. **Footer** - Links and social media

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Cream | `#FBF7F0` | Main background |
| Peach | `#F5DDD0` | Accent background |
| Terracotta | `#C66B3D` | Primary accent, CTAs |
| Sage | `#8B9E7C` | Secondary accent |
| Brown | `#3D2D1F` | Text, dark elements |

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

### Menu Items
Edit the `menuHighlights` array in `app/page.tsx`:

```tsx
const menuHighlights = [
  {
    name: 'Your Dish Name',
    description: 'Description',
    price: '$XX',
    image: 'image-url',
    tag: 'Featured', // or null
  },
]
```

### Restaurant Info
Update the structured data and content in `app/page.tsx`:
- Address and contact info
- Hours of operation
- Social media links

### Images
Replace placeholder images with your own photos. Use `next/image` for optimization.

## Dependencies

- `next` - React framework
- `react` & `react-dom` - UI library
- `framer-motion` - Animation library
- `tailwindcss` - CSS framework

## Performance Notes

- All images use `next/image` with proper sizing
- Lazy loading for below-fold content
- CSS-only marquee animation
- Minimal JavaScript bundle

## robots.txt

Add to your `public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

## License

MIT - Use freely for personal and commercial projects.
