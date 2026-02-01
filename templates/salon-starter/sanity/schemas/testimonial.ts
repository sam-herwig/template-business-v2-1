import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'serviceReceived',
      title: 'Service Received',
      type: 'string',
      description: 'e.g., "Balayage", "Haircut & Style"',
    }),
    defineField({
      name: 'stylist',
      title: 'Stylist',
      type: 'reference',
      to: [{ type: 'teamMember' }],
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
      initialValue: 5,
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
  preview: {
    select: { quote: 'quote', author: 'author', rating: 'rating' },
    prepare({ quote, author, rating }) {
      return {
        title: author,
        subtitle: `${'★'.repeat(rating || 0)} "${quote?.substring(0, 50)}..."`,
      }
    },
  },
})
