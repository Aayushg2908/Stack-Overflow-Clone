/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*",
        protocol: "https",
      },
      {
        hostname: "*",
        protocol: "http",
      }
    ],
  }
}

module.exports = nextConfig
