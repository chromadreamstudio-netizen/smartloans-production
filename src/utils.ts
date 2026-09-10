import { CalculationResult } from './types';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPercent = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 1,
        maximumFractionDigits: 2,
    }).format(amount / 100);
}

const formatDuration = (months: number): string => {
    if (months < 12) return `${months} Month${months !== 1 ? 's' : ''}`;
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (remainingMonths === 0) return `${years} Year${years !== 1 ? 's' : ''}`;
    return `${years} Year${years !== 1 ? 's' : ''} ${remainingMonths} Mo`;
};

// --- CORE PMT FUNCTION ---
const calculatePMT = (principal: number, rate: number, months: number): number => {
    if (rate === 0) return principal / months;
    const r = rate / 100 / 12;
    return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
};

// Generates a table considering extra monthly payments
const generateAmortizationTable = (principal: number, rate: number, years: number, monthlyPayment: number, extraPayment: number = 0) => {
    const table = [];
    let balance = principal;
    const r = rate / 100 / 12;
    let yearlyInterest = 0;
    let yearlyPrincipal = 0;

    for (let i = 1; i <= years * 12; i++) {
        if (balance <= 0.01) break;
        
        const interest = balance * r;
        let principalPart = monthlyPayment - interest;
        
        if (extraPayment > 0) {
            principalPart += extraPayment;
        }

        if (principalPart > balance) {
            principalPart = balance;
        }
        
        yearlyInterest += interest;
        yearlyPrincipal += principalPart;
        balance -= principalPart;

        if (i % 12 === 0 || balance <= 0.01) {
            table.push({
                year: Math.ceil(i / 12),
                interest: yearlyInterest,
                principal: yearlyPrincipal,
                balance: Math.max(0, balance)
            });
            yearlyInterest = 0;
            yearlyPrincipal = 0;
        }
    }
    return table;
}

// --- LOANS ---
export const calculateLoan = (principal: number, rate: number, years: number, extraPayment: number = 0): CalculationResult => {
  const n = years * 12;
  const monthlyPayment = calculatePMT(principal, rate, n);
  const r = rate / 100 / 12;
  
  let balance = principal;
  let stdBalance = principal; 
  
  let totalInterest = 0;
  let actualMonths = 0;
  let stdTotalInterest = 0; 
  
  const schedule = [];

  for (let i = 1; i <= n + 12; i++) {
    if (balance <= 0.01 && stdBalance <= 0.01) break;

    if (stdBalance > 0.01) {
        const stdInterest = stdBalance * r;
        let stdPrincipalPayment = monthlyPayment - stdInterest;
        if (stdPrincipalPayment > stdBalance) stdPrincipalPayment = stdBalance;
        stdBalance -= stdPrincipalPayment;
        stdTotalInterest += stdInterest;
    } else {
        stdBalance = 0;
    }

    let interest = 0;
    let principalPayment = 0;
    
    if (balance > 0.01) {
        interest = balance * r;
        principalPayment = (monthlyPayment + extraPayment) - interest;
        if (principalPayment > balance) principalPayment = balance;
        
        balance -= principalPayment;
        totalInterest += interest;
        actualMonths = i;
    } else {
        balance = 0;
    }
    
    if (i % 6 === 0 || i === 1 || i === n || balance <= 0.01 && schedule[schedule.length-1]?.balance > 0.01) {
        schedule.push({ 
            month: i, 
            balance: Math.max(0, balance), 
            originalBalance: Math.max(0, stdBalance),
            interest, 
            principal: principalPayment 
        });
    }
  }

  const totalPayment = principal + totalInterest;
  const amortizationTable = generateAmortizationTable(principal, rate, years, monthlyPayment, extraPayment);
  
  const savings = stdTotalInterest - totalInterest;
  const monthsSaved = n - actualMonths;

  return {
    monthlyPayment: monthlyPayment + extraPayment,
    totalPayment,
    totalInterest,
    schedule,
    amortizationTable,
    savings: savings > 0 ? savings : undefined,
    metrics: extraPayment > 0 ? [
        { label: "Time Saved", value: formatDuration(monthsSaved), status: 'good' },
        { label: "Interest Saved", value: formatCurrency(savings), status: 'good' },
        { label: "New Payoff Time", value: formatDuration(actualMonths), status: 'good' }
    ] : undefined
  };
};

export const calculateLoanComparison = (p1: number, r1: number, y1: number, p2: number, r2: number, y2: number): CalculationResult => {
    const loanA = calculateLoan(p1, r1, y1);
    const loanB = calculateLoan(p2, r2, y2);

    const diffInterest = Math.abs((loanA.totalInterest || 0) - (loanB.totalInterest || 0));
    const diffPayment = Math.abs((loanA.monthlyPayment || 0) - (loanB.monthlyPayment || 0));
    const betterLoan = (loanA.totalInterest || 0) < (loanB.totalInterest || 0) ? 'A' : 'B';

    return {
        comparison: {
            loanA,
            loanB,
            differenceInterest: diffInterest,
            differencePayment: diffPayment,
            betterLoan
        }
    };
};

// --- INVESTMENTS ---
export const calculateInvestment = (initial: number, monthly: number, rate: number, years: number): CalculationResult => {
  const r = rate / 100 / 12;
  const n = years * 12;
  
  let futureValue = initial * Math.pow(1 + r, n);
  if (rate > 0) {
      futureValue += (monthly * (Math.pow(1 + r, n) - 1)) / r;
  } else {
      futureValue += monthly * n;
  }

  const totalContributed = initial + (monthly * n);
  const totalInterest = futureValue - totalContributed;

  const schedule = [];
  for(let i = 0; i <= years; i++) {
     const yearMonths = i * 12;
     let val = initial * Math.pow(1 + r, yearMonths);
     if(rate > 0) {
         val += (monthly * (Math.pow(1 + r, yearMonths) - 1)) / r;
     } else {
         val += monthly * yearMonths;
     }
     schedule.push({ month: i * 12, balance: val, interest: 0, principal: 0 });
  }

  return {
    futureValue,
    totalPayment: totalContributed, 
    totalInterest, 
    schedule,
    breakdown: [
        { name: "Principal", value: totalContributed },
        { name: "Interest", value: totalInterest }
    ]
  };
};

// --- BUDGET ---
export const calculateBudget = (income: number): CalculationResult => {
    return {
        breakdown: [
            { name: "Needs (50%)", value: income * 0.5 },
            { name: "Wants (30%)", value: income * 0.3 },
            { name: "Savings (20%)", value: income * 0.2 },
        ],
        metrics: [
            { label: "Daily Spending Limit", value: formatCurrency((income * 0.3) / 30), status: 'good' }
        ]
    }
}

// --- MORTGAGE ---
export const calculateMortgage = (price: number, downPayment: number, rate: number, years: number, propertyTax: number, insurance: number): CalculationResult => {
    const principal = price - downPayment;
    const monthlyPI = calculatePMT(principal, rate, years * 12);
    const monthlyTax = propertyTax / 12;
    const monthlyInsurance = insurance / 12;
    const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance;

    const schedule = [];
    let balance = principal;
    const r = rate / 100 / 12;
    const n = years * 12;
    for (let i = 1; i <= n; i++) {
        const interest = balance * r;
        const principalPayment = monthlyPI - interest;
        balance -= principalPayment;
        if (i % 6 === 0 || i === 1 || i === n) {
            schedule.push({ month: i, balance: Math.max(0, balance), interest, principal: principalPayment });
        }
    }

    const amortizationTable = generateAmortizationTable(principal, rate, years, monthlyPI);

    return {
        monthlyPayment: totalMonthly,
        breakdown: [
            { name: "P&I", value: monthlyPI },
            { name: "Tax", value: monthlyTax },
            { name: "Insurance", value: monthlyInsurance }
        ],
        totalInterest: (monthlyPI * years * 12) - principal,
        schedule,
        amortizationTable
    };
};

// --- REAL ESTATE ROI ---
export const calculateROI = (price: number, rent: number, expenses: number, downPayment: number): CalculationResult => {
    const annualRent = rent * 12;
    const annualExpenses = expenses * 12; 
    const netIncome = annualRent - annualExpenses;
    const roi = (netIncome / downPayment) * 100;

    return {
        metrics: [
            { label: "Annual Net Operating Income", value: formatCurrency(netIncome), status: netIncome > 0 ? 'good' : 'bad' },
            { label: "Cash on Cash ROI", value: formatPercent(roi), status: roi > 8 ? 'good' : roi > 4 ? 'warning' : 'bad' }
        ]
    }
}

// --- REFINANCE ---
export const calculateRefinance = (currentBalance: number, currentRate: number, newRate: number, cost: number, years: number): CalculationResult => {
    const oldPmt = calculatePMT(currentBalance, currentRate, years * 12);
    const newPmt = calculatePMT(currentBalance, newRate, years * 12);
    const monthlySavings = oldPmt - newPmt;
    const breakEvenMonths = cost / monthlySavings;

    return {
        monthlyPayment: newPmt,
        savings: monthlySavings,
        metrics: [
            { label: "Monthly Savings", value: formatCurrency(monthlySavings), status: monthlySavings > 0 ? 'good' : 'bad' },
            { label: "Break-Even Point", value: `${Math.ceil(breakEvenMonths)} months`, status: 'warning' },
            { label: "Lifetime Savings", value: formatCurrency((monthlySavings * years * 12) - cost), status: 'good' }
        ]
    }
}

// --- DTI ---
export const calculateDTI = (income: number, debt: number): CalculationResult => {
    const dti = (debt / income) * 100;
    return {
        healthScore: Math.max(0, 100 - dti),
        metrics: [
            { label: "DTI Ratio", value: formatPercent(dti), status: dti < 36 ? 'good' : dti < 43 ? 'warning' : 'bad' }
        ]
    }
}

// --- NET WORTH ---
export const calculateNetWorth = (assets: number, liabilities: number): CalculationResult => {
    return {
        futureValue: assets - liabilities, 
        breakdown: [
            { name: "Assets", value: assets },
            { name: "Liabilities", value: liabilities }
        ]
    }
}

export const calculateFinancialHealth = (income: number, debt: number, savings: number, expenses: number): CalculationResult => {
    const dti = (debt / income) * 100;
    const savingsRate = ((income - expenses) / income) * 100;
    let score = 50; 
    if (dti < 30) score += 20; else if (dti < 45) score += 10; else score -= 10;
    if (savingsRate > 20) score += 20; else if (savingsRate > 10) score += 10;
    
    return {
        healthScore: Math.min(100, Math.max(0, score)),
        metrics: [
            { label: "Debt-to-Income", value: `${dti.toFixed(1)}%`, status: dti < 36 ? 'good' : 'warning' },
            { label: "Savings Rate", value: `${savingsRate.toFixed(1)}%`, status: savingsRate > 20 ? 'good' : 'warning' },
            { label: "Free Cash Flow", value: formatCurrency(income - expenses - debt), status: (income - expenses - debt) > 0 ? 'good' : 'bad' }
        ]
    };
}

// --- COAST FIRE (NEW) ---
export const calculateCoastFire = (currentAge: number, retireAge: number, currentInvested: number, monthlySpend: number, growthRate: number = 8, inflation: number = 3): CalculationResult => {
    const yearsToGrow = retireAge - currentAge;
    const realRate = (growthRate - inflation) / 100;
    
    const annualSpend = monthlySpend * 12;
    const fireNumber = annualSpend * 25; // Rule of 25

    const futureValue = currentInvested * Math.pow((1 + realRate), yearsToGrow);
    
    const isCoast = futureValue >= fireNumber;
    const difference = futureValue - fireNumber;

    return {
        futureValue,
        totalPayment: fireNumber, // Using this field to pass the Target
        savings: difference,
        metrics: [
            { label: "Coast Status", value: isCoast ? "Reached! 🚀" : "Keep Pushing", status: isCoast ? 'good' : 'warning' },
            { label: "FIRE Number Needed", value: formatCurrency(fireNumber), status: 'neutral' },
            { label: "Projected at Retirement", value: formatCurrency(futureValue), status: isCoast ? 'good' : 'neutral' }
        ]
    }
}