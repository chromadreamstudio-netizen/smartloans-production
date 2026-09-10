export enum CalculatorType {
  // Real Estate
  MORTGAGE = 'mortgage',
  RENT_VS_BUY = 'rent-vs-buy',
  REFINANCE = 'refinance',
  REAL_ESTATE_ROI = 'real-estate-roi',
  
  // Wealth & Planning
  INVESTMENT = 'investment', // 👈 تأكد من وجود هذا
  BUDGET = 'budget',
  NET_WORTH = 'net-worth',
  EMERGENCY_FUND = 'emergency-fund',
  SAVINGS_GOAL = 'savings-goal',
  FIRE_CALC = 'fire-calc',
  INFLATION = 'inflation',

  // Loans & Debt
  AUTO_LOAN = 'auto-loan',
  DEBT_PAYOFF = 'debt-payoff',
  LOAN_AMORTIZATION = 'loan-amortization',
  DEBT_TO_INCOME = 'debt-to-income',
  LOAN_AFFORDABILITY = 'loan-affordability',
  CREDIT_CARD_PAYOFF = 'credit-card-payoff',
  
  // Business & Education
  BUSINESS_LOAN = 'business-loan',
  STUDENT_LOAN = 'student-loan'
}

export interface CalculatorData {
  id: string;
  title: string;
  desc: string;
  type: CalculatorType;
  category: string;
  icon: string;
}