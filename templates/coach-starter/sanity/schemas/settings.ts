import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Coach Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Your Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title/Role',
      type: 'string',
      description: 'e.g., "Business Coach & Strategist"',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'headline', title: 'Headline', type: 'string' },
        { name: 'headlineHighlight', title: 'Headline Highlight', type: 'string' },
        { name: 'subheadline', title: 'Subheadline', type: 'text', rows: 2 },
        { name: 'primaryCta', title: 'Primary CTA Text', type: 'string' },
        { name: 'primaryCtaUrl', title: 'Primary CTA URL', type: 'url' },
        { name: 'secondaryCta', title: 'Secondary CTA Text', type: 'string' },
      ],
    }),
    defineField({
      name: 'about',
      title: 'About Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'subtitle', title: 'Subtitle', type: 'string' },
        { name: 'story', title: 'Story (paragraphs)', type: 'array', of: [{ type: 'text' }] },
        { name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } },
        { name: 'credentials', title: 'Credentials', type: 'array', of: [{ type: 'string' }] },
      ],
    }),
    defineField({
      name: 'results',
      title: 'Results/Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'metric', title: 'Metric', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Bottom CTA',
      type: 'object',
      fields: [
        { name: 'headline', title: 'Headline', type: 'string' },
        { name: 'subheadline', title: 'Subheadline', type: 'text', rows: 2 },
        { name: 'buttonText', title: 'Button Text', type: 'string' },
        { name: 'buttonUrl', title: 'Button URL (Calendly, etc.)', type: 'url' },
        { name: 'note', title: 'Note', type: 'string' },
      ],
    }),
    defineField({
      name: 'social',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'podcast', title: 'Podcast', type: 'url' },
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
