import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'membershipTier',
  title: 'Membership Tier',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Tier Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'period',
      title: 'Period',
      type: 'string',
      options: {
        list: [
          { title: 'Per Visit', value: 'visit' },
          { title: 'Per Week', value: 'week' },
          { title: 'Per Month', value: 'month' },
          { title: 'Per Year', value: 'year' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'note',
      title: 'Note',
      type: 'string',
      description: 'e.g., "Billed annually ($708/year)"',
    }),
    defineField({
      name: 'featured',
      title: 'Featured (Most Popular)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'signupUrl',
      title: 'Sign-up URL',
      type: 'url',
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
    select: { title: 'name', price: 'price', period: 'period', featured: 'featured' },
    prepare({ title, price, period, featured }) {
      return {
        title: `${title}${featured ? ' ⭐' : ''}`,
        subtitle: `$${price}/${period}`,
      }
    },
  },
})
