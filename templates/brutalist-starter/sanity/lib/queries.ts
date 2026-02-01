// @ts-nocheck
// Sanity GROQ queries
// To use: npm install next-sanity

// Template placeholder - install next-sanity when ready to use CMS features

// Use groq tagged template if available, otherwise plain string
const groq = (strings: TemplateStringsArray, ...values: unknown[]): string => 
  strings.reduce((acc, str, i) => acc + str + (values[i] ?? ''), '')

export const settingsQuery = groq`*[_type == "settings"][0]{
  name,
  tagline,
  email,
  phone,
  address,
  heroBadge,
  heroHeadline,
  heroHighlight,
  heroSubtitle,
  primaryCta,
  secondaryCta,
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
  icon,
  title,
  description,
  color
}`

export const projectsQuery = groq`*[_type == "project"] | order(order asc){
  _id,
  title,
  slug,
  category,
  image,
  color,
  featured
}`

export const testimonialsQuery = groq`*[_type == "testimonial"] | order(order asc){
  _id,
  quote,
  author,
  role,
  color
}`
