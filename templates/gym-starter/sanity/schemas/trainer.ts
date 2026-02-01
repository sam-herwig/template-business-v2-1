import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'trainer',
  title: 'Trainer',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'specialty',
      title: 'Specialty',
      type: 'string',
      description: 'e.g., "HIIT & Conditioning"',
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g., "NASM-CPT", "ACE", "CSCS"',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'classTypes',
      title: 'Classes Taught',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'classType' }] }],
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram Handle',
      type: 'string',
    }),
    defineField({
      name: 'bookingUrl',
      title: 'Personal Training Booking URL',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', specialty: 'specialty', media: 'image' },
    prepare({ title, specialty, media }) {
      return { title, subtitle: specialty, media }
    },
  },
})
