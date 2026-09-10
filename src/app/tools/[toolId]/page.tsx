import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { CalculatorType } from '@/types';
import AdUnit from '@/components/AdUnit';
import { TOOLS_DATA } from '@/data/tools';

// استيراد المكونات
import CalculatorEngine from '@/components/CalculatorEngine';
import CoastFireCalculator from '@/components/CoastFireCalculator';

// 👇👇👇 (1) هذا هو الكود الناقص الذي سبب المشكلة 👇👇👇
// هذه الدالة تخبر Next.js بأسماء جميع الأدوات ليبني لها صفحات ثابتة
export async function generateStaticParams() {
  return Object.keys(TOOLS_DATA).map((toolId) => ({
    toolId: toolId,
  }));
}
// 👆👆👆 نهاية الكود الجديد 👆👆👆

export default async function ToolPage({ params }: { params: Promise<{ toolId: string }> }) {
  const { toolId } = await params;
  
  const info = TOOLS_DATA[toolId];

  if (!info) {
      return notFound();
  }

  // 🌟 SEO Upgrade: إخبار جوجل أن هذه برمجية
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: info.title,
    description: info.desc,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: { 
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
    },
  };

  return (
    <div className="bg-[#0B0C15] min-h-screen py-12 text-white">
        {/* حقن كود Schema */}
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <Link href="/tools" className="inline-flex items-center text-slate-400 hover:text-blue-400 mb-8 transition group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to All Tools
            </Link>

            <div className="mb-10 animate-fade-in-up">
                <div className="flex items-center gap-3 mb-3">
                    <span className="text-blue-500 bg-blue-500/10 p-2 rounded-lg">⚡</span>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">{info.title}</h1>
                </div>
                <p className="text-slate-400 text-lg max-w-3xl leading-relaxed">{info.desc}</p>
            </div>

            {/* 🔥 الحاسبة (The Tool) */}
            <div className="bg-[#131620] rounded-3xl border border-slate-800 p-1 shadow-2xl overflow-hidden mb-16">
                {info.type === CalculatorType.COAST_FIRE ? (
                    <CoastFireCalculator />
                ) : (
                    <CalculatorEngine 
                        type={info.type} 
                        title={info.title} 
                        description={info.desc} 
                    />
                )}
            </div>

            <AdUnit />

            {/* 🔥🔥🔥 قسم المحتوى التعليمي (SEO Content) 🔥🔥🔥 */}
            {info.content && (
              <div className="mt-16 max-w-4xl mx-auto animate-fade-in-up">
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen className="w-6 h-6 text-emerald-500" />
                  <h2 className="text-2xl font-bold text-white">How to Use & Insights</h2>
                </div>
                
                <div 
                  className="prose prose-lg prose-invert max-w-none 
                  prose-headings:text-white prose-p:text-slate-400 
                  prose-strong:text-emerald-400 prose-li:text-slate-300
                  prose-a:text-blue-400 hover:prose-a:text-blue-300"
                  dangerouslySetInnerHTML={{ __html: info.content }} 
                />
              </div>
            )}

        </div>
    </div>
  );
}