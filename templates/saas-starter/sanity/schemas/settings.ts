import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'badge', title: 'Badge Text', type: 'string' },
        { name: 'headline', title: 'Headline', type: 'string' },
        { name: 'headlineHighlight', title: 'Headline Highlight', type: 'string' },
        { name: 'subheadline', title: 'Subheadline', type: 'text', rows: 2 },
        { name: 'primaryCta', title: 'Primary CTA Text', type: 'string' },
        { name: 'primaryCtaUrl', title: 'Primary CTA URL', type: 'url' },
        { name: 'secondaryCta', title: 'Secondary CTA Text', type: 'string' },
        { name: 'secondaryCtaUrl', title: 'Secondary CTA URL', type: 'url' },
        { name: 'image', title: 'Product Screenshot', type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'trustBadges',
      title: 'Trust Badges',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g., "Trusted by 10,000+ teams", "4.9/5 on G2"',
    }),
    defineField({
      name: 'cta',
      title: 'Bottom CTA Section',
      type: 'object',
      fields: [
        { name: 'headline', title: 'Headline', type: 'string' },
        { name: 'subheadline', title: 'Subheadline', type: 'text', rows: 2 },
        { name: 'buttonText', title: 'Button Text', type: 'string' },
        { name: 'buttonUrl', title: 'Button URL', type: 'url' },
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        { name: 'tagline', title: 'Tagline', type: 'string' },
        { name: 'twitter', title: 'Twitter', type: 'url' },
        { name: 'github', title: 'GitHub', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
      ],
    }),
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string', description: '50-60 characters ideal' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3, description: '150-160 characters ideal' },
        { name: 'ogImage', title: 'Social Share Image', type: 'image', description: '1200x630px recommended' },
        { name: 'keywords', title: 'Keywords', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } },
      ],
    }),
  ],
  preview: {
    select: { title: 'name' },
  },
})
