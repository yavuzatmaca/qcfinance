import { STUDENT_LOAN } from './taxConstants';

export interface StudentLoanResult {
  loanAmount: number
  interestRate: number
  termMonths: number
  monthlyPayment: number
  totalAmountPaid: number
  totalInterestPaid: number
  taxCreditOnInterest: number
  effectiveInterestCost: number
  taxCreditPercentage: number
}

// Re-export for backward compatibility
const TAX_CREDIT_RATE = STUDENT_LOAN.TAX_CREDIT_RATE;

export function calculateStudentLoan(
  loanAmount: number,
  interestRate: number,
  termMonths: number
): StudentLoanResult {
  const monthlyRate = interestRate / 100 / 12
  
  // Calculate monthly payment using amortization formula
  // M = P * [r(1+r)^n] / [(1+r)^n - 1]
  let monthlyPayment: number
  if (monthlyRate === 0) {
    monthlyPayment = loanAmount / termMonths
  } else {
    const factor = Math.pow(1 + monthlyRate, termMonths)
    monthlyPayment = loanAmount * (monthlyRate * factor) / (factor - 1)
  }
  
  const totalAmountPaid = monthlyPayment * termMonths
  const totalInterestPaid = totalAmountPaid - loanAmount
  
  // Quebec tax credit on student loan interest (approximately 20%)
  const taxCreditOnInterest = totalInterestPaid * TAX_CREDIT_RATE
  const effectiveInterestCost = totalInterestPaid - taxCreditOnInterest
  
  return {
    loanAmount,
    interestRate,
    termMonths,
    monthlyPayment,
    totalAmountPaid,
    totalInterestPaid,
    taxCreditOnInterest,
    effectiveInterestCost,
    taxCreditPercentage: TAX_CREDIT_RATE * 100
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

export function formatCurrencyDetailed(amount: number): string {
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

export function formatYearsMonths(months: number): string {
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12
  
  if (years === 0) {
    return `${remainingMonths} mois`
  } else if (remainingMonths === 0) {
    return `${years} ${years === 1 ? 'an' : 'ans'}`
  } else {
    return `${years} ${years === 1 ? 'an' : 'ans'} et ${remainingMonths} mois`
  }
}
