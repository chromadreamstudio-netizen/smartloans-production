import Link from 'next/link';
import { ExternalLink, CheckCircle, ShieldCheck } from 'lucide-react';

interface AffiliateBoxProps {
  title: string;
  description: string;
  buttonText: string;
  link: string; // رابط الأفلييت الخاص بك
  badge?: string;
}

export default function AffiliateBox({ title, description, buttonText, link, badge = "Recommended" }: AffiliateBoxProps) {
  return (
    <div className="my-10 p-6 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl shadow-sm relative overflow-hidden group">
      
      {/* Badge */}
      <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-blue-600/20">
        <ShieldCheck size={12} /> {badge}
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Icon/Image Placeholder */}
        <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-slate-100 dark:border-slate-700">
          🏦
        </div>

        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><CheckCircle size={12} className="text-emerald-500" /> Low Rates</span>
            <span className="flex items-center gap-1"><CheckCircle size={12} className="text-emerald-500" /> Fast Approval</span>
            <span className="flex items-center gap-1"><CheckCircle size={12} className="text-emerald-500" /> No Hidden Fees</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="w-full md:w-auto">
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer sponsored" // مهم جداً للسيو
            className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-1"
          >
            {buttonText} <ExternalLink size={16} />
          </a>
          <p className="text-[10px] text-center mt-2 text-slate-400">
            We may earn a commission.
          </p>
        </div>
      </div>
    </div>
  );
}