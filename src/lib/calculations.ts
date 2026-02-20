/**
 * Quebec Tax Calculation Engine - 2025/2026
 * Comprehensive tax and deduction calculations for Quebec residents
 */

// Federal Tax Brackets 2025
const FEDERAL_TAX_BRACKETS = [
  { min: 0, max: 55867, rate: 0.15 },
  { min: 55867, max: 111733, rate: 0.205 },
  { min: 111733, max: 173205, rate: 0.26 },
  { min: 173205, max: 246752, rate: 0.29 },
  { min: 246752, max: Infinity, rate: 0.33 },
];

// Quebec Provincial Tax Brackets 2025
const QUEBEC_TAX_BRACKETS = [
  { min: 0, max: 51780, rate: 0.14 },
  { min: 51780, max: 103545, rate: 0.19 },
  { min: 103545, max: 126000, rate: 0.24 },
  { min: 126000, max: Infinity, rate: 0.2575 },
];

// Basic Personal Amounts (BPA) 2025
const FEDERAL_BASIC_PERSONAL_AMOUNT = 15705; // Federal BPA
const QUEBEC_BASIC_PERSONAL_AMOUNT = 18056; // Quebec BPA

// Quebec Pension Plan (QPP/RRQ) 2025
const QPP_RATE = 0.064;
const QPP_EXEMPTION = 3500;
const QPP_MAX_PENSIONABLE_EARNINGS = 68500;
const QPP_MAX_CONTRIBUTION = 4160.00;

// Quebec Parental Insurance Plan (QPIP/RQAP) 2025
const QPIP_EMPLOYEE_RATE = 0.00494;
const QPIP_MAX_INSURABLE_EARNINGS = 94000;
const QPIP_MAX_CONTRIBUTION = 464.36;

// Employment Insurance (EI/AE) 2025 - Quebec Rate
const EI_RATE = 0.0127; // Quebec has lower rate than other provinces
const EI_MAX_INSURABLE_EARNINGS = 63200;
const EI_MAX_CONTRIBUTION = 802.64;

export interface TaxCalculationResult {
  // Input
  grossAnnual: number;
  
  // Federal Tax
  federalTaxableIncome: number;
  federalTax: number;
  federalBPA: number;
  
  // Provincial Tax
  provincialTaxableIncome: number;
  provincialTax: number;
  provincialBPA: number;
  
  // Deductions
  qppContribution: number;
  qpipContribution: number;
  eiContribution: number;
  totalDeductions: number;
  
  // Net Income
  totalTax: number;
  netAnnual: number;
  netMonthly: number;
  netBiWeekly: number;
  
  // Rates
  effectiveTaxRate: number;
  marginalTaxRate: number;
  
  // Breakdown
  takeHomePercentage: number;
}

/**
 * Calculate marginal tax using progressive tax brackets
 */
function calculateMarginalTax(
  income: number,
  brackets: Array<{ min: number; max: number; rate: number }>,
  basicPersonalAmount: number
): { tax: number; marginalRate: number } {
  const taxableIncome = Math.max(0, income - basicPersonalAmount);
  let tax = 0;
  let marginalRate = 0;

  for (const bracket of brackets) {
    if (taxableIncome > bracket.min) {
      const taxableInBracket = Math.min(
        taxableIncome - bracket.min,
        bracket.max - bracket.min
      );
      tax += taxableInBracket * bracket.rate;
      marginalRate = bracket.rate; // Last applicable rate
    }
  }

  return { tax, marginalRate };
}

/**
 * Calculate QPP (Quebec Pension Plan / RRQ) contribution
 */
function calculateQPP(grossSalary: number): number {
  const pensionableEarnings = Math.min(
    Math.max(0, grossSalary - QPP_EXEMPTION),
    QPP_MAX_PENSIONABLE_EARNINGS - QPP_EXEMPTION
  );
  return Math.min(pensionableEarnings * QPP_RATE, QPP_MAX_CONTRIBUTION);
}

/**
 * Calculate QPIP (Quebec Parental Insurance Plan / RQAP) contribution
 */
function calculateQPIP(grossSalary: number): number {
  const insurableEarnings = Math.min(grossSalary, QPIP_MAX_INSURABLE_EARNINGS);
  return Math.min(insurableEarnings * QPIP_EMPLOYEE_RATE, QPIP_MAX_CONTRIBUTION);
}

/**
 * Calculate EI (Employment Insurance / AE) contribution
 */
function calculateEI(grossSalary: number): number {
  const insurableEarnings = Math.min(grossSalary, EI_MAX_INSURABLE_EARNINGS);
  return Math.min(insurableEarnings * EI_RATE, EI_MAX_CONTRIBUTION);
}

/**
 * Main Quebec Tax Calculation Function
 * @param grossAnnualSalary - Annual gross salary in CAD
 * @returns Complete tax calculation breakdown
 */
export function calculateQuebecTax(grossAnnualSalary: number): TaxCalculationResult {
  // Validate and sanitize input
  const grossAnnual = Math.max(0, Math.round(grossAnnualSalary * 100) / 100);

  // Calculate payroll deductions (these are pre-tax)
  const qppContribution = calculateQPP(grossAnnual);
  const qpipContribution = calculateQPIP(grossAnnual);
  const eiContribution = calculateEI(grossAnnual);

  // Calculate federal tax
  const federalResult = calculateMarginalTax(
    grossAnnual,
    FEDERAL_TAX_BRACKETS,
    FEDERAL_BASIC_PERSONAL_AMOUNT
  );
  const federalTax = federalResult.tax;
  const federalMarginalRate = federalResult.marginalRate;

  // Calculate Quebec provincial tax
  const provincialResult = calculateMarginalTax(
    grossAnnual,
    QUEBEC_TAX_BRACKETS,
    QUEBEC_BASIC_PERSONAL_AMOUNT
  );
  const provincialTax = provincialResult.tax;
  const provincialMarginalRate = provincialResult.marginalRate;

  // Calculate totals
  const totalTax = federalTax + provincialTax;
  const totalDeductions = qppContribution + qpipContribution + eiContribution;
  const netAnnual = grossAnnual - totalTax - totalDeductions;
  const netMonthly = netAnnual / 12;
  const netBiWeekly = netAnnual / 26;

  // Calculate rates
  const effectiveTaxRate = grossAnnual > 0 
    ? ((totalTax + totalDeductions) / grossAnnual) * 100 
    : 0;
  const marginalTaxRate = (federalMarginalRate + provincialMarginalRate) * 100;
  const takeHomePercentage = grossAnnual > 0 
    ? (netAnnual / grossAnnual) * 100 
    : 0;

  return {
    // Input
    grossAnnual: Math.round(grossAnnual * 100) / 100,
    
    // Federal Tax
    federalTaxableIncome: Math.max(0, grossAnnual - FEDERAL_BASIC_PERSONAL_AMOUNT),
    federalTax: Math.round(federalTax * 100) / 100,
    federalBPA: FEDERAL_BASIC_PERSONAL_AMOUNT,
    
    // Provincial Tax
    provincialTaxableIncome: Math.max(0, grossAnnual - QUEBEC_BASIC_PERSONAL_AMOUNT),
    provincialTax: Math.round(provincialTax * 100) / 100,
    provincialBPA: QUEBEC_BASIC_PERSONAL_AMOUNT,
    
    // Deductions
    qppContribution: Math.round(qppContribution * 100) / 100,
    qpipContribution: Math.round(qpipContribution * 100) / 100,
    eiContribution: Math.round(eiContribution * 100) / 100,
    totalDeductions: Math.round(totalDeductions * 100) / 100,
    
    // Net Income
    totalTax: Math.round(totalTax * 100) / 100,
    netAnnual: Math.round(netAnnual * 100) / 100,
    netMonthly: Math.round(netMonthly * 100) / 100,
    netBiWeekly: Math.round(netBiWeekly * 100) / 100,
    
    // Rates
    effectiveTaxRate: Math.round(effectiveTaxRate * 100) / 100,
    marginalTaxRate: Math.round(marginalTaxRate * 100) / 100,
    
    // Breakdown
    takeHomePercentage: Math.round(takeHomePercentage * 100) / 100,
  };
}

/**
 * Format currency for display (Canadian format)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format percentage for display
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Calculate annual amount from monthly
 */
export function monthlyToAnnual(monthly: number): number {
  return monthly * 12;
}

/**
 * Calculate monthly amount from annual
 */
export function annualToMonthly(annual: number): number {
  return annual / 12;
}
