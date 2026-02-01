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
  trialOffer,
  stats,
  socialLinks,
  seo {
    metaTitle,
    metaDescription,
    "ogImage": ogImage.asset->url,
    keywords
  }
}`

export const classTypesQuery = groq`*[_type == "classType"]{
  _id,
  name,
  slug,
  description,
  image,
  intensity,
  duration,
  benefits,
  equipment
}`

export const scheduleQuery = groq`*[_type == "classSchedule" && active == true]{
  _id,
  dayOfWeek,
  startTime,
  duration,
  spotsTotal,
  bookingUrl,
  "className": classType->name,
  "classSlug": classType->slug.current,
  "intensity": classType->intensity,
  "instructor": instructor->name,
  "instructorImage": instructor->image
}`

export const scheduleByDayQuery = groq`{
  "monday": *[_type == "classSchedule" && dayOfWeek == "monday" && active == true] | order(startTime asc),
  "tuesday": *[_type == "classSchedule" && dayOfWeek == "tuesday" && active == true] | order(startTime asc),
  "wednesday": *[_type == "classSchedule" && dayOfWeek == "wednesday" && active == true] | order(startTime asc),
  "thursday": *[_type == "classSchedule" && dayOfWeek == "thursday" && active == true] | order(startTime asc),
  "friday": *[_type == "classSchedule" && dayOfWeek == "friday" && active == true] | order(startTime asc),
  "saturday": *[_type == "classSchedule" && dayOfWeek == "saturday" && active == true] | order(startTime asc),
  "sunday": *[_type == "classSchedule" && dayOfWeek == "sunday" && active == true] | order(startTime asc)
}`

export const membershipTiersQuery = groq`*[_type == "membershipTier"] | order(order asc){
  _id,
  name,
  price,
  period,
  description,
  features,
  note,
  featured,
  signupUrl
}`

export const trainersQuery = groq`*[_type == "trainer"] | order(order asc){
  _id,
  name,
  slug,
  image,
  specialty,
  certifications,
  bio,
  instagram,
  bookingUrl,
  featured
}`

export const featuredTrainersQuery = groq`*[_type == "trainer" && featured == true] | order(order asc)[0...4]{
  _id,
  name,
  image,
  specialty,
  certifications
}`

export const amenitiesQuery = groq`*[_type == "amenity"] | order(order asc){
  _id,
  name,
  icon,
  description,
  image
}`
