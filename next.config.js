/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use standalone output for production builds (Vercel handles this automatically)
  ...(process.env.NODE_ENV === 'production' && { output: 'standalone' }),
  images: {
    unoptimized: true, // IONOS may not support image optimization
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Suppress hydration warnings caused by browser extensions
  reactStrictMode: false,
}

module.exports = nextConfig
