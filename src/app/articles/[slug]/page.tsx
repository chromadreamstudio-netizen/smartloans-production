'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Eye } from 'lucide-react';

export default function ArticlePage() {
  const params = useParams();
  const slug = params?.slug;
  
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    async function fetchArticle() {
      try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (url && key) {
          const res = await fetch(`${url}/rest/v1/articles?slug=eq.${slug}&select=*`, {
            headers: {
              'apikey': key,
              'Authorization': `Bearer ${key}`,
              'Content-Type': 'application/json',
            },
          });

          if (res.ok) {
            const data = await res.json();
            if (data && data.length > 0) {
              setArticle(data[0]);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching article:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B0C15] pt-32 pb-20 px-6 flex items-center justify-center">
        <div className="text-slate-500 text-lg">Loading analysis...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B0C15] pt-32 pb-20 px-6 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Article Not Found</h1>
        <Link href="/articles" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
          &larr; Back to Articles
        </Link>
      </div>
    );
  }

  let formattedDate = 'Recent';
  if (article.created_at) {
    try {
      formattedDate = new Date(article.created_at).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    } catch (e) {}
  }

  let cleanHtml = article.text || '';
  cleanHtml = cleanHtml.replace(/```html/gi, '').replace(/```/g, '');
  cleanHtml = cleanHtml.replace(/<\/?html[^>]*>/g, '').replace(/<\/?body[^>]*>/g, '');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0C15] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        <Link href="/articles" className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 mb-8 font-semibold transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Articles
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
          {article.title}
        </h1>
        
        <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400 mb-12 pb-8 border-b border-slate-200 dark:border-slate-800">
          <span className="flex items-center gap-2"><Calendar className="w-4 h-4"/> {formattedDate}</span>
          <span className="flex items-center gap-2"><Eye className="w-4 h-4"/> {article.views || 0} Views</span>
        </div>

        {article.image_url && (
          <div className="mb-12 w-full h-[400px] md:h-[500px] relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800">
            <img 
              src={article.image_url} 
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg";
              }}
            />
          </div>
        )}

        <div 
          className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300"
          suppressHydrationWarning={true}
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
        />
        
      </div>
    </div>
  );
}