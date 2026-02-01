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
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'menuCategory' }],
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
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'priceNote',
      title: 'Price Note (e.g., "Market Price")',
      type: 'string',
      description: 'Optional - displays instead of price if set',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'dietary',
      title: 'Dietary Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Vegetarian', value: 'v' },
          { title: 'Vegan', value: 'vg' },
          { title: 'Gluten-Free', value: 'gf' },
          { title: 'Dairy-Free', value: 'df' },
          { title: 'Nut-Free', value: 'nf' },
          { title: 'Spicy', value: 'spicy' },
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Item',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'available',
      title: 'Currently Available',
      type: 'boolean',
      initialValue: true,
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
    select: { title: 'name', price: 'price', category: 'category.name', media: 'image' },
    prepare({ title, price, category, media }) {
      return {
        title,
        subtitle: `${category || 'No category'} · $${price || '?'}`,
        media,
      }
    },
  },
})
