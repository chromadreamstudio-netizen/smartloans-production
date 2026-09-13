import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export const revalidate = 0;

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0C15] pt-32 pb-20 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" /> 100% Mathematical Precision
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            Financial Tools That Don't Sell Your Data.
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
            No sponsored posts. No affiliate bias. Just mathematical analysis and interactive calculators of the financial products shaping your life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/articles" 
              className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
            >
              Read Latest Intelligence <ArrowRight className="w-5 h-5"/>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 rounded-3xl bg-white dark:bg-[#131620] border border-slate-200 dark:border-white/5 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
              <Zap className="w-6 h-6"/>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Instant Results</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Calculations run locally in your browser with zero latency and absolute speed.</p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-[#131620] border border-slate-200 dark:border-white/5 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
              <ShieldCheck className="w-6 h-6"/>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">No Data Storage</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Your financial inputs remain private on your device. We never store or track your data.</p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-[#131620] border border-slate-200 dark:border-white/5 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6">
              <Sparkles className="w-6 h-6"/>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Unbiased Insights</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Pure mathematical breakdowns designed to protect your wealth from hidden fees.</p>
          </div>
        </div>

      </div>
    </div>
  );
}