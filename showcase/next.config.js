/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  
  // Base path for GitHub Pages (repo name)
  // Change this if deploying to custom domain
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  
  images: {
    // Use unoptimized images for static export
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  
  // Trailing slashes for GitHub Pages compatibility
  trailingSlash: true,
}

module.exports = nextConfig
