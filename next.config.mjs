/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    // Allow Server Actions to receive multipart/form-data bodies up to 6 MB.
    // This accommodates the 5 MB maximum image upload size plus form overhead.
    serverActions: {
      bodySizeLimit: '6mb',
    },
  },
}

export default nextConfig
