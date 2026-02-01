import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Salon Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Salon Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
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
        { name: 'saturday', title: 'Saturday Hours', type: 'string' },
        { name: 'sunday', title: 'Sunday Hours', type: 'string' },
      ],
    }),
    defineField({
      name: 'bookingUrl',
      title: 'Booking URL (Fresha, Vagaro, Booksy, etc.)',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bookingPlatform',
      title: 'Booking Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Fresha', value: 'fresha' },
          { title: 'Vagaro', value: 'vagaro' },
          { title: 'Booksy', value: 'booksy' },
          { title: 'GlossGenius', value: 'glossgenius' },
          { title: 'Square Appointments', value: 'square' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'facebook', title: 'Facebook', type: 'url' },
        { name: 'tiktok', title: 'TikTok', type: 'url' },
        { name: 'yelp', title: 'Yelp', type: 'url' },
      ],
    }),
    defineField({
      name: 'giftCardUrl',
      title: 'Gift Card Purchase URL',
      type: 'url',
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
