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

// Base44 sandbox only: the preview iframe loads the app from a public proxy
// origin, which Next.js gates dev assets/HMR on. Allow that origin when the
// platform flag is on; unset (or any other value) keeps production behavior.
if (process.env.BASE44_PREVIEW_MODE === '1' && process.env.BASE44_PUBLIC_HOST_SUFFIX) {
  nextConfig.allowedDevOrigins = [`3000-${process.env.BASE44_PUBLIC_HOST_SUFFIX}`]
}

export default nextConfig
