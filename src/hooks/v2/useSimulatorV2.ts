/**
 * useSimulatorV2 Hook
 * Quebec Life Simulator V2 - Conditional wizard calculations
 */

import { useMemo } from 'react';
import { calculateQuebecTax, type TaxCalculationResult } from '@/src/lib/calculations';
import { getCityById, type QuebecCity } from '@/src/data/quebecCosts';
import { 
  calculateChildrenCosts,
  type ChildCostBreakdown
} from '@/src/data/childrenCosts';
import { WizardState } from '@/src/components/v2/types';

export interface SimulatorV2Result {
  // Tax Calculations
  primaryTax: TaxCalculationResult;
  partnerTax?: TaxCalculationResult;
  combinedTax: {
    totalTax: number;
    netAnnual: number;
    netMonthly: number;
    effectiveTaxRate: number;
  };
  
  // City Data
  city: QuebecCity;
  
  // Housing Costs (adjusted based on situation)
  housing: {
    baseRent: number;
    adjustedRent: number; // After housing type and roommate split
    monthlyTotal: number;
  };
  
  // Transport Costs
  transport: {
    type: string;
    monthlyCost: number;
  };
  
  // Children Costs & Benefits
  childrenCosts: ChildCostBreakdown;
  
  // Monthly Breakdown
  monthlyBreakdown: {
    income: number;
    rent: number;
    groceries: number;
    utilities: number;
    transport: number;
    childcare: number;
    otherExpenses: number;
    totalExpenses: number;
    childBenefits: number;
    netExpenses: number;
    disposable: number;
  };
  
  // Financial Health
  financialHealth: {
    status: 'excellent' | 'good' | 'tight' | 'deficit';
    savingsRate: number;
    rentToIncomeRatio: number;
  };
  
  // Household Info
  household: {
    adults: number;
    children: number;
    totalIncome: number;
    hasPartner: boolean;
    hasCPE: boolean;
    isRoommate: boolean;
    roommateCount: number;
  };
}

/**
 * Main simulator hook for V2
 */
