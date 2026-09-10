'use client';

import React, { useState, useEffect } from 'react';
import { CalculatorType } from '@/types';
import { 
  DollarSign, Percent, Calendar, Calculator, 
  RefreshCw, TrendingUp, AlertCircle, CheckCircle,
  Home, Key, Download, FileText, HeartPulse, Target, Zap
} from 'lucide-react';

interface CalculatorEngineProps {
  type: CalculatorType;
  title: string;
  description: string;
}

export default function CalculatorEngine({ type, title, description }: CalculatorEngineProps) {
  const [inputs, setInputs] = useState<Record<string, number>>({});
  const [results, setResults] = useState<Record<string, any>>({});

  useEffect(() => {
    setResults({});
    const defaults: Record<string, number> = {};
    switch (type) {
      case CalculatorType.FINANCIAL_HEALTH: defaults['monthly_income'] = 6000; defaults['monthly_expenses'] = 4000; defaults['total_savings'] = 15000; defaults['total_debt'] = 5000; break;
      case CalculatorType.FIRE_CALC: defaults['annual_spending'] = 60000; defaults['current_net_worth'] = 100000; defaults['annual_savings'] = 30000; defaults['annual_return'] = 7; break;
      case CalculatorType.RETIREMENT: defaults['current_age'] = 30; defaults['retirement_age'] = 65; defaults['current_savings'] = 50000; defaults['monthly_contribution'] = 1000; defaults['annual_return'] = 8; break;
      case CalculatorType.EXTRA_PAYMENTS: defaults['loan_balance'] = 200000; defaults['interest_rate'] = 6; defaults['remaining_years'] = 25; defaults['extra_monthly_payment'] = 200; break;
      case CalculatorType.ROI_CALCULATOR: defaults['amount_invested'] = 10000; defaults['amount_returned'] = 15000; defaults['time_period_years'] = 3; break;
      case CalculatorType.INFLATION: defaults['current_amount'] = 10000; defaults['inflation_rate'] = 3.5; defaults['years'] = 10; break;
      case CalculatorType.SAVINGS_GOAL: defaults['goal_amount'] = 50000; defaults['initial_savings'] = 5000; defaults['years_to_grow'] = 5; defaults['interest_rate'] = 4; break;
      case CalculatorType.EMERGENCY_FUND: defaults['monthly_rent'] = 1500; defaults['monthly_food'] = 600; defaults['monthly_utilities'] = 300; defaults['monthly_debt_payments'] = 400; break;
      case CalculatorType.CREDIT_CARD_PAYOFF: defaults['card_balance'] = 5000; defaults['interest_rate'] = 22; defaults['monthly_payment'] = 150; break;
      case CalculatorType.MORTGAGE: case CalculatorType.AUTO_LOAN: case CalculatorType.LOAN_AMORTIZATION: case CalculatorType.BUSINESS_LOAN: case CalculatorType.STUDENT_LOAN: defaults['amount'] = type === CalculatorType.AUTO_LOAN ? 30000 : 300000; defaults['rate'] = 6.5; defaults['years'] = type === CalculatorType.AUTO_LOAN ? 5 : 30; break;
      case CalculatorType.RENT_VS_BUY: defaults['home_price'] = 400000; defaults['monthly_rent'] = 2500; defaults['rate'] = 6.5; break;
      case CalculatorType.INVESTMENT: defaults['initial_deposit'] = 10000; defaults['monthly_contribution'] = 500; defaults['annual_return'] = 8; defaults['years_to_grow'] = 20; break;
      case CalculatorType.DEBT_PAYOFF: defaults['balance'] = 15000; defaults['rate'] = 18; defaults['payment'] = 400; break;
      case CalculatorType.BUDGET: defaults['income'] = 5000; break;
      case CalculatorType.NET_WORTH: defaults['assets'] = 500000; defaults['liabilities'] = 250000; break;
      case CalculatorType.REFINANCE: defaults['current_payment'] = 2500; defaults['new_payment'] = 2200; defaults['closing_costs'] = 5000; break;
      case CalculatorType.LOAN_AFFORDABILITY: defaults['monthly_budget'] = 1500; defaults['rate'] = 6.5; defaults['years'] = 30; break;
      case CalculatorType.DEBT_TO_INCOME: defaults['monthly_income'] = 8000; defaults['monthly_debt'] = 2000; break;
      case CalculatorType.REAL_ESTATE_ROI: defaults['purchase_price'] = 300000; defaults['monthly_rent'] = 3000; defaults['expenses'] = 1200; break;
      default: defaults['value'] = 1000;
    }
    setInputs(defaults);
  }, [type]);

  const handleInputChange = (key: string, value: string) => {
    setInputs(prev => ({ ...prev, [key]: parseFloat(value) || 0 }));
  };

  const calculate = () => {
    const i = inputs;
    let res: Record<string, any> = {};
    try {
      const getMonthlyRate = (r: number) => r / 100 / 12;
      switch (type) {
        case CalculatorType.FINANCIAL_HEALTH:
          const savingsRatio = (i.monthly_income - i.monthly_expenses) / i.monthly_income * 100;
          const dti = (i.total_debt * 0.03) / i.monthly_income * 100; 
          const emergencyMonths = i.total_savings / i.monthly_expenses;
          let score = 0;
          if (savingsRatio > 20) score += 40; else score += savingsRatio * 2;
          if (emergencyMonths > 6) score += 30; else score += emergencyMonths * 5;
          if (dti < 30) score += 30; else if (dti < 50) score += 15;
          res = {
            'Financial Score': Math.min(100, Math.round(score)) + '/100',
            'Savings Rate': savingsRatio.toFixed(1) + '%', 'Verdict': score > 80 ? 'Excellent' : 'Needs Work',
            'chartType': 'pie', 'chartData': [{ name: 'Income', value: i.monthly_income, color: '#10b981' }, { name: 'Expenses', value: i.monthly_expenses, color: '#ef4444' }]
          }; break;
        case CalculatorType.FIRE_CALC:
          const fireNumber = i.annual_spending * 25; let years = 0; let balance = i.current_net_worth;
          while (balance < fireNumber && years < 100) { balance = balance * (1 + i.annual_return/100) + i.annual_savings; years++; }
          res = { 'FIRE Number': fireNumber, 'Years to Freedom': years, 'chartType': 'bar', 'chartData': [{ name: 'Current', value: i.current_net_worth, color: '#3b82f6' }, { name: 'Goal', value: fireNumber, color: '#10b981' }] }; break;
        case CalculatorType.RETIREMENT:
          const monthsRet = (i.retirement_age - i.current_age) * 12; const r_ret = i.annual_return / 100 / 12;
          const fv_ret = i.current_savings * Math.pow(1 + r_ret, monthsRet) + (i.monthly_contribution * (Math.pow(1 + r_ret, monthsRet) - 1)) / r_ret;
          res = { ['Nest Egg at ' + i.retirement_age]: fv_ret, 'Monthly Income': (fv_ret * 0.04) / 12, 'chartType': 'pie', 'chartData': [{ name: 'Contributed', value: i.current_savings + (i.monthly_contribution * monthsRet), color: '#3b82f6' }, { name: 'Growth', value: fv_ret - (i.current_savings + (i.monthly_contribution * monthsRet)), color: '#10b981' }] }; break;
        case CalculatorType.EXTRA_PAYMENTS:
          const r_ex = i.interest_rate / 100 / 12; const n_ex = i.remaining_years * 12; const pmt_std = (i.loan_balance * r_ex * Math.pow(1 + r_ex, n_ex)) / (Math.pow(1 + r_ex, n_ex) - 1);
          let bal = i.loan_balance; let m = 0; let totalInt = 0;
          while (bal > 0 && m < 1000) { const int = bal * r_ex; totalInt += int; bal -= (pmt_std + i.extra_monthly_payment - int); m++; }
          const normalInterest = (pmt_std * n_ex) - i.loan_balance;
          res = { 'Original Years': i.remaining_years, 'New Years': (m / 12).toFixed(1), 'Interest Saved': normalInterest - totalInt, 'chartType': 'bar', 'chartData': [{ name: 'Paid', value: totalInt, color: '#3b82f6' }, { name: 'Saved', value: normalInterest - totalInt, color: '#10b981' }] }; break;
        case CalculatorType.ROI_CALCULATOR:
          const gain = i.amount_returned - i.amount_invested; res = { 'Total Profit': gain, 'ROI': ((gain/i.amount_invested)*100).toFixed(1) + '%', 'chartType': 'bar', 'chartData': [{ name: 'Invested', value: i.amount_invested, color: '#9ca3af' }, { name: 'Returned', value: i.amount_returned, color: '#10b981' }] }; break;
        case CalculatorType.INFLATION:
          const pp = i.current_amount / Math.pow(1 + i.inflation_rate/100, i.years);
          res = { 'Future Purchasing Power': pp, 'Value Lost': i.current_amount - pp, 'chartType': 'pie', 'chartData': [{ name: 'Value', value: pp, color: '#3b82f6' }, { name: 'Lost', value: i.current_amount - pp, color: '#ef4444' }] }; break;
        case CalculatorType.SAVINGS_GOAL:
          const r_sav = i.interest_rate/100/12; const n_sav = i.years_to_grow*12; const num = i.goal_amount - (i.initial_savings * Math.pow(1+r_sav, n_sav)); const den = (Math.pow(1+r_sav, n_sav)-1)/r_sav;
          res = { 'Monthly Needed': num/den, 'chartType': 'pie', 'chartData': [{ name: 'Principal', value: i.initial_savings + ((num/den)*n_sav), color: '#3b82f6' }, { name: 'Interest', value: i.goal_amount - (i.initial_savings + ((num/den)*n_sav)), color: '#10b981' }] }; break;
        case CalculatorType.EMERGENCY_FUND:
          const mn = i.monthly_rent + i.monthly_food + i.monthly_utilities + i.monthly_debt_payments;
          res = { 'Monthly Burn': mn, '6-Month Target': mn*6, 'chartType': 'bar', 'chartData': [{ name: 'Monthly', value: mn, color: '#ef4444' }, { name: 'Target', value: mn*6, color: '#10b981' }] }; break;
        case CalculatorType.CREDIT_CARD_PAYOFF:
          const r_cc = i.interest_rate/100/12; let mcc = -Math.log(1 - (r_cc*i.card_balance)/i.monthly_payment)/Math.log(1+r_cc); if(isNaN(mcc) || !isFinite(mcc)) mcc=0;
          res = { 'Months': Math.ceil(mcc), 'Interest Paid': (mcc*i.monthly_payment) - i.card_balance, 'chartType': 'pie', 'chartData': [{ name: 'Debt', value: i.card_balance, color: '#3b82f6' }, { name: 'Interest', value: (mcc*i.monthly_payment) - i.card_balance, color: '#ef4444' }] }; break;
        case CalculatorType.MORTGAGE: case CalculatorType.AUTO_LOAN: case CalculatorType.LOAN_AMORTIZATION: case CalculatorType.BUSINESS_LOAN: case CalculatorType.STUDENT_LOAN:
          const r = getMonthlyRate(i.rate); const n = i.years * 12; const pmt = (i.amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
          res = { 'Monthly Payment': pmt, 'Total Interest': (pmt * n) - i.amount, 'chartType': 'pie', 'chartData': [{ name: 'Principal', value: i.amount, color: '#3b82f6' }, { name: 'Interest', value: (pmt * n) - i.amount, color: '#f59e0b' }] }; break;
        case CalculatorType.RENT_VS_BUY:
          const buyBurn = (i.home_price * 0.05) / 12; res = { 'Buy Cost': buyBurn, 'Rent Cost': i.monthly_rent, 'Verdict': buyBurn > i.monthly_rent ? 'RENT' : 'BUY', 'chartType': 'bar', 'chartData': [{ name: 'Buy Burn', value: buyBurn, color: '#ef4444' }, { name: 'Rent', value: i.monthly_rent, color: '#3b82f6' }] }; break;
        case CalculatorType.INVESTMENT:
          const r_i = i.annual_return/100/12; const n_i = i.years_to_grow*12; const fv = i.initial_deposit * Math.pow(1+r_i, n_i) + (i.monthly_contribution * (Math.pow(1+r_i, n_i)-1))/r_i;
          res = { 'Future Value': fv, 'Interest': fv - (i.initial_deposit + i.monthly_contribution*n_i), 'chartType': 'pie', 'chartData': [{ name: 'Invested', value: i.initial_deposit + i.monthly_contribution*n_i, color: '#3b82f6' }, { name: 'Interest', value: fv - (i.initial_deposit + i.monthly_contribution*n_i), color: '#10b981' }] }; break;
        default: res = { 'Result': 'Ready' };
      }
    } catch (e) { console.error(e); }
    setResults(res);
  };

  const handlePrint = () => {
    if (Object.keys(results).length === 0) calculate();
    setTimeout(() => window.print(), 300);
  };

  return (
    <div className="p-6 md:p-8 relative">
      <div id="printable-report" className="hidden">
        <div className="border-b-2 border-black pb-6 mb-8 flex justify-between items-end">
            <div><h1 className="text-4xl font-bold uppercase tracking-wider mb-2">Analysis Report</h1><p className="text-xl text-gray-600">{title}</p></div>
            <div className="text-right"><p className="font-bold text-lg">{new Date().toLocaleDateString()}</p><p className="text-gray-500">SmartLoansAnalysis.com</p></div>
        </div>
        <div className="grid grid-cols-2 gap-8 mb-10">
            {Object.entries(results).map(([key, value]) => {
                if (key.includes('chart')) return null;
                return (<div key={key} className="bg-gray-50 p-4 rounded border border-gray-200"><p className="text-gray-500 text-sm uppercase font-bold mb-1">{key}</p><p className="text-3xl font-black text-black">{typeof value === 'number' ? value.toLocaleString(undefined, { maximumFractionDigits: 0 }) : value}</p></div>);
            })}
        </div>
        {results.chartData && (<div className="mt-8 border p-8 rounded-xl border-gray-300"><h3 className="text-center font-bold text-xl mb-6 uppercase">Visual Breakdown</h3><div className="flex justify-center scale-125">{results.chartType === 'pie' ? <SimpleDonutChart data={results.chartData} /> : <SimpleBarChart data={results.chartData} />}</div></div>)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 no-print">
        <div className="space-y-6">
          <div className="flex items-center justify-between"><h3 className="text-xl font-bold text-slate-300 flex items-center gap-2"><Calculator className="w-5 h-5 text-blue-500" /> Inputs</h3></div>
          <div className="space-y-4">{Object.keys(inputs).map((key) => (<InputGroup key={key} label={key} id={key} value={inputs[key]} onChange={handleInputChange} />))}</div>
          <button onClick={calculate} className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg transition-all"><RefreshCw className="w-5 h-5 inline mr-2" /> Calculate Results</button>
        </div>

        <div className="bg-slate-900/50 rounded-3xl p-8 border border-slate-800 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8"><h3 className="text-xl font-bold text-white flex items-center gap-2"><TrendingUp className="w-5 h-5 text-emerald-500" /> Analysis</h3>{Object.keys(results).length > 0 && (<button onClick={handlePrint} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors border border-slate-700 rounded-lg px-3 py-1.5 hover:bg-slate-800"><Download size={14} /> PDF Report</button>)}</div>
          {Object.keys(results).length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center text-slate-500 py-12"><Calculator className="w-16 h-16 mb-4 opacity-20" /><p>Enter your numbers to generate a report.</p></div>
          ) : (
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">{Object.entries(results).map(([key, value]) => {if (key.includes('chart')) return null; return <ResultRow key={key} label={key} value={value} />;})}</div>
              {results.chartData && (<div className="mt-8 pt-8 border-t border-slate-800"><h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Visual Breakdown</h4><div className="flex justify-center">{results.chartType === 'pie' ? <SimpleDonutChart data={results.chartData} /> : <SimpleBarChart data={results.chartData} />}</div></div>)}
              
              {/* 💰💰💰 زر الربح (Monetization CTA) 💰💰💰 */}
              <div className="mt-8 p-6 bg-gradient-to-r from-emerald-900 to-teal-900 rounded-xl border border-emerald-500/30 text-center no-print">
                <h4 className="text-white font-bold text-lg mb-2">🚀 Don't leave money on the table.</h4>
                <p className="text-emerald-200 text-sm mb-4">Based on these numbers, you could improve your position today.</p>
                <a href="#" className="inline-block bg-white text-emerald-900 font-bold py-3 px-8 rounded-full hover:bg-emerald-100 transition-transform hover:scale-105">See Today's Best Rates ➔</a>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InputGroup({ label, id, value, onChange }: any) { return (<div><label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{label.replace(/_/g, ' ')}</label><input type="number" value={value || ''} onChange={(e) => onChange(id, e.target.value)} className="w-full bg-[#131620] border border-slate-700 rounded-lg py-3 px-4 text-white focus:ring-2 focus:ring-blue-500 outline-none font-mono" /></div>); }
function ResultRow({ label, value }: any) { return (<div className="flex justify-between items-center py-3 border-b border-slate-800/50"><span className="text-slate-400">{label}</span><span className="text-xl font-bold text-white">{typeof value === 'number' ? value.toLocaleString(undefined, { maximumFractionDigits: 0 }) : value}</span></div>); }
function SimpleDonutChart({ data }: { data: any[] }) { let cumulativePercent = 0; const total = data.reduce((acc, item) => acc + item.value, 0); return (<div className="flex items-center gap-8 print:block print:text-center"><div className="relative w-32 h-32 flex-shrink-0 print:mx-auto print:mb-4"><svg viewBox="-1 -1 2 2" style={{ transform: 'rotate(-90deg)' }}>{data.map((slice, i) => { const start = cumulativePercent; const value = slice.value / total; cumulativePercent += value; const [startX, startY] = [Math.cos(2 * Math.PI * start), Math.sin(2 * Math.PI * start)]; const [endX, endY] = [Math.cos(2 * Math.PI * cumulativePercent), Math.sin(2 * Math.PI * cumulativePercent)]; const largeArcFlag = value > 0.5 ? 1 : 0; return <path key={i} d={`M 0 0 L ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} Z`} fill={slice.color} className="print:stroke-black print:stroke-[0.02]" />; })}<circle cx="0" cy="0" r="0.6" className="fill-[#131620] print:fill-white" /></svg></div><div className="space-y-2 print:inline-block print:text-left">{data.map((item, i) => (<div key={i} className="flex items-center gap-2 text-sm"><span className="w-3 h-3 rounded-full print:border print:border-black" style={{ backgroundColor: item.color }}></span><span className="text-slate-400 print:text-black">{item.name}</span></div>))}</div></div>); }
function SimpleBarChart({ data }: { data: any[] }) { const max = Math.max(...data.map(d => d.value)); return (<div className="space-y-3 w-full">{data.map((item, i) => (<div key={i}><div className="flex justify-between text-xs mb-1"><span className="text-slate-400 print:text-black font-bold">{item.name}</span><span className="text-white print:text-black font-bold">{typeof item.value === 'number' ? item.value.toLocaleString() : item.value}</span></div><div className="h-3 bg-slate-800 rounded-full overflow-hidden print:bg-gray-200 border border-transparent print:border-black"><div className="h-full rounded-full print:print-color-adjust" style={{ width: `${(item.value / max) * 100}%`, backgroundColor: item.color }}></div></div></div>))}</div>); }