import { groq } from 'next-sanity'

export const settingsQuery = groq`*[_type == "settings"][0]{
  name,
  tagline,
  phone,
  email,
  heroSubtitle,
  heroTitle,
  heroTitleAccent,
  heroDescription,
  "heroImage": heroImage.asset->url,
  address,
  neighborhood,
  hours,
  reservationUrl,
  social,
  seo {
    metaTitle,
    metaDescription,
    "ogImage": ogImage.asset->url,
    keywords
  }
}`

export const menuItemsQuery = groq`*[_type == "menuItem" && featured == true] | order(order asc){
  _id,
  name,
  description,
  price,
  "image": image.asset->url,
  tag
}`

export const instagramPostsQuery = groq`*[_type == "instagramPost"] | order(order asc)[0...6]{
  _id,
  "image": image.asset->url,
  caption,
  url
}`
