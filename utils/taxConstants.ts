/**
 * Centralized Tax Constants for Quebec - 2026
 * 
 * This file contains all tax brackets, rates, and limits for the 2026 tax year.
 * Update this file annually to reflect new tax year values.
 */

// ============================================================================
// TAX YEAR
// ============================================================================
export const TAX_YEAR = 2026;

// ============================================================================
// BASIC PERSONAL AMOUNTS (BPA)
// ============================================================================
export const BASIC_PERSONAL_AMOUNT = {
  FEDERAL: 15705,
  QUEBEC: 18952,
} as const;

// Legacy exports for backward compatibility
export const FEDERAL_BPA = BASIC_PERSONAL_AMOUNT.FEDERAL;
export const QUEBEC_BPA = BASIC_PERSONAL_AMOUNT.QUEBEC;

// ============================================================================
// FEDERAL TAX BRACKETS
// ============================================================================
export interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

export const FEDERAL_TAX_BRACKETS: readonly TaxBracket[] = [
  { min: 0, max: 55867, rate: 0.15 },
  { min: 55867, max: 111733, rate: 0.205 },
  { min: 111733, max: 173205, rate: 0.26 },
  { min: 173205, max: 246752, rate: 0.29 },
  { min: 246752, max: Infinity, rate: 0.33 },
] as const;

// Legacy export for backward compatibility
export const FEDERAL_TAX_BRACKETS_2026 = FEDERAL_TAX_BRACKETS;

// ============================================================================
// QUEBEC PROVINCIAL TAX BRACKETS
// ============================================================================
export const QUEBEC_TAX_BRACKETS: readonly TaxBracket[] = [
  { min: 0, max: 51780, rate: 0.14 },
  { min: 51780, max: 103545, rate: 0.19 },
  { min: 103545, max: 126000, rate: 0.24 },
  { min: 126000, max: Infinity, rate: 0.2575 },
] as const;

// Legacy export for backward compatibility
export const QUEBEC_TAX_BRACKETS_2026 = QUEBEC_TAX_BRACKETS;

// ============================================================================
// QUEBEC PENSION PLAN (QPP / RRQ)
// ============================================================================
export const QPP = {
  RATE: 0.064,
  MAX_EARNINGS: 68500,
  EXEMPTION: 3500,
} as const;

// Legacy exports for backward compatibility
export const QPP_RATE = QPP.RATE;
export const QPP_MAX_EARNINGS = QPP.MAX_EARNINGS;
export const QPP_EXEMPTION = QPP.EXEMPTION;

// ============================================================================
// QUEBEC PARENTAL INSURANCE PLAN (QPIP / RQAP)
// ============================================================================
export const QPIP = {
  RATE: 0.00494,
  MAX_EARNINGS: 94000,
} as const;

// Legacy exports for backward compatibility
export const QPIP_RATE = QPIP.RATE;
export const QPIP_MAX_EARNINGS = QPIP.MAX_EARNINGS;

// ============================================================================
// EMPLOYMENT INSURANCE (EI / AE)
// ============================================================================
export const EI = {
  RATE: 0.0127,
  MAX_EARNINGS: 63200,
  BENEFIT_RATE: 0.55, // 55% of insurable earnings
  MAX_WEEKLY_BENEFIT: 668, // Approximate maximum
} as const;

// Legacy exports for backward compatibility
export const EI_RATE = EI.RATE;
export const EI_MAX_EARNINGS = EI.MAX_EARNINGS;
export const MAX_INSURABLE_EARNINGS = EI.MAX_EARNINGS;

// ============================================================================
// SALES TAX RATES (TPS + TVQ)
// ============================================================================
export const SALES_TAX = {
  TPS: 0.05, // Federal GST
  TVQ: 0.09975, // Quebec PST
  COMBINED: 0.14975, // TPS (5%) + TVQ (9.975%)
} as const;

// Legacy exports for backward compatibility
export const QUEBEC_SALES_TAX_RATE = SALES_TAX.COMBINED;
export const QUEBEC_TAX_RATE = SALES_TAX.COMBINED;

// ============================================================================
// RRSP CONTRIBUTION LIMITS
// ============================================================================
export const RRSP = {
  CONTRIBUTION_RATE: 0.18, // 18% of earned income
  MAX_CONTRIBUTION: 31560, // 2026 limit
} as const;

// ============================================================================
// TFSA CONTRIBUTION LIMITS
// ============================================================================
export const TFSA = {
  ANNUAL_LIMIT: 7000, // 2026 limit
} as const;

// ============================================================================
// DAYCARE (CPE) CONSTANTS
// ============================================================================
export const DAYCARE = {
  CPE_DAILY_RATE: 9.10, // 2026 subsidized rate
  DEFAULT_DAYS_PER_YEAR: 260, // Typical work days
  TAX_CREDIT_RATES: {
    LOW_INCOME: 0.78, // Under $36,500
    MEDIUM_INCOME: 0.70, // $36,500 - $100,000
    HIGH_INCOME: 0.67, // Over $100,000
  },
  INCOME_THRESHOLDS: {
    LOW: 36500,
    MEDIUM: 100000,
  },
} as const;

// ============================================================================
// STUDENT LOAN CONSTANTS
// ============================================================================
export const STUDENT_LOAN = {
  TAX_CREDIT_RATE: 0.20, // 20% tax credit on interest paid in Quebec
} as const;

// ============================================================================
// RENT INCREASE CONSTANTS (TAL)
// ============================================================================
export const RENT_INCREASE = {
  BASE_INDEX_RATE: 0.04, // 4% base increase for unheated units
  HEATING_ADJUSTMENT_RATES: {
    NONE: 0,
    ELECTRICITY: 0.015, // 1.5% additional
    GAS: 0.012, // 1.2% additional
    OIL: 0.018, // 1.8% additional
  },
  RENOVATION_AMORTIZATION_RATE: 0.048, // 4.8% of renovation cost per year
  MONTHS_PER_YEAR: 12,
} as const;

// ============================================================================
// TRANSFER TAX BRACKETS (Taxe de Bienvenue)
// ============================================================================
export interface TransferTaxBracket {
  min: number;
  max: number;
  rate: number;
}

export const TRANSFER_TAX = {
  QUEBEC_BRACKETS: [
    { min: 0, max: 58900, rate: 0.005 },
    { min: 58900, max: 294600, rate: 0.01 },
    { min: 294600, max: Infinity, rate: 0.015 },
  ] as readonly TransferTaxBracket[],
  MONTREAL_BRACKETS: [
    { min: 0, max: 58900, rate: 0.005 },
    { min: 58900, max: 294600, rate: 0.01 },
    { min: 294600, max: 589200, rate: 0.015 },
    { min: 589200, max: 1178500, rate: 0.02 },
    { min: 1178500, max: 2357000, rate: 0.025 },
    { min: 2357000, max: Infinity, rate: 0.035 },
  ] as readonly TransferTaxBracket[],
} as const;

// ============================================================================
// VACATION PAY CONSTANTS
// ============================================================================
export const VACATION_PAY = {
  RATE_UNDER_3_YEARS: 0.04, // 4% for < 3 years of service
  RATE_3_YEARS_PLUS: 0.06, // 6% for >= 3 years of service
  SERVICE_THRESHOLD: 3, // Years of service threshold
} as const;

// ============================================================================
// UTILITY TYPES
// ============================================================================
export type TaxYear = typeof TAX_YEAR;
export type BasicPersonalAmount = typeof BASIC_PERSONAL_AMOUNT;
export type FederalTaxBrackets = typeof FEDERAL_TAX_BRACKETS;
export type QuebecTaxBrackets = typeof QUEBEC_TAX_BRACKETS;
