import { CalculatorType } from '@/types';

export const TOOLS_DATA: Record<string, any> = {
  // --- العقارات (Real Estate) ---
  'mortgage-calculator': {
    id: 'mortgage-calculator',
    title: 'Mortgage Calculator',
    desc: 'Calculate monthly payments with taxes, insurance, and HOA. The standard home buying tool.',
    type: CalculatorType.MORTGAGE,
    category: 'Real Estate',
    icon: 'Home',
    content: `
      <h2>How to Use This Mortgage Calculator</h2>
      <p>Buying a home is the biggest financial decision of your life. This calculator helps you estimate your monthly payment so you can shop for homes with confidence.</p>
      <h3>The 28/36 Rule Explained</h3>
      <p>Lenders use the 28/36 rule to decide if you can afford a home. It states that your mortgage payment should not exceed <strong>28%</strong> of your gross monthly income, and total debt should not exceed <strong>36%</strong>.</p>
    `
  },
  'rent-vs-buy': {
    id: 'rent-vs-buy',
    title: 'Rent vs. Buy',
    desc: 'Mathematical analysis: Should you rent or buy in the current market?',
    type: CalculatorType.RENT_VS_BUY,
    category: 'Real Estate',
    icon: 'Key',
    content: `
      <h2>Is it Better to Rent or Buy?</h2>
      <p>The old advice "renting is throwing money away" is mathematically false in many markets. This calculator compares the total unrecoverable costs of renting vs. buying over time.</p>
      <h3>The 5% Rule</h3>
      <p>A quick rule of thumb: If the annual rent is less than 5% of the home's purchase price, renting is likely the better financial decision.</p>
    `
  },
  'refinance': {
    id: 'refinance',
    title: 'Refinance Breakeven',
    desc: 'Find the exact date your mortgage refinance pays for itself.',
    type: CalculatorType.REFINANCE,
    category: 'Real Estate',
    icon: 'RefreshCw',
    content: `<h2>When Should You Refinance?</h2><p>Refinancing makes sense if you can lower your interest rate by at least 0.75%. Use this tool to calculate the "Breakeven Point" — the time it takes for savings to cover closing costs.</p>`
  },
  'real-estate-roi': {
    id: 'real-estate-roi',
    title: 'Rental Property ROI',
    desc: 'Analyze cash flow, cap rate, and cash-on-cash return.',
    type: CalculatorType.REAL_ESTATE_ROI,
    category: 'Real Estate',
    icon: 'Building',
    content: `<h2>Mastering Real Estate ROI</h2><p>Don't buy an investment property based on feelings. Use metrics like Cap Rate and Cash-on-Cash return to evaluate profitability accurately.</p>`
  },

  // --- التخطيط المالي (Financial Planning) ---
  'financial-health': {
    id: 'financial-health',
    title: 'Financial Health Check',
    desc: 'A comprehensive audit of your financial vitals.',
    type: CalculatorType.FINANCIAL_HEALTH,
    category: 'Financial Planning',
    icon: 'Activity',
    content: `<h2>Audit Your Finances</h2><p>Just like a medical checkup, you need a financial checkup. This tool scores you based on savings rate, debt-to-income ratio, and liquidity to give you a definitive "Financial Score".</p>`
  },
  'net-worth': {
    id: 'net-worth',
    title: 'Net Worth Tracker',
    desc: 'Track your Assets vs. Liabilities.',
    type: CalculatorType.NET_WORTH,
    category: 'Financial Planning',
    icon: 'PieChart',
    content: `<h2>Why Net Worth Matters</h2><p>Income is what you earn; Net Worth is what you keep. Tracking this number is the single best indicator of your true financial progress over time.</p>`
  },
  'budget': {
    id: 'budget',
    title: '50/30/20 Budget',
    desc: 'Allocate income into Needs, Wants, and Savings.',
    type: CalculatorType.BUDGET,
    category: 'Financial Planning',
    icon: 'ClipboardList',
    content: `<h2>The 50/30/20 Rule</h2><p>Split your after-tax income: 50% for Needs (Rent, Food), 30% for Wants (Fun), and 20% for Savings. This simple framework prevents lifestyle creep.</p>`
  },
  'emergency-fund': {
    id: 'emergency-fund',
    title: 'Emergency Fund',
    desc: 'Calculate exactly how much cash you need to sleep well.',
    type: CalculatorType.EMERGENCY_FUND,
    category: 'Financial Planning',
    icon: 'Shield',
    content: `<h2>How Much Cash is Enough?</h2><p>Experts recommend 3-6 months of essential expenses. High-income earners or entrepreneurs should aim for 6-12 months due to income volatility.</p>`
  },
  'fire-calculator': {
    id: 'fire-calculator',
    title: 'FIRE Calculator',
    desc: 'Calculate your Financial Independence Retire Early date.',
    type: CalculatorType.FIRE_CALC,
    category: 'Financial Planning',
    icon: 'Flame',
    content: `<h2>The Math of Early Retirement</h2><p>Financial Independence is not about age; it's about math. Once your net worth is 25x your annual expenses, you are mathematically free.</p>`
  },
  'coast-fire': {
    id: 'coast-fire',
    title: 'Coast FIRE',
    desc: 'Find out if you have saved enough to stop contributing today.',
    type: CalculatorType.COAST_FIRE,
    category: 'Financial Planning',
    icon: 'Palmtree',
    content: `<h2>What is Coast FIRE?</h2><p>Coast FIRE is the point where you have invested enough that compound interest alone will grow your pot to a full retirement sum by age 65.</p>`
  },
  'investment': {
    id: 'investment',
    title: 'Investment Growth',
    desc: 'Visualize compound interest and portfolio growth.',
    type: CalculatorType.INVESTMENT,
    category: 'Financial Planning',
    icon: 'TrendingUp',
    content: `<h2>The Power of Compound Interest</h2><p>Compound interest is the "Eighth Wonder of the World." Starting 10 years earlier can double your final result, even if you save less money per month.</p>`
  },
  'retirement': {
    id: 'retirement',
    title: 'Retirement Planner',
    desc: 'Advanced modeling for your golden years.',
    type: CalculatorType.RETIREMENT,
    category: 'Financial Planning',
    icon: 'Sunset',
    content: `<h2>Will You Run Out of Money?</h2><p>Retirement planning is about ensuring your "Safe Withdrawal Rate" keeps your portfolio alive for 30+ years.</p>`
  },
  'inflation': {
    id: 'inflation',
    title: 'Inflation Calculator',
    desc: 'See what your money will be worth in 20 years.',
    type: CalculatorType.INFLATION,
    category: 'Financial Planning',
    icon: 'ArrowUpRight',
    content: `<h2>The Silent Tax</h2><p>Inflation erodes your purchasing power. $100,000 today will only buy $50,000 worth of goods in 20 years at 3.5% inflation.</p>`
  },
  'savings-goal': {
    id: 'savings-goal',
    title: 'Savings Goal',
    desc: 'How much to save monthly to reach your target?',
    type: CalculatorType.SAVINGS_GOAL,
    category: 'Financial Planning',
    icon: 'Target',
    content: `<h2>Reverse Engineer Your Goals</h2><p>Whether it's a Tesla or a Wedding, this tool tells you exactly how much to set aside monthly to hit your target date.</p>`
  },

  // --- الديون والقروض (Loans & Debt) ---
  'debt-payoff': {
    id: 'debt-payoff',
    title: 'Debt Snowball',
    desc: 'Create a plan to eliminate debt fast.',
    type: CalculatorType.DEBT_PAYOFF,
    category: 'Loans & Debt',
    icon: 'Snowflake',
    content: `<h2>Snowball vs. Avalanche</h2><p>The Debt Snowball (paying smallest balance first) builds psychological momentum. The Debt Avalanche (paying highest interest first) saves the most money mathematically.</p>`
  },
  'loan-amortization': {
    id: 'loan-amortization',
    title: 'Loan Amortization',
    desc: 'Generate a schedule for any loan.',
    type: CalculatorType.LOAN_AMORTIZATION,
    category: 'Loans & Debt',
    icon: 'List',
    content: `<h2>Understanding Your Loan Schedule</h2><p>Amortization is the process of paying off debt with a fixed repayment schedule. See how much of your payment goes to interest vs principal.</p>`
  },
  'extra-payments': {
    id: 'extra-payments',
    title: 'Extra Payment Calc',
    desc: 'See how much interest you save by adding just $50/month.',
    type: CalculatorType.EXTRA_PAYMENTS,
    category: 'Loans & Debt',
    icon: 'Zap',
    content: `<h2>The Magic of Extra Payments</h2><p>Adding just one extra payment per year can shave 4-5 years off a 30-year mortgage and save tens of thousands in interest.</p>`
  },
  'credit-card-payoff': {
    id: 'credit-card-payoff',
    title: 'Credit Card Payoff',
    desc: 'How long until you are debt free paying minimums?',
    type: CalculatorType.CREDIT_CARD_PAYOFF,
    category: 'Loans & Debt',
    icon: 'CreditCard',
    content: `<h2>The Minimum Payment Trap</h2><p>Banks designed minimum payments to keep you in debt for decades. Use this tool to see how increasing your payment changes your freedom date.</p>`
  },
  'auto-loan': {
    id: 'auto-loan',
    title: 'Auto Loan',
    desc: 'See the true cost of car financing.',
    type: CalculatorType.AUTO_LOAN,
    category: 'Loans & Debt',
    icon: 'Car',
    content: `<h2>The 20/3/8 Rule for Cars</h2><p>Put 20% down, finance for no more than 3 years, and keep payments under 8% of your gross income to build wealth.</p>`
  },
  'debt-to-income': {
    id: 'debt-to-income',
    title: 'Debt-to-Income (DTI)',
    desc: 'Check if you qualify for a mortgage.',
    type: CalculatorType.DEBT_TO_INCOME,
    category: 'Loans & Debt',
    icon: 'Scale',
    content: `<h2>Why Lenders Watch DTI</h2><p>Your Debt-to-Income ratio tells lenders how risky you are. Keep it under 36% for the best interest rates.</p>`
  },
  'loan-affordability': {
    id: 'loan-affordability',
    title: 'Loan Affordability',
    desc: 'How much can you actually borrow?',
    type: CalculatorType.LOAN_AFFORDABILITY,
    category: 'Loans & Debt',
    icon: 'Wallet',
    content: `<h2>Don't Become "House Poor"</h2><p>Just because the bank approves you for a massive loan doesn't mean you should take it. Calculate what fits your actual budget.</p>`
  },
  'student-loan': {
    id: 'student-loan',
    title: 'Student Loan',
    desc: 'Strategize your student debt repayment.',
    type: CalculatorType.STUDENT_LOAN,
    category: 'Education & Business',
    icon: 'GraduationCap',
    content: `<h2>Strategies for Student Debt</h2><p>Should you refinance? Pay aggressive principal? Understand your daily interest accrual before making a move.</p>`
  },
  'business-loan': {
    id: 'business-loan',
    title: 'Business Loan',
    desc: 'Calculate commercial loan payments.',
    type: CalculatorType.BUSINESS_LOAN,
    category: 'Education & Business',
    icon: 'Briefcase',
    content: `<h2>Leverage for Growth</h2><p>Good business debt helps you expand. Use this calculator to ensure the ROI exceeds the interest cost of the loan.</p>`
  },
  'roi-calculator': {
    id: 'roi-calculator',
    title: 'ROI Calculator',
    desc: 'Calculate Return on Investment for any venture.',
    type: CalculatorType.ROI_CALCULATOR,
    category: 'Education & Business',
    icon: 'Percent',
    content: `<h2>The Golden Metric</h2><p>ROI = (Net Profit / Cost of Investment) x 100. Always run this calculation before spending capital on marketing or new projects.</p>`
  }
};