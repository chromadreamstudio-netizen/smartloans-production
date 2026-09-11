import React from 'react';
export const dynamic = 'force-dynamic';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Share2, Clock, Calculator } from 'lucide-react';
import { Metadata } from 'next';
import { TOOLS_DATA } from '@/data/tools';

// 1. استيراد دوال جلب البيانات من قاعدة البيانات (Supabase)
import { getArticleBySlug, getAllArticles } from '@/lib/api';

// استيراد المكونات
import AdUnit from '@/components/AdUnit';
import LeadMagnet from '@/components/LeadMagnet';
import CalculatorEngine from '@/components/CalculatorEngine';

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article: any) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: 'Article Not Found' };
  }

  return {
    title: article.meta_title || article.title,
    description: article.meta_description || article.subtitle,
    openGraph: {
      title: article.meta_title || article.title,
      description: article.meta_description || article.subtitle,
      url: `/articles/${slug}`,
      siteName: 'SmartLoans Analysis',
      images: [{ url: article.image_url, width: 1200, height: 630, alt: article.title }],
      locale: 'en_US',
      type: 'article',
      publishedTime: article.created_at,
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.meta_title || article.title,
      description: article.meta_description || article.subtitle,
      images: [article.image_url],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return notFound();
  }

  // البحث عن الأداة المدمجة (إن وجدت مستقبلاً)
  const embeddedTool = article.embedded_tool ? TOOLS_DATA[article.embedded_tool] : null;

  // تنسيق التاريخ من قاعدة البيانات
  const formattedDate = new Date(article.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.meta_title || article.title,
    description: article.meta_description || article.subtitle,
    image: article.image_url ? [article.image_url] : [],
    datePublished: new Date(article.created_at).toISOString(),
    dateModified: new Date(article.updated_at).toISOString(),
    author: [{ '@type': 'Person', name: article.author }],
    publisher: {
        '@type': 'Organization',
        name: 'SmartLoans Analysis',
        logo: { '@type': 'ImageObject', url: 'https://smartloansanalysis.com/logo.png' }
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://smartloansanalysis.com/articles/${slug}` }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0C15] text-slate-900 dark:text-slate-200 pb-20 font-sans transition-colors duration-300">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="absolute inset-0 bg-blue-500/5 opacity-20 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <Link href="/articles" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-white mb-8 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Articles
          </Link>
          
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-full font-bold uppercase tracking-wider text-xs">
              {article.category}
            </span>
            <span className="flex items-center text-slate-500 dark:text-slate-400">
              <Calendar className="w-4 h-4 mr-2" /> {formattedDate}
            </span>
             <span className="flex items-center text-slate-500 dark:text-slate-400">
              <Clock className="w-4 h-4 mr-2" /> {article.read_time}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
            {article.title}
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            {article.subtitle || article.meta_description}
          </p>

          <div className="flex items-center gap-4 mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
             <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center border border-slate-300 dark:border-slate-700">
                <User className="w-5 h-5 text-slate-500 dark:text-slate-400" />
             </div>
             <div>
                <p className="text-slate-900 dark:text-white font-bold text-sm">{article.author}</p>
             </div>
             <button className="ml-auto p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white">
                <Share2 className="w-5 h-5" />
             </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        
        <AdUnit slotId="8932145670" className="mb-12" />

        <article className="prose prose-lg max-w-none 
          prose-headings:text-slate-900 dark:prose-headings:text-white 
          prose-p:text-slate-700 dark:prose-p:text-slate-300 
          prose-strong:text-slate-900 dark:prose-strong:text-white 
          prose-li:text-slate-700 dark:prose-li:text-slate-300
          prose-a:text-blue-600 dark:prose-a:text-blue-400">
          
          <AdUnit slotId="2569874103" className="my-10" />

          {/* Main HTML Content */}
          <div dangerouslySetInnerHTML={{ __html: article.content }} />

          {/* قسم الأداة المدمجة (Interactive Tool) */}
          {embeddedTool && (
            <div className="my-16 not-prose animate-fade-in-up">
                <div className="bg-[#131620] rounded-3xl border border-blue-500/30 p-1 shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-50">
                        <Calculator className="w-24 h-24 text-blue-500/10" />
                    </div>
                    <div className="p-6 border-b border-slate-800 bg-blue-900/10">
                        <span className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2 block">Interactive Tool</span>
                        <h3 className="text-2xl font-bold text-white mb-2">Try It Yourself: {embeddedTool.title}</h3>
                        <p className="text-slate-400 text-sm">Apply what you just read. Calculate your numbers below.</p>
                    </div>
                    
                    <CalculatorEngine 
                        type={embeddedTool.type} 
                        title={embeddedTool.title} 
                        description={embeddedTool.desc} 
                    />
                </div>
            </div>
          )}

        </article>

        {/* Lead Magnet */}
        <div className="mt-16">
            <LeadMagnet />
        </div>

        {/* Footer Ad */}
        <div className="mt-10 pt-10 border-t border-slate-200 dark:border-slate-800">
            <AdUnit slotId="1234567890" />
        </div>
      </div>
    </div>
  );
}