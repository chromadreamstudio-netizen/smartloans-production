'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // 👈 تأكد أن هذا السطر موجود
import { usePathname } from 'next/navigation';
import { Menu, X, TrendingUp, Calculator, BookOpen, MessageSquareHeart, HelpCircle, Sparkles, Sun, Moon, ArrowRight } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) return storedTheme;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/tools' },
    { name: 'Articles', path: '/articles' }, // ✅ الرابط الصحيح (بدون #)
    { name: 'AI Studio', path: '/ai-studio', highlight: true }, 
  ];

  const isActive = (path: string, highlight?: boolean) => {
      const base = "px-4 py-2 rounded-full transition-all text-sm font-medium duration-300 inline-flex items-center ";
      if (pathname === path) {
          return base + (highlight ? "bg-blue-50 text-blue-600 font-bold shadow-sm ring-1 ring-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:ring-blue-700/50" : "bg-slate-100 text-slate-900 shadow-sm dark:bg-white/5 dark:text-slate-200");
      }
      return base + (highlight ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-bold hover:opacity-80" : "text-slate-500 hover:text-blue-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800/50");
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 dark:bg-[#0B0C15] text-slate-900 dark:text-slate-200 transition-colors duration-300 selection:bg-indigo-100 dark:selection:bg-indigo-900">
      
      {/* الخلفية الحيوية */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-[120px] opacity-70 mix-blend-multiply dark:mix-blend-screen"></div>
          <div className="absolute top-[30%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-[120px] opacity-70 mix-blend-multiply dark:mix-blend-screen"></div>
          <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-[120px] opacity-60 mix-blend-multiply dark:mix-blend-screen"></div>
      </div>

      {/* Header */}
      <header className="sticky top-4 z-50 px-4 mb-4">
        <div className="max-w-7xl mx-auto backdrop-blur-xl bg-white/70 dark:bg-[#131620]/70 border border-slate-200/50 dark:border-white/10 ring-1 ring-slate-900/5 dark:ring-white/5 shadow-lg shadow-blue-900/5 dark:shadow-black/20 rounded-2xl transition-all duration-300">
          <div className="flex justify-between items-center h-16 px-4 sm:px-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 p-2 rounded-xl shadow-lg shadow-blue-500/30 group-hover:rotate-12 transition-transform duration-300">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
                Smart<span className="text-blue-600">Loans</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-1 items-center">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.path} className={isActive(link.path, link.highlight)}>
                  {link.highlight && <Sparkles className="w-3 h-3 inline mr-1.5 text-amber-400" />}
                  {link.name}
                </Link>
              ))}
              <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-3"></div>
              
              <button 
                onClick={toggleTheme} 
                className="p-2 rounded-full text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-400 dark:hover:text-blue-300 dark:hover:bg-slate-800 transition-colors mr-2"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-400" />}
              </button>

              <Link href="/tools" className="relative group px-6 py-2.5 rounded-full overflow-hidden shadow-lg shadow-blue-500/20">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 group-hover:scale-110"></div>
                <span className="relative text-white text-sm font-bold flex items-center gap-2">
                    Launch App <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                </span>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
               <button onClick={toggleTheme} className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors">
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-500 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 mx-auto max-w-7xl bg-white/95 dark:bg-[#131620]/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden animate-fade-in z-50 relative">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.path} 
                  className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${link.highlight ? 'text-blue-600 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/30' : 'text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-950 text-slate-400 relative overflow-hidden mt-12 border-t border-slate-900">
          <div className="max-w-7xl mx-auto px-6 py-12 text-center">
              <p>&copy; {new Date().getFullYear()} SmartLoans Analysis. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
};

export default Layout;