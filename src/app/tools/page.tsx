'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Calculator, TrendingUp, CreditCard, Home, Key, RefreshCw, Building,
  PieChart, Target, Shield, Activity, Sunset, HeartPulse, List, Scale, 
  Wallet, GraduationCap, Briefcase, Car, ArrowRight, Flame, Zap, 
  Banknote, ArrowUpRight, CalendarClock, Percent, Snowflake
} from 'lucide-react';
import { TOOLS_DATA } from '@/data/tools';

// خريطة لربط أسماء الأيقونات (النصوص) بالمكونات الفعلية
const ICON_MAP: Record<string, any> = {
  'Home': Home,
  'Key': Key,
  'RefreshCw': RefreshCw,
  'Building': Building,
  'TrendingUp': TrendingUp,
  'PieChart': PieChart,
  'Target': Target,
  'Shield': Shield,
  'Activity': Activity,
  'Sunset': Sunset,
  'HeartPulse': HeartPulse,
  'List': List,
  'CreditCard': CreditCard,
  'Scale': Scale,
  'Car': Car,
  'Wallet': Wallet,
  'GraduationCap': GraduationCap,
  'Briefcase': Briefcase,
  'Flame': Flame,
  'Zap': Zap,
  'Banknote': Banknote,
  'ArrowUpRight': ArrowUpRight,
  'CalendarClock': CalendarClock,
  'Percent': Percent,
  'Snowflake': Snowflake
};

export default function ToolsPage() {
  // 1. ترتيب الفئات كما نريدها أن تظهر
  const categoryOrder = [
    'Real Estate', 
    'Financial Planning', 
    'Loans & Debt', 
    'Education & Business'
  ];

  // 2. تجميع الأدوات حسب الفئة تلقائياً
  const categories: Record<string, any[]> = {};
  
  Object.values(TOOLS_DATA).forEach((tool: any) => {
    // التأكد من وجود الفئة قبل الإضافة
    const cat = tool.category || 'Other';
    if (!categories[cat]) {
      categories[cat] = [];
    }
    categories[cat].push(tool);
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0C15] py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
            Financial <span className="text-blue-600 dark:text-blue-500">Calculator Suite</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Access our complete library of {Object.keys(TOOLS_DATA).length}+ precision tools. From Coast FIRE to Debt Snowball, do the math first.
          </p>
        </div>

        {/* عرض الفئات والأدوات */}
        <div className="space-y-24">
          {categoryOrder.map((catName) => {
            const tools = categories[catName];
            // إذا لم تكن هناك أدوات في هذه الفئة، لا تعرضها
            if (!tools || tools.length === 0) return null;

            return (
              <div key={catName} className="animate-fade-in-up">
                {/* عنوان الفئة */}
                <div className="flex items-center gap-3 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <span className="w-1.5 h-8 bg-blue-600 rounded-full shadow-lg shadow-blue-500/50"></span>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{catName}</h2>
                </div>

                {/* شبكة الأدوات */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tools.map((tool) => {
                    // اختيار الأيقونة المناسبة أو استخدام الحاسبة كافتراضي
                    const IconComponent = ICON_MAP[tool.icon] || Calculator;
                    
                    return (
                      <Link key={tool.id} href={`/tools/${tool.id}`} className="group block h-full">
                        <div className="h-full p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-[#131620] border-slate-200 dark:border-white/5 hover:border-blue-500/30 hover:shadow-2xl dark:hover:shadow-blue-900/10 flex flex-col relative overflow-hidden">
                          
                          {/* تأثير الخلفية عند التحويم */}
                          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-blue-500/10"></div>

                          {/* الأيقونة */}
                          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 bg-slate-50 dark:bg-white/5 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white shadow-sm">
                            <IconComponent className="w-7 h-7" />
                          </div>
                          
                          {/* النصوص */}
                          <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {tool.title}
                          </h3>
                          
                          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-sm flex-grow">
                            {tool.desc}
                          </p>
                          
                          {/* الزر السفلي */}
                          <div className="flex items-center text-sm font-bold text-slate-900 dark:text-white mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/50 group-hover:border-blue-500/20">
                            Launch Tool <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform text-blue-500" />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}