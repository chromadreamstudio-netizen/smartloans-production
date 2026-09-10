import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const experts = [
  {
    name: "Walid Taha",
    role: "Founder & Editor-in-Chief",
    bio: "Walid Taha is the founder of SmartLoansAnalysis.com, specializing in loan tools, financial calculators, credit analysis, and U.S. personal finance education.",
    image: "https://image2url.com/r2/default/images/1768731731915-a8da5100-43ee-4e13-ab0c-0e3001c80de9.png"
  },
  {
    name: "Emma Collins",
    role: "Senior Finance Writer",
    bio: "Emma brings a wealth of knowledge to SmartLoansAnalysis.com, translating complex market trends into actionable advice for everyday readers. She focuses on decoding economic data to help individuals build long-term wealth.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80"
  },
  {
    name: "Michael Reed",
    role: "Loan & Mortgage Analyst",
    bio: "As our lead Loan & Mortgage Analyst, Michael specializes in dissecting lending products to help borrowers understand interest rates and terms. He leverages years of analytical experience to ensure our calculators reflect real-world banking standards.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=400&q=80"
  },
  {
    name: "Sarah Mitchell",
    role: "Compliance & Data Accuracy Lead",
    bio: "Sarah serves as the Compliance & Data Accuracy Lead, overseeing the rigorous testing and validation of every financial tool on our platform. She ensures that all algorithms align with federal lending guidelines.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&h=400&q=80"
  },
  {
    name: "Jason Miller",
    role: "Credit & Consumer Insights Researcher",
    bio: "Jason dives deep into the nuances of consumer credit to uncover the strategies that effectively boost FICO scores. His research analyzes scoring models and bureau data to help users navigate the world of debt management.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400&q=80"
  },
  {
    name: "Emily Carter",
    role: "Personal Finance Educator",
    bio: "Emily is a passionate Personal Finance Educator who focuses on bridging the gap between basic savings concepts and advanced investment strategies. She creates educational content designed to improve financial literacy.",
    image: "https://images.unsplash.com/photo-1598550874175-4d7112ee7f38?auto=format&fit=crop&w=400&h=400&q=80"
  }
];

export default function AboutPage() {
  return (
    <div className="bg-[#0B0C15] text-slate-200 min-h-screen">
      {/* Hero Mission Section */}
      <div className="bg-slate-900/50 border-b border-white/5 py-20 lg:py-24 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
               <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 tracking-tight text-white">Our Mission: Financial Truth</h1>
               <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                  To empower individuals with the mathematical truth behind their money, providing professional-grade financial tools and unbiased analysis that cuts through the noise of traditional financial advice.
               </p>
          </div>
      </div>

      {/* Why We Started & Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                  <h2 className="text-3xl font-bold text-white mb-6 font-serif">Why We Started</h2>
                  <div className="prose prose-lg text-slate-400 leading-relaxed">
                      <p className="mb-6">
                          SmartLoans Analysis was born from a simple observation: most people make six-figure financial decisions based on &quot;rules of thumb&quot; rather than hard data. We set out to build a platform where calculators aren&apos;t just widgets, but decision engines.
                      </p>
                      <p>
                          At SmartLoans Analysis, accuracy is our currency. Every article and calculator is rigorously researched, fact-checked against government databases (FRED, BLS), and reviewed by our financial review board. We maintain a strict firewall between our editorial content and our business partnerships to ensure our advice remains unbiased.
                      </p>
                  </div>
              </div>
              <div className="space-y-6">
                  {[
                      { title: "Accuracy First", text: "Our calculators are rigorously tested against banking industry standards to ensure precision to the penny. We validate our algorithms against official amortization formulas." },
                      { title: "Unbiased Analysis", text: "We do not sell financial products. Our advice is driven by math, not commissions. We present the numbers objectively so you can decide." },
                      { title: "Transparent Data", text: "We cite official sources like the Federal Reserve, IRS, and Bureau of Labor Statistics for all economic data and policy updates." }
                  ].map((item, i) => (
                      <div key={i} className="flex gap-5 p-6 bg-slate-900 rounded-xl border border-slate-800 shadow-sm hover:border-blue-600/50 transition-colors">
                          <div className="mt-1">
                              <CheckCircle2 className="w-6 h-6 text-blue-500" />
                          </div>
                          <div>
                              <h3 className="font-bold text-white mb-2 text-lg">{item.title}</h3>
                              <p className="text-slate-400 text-sm leading-relaxed">{item.text}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* Meet Our Experts */}
      <div className="bg-slate-900/30 py-24 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-white font-serif mb-4">Meet Our Experts</h2>
                  <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {experts.map((expert, i) => (
                     <div key={i} className="bg-[#131620] p-8 rounded-xl shadow-lg border border-slate-800 text-center hover:border-blue-600/40 transition-all duration-300 transform hover:-translate-y-1">
                          <div className="w-24 h-24 mx-auto bg-slate-800 rounded-full mb-6 overflow-hidden border-4 border-slate-700 shadow-inner">
                               <img 
                                  src={expert.image} 
                                  alt={expert.name} 
                                  className="w-full h-full object-cover" 
                                  loading="lazy"
                               />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-1">{expert.name}</h3>
                          <p className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">{expert.role}</p>
                          <p className="text-slate-400 text-sm leading-relaxed opacity-90">{expert.bio}</p>
                     </div> 
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
}