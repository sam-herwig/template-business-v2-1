import { groq } from 'next-sanity'

export const settingsQuery = groq`*[_type == "settings"][0]{
  name,
  logo,
  hero,
  trustBadges,
  cta,
  footer,
  seo {
    metaTitle,
    metaDescription,
    "ogImage": ogImage.asset->url,
    keywords
  }
}`

export const featuresQuery = groq`*[_type == "feature"] | order(order asc){
  _id,
  icon,
  title,
  description
}`

export const pricingTiersQuery = groq`*[_type == "pricingTier"] | order(order asc){
  _id,
  name,
  price,
  period,
  description,
  features,
  ctaText,
  ctaUrl,
  popular
}`

export const testimonialsQuery = groq`*[_type == "testimonial"] | order(order asc){
  _id,
  quote,
  author,
  role,
  avatar,
  companyLogo,
  featured
}`

export const featuredTestimonialsQuery = groq`*[_type == "testimonial" && featured == true] | order(order asc)[0...3]{
  _id,
  quote,
  author,
  role,
  avatar,
  companyLogo
}`

export const faqQuery = groq`*[_type == "faqItem"] | order(order asc){
  _id,
  question,
  answer
}`
