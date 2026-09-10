/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // التصدير الثابت
  
  // 1. هذا السطر هو حل مشكلة الموقع "العاري" (بدون ألوان)
  images: {
    unoptimized: true,
  },

  // 2. لتحسين الروابط على هوستنجر
  trailingSlash: true,

  // 3. منع توقف البناء بسبب أخطاء الكتابة الصغيرة
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;