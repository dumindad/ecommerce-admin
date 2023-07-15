/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: "http://localhost:3000",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
}

module.exports = nextConfig
