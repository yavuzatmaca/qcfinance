export interface WageConversionResult {
  inputAmount: number
  inputFrequency: 'hourly' | 'weekly' | 'annual'
  hoursPerWeek: number
  vacationWeeks: number
  hourlyRate: number
  weeklyPay: number
  biweeklyPay: number
  monthlyPay: number
  annualSalary: number
  workingWeeks: number
}

export function convertWage(
  amount: number,
  frequency: 'hourly' | 'weekly' | 'annual',
  hoursPerWeek: number,
  vacationWeeks: number
): WageConversionResult {
  const workingWeeks = 52 - vacationWeeks
  let hourlyRate: number
  
  // Convert input to hourly rate first
  switch (frequency) {
    case 'hourly':
      hourlyRate = amount
      break
    case 'weekly':
      hourlyRate = amount / hoursPerWeek
      break
    case 'annual':
      hourlyRate = amount / (hoursPerWeek * workingWeeks)
      break
    default:
      hourlyRate = amount
  }
  
  // Calculate all other frequencies from hourly rate
  const weeklyPay = hourlyRate * hoursPerWeek
  const biweeklyPay = weeklyPay * 2
  const monthlyPay = (weeklyPay * workingWeeks) / 12
  const annualSalary = weeklyPay * workingWeeks
  
  return {
    inputAmount: amount,
    inputFrequency: frequency,
    hoursPerWeek,
    vacationWeeks,
    hourlyRate,
    weeklyPay,
    biweeklyPay,
    monthlyPay,
    annualSalary,
    workingWeeks
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

export function formatCurrencyRounded(amount: number): string {
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}
