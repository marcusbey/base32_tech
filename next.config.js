/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  turbopack: {},
  experimental: {
    optimizePackageImports: ['@radix-ui/react-*', '@headlessui/react'],
  },
};

// Handle graceful shutdown
if (process.env.NODE_ENV === 'development') {
  process.on('SIGINT', () => {
    process.exit(0);
  });
}

module.exports = withBundleAnalyzer(nextConfig);
