'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: "Are the calculators free to use?",
        answer: "Yes, 100%. All tools on SmartLoansAnalysis are completely free to use. We believe financial literacy should be accessible to everyone. We monetize via unobtrusive advertisements, ensuring you never hit a paywall."
    },
    {
        question: "How accurate are the results?",
        answer: "Our calculators use standard banking formulas (such as the amortization formula for loans). However, results are estimates. Actual loan terms depend on your specific lender, credit score, and location. Always consult with a financial advisor for binding advice."
    },
    {
        question: "Is my data safe?",
        answer: "Absolutely. We operate with a 'Privacy First' architecture. All calculations are performed either locally in your browser or via ephemeral stateless requests. We do not store your income, debt, or personal details on our servers."
    },
    {
        question: "How does the AI analysis work?",
        answer: "We utilize Google's advanced Gemini API. When you request an analysis, we send the numerical inputs (without personal identifiers) to the model, which compares them against financial best practices to generate actionable tips."
    },
    {
        question: "Can I use these tools for commercial purposes?",
        answer: "You are free to use them for your business calculations. However, you may not scrape, embed, or resell our calculators on your own platform without express written permission."
    },
    {
        question: "Why do my mortgage payments look different here than on Zillow?",
        answer: "Many simplified calculators only show Principal & Interest. Ours includes Property Tax and Homeowners Insurance estimates by default, giving you a much more realistic picture of your 'out-the-door' monthly cost."
    }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#0B0C15] min-h-screen py-16 text-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <div className="inline-block p-3 bg-blue-900/30 rounded-full mb-4 border border-blue-500/20">
                    <HelpCircle className="w-8 h-8 text-blue-500" />
                </div>
                <h1 className="text-4xl font-extrabold text-white mb-4">Frequently Asked Questions</h1>
                <p className="text-lg text-slate-400">
                    Common questions about our tools, privacy, and methodology.
                </p>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div 
                        key={index} 
                        className={`bg-[#131620] rounded-xl border transition-all duration-300 ${openIndex === index ? 'border-blue-500 shadow-md shadow-blue-900/20' : 'border-slate-800 shadow-sm hover:border-blue-500/50'}`}
                    >
                        <button 
                            onClick={() => toggle(index)}
                            className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                        >
                            <span className={`font-bold text-lg ${openIndex === index ? 'text-blue-400' : 'text-slate-200'}`}>
                                {faq.question}
                            </span>
                            {openIndex === index ? (
                                <ChevronUp className="w-5 h-5 text-blue-500" />
                            ) : (
                                <ChevronDown className="w-5 h-5 text-slate-500" />
                            )}
                        </button>
                        
                        <div 
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="p-6 pt-0 text-slate-400 leading-relaxed border-t border-slate-800/50">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 text-center bg-blue-600 rounded-2xl p-8 text-white shadow-lg shadow-blue-900/40">
                <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
                <p className="text-blue-100 mb-6">We're here to help you understand your financial picture.</p>
                <a href="mailto:support@smartloansanalysis.com" className="inline-block bg-white text-blue-600 font-bold px-6 py-3 rounded-lg hover:bg-blue-50 transition">
                    Contact Support
                </a>
            </div>
        </div>
    </div>
  );
}