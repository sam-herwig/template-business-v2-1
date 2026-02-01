import { groq } from 'next-sanity'

export const settingsQuery = groq`*[_type == "settings"][0]{
  name,
  tagline,
  description,
  heroImage,
  logo,
  phone,
  email,
  address,
  hours,
  reservationUrl,
  orderUrl,
  socialLinks,
  aboutTitle,
  aboutContent,
  aboutImage,
  seo {
    metaTitle,
    metaDescription,
    "ogImage": ogImage.asset->url,
    keywords
  }
}`

export const menuCategoriesQuery = groq`*[_type == "menuCategory"] | order(order asc){
  _id,
  name,
  slug,
  description
}`

export const menuItemsQuery = groq`*[_type == "menuItem" && available == true] | order(order asc){
  _id,
  name,
  description,
  price,
  priceNote,
  image,
  dietary,
  featured,
  "category": category->slug.current
}`

export const featuredItemsQuery = groq`*[_type == "menuItem" && featured == true && available == true] | order(order asc)[0...6]{
  _id,
  name,
  description,
  price,
  priceNote,
  image,
  dietary
}`

export const galleryQuery = groq`*[_type == "galleryImage"] | order(order asc){
  _id,
  image,
  alt,
  caption
}`

export const testimonialsQuery = groq`*[_type == "testimonial" && featured == true] | order(order asc){
  _id,
  quote,
  author,
  rating,
  source
}`
