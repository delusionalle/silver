/** @type {import('next').NextConfig} */

import "./env.mjs"

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"]
  }
}

export default nextConfig