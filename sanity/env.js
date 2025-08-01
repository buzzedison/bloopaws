


export const apiVersion = '2023-11-21'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

// Ensure these are always defined, even if env vars are missing
if (!dataset) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SANITY_DATASET')
}

if (!projectId) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID')
}

export const useCdn = false

export const token = process.env.SANITY_API_TOKEN

// This is the document id used for the preview secret that's stored in your dataset.
export const previewSecretId = 'preview.secret'