import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'leadMagnet',
  title: 'Lead Magnet',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'features',
      title: 'What\'s Inside',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
    }),
    defineField({
      name: 'formAction',
      title: 'Form Action URL (ConvertKit, Mailchimp, etc.)',
      type: 'url',
    }),
    defineField({
      name: 'image',
      title: 'Preview Image',
      type: 'image',
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
