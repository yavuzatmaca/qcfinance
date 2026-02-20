// Employment Insurance (Assurance-Emploi) Calculator
// Federal program with Quebec-specific considerations

import { MAX_INSURABLE_EARNINGS, EI } from './taxConstants';

export const EI_RATE = EI.BENEFIT_RATE; // 55% of insurable earnings
export { MAX_INSURABLE_EARNINGS }; // Re-export for backward compatibility
export const WEEKS_PER_YEAR = 52;
export const MAX_WEEKLY_BENEFIT = EI.MAX_WEEKLY_BENEFIT; // Approximate maximum
export const ESTIMATED_TAX_RATE = 0.10; // ~10% tax withholding

export type Region = 'montreal' | 'quebec-city' | 'other';

export interface EIInputs {
  annualGrossSalary: number;
  region: Region;
  hasDependents: boolean;
}

export interface EIResult {
  annualGrossSalary: number;
  region: Region;
  hasDependents: boolean;
  insurableEarnings: number;
  weeklyBenefitBeforeTax: number;
  estimatedTaxWithholding: number;
  weeklyBenefitAfterTax: number;
  monthlyBenefitBeforeTax: number;
  monthlyBenefitAfterTax: number;
  isAtMaximum: boolean;
}

export function calculateEI(inputs: EIInputs): EIResult {
  const { annualGrossSalary, region, hasDependents } = inputs;
  
  // Calculate insurable earnings (capped at maximum)
  const insurableEarnings = Math.min(annualGrossSalary, MAX_INSURABLE_EARNINGS);
  
  // Calculate weekly benefit (55% of average weekly insurable earnings)
  const averageWeeklyEarnings = insurableEarnings / WEEKS_PER_YEAR;
  let weeklyBenefitBeforeTax = averageWeeklyEarnings * EI_RATE;
  
  // Cap at maximum weekly benefit
  const isAtMaximum = weeklyBenefitBeforeTax >= MAX_WEEKLY_BENEFIT;
  weeklyBenefitBeforeTax = Math.min(weeklyBenefitBeforeTax, MAX_WEEKLY_BENEFIT);
  
  // Calculate estimated tax withholding (~10%)
  const estimatedTaxWithholding = weeklyBenefitBeforeTax * ESTIMATED_TAX_RATE;
  const weeklyBenefitAfterTax = weeklyBenefitBeforeTax - estimatedTaxWithholding;
  
  // Calculate monthly equivalents (4.33 weeks per month average)
  const monthlyBenefitBeforeTax = weeklyBenefitBeforeTax * 4.33;
  const monthlyBenefitAfterTax = weeklyBenefitAfterTax * 4.33;
  
  return {
    annualGrossSalary,
    region,
    hasDependents,
    insurableEarnings,
    weeklyBenefitBeforeTax,
    estimatedTaxWithholding,
    weeklyBenefitAfterTax,
    monthlyBenefitBeforeTax,
    monthlyBenefitAfterTax,
    isAtMaximum,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getRegionName(region: Region): string {
  switch (region) {
    case 'montreal':
      return 'Montréal';
    case 'quebec-city':
      return 'Québec';
    case 'other':
      return 'Autres régions';
  }
}
