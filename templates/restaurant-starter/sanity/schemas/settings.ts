import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Restaurant Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General' },
    { name: 'contact', title: 'Contact' },
    { name: 'about', title: 'About' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Restaurant Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'hours',
      title: 'Hours of Operation',
      type: 'object',
      fields: [
        { name: 'weekday', title: 'Weekday Hours', type: 'string' },
        { name: 'weekend', title: 'Weekend Hours', type: 'string' },
      ],
    }),
    defineField({
      name: 'reservationUrl',
      title: 'Reservation URL (OpenTable, Resy, etc.)',
      type: 'url',
    }),
    defineField({
      name: 'orderUrl',
      title: 'Online Ordering URL',
      type: 'url',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'facebook', title: 'Facebook', type: 'url' },
        { name: 'yelp', title: 'Yelp', type: 'url' },
        { name: 'google', title: 'Google Business', type: 'url' },
      ],
    }),
    defineField({
      name: 'aboutTitle',
      title: 'About Section Title',
      type: 'string',
    }),
    defineField({
      name: 'aboutContent',
      title: 'About Section Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'aboutImage',
      title: 'About Section Image',
      type: 'image',
      options: { hotspot: true },
      group: 'about',
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      group: 'seo',
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
