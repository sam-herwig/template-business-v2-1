import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Item Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'e.g., "$16"',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      options: {
        list: [
          { title: 'Fan Favorite', value: 'Fan Favorite' },
          { title: 'Vegetarian', value: 'Vegetarian' },
          { title: 'Vegan', value: 'Vegan' },
          { title: 'Spicy', value: 'Spicy' },
          { title: 'Gluten-Free', value: 'Gluten-Free' },
          { title: 'New', value: 'New' },
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Show on Homepage',
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
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', price: 'price', media: 'image' },
    prepare: ({ title, price, media }) => ({ title, subtitle: price, media }),
  },
})
