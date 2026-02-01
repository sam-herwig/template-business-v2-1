import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'stylist',
      title: 'Stylist',
      type: 'reference',
      to: [{ type: 'teamMember' }],
    }),
    defineField({
      name: 'serviceType',
      title: 'Service Type',
      type: 'string',
      description: 'e.g., "Balayage", "Haircut", "Color"',
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
    select: { alt: 'alt', serviceType: 'serviceType', media: 'image' },
    prepare({ alt, serviceType, media }) {
      return { title: alt || serviceType || 'Image', media }
    },
  },
})
