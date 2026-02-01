import { groq } from 'next-sanity'

export const settingsQuery = groq`*[_type == "settings"][0]{
  name,
  tagline,
  logo,
  hero,
  clients,
  stats,
  cta,
  social,
  seo {
    metaTitle,
    metaDescription,
    "ogImage": ogImage.asset->url,
    keywords
  }
}`

export const caseStudiesQuery = groq`*[_type == "caseStudy"] | order(order asc){
  _id,
  title,
  slug,
  category,
  tags,
  description,
  image,
  client,
  year,
  featured
}`

export const featuredCaseStudiesQuery = groq`*[_type == "caseStudy" && featured == true] | order(order asc)[0...3]{
  _id,
  title,
  slug,
  category,
  description,
  image,
  client
}`

export const caseStudyBySlugQuery = groq`*[_type == "caseStudy" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  category,
  tags,
  description,
  image,
  client,
  year,
  content,
  gallery,
  results
}`

export const servicesQuery = groq`*[_type == "service"] | order(order asc){
  _id,
  number,
  name,
  description,
  deliverables
}`

export const teamQuery = groq`*[_type == "teamMember"] | order(order asc){
  _id,
  name,
  role,
  image,
  bio,
  linkedin,
  twitter
}`

export const processStepsQuery = groq`*[_type == "processStep"] | order(order asc){
  _id,
  step,
  title,
  description
}`
