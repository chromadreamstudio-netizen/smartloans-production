'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Shield, Zap, Lock, BarChart3, Calculator, TrendingUp, Star } from 'lucide-react';
import { getSortedArticles } from '@/data/articles';

// بيانات آراء العملاء
const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    role: "Real Estate Investor",
    text: "Finally, a mortgage calculator that doesn't spam me with calls. The 'Par Rate' analysis saved me over $12,000 in closing costs.",
    stars: 5,
  },
  {
    name: "David Chen",
    role: "Software Engineer",
    text: "I checked the math against my bank's official disclosure. This platform was accurate to the penny. The privacy focus is a game changer.",
    stars: 5,
  },
  {
    name: "Marcus T.",
    role: "Financial Planner",
    text: "I send my clients here because I know their data isn't being sold. The 'Coast FIRE' tool is the best visualization I've seen.",
    stars: 5,
  },
];

// بيانات المميزات
const FEATURES = [
  {
    title: "Mortgage Precision",
    desc: "Calculate payments with banking-grade accuracy (IEEE 754).",
    icon: <Calculator className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    href: "/tools/mortgage",
    color: "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20 hover:border-blue-500",
  },
  {
    title: "Investment Growth",
    desc: "Visualize compound interest and inflation adjustments.",
    icon: <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
    href: "/tools/investment",
    color: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 hover:border-emerald-500",
  },
  {
    title: "Debt Snowball",
    desc: "Psychologically optimized payoff plans to crush debt.",
    icon: <BarChart3 className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
    href: "/tools/debt-payoff",
    color: "bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20 hover:border-rose-500",
  },
];

export default function Home() {
  const latestArticles = getSortedArticles().slice(0, 3);

  return (
    // 👇 التغيير الجوهري: استخدام transition-colors لجعل التبديل ناعماً ودعم كلا الوضعين
    <div className="min-h-screen bg-white dark:bg-[#0B0C15] text-slate-900 dark:text-white font-sans transition-colors duration-300">
      
      {/* --- HERO SECTION --- */}
      <div className="relative pt-32 pb-20 px-6 sm:px-12 lg:px-24 overflow-hidden">
        {/* Background Glows (تظهر فقط في الدارك مود لجماليتها) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10 opacity-0 dark:opacity-50 transition-opacity duration-500" />
        
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-8 backdrop-blur-sm animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Analysis Engine v2.0 Live</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight text-slate-900 dark:text-white">
            Financial Tools That <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-500">Don't Sell Your Data.</span>
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Bank-grade calculators running locally on your device. Zero tracking. Zero ads. Just pure mathematical truth for your money.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/tools" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 group">
              Start Calculating <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/articles" className="px-8 py-4 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-bold rounded-xl transition-all backdrop-blur-sm">
              Read Analysis
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/5 flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500 text-slate-600 dark:text-slate-400">
             <div className="flex items-center gap-2 font-semibold"><Shield className="w-5 h-5" /> 100% Client-Side</div>
             <div className="flex items-center gap-2 font-semibold"><Zap className="w-5 h-5" /> Instant Results</div>
             <div className="flex items-center gap-2 font-semibold"><Lock className="w-5 h-5" /> No Data Storage</div>
          </div>
        </div>
      </div>

      {/* --- TOOLS BENTO GRID --- */}
      <div className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Popular Engines</h2>
            <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 font-medium flex items-center gap-1">View All <ArrowRight className="w-4 h-4"/></Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((feature, idx) => (
            <Link key={idx} href={feature.href} className={`group p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1 ${feature.color} bg-white dark:bg-[#131620] border-slate-200 dark:border-white/5`}>
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* --- TESTIMONIALS SECTION --- */}
      <div className="py-24 bg-slate-50 dark:bg-[#0F1119] border-y border-slate-200 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Trusted by Smart Investors</h2>
            <p className="text-slate-600 dark:text-slate-400">Join thousands who stopped trading their data for basic math.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((review, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-white dark:bg-[#181B26] border border-slate-200 dark:border-white/5 relative shadow-sm">
                <div className="flex gap-1 mb-6">
                  {[...Array(review.stars)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center font-bold text-sm text-white">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{review.name}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">{review.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- LATEST INTELLIGENCE --- */}
      <div className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-900 dark:text-white">Latest Intelligence</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestArticles.map((article: any) => (
            <Link key={article.slug} href={`/articles/${article.slug}`} className="group block">
              <div className="rounded-2xl overflow-hidden mb-6 relative h-64 border border-slate-200 dark:border-white/10">
                {article.image ? (
                   <Image 
                     src={article.image} 
                     alt={article.title} 
                     fill 
                     className="object-cover transition-transform duration-500 group-hover:scale-105"
                   />
                ) : (
                  <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                    <BarChart3 className="w-12 h-12 text-slate-400 dark:text-slate-600" />
                  </div>
                )}
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-black/60 backdrop-blur text-xs font-bold uppercase tracking-wider rounded-md text-slate-900 dark:text-white border border-slate-200 dark:border-white/10">
                  {article.category}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 text-slate-900 dark:text-white">
                {article.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 leading-relaxed">
                {article.subtitle || article.metaDescription}
              </p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
            <Link href="/articles" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white font-bold border-b border-transparent hover:border-blue-500 transition-all pb-1">
                Read All Analysis <ArrowRight className="w-4 h-4"/>
            </Link>
        </div>
      </div>

      {/* --- CTA SECTION --- */}
      <div className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-900 to-indigo-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
          
          <h2 className="text-4xl md:text-5xl font-black mb-6 relative z-10 text-white">Stop Guessing. Start Engineering.</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto relative z-10">
            Your wealth is too important for "rule of thumb" advice. Use the same mathematical models as the institutions.
          </p>
          <div className="relative z-10">
            <Link href="/tools" className="px-10 py-5 bg-white text-blue-900 font-black text-lg rounded-2xl hover:bg-blue-50 transition-all shadow-xl inline-flex items-center gap-2 transform hover:-translate-y-1">
              Access The Toolkit <ArrowRight className="w-6 h-6"/>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}