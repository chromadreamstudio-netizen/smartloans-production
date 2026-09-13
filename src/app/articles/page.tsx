import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

export const revalidate = 0;

export default async function ArticlesIndex() {
  let articles: any[] = [];
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/articles?select=slug,title,created_at,views,image_url&order=created_at.desc`, {
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 0 }
    });
    
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        articles = data;
      }
    }
  } catch (err) {
    console.error('Failed to fetch articles:', err);
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
          {articles?.map((article: any) => {
            let formattedDate = 'Recent';
            if (article?.created_at) {
              try {
                formattedDate = new Date(article.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                });
              } catch (e) {}
            }

            return (
              <Link 
                key={article?.slug || Math.random()} 
                href={`/articles/${article?.slug || ''}`} 
                className="group flex flex-col bg-white dark:bg-[#131620] border border-slate-200 dark:border-white/5 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 hover:-translate-y-2"
              >
                {article?.image_url ? (
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={article.image_url} 
                      alt={article?.title || 'Article'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg";
                      }}
                    />
                  </div>
                ) : (
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <span className="text-slate-700 dark:text-slate-600 font-bold text-2xl opacity-30 group-hover:scale-110 transition-transform duration-700">
                      SmartLoans
                    </span>
                  </div>
                )}

                {/* Content */}
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3"/> {formattedDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3"/> {article?.views || 0} views
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {article?.title || 'Untitled Article'}
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