# Complete Setup Guide

This guide walks through setting up a template from scratch.

## Prerequisites

- Node.js 18+
- npm or pnpm
- Git
- Sanity account (free at sanity.io)
- Vercel account (free at vercel.com)

## Step 1: Choose Your Template

| If you're a... | Use this template |
|----------------|-------------------|
| Restaurant, cafe, bar | `restaurant-starter` |
| Contractor, plumber, electrician | `contractor-starter` |
| Salon, spa, beauty | `salon-starter` |
| Gym, fitness studio | `gym-starter` |
| SaaS product | `saas-starter` |
| Coach, consultant | `coach-starter` |
| Design/dev agency | `agency-starter` |

## Step 2: Create Your Project

```bash
# Navigate to where you want the project
cd ~/projects

# Copy the template (replace restaurant-starter with your choice)
cp -r /path/to/template-business/templates/restaurant-starter ./my-business

# Enter project directory
cd my-business

# Initialize git
git init
git add .
git commit -m "Initial commit from template"

# Install dependencies
npm install
```

## Step 3: Set Up Sanity CMS

### Create Sanity Project

1. Go to [sanity.io](https://www.sanity.io/) and sign in
2. Create a new project
3. Note your **Project ID** (looks like `abc123xy`)

### Configure Local Environment

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your values
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xy
NEXT_PUBLIC_SANITY_DATASET=production
```

### Initialize Sanity Locally

The schemas are already included. Just run:

```bash
# Install Sanity CLI globally (if not already)
npm install -g @sanity/cli

# Login to Sanity (first time only)
sanity login
```

## Step 4: Add Content

### Start Sanity Studio

```bash
# In a terminal, start the studio
npm run sanity
# Opens at http://localhost:3333
```

### Required Content (Settings)

Every template has a "Settings" document. Create one and fill in:

- **Business name**
- **Contact info** (phone, email, address)
- **Hours of operation**
- **Social links**
- **Hero section content**

### Template-Specific Content

| Template | Priority content to add |
|----------|------------------------|
| Restaurant | Menu categories → Menu items → Gallery |
| Contractor | Services → Projects (with before/after) → Testimonials |
| Salon | Service categories → Services → Team members |
| Gym | Class types → Schedule → Membership tiers |
| SaaS | Features → Pricing tiers → Testimonials |
| Coach | Services → Testimonials → FAQ |
| Agency | Case studies → Services → Process steps |

## Step 5: Run Locally

```bash
# In another terminal, start Next.js
npm run dev
# Opens at http://localhost:3000
```

Verify everything works:
- [ ] Site loads without errors
- [ ] Content from Sanity appears
- [ ] Navigation works
- [ ] Mobile responsive

## Step 6: Customize Branding

### Colors

Edit `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#YOUR_BRAND_COLOR',
        dark: '#DARKER_SHADE',
      },
      background: '#YOUR_BG_COLOR',
      surface: '#CARD_BG_COLOR',
    },
  },
},
```

### Logo

1. Add logo to `public/logo.svg` or upload to Sanity
2. Reference in Settings document

### Fonts

To change from Inter:

1. Edit `app/layout.tsx`
2. Import new font from `next/font/google`
3. Update CSS variables if needed

## Step 7: Deploy to Vercel

### Push to GitHub

```bash
# Create repo on GitHub first, then:
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

### Deploy with Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repo
3. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
4. Deploy

### Set Up Webhooks (Auto-rebuild on content change)

1. In Vercel project settings → Git → Deploy Hooks
2. Create a hook named "Sanity"
3. Copy the URL
4. In Sanity project settings → API → Webhooks
5. Add webhook with the Vercel URL
6. Set trigger to "Create, Update, Delete"

## Step 8: Connect Custom Domain

### In Vercel

1. Project Settings → Domains
2. Add your domain
3. Follow DNS instructions

### DNS Configuration

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## Step 9: Post-Launch Checklist

### SEO
- [ ] Update `app/layout.tsx` metadata
- [ ] Add favicon (`public/favicon.ico`)
- [ ] Create `public/robots.txt`
- [ ] Submit sitemap to Google Search Console

### Analytics
- [ ] Add Google Analytics ID to `.env`
- [ ] Or add Plausible/Fathom script

### Performance
- [ ] Run Lighthouse audit
- [ ] Optimize images uploaded to Sanity
- [ ] Enable Vercel Analytics (optional)

### Content
- [ ] Add all menu items / services / products
- [ ] Upload high-quality photos
- [ ] Write compelling copy
- [ ] Add real testimonials

## Troubleshooting

### "Sanity client error"
- Check `.env.local` has correct project ID
- Verify you're logged into Sanity CLI

### "Content not showing"
- Ensure content is published (not draft) in Sanity
- Check browser console for errors
- Verify GROQ queries match your schema

### "Styles look wrong"
- Run `npm run dev` to rebuild CSS
- Clear browser cache
- Check Tailwind config syntax

### "Build fails on Vercel"
- Ensure all env vars are set in Vercel
- Check build logs for specific error
- Run `npm run build` locally to reproduce

## Getting Help

- [Sanity Community](https://www.sanity.io/community)
- [Next.js Discord](https://discord.gg/nextjs)
- [Vercel Support](https://vercel.com/support)

---

You're all set! 🎉
