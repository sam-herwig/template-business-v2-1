import { createClient, type QueryParams } from '@sanity/client'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

export async function sanityFetch<T>(query: string, params?: QueryParams): Promise<T> {
  return client.fetch<T>(query, params ?? {})
}
