import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Restaurant Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General' },
    { name: 'hero', title: 'Hero' },
    { name: 'location', title: 'Location' },
    { name: 'social', title: 'Social' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Restaurant Name',
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
      name: 'phone',
      title: 'Phone',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'general',
    }),

    // Hero
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title Line 1',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroTitleAccent',
      title: 'Hero Title Line 2 (Accent)',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 2,
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
    }),

    // Location
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 2,
      group: 'location',
    }),
    defineField({
      name: 'neighborhood',
      title: 'Neighborhood',
      type: 'string',
      group: 'location',
    }),
    defineField({
      name: 'hours',
      title: 'Hours',
      type: 'object',
      group: 'location',
      fields: [
        { name: 'weekday', title: 'Weekday Hours', type: 'string' },
        { name: 'weekend', title: 'Weekend Hours', type: 'string' },
      ],
    }),
    defineField({
      name: 'reservationUrl',
      title: 'Reservation URL',
      type: 'url',
      group: 'location',
    }),

    // Social
    defineField({
      name: 'social',
      title: 'Social Links',
      type: 'object',
      group: 'social',
      fields: [
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'facebook', title: 'Facebook', type: 'url' },
        { name: 'tiktok', title: 'TikTok', type: 'url' },
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
