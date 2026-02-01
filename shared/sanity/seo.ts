import { defineField } from 'sanity'

/**
 * Shared SEO fields for all templates
 * Add to any document type with: ...seoFields
 */
export const seoFields = [
  defineField({
    name: 'seo',
    title: 'SEO & Social Sharing',
    type: 'object',
    group: 'seo',
    options: {
      collapsible: true,
      collapsed: false,
    },
    fields: [
      defineField({
        name: 'metaTitle',
        title: 'Meta Title',
        type: 'string',
        description: 'Title for search engines (50-60 characters ideal)',
        validation: (Rule) => Rule.max(70).warning('Keep under 60 characters for best results'),
      }),
      defineField({
        name: 'metaDescription',
        title: 'Meta Description',
        type: 'text',
        rows: 3,
        description: 'Description for search engines (150-160 characters ideal)',
        validation: (Rule) => Rule.max(170).warning('Keep under 160 characters for best results'),
      }),
      defineField({
        name: 'ogImage',
        title: 'Social Share Image',
        type: 'image',
        description: 'Image for Facebook, Twitter, LinkedIn shares (1200x630px recommended)',
        options: {
          hotspot: true,
        },
      }),
      defineField({
        name: 'ogTitle',
        title: 'Social Title',
        type: 'string',
        description: 'Override title for social shares (optional)',
      }),
      defineField({
        name: 'ogDescription',
        title: 'Social Description',
        type: 'text',
        rows: 2,
        description: 'Override description for social shares (optional)',
      }),
      defineField({
        name: 'keywords',
        title: 'Keywords',
        type: 'array',
        of: [{ type: 'string' }],
        description: 'Keywords for SEO (comma-separated)',
        options: {
          layout: 'tags',
        },
      }),
      defineField({
        name: 'canonicalUrl',
        title: 'Canonical URL',
        type: 'url',
        description: 'Override canonical URL if content exists elsewhere',
      }),
      defineField({
        name: 'noIndex',
        title: 'Hide from Search Engines',
        type: 'boolean',
        description: 'Enable to prevent indexing (use sparingly)',
        initialValue: false,
      }),
    ],
  }),
]

/**
 * Group definition for SEO tab in Sanity Studio
 */
export const seoGroup = {
  name: 'seo',
  title: 'SEO',
  icon: () => '🔍',
}

/**
 * GROQ projection for SEO fields
 */
export const seoProjection = `
  seo {
    metaTitle,
    metaDescription,
    "ogImage": ogImage.asset->url,
    ogTitle,
    ogDescription,
    keywords,
    canonicalUrl,
    noIndex
  }
`
