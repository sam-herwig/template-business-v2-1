// Sanity client - uncomment and install @sanity/client when ready
// import { createClient } from '@sanity/client'

// Stub client for template - replace with real Sanity client
interface SanityClient {
  fetch: <T>(query: string, params?: Record<string, unknown>) => Promise<T>
}

// Mock client - replace with createClient when @sanity/client is installed
export const client: SanityClient = {
  fetch: async <T>(): Promise<T> => {
    console.warn('Sanity client not configured. Install @sanity/client and update this file.')
    return [] as T
  }
}

// Real implementation (uncomment when @sanity/client is installed):
// export const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
//   apiVersion: '2024-01-01',
//   useCdn: process.env.NODE_ENV === 'production',
// })

export async function sanityFetch<T>(query: string, params?: Record<string, unknown>): Promise<T> {
  return client.fetch<T>(query, params)
}
