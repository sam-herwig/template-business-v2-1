# Crafted Kit — Brand Identity System

> **Version:** 1.0  
> **Last Updated:** February 2, 2026  
> **Tagline:** *Premium templates, crafted with intention.*

---

## 1. Brand Personality

### Core Adjectives
1. **Bold** — We're confident, not timid. Every design choice is deliberate.
2. **Energetic** — Movement, life, dynamism. Never static or boring.
3. **Precise** — Developer-quality attention to detail.
4. **Premium** — Quality over quantity. Curated, not crowded.
5. **Approachable** — Expert-level work that doesn't feel intimidating.

### Voice & Tone
| Context | Tone | Example |
|---------|------|---------|
| Headlines | Punchy, confident | "Ship faster. Look better." |
| Body copy | Clear, helpful | "Every template is production-ready with TypeScript, SEO optimization, and accessibility baked in." |
| CTAs | Action-oriented, urgent | "Start building" / "Get this template" |
| Error states | Friendly, human | "Hmm, that didn't work. Let's try again." |

### What Makes Us Different
| ThemeForest/Envato | Crafted Kit |
|--------------------|-------------|
| Overwhelming choice | Curated collection |
| Variable quality | Every template is premium |
| Outdated tech stacks | Modern: Next.js + Sanity |
| Generic support | Direct creator access |
| Cluttered UI | Clean, focused experience |

---

## 2. Color Palette

### Philosophy
Dark mode base with **electric accents** — premium feel for developers with energy that converts. The palette balances professionalism with boldness.

### Primary Colors

```css
/* Dark Foundation */
--background:        #0A0A0F;     /* Deep space black */
--background-subtle: #12121A;     /* Elevated surfaces */
--background-muted:  #1A1A24;     /* Cards, modals */

/* Text */
--foreground:        #FAFAFA;     /* Primary text */
--foreground-muted:  #A1A1AA;     /* Secondary text */
--foreground-subtle: #71717A;     /* Tertiary/disabled */
```

### Accent Colors

```css
/* Electric Violet — Primary Brand Color */
--primary:           #8B5CF6;     /* Main actions, links */
--primary-hover:     #A78BFA;     /* Hover state */
--primary-muted:     #8B5CF620;   /* Backgrounds, tints */

/* Hot Coral — Conversion & Energy */
--accent:            #FF6B6B;     /* CTAs, badges, urgency */
--accent-hover:      #FF8787;     /* Hover state */
--accent-muted:      #FF6B6B15;   /* Subtle backgrounds */

/* Electric Cyan — Secondary Accent */
--secondary:         #06B6D4;     /* Info, highlights */
--secondary-hover:   #22D3EE;     /* Hover state */
--secondary-muted:   #06B6D415;   /* Backgrounds */
```

### Semantic Colors

```css
/* Status */
--success:           #10B981;     /* Emerald */
--warning:           #F59E0B;     /* Amber */
--error:             #EF4444;     /* Red */
--info:              #06B6D4;     /* Cyan */

/* Borders & Dividers */
--border:            #27272A;     /* Default border */
--border-hover:      #3F3F46;     /* Interactive borders */
--ring:              #8B5CF680;   /* Focus rings */
```

### Tailwind Config

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0A0A0F',
          subtle: '#12121A',
          muted: '#1A1A24',
        },
        foreground: {
          DEFAULT: '#FAFAFA',
          muted: '#A1A1AA',
          subtle: '#71717A',
        },
        primary: {
          DEFAULT: '#8B5CF6',
          hover: '#A78BFA',
          muted: 'rgba(139, 92, 246, 0.12)',
        },
        accent: {
          DEFAULT: '#FF6B6B',
          hover: '#FF8787',
          muted: 'rgba(255, 107, 107, 0.08)',
        },
        secondary: {
          DEFAULT: '#06B6D4',
          hover: '#22D3EE',
          muted: 'rgba(6, 182, 212, 0.08)',
        },
      },
    },
  },
};
```

### Gradient Presets

```css
/* Hero gradient — signature look */
.gradient-hero {
  background: radial-gradient(
    ellipse 80% 50% at 50% -20%,
    rgba(139, 92, 246, 0.3),
    transparent
  );
}

