import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'classSchedule',
  title: 'Scheduled Class',
  type: 'document',
  fields: [
    defineField({
      name: 'classType',
      title: 'Class Type',
      type: 'reference',
      to: [{ type: 'classType' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'instructor',
      title: 'Instructor',
      type: 'reference',
      to: [{ type: 'trainer' }],
    }),
    defineField({
      name: 'dayOfWeek',
      title: 'Day of Week',
      type: 'string',
      options: {
        list: [
          { title: 'Monday', value: 'monday' },
          { title: 'Tuesday', value: 'tuesday' },
          { title: 'Wednesday', value: 'wednesday' },
          { title: 'Thursday', value: 'thursday' },
          { title: 'Friday', value: 'friday' },
          { title: 'Saturday', value: 'saturday' },
          { title: 'Sunday', value: 'sunday' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startTime',
      title: 'Start Time',
      type: 'string',
      description: 'e.g., "6:00 AM"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration (minutes)',
      type: 'number',
      validation: (Rule) => Rule.required().min(15),
    }),
    defineField({
      name: 'spotsTotal',
      title: 'Total Spots',
      type: 'number',
    }),
    defineField({
      name: 'bookingUrl',
      title: 'Direct Booking URL',
      type: 'url',
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { className: 'classType.name', day: 'dayOfWeek', time: 'startTime', instructor: 'instructor.name' },
    prepare({ className, day, time, instructor }) {
      return {
        title: `${className} - ${day}`,
        subtitle: `${time} with ${instructor || 'TBD'}`,
      }
    },
  },
})
