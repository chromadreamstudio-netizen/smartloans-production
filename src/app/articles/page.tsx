import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

export const metadata = {
  title: 'Financial Analysis & Articles - SmartLoans',
  description: 'Deep dives into mortgage math, investment strategies, and debt payoff plans.',
};

export default async function ArticlesIndex() {
  let articles = [];
  
  // الاتصال المباشر بقاعدة بيانات Supabase لجلب المقالات
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/articles?select=slug,title,created_at,views&order=created_at.desc`, {
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      // نستخدم الكاش الذي سيتم تحديثه سرياً فور انتهاء n8n
      next: { revalidate: 86400, tags: ['articles'] }
    });
    
    if (res.ok) {
      articles = await res.json();
    }
  } catch (err) {
    console.error('Failed to fetch articles');
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0C15] pt-32 pb-20 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
            Financial Intelligence
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            No sponsored posts. No affiliate bias. Just mathematical analysis of the financial products shaping your life.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article: any) => {
            // تحويل تاريخ إنشاء المقال إلى تنسيق مقروء
            const formattedDate = new Date(article.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            });

            return (
              <Link 
                key={article.slug} 
                href={`/articles/${article.slug}`} 
                className="group flex flex-col bg-white dark:bg-[#131620] border border-slate-200 dark:border-white/5 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 hover:-translate-y-2"
              >
                {/* Image Placeholder - خلفية أنيقة كبديل للصور حالياً */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  <span className="text-slate-700 dark:text-slate-600 font-bold text-2xl opacity-30 group-hover:scale-110 transition-transform duration-700">
                    SmartLoans
                  </span>
                </div>

                {/* Content */}
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3"/> {formattedDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3"/> {article.views || 0} views
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {article.title}
                  </h3>
                  
                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-bold text-sm mt-auto group/btn">
                    Read Analysis <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform"/>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {(!articles || articles.length === 0) && (
          <div className="text-center text-slate-500 py-20 text-lg">
            No articles found.
          </div>
        )}

      </div>
    </div>
  );
}