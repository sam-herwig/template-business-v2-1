import { groq } from 'next-sanity'

export const settingsQuery = groq`*[_type == "settings"][0]{
  name,
  tagline,
  email,
  phone,
  heroBadge,
  heroTitle,
  heroRotatingWords,
  heroSubtitle,
  typewriterWords,
  marqueeText,
  marqueeOutlineText,
  statementText,
  stats,
  ctaTitle,
  footerTagline,
  social,
  seo {
    metaTitle,
    metaDescription,
    "ogImage": ogImage.asset->url,
    keywords
  }
}`

export const servicesQuery = groq`*[_type == "service"] | order(order asc){
  _id,
  number,
  title,
  description
}`

export const projectsQuery = groq`*[_type == "project"] | order(order asc){
  _id,
  title,
  category,
  "image": image.asset->url
}`