/* CTA button gradient */
.gradient-cta {
  background: linear-gradient(135deg, #8B5CF6 0%, #FF6B6B 100%);
}

/* Card shine effect */
.gradient-shine {
  background: linear-gradient(
    115deg,
    transparent 0%,
    rgba(255, 255, 255, 0.05) 50%,
    transparent 100%
  );
}

/* Text gradient for headlines */
.gradient-text {
  background: linear-gradient(90deg, #FAFAFA 0%, #8B5CF6 50%, #FF6B6B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## 3. Typography

### Font Stack

**Headings:** [Satoshi](https://www.fontshare.com/fonts/satoshi) (or fallback: Inter)
- Geometric, modern, confident
- Heavier weights for impact

**Body:** [Inter](https://fonts.google.com/specimen/Inter)
- Exceptional legibility
- Great for long-form and UI

**Code:** [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)
- For code snippets and technical content

### Import

```html
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

<!-- Satoshi from Fontshare (self-host recommended) -->
```

### Type Scale

| Name | Size | Line Height | Weight | Use Case |
|------|------|-------------|--------|----------|
| `display` | 72px / 4.5rem | 1.1 | 700 | Hero headlines |
| `h1` | 48px / 3rem | 1.2 | 700 | Page titles |
| `h2` | 36px / 2.25rem | 1.25 | 600 | Section headers |
| `h3` | 24px / 1.5rem | 1.3 | 600 | Subsections |
| `h4` | 20px / 1.25rem | 1.4 | 600 | Card titles |
| `body-lg` | 18px / 1.125rem | 1.6 | 400 | Lead paragraphs |
| `body` | 16px / 1rem | 1.6 | 400 | Body text |
| `body-sm` | 14px / 0.875rem | 1.5 | 400 | Secondary text |
| `caption` | 12px / 0.75rem | 1.4 | 500 | Labels, badges |

### Tailwind Typography

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'h1': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['2.25rem', { lineHeight: '1.25', fontWeight: '600' }],
        'h3': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h4': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '500' }],
      },
    },
  },
};
```

---

## 4. Visual Motifs

### Signature Elements

#### 1. Glow Effects
Soft, colorful glows behind key elements create depth and energy.

```css
/* Primary glow */
.glow-primary {
  box-shadow: 0 0 60px rgba(139, 92, 246, 0.4);
}

/* Accent glow */
.glow-accent {
  box-shadow: 0 0 60px rgba(255, 107, 107, 0.3);
}

/* Tailwind */
/* shadow-[0_0_60px_rgba(139,92,246,0.4)] */
```

#### 2. Glass Morphism (Subtle)
Used sparingly for navigation and floating elements.

```css
.glass {
  background: rgba(26, 26, 36, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

/* Tailwind */
/* bg-background-muted/80 backdrop-blur-xl border border-white/[0.06] */
```

#### 3. Grain Texture
Subtle noise overlay adds premium, tactile feel.

```css
.grain {
  position: relative;
}
.grain::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('/grain.svg');
  opacity: 0.03;
  pointer-events: none;
}
```

#### 4. Grid Pattern
Subtle dot or line grid for hero sections.

```css
.grid-pattern {
  background-image: 
    radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0);
  background-size: 32px 32px;
}
```

### Border Radius Scale

| Name | Value | Use Case |
|------|-------|----------|
| `sm` | 6px | Buttons, inputs |
| `md` | 8px | Cards, badges |
| `lg` | 12px | Modals, sections |
| `xl` | 16px | Hero cards |
| `2xl` | 24px | Feature callouts |
| `full` | 9999px | Pills, avatars |

### Shadow Scale

```js
// tailwind.config.js
boxShadow: {
  'sm': '0 1px 2px rgba(0, 0, 0, 0.3)',
  'DEFAULT': '0 4px 6px rgba(0, 0, 0, 0.4)',
  'md': '0 8px 16px rgba(0, 0, 0, 0.4)',
  'lg': '0 16px 32px rgba(0, 0, 0, 0.5)',
  'xl': '0 24px 48px rgba(0, 0, 0, 0.6)',
  'glow': '0 0 60px rgba(139, 92, 246, 0.4)',
  'glow-accent': '0 0 60px rgba(255, 107, 107, 0.3)',
}
```

---

## 5. Micro-Interactions

### Principles
1. **Fast** — 150-200ms for most transitions
2. **Purposeful** — Every animation communicates something
3. **Subtle** — Enhance, don't distract
4. **Consistent** — Same patterns throughout

### Animation Presets

```css
/* Timing functions */
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out-expo: cubic-bezier(0.87, 0, 0.13, 1);
--spring: cubic-bezier(0.34, 1.56, 0.64, 1);

/* Standard transition */
.transition-default {
  transition: all 150ms var(--ease-out-expo);
}

/* Hover lift */
.hover-lift {
  transition: transform 200ms var(--ease-out-expo), box-shadow 200ms var(--ease-out-expo);
}
.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.5);
}
```

### Tailwind Animation Config

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        'fade-in': 'fade-in 400ms ease-out-expo',
        'scale-in': 'scale-in 300ms ease-out-expo',
        'slide-up': 'slide-up 400ms ease-out-expo',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
    },
  },
};
```

