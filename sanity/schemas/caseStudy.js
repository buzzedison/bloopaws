export default {
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Technology', value: 'technology' },
          { title: 'Healthcare', value: 'healthcare' },
          { title: 'Finance', value: 'finance' },
          { title: 'Education', value: 'education' },
          { title: 'Real Estate', value: 'real-estate' },
          { title: 'Construction', value: 'construction' },
          { title: 'E-commerce', value: 'ecommerce' },
          { title: 'Other', value: 'other' }
        ]
      }
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'result',
      title: 'Result',
      type: 'string',
      description: 'A brief description of the key result (e.g., "1,500 beta users in 60 days")'
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      description: 'Used for cards and SEO previews'
    },
    {
      name: 'challenge',
      title: 'The Challenge',
      type: 'text',
    },
    {
      name: 'solution',
      title: 'The Solution',
      type: 'text',
    },
    {
      name: 'impact',
      title: 'The Impact',
      type: 'text',
    },
    {
      name: 'quote',
      title: 'Client Quote',
      type: 'text',
    },
    {
      name: 'author',
      title: 'Quote Author',
      type: 'string',
      description: 'Name and title of the person who provided the quote'
    },
    {
      name: 'clientAvatar',
      title: 'Client Avatar',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' }
    },
    {
      name: 'projectUrl',
      title: 'Project URL',
      type: 'url'
    },
    {
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
            },
            {
              name: 'value',
              title: 'Value',
              type: 'string',
            },
            {
              name: 'period',
              title: 'Period',
              type: 'string',
            }
          ]
        }
      ]
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
        }
      ]
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }
      ]
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            }
          ]
        }
      ]
    },
    {
      name: 'content',
      title: 'Full Case Study Content',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'mainImage',
    },
  },
}
