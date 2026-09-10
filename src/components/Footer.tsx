import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#0B0C15] border-t border-slate-200 dark:border-slate-800 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
              SmartLoans
            </span>
          </Link>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            Privacy-first financial tools powered by AI.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-4">Platform</h4>
          <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <li><Link href="/tools">Calculators</Link></li>
            <li><Link href="/articles">Articles</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-4">Connect</h4>
          <div className="flex gap-4">
            <Twitter className="w-5 h-5 text-slate-500" />
            <Github className="w-5 h-5 text-slate-500" />
            <Linkedin className="w-5 h-5 text-slate-500" />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} SmartLoans Analysis.
      </div>
    </footer>
  );
}