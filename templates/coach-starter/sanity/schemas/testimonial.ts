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
      rows: 4,
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
      title: 'Role/Business',
      type: 'string',
    }),
    defineField({
      name: 'result',
      title: 'Result Achieved',
      type: 'string',
      description: 'e.g., "$10K month in 3 months"',
    }),
    defineField({
      name: 'avatar',
      title: 'Photo',
      type: 'image',
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
    select: { title: 'author', result: 'result', media: 'avatar' },
    prepare({ title, result, media }) {
      return { title, subtitle: result, media }
    },
  },
})
