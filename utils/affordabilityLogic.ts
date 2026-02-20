export interface AffordabilityResult {
  annualIncome: number
  monthlyDebts: number
  downPayment: number
  interestRate: number
  monthlyIncome: number
  maxMonthlyPayment: number
  maxLoanAmount: number
  maxHomePrice: number
  gdsRatio: number
  tdsRatio: number
  isAffordable: boolean
}

const GDS_RATIO = 0.39 // 39% - Gross Debt Service (housing costs)
const TDS_RATIO = 0.44 // 44% - Total Debt Service (housing + other debts)
const PROPERTY_TAX_ESTIMATE = 0.01 / 12 // 1% annually, divided by 12 months
const HEATING_ESTIMATE = 100 // Monthly heating estimate

export function calculateAffordability(
  annualIncome: number,
  monthlyDebts: number,
  downPayment: number,
  interestRate: number
): AffordabilityResult {
  const monthlyIncome = annualIncome / 12
  
  // Calculate maximum monthly housing payment using GDS ratio (39%)
  const maxHousingPayment = monthlyIncome * GDS_RATIO
  
  // Calculate maximum total payment using TDS ratio (44%)
  const maxTotalPayment = monthlyIncome * TDS_RATIO
  
  // Maximum mortgage payment = min of GDS and (TDS - existing debts)
  const maxPaymentFromTDS = maxTotalPayment - monthlyDebts
  const maxMonthlyPayment = Math.min(maxHousingPayment, maxPaymentFromTDS)
  
  // Subtract property tax and heating from available payment
  const availableForMortgage = maxMonthlyPayment - HEATING_ESTIMATE
  
  // Calculate maximum loan amount using mortgage formula
  // M = P * [r(1+r)^n] / [(1+r)^n - 1]
  // Solving for P: P = M * [(1+r)^n - 1] / [r(1+r)^n]
  const monthlyRate = interestRate / 100 / 12
  const numberOfPayments = 25 * 12 // 25 years amortization
  
  let maxLoanAmount = 0
  if (monthlyRate > 0) {
    const factor = Math.pow(1 + monthlyRate, numberOfPayments)
    maxLoanAmount = availableForMortgage * (factor - 1) / (monthlyRate * factor)
  } else {
    maxLoanAmount = availableForMortgage * numberOfPayments
  }
  
  // Maximum home price = loan amount + down payment
  const maxHomePrice = maxLoanAmount + downPayment
  
  // Calculate actual ratios
  const monthlyMortgagePayment = calculateMonthlyPayment(maxLoanAmount, interestRate, 25)
  const estimatedPropertyTax = maxHomePrice * PROPERTY_TAX_ESTIMATE
  const totalHousingCosts = monthlyMortgagePayment + estimatedPropertyTax + HEATING_ESTIMATE
  
  const gdsRatio = (totalHousingCosts / monthlyIncome) * 100
  const tdsRatio = ((totalHousingCosts + monthlyDebts) / monthlyIncome) * 100
  
  const isAffordable = gdsRatio <= 39 && tdsRatio <= 44
  
  return {
    annualIncome,
    monthlyDebts,
    downPayment,
    interestRate,
    monthlyIncome,
    maxMonthlyPayment,
    maxLoanAmount: Math.max(0, maxLoanAmount),
    maxHomePrice: Math.max(0, maxHomePrice),
    gdsRatio,
    tdsRatio,
    isAffordable
  }
}

function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  years: number
): number {
  const monthlyRate = annualRate / 100 / 12
  const numberOfPayments = years * 12
  
  if (monthlyRate === 0) {
    return principal / numberOfPayments
  }
  
  const factor = Math.pow(1 + monthlyRate, numberOfPayments)
  return principal * (monthlyRate * factor) / (factor - 1)
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`
}
