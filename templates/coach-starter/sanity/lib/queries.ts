import { groq } from 'next-sanity'

export const settingsQuery = groq`*[_type == "settings"][0]{
  name,
  title,
  heroImage,
  hero,
  about,
  results,
  cta,
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
  name,
  description,
  features,
  price,
  ctaText,
  ctaUrl
}`

export const testimonialsQuery = groq`*[_type == "testimonial"] | order(order asc){
  _id,
  quote,
  author,
  role,
  result,
  avatar,
  featured
}`

export const featuredTestimonialsQuery = groq`*[_type == "testimonial" && featured == true] | order(order asc)[0...3]{
  _id,
  quote,
  author,
  role,
  result,
  avatar
}`

export const faqQuery = groq`*[_type == "faqItem"] | order(order asc){
  _id,
  question,
  answer
}`

export const leadMagnetQuery = groq`*[_type == "leadMagnet"][0]{
  title,
  description,
  features,
  ctaText,
  formAction,
  image
}`
