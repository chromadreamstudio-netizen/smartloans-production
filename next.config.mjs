/** @type {import('next').NextConfig} */
const nextConfig = {
  // تم حذف سطر output: 'export' من هنا لتفعيل الخوادم الديناميكية
  
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**', 
      }
    ],
  },

  trailingSlash: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;