import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

// إيقاف الكاش تماماً لضمان تحديث صفحة الهبوط فوراً عند حذف أو إضافة أي مقال
export const revalidate = 0;

export default async function Home() {
  let latestArticles = [];
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/articles?select=slug,title,created_at,views,image_url&order=created_at.desc&limit=3`, {
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 0 }
    });
    
    if (res.ok) {
      latestArticles = await res.json();
    }
  } catch (err) {
    console.error('Failed to fetch latest articles');
  }

  return (
    // باقي كود صفحة الهبوط الخاص بك يبدأ هنا...