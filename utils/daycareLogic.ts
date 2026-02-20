// Quebec Daycare Cost Calculator Logic
// Compares CPE (subsidized) vs Private daycare with tax credits

import { DAYCARE } from './taxConstants';

// Re-export for backward compatibility
export const CPE_DAILY_RATE = DAYCARE.CPE_DAILY_RATE;
export const DEFAULT_DAYS_PER_YEAR = DAYCARE.DEFAULT_DAYS_PER_YEAR;

export interface DaycareInputs {
  familyIncome: number;
  privateDailyRate: number;
  daysPerYear: number;
}

export interface DaycareResult {
  familyIncome: number;
  daysPerYear: number;
  
  // CPE (Subsidized)
  cpeDailyRate: number;
  cpeAnnualCost: number;
  
  // Private (Non-subsidized)
  privateDailyRate: number;
  privateAnnualCostBeforeCredit: number;
  taxCreditPercentage: number;
  taxCreditAmount: number;
  privateNetDailyCost: number;
  privateNetAnnualCost: number;
  
  // Comparison
  annualDifference: number;
  isPrivateCompetitive: boolean; // If within 20% of CPE cost
}

/**
 * Calculate Quebec tax credit percentage based on family income
 * Simplified grid for MVP
 */
export function calculateTaxCreditPercentage(familyIncome: number): number {
  if (familyIncome < DAYCARE.INCOME_THRESHOLDS.LOW) {
    return DAYCARE.TAX_CREDIT_RATES.LOW_INCOME;
  } else if (familyIncome <= DAYCARE.INCOME_THRESHOLDS.MEDIUM) {
    return DAYCARE.TAX_CREDIT_RATES.MEDIUM_INCOME;
  } else {
    return DAYCARE.TAX_CREDIT_RATES.HIGH_INCOME;
  }
}

export function calculateDaycareCosts(inputs: DaycareInputs): DaycareResult {
  const { familyIncome, privateDailyRate, daysPerYear } = inputs;
  
  // CPE (Subsidized) Calculation
  const cpeDailyRate = DAYCARE.CPE_DAILY_RATE;
  const cpeAnnualCost = cpeDailyRate * daysPerYear;
  
  // Private Daycare Calculation
  const privateAnnualCostBeforeCredit = privateDailyRate * daysPerYear;
  
  // Calculate tax credit
  const taxCreditPercentage = calculateTaxCreditPercentage(familyIncome);
  const taxCreditAmount = privateAnnualCostBeforeCredit * taxCreditPercentage;
  
  // Net cost after tax credit
  const privateNetAnnualCost = privateAnnualCostBeforeCredit - taxCreditAmount;
  const privateNetDailyCost = privateNetAnnualCost / daysPerYear;
  
  // Comparison
  const annualDifference = privateNetAnnualCost - cpeAnnualCost;
  const isPrivateCompetitive = (privateNetDailyCost / cpeDailyRate) <= 1.20; // Within 20%
  
  return {
    familyIncome,
    daysPerYear,
    cpeDailyRate,
    cpeAnnualCost,
    privateDailyRate,
    privateAnnualCostBeforeCredit,
    taxCreditPercentage,
    taxCreditAmount,
    privateNetDailyCost,
    privateNetAnnualCost,
    annualDifference,
    isPrivateCompetitive,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPercentage(rate: number): string {
  return `${(rate * 100).toFixed(0)}%`;
}
