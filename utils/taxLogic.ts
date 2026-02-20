// Import centralized tax constants
import {
  FEDERAL_BPA,
  QUEBEC_BPA,
  FEDERAL_TAX_BRACKETS_2026,
  QUEBEC_TAX_BRACKETS_2026,
  QPP_RATE,
  QPP_MAX_EARNINGS,
  QPP_EXEMPTION,
  QPIP_RATE,
  QPIP_MAX_EARNINGS,
  EI_RATE,
  EI_MAX_EARNINGS,
  type TaxBracket,
} from './taxConstants';

// Re-export for backward compatibility
export {
  FEDERAL_BPA,
  QUEBEC_BPA,
  FEDERAL_TAX_BRACKETS_2026,
  QUEBEC_TAX_BRACKETS_2026,
  QPP_RATE,
  QPP_MAX_EARNINGS,
  QPP_EXEMPTION,
  QPIP_RATE,
  QPIP_MAX_EARNINGS,
  EI_RATE,
  EI_MAX_EARNINGS,
};

export interface TaxCalculationResult {
  grossIncome: number;
  federalTax: number;
  provincialTax: number;
  qpp: number;
  qpip: number;
  ei: number;
  totalDeductions: number;
  netIncome: number;
}

function calculateProgressiveTax(taxableIncome: number, brackets: readonly TaxBracket[]): number {
  // If taxable income is 0 or negative, no tax
  if (taxableIncome <= 0) return 0;

  let tax = 0;
  let remainingIncome = taxableIncome;

  for (let i = 0; i < brackets.length; i++) {
    const bracket = brackets[i];
    const bracketSize = bracket.max - bracket.min;
    
    if (remainingIncome <= 0) break;
    
    // Calculate how much income falls in this bracket
    const incomeInBracket = Math.min(remainingIncome, bracketSize);
    
    // Apply tax rate to income in this bracket
    tax += incomeInBracket * bracket.rate;
    
    // Reduce remaining income
    remainingIncome -= incomeInBracket;
  }

  return tax;
}

export function calculateTaxes(annualIncome: number): TaxCalculationResult {
  // Federal tax - subtract BPA first
  const federalTaxableIncome = Math.max(0, annualIncome - FEDERAL_BPA);
  const federalTax = calculateProgressiveTax(federalTaxableIncome, FEDERAL_TAX_BRACKETS_2026);

  // Provincial tax (Quebec) - subtract BPA first
  const quebecTaxableIncome = Math.max(0, annualIncome - QUEBEC_BPA);
  const provincialTax = calculateProgressiveTax(quebecTaxableIncome, QUEBEC_TAX_BRACKETS_2026);

  // QPP (RRQ) - Quebec Pension Plan
  // Only earnings above exemption and up to maximum are subject to QPP
  const qppEarnings = Math.max(0, Math.min(annualIncome, QPP_MAX_EARNINGS) - QPP_EXEMPTION);
  const qpp = qppEarnings * QPP_RATE;

  // QPIP (RQAP) - Quebec Parental Insurance Plan
  // Capped at maximum insurable earnings
  const qpipEarnings = Math.min(annualIncome, QPIP_MAX_EARNINGS);
  const qpip = qpipEarnings * QPIP_RATE;

  // EI (AE) - Employment Insurance
  // Capped at maximum insurable earnings
  const eiEarnings = Math.min(annualIncome, EI_MAX_EARNINGS);
  const ei = eiEarnings * EI_RATE;

  const totalDeductions = federalTax + provincialTax + qpp + qpip + ei;
  const netIncome = annualIncome - totalDeductions;

  return {
    grossIncome: annualIncome,
    federalTax,
    provincialTax,
    qpp,
    qpip,
    ei,
    totalDeductions,
    netIncome,
  };
}

export type PayFrequency = 'annual' | 'monthly' | 'biweekly' | 'weekly';

export function convertToAnnual(amount: number, frequency: PayFrequency): number {
  switch (frequency) {
    case 'annual':
      return amount;
    case 'monthly':
      return amount * 12;
    case 'biweekly':
      return amount * 26;
    case 'weekly':
      return amount * 52;
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
