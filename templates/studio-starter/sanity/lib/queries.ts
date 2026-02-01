// Template tagged literal for GROQ queries
// Install next-sanity for full functionality: npm install next-sanity
const groq = (strings: TemplateStringsArray, ...values: unknown[]): string => {
  return strings.reduce((acc, str, i) => acc + str + (values[i] ?? ''), '')
}

export const settingsQuery = groq`*[_type == "settings"][0]{
  name,
  tagline,
  email,
  location,
  heroBadge,
  heroHeadline,
  heroHighlight,
  heroSubtitle,
  stats,
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
  gradientColors,
  span
}`

export const testimonialsQuery = groq`*[_type == "testimonial"] | order(order asc){
  _id,
  quote,
  author,
  role,
  accentColor,
  span
}`

export const clientsQuery = groq`*[_type == "client"] | order(order asc){
  _id,
  name,
  "logo": logo.asset->url,
  logoEmoji
}`
