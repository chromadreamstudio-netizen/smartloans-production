import { MetadataRoute } from 'next';
import { ALL_ARTICLES } from '@/data/articles';
import { TOOLS_DATA } from '@/data/tools';

// 👇 هذا السطر هو الحل السحري للإيرور
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://smartloansanalysis.com';

  const staticPages = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/tools`, lastModified: new Date() },
    { url: `${baseUrl}/articles`, lastModified: new Date() },
  ];

  const articles = Object.keys(ALL_ARTICLES).map((slug) => ({
    url: `${baseUrl}/articles/${slug}`,
    lastModified: new Date(),
  }));

  const tools = Object.keys(TOOLS_DATA).map((id) => ({
    url: `${baseUrl}/tools/${id}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...articles, ...tools];
}