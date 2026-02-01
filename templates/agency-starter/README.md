# Agency Portfolio Template

A bold, dark-mode landing page for design agencies, creative studios, and freelancers. Showcase your work with filterable case studies and a modern, editorial aesthetic.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FYOUR_USERNAME%2Fagency-template&env=NEXT_PUBLIC_SANITY_PROJECT_ID,NEXT_PUBLIC_SANITY_DATASET)

![Template Preview](preview.png)

---

## ✨ Features

- **Dark Mode First** — Modern, editorial aesthetic that makes visuals pop
- **Filterable Portfolio** — Case studies with category filters and smooth animations
- **Bold Typography** — Statement headlines with Space Grotesk
- **Interactive Services** — Accordion-style service showcase
- **Team Section** — Grayscale-to-color hover effects
- **Sanity CMS** — Edit all content visually
- **One-Click Deploy** — Live in under 5 minutes

---

## 🎯 Perfect For

- Design agencies and studios
- Creative freelancers
- Web development agencies
- Branding consultancies
- Digital product studios

---

## 📐 Sections Included

1. **Hero** — Bold statement headline with gradient accents
2. **Work** — Filterable case study grid (masonry-style)
3. **Services** — Interactive accordion with deliverables
4. **About** — Stats + team members with hover effects
5. **Process** — 4-step methodology showcase
6. **Contact** — Large CTA with ambient background

---

## 🚀 Quick Start

1. Click **Deploy with Vercel** above
2. Create a [Sanity](https://sanity.io) account
3. Add your Project ID
4. Your site is live!

See the full setup guide in the main [README](../README.md).

---

## 🎨 Customization

### Color Scheme

Default dark mode with vibrant red accent:
- Background: Near black (#030712)
- Primary: Vibrant red (#ef4444)
- Accent colors: Electric blue, lime, violet

Change colors in `tailwind.config.js`:

```js
colors: {
  primary: {
    500: '#ef4444',  // Change accent color
  },
  dark: {
    950: '#030712',  // Background
  },
}
```

### Fonts

Default fonts:
- Headlines: Space Grotesk (bold, modern)
- Body: Inter (clean, readable)

---

## 📁 Case Study Format

Each case study in the CMS should include:

```ts
{
  title: "Project Name",
  category: "Brand Identity",      // Displayed as label
  tags: ["branding", "web"],       // For filtering
  image: "url-to-image",           // 4:3 or 4:5 aspect ratio
  description: "Brief description",
  link: "/work/project-slug"       // Detail page link
}
```

The first project displays larger (spans 2 rows) for visual hierarchy.

---

## 💡 Design Tips

### Portfolio Images
- Use high-contrast images that pop against dark background
- 4:3 ratio for standard cards, 4:5 for featured project
- Consider mockups that show the actual work

### Typography
- Headlines: All caps or sentence case, never title case
- Use tracking-wider for labels and navigation
- Large type scales: 5xl to 8xl for hero headlines

### Animations
- Keep it subtle — fade-in and scale on scroll
- Stagger children in grids
- Use easing curves for smooth motion

---

Made with 🖤 for agencies that push boundaries