### Suggested Interactions

| Element | Hover | Click | Focus |
|---------|-------|-------|-------|
| Buttons | Brighten + subtle lift | Scale 0.98 | Ring glow |
| Cards | Lift + border brighten | - | Ring glow |
| Links | Color shift + underline | - | Ring glow |
| Nav items | Background fade in | - | Background + ring |
| Template previews | Lift + glow | Scale 0.98 | Ring glow |

---

## 6. Component Library

### Buttons

#### Primary Button
```jsx
<button className="
  px-6 py-3 
  bg-gradient-to-r from-primary to-accent 
  text-white font-semibold 
  rounded-md
  shadow-lg shadow-primary/25
  hover:shadow-xl hover:shadow-primary/30
  hover:scale-[1.02]
  active:scale-[0.98]
  transition-all duration-200 ease-out-expo
  focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background
">
  Get Started
</button>
```

#### Secondary Button
```jsx
<button className="
  px-6 py-3
  bg-background-muted
  text-foreground font-semibold
  rounded-md
  border border-border
  hover:bg-background-subtle hover:border-border-hover
  active:scale-[0.98]
  transition-all duration-150 ease-out-expo
  focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background
">
  Learn More
</button>
```

#### Ghost Button
```jsx
<button className="
  px-6 py-3
  bg-transparent
  text-foreground-muted font-medium
  rounded-md
  hover:text-foreground hover:bg-white/5
  active:scale-[0.98]
  transition-all duration-150 ease-out-expo
  focus:outline-none focus:ring-2 focus:ring-primary/50
">
  View Demo
</button>
```

#### Icon Button
```jsx
<button className="
  p-3
  bg-background-muted
  text-foreground-muted
  rounded-lg
  border border-border
  hover:text-foreground hover:border-border-hover hover:bg-background-subtle
  active:scale-[0.95]
  transition-all duration-150 ease-out-expo
  focus:outline-none focus:ring-2 focus:ring-primary/50
">
  <IconArrowRight className="w-5 h-5" />
</button>
```

---

### Cards

#### Template Card
```jsx
<article className="
  group
  bg-background-muted
  rounded-xl
  border border-border
  overflow-hidden
  hover:border-primary/50
  hover:shadow-xl hover:shadow-primary/10
  hover:-translate-y-1
  transition-all duration-300 ease-out-expo
">
  {/* Image */}
  <div className="relative aspect-[16/10] overflow-hidden">
    <img 
      src={thumbnail} 
      alt={name}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
    {/* Hover overlay */}
    <div className="
      absolute inset-0 
      bg-gradient-to-t from-background/80 to-transparent 
      opacity-0 group-hover:opacity-100 
      transition-opacity duration-300
      flex items-end justify-center pb-6
    ">
      <span className="
        px-4 py-2 
        bg-white text-background 
        font-semibold rounded-full
        text-sm
      ">
        Preview →
      </span>
    </div>
  </div>
  
  {/* Content */}
  <div className="p-5">
    <div className="flex items-center justify-between mb-2">
      <h3 className="font-semibold text-foreground">{name}</h3>
      <span className="text-primary font-bold">${price}</span>
    </div>
    <p className="text-foreground-muted text-sm">{description}</p>
    
    {/* Tags */}
    <div className="flex gap-2 mt-4">
      <span className="px-2 py-1 bg-primary-muted text-primary text-xs font-medium rounded-full">
        Next.js
      </span>
      <span className="px-2 py-1 bg-secondary-muted text-secondary text-xs font-medium rounded-full">
        Sanity
      </span>
    </div>
  </div>
</article>
```

