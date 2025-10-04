import { FinancialData, TaxCalculation, TaxComparison, Recommendation } from '../types/tax';

const OLD_REGIME_SLABS = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250000, max: 500000, rate: 5 },
  { min: 500000, max: 1000000, rate: 20 },
  { min: 1000000, max: Infinity, rate: 30 }
];

const NEW_REGIME_SLABS = [
  { min: 0, max: 300000, rate: 0 },
  { min: 300000, max: 600000, rate: 5 },
  { min: 600000, max: 900000, rate: 10 },
  { min: 900000, max: 1200000, rate: 15 },
  { min: 1200000, max: 1500000, rate: 20 },
  { min: 1500000, max: Infinity, rate: 30 }
];

function calculateTaxFromSlabs(income: number, slabs: typeof OLD_REGIME_SLABS): number {
  let tax = 0;

  for (const slab of slabs) {
    if (income > slab.min) {
      const taxableInSlab = Math.min(income, slab.max) - slab.min;
      tax += (taxableInSlab * slab.rate) / 100;
    }
  }

  return tax;
}

function calculateHRAExemption(salary: number, hra: number, rentPaid: number, cityType: 'metro' | 'non-metro'): number {
  const cityPercent = cityType === 'metro' ? 50 : 40;
  const actualHRA = hra;
  const excessRent = rentPaid - (salary * 0.1);
  const salaryPercent = (salary * cityPercent) / 100;

  return Math.max(0, Math.min(actualHRA, excessRent, salaryPercent));
}

export function calculateOldRegimeTax(data: FinancialData): TaxCalculation {
  const hraExemption = calculateHRAExemption(data.income, data.hra, data.rentPaid, data.cityType);

  const deductions = Math.min(data.section80C, 150000) +
                    Math.min(data.section80D, 25000) +
                    Math.min(data.nps, 50000) +
                    Math.min(data.homeLoanInterest, 200000) +
                    data.otherDeductions +
                    hraExemption;

  const taxableIncome = Math.max(0, data.income - deductions);
  const taxPayable = calculateTaxFromSlabs(taxableIncome, OLD_REGIME_SLABS);
  const rebate = taxableIncome <= 500000 ? Math.min(taxPayable, 12500) : 0;
  const taxAfterRebate = taxPayable - rebate;
  const cess = taxAfterRebate * 0.04;
  const totalTax = taxAfterRebate + cess;

  return {
    regime: 'old',
    grossIncome: data.income,
    deductions,
    taxableIncome,
    taxPayable: taxAfterRebate,
    cess,
    totalTax,
    effectiveRate: data.income > 0 ? (totalTax / data.income) * 100 : 0
  };
}

export function calculateNewRegimeTax(data: FinancialData): TaxCalculation {
  const deductions = 50000;
  const taxableIncome = Math.max(0, data.income - deductions);
  const taxPayable = calculateTaxFromSlabs(taxableIncome, NEW_REGIME_SLABS);
  const rebate = taxableIncome <= 700000 ? Math.min(taxPayable, 25000) : 0;
  const taxAfterRebate = taxPayable - rebate;
  const cess = taxAfterRebate * 0.04;
  const totalTax = taxAfterRebate + cess;

  return {
    regime: 'new',
    grossIncome: data.income,
    deductions,
    taxableIncome,
    taxPayable: taxAfterRebate,
    cess,
    totalTax,
    effectiveRate: data.income > 0 ? (totalTax / data.income) * 100 : 0
  };
}

export function generateRecommendations(data: FinancialData, oldTax: TaxCalculation, newTax: TaxCalculation): Recommendation[] {
  const recommendations: Recommendation[] = [];

  if (data.section80C < 150000) {
    const remaining = 150000 - data.section80C;
    const savings = remaining * 0.3;
    recommendations.push({
      id: 'r1',
      title: 'Maximize Section 80C Investments',
      description: `Invest ₹${remaining.toLocaleString('en-IN')} more in ELSS, PPF, or Life Insurance to save up to ₹${savings.toLocaleString('en-IN')} in taxes.`,
      potentialSavings: savings,
      category: 'investment',
      priority: 'high'
    });
  }

  if (data.section80D < 25000) {
    const remaining = 25000 - data.section80D;
    const savings = remaining * 0.3;
    recommendations.push({
      id: 'r2',
      title: 'Health Insurance Premium Deduction',
      description: `Invest ₹${remaining.toLocaleString('en-IN')} more in health insurance to claim under Section 80D and save ₹${savings.toLocaleString('en-IN')}.`,
      potentialSavings: savings,
      category: 'insurance',
      priority: 'high'
    });
  }

  if (data.nps < 50000) {
    const remaining = 50000 - data.nps;
    const savings = remaining * 0.3;
    recommendations.push({
      id: 'r3',
      title: 'Additional NPS Contribution (80CCD(1B))',
      description: `Invest ₹${remaining.toLocaleString('en-IN')} in NPS for additional tax benefit under Section 80CCD(1B) and save ₹${savings.toLocaleString('en-IN')}.`,
      potentialSavings: savings,
      category: 'investment',
      priority: 'medium'
    });
  }

  if (data.rentPaid > 0 && data.hra === 0) {
    recommendations.push({
      id: 'r4',
      title: 'Claim HRA Exemption',
      description: 'You are paying rent but not claiming HRA. Update your salary structure to include HRA component for tax savings.',
      potentialSavings: Math.min(data.rentPaid * 0.3, 60000),
      category: 'deduction',
      priority: 'high'
    });
  }

  if (data.homeLoanInterest > 0 && data.homeLoanInterest < 200000 && oldTax.totalTax < newTax.totalTax) {
    recommendations.push({
      id: 'r5',
      title: 'Home Loan Interest Deduction',
      description: 'Continue claiming home loan interest under Section 24(b). You are saving significantly with the old regime.',
      potentialSavings: data.homeLoanInterest * 0.3,
      category: 'deduction',
      priority: 'medium'
    });
  }

  return recommendations.sort((a, b) => b.potentialSavings - a.potentialSavings);
}

export function compareTaxRegimes(data: FinancialData): TaxComparison {
  const oldRegime = calculateOldRegimeTax(data);
  const newRegime = calculateNewRegimeTax(data);
  const savings = Math.abs(oldRegime.totalTax - newRegime.totalTax);
  const recommendedRegime = oldRegime.totalTax <= newRegime.totalTax ? 'old' : 'new';
  const recommendations = generateRecommendations(data, oldRegime, newRegime);

  return {
    oldRegime,
    newRegime,
    savings,
    recommendedRegime,
    recommendations
  };
}
