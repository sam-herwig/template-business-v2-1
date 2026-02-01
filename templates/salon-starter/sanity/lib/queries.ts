import { groq } from 'next-sanity'

export const settingsQuery = groq`*[_type == "settings"][0]{
  name,
  tagline,
  heroImage,
  logo,
  phone,
  email,
  address,
  hours,
  bookingUrl,
  bookingPlatform,
  socialLinks,
  giftCardUrl,
  seo {
    metaTitle,
    metaDescription,
    "ogImage": ogImage.asset->url,
    keywords
  }
}`

export const serviceCategoriesQuery = groq`*[_type == "serviceCategory"] | order(order asc){
  _id,
  name,
  slug,
  description
}`

export const servicesQuery = groq`*[_type == "service"] | order(order asc){
  _id,
  name,
  description,
  price,
  priceNote,
  duration,
  bookingUrl,
  "category": category->slug.current,
  "categoryName": category->name
}`

export const servicesByCategoryQuery = groq`*[_type == "serviceCategory"] | order(order asc){
  _id,
  name,
  slug,
  description,
  "services": *[_type == "service" && references(^._id)] | order(order asc){
    _id,
    name,
    description,
    price,
    priceNote,
    duration,
    bookingUrl
  }
}`

export const teamQuery = groq`*[_type == "teamMember"] | order(order asc){
  _id,
  name,
  slug,
  role,
  image,
  bio,
  specialties,
  instagram,
  bookingUrl,
  featured
}`

export const featuredTeamQuery = groq`*[_type == "teamMember" && featured == true] | order(order asc)[0...4]{
  _id,
  name,
  role,
  image,
  specialties,
  instagram
}`

export const galleryQuery = groq`*[_type == "galleryImage"] | order(order asc){
  _id,
  image,
  alt,
  serviceType,
  "stylist": stylist->name
}`

export const testimonialsQuery = groq`*[_type == "testimonial" && featured == true] | order(order asc){
  _id,
  quote,
  author,
  serviceReceived,
  rating,
  "stylist": stylist->name
}`
