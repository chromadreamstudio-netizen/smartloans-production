export enum CalculatorType {
  // Loans & Debt
  LOAN_AMORTIZATION = 'loan-amortization',
  DEBT_TO_INCOME = 'debt-to-income',
  AUTO_LOAN = 'auto-loan',
  DEBT_PAYOFF = 'debt-payoff', // Snowball
  DEBT_AVALANCHE = 'debt-avalanche',
  LOAN_COMPARISON = 'loan-comparison',
  LOAN_AFFORDABILITY = 'loan-affordability',
  LEASE_VS_BUY = 'lease-vs-buy',
  BUSINESS_LOAN = 'business-loan',

  // Education
  STUDENT_LOAN = 'student-loan',

  // Financial Planning
  FINANCIAL_HEALTH = 'financial-health',
  CREDIT_SCORE = 'credit-score',
  CREDIT_UTILIZATION = 'credit-utilization',
  EMERGENCY_FUND = 'emergency-fund',
  SAVINGS_GOAL = 'savings-goal',
  INVESTMENT_RISK = 'investment-risk',
  DIVIDEND = 'dividend',
  INVESTMENT = 'investment',
  RETIREMENT = 'retirement',
  NET_WORTH = 'net-worth',
  BUDGET = 'budget',
  COAST_FIRE = 'coast-fire', // New

  // Real Estate
  RENT_VS_BUY = 'rent-vs-buy',
  MORTGAGE = 'mortgage',
  REFINANCE = 'refinance',
  EARLY_PAYOFF = 'early-mortgage-payoff',
  HELOC = 'heloc',
  REAL_ESTATE_ROI = 'real-estate-roi',
  
  // Legacy/Utility
  PERSONALITY_QUIZ = 'personality-quiz',
  
  // Shortcuts used in articles
  SIMPLE_INVESTMENT = 'simple-investment',
  SIMPLE_LOAN = 'simple-loan'
}

export interface CalculationResult {
  monthlyPayment?: number;
  totalInterest?: number;
  totalPayment?: number;
  payoffDate?: string;
  futureValue?: number;
  schedule?: { month: number; balance: number; interest: number; principal: number }[];
  breakdown?: { name: string; value: number }[];
  healthScore?: number;
  metrics?: { label: string; value: string | number; status?: 'good' | 'warning' | 'bad' | 'neutral' }[];
  verdict?: string;
  savings?: number;
  amortizationTable?: { year: number; interest: number; principal: number; balance: number }[];
  comparison?: {
    loanA: CalculationResult;
    loanB: CalculationResult;
    differenceInterest: number;
    differencePayment: number;
    betterLoan: 'A' | 'B';
  };
}

export interface ArticleData {
  title: string;
  subtitle?: string;
  metaTitle?: string;
  metaDescription?: string;
  date: string;
  updatedDate?: string;
  author: string;
  reviewer?: string;
  category: string;
  readTime: string;
  image: string;
  embeddedTool?: string | CalculatorType; // Allows both Enum and String
  
  // --- الحقل الجديد الضروري للمقالات النووية ---
  trendContext?: {
      type: 'insight' | 'alert' | 'update';
      text: string;
  };
  
  keyTakeaways: string[];
  content: string;
  citations?: { label: string; url: string }[];
}