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
    serverComponentsExternalPackages: ['cloudinary', 'graphql-request'],
    serverActions: true
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  }
  // ...other config settings
};

module.exports = nextConfig;