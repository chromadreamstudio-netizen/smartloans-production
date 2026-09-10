import { supabase } from './supabase';

// دالة لجلب جميع المقالات (لعرضها في الصفحة الرئيسية أو صفحة المدونة)
export async function getAllArticles() {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false }); // ترتيب من الأحدث للأقدم

  if (error) {
    console.error("❌ Error fetching articles:", error.message);
    return [];
  }
  return data;
}

// دالة لجلب مقالة واحدة بالتحديد (عن طريق الـ Slug لصفحة قراءة المقال)
export async function getArticleBySlug(slug: string) {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`❌ Error fetching article (${slug}):`, error.message);
    return null;
  }
  return data;
}