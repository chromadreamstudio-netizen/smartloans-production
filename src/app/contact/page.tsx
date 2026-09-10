'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Phone, CheckCircle, ChevronDown } from 'lucide-react';
import AdUnit from '@/components/AdUnit';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // هنا يمكن إضافة كود إرسال الإيميل لاحقاً
  };

  return (
    <div className="bg-[#0B0C15] min-h-screen py-12 transition-colors duration-300 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-8 justify-center items-start">
            
            {/* العمود الجانبي للإعلانات (يظهر في الشاشات الكبيرة) */}
            <div className="hidden lg:block w-72 flex-shrink-0">
                <div className="sticky top-24">
                     <AdUnit className="min-h-[600px] w-full" />
                </div>
            </div>

            {/* بطاقة النموذج الرئيسية */}
            <div className="flex-grow max-w-2xl w-full mx-auto">
                <div className="bg-[#131620] rounded-[2rem] shadow-xl overflow-hidden border border-slate-800">
                    {/* رأس البطاقة */}
                    <div className="bg-slate-900 py-12 px-8 text-center relative overflow-hidden">
                        {/* خلفيات جمالية */}
                        <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-[-50%] left-[-10%] w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                        
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-white relative z-10 mb-3">Get in Touch</h1>
                        <p className="text-slate-400 relative z-10 text-sm md:text-base">Have a question about a calculator? Found a bug? Let us know.</p>
                    </div>

                    <div className="p-8 md:p-10">
                        {submitted ? (
                            <div className="text-center py-20 animate-fade-in">
                                <div className="w-20 h-20 bg-emerald-900/30 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
                                    <CheckCircle className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                                <p className="text-slate-400">We'll get back to you as soon as possible.</p>
                                <button onClick={() => setSubmitted(false)} className="mt-8 text-indigo-400 font-semibold hover:underline">Send another message</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-300">Name</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-slate-900 text-white placeholder-slate-600" placeholder="John Doe" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-300">Email</label>
                                        <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-slate-900 text-white placeholder-slate-600" placeholder="john@example.com" required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-300">Subject</label>
                                    <div className="relative">
                                        <select className="w-full px-4 py-3 rounded-xl border border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-slate-900 text-white appearance-none">
                                            <option>General Inquiry</option>
                                            <option>Report a Bug</option>
                                            <option>Advertising</option>
                                            <option>Partnership</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                                            <ChevronDown className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-300">Message</label>
                                    <textarea rows={5} className="w-full px-4 py-3 rounded-xl border border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-slate-900 text-white resize-none placeholder-slate-600" placeholder="How can we help you?" required></textarea>
                                </div>

                                <button type="submit" className="w-full py-4 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold rounded-xl shadow-lg shadow-sky-500/20 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2">
                                     Send Message
                                </button>
                            </form>
                        )}

                        {/* معلومات الاتصال في الأسفل */}
                        <div className="mt-12 pt-10 border-t border-slate-800 flex flex-col items-center gap-4 text-sm text-slate-400">
                             <div className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
                                <Mail className="w-4 h-4 text-indigo-500" />
                                <a href="mailto:support@smartloansanalysis.com">support@smartloansanalysis.com</a>
                             </div>
                             <div className="flex items-center gap-2 text-center">
                                <MapPin className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                                <span>Bursa, Marmara Region, Turkey</span>
                             </div>
                             <div className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
                                <Phone className="w-4 h-4 text-indigo-500" />
                                <a href="tel:+905363191820">+90 536 319 18 20</a>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
             {/* إعلان للموبايل */}
             <div className="block lg:hidden w-full mt-8">
                <AdUnit />
             </div>
        </div>
      </div>
    </div>
  );
}