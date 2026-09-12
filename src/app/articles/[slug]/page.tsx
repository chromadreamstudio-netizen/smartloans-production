import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Eye } from 'lucide-react';

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  let article = null;

  // جلب المقال المحدد من Supabase بناءً على الـ slug
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/articles?slug=eq.${slug}&select=*`, {
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
      next: { revalidate: 86400, tags: ['articles'] }
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) {
        article = data[0];
      }
    }
  } catch (err) {
    console.error('Error fetching article:', err);
  }

  // إذا لم يتم العثور على المقال في قاعدة البيانات، أظهر صفحة 404
  if (!article) {
    notFound();
  }

  const formattedDate = new Date(article.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0C15] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* زر العودة */}
        <Link href="/articles" className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 mb-8 font-semibold transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Articles
        </Link>
        
        {/* عنوان المقال */}
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
          {article.title}
        </h1>
        
        {/* بيانات النشر */}
        <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400 mb-12 pb-8 border-b border-slate-200 dark:border-slate-800">
          <span className="flex items-center gap-2"><Calendar className="w-4 h-4"/> {formattedDate}</span>
          <span className="flex items-center gap-2"><Eye className="w-4 h-4"/> {article.views || 0} Views</span>
        </div>

        {/* محتوى المقال (HTML المولد من الذكاء الاصطناعي) */}
        <article 
          className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300"
          dangerouslySetInnerHTML={{ __html: article.text }}
        />
        
      </div>
    </div>
  );
}