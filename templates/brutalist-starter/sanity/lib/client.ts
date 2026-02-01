// @ts-nocheck
// Sanity client configuration
// To use: npm install @sanity/client

// Placeholder client for templates without Sanity dependencies
// Install @sanity/client when ready to use CMS features

type SanityClient = {
  fetch: <T>(query: string, params?: Record<string, unknown>) => Promise<T>
}

let client: SanityClient | null = null

try {
  // Dynamic import to prevent build errors when @sanity/client is not installed
  const sanityModule = require('@sanity/client')
  const createClient = sanityModule.createClient
  
  client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: process.env.NODE_ENV === 'production',
  })
} catch {
  // @sanity/client not installed - provide mock client
  console.warn('Sanity client not configured. Install @sanity/client to enable CMS features.')
  client = {
    fetch: async () => {
      throw new Error('Sanity client not configured')
    }
  }
}

export { client }
