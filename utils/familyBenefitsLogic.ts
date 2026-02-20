/**
 * Quebec Family Benefits Calculator 2026
 * Estimates Federal (CCB/ACE) + Quebec (Soutien aux enfants) benefits
 */

export interface FamilyBenefitsInput {
  familyIncome: number
  custody: 'shared' | 'full' // 50% or 100%
  childrenUnder6: number
  children6to17: number
}

export interface FamilyBenefitsResult {
  federalMonthly: number
  quebecMonthly: number
  totalMonthly: number
  totalYearly: number
  breakdown: {
    federalUnder6: number
    federal6to17: number
    quebecTotal: number
  }
}

// 2026 Federal CCB (ACE) Constants
const FEDERAL_MAX_UNDER_6 = 648 // per month
const FEDERAL_MAX_6_TO_17 = 547 // per month
const FEDERAL_INCOME_THRESHOLD = 36502
const FEDERAL_REDUCTION_RATE = 0.07 // 7% reduction

// 2026 Quebec Soutien aux enfants Constants
const QUEBEC_MAX_PER_CHILD = 240 // per month
const QUEBEC_INCOME_THRESHOLD = 57000
const QUEBEC_REDUCTION_RATE = 0.04 // 4% reduction

export function calculateFamilyBenefits(input: FamilyBenefitsInput): FamilyBenefitsResult {
  const { familyIncome, custody, childrenUnder6, children6to17 } = input
  
  // Custody multiplier (shared custody = 50%)
  const custodyMultiplier = custody === 'shared' ? 0.5 : 1.0
  
  // Calculate Federal CCB (ACE)
  let federalUnder6 = FEDERAL_MAX_UNDER_6 * childrenUnder6
  let federal6to17 = FEDERAL_MAX_6_TO_17 * children6to17
  
  // Apply income-based reduction for Federal
  if (familyIncome > FEDERAL_INCOME_THRESHOLD) {
    const excessIncome = familyIncome - FEDERAL_INCOME_THRESHOLD
    const monthlyReduction = (excessIncome * FEDERAL_REDUCTION_RATE) / 12
    
    federalUnder6 = Math.max(0, federalUnder6 - (monthlyReduction * (childrenUnder6 / (childrenUnder6 + children6to17 || 1))))
    federal6to17 = Math.max(0, federal6to17 - (monthlyReduction * (children6to17 / (childrenUnder6 + children6to17 || 1))))
  }
  
  const federalMonthly = (federalUnder6 + federal6to17) * custodyMultiplier
  
  // Calculate Quebec Soutien aux enfants
  const totalChildren = childrenUnder6 + children6to17
  let quebecTotal = QUEBEC_MAX_PER_CHILD * totalChildren
  
  // Apply income-based reduction for Quebec
  if (familyIncome > QUEBEC_INCOME_THRESHOLD) {
    const excessIncome = familyIncome - QUEBEC_INCOME_THRESHOLD
    const monthlyReduction = (excessIncome * QUEBEC_REDUCTION_RATE) / 12
    quebecTotal = Math.max(0, quebecTotal - monthlyReduction)
  }
  
  const quebecMonthly = quebecTotal * custodyMultiplier
  
  // Calculate totals
  const totalMonthly = federalMonthly + quebecMonthly
  const totalYearly = totalMonthly * 12
  
  return {
    federalMonthly: Math.round(federalMonthly * 100) / 100,
    quebecMonthly: Math.round(quebecMonthly * 100) / 100,
    totalMonthly: Math.round(totalMonthly * 100) / 100,
    totalYearly: Math.round(totalYearly * 100) / 100,
    breakdown: {
      federalUnder6: Math.round(federalUnder6 * custodyMultiplier * 100) / 100,
      federal6to17: Math.round(federal6to17 * custodyMultiplier * 100) / 100,
      quebecTotal: Math.round(quebecTotal * custodyMultiplier * 100) / 100,
    }
  }
}
