import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Studio Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General' },
    { name: 'hero', title: 'Hero' },
    { name: 'statement', title: 'Statement' },
    { name: 'cta', title: 'CTA' },
    { name: 'footer', title: 'Footer' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Studio Name',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      group: 'general',
    }),

    // Hero
    defineField({
      name: 'heroBadge',
      title: 'Hero Badge',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title Static',
      type: 'string',
      group: 'hero',
      description: 'e.g., "Words that"',
    }),
    defineField({
      name: 'heroRotatingWords',
      title: 'Rotating Words',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'hero',
      description: 'Words that rotate in the hero',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
      group: 'hero',
    }),
    defineField({
      name: 'typewriterWords',
      title: 'Typewriter Words',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'hero',
    }),

    // Marquee
    defineField({
      name: 'marqueeText',
      title: 'Marquee Text',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'marqueeOutlineText',
      title: 'Marquee Outline Text',
      type: 'string',
      group: 'hero',
    }),

    // Statement
    defineField({
      name: 'statementText',
      title: 'Big Statement',
      type: 'text',
      rows: 3,
      group: 'statement',
    }),

    // Stats
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      group: 'statement',
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

    // CTA
    defineField({
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string',
      group: 'cta',
    }),

    // Footer
    defineField({
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'social',
      title: 'Social Links',
      type: 'object',
      group: 'footer',
      fields: [
        { name: 'twitter', title: 'Twitter/X', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
      ],
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3 },
        { name: 'ogImage', title: 'Social Share Image', type: 'image' },
        { name: 'keywords', title: 'Keywords', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } },
      ],
    }),
  ],
  preview: {
    select: { title: 'name' },
  },
})
