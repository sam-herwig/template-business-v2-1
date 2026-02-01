// @ts-nocheck
// Sanity Studio configuration
// To use: npm install sanity sanity/structure

// This config file is used when running Sanity Studio
// Install sanity dependencies when ready to use CMS features

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'brutalist-starter',
  title: 'Brutalist Agency',
  
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  
  plugins: [structureTool()],
  
  schema: {
    types: schemaTypes,
  },
})
