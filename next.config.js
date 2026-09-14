const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'res.cloudinary.com'],
    loader: "default",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['cloudinary', 'graphql-request', 'pdfkit'],
    serverActions: true
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  }
  // ...other config settings
};

module.exports = (phase) => ({
  ...nextConfig,
  // Keep a running dev preview independent from production builds and previews.
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
});
