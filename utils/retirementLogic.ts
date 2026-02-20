// Retirement Savings Calculator Logic
// Compound interest with monthly contributions

export interface RetirementInputs {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  expectedReturn: number; // Annual percentage (e.g., 7 for 7%)
}

export interface GrowthPoint {
  year: number;
  age: number;
  totalValue: number;
  totalContributions: number;
  totalInterest: number;
}

export interface RetirementResult {
  currentAge: number;
  retirementAge: number;
  yearsUntilRetirement: number;
  currentSavings: number;
  monthlyContribution: number;
  expectedReturn: number;
  totalAtRetirement: number;
  totalContributions: number;
  totalInterestEarned: number;
  growthOverTime: GrowthPoint[];
}

/**
 * Calculate compound interest with monthly contributions
 * Formula: FV = PV(1+r)^n + PMT * [((1+r)^n - 1) / r]
 */
export function calculateRetirementSavings(inputs: RetirementInputs): RetirementResult {
  const { currentAge, retirementAge, currentSavings, monthlyContribution, expectedReturn } = inputs;
  
  const yearsUntilRetirement = retirementAge - currentAge;
  const monthsUntilRetirement = yearsUntilRetirement * 12;
  const monthlyRate = expectedReturn / 100 / 12;
  
  // Calculate future value of current savings
  const futureValueOfCurrentSavings = currentSavings * Math.pow(1 + monthlyRate, monthsUntilRetirement);
  
  // Calculate future value of monthly contributions
  let futureValueOfContributions = 0;
  if (monthlyRate > 0) {
    futureValueOfContributions = monthlyContribution * 
      ((Math.pow(1 + monthlyRate, monthsUntilRetirement) - 1) / monthlyRate);
  } else {
    // If 0% return, just sum the contributions
    futureValueOfContributions = monthlyContribution * monthsUntilRetirement;
  }
  
  const totalAtRetirement = futureValueOfCurrentSavings + futureValueOfContributions;
  const totalContributions = currentSavings + (monthlyContribution * monthsUntilRetirement);
  const totalInterestEarned = totalAtRetirement - totalContributions;
  
  // Calculate growth over time (yearly snapshots)
  const growthOverTime: GrowthPoint[] = [];
  
  for (let year = 0; year <= yearsUntilRetirement; year++) {
    const months = year * 12;
    const age = currentAge + year;
    
    // Future value of current savings at this point
    const fvCurrentSavings = currentSavings * Math.pow(1 + monthlyRate, months);
    
    // Future value of contributions up to this point
    let fvContributions = 0;
    if (monthlyRate > 0 && months > 0) {
      fvContributions = monthlyContribution * 
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    } else if (months > 0) {
      fvContributions = monthlyContribution * months;
    }
    
    const totalValue = fvCurrentSavings + fvContributions;
    const contributions = currentSavings + (monthlyContribution * months);
    const interest = totalValue - contributions;
    
    growthOverTime.push({
      year,
      age,
      totalValue,
      totalContributions: contributions,
      totalInterest: interest,
    });
  }
  
  return {
    currentAge,
    retirementAge,
    yearsUntilRetirement,
    currentSavings,
    monthlyContribution,
    expectedReturn,
    totalAtRetirement,
    totalContributions,
    totalInterestEarned,
    growthOverTime,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercentage(rate: number): string {
  return `${rate.toFixed(1)}%`;
}
