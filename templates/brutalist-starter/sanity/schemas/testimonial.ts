// @ts-nocheck
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
      name: 'role',
      title: 'Role/Company',
      type: 'string',
    }),
    defineField({
      name: 'color',
      title: 'Card Color',
      type: 'string',
      options: {
        list: [
          { title: 'Yellow', value: 'yellow' },
          { title: 'Pink', value: 'pink' },
          { title: 'Blue', value: 'blue' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: { author: 'author', quote: 'quote' },
    prepare: ({ author, quote }) => ({
      title: author,
      subtitle: `"${quote?.substring(0, 50)}..."`,
    }),
  },
})
