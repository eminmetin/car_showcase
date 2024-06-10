/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.imagin.studio',
        protocol: 'https',
        port: '',
      },
    ],
  },
};

export default nextConfig;