#### Feature Card
```jsx
<div className="
  p-6
  bg-background-subtle
  rounded-xl
  border border-border
  hover:border-primary/30
  transition-colors duration-200
">
  <div className="
    w-12 h-12 
    bg-primary-muted 
    rounded-lg 
    flex items-center justify-center 
    mb-4
  ">
    <IconCode className="w-6 h-6 text-primary" />
  </div>
  <h3 className="text-lg font-semibold text-foreground mb-2">
    Production Ready
  </h3>
  <p className="text-foreground-muted text-sm leading-relaxed">
    TypeScript, SEO, accessibility, and performance optimized out of the box.
  </p>
</div>
```

---

### Badges & Pills

#### Category Badge
```jsx
<span className="
  px-3 py-1
  bg-primary-muted
  text-primary
  text-xs font-semibold
  rounded-full
  uppercase tracking-wide
">
  New
</span>
```

#### Tech Stack Pill
```jsx
<span className="
  inline-flex items-center gap-1.5
  px-3 py-1.5
  bg-background-muted
  text-foreground-muted
  text-sm font-medium
  rounded-full
  border border-border
">
  <IconBrandNextjs className="w-4 h-4" />
  Next.js 14
</span>
```

#### Price Badge
```jsx
<span className="
  px-4 py-2
  bg-gradient-to-r from-primary to-accent
  text-white
  text-lg font-bold
  rounded-lg
  shadow-lg shadow-primary/25
">
  $79
</span>
```

#### Status Badge
```jsx
{/* Popular */}
<span className="px-2 py-0.5 bg-accent-muted text-accent text-xs font-semibold rounded">
  Popular
</span>

{/* Updated */}
<span className="px-2 py-0.5 bg-secondary-muted text-secondary text-xs font-semibold rounded">
  Updated
</span>

{/* Coming Soon */}
<span className="px-2 py-0.5 bg-foreground-subtle/20 text-foreground-subtle text-xs font-semibold rounded">
  Coming Soon
</span>
```

---

### Section Backgrounds

#### Hero Section
```jsx
<section className="
  relative
  min-h-screen
  bg-background
  overflow-hidden
">
  {/* Gradient glow */}
  <div className="
    absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
    w-[800px] h-[600px]
    bg-primary/30
    rounded-full
    blur-[120px]
    pointer-events-none
  " />
  
  {/* Grid pattern */}
  <div className="
    absolute inset-0
    bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)]
    bg-[size:32px_32px]
    pointer-events-none
  " />
  
  {/* Content */}
  <div className="relative z-10">
    {/* ... */}
  </div>
</section>
```

#### Feature Section (Alternating)
```jsx
{/* Dark section */}
<section className="py-24 bg-background">
  {/* ... */}
</section>

{/* Subtle section */}
<section className="py-24 bg-background-subtle">
  {/* ... */}
</section>

{/* Muted section with border */}
<section className="
  py-24 
  bg-background-muted 
  border-y border-border
">
  {/* ... */}
</section>
```

#### CTA Section
```jsx
<section className="
  relative
  py-24
  bg-gradient-to-b from-background to-background-subtle
  overflow-hidden
">
  {/* Accent glow */}
  <div className="
    absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2
    w-[600px] h-[400px]
    bg-accent/20
    rounded-full
    blur-[100px]
    pointer-events-none
  " />
  
  <div className="relative z-10 text-center">
    <h2 className="text-h1 font-bold mb-6">
      Ready to ship faster?
    </h2>
    <button className="/* Primary button styles */">
      Browse Templates
    </button>
  </div>
</section>
```

---

### Navigation

