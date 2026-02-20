/**
 * Rent vs Buy Calculator - Quebec 2026
 * Compares 5-year net worth between buying and renting
 */

export interface RentVsBuyInput {
  homePrice: number
  monthlyRent: number
  downPaymentPercent: number
  investmentReturnRate: number // Annual rate for investments (e.g., 5%)
}

export interface RentVsBuyResult {
  buyNetWorth: number
  rentNetWorth: number
  difference: number
  recommendation: 'buy' | 'rent'
  buyBreakdown: {
    homeAppreciation: number
    principalPaid: number
    mortgageInterest: number
    propertyTax: number
    welcomeTax: number
    maintenance: number
  }
  rentBreakdown: {
    totalRentPaid: number
    investmentGrowth: number
    downPaymentInvested: number
  }
}

// Constants for Quebec 2026
const YEARS = 5
const MONTHS = YEARS * 12
const HOME_APPRECIATION_RATE = 0.03 // 3% annual
const MORTGAGE_RATE = 0.055 // 5.5% annual
const PROPERTY_TAX_RATE = 0.012 // 1.2% of home value annually
const MAINTENANCE_RATE = 0.01 // 1% of home value annually
const RENT_INCREASE_RATE = 0.025 // 2.5% annual

// Welcome Tax (Taxe de bienvenue) - Montreal rates
function calculateWelcomeTax(price: number): number {
  let tax = 0
  if (price <= 57200) {
    tax = price * 0.005
  } else if (price <= 286400) {
    tax = 57200 * 0.005 + (price - 57200) * 0.01
  } else if (price <= 572800) {
    tax = 57200 * 0.005 + (286400 - 57200) * 0.01 + (price - 286400) * 0.015
  } else {
    tax = 57200 * 0.005 + (286400 - 57200) * 0.01 + (572800 - 286400) * 0.015 + (price - 572800) * 0.02
  }
  return tax
}

export function calculateRentVsBuy(input: RentVsBuyInput): RentVsBuyResult {
  const { homePrice, monthlyRent, downPaymentPercent, investmentReturnRate } = input
  
  const downPayment = homePrice * (downPaymentPercent / 100)
  const loanAmount = homePrice - downPayment
  const monthlyRate = MORTGAGE_RATE / 12
  
  // Calculate monthly mortgage payment (principal + interest)
  const monthlyMortgage = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, MONTHS)) / 
                          (Math.pow(1 + monthlyRate, MONTHS) - 1)
  
  // === BUYING SCENARIO ===
  
  // Home appreciation over 5 years
  const homeAppreciation = homePrice * Math.pow(1 + HOME_APPRECIATION_RATE, YEARS) - homePrice
  
  // Calculate principal paid and interest paid
  let remainingBalance = loanAmount
  let totalInterest = 0
  let principalPaid = 0
  
  for (let month = 0; month < MONTHS; month++) {
    const interestPayment = remainingBalance * monthlyRate
    const principalPayment = monthlyMortgage - interestPayment
    totalInterest += interestPayment
    principalPaid += principalPayment
    remainingBalance -= principalPayment
  }
  
  // Property tax over 5 years
  const propertyTax = homePrice * PROPERTY_TAX_RATE * YEARS
  
  // Welcome tax (one-time)
  const welcomeTax = calculateWelcomeTax(homePrice)
  
  // Maintenance over 5 years
  const maintenance = homePrice * MAINTENANCE_RATE * YEARS
  
  // Buy Net Worth = (Home Value + Appreciation) - Remaining Mortgage - Costs
  const finalHomeValue = homePrice + homeAppreciation
  const buyNetWorth = finalHomeValue - remainingBalance - propertyTax - welcomeTax - maintenance - downPayment
  
  // === RENTING SCENARIO ===
  
  // Total rent paid over 5 years (with annual increases)
  let totalRentPaid = 0
  let currentRent = monthlyRent
  for (let year = 0; year < YEARS; year++) {
    totalRentPaid += currentRent * 12
    currentRent *= (1 + RENT_INCREASE_RATE)
  }
  
  // Down payment invested and growing
  const monthlyInvestmentRate = investmentReturnRate / 100 / 12
  const downPaymentInvested = downPayment * Math.pow(1 + investmentReturnRate / 100, YEARS)
  
  // Monthly savings invested (difference between mortgage payment and rent)
  let investmentGrowth = 0
  currentRent = monthlyRent
  const monthlyPropertyTax = (homePrice * PROPERTY_TAX_RATE) / 12
  const monthlyMaintenance = (homePrice * MAINTENANCE_RATE) / 12
  const totalMonthlyBuyCost = monthlyMortgage + monthlyPropertyTax + monthlyMaintenance
  
  for (let month = 0; month < MONTHS; month++) {
    // Adjust rent annually
    if (month > 0 && month % 12 === 0) {
      currentRent *= (1 + RENT_INCREASE_RATE)
    }
    
    const monthlySavings = totalMonthlyBuyCost - currentRent
    if (monthlySavings > 0) {
      // If renting is cheaper, invest the difference
      const monthsRemaining = MONTHS - month
      investmentGrowth += monthlySavings * Math.pow(1 + monthlyInvestmentRate, monthsRemaining)
    }
  }
  
  // Rent Net Worth = Down Payment Invested + Investment Growth - Total Rent Paid
  const rentNetWorth = downPaymentInvested + investmentGrowth - totalRentPaid
  
  // === COMPARISON ===
  const difference = buyNetWorth - rentNetWorth
  const recommendation = difference > 0 ? 'buy' : 'rent'
  
  return {
    buyNetWorth: Math.round(buyNetWorth),
    rentNetWorth: Math.round(rentNetWorth),
    difference: Math.round(Math.abs(difference)),
    recommendation,
    buyBreakdown: {
      homeAppreciation: Math.round(homeAppreciation),
      principalPaid: Math.round(principalPaid),
      mortgageInterest: Math.round(totalInterest),
      propertyTax: Math.round(propertyTax),
      welcomeTax: Math.round(welcomeTax),
      maintenance: Math.round(maintenance),
    },
    rentBreakdown: {
      totalRentPaid: Math.round(totalRentPaid),
      investmentGrowth: Math.round(investmentGrowth),
      downPaymentInvested: Math.round(downPaymentInvested),
    }
  }
}
