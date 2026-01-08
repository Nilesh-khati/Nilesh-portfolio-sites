/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['blob.v0.app'],
    unoptimized: true,
  },
  transpilePackages: ['three', 'framer-motion', 'lucide-react'],
}

export default nextConfig