#### Main Nav
```jsx
<nav className="
  fixed top-0 inset-x-0 z-50
  bg-background/80
  backdrop-blur-xl
  border-b border-border
">
  <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
    {/* Logo */}
    <a href="/" className="flex items-center gap-2">
      <Logo className="h-8 w-auto" />
      <span className="font-bold text-lg">Crafted Kit</span>
    </a>
    
    {/* Links */}
    <div className="hidden md:flex items-center gap-8">
      <a href="/templates" className="
        text-foreground-muted 
        hover:text-foreground 
        transition-colors
      ">
        Templates
      </a>
      <a href="/pricing" className="
        text-foreground-muted 
        hover:text-foreground 
        transition-colors
      ">
        Pricing
      </a>
      <a href="/docs" className="
        text-foreground-muted 
        hover:text-foreground 
        transition-colors
      ">
        Docs
      </a>
    </div>
    
    {/* CTA */}
    <button className="/* Primary button - smaller */">
      Get Started
    </button>
  </div>
</nav>
```

---

## 7. Logo Guidelines

### Logo Concept
The Crafted Kit logo combines **precision** (the "kit" aspect) with **craftsmanship** (the "crafted" aspect).

**Symbol options:**
1. Geometric interlocking shapes (like building blocks)
2. Abstract "CK" monogram with sharp angles
3. Stylized bracket or code symbol with a human touch

### Logo Colors
- **Primary:** White on dark backgrounds
- **Reversed:** Deep violet (#8B5CF6) on light backgrounds
- **Gradient:** Primary to accent gradient for special uses

### Clear Space
Minimum clear space = height of the "C" on all sides

### Minimum Size
- Digital: 24px height minimum
- Print: 12mm height minimum

---

## 8. Iconography

### Style
- **Stroke-based** icons (not filled)
- **2px stroke weight** at 24px size
- **Rounded caps and joins**
- **Consistent 24x24 viewport**

### Recommended Library
[Lucide Icons](https://lucide.dev/) — Clean, consistent, MIT licensed

### Usage
```jsx
import { Code, Palette, Zap, Shield, Sparkles } from 'lucide-react';

<Code className="w-6 h-6 text-foreground-muted" />
<Zap className="w-6 h-6 text-primary" />
```

---

## 9. Imagery

### Photography Style
- **High contrast** — punchy, not flat
- **Developer context** — screens, code, workspaces
- **Human moments** — real people shipping real products
- **Color graded** — slightly tinted toward brand colors

### Illustrations
- **3D elements** — subtle, glossy, gradient-rich
- **Abstract shapes** — geometric, colorful
- **Code snippets** — syntax-highlighted, cropped interestingly

### Template Previews
- **Full-page screenshots** — show the whole template
- **Device mockups** — MacBooks, phones (dark frames)
- **Hover states** — animated previews or video loops

---

## 10. Implementation Checklist

### Setup
- [ ] Configure Tailwind with brand colors and typography
- [ ] Add Satoshi + Inter + JetBrains Mono fonts
- [ ] Create CSS custom properties for colors
- [ ] Add grain texture SVG to public folder
- [ ] Configure animation keyframes

### Components
- [ ] Button component with variants (primary, secondary, ghost)
- [ ] Card component with hover effects
- [ ] Badge component with color variants
- [ ] Section wrapper with background variants
- [ ] Navigation with glass effect

### Pages
- [ ] Hero section with gradient glow
- [ ] Template grid with cards
- [ ] Feature sections
- [ ] CTA sections
- [ ] Footer

---

## Quick Reference: Tailwind Classes

```jsx
// Backgrounds
bg-background           // #0A0A0F
bg-background-subtle    // #12121A
bg-background-muted     // #1A1A24

// Text
text-foreground         // #FAFAFA
text-foreground-muted   // #A1A1AA
text-foreground-subtle  // #71717A

// Brand colors
text-primary            // #8B5CF6
bg-primary              // #8B5CF6
border-primary          // #8B5CF6

text-accent             // #FF6B6B
bg-accent               // #FF6B6B

text-secondary          // #06B6D4
bg-secondary            // #06B6D4

// Borders
border-border           // #27272A
border-border-hover     // #3F3F46

// Common patterns
rounded-md              // 6px
rounded-lg              // 8px
rounded-xl              // 12px
rounded-full            // Pills

shadow-lg shadow-primary/25    // Primary glow shadow
backdrop-blur-xl               // Glass effect

transition-all duration-200 ease-out-expo  // Standard transition
hover:scale-[1.02] active:scale-[0.98]     // Button interaction
```

---

*Crafted Kit — Where premium templates meet modern development.*
