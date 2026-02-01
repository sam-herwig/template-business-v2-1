// @ts-nocheck
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General' },
    { name: 'hero', title: 'Hero' },
    { name: 'social', title: 'Social' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // General
    defineField({
      name: 'name',
      title: 'Agency Name',
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
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 2,
      group: 'general',
    }),

    // Hero
    defineField({
      name: 'heroBadge',
      title: 'Hero Badge Text',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'hero',
      description: 'Each line as separate entry',
    }),
    defineField({
      name: 'heroHighlight',
      title: 'Highlighted Word',
      type: 'string',
      group: 'hero',
      description: 'Word to highlight with color block',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
      group: 'hero',
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA Text',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA Text',
      type: 'string',
      group: 'hero',
    }),

    // Social
    defineField({
      name: 'social',
      title: 'Social Links',
      type: 'object',
      group: 'social',
      fields: [
        { name: 'twitter', title: 'Twitter/X', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'dribbble', title: 'Dribbble', type: 'url' },
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
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: '50-60 characters ideal',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: '150-160 characters ideal',
        },
        {
          name: 'ogImage',
          title: 'Social Share Image',
          type: 'image',
          description: '1200x630px recommended',
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          options: { layout: 'tags' },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'name' },
  },
})
