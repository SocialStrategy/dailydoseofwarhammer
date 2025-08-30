/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'warhammer40000.com', 'www.instagram.com'],
    formats: ['image/webp', 'image/avif'],
  },
  async rewrites() {
    return [
      {
        source: '/api/warhammer-community/:path*',
        destination: 'https://www.warhammer-community.com/:path*',
      },
    ]
  },
}

module.exports = nextConfig
