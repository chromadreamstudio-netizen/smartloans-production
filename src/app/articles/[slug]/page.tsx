'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Eye, ArrowRight, Calculator } from 'lucide-react';

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

  let cleanHtml = article.text || article.content || '';
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

        {/* محتوى المقال مع دعم كامل للـ HTML وصناديق الأكواد */}
        <div 
          className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 mb-16 space-y-6 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-blue-400 [&>h3]:mt-6 [&>h3]:mb-3 [&>ul]:list-disc [&>ul]:pl-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-slate-400"
          suppressHydrationWarning={true}
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
        />

        {/* صندوق الـ CTA الاحترافي أسفل المقال */}
        <div className="mt-16 p-8 md:p-12 bg-gradient-to-br from-blue-900 to-[#0B0C15] rounded-3xl border border-blue-800/50 text-center shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-400 opacity-80"></div>
          <Calculator className="w-12 h-12 text-blue-400 mx-auto mb-6 opacity-80 group-hover:scale-110 transition-transform duration-500" />
          <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight">
            Stop Guessing. Start Calculating.
          </h3>
          <p className="text-blue-100/70 mb-8 max-w-xl mx-auto text-lg leading-relaxed">
            Apply these concepts directly to your finances. Use our free, unbiased tools to get mathematically precise answers in seconds.
          </p>
          <Link
            href="/tools" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-900 bg-white rounded-full hover:bg-blue-50 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] hover:-translate-y-1"
          >
            Launch Free Toolkit <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
        
      </div>
    </div>
  );
}
```[cite: 2]

قم بلصق هذا الكود في مشروعك المحلي داخل جهازك، ثم ارفعه عبر GitHub ليتم تحديث الموقع فوراً:
```bash
git add .
git commit -m "Update full article display with rich HTML classes"
git push