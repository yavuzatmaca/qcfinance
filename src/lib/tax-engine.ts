/**
 * Quebec Tax Calculation Engine - 2025/2026
 * Calculates net income based on federal and provincial tax brackets
 */

// Federal Tax Brackets 2025
const FEDERAL_BRACKETS = [
  { min: 0, max: 55867, rate: 0.15 },
  { min: 55867, max: 111733, rate: 0.205 },
  { min: 111733, max: 173205, rate: 0.26 },
  { min: 173205, max: 246752, rate: 0.29 },
  { min: 246752, max: Infinity, rate: 0.33 },
];

// Quebec Provincial Tax Brackets 2025
const QUEBEC_BRACKETS = [
  { min: 0, max: 51780, rate: 0.14 },
  { min: 51780, max: 103545, rate: 0.19 },
  { min: 103545, max: 126000, rate: 0.24 },
  { min: 126000, max: Infinity, rate: 0.2575 },
];

// Payroll Deductions 2025
const QPP_RATE = 0.064; // Quebec Pension Plan
const QPP_EXEMPTION = 3500;
const QPP_MAX_PENSIONABLE = 68500;
const QPP_MAX_CONTRIBUTION = 4038.40;

const QPIP_RATE = 0.00494; // Quebec Parental Insurance Plan
const QPIP_MAX_INSURABLE = 94000;
const QPIP_MAX_CONTRIBUTION = 464.36;

const EI_RATE = 0.0132; // Employment Insurance (Quebec rate)
const EI_MAX_INSURABLE = 63200;
const EI_MAX_CONTRIBUTION = 834.24;

const FEDERAL_BASIC_EXEMPTION = 15000; // Approximate federal basic personal amount
const QUEBEC_BASIC_EXEMPTION = 18056; // Quebec basic personal amount

export interface TaxCalculationResult {
  gross: number;
  federalTax: number;
  provincialTax: number;
  qpp: number;
  qpip: number;
  ei: number;
  totalDeductions: number;
  netIncome: number;
  monthlyNet: number;
  effectiveTaxRate: number;
}

/**
 * Calculate tax using marginal tax brackets
 */
function calculateMarginalTax(
  income: number,
  brackets: Array<{ min: number; max: number; rate: number }>,
  basicExemption: number
): number {
  const taxableIncome = Math.max(0, income - basicExemption);
  let tax = 0;

  for (const bracket of brackets) {
    if (taxableIncome > bracket.min) {
      const taxableInBracket = Math.min(
        taxableIncome - bracket.min,
        bracket.max - bracket.min
      );
      tax += taxableInBracket * bracket.rate;
    }
  }

  return tax;
}

/**
 * Calculate QPP (Quebec Pension Plan) contribution
 */
function calculateQPP(grossSalary: number): number {
  const pensionableEarnings = Math.min(
    Math.max(0, grossSalary - QPP_EXEMPTION),
    QPP_MAX_PENSIONABLE - QPP_EXEMPTION
  );
  return Math.min(pensionableEarnings * QPP_RATE, QPP_MAX_CONTRIBUTION);
}

/**
 * Calculate QPIP (Quebec Parental Insurance Plan) contribution
 */
function calculateQPIP(grossSalary: number): number {
  const insurableEarnings = Math.min(grossSalary, QPIP_MAX_INSURABLE);
  return Math.min(insurableEarnings * QPIP_RATE, QPIP_MAX_CONTRIBUTION);
}

/**
 * Calculate EI (Employment Insurance) contribution
 */
function calculateEI(grossSalary: number): number {
  const insurableEarnings = Math.min(grossSalary, EI_MAX_INSURABLE);
  return Math.min(insurableEarnings * EI_RATE, EI_MAX_CONTRIBUTION);
}

/**
 * Main function to calculate net income from gross salary
 * @param grossSalary - Annual gross salary in CAD
 * @returns Detailed breakdown of taxes and deductions
 */
export function calculateNetIncome(grossSalary: number): TaxCalculationResult {
  // Validate input
  if (grossSalary < 0 || !isFinite(grossSalary)) {
    grossSalary = 0;
  }

  // Calculate payroll deductions
  const qpp = calculateQPP(grossSalary);
  const qpip = calculateQPIP(grossSalary);
  const ei = calculateEI(grossSalary);

  // Calculate federal tax
  const federalTax = calculateMarginalTax(
    grossSalary,
    FEDERAL_BRACKETS,
    FEDERAL_BASIC_EXEMPTION
  );

  // Calculate provincial tax
  const provincialTax = calculateMarginalTax(
    grossSalary,
    QUEBEC_BRACKETS,
    QUEBEC_BASIC_EXEMPTION
  );

  // Calculate totals
  const totalDeductions = federalTax + provincialTax + qpp + qpip + ei;
  const netIncome = grossSalary - totalDeductions;
  const monthlyNet = netIncome / 12;
  const effectiveTaxRate = grossSalary > 0 ? (totalDeductions / grossSalary) * 100 : 0;

  return {
    gross: Math.round(grossSalary * 100) / 100,
    federalTax: Math.round(federalTax * 100) / 100,
    provincialTax: Math.round(provincialTax * 100) / 100,
    qpp: Math.round(qpp * 100) / 100,
    qpip: Math.round(qpip * 100) / 100,
    ei: Math.round(ei * 100) / 100,
    totalDeductions: Math.round(totalDeductions * 100) / 100,
    netIncome: Math.round(netIncome * 100) / 100,
    monthlyNet: Math.round(monthlyNet * 100) / 100,
    effectiveTaxRate: Math.round(effectiveTaxRate * 100) / 100,
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format percentage for display
 */
export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}