export function useSimulatorV2(wizardState: WizardState): SimulatorV2Result | null {
  return useMemo(() => {
    // Validate inputs
    if (!wizardState.grossIncome || wizardState.grossIncome < 1000) {
      return null;
    }

    const city = getCityById(wizardState.cityId);
    if (!city) {
      return null;
    }

    // Calculate primary income tax
    const primaryTax = calculateQuebecTax(wizardState.grossIncome);
    
    // Calculate partner tax if applicable
    let partnerTax: TaxCalculationResult | undefined;
    if (wizardState.partnerStatus === 'partner-working' && wizardState.partnerIncome) {
      partnerTax = calculateQuebecTax(wizardState.partnerIncome);
    }

    // Combined tax calculation
    const combinedTax = {
      totalTax: primaryTax.totalTax + (partnerTax?.totalTax || 0),
      netAnnual: primaryTax.netAnnual + (partnerTax?.netAnnual || 0),
      netMonthly: primaryTax.netMonthly + (partnerTax?.netMonthly || 0),
      effectiveTaxRate: partnerTax 
        ? ((primaryTax.totalTax + partnerTax.totalTax) / (wizardState.grossIncome + wizardState.partnerIncome!)) * 100
        : primaryTax.effectiveTaxRate
    };

    // Household info
    const hasPartner = wizardState.partnerStatus === 'partner-working' || 
                       wizardState.partnerStatus === 'partner-not-working';
    const isRoommate = wizardState.partnerStatus === 'roommate';
    
    const household = {
      adults: hasPartner ? 2 : 1,
      children: wizardState.childrenCount,
      totalIncome: wizardState.grossIncome + (wizardState.partnerIncome || 0),
      hasPartner,
      hasCPE: wizardState.hasCPE,
      isRoommate,
      roommateCount: wizardState.roommateCount || 1
    };

    // Calculate children costs and benefits
    const childrenAgesArray: string[] = [];
    for (let i = 0; i < wizardState.childrenAges['0-5']; i++) childrenAgesArray.push('0-5');
    for (let i = 0; i < wizardState.childrenAges['6-12']; i++) childrenAgesArray.push('6-12');
    for (let i = 0; i < wizardState.childrenAges['13-17']; i++) childrenAgesArray.push('13-17');

    const childrenCosts = calculateChildrenCosts(
      wizardState.childrenCount,
      childrenAgesArray,
      wizardState.hasCPE,
      combinedTax.netAnnual
    );

    // Housing calculations based on situation
    let adjustedRent = city.avgRent;
    
    // Adjust rent based on housing type
    const housingMultipliers: Record<string, number> = {
      'studio': 0.7,
      '1br': 1.0,
      '2br': 1.3,
      '3br': 1.6,
      '4br': 1.9,
      'house': 2.2
    };
    
    // For roommates, automatically select appropriate housing size
    let effectiveHousingType = wizardState.housingType;
    if (isRoommate && wizardState.roommateCount) {
      // Roommates need bedrooms based on their count
      if (wizardState.roommateCount === 2) {
        effectiveHousingType = '2br'; // 2 people share 2BR
      } else if (wizardState.roommateCount === 3) {
        effectiveHousingType = '3br'; // 3 people share 3BR
      } else if (wizardState.roommateCount >= 4) {
        effectiveHousingType = '4br'; // 4+ people share 4BR
      }
    }
    
    adjustedRent = city.avgRent * (housingMultipliers[effectiveHousingType] || 1.0);

    // Roommate: Split rent equally
    if (isRoommate && wizardState.roommateCount && wizardState.roommateCount > 1) {
      adjustedRent = adjustedRent / wizardState.roommateCount;
    }

    // Total household rent (for roommates, this is YOUR share only)
    // Apply custom rent if provided
    const finalRent = wizardState.customExpenses?.rent ?? adjustedRent;
    
    const housing = {
      baseRent: city.avgRent,
      adjustedRent,
      monthlyTotal: finalRent
    };

    // Transport costs
    const transportCosts: Record<string, number> = {
      'public': city.transportation,
      '1-car': 300,
      '2-cars': 600,
      'bike-walk': 0
    };

    const baseTransportCost = transportCosts[wizardState.transportType] || 0;
    const carPayment = wizardState.customExpenses?.carPayment ?? 0;
    const finalTransport = wizardState.customExpenses?.transport ?? (baseTransportCost + carPayment);

    const transport = {
      type: wizardState.transportType,
      monthlyCost: finalTransport
    };

    // Groceries calculation - total household
    let monthlyGroceries = city.monthlyGrocery;
    if (hasPartner) {
      monthlyGroceries *= 1.5; // Scale economy for couples
    }
    // Roommates: Each person buys their own food (no sharing)
    // So we only calculate for the user, not multiply
    if (isRoommate) {
      // Keep base amount - each roommate buys their own groceries
      monthlyGroceries = city.monthlyGrocery;
    }
    
    // Add children food costs
    // Children food is part of baseMonthly in childrenCosts
    // Average food cost per child: 0-5 years: ~$300, 6-12: ~$350, 13-17: ~$400
    const childFoodCosts = {
      '0-5': 300,
      '6-12': 350,
      '13-17': 400
    };
    
    let childrenFoodTotal = 0;
    childrenAgesArray.forEach(age => {
      const ageGroup = age as keyof typeof childFoodCosts;
      childrenFoodTotal += childFoodCosts[ageGroup] || 0;
    });
    
    // Apply scale economy discount (same as in childrenCosts)
    const scaleDiscount = wizardState.childrenCount === 1 ? 1.0 :
                          wizardState.childrenCount === 2 ? 0.85 :
                          wizardState.childrenCount === 3 ? 0.75 : 0.70;
    
    monthlyGroceries += childrenFoodTotal * scaleDiscount;

    // Apply custom groceries if provided
    const finalGroceries = wizardState.customExpenses?.groceries ?? monthlyGroceries;

    // Utilities calculation - total household
    let monthlyUtilities = city.utilities;
    // Utilities don't scale linearly with people, but do increase
    if (hasPartner) {
      monthlyUtilities *= 1.3; // Slight increase for couple
    }
    // Roommates: Split utilities equally
    if (isRoommate && wizardState.roommateCount && wizardState.roommateCount > 1) {
      monthlyUtilities = monthlyUtilities / wizardState.roommateCount;
    }

    // Apply custom utilities if provided
    const finalUtilities = wizardState.customExpenses?.utilities ?? monthlyUtilities;

    // Other expenses - total household
    let otherExpenses = 200; // Base amount per person
    if (hasPartner) {
      otherExpenses *= 2; // Two people
    }
    // Roommates: Only user's personal expenses
    if (isRoommate) {
      otherExpenses = 200; // Just the user
    }

    // Childcare - apply custom if provided, 13-17 always 0
    let finalChildcare = childrenCosts.netMonthlyCost;
    if (wizardState.customExpenses?.childcare) {
      finalChildcare = 0;
      if (wizardState.childrenAges['0-5'] > 0) {
        finalChildcare += (wizardState.customExpenses.childcare['0-5'] ?? 0) * wizardState.childrenAges['0-5'];
      }
      if (wizardState.childrenAges['6-12'] > 0) {
        finalChildcare += (wizardState.customExpenses.childcare['6-12'] ?? 0) * wizardState.childrenAges['6-12'];
      }
      // 13-17 is always 0
    }

    // Apply shared custody multiplier to benefits
    const sharedCustodyMultiplier = wizardState.sharedCustody ? 0.5 : 1.0;
    const adjustedChildBenefits = (childrenCosts.totalBenefits / 12) * sharedCustodyMultiplier;

    // Monthly breakdown - ALL VALUES ARE TOTAL HOUSEHOLD
    const monthlyBreakdown = {
      income: combinedTax.netMonthly,
      rent: finalRent,
      groceries: finalGroceries,
      utilities: finalUtilities,
      transport: finalTransport,
      childcare: finalChildcare,
      otherExpenses,
      totalExpenses: finalRent + finalGroceries + finalUtilities + 
                     finalTransport + finalChildcare + otherExpenses,
      childBenefits: adjustedChildBenefits,
      netExpenses: finalRent + finalGroceries + finalUtilities + 
                   finalTransport + finalChildcare + otherExpenses,
      disposable: 0 // Will be calculated below
    };

    monthlyBreakdown.disposable = monthlyBreakdown.income + monthlyBreakdown.childBenefits - monthlyBreakdown.netExpenses;

    // Financial health
    const savingsRate = monthlyBreakdown.income > 0 
      ? (monthlyBreakdown.disposable / monthlyBreakdown.income) * 100 
      : 0;

    const rentToIncomeRatio = monthlyBreakdown.income > 0
      ? (finalRent / monthlyBreakdown.income) * 100
      : 0;

    let status: 'excellent' | 'good' | 'tight' | 'deficit';
    if (monthlyBreakdown.disposable < 0) {
      status = 'deficit';
    } else if (savingsRate >= 30) {
      status = 'excellent';
    } else if (savingsRate >= 15) {
      status = 'good';
    } else {
      status = 'tight';
    }

    const financialHealth = {
      status,
      savingsRate,
      rentToIncomeRatio
    };

    return {
      primaryTax,
      partnerTax,
      combinedTax,
      city,
      housing,
      transport,
      childrenCosts,
      monthlyBreakdown,
      financialHealth,
      household
    };
  }, [wizardState]);
}

/**
 * Generate insights based on V2 results
 */
export function generateInsightsV2(result: SimulatorV2Result): Array<{
  icon: string;
  title: string;
  description: string;
  type: 'success' | 'warning' | 'info' | 'danger';
}> {
  const insights = [];

  // High savings rate
  if (result.financialHealth.savingsRate >= 30) {
    insights.push({
      icon: 'TrendingUp',
      title: 'Excellente gestion financière',
      description: `Vous économisez ${result.financialHealth.savingsRate.toFixed(0)}% de votre revenu net. Continuez comme ça!`,
      type: 'success' as const
    });
  }

  // Low savings rate
  if (result.financialHealth.savingsRate < 10 && result.financialHealth.savingsRate >= 0) {
    insights.push({
      icon: 'AlertTriangle',
      title: 'Économies faibles',
      description: `Vous n'économisez que ${result.financialHealth.savingsRate.toFixed(1)}%. Visez au moins 10% pour plus de sécurité.`,
      type: 'warning' as const
    });
  }

  // Deficit
  if (result.monthlyBreakdown.disposable < 0) {
    insights.push({
      icon: 'AlertCircle',
      title: 'Budget déficitaire',
      description: `Vos dépenses dépassent vos revenus de ${Math.abs(result.monthlyBreakdown.disposable).toFixed(0)}$/mois. Considérez réduire vos coûts.`,
      type: 'danger' as const
    });
  }

  // High rent ratio
  if (result.financialHealth.rentToIncomeRatio > 35) {
    insights.push({
      icon: 'Home',
      title: 'Loyer élevé',
      description: `Votre loyer représente ${result.financialHealth.rentToIncomeRatio.toFixed(0)}% de votre revenu. Recommandation: <30%.`,
      type: 'warning' as const
    });
  }

  // CPE benefit
  if (result.household.hasCPE && result.childrenCosts.daycareMonthly > 0) {
    const childrenAges = result.household.children; // Simplified
    insights.push({
      icon: 'Coins',
      title: 'Économie CPE',
      description: `Votre place en CPE vous fait économiser environ 900$/mois par rapport à une garderie privée!`,
      type: 'success' as const
    });
  }

  // Partner income benefit
  if (result.household.hasPartner && result.partnerTax) {
    insights.push({
      icon: 'Users',
      title: 'Avantage du double revenu',
      description: `Avec deux revenus, vous partagez les coûts fixes et augmentez votre pouvoir d'achat.`,
      type: 'info' as const
    });
  }

  // Roommate savings
  if (result.household.isRoommate && result.household.roommateCount > 1) {
    // Calculate what rent would be if living alone
    const soloRent = result.housing.adjustedRent * result.household.roommateCount;
    const sharedRent = result.housing.monthlyTotal;
    const savings = soloRent - sharedRent;
    insights.push({
      icon: 'UserPlus',
      title: 'Économie en colocation',
      description: `En partageant le loyer avec ${result.household.roommateCount - 1} colocataire(s), vous économisez ${savings.toFixed(0)}$/mois!`,
      type: 'success' as const
    });
  }

  // Child benefits
  if (result.childrenCosts.totalBenefits > 0) {
    insights.push({
      icon: 'Baby',
      title: 'Allocations familiales',
      description: `Vous recevez ${(result.childrenCosts.totalBenefits / 12).toFixed(0)}$/mois en allocations qui couvrent ${((result.childrenCosts.totalBenefits / 12) / result.childrenCosts.totalMonthly * 100).toFixed(0)}% des coûts.`,
      type: 'info' as const
    });
  }

  // High tax rate
  if (result.combinedTax.effectiveTaxRate > 30) {
    insights.push({
      icon: 'BarChart3',
      title: 'Taux d\'imposition élevé',
      description: `Votre taux effectif est ${result.combinedTax.effectiveTaxRate.toFixed(1)}%. Considérez des stratégies REER pour réduire vos impôts.`,
      type: 'info' as const
    });
  }

  return insights;
}
