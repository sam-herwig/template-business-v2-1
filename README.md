# Local Business Website Templates

Professional, production-ready website templates designed for local service businesses, coaches, agencies, and SaaS products.

## 🎯 Templates

### Local Service Businesses
Templates designed for businesses with physical locations or service areas.

| Template | Target | Key Features |
|----------|--------|--------------|
| **restaurant-starter** | Restaurants, cafes, bars | Menu management, reservations (OpenTable/Resy), gallery |
| **contractor-starter** | Home contractors, plumbers, electricians | Service areas, project gallery, trust badges |
| **salon-starter** | Hair salons, spas, beauty services | Team profiles, service menus, booking integration |
| **gym-starter** | Gyms, fitness studios, yoga | Class schedules, membership tiers, trainer bios |

### Digital Businesses
Templates for online-first businesses.

| Template | Target | Key Features |
|----------|--------|--------------|
| **saas-starter** | SaaS products | Feature grid, pricing tables, testimonials |
| **coach-starter** | Coaches, consultants | Personal branding, services, lead magnets |
| **agency-starter** | Design/dev agencies | Case study grid, process, team section |

## 🏗️ Stack

All templates use the same modern stack:

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **CMS:** Sanity (headless)
- **Hosting:** Vercel (recommended)
- **Font:** Inter + accent font per template

## 🚀 Quick Start

### 1. Clone a Template

```bash
# Copy template to new project
cp -r templates/restaurant-starter ~/my-restaurant
cd ~/my-restaurant

# Install dependencies
npm install
```

### 2. Set Up Sanity

```bash
# Create Sanity project
npx sanity init

# When prompted:
# - Select "Empty project with clean configuration"
# - Copy project ID to .env.local
```

### 3. Configure Environment

```bash
# Copy example env
cp .env.example .env.local

# Add your Sanity project ID
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 4. Run Development Server

```bash
npm run dev
# Open http://localhost:3000
```

### 5. Open Sanity Studio

```bash
npm run sanity
# Open http://localhost:3333
```

## 📁 Project Structure

```
template-name/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Tailwind + custom styles
├── sanity/
│   ├── sanity.config.ts    # Sanity configuration
│   ├── schemas/            # Content schemas
│   │   ├── index.ts
│   │   ├── settings.ts
│   │   └── ...
│   └── lib/
│       ├── client.ts       # Sanity client
│       └── queries.ts      # GROQ queries
├── package.json
├── tailwind.config.js
├── .env.example
└── README.md
```

## 🎨 Customization

### Colors

Each template uses semantic color tokens. Edit `tailwind.config.js`:

```js
colors: {
  primary: {
    DEFAULT: '#D97706',  // Your brand color
    dark: '#B45309',
  },
  background: '#0F1419',  // Page background
  surface: '#1A1F26',     // Card backgrounds
}
```

### Typography

Templates use Inter as the base font. To change:

1. Update `app/layout.tsx` font imports
2. Edit `tailwind.config.js` fontFamily

### Content

All content is managed through Sanity:

1. Open Sanity Studio (`npm run sanity`)
2. Add your business content
3. Site updates automatically via webhooks

## 📊 Template Specifics

### Restaurant (`restaurant-starter`)
- **Schemas:** settings, menuCategory, menuItem, galleryImage, testimonial
- **Integrations:** OpenTable, Resy, DoorDash, UberEats
- **Sections:** Hero, Menu Preview, About, Gallery, Testimonials, Location

### Contractor (`contractor-starter`)
- **Schemas:** settings, service, project, testimonial, faqItem
- **Features:** Before/after gallery, service area map, trust badges
- **Sections:** Hero, Services, Projects, About, Testimonials, FAQ

### Salon (`salon-starter`)
- **Schemas:** settings, serviceCategory, service, teamMember, galleryImage, testimonial
- **Integrations:** Fresha, Vagaro, Booksy, GlossGenius
- **Sections:** Hero, Services, Team, Gallery, Testimonials, Contact

### Gym (`gym-starter`)
- **Schemas:** settings, classType, classSchedule, membershipTier, trainer, amenity
- **Integrations:** MindBody, Glofox, Zen Planner
- **Sections:** Hero, Classes, Schedule, Pricing, Trainers, Amenities

### SaaS (`saas-starter`)
- **Schemas:** settings, feature, pricingTier, testimonial, faqItem
- **Features:** Feature grid, pricing comparison, social proof
- **Sections:** Hero, Features, Pricing, Testimonials, FAQ, CTA

### Coach (`coach-starter`)
- **Schemas:** settings, service, testimonial, faqItem, leadMagnet
- **Integrations:** Calendly, ConvertKit, Mailchimp
- **Sections:** Hero, About, Services, Testimonials, FAQ, Lead Magnet

### Agency (`agency-starter`)
- **Schemas:** settings, caseStudy, service, teamMember, processStep
- **Features:** Filterable portfolio, case study pages, process timeline
- **Sections:** Hero, Work Grid, Services, Process, Team, CTA

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Other Platforms

These templates work with any platform that supports Next.js:
- Netlify
- Railway
- Cloudflare Pages
- Self-hosted (Docker)

## 📚 Documentation

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vercel Deployment](https://vercel.com/docs)

## 💡 Tips

### SEO
- Update metadata in `app/layout.tsx`
- Add OpenGraph images
- Use semantic HTML (already included)

### Performance
- Images are optimized via `next/image`
- Fonts are self-hosted
- CSS is purged automatically

### Analytics
- Add Google Analytics: `NEXT_PUBLIC_GA_ID` in env
- Add Plausible/Fathom: Similar pattern

## 📝 License

MIT License - Use these templates for personal or commercial projects.

---

Built for local businesses that deserve great websites.
