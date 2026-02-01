import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Agency Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Agency Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
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
        { name: 'headline', title: 'Headline (lines)', type: 'array', of: [{ type: 'string' }] },
        { name: 'subheadline', title: 'Subheadline', type: 'text', rows: 2 },
        { name: 'primaryCta', title: 'Primary CTA', type: 'string' },
        { name: 'primaryCtaUrl', title: 'Primary CTA URL', type: 'url' },
        { name: 'secondaryCta', title: 'Secondary CTA', type: 'string' },
      ],
    }),
    defineField({
      name: 'clients',
      title: 'Client Logos/Names',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Client Name', type: 'string' },
            { name: 'logo', title: 'Logo', type: 'image' },
          ],
        },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'string' },
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
        { name: 'buttonUrl', title: 'Button URL', type: 'url' },
        { name: 'email', title: 'Contact Email', type: 'string' },
      ],
    }),
    defineField({
      name: 'social',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'twitter', title: 'Twitter/X', type: 'url' },
        { name: 'dribbble', title: 'Dribbble', type: 'url' },
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
