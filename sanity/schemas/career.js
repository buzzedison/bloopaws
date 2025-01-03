export default {
  name: 'career',
  title: 'Careers',
  type: 'document',
  icon: () => '💼',
  fields: [
    {
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: Rule => Rule.required()
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
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          { title: 'Engineering', value: 'engineering' },
          { title: 'Design', value: 'design' },
          { title: 'Marketing', value: 'marketing' },
          { title: 'Sales', value: 'sales' },
          { title: 'Operations', value: 'operations' },
          { title: 'Product', value: 'product' },
          { title: 'Customer Support', value: 'customer-support' },
        ],
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'type',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-time', value: 'full-time' },
          { title: 'Part-time', value: 'part-time' },
          { title: 'Contract', value: 'contract' },
          { title: 'Internship', value: 'internship' },
        ],
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'experience',
      title: 'Experience Level',
      type: 'string',
      options: {
        list: [
          { title: 'Entry Level', value: 'entry' },
          { title: 'Mid Level', value: 'mid' },
          { title: 'Senior', value: 'senior' },
          { title: 'Lead', value: 'lead' },
        ],
      },
    },
    {
      name: 'salary',
      title: 'Salary Range',
      type: 'object',
      fields: [
        {
          name: 'min',
          title: 'Minimum',
          type: 'number',
        },
        {
          name: 'max',
          title: 'Maximum',
          type: 'number',
        },
        {
          name: 'currency',
          title: 'Currency',
          type: 'string',
          initialValue: 'USD',
        },
        {
          name: 'period',
          title: 'Period',
          type: 'string',
          options: {
            list: ['yearly', 'monthly'],
          },
          initialValue: 'yearly',
        },
      ],
    },
    {
      name: 'summary',
      title: 'Job Summary',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Job Description',
      type: 'array',
      of: [{ type: 'block' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'applicationUrl',
      title: 'Application URL',
      type: 'url',
      description: 'External application link (optional)',
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Set to false to hide this position from the careers page'
    },
  ],
  preview: {
    select: {
      title: 'title',
      department: 'department',
      location: 'location',
      isActive: 'isActive'
    },
    prepare(selection) {
      const { title, department, location, isActive } = selection;
      return {
        title: `${title} ${!isActive ? '(Inactive)' : ''}`,
        subtitle: `${department} • ${location}`,
      };
    },
  },
} 