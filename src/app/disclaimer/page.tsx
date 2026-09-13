import React from 'react';
import Link from 'next/link';
import { AlertTriangle, ShieldCheck, Scale } from 'lucide-react';

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0C15] pt-32 pb-20 px-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#131620] p-8 md:p-16 rounded-3xl shadow-xl border border-slate-200 dark:border-white/5">
        
        <div className="flex items-center gap-4 mb-10 pb-10 border-b border-slate-200 dark:border-white/10">
          <div className="p-4 bg-amber-500/10 rounded-2xl">
            <AlertTriangle className="w-10 h-10 text-amber-500" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2">Financial Disclaimer</h1>
            <p className="text-slate-500 dark:text-slate-400">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
          </div>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-8">
          
          <section className="flex gap-4">
            <ShieldCheck className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. No Professional Financial Advice</h2>
              <p>
                The information, calculators, and tools provided on SmartLoansAnalysis.com are for educational and informational purposes only. They do not constitute financial, investment, tax, or legal advice. You should not rely on the information on this website as a substitute for professional advice from a qualified and certified financial advisor.
              </p>
            </div>
          </section>

          <section className="flex gap-4">
            <Scale className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. Accuracy of Calculators and Tools</h2>
              <p>
                While we strive to ensure our algorithmic models and calculators are accurate and based on current market formulas, the results generated are estimates. Real-world financial products involve variables, fees, and market fluctuations not accounted for in these theoretical calculations. SmartLoansAnalysis makes no warranties regarding the exact precision of these outputs.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. Risk Acknowledgement</h2>
            <p>
              Any action you take upon the information on this website is strictly at your own risk. We are not liable for any losses or damages in connection with the use of our website or tools. Always conduct your own due diligence before signing any loan agreement, mortgage, or financial contract.
            </p>
          </section>

          <div className="mt-12 p-6 bg-slate-100 dark:bg-[#0B0C15] rounded-2xl border border-slate-200 dark:border-white/5 text-sm text-center">
            By using our platform, you acknowledge that you have read and understood this disclaimer. For more information on how we handle your data, please visit our <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</Link> and <Link href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">Terms of Service</Link>.
          </div>

        </div>
      </div>
    </div>
  );
}