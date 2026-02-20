/**
 * Compound Interest Calculator - Quebec 2026
 * Calculates investment growth over time with monthly contributions
 */

export interface InvestmentInput {
  initialDeposit: number
  monthlyContribution: number
  years: number
  interestRate: number // Annual percentage (e.g., 7 for 7%)
}

export interface YearlyData {
  year: number
  invested: number
  interest: number
  total: number
}

export interface InvestmentResult {
  finalTotal: number
  totalInvested: number
  totalInterest: number
  yearlyData: YearlyData[]
  monthlyBreakdown: {
    avgMonthlyGrowth: number
    finalMonthlyValue: number
  }
}

export function calculateInvestment(input: InvestmentInput): InvestmentResult {
  const { initialDeposit, monthlyContribution, years, interestRate } = input
  
  const monthlyRate = interestRate / 100 / 12
  const yearlyData: YearlyData[] = []
  
  let balance = initialDeposit
  let totalInvested = initialDeposit
  
  // Calculate year by year
  for (let year = 1; year <= years; year++) {
    // Add monthly contributions for this year
    for (let month = 1; month <= 12; month++) {
      balance = balance * (1 + monthlyRate) + monthlyContribution
      totalInvested += monthlyContribution
    }
    
    const totalInterest = balance - totalInvested
    
    yearlyData.push({
      year,
      invested: Math.round(totalInvested),
      interest: Math.round(totalInterest),
      total: Math.round(balance),
    })
  }
  
  const finalTotal = Math.round(balance)
  const totalInterest = finalTotal - totalInvested
  const avgMonthlyGrowth = Math.round(totalInterest / (years * 12))
  
  return {
    finalTotal,
    totalInvested: Math.round(totalInvested),
    totalInterest: Math.round(totalInterest),
    yearlyData,
    monthlyBreakdown: {
      avgMonthlyGrowth,
      finalMonthlyValue: Math.round(balance / (years * 12)),
    }
  }
}

/**
 * Calculate the "Rule of 72" - How long to double your money
 */
export function calculateDoublingTime(interestRate: number): number {
  return Math.round((72 / interestRate) * 10) / 10
}

/**
 * Calculate future value of a lump sum (no monthly contributions)
 */
export function calculateLumpSum(principal: number, rate: number, years: number): number {
  return Math.round(principal * Math.pow(1 + rate / 100, years))
}
