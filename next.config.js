/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  ignoreDuringBuilds: true,
  basePath: '/listing',
  async rewrites() {
    return [
       {
          source: '/',
          destination: '/'
       }
    ]
 }
}

module.exports = nextConfig
