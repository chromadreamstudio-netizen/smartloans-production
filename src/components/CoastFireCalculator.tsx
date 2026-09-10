'use client';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { calculateCoastFire } from '../utils';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CoastFireCalculator: React.FC = () => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retireAge, setRetireAge] = useState(67);
  const [currentInvested, setCurrentInvested] = useState(50000);
  const [monthlySpend, setMonthlySpend] = useState(5000);
  const [growthRate, setGrowthRate] = useState(8);
  const [inflation, setInflation] = useState(3);

  const results = calculateCoastFire(currentAge, retireAge, currentInvested, monthlySpend, growthRate, inflation);
  
  const isCoast = (results.metrics && results.metrics[0].value.includes("Reached"));
  const fireNumber = results.totalPayment || 0;
  const futureValue = results.futureValue || 0;

  const chartData = {
    labels: Array.from({ length: retireAge - currentAge + 1 }, (_, i) => currentAge + i),
    datasets: [
      {
        label: 'Your "Coasting" Portfolio',
        data: Array.from({ length: retireAge - currentAge + 1 }, (_, i) => {
           const realRate = (growthRate - inflation) / 100;
           return currentInvested * Math.pow((1 + realRate), i);
        }),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
      },
      {
        label: 'Freedom Number Needed',
        data: Array.from({ length: retireAge - currentAge + 1 }, () => fireNumber),
        borderColor: '#ef4444',
        borderDash: [5, 5],
      }
    ],
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6 md:p-8 max-w-4xl mx-auto border border-zinc-200 dark:border-zinc-800">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-2">Coast FIRE Calculator</h2>
        <p className="text-zinc-600 dark:text-zinc-400">Can you stop saving for retirement today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold mb-1 text-zinc-700 dark:text-zinc-300">Current Age</label>
            <input type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full p-3 rounded-lg border dark:bg-zinc-800 dark:border-zinc-700 font-mono" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1 text-zinc-700 dark:text-zinc-300">Retirement Age</label>
            <input type="number" value={retireAge} onChange={(e) => setRetireAge(Number(e.target.value))} className="w-full p-3 rounded-lg border dark:bg-zinc-800 dark:border-zinc-700 font-mono" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1 text-zinc-700 dark:text-zinc-300">Current Invested Assets ($)</label>
            <input type="number" value={currentInvested} onChange={(e) => setCurrentInvested(Number(e.target.value))} className="w-full p-3 rounded-lg border dark:bg-zinc-800 dark:border-zinc-700 font-mono" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1 text-zinc-700 dark:text-zinc-300">Monthly Spending in Retirement ($)</label>
            <input type="number" value={monthlySpend} onChange={(e) => setMonthlySpend(Number(e.target.value))} className="w-full p-3 rounded-lg border dark:bg-zinc-800 dark:border-zinc-700 font-mono" />
          </div>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-2xl flex flex-col justify-center items-center text-center border border-zinc-100 dark:border-zinc-700">
            {isCoast ? (
                <>
                    <div className="text-5xl mb-4">🚀</div>
                    <h3 className="text-2xl font-black text-emerald-600 mb-2">You Have Reached Coast FIRE!</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Stop saving. Seriously. If you just let your <strong>${currentInvested.toLocaleString()}</strong> sit there, compound interest will grow it to <strong>${Math.round(futureValue).toLocaleString()}</strong> by age {retireAge}.
                    </p>
                </>
            ) : (
                <>
                    <div className="text-5xl mb-4">🌱</div>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Keep Pushing</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                        You need <strong>${Math.round(fireNumber).toLocaleString()}</strong> to retire. 
                    </p>
                    <p className="text-rose-500 font-bold mt-2">Shortfall: ${Math.round(fireNumber - futureValue).toLocaleString()}</p>
                </>
            )}
        </div>
      </div>

      <div className="mt-8 h-64 w-full">
        <Line data={chartData} options={{ maintainAspectRatio: false, responsive: true }} />
      </div>
    </div>
  );
};

export default CoastFireCalculator;