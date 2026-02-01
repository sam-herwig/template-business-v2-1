# Shared Sanity Utilities

Reusable Sanity schema patterns for all templates.

## SEO Fields

Add SEO management to any document type:

```typescript
import { seoFields, seoGroup } from '@/shared/sanity/seo'

export default defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General' },
    seoGroup,
  ],
  fields: [
    // Your fields here...
    defineField({
      name: 'name',
      title: 'Site Name',
      type: 'string',
      group: 'general',
    }),
    // Spread SEO fields
    ...seoFields,
  ],
})
```

## Using SEO in Pages

```typescript
// In your queries
import { seoProjection } from '@/shared/sanity/seo'

export const settingsQuery = groq`*[_type == "settings"][0]{
  name,
  ${seoProjection}
}`

// In your layout/page
export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch(settingsQuery)
  
  return {
    title: settings.seo?.metaTitle || settings.name,
    description: settings.seo?.metaDescription,
    keywords: settings.seo?.keywords,
    openGraph: {
      title: settings.seo?.ogTitle || settings.seo?.metaTitle,
      description: settings.seo?.ogDescription || settings.seo?.metaDescription,
      images: settings.seo?.ogImage ? [settings.seo.ogImage] : [],
    },
    robots: settings.seo?.noIndex ? 'noindex, nofollow' : 'index, follow',
    alternates: {
      canonical: settings.seo?.canonicalUrl,
    },
  }
}
```
