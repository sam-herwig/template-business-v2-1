# SaaS Starter Template

A premium landing page template for SaaS products, startups, and web apps. Built with Next.js 14, Tailwind CSS, Framer Motion, and Sanity CMS.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FYOUR_USERNAME%2Fsaas-starter-template&env=NEXT_PUBLIC_SANITY_PROJECT_ID,NEXT_PUBLIC_SANITY_DATASET&envDescription=Sanity%20CMS%20credentials&envLink=https%3A%2F%2Fwww.sanity.io%2Fmanage)

![Template Preview](preview.png)

---

## ✨ Features

- **Modern Design** — Clean, professional aesthetic inspired by top SaaS companies
- **Sanity CMS** — Edit all content visually, no code required
- **One-Click Deploy** — Live on Vercel in under 5 minutes
- **Fully Responsive** — Looks perfect on all devices
- **Animated** — Smooth Framer Motion animations throughout
- **Shader Background** — Optional WebGL gradient effect
- **SEO Optimized** — Meta tags, Open Graph, sitemap ready
- **Fast** — 95+ Lighthouse score out of the box

---

## 🚀 Quick Start

### Option 1: One-Click Deploy (Recommended)

1. Click the **Deploy with Vercel** button above
2. Create a free [Vercel account](https://vercel.com) if needed
3. Create a free [Sanity account](https://sanity.io) and project
4. Add your Sanity Project ID when prompted
5. Done! Your site is live.

### Option 2: Manual Setup

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/saas-starter-template
cd saas-starter-template

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Sanity credentials

# Run development server
npm run dev
```

---

## 📝 Editing Content

All content is managed through Sanity Studio. No coding required!

### Accessing the Editor

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Click "Studio" to open the content editor

### Content You Can Edit

| Section | What You Can Change |
|---------|---------------------|
| **Hero** | Headline, subheadline, CTA buttons, badge text |
| **Features** | Feature title, description, icon for each feature |
| **How It Works** | Step title, description, number |
| **Pricing** | Plan names, prices, features, popular badge |
| **Testimonials** | Quote, author name, company, avatar |
| **FAQ** | Questions and answers |
| **Footer** | Links, social icons, copyright text |

### Adding Images

1. Click any image field in Sanity Studio
2. Drag & drop your image or click to browse
3. Images are automatically optimized for web

---

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to change the color scheme:

```js
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f0f9ff',
        // ... your colors
        600: '#0284c7',
      }
    }
  }
}
```

### Fonts

1. Add your font to `app/layout.tsx`
2. Update the font-family in `tailwind.config.js`

### Shader Background

Toggle the shader background in `app/page.tsx`:

```tsx
<ShaderBackground enabled={true} />
```

---

## 🌐 Custom Domain

### In Vercel

1. Go to your project → Settings → Domains
2. Add your domain name
3. Follow the DNS instructions

### DNS Records to Add

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

Propagation takes 5-30 minutes.

---

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout with fonts, metadata
│   ├── page.tsx        # Homepage
│   └── globals.css     # Global styles
├── components/
│   ├── Hero.tsx        # Hero section
│   ├── Features.tsx    # Features grid
│   ├── Pricing.tsx     # Pricing table
│   ├── Testimonials.tsx
│   ├── FAQ.tsx
│   └── Footer.tsx
├── sanity/
│   ├── client.ts       # Sanity client config
│   ├── queries.ts      # GROQ queries
│   └── schemas/        # Content schemas
├── lib/
│   └── utils.ts        # Utility functions
└── public/
    └── images/         # Static images
```

---

## 🔧 Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Usually "production" |

---

## ❓ FAQ

### Do I need to know how to code?
No! All content editing is done through Sanity's visual editor.

### How do I add new sections?
You'll need basic React knowledge to add entirely new sections. Each section is a component in the `/components` folder.

### Can I remove sections?
Yes, just remove the component from `app/page.tsx`.

### How much does hosting cost?
Free! Vercel's free tier handles most sites easily.

### Can I use this for client projects?
Yes, the commercial license is included with your purchase.

---

## 🆘 Support

- **Video Tutorial:** [Watch Setup Guide](https://youtube.com/...)
- **Email:** support@[yourdomain].com
- **Response Time:** Within 24 hours

---

## 📄 License

This template is licensed for personal and commercial use. You may:
- ✅ Use for yourself or clients
- ✅ Modify and customize
- ✅ Create multiple sites

You may not:
- ❌ Resell the template as-is
- ❌ Include in template bundles
- ❌ Share your download with others

---

Made with ❤️ by [Your Brand]
