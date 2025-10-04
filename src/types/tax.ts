export interface FinancialData {
  income: number;
  hra: number;
  rentPaid: number;
  homeLoanInterest: number;
  section80C: number;
  section80D: number;
  nps: number;
  otherDeductions: number;
  cityType: 'metro' | 'non-metro';
}

export interface TaxCalculation {
  regime: 'old' | 'new';
  grossIncome: number;
  deductions: number;
  taxableIncome: number;
  taxPayable: number;
  cess: number;
  totalTax: number;
  effectiveRate: number;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  potentialSavings: number;
  category: 'investment' | 'insurance' | 'deduction';
  priority: 'high' | 'medium' | 'low';
}

export interface TaxComparison {
  oldRegime: TaxCalculation;
  newRegime: TaxCalculation;
  savings: number;
  recommendedRegime: 'old' | 'new';
  recommendations: Recommendation[];
}
