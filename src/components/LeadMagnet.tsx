'use client';
import { useState } from 'react';

export default function LeadMagnet() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('success');
    console.log("Captured Email:", email); 
  };

  return (
    <div className="my-12 p-8 bg-gradient-to-r from-emerald-900 to-slate-900 rounded-3xl text-white shadow-2xl border border-emerald-500/30 overflow-hidden relative">
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-emerald-500 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <div className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold mb-4 border border-emerald-500/50">
            FREE RESOURCE
          </div>
          <h3 className="text-2xl font-bold mb-2">The "Hidden Fees" Checklist 📄</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Banks hide fees in the fine print. Download our PDF guide to save average of <strong>$3,200</strong> on your next loan closing costs.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full md:w-auto min-w-[300px] flex flex-col gap-3">
          {status === 'success' ? (
            <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-200 p-4 rounded-xl text-center">
              🎉 Sent! Check your inbox.
            </div>
          ) : (
            <>
              <input 
                type="email" 
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button 
                type="submit" 
                className="w-full px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-900/50"
              >
                Get the Free PDF →
              </button>
              <p className="text-xs text-slate-500 text-center">No spam. Unsubscribe anytime.</p>
            </>
          )}
        </form>
      </div>
    </div>
  );
}