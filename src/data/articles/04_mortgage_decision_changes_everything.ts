import { ArticleData } from '../../types';
import { ArrowRight, FileText, CheckCircle, XCircle, AlertTriangle, MessageSquare } from 'lucide-react';

export const ARTICLE_04: Record<string, ArticleData> = {
  "mortgage-decision-changes-everything": {
    title: "The Mortgage Pricing Black Box: Cracking the Code of Par Rates, Points, and Lender Margins (The 2026 Protocol)",
    subtitle: "Banks purposefully confuse 'Rate' with 'Cost'. We deconstruct the mathematics of Discount Points, expose the APR lie, and provide the exact negotiation scripts to strip $10,000+ of junk fees from your Loan Estimate.",
    metaTitle: "Mortgage Points vs Rate Truth 2026 | Par Rate & APR Negotiation Guide",
    metaDescription: "Don't buy points until you read this. We reveal the 'Breakeven Math' banks hide, how to find the true Par Rate, and the 2026 protocol to negotiate $10k+ off your closing costs.",
    date: "January 5, 2026",
    updatedDate: "January 28, 2026",
    author: "Michael Reed",
    reviewer: "Walid Taha",
    category: "Real Estate Strategy",
    readTime: "52 min read", 
    image: "https://image2url.com/r2/default/images/1768751287258-2ec8a054-14a7-45be-b68e-cc13c92dcc99.png",
    
    // ✅ تم التصحيح:
    embeddedTool: 'mortgage-calculator',
    
    trendContext: {
        type: 'alert',
        text: "2026 MARKET WARNING: 70% of advertised 'low rates' now require paying 2-3 points upfront ($15,000+). Lenders are disguising prepaid interest as 'competitive pricing' to trick algorithms."
    },
    keyTakeaways: [
        "**The Par Rate Revelation:** How to find the 'wholesale price' of money before the bank adds their markup.",
        "**The Points Casino:** A mathematical proof showing why buying points rarely makes sense in a high-rate environment.",
        "**The Bidding War Protocol:** How to use one Loan Estimate to force another lender to drop their fees to $0.",
        "**The 'Locked' Loan Estimate:** Why you must never negotiate verbally and always demand the official LE document."
    ],
    content: `
      <div class="p-8 mb-10 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h4 class="font-bold text-slate-900 dark:text-white mb-4 uppercase text-xs tracking-widest">Table of Contents</h4>
          <ul class="space-y-2 text-sm text-indigo-600 dark:text-indigo-400">
              <li><a href="#war" class="hover:underline">1. The Asymmetric War (Bank vs. You)</a></li>
              <li><a href="#par-rate" class="hover:underline">2. The Par Rate Illusion</a></li>
              <li><a href="#points" class="hover:underline">3. The "Discount Points" Casino</a></li>
              <li><a href="#apr" class="hover:underline">4. APR: The Lie Detector</a></li>
              <li><a href="#anatomy" class="hover:underline">5. Anatomy of a Loan Estimate (What to Cut)</a></li>
              <li><a href="#scripts" class="hover:underline">6. The "Bidding War" Scripts</a></li>
              <li><a href="#income" class="hover:underline">7. The Income Hedge</a></li>
          </ul>
      </div>

      <div id="war" class="p-10 mb-12 bg-indigo-50 dark:bg-indigo-900/20 border-l-8 border-indigo-600 rounded-r-3xl shadow-lg">
          <h3 class="text-indigo-900 dark:text-indigo-300 font-extrabold uppercase tracking-widest text-sm mb-4">The Asymmetric War</h3>
          <p class="text-xl text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
              When you ask a loan officer "What is your rate?", you have already lost. Mortgage rates are not fixed prices; they are manipulated variables. The bank's goal is to sell you a "low rate" with "high fees" (Points) because that guarantees their profit upfront.
          </p>
      </div>

      <h2 id="par-rate" class="text-4xl font-black mb-8 text-slate-900 dark:text-white">Part 1: The Par Rate Illusion (The True Price)</h2>
      <p class="text-xl leading-relaxed mb-8 text-slate-700 dark:text-slate-300">
          To win, you must understand <strong>The Par Rate</strong>. This is the interest rate where the lender charges ZERO points and gives ZERO credits. It is the fair market value of the loan. Lenders rarely show you this; they show you a "bought down" rate.
      </p>

      <div class="bg-slate-900 text-white p-8 rounded-2xl font-mono text-sm md:text-base overflow-x-auto shadow-2xl my-10 border border-slate-700">
          <h4 class="text-xl font-bold mb-4 text-indigo-400">The Pricing Spectrum</h4>
          <ul class="space-y-4">
              <li class="flex justify-between border-b border-slate-700 pb-2">
                  <span>Rate: <strong class="text-emerald-400">7.50%</strong> (Above Par)</span>
                  <span>Cost: <strong class="text-emerald-400">Lender PAYS You (Credits)</strong></span>
              </li>
              <li class="flex justify-between border-b border-slate-700 pb-2 bg-slate-800/50 p-2 rounded">
                  <span>Rate: <strong class="text-white">7.00%</strong> (Par Rate)</span>
                  <span>Cost: <strong class="text-white">$0 (Fair Price)</strong></span>
              </li>
              <li class="flex justify-between text-rose-300">
                  <span>Rate: <strong class="text-rose-400">6.50%</strong> (Below Par)</span>
                  <span>Cost: <strong class="text-rose-400">You Pay $6,000 (Points)</strong></span>
              </li>
          </ul>
          <p class="mt-4 text-slate-400 text-sm italic">
              *Banks love to advertise the 6.50% rate without mentioning the $6,000 fee. This is marketing deception.
          </p>
      </div>

      <h2 id="points" class="text-4xl font-black mt-16 mb-8 text-slate-900 dark:text-white">Part 2: The "Discount Points" Casino</h2>
      <p class="text-xl mb-6 text-slate-700 dark:text-slate-300">
          Buying points is simply prepaying interest. You give the bank cash today to lower your payment tomorrow. But does the math work? Rarely.
      </p>

      <div class="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl my-12">
        <table class="w-full text-left border-collapse">
            <thead class="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                <tr>
                    <th class="p-5 font-bold">Strategy</th>
                    <th class="p-5 font-bold">Upfront Cost</th>
                    <th class="p-5 font-bold">Monthly Savings</th>
                    <th class="p-5 font-bold text-indigo-600 dark:text-indigo-400">Breakeven Time</th>
                </tr>
            </thead>
            <tbody class="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-lg">
                <tr class="border-b dark:border-slate-800">
                    <td class="p-5 font-bold">1 Point (1%)</td>
                    <td class="p-5 text-rose-600 font-bold">$5,000</td>
                    <td class="p-5 text-emerald-600 font-bold">$80</td>
                    <td class="p-5 font-black">62 Months (5.2 Years)</td>
                </tr>
                <tr class="border-b dark:border-slate-800">
                    <td class="p-5 font-bold">2 Points (2%)</td>
                    <td class="p-5 text-rose-600 font-bold">$10,000</td>
                    <td class="p-5 text-emerald-600 font-bold">$155</td>
                    <td class="p-5 font-black">65 Months (5.4 Years)</td>
                </tr>
            </tbody>
        </table>
        <div class="p-6 bg-slate-50 dark:bg-slate-800/50 text-base text-center text-slate-600 dark:text-slate-400 font-medium">
            <strong>The Trap:</strong> If you refinance or sell within 5 years (which most people do), you LOSE money. The bank keeps your $5,000 profit. <br>
            <a href="/tools/mortgage" class="text-indigo-600 font-bold underline">Check your own Points Math here.</a>
        </div>
      </div>

      <h2 id="apr" class="text-4xl font-black mt-16 mb-8 text-slate-900 dark:text-white">Part 3: APR — The Lie Detector</h2>
      <p class="text-xl mb-8 text-slate-700 dark:text-slate-300">
          The Annual Percentage Rate (APR) is the <em>real</em> cost of the loan because it includes fees. The gap between the "Interest Rate" and "APR" is where the bank hides its profit.
      </p>

      <div class="grid md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 bg-emerald-50 dark:bg-emerald-900/10 rounded-3xl border border-emerald-100 dark:border-emerald-800">
              <h3 class="text-2xl font-black text-emerald-700 dark:text-emerald-400 mb-4">Scenario A: The Clean Loan</h3>
              <ul class="space-y-2 text-slate-700 dark:text-slate-300">
                  <li><strong>Rate:</strong> 6.50%</li>
                  <li><strong>APR:</strong> 6.55%</li>
                  <li><strong>The Gap:</strong> 0.05%</li>
              </ul>
              <p class="text-sm font-bold text-emerald-600 mt-4">VERDICT: Very low fees. Honest pricing.</p>
          </div>

          <div class="p-8 bg-red-50 dark:bg-red-900/10 rounded-3xl border border-red-100 dark:border-red-800">
              <h3 class="text-2xl font-black text-red-700 dark:text-red-400 mb-4">Scenario B: The "Junk" Loan</h3>
              <ul class="space-y-2 text-slate-700 dark:text-slate-300">
                  <li><strong>Rate:</strong> 6.25% (Looks lower!)</li>
                  <li><strong>APR:</strong> 6.90%</li>
                  <li><strong>The Gap:</strong> 0.65%</li>
              </ul>
              <p class="text-sm font-bold text-red-600 mt-4">VERDICT: Trap! The low rate is fake. They are charging huge hidden fees.</p>
          </div>
      </div>

      <h2 id="anatomy" class="text-4xl font-black mt-20 mb-8 text-slate-900 dark:text-white">Part 4: Anatomy of a Loan Estimate (What to Cut)</h2>
      <p class="text-xl mb-8 text-slate-700 dark:text-slate-300">
          The Loan Estimate (LE) is the only document that matters. Focus on <strong>Page 2, Section A</strong>.
      </p>
      
      <div class="space-y-6">
          <div class="p-6 border border-slate-200 dark:border-slate-800 rounded-xl flex items-start gap-4">
              <XCircle className="w-8 h-8 text-red-500 flex-shrink-0" />
              <div>
                  <h4 class="font-bold text-lg">Origination Fee</h4>
                  <p class="text-slate-600 dark:text-slate-400">Pure profit for the lender. Always negotiable. Aim for $0.</p>
              </div>
          </div>
          <div class="p-6 border border-slate-200 dark:border-slate-800 rounded-xl flex items-start gap-4">
              <XCircle className="w-8 h-8 text-red-500 flex-shrink-0" />
              <div>
                  <h4 class="font-bold text-lg">Underwriting / Processing Fee</h4>
                  <p class="text-slate-600 dark:text-slate-400">Junk fees. If they charge Origination, they shouldn't charge this. Ask to waive.</p>
              </div>
          </div>
          <div class="p-6 border border-slate-200 dark:border-slate-800 rounded-xl flex items-start gap-4">
              <CheckCircle className="w-8 h-8 text-emerald-500 flex-shrink-0" />
              <div>
                  <h4 class="font-bold text-lg">Appraisal / Credit Report</h4>
                  <p class="text-slate-600 dark:text-slate-400">Third-party fees. These are legit. You must pay them.</p>
              </div>
          </div>
      </div>

      <h2 id="scripts" class="text-4xl font-black mt-20 mb-10 text-slate-900 dark:text-white">Part 5: The "Bidding War" Scripts</h2>
      <p class="text-xl mb-10 text-slate-600 dark:text-slate-400">
          Banks rely on your politeness. Do not be polite. Be professional and ruthless. Here are the exact scripts to use to make lenders fight for your business.
      </p>

      <div class="space-y-8">
          <div class="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg group hover:border-indigo-500 transition-all">
              <h4 class="text-lg font-bold text-slate-500 uppercase tracking-widest mb-3">Script 1: The Par Rate Demand</h4>
              <p class="text-2xl font-medium text-slate-900 dark:text-white italic leading-relaxed">
                  "You quoted me 6.5% with 2 points. I did not ask for points. Send me a new Loan Estimate at the PAR RATE with zero points. I want to see the base price of the money before we discuss buying it down."
              </p>
          </div>

          <div class="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg group hover:border-indigo-500 transition-all">
              <h4 class="text-lg font-bold text-slate-500 uppercase tracking-widest mb-3">Script 2: The Competitor Crush</h4>
              <p class="text-2xl font-medium text-slate-900 dark:text-white italic leading-relaxed">
                  "I have a Loan Estimate from [Competitor Bank] with a 6.8% rate and ZERO Section A fees. I prefer to work with you, but the math has to make sense. Can you beat their LE by covering my appraisal cost, or should I proceed with them?"
              </p>
          </div>
      </div>

      <h2 id="income" class="text-4xl font-black mt-20 mb-8 text-slate-900 dark:text-white">Part 6: The Income Hedge</h2>
      <p class="text-xl mb-8 text-slate-700 dark:text-slate-300">
          While you negotiate the debt, you must also build the income to pay for it. A mortgage is a liability. A digital asset is a money printer.
      </p>

      <div class="my-16 p-12 bg-gradient-to-br from-indigo-900 to-slate-950 rounded-[3rem] text-white shadow-2xl border border-indigo-500/30 relative overflow-hidden group">
          <div class="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] group-hover:bg-blue-500/20 transition-all"></div>
          <div class="relative z-10">
              <span class="px-5 py-2 bg-amber-500 text-white text-xs font-black uppercase tracking-[0.2em] rounded-full mb-8 inline-block shadow-lg">Financial Sovereignty</span>
              <h3 class="text-4xl md:text-5xl font-black mb-6">Don't Just Save. Earn.</h3>
              <p class="text-indigo-100 text-xl mb-10 max-w-2xl leading-relaxed">
                  The smartest borrowers don't just negotiate better loans; they build businesses that make the loan irrelevant. Launch your digital portfolio today.
              </p>
              <div class="flex flex-col md:flex-row items-center gap-8">
                  <a href="https://hostinger.com.tr?REFERRALCODE=137WALIDSDBF" target="_blank" rel="nofollow" class="px-10 py-5 bg-white text-slate-900 font-black rounded-2xl hover:bg-amber-400 transition-all shadow-xl flex items-center gap-3 transform hover:-translate-y-1">
                      Start Your Asset on Hostinger <ArrowRight className="w-5 h-5"/>
                  </a>
                  <p class="text-indigo-200 text-sm font-bold">Discount Code: 137WALIDSDBF</p>
              </div>
          </div>
      </div>

      <h2 id="faq" class="text-3xl font-black mt-24 mb-10 border-t border-slate-200 dark:border-slate-800 pt-16 text-slate-900 dark:text-white">Frequently Asked Questions</h2>
      <div class="space-y-8">
          <div>
              <h4 class="text-xl font-bold text-slate-900 dark:text-white mb-2">1. Are points tax deductible?</h4>
              <p class="text-lg text-slate-600 dark:text-slate-400">
                  Sometimes, but do not let the "tax tail wag the dog." Spending $10,000 to save $3,000 in taxes is still a net loss of $7,000. Do the Breakeven Math first.
              </p>
          </div>
          <div>
              <h4 class="text-xl font-bold text-slate-900 dark:text-white mb-2">2. What is a "No-Closing-Cost" loan?</h4>
              <p class="text-lg text-slate-600 dark:text-slate-400">
                  It doesn't exist. It just means the lender raised your interest rate (took a negative point) to pay your fees for you. This is often a GREAT strategy if you plan to move in less than 5 years.
              </p>
          </div>
          <div>
              <h4 class="text-xl font-bold text-slate-900 dark:text-white mb-2">3. Should I lock my rate?</h4>
              <p class="text-lg text-slate-600 dark:text-slate-400">
                  Yes. If you like the math today, lock it. Trying to time the bond market is gambling. A bird in the hand is worth two in the bush.
              </p>
          </div>
      </div>

      <h2 id="conclusion" class="text-5xl font-black mt-24 mb-8 text-slate-900 dark:text-white">Conclusion: You Are The Underwriter</h2>
      <p class="text-xl leading-relaxed mb-8 text-slate-700 dark:text-slate-300">
          The bank creates the contract, but you sign it. You have the final veto power. Do not accept a loan that includes junk fees or points you didn't ask for.
          <br><br>
          Use the APR as your flashlight, the Par Rate as your anchor, and negotiate like your net worth depends on it—because it does.
      </p>

      <div class="text-center my-16">
           <a href="/tools/mortgage" class="inline-flex items-center gap-4 px-12 py-6 bg-indigo-600 text-white font-black text-2xl rounded-2xl hover:bg-indigo-700 shadow-2xl transition-all hover:-translate-y-1">
              Calculate Your Mortgage Savings <ArrowRight className="w-6 h-6" />
           </a>
      </div>

      <div class="mt-28 p-10 bg-slate-50 dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center gap-10">
          <div class="w-32 h-32 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center text-white text-4xl font-black shadow-xl">
              MR
          </div>
          <div>
              <h4 class="text-3xl font-black mb-4 text-slate-900 dark:text-white">About Michael Reed</h4>
              <p class="text-slate-600 dark:text-slate-300 text-xl leading-relaxed">
                  Michael is a former mortgage underwriter who now exposes the internal pricing engines of major banks to help consumers save billions in unnecessary interest.
              </p>
          </div>
      </div>
    `,
    citations: [
        { label: "CFPB: Understanding Loan Estimates", link: "https://www.consumerfinance.gov/owning-a-home/loan-estimate/" },
        { label: "Freddie Mac: PMMS Data Archive", link: "https://www.freddiemac.com/pmms" },
        { label: "Hostinger: Web Hosting for Financial Independence", link: "https://hostinger.com.tr?REFERRALCODE=137WALIDSDBF" }
    ]
  }
};