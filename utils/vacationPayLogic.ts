import { VACATION_PAY } from './taxConstants';

export interface VacationPayResult {
  annualSalary: number
  yearsOfService: number
  percentage: number
  vacationPay: number
  alternativePercentage: number
  alternativeVacationPay: number
  difference: number
}

export function calculateVacationPay(
  annualSalary: number,
  yearsOfService: number
): VacationPayResult {
  // Quebec vacation pay rules: 4% for < 3 years, 6% for >= 3 years
  const percentage = yearsOfService >= VACATION_PAY.SERVICE_THRESHOLD 
    ? VACATION_PAY.RATE_3_YEARS_PLUS * 100 
    : VACATION_PAY.RATE_UNDER_3_YEARS * 100;
  const vacationPay = annualSalary * (percentage / 100)
  
  // Calculate alternative scenario
  const alternativePercentage = percentage === (VACATION_PAY.RATE_UNDER_3_YEARS * 100) 
    ? VACATION_PAY.RATE_3_YEARS_PLUS * 100 
    : VACATION_PAY.RATE_UNDER_3_YEARS * 100;
  const alternativeVacationPay = annualSalary * (alternativePercentage / 100)
  const difference = Math.abs(vacationPay - alternativeVacationPay)

  return {
    annualSalary,
    yearsOfService,
    percentage,
    vacationPay,
    alternativePercentage,
    alternativeVacationPay,
    difference
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
