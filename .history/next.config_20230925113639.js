// ./nextjs-app/next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    domains: ['lh3.googleusercontent.com', 'res.cloudinary.com']
  },
  // ...other config settings
};

module.exports = nextConfig;