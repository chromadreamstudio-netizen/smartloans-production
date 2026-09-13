import Link from 'next/link';
import { Calculator, LineChart, ShieldCheck, ArrowRight, BrainCircuit, Activity, ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#05050A] text-slate-200 selection:bg-blue-500/30 overflow-hidden">
      
      {/* 1. Hero Section with Glow Effects */}
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 px-6">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/20 blur-[120px] rounded-[100%] pointer-events-none"></div>
        <div className="absolute top-40 right-0 w-[500px] h-[400px] bg-emerald-500/10 blur-[100px] rounded-[100%] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-blue-400 mb-8 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            Algorithmic Financial Intelligence
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8 leading-[1.1]">
            Decode Your Debt. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Engineer Your Wealth.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Stop relying on generic advice. Use our enterprise-grade calculators and unbiased, math-driven analysis to make bulletproof financial decisions.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/tools" className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-slate-200 transition-all flex items-center justify-center group shadow-[0_0_30px_rgba(255,255,255,0.15)]">
              Launch Toolkit <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/articles" className="w-full sm:w-auto px-8 py-4 bg-transparent text-white font-bold rounded-full border border-white/20 hover:bg-white/5 transition-all flex items-center justify-center">
              Read Analysis
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Tools Bento Grid */}
      <section className="py-24 px-6 bg-[#0B0C15] relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Precision Instruments</h2>
            <p className="text-slate-400">Calculators engineered for absolute mathematical accuracy.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Mortgage Engine", desc: "Calculate amortization, early payoffs, and true interest costs over 30 years.", icon: Calculator, color: "text-blue-400", bg: "bg-blue-400/10" },
              { title: "Auto Loan Analyzer", desc: "Compare dealer financing vs. bank loans instantly to avoid hidden dealership markups.", icon: LineChart, color: "text-emerald-400", bg: "bg-emerald-400/10" },
              { title: "Debt Snowball", desc: "Strategize your debt payoff mathematically to minimize interest bleed.", icon: Activity, color: "text-purple-400", bg: "bg-purple-400/10" }
            ].map((tool, i) => (
              <Link key={i} href="/tools" className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 hover:-translate-y-2">
                <div className={`w-14 h-14 rounded-2xl ${tool.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <tool.icon className={`w-7 h-7 ${tool.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 flex items-center justify-between">
                  {tool.title} <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {tool.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The Authority / About Teaser */}
      <section className="py-24 px-6 relative overflow-hidden border-y border-white/5">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[300px] bg-blue-900/10 blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/30">
              <ShieldCheck className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Built by Experts.<br /> Driven by Data.
            </h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              We don't do sponsored opinions. Led by Walid Taha and a team of senior financial analysts and software architects, our algorithms are cross-referenced with federal lending guidelines to ensure you get the absolute truth about your money.
            </p>
            <Link href="/about" className="inline-flex items-center text-blue-400 font-bold hover:text-blue-300 transition-colors group">
              Meet the Editorial Team <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
             {/* Abstract UI representation */}
             <div className="space-y-4">
                <div className="h-32 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-white/5 p-6 flex flex-col justify-end">
                  <div className="h-2 w-1/2 bg-slate-700 rounded-full mb-3"></div>
                  <div className="h-2 w-3/4 bg-slate-700 rounded-full"></div>
                </div>
                <div className="h-48 bg-gradient-to-tr from-blue-900/40 to-slate-900 rounded-3xl border border-blue-500/20 p-6 flex items-start justify-between">
                  <BrainCircuit className="w-8 h-8 text-blue-400" />
                </div>
             </div>
             <div className="space-y-4 pt-8">
                <div className="h-48 bg-gradient-to-br from-emerald-900/20 to-slate-900 rounded-3xl border border-emerald-500/20 p-6 flex items-start justify-between">
                  <Activity className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="h-32 bg-slate-900 rounded-3xl border border-white/5 p-6 flex flex-col justify-end">
                  <div className="h-2 w-full bg-slate-700 rounded-full mb-3"></div>
                  <div className="h-2 w-2/3 bg-slate-700 rounded-full"></div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 4. Comprehensive Footer (Crucial for AdSense) */}
      <footer className="bg-[#05050A] pt-20 pb-10 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-black text-white mb-4 tracking-tight flex items-center gap-2">
              <LineChart className="w-6 h-6 text-blue-500" /> SmartLoans
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Financial intelligence and mathematical analysis for the modern consumer. Decode the system, one calculation at a time.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Platform</h4>
            <ul className="space-y-3">
              <li><Link href="/tools" className="text-slate-400 hover:text-white transition-colors text-sm">Financial Tools</Link></li>
              <li><Link href="/articles" className="text-slate-400 hover:text-white transition-colors text-sm">Market Analysis</Link></li>
              <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-white transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-slate-400 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-slate-400 hover:text-white transition-colors text-sm">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="text-slate-400 hover:text-white transition-colors text-sm">Financial Disclaimer</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">System Status</h4>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              All systems operational
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm text-center md:text-left">
            © {new Date().getFullYear()} SmartLoans Analysis. All rights reserved.
          </p>
          <p className="text-slate-700 text-xs">
            Designed for precision.
          </p>
        </div>
      </footer>

    </div>
  );
}