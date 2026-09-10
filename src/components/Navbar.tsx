'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TrendingUp, Sparkles, Sun, Moon, ArrowRight, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(storedTheme);
    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    } else {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    }
  };

  if (!mounted) return <div className="h-20 bg-[#0B0C15]/80 backdrop-blur-md border-b border-white/10"></div>;

  // ✅ قائمة الروابط الصحيحة
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/tools' },
    { name: 'Articles', path: '/articles' }, // 👈 تأكدنا أن هذا الرابط سليم
  ];

  return (
    <nav className="bg-white/80 dark:bg-[#0B0C15]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* الشعار */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-tr from-blue-600 to-purple-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-900/20 group-hover:shadow-blue-600/40 transition duration-300">
                <TrendingUp size={22} />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Smart<span className="text-blue-600 dark:text-blue-400">Loans</span>
              </span>
            </Link>
          </div>

          {/* الروابط (للكمبيوتر) */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-white/5 px-2 py-1.5 rounded-full border border-slate-200 dark:border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                  pathname === link.path
                    ? 'bg-white dark:bg-white/10 text-blue-600 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* زر AI Studio منفصل ومميز */}
            <Link href="/ai-studio" className="px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-500/10 rounded-full transition flex items-center gap-2">
              <Sparkles size={14} /> AI Studio
            </Link>
          </div>

          {/* الأزرار الجانبية */}
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 transition"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-700" />}
            </button>

            <Link href="/tools" className="hidden sm:flex px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full transition text-sm font-bold shadow-lg shadow-blue-900/40 hover:shadow-blue-600/40 items-center gap-2">
              Launch App <ArrowRight size={16} />
            </Link>

            {/* زر القائمة للموبايل */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-slate-600 dark:text-slate-300">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* قائمة الموبايل */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-[#0B0C15] border-b border-slate-200 dark:border-white/10 animate-fade-in">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
              >
                {link.name}
              </Link>
            ))}
             <Link href="/ai-studio" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-lg text-base font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/10">
               AI Studio
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}