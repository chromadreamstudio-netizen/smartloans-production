import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
// 1. استدعاء دالة جلب البيانات من Supabase
import { getAllArticles } from '@/lib/api';

export const metadata = {
  title: 'Financial Analysis & Articles - SmartLoans',
  description: 'Deep dives into mortgage math, investment strategies, and debt payoff plans.',
};

// 2. تحويل المكون إلى async component
export default async function ArticlesIndex() {
  // 3. جلب البيانات ديناميكياً من قاعدة البيانات
  const articles = await getAllArticles();

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
          {articles.map((article) => {
            // تحويل تاريخ الإنشاء إلى تنسيق مقروء
            const formattedDate = new Date(article.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });

            return (
              <Link key={article.slug} href={`/articles/${article.slug}`} className="group flex flex-col bg-white dark:bg-[#131620] border border-slate-200 dark:border-white/5 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 hover:-translate-y-2">
                
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image 
                    src={article.image_url} 
                    alt={article.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-black/60 backdrop-blur text-xs font-bold uppercase tracking-wider rounded-lg text-slate-900 dark:text-white">
                    {article.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {formattedDate}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {article.read_time}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-6 flex-grow">
                    {article.subtitle || article.meta_description}
                  </p>

                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-bold text-sm mt-auto group/btn">
                    Read Analysis <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform"/>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* رسالة تظهر في حال لم تكن هناك مقالات في قاعدة البيانات بعد */}
        {(!articles || articles.length === 0) && (
          <div className="text-center text-slate-500 py-20 text-lg">
            No articles found in the database yet.
          </div>
        )}

      </div>
    </div>
  );
}