import { MetadataRoute } from 'next';

// 👇 هذا السطر هو الحل السحري للإيرور
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://smartloansanalysis.com/sitemap.xml',
  };
}