// Quebec Auto Loan Calculator Logic
// Standard amortization with sales tax option

import { QUEBEC_SALES_TAX_RATE } from './taxConstants';

// Re-export for backward compatibility
export { QUEBEC_SALES_TAX_RATE };

export type LoanTermMonths = 36 | 48 | 60 | 72 | 84;

export interface AutoLoanInputs {
  vehiclePrice: number;
  downPayment: number;
  includeTaxes: boolean;
  loanTermMonths: LoanTermMonths;
  interestRate: number; // Annual rate as percentage (e.g., 6.99)
}

export interface AutoLoanResult {
  vehiclePrice: number;
  salesTax: number;
  totalVehicleCost: number;
  downPayment: number;
  loanAmount: number;
  interestRate: number;
  loanTermMonths: number;
  monthlyPayment: number;
  biweeklyPayment: number;
  totalPayments: number;
  totalInterest: number;
}

/**
 * Calculate auto loan payment using standard amortization formula
 */
export function calculateLoanPayment(
  principal: number,
  annualRate: number,
  months: number
): number {
  // Convert annual rate to decimal
  const annualRateDecimal = annualRate / 100;
  
  // Monthly rate
  const monthlyRate = annualRateDecimal / 12;
  
  // Handle edge case: 0% interest
  if (monthlyRate === 0) {
    return principal / months;
  }
  
  // Loan payment formula
  const payment = principal * 
    (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
    (Math.pow(1 + monthlyRate, months) - 1);
  
  return payment;
}

export function calculateAutoLoan(inputs: AutoLoanInputs): AutoLoanResult {
  const { vehiclePrice, downPayment, includeTaxes, loanTermMonths, interestRate } = inputs;
  
  // CRITICAL: In Quebec, taxes are calculated on NET price (after trade-in)
  // Taxable Amount = Vehicle Price - Trade-in Value
  const taxableAmount = vehiclePrice - downPayment;
  
  // Calculate sales tax on the NET amount (not full vehicle price)
  const salesTax = includeTaxes ? taxableAmount * QUEBEC_SALES_TAX_RATE : 0;
  
  // Total vehicle cost = Vehicle Price + Tax on Net Amount
  const totalVehicleCost = vehiclePrice + salesTax;
  
  // Calculate loan amount (Vehicle Price - Down Payment + Tax)
  // Or simplified: taxableAmount + salesTax
  const loanAmount = taxableAmount + salesTax;
  
  // Calculate monthly payment
  const monthlyPayment = calculateLoanPayment(loanAmount, interestRate, loanTermMonths);
  
  // Calculate bi-weekly payment (monthly * 12 / 26)
  const biweeklyPayment = (monthlyPayment * 12) / 26;
  
  // Calculate total payments and interest
  const totalPayments = monthlyPayment * loanTermMonths;
  const totalInterest = totalPayments - loanAmount;
  
  return {
    vehiclePrice,
    salesTax,
    totalVehicleCost,
    downPayment,
    loanAmount,
    interestRate,
    loanTermMonths,
    monthlyPayment,
    biweeklyPayment,
    totalPayments,
    totalInterest,
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
  return `${rate.toFixed(2)}%`;
}
