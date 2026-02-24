export default {
  name: 'caseStudy',
  title: 'Launchpad Story',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Company/Product Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'One-Line Transformation',
      type: 'string',
      description: 'e.g., "How we helped AgriPro go from idea to $50K revenue in 6 months"'
    },
    {
      name: 'category',
      title: 'Industry',
      type: 'string',
      options: {
        list: [
          { title: 'Agtech', value: 'agtech' },
          { title: 'Fintech', value: 'fintech' },
          { title: 'Healthcare', value: 'healthcare' },
          { title: 'Education', value: 'education' },
          { title: 'Real Estate', value: 'real-estate' },
          { title: 'Construction', value: 'construction' },
          { title: 'E-commerce', value: 'ecommerce' },
          { title: 'Creative Economy', value: 'creative-economy' },
          { title: 'Logistics', value: 'logistics' },
          { title: 'Other', value: 'other' }
        ]
      }
    },
    {
      name: 'stage',
      title: 'Project Stage',
      type: 'string',
      description: 'What stage was the project at?',
      options: {
        list: [
          { title: 'MVP (Idea to Launch)', value: 'mvp' },
          { title: 'Scale (Growth)', value: 'scale' },
          { title: 'Enterprise (Optimization)', value: 'enterprise' }
        ]
      }
    },
    {
      name: 'outcomeType',
      title: 'Primary Outcome',
      type: 'string',
      description: 'What was the main business impact?',
      options: {
        list: [
          { title: 'Revenue Growth', value: 'revenue-growth' },
          { title: 'Operational Efficiency', value: 'operational-efficiency' },
          { title: 'Market Expansion', value: 'market-expansion' },
          { title: 'Product Launch', value: 'product-launch' }
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

    // FOUNDER INFORMATION
    {
      name: 'founderName',
      title: 'Founder Name',
      type: 'string',
      description: 'Primary founder or team lead'
    },
    {
      name: 'founderRole',
      title: 'Founder Role',
      type: 'string',
      description: 'e.g., "Founder & CEO", "Co-founder"'
    },
    {
      name: 'founderPhoto',
      title: 'Founder Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }
      ]
    },
    {
      name: 'founderBio',
      title: 'Founder Bio',
      type: 'text',
      description: 'Brief background about the founder'
    },

    // THE STORY SECTIONS
    {
      name: 'backstory',
      title: 'The Backstory',
      type: 'text',
      description: 'What they were trying to solve, what was broken, why it mattered'
    },
    {
      name: 'result',
      title: 'Key Result',
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
      title: 'The Problem (Section 1)',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Founder\'s original pain point, market context'
    },
    {
      name: 'solution',
      title: 'The Build (Section 2)',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Technical approach, specific decisions, timeline and constraints'
    },
    {
      name: 'impact',
      title: 'The Outcome (Section 3)',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Hard metrics, what happened next'
    },

    // BUILD DETAILS
    {
      name: 'technicalChallenges',
      title: 'Technical Challenges',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key technical hurdles faced during development',
      options: { layout: 'tags' }
    },
    {
      name: 'stackDecisions',
      title: 'Stack Decisions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'decision',
              title: 'Decision',
              type: 'string',
              description: 'e.g., "Chose Next.js over React + Express"'
            },
            {
              name: 'reasoning',
              title: 'Reasoning',
              type: 'text',
              description: 'Why we made this choice'
            }
          ]
        }
      ]
    },
    {
      name: 'buildTimeline',
      title: 'Build Timeline',
      type: 'string',
      description: 'e.g., "6 weeks from concept to launch"'
    },
    {
      name: 'pivots',
      title: 'Pivots & Key Learnings',
      type: 'text',
      description: 'Major changes or insights during development'
    },
    // TESTIMONIAL
    {
      name: 'quote',
      title: 'Founder Testimonial',
      type: 'text',
      description: 'Quote from the founder about working together'
    },
    {
      name: 'author',
      title: 'Quote Author',
      type: 'string',
      description: 'Name and title (uses founderName if not provided)'
    },
    {
      name: 'clientAvatar',
      title: 'Testimonial Avatar',
      type: 'image',
      options: { hotspot: true },
      description: 'Uses founderPhoto if not provided'
    },
    {
      name: 'videoTestimonialUrl',
      title: 'Video Testimonial URL',
      type: 'url',
      description: 'YouTube, Vimeo, or Loom link (optional)'
    },
    // THE TOOLKIT
    {
      name: 'technologies',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Technologies and tools used'
    },
    {
      name: 'techStackDetails',
      title: 'Tech Stack Breakdown',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'category',
              title: 'Category',
              type: 'string',
              description: 'e.g., "Frontend", "Backend", "Infrastructure"'
            },
            {
              name: 'tools',
              title: 'Tools',
              type: 'array',
              of: [{ type: 'string' }]
            }
          ]
        }
      ]
    },
    {
      name: 'lessonsLearned',
      title: 'Lessons Learned',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key takeaways for other founders',
      options: { layout: 'tags' }
    },
    {
      name: 'relatedResources',
      title: 'Related Resources',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Resource Title',
              type: 'string'
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url'
            }
          ]
        }
      ]
    },
    {
      name: 'projectUrl',
      title: 'Live Project URL',
      type: 'url'
    },

    // LIVING STORY (Updates)
    {
      name: 'updates',
      title: 'Story Updates',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'date',
              title: 'Update Date',
              type: 'date'
            },
            {
              name: 'title',
              title: 'Update Title',
              type: 'string',
              description: 'e.g., "6 Months Later: Scaling to Enterprise"'
            },
            {
              name: 'content',
              title: 'Update Content',
              type: 'text'
            },
            {
              name: 'metrics',
              title: 'New Metrics',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', type: 'string' },
                    { name: 'value', type: 'string' }
                  ]
                }
              ]
            }
          ]
        }
      ],
      description: 'Track the ongoing journey - add updates quarterly'
    },
    {
      name: 'whatsNext',
      title: 'What\'s Next',
      type: 'text',
      description: 'Current status and future plans'
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
