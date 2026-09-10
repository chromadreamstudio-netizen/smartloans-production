import React from 'react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-4xl font-black mb-8 text-slate-900">Terms of Service</h1>
        <div className="prose prose-slate max-w-none space-y-6">
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Terms</h2>
          <p>By accessing this Website, accessible from Smart Loans Analysis, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Use License</h2>
          <p>Permission is granted to temporarily download one copy of the materials on Smart Loans Analysis's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Disclaimer</h2>
          <p>All the materials on Smart Loans Analysis's Website are provided "as is". Smart Loans Analysis makes no warranties, may it be expressed or implied, therefore negates all other warranties.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Limitations</h2>
          <p>Smart Loans Analysis or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on Smart Loans Analysis's Website.</p>
        </div>
      </div>
    </div>
  );
}