/** @type {import('next').NextConfig} */
const nextConfig = {/** @type {import('next').NextConfig} */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      }
    ],
  },

  eslint: {
  ignoreDuringBuilds: true,
},


};

export default nextConfig;
