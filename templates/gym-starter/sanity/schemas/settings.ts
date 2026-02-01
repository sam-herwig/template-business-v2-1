import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Gym Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Gym Name',
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
      title: 'Hours',
      type: 'object',
      fields: [
        { name: 'gymAccess', title: 'Gym Access Hours', type: 'string', description: 'e.g., "24/7 for members"' },
        { name: 'staffed', title: 'Staffed Hours', type: 'string' },
      ],
    }),
    defineField({
      name: 'bookingUrl',
      title: 'Class Booking URL (MindBody, Glofox, etc.)',
      type: 'url',
    }),
    defineField({
      name: 'bookingPlatform',
      title: 'Booking Platform',
      type: 'string',
      options: {
        list: [
          { title: 'MindBody', value: 'mindbody' },
          { title: 'ABC Glofox', value: 'glofox' },
          { title: 'Gymdesk', value: 'gymdesk' },
          { title: 'Zen Planner', value: 'zenplanner' },
          { title: 'WellnessLiving', value: 'wellnessliving' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'trialOffer',
      title: 'Trial Offer',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'description', title: 'Description', type: 'text', rows: 2 },
        { name: 'url', title: 'Sign-up URL', type: 'url' },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Stats (for hero section)',
      type: 'object',
      fields: [
        { name: 'members', title: 'Members', type: 'string' },
        { name: 'classesPerWeek', title: 'Classes/Week', type: 'string' },
        { name: 'trainers', title: 'Trainers', type: 'string' },
        { name: 'access', title: 'Access', type: 'string' },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'facebook', title: 'Facebook', type: 'url' },
        { name: 'youtube', title: 'YouTube', type: 'url' },
        { name: 'tiktok', title: 'TikTok', type: 'url' },
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
