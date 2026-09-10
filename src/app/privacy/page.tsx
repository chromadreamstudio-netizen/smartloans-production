import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-4xl font-black mb-8 text-slate-900">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none space-y-6">
          <p>Last updated: January 2026</p>
          <p>At Smart Loans Analysis, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Smart Loans Analysis and how we use it.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Log Files</h2>
          <p>Smart Loans Analysis follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Google DoubleClick DART Cookie</h2>
          <p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Advertising Partners</h2>
          <p>Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Google AdSense</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Consent</h2>
          <p>By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.</p>
        </div>
      </div>
    </div>
  );
}