'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, AlertTriangle, Loader2 } from 'lucide-react';

export default function AIStudio() {
  // رسالة ترحيب جديدة تؤكد أننا متصلون
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
    { role: 'assistant', content: "Hello! I am connected to the Gemini AI Engine. Ask me anything about your finances." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // 👇 هذا هو كود الاتصال الحقيقي
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          context: "Financial Analysis Chat",
          numbers: "General Context", 
          userGoal: userMessage
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ نجاح: عرض رد الذكاء الاصطناعي
        setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: data.result 
        }]);
      } else {
        // ❌ فشل من السيرفر
        setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: "⚠️ Server Error: " + (data.error || "Check API Key")
        }]);
      }
    } catch (error) {
      // ❌ فشل في الشبكة
      setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "❌ Network Error: Could not reach /api/analyze endpoint." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0C15] pt-24 pb-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300 flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-grow flex flex-col h-[85vh]">
        
        {/* Header */}
        <div className="mb-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-200 dark:border-indigo-500/20 shadow-sm animate-fade-in-up">
                <Sparkles className="w-3 h-3" /> Powered by Gemini AI
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2">AI Wealth Architect</h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
                Your personal CFO. Ask about debts, investment strategies, or mortgage scenarios.
            </p>
        </div>

        {/* Chat Interface */}
        <div className="flex-grow bg-white dark:bg-[#131620] rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden transition-colors duration-300 relative">
            
            {/* Messages Area */}
            <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-fade-in`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
                            msg.role === 'assistant' 
                            ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white' 
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}>
                            {msg.role === 'assistant' ? <Bot className="w-6 h-6" /> : <User className="w-6 h-6" />}
                        </div>
                        
                        <div className={`p-5 rounded-2xl max-w-[85%] text-sm md:text-base leading-relaxed shadow-sm ${
                            msg.role === 'assistant'
                            ? 'bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-white/5 rounded-tl-none'
                            : 'bg-indigo-600 text-white rounded-tr-none'
                        }`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                
                {isLoading && (
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center flex-shrink-0">
                            <Bot className="w-6 h-6 animate-pulse" />
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 flex items-center gap-2">
                            <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />
                            <span className="text-sm text-slate-500">Thinking...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-slate-50 dark:bg-[#0f1119] border-t border-slate-200 dark:border-white/5">
                <div className="relative flex items-center">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ex: How to invest $1000?" 
                        className="w-full bg-white dark:bg-[#181b26] text-slate-900 dark:text-white rounded-xl py-4 pl-6 pr-14 outline-none focus:ring-2 focus:ring-indigo-500 border border-slate-200 dark:border-white/10 shadow-sm transition-colors duration-300 placeholder:text-slate-400"
                        disabled={isLoading}
                    />
                    <button 
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className={`absolute right-2 p-2 rounded-lg transition-all duration-300 ${
                            isLoading || !input.trim()
                            ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                        }`}
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}