/**
 * Children Costs & Benefits - Quebec 2025/2026
 * Based on Statistics Canada 2023 data + Quebec-specific adjustments
 * Source: StatCan - Cost of raising a child in Canada (2023)
 * Average: $17,235/year per child = $1,436/month
 */

export interface ChildCostBreakdown {
  baseMonthly: number;        // Base cost per child
  daycareMonthly: number;     // Daycare/CPE cost
  totalMonthly: number;       // Total monthly cost
  federalBenefits: number;    // Canada Child Benefit (annual)
  provincialBenefits: number; // Quebec Family Allowance (annual)
  totalBenefits: number;      // Total annual benefits
  netMonthlyCost: number;     // Net cost after benefits
}

/**
 * Age-based cost structure
 * Based on Statistics Canada breakdown:
 * - Housing: 25-33% of total
 * - Transportation: 18-20%
 * - Food: 18-20% (NOW CALCULATED SEPARATELY IN GROCERIES)
 * - Clothing: <10%
 * - Healthcare: <10%
 * - Other: remainder
 */
export const CHILD_COSTS_BY_AGE = {
  '0-5': {
    baseMonthly: 550,        // Clothing (150), healthcare (100), activities (100), supplies (200) - FOOD EXCLUDED
    cpeMonthly: 200,         // CPE subsidized daycare (~9.10$/day × 22 days)
    privateDaycareMonthly: 1100, // Private daycare (~50$/day × 22 days)
    description: '0-5 ans (Préscolaire)',
  },
  '6-12': {
    baseMonthly: 550,        // Clothing (200), school supplies (100), activities (150), healthcare (100) - FOOD EXCLUDED
    afterSchoolMonthly: 200, // After-school care (service de garde)
    description: '6-12 ans (Primaire)',
  },
  '13-17': {
    baseMonthly: 650,        // Clothing (250), technology (150), activities (150), healthcare (100) - FOOD EXCLUDED
    description: '13-17 ans (Secondaire)',
  },
} as const;

/**
 * Scale economy discount (siblings share resources)
 * Based on StatCan data showing lower per-child costs in larger families
 */
export const SCALE_ECONOMY_DISCOUNT = {
  1: 1.0,    // 100% cost
  2: 0.85,   // 85% cost per child (15% discount - shared rooms, clothes, toys)
  3: 0.75,   // 75% cost per child (25% discount)
  4: 0.70,   // 70% cost per child (30% discount)
} as const;

/**
 * Canada Child Benefit (CCB) - Federal
 * Maximum amounts for 2025/2026 (income-tested)
 * Phase-out starts at ~$37,487 family net income
 * Source: CRA 2025/2026 benefit year
 */
export const CCB_MAX_ANNUAL = {
  '0-5': 7997,   // Under 6 years ($666.41/month)
  '6-17': 6748,  // 6-17 years ($562.33/month)
} as const;

/**
 * Quebec Family Allowance (Allocation Famille)
 * Maximum amounts for 2025/2026 (income-tested)
 * Source: Retraite Quebec 2025
 * For family income ≤ $59,000 (two-parent) or ≤ $43,000 (single-parent)
 */
export const QUEBEC_FAMILY_ALLOWANCE_MAX = {
  1: 2980,  // 1 child (~$248/month)
  2: 6600,  // 2 children (~$550/month)
  3: 10070, // 3 children (~$839/month)
  4: 13079, // 4 children (~$1,090/month)
} as const;

/**
 * Calculate CCB based on family income
 * Simplified calculation based on CRA 2025/2026 rates
 * Phase-out: Starts at $37,487, reduces by ~7% per $1000 over threshold
 */
export function calculateCCB(
  childrenAges: string[],
  familyNetIncome: number
): number {
  const baseIncome = 37487; // 2025/2026 threshold
  const phaseOutRate = 0.07; // 7% reduction per $1000 over base
  
  let totalCCB = 0;
  
  childrenAges.forEach(age => {
    const maxBenefit = age === '0-5' ? CCB_MAX_ANNUAL['0-5'] : CCB_MAX_ANNUAL['6-17'];
    
    if (familyNetIncome <= baseIncome) {
      totalCCB += maxBenefit;
    } else {
      const excessIncome = familyNetIncome - baseIncome;
      const reduction = (excessIncome / 1000) * (maxBenefit * phaseOutRate);
      totalCCB += Math.max(0, maxBenefit - reduction);
    }
  });
  
  return totalCCB;
}

/**
 * Calculate Quebec Family Allowance based on income
 * Based on Retraite Quebec 2025 tables
 * Phase-out: More gradual than federal, starts around $59,000 for two-parent
 */
export function calculateQuebecFamilyAllowance(
  childrenCount: number,
  familyNetIncome: number
): number {
  const baseIncome = 59000; // Two-parent threshold
  const phaseOutRate = 0.04; // 4% reduction
  
  const maxBenefit = QUEBEC_FAMILY_ALLOWANCE_MAX[
    Math.min(childrenCount, 4) as keyof typeof QUEBEC_FAMILY_ALLOWANCE_MAX
  ] || 0;
  
  if (familyNetIncome <= baseIncome) {
    return maxBenefit;
  } else {
    const excessIncome = familyNetIncome - baseIncome;
    const reduction = (excessIncome / 1000) * (maxBenefit * phaseOutRate);
    return Math.max(0, maxBenefit - reduction);
  }
}

/**
 * Calculate total children costs with benefits
 */
export function calculateChildrenCosts(
  childrenCount: number,
  childrenAges: string[],
  hasCPE: boolean,
  familyNetIncome: number
): ChildCostBreakdown {
  if (childrenCount === 0) {
    return {
      baseMonthly: 0,
      daycareMonthly: 0,
      totalMonthly: 0,
      federalBenefits: 0,
      provincialBenefits: 0,
      totalBenefits: 0,
      netMonthlyCost: 0,
    };
  }
  
  // Calculate base costs
  let totalBaseCost = 0;
  let totalDaycareCost = 0;
  
  childrenAges.forEach(age => {
    const ageGroup = age as keyof typeof CHILD_COSTS_BY_AGE;
    const costs = CHILD_COSTS_BY_AGE[ageGroup];
    
    totalBaseCost += costs.baseMonthly;
    
    if (age === '0-5') {
      const costs05 = CHILD_COSTS_BY_AGE['0-5'];
      totalDaycareCost += hasCPE ? costs05.cpeMonthly : costs05.privateDaycareMonthly;
    } else if (age === '6-12') {
      const costs612 = CHILD_COSTS_BY_AGE['6-12'];
      totalDaycareCost += costs612.afterSchoolMonthly;
    }
  });
  
  // Apply scale economy discount
  const discount = SCALE_ECONOMY_DISCOUNT[
    Math.min(childrenCount, 4) as keyof typeof SCALE_ECONOMY_DISCOUNT
  ] || 0.70;
  
  const adjustedBaseCost = totalBaseCost * discount;
  const totalMonthly = adjustedBaseCost + totalDaycareCost;
  
  // Calculate benefits
  const federalBenefits = calculateCCB(childrenAges, familyNetIncome);
  const provincialBenefits = calculateQuebecFamilyAllowance(childrenCount, familyNetIncome);
  const totalBenefits = federalBenefits + provincialBenefits;
  
  // Net monthly cost
  const netMonthlyCost = totalMonthly - (totalBenefits / 12);
  
  return {
    baseMonthly: adjustedBaseCost,
    daycareMonthly: totalDaycareCost,
    totalMonthly,
    federalBenefits,
    provincialBenefits,
    totalBenefits,
    netMonthlyCost,
  };
}

/**
 * Calculate additional housing cost for children
 * Based on StatCan data: Housing is 25-33% of total child-rearing costs
 * More children = need bigger apartment
 */
export function calculateAdditionalHousingCost(
  childrenCount: number,
  baseRent: number
): number {
  if (childrenCount === 0) return 0;
  if (childrenCount === 1) return baseRent * 0.30; // 2-bedroom (+30%)
  if (childrenCount === 2) return baseRent * 0.65; // 3-bedroom (+65%)
  return baseRent * 1.0; // 4-bedroom (+100%)
}

/**
 * Get recommended bedroom count
 */
export function getRecommendedBedrooms(childrenCount: number, hasPartner: boolean): number {
  if (childrenCount === 0) return hasPartner ? 1 : 1;
  if (childrenCount === 1) return 2;
  if (childrenCount === 2) return 3;
  return 4;
}
