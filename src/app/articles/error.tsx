'tsx'
'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0C15] pt-32 pb-20 px-6 flex items-center justify-center">
      <div className="max-w-md w-full bg-white dark:bg-[#131620] border border-slate-200 dark:border-white/5 rounded-3xl p-8 text-center shadow-2xl">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
          Something went wrong!
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm">
          We encountered an issue loading the articles. Please try again.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-bold hover:bg-slate-300 transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}