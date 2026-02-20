import {
  FEDERAL_BPA,
  QUEBEC_BPA,
  FEDERAL_TAX_BRACKETS_2026,
  QUEBEC_TAX_BRACKETS_2026,
  type TaxBracket,
} from './taxConstants';

export interface TaxFormInputs {
  employmentIncome: number; // Box 14 (T4)
  federalTaxPaid: number; // Box 22 (T4)
  quebecTaxPaid: number; // Box E (RL-1)
  rrspContributions: number;
  unionDues: number;
}

export interface TaxFormResult {
  // Income
  totalIncome: number;
  
  // Deductions
  totalDeductions: number;
  rrspDeduction: number;
  unionDuesDeduction: number;
  
  // Taxable Income
  federalTaxableIncome: number;
  quebecTaxableIncome: number;
  
  // Tax Liability
  federalTaxOwed: number;
  quebecTaxOwed: number;
  totalTaxOwed: number;
  
  // Tax Paid
  federalTaxPaid: number;
  quebecTaxPaid: number;
  totalTaxPaid: number;
  
  // Final Result
  refundOrOwing: number;
  isRefund: boolean;
}

function calculateProgressiveTax(taxableIncome: number, brackets: readonly TaxBracket[]): number {
  if (taxableIncome <= 0) return 0;

  let tax = 0;
  let remainingIncome = taxableIncome;

  for (const bracket of brackets) {
    if (remainingIncome <= 0) break;
    
    const bracketSize = bracket.max - bracket.min;
    const incomeInBracket = Math.min(remainingIncome, bracketSize);
    
    tax += incomeInBracket * bracket.rate;
    remainingIncome -= incomeInBracket;
  }

  return tax;
}

export function calculateTaxForm(inputs: TaxFormInputs): TaxFormResult {
  // Total Income
  const totalIncome = inputs.employmentIncome;
  
  // Deductions
  const rrspDeduction = inputs.rrspContributions;
  const unionDuesDeduction = inputs.unionDues;
  const totalDeductions = rrspDeduction + unionDuesDeduction;
  
  // Federal Taxable Income (after deductions and BPA)
  const federalNetIncome = Math.max(0, totalIncome - totalDeductions);
  const federalTaxableIncome = Math.max(0, federalNetIncome - FEDERAL_BPA);
  
  // Quebec Taxable Income (after deductions and BPA)
  const quebecNetIncome = Math.max(0, totalIncome - totalDeductions);
  const quebecTaxableIncome = Math.max(0, quebecNetIncome - QUEBEC_BPA);
  
  // Calculate Tax Owed
  const federalTaxOwed = calculateProgressiveTax(federalTaxableIncome, FEDERAL_TAX_BRACKETS_2026);
  const quebecTaxOwed = calculateProgressiveTax(quebecTaxableIncome, QUEBEC_TAX_BRACKETS_2026);
  const totalTaxOwed = federalTaxOwed + quebecTaxOwed;
  
  // Tax Already Paid
  const federalTaxPaid = inputs.federalTaxPaid;
  const quebecTaxPaid = inputs.quebecTaxPaid;
  const totalTaxPaid = federalTaxPaid + quebecTaxPaid;
  
  // Final Result (positive = refund, negative = owing)
  const refundOrOwing = totalTaxPaid - totalTaxOwed;
  const isRefund = refundOrOwing > 0;
  
  return {
    totalIncome,
    totalDeductions,
    rrspDeduction,
    unionDuesDeduction,
    federalTaxableIncome,
    quebecTaxableIncome,
    federalTaxOwed,
    quebecTaxOwed,
    totalTaxOwed,
    federalTaxPaid,
    quebecTaxPaid,
    totalTaxPaid,
    refundOrOwing: Math.abs(refundOrOwing),
    isRefund,
  };
}
