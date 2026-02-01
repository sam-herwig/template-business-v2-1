// groq is just a tagged template literal for syntax highlighting
const groq = (strings: TemplateStringsArray, ...values: unknown[]) => 
  strings.reduce((acc, str, i) => acc + str + (values[i] ?? ''), '')

export const settingsQuery = groq`*[_type == "settings"][0]{
  name,
  tagline,
  heroImage,
  logo,
  phone,
  email,
  address,
  license,
  insurance,
  yearsInBusiness,
  projectsCompleted,
  serviceAreas,
  hours,
  certifications,
  socialLinks,
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
  slug,
  icon,
  description,
  features,
  image,
  priceRange,
  featured
}`

export const featuredServicesQuery = groq`*[_type == "service" && featured == true] | order(order asc)[0...6]{
  _id,
  name,
  slug,
  icon,
  description,
  image
}`

export const projectsQuery = groq`*[_type == "project"] | order(order asc){
  _id,
  title,
  slug,
  category,
  description,
  beforeImage,
  afterImage,
  gallery,
  location,
  completedDate,
  featured
}`

export const featuredProjectsQuery = groq`*[_type == "project" && featured == true] | order(order asc)[0...6]{
  _id,
  title,
  slug,
  category,
  beforeImage,
  afterImage,
  location
}`

export const testimonialsQuery = groq`*[_type == "testimonial" && featured == true] | order(order asc){
  _id,
  quote,
  author,
  location,
  projectType,
  rating,
  source
}`

export const faqQuery = groq`*[_type == "faqItem"] | order(order asc){
  _id,
  question,
  answer
}`
