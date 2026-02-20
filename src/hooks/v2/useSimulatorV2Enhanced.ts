/**
 * useSimulatorV2Enhanced Hook
 * Quebec Life Simulator V2 - Enhanced with manual overrides and shared custody
 */

import { useMemo } from 'react';
import { calculateQuebecTax, type TaxCalculationResult } from '@/src/lib/calculations';
import { getCityById, type QuebecCity } from '@/src/data/quebecCosts';
import { 
  calculateChildrenCosts,
  type ChildCostBreakdown
} from '@/src/data/childrenCosts';
import { WizardState } from '@/src/components/v2/types';

export interface ManualOverrides {
  rent: number | null;
  groceries: number | null;
  utilities: number | null;
  transport: number | null;
  carFinancing: number;
  childcare: Record<number, number | null>;
}

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
    adjustedRent: number;
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
 * Enhanced simulator hook with manual overrides and shared custody
 */
export function useSimulatorV2Enhanced(
  wizardState: WizardState, 
  manualOverrides: ManualOverrides,
  sharedCustody: boolean = false
): SimulatorV2Result | null {
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

    // IMPROVEMENT 2: Apply shared custody multiplier to allocations
    const sharedCustodyMultiplier = sharedCustody ? 0.5 : 1.0;
    const adjustedChildBenefits = childrenCosts.totalBenefits * sharedCustodyMultiplier;

    // Housing calculations - IMPROVEMENT 3: Unrestricted housing options
    let adjustedRent = city.avgRent;
    
    // Adjust rent based on housing type (no occupancy restrictions)
    const housingMultipliers: Record<string, number> = {
      'studio': 0.7,
      '1br': 1.0,
      '2br': 1.3,
      '3br': 1.6,
      '4br': 1.9,
      'house': 2.2
    };
    
    adjustedRent = city.avgRent * (housingMultipliers[wizardState.housingType] || 1.0);

    // Roommate: Split rent equally
    if (isRoommate && wizardState.roommateCount && wizardState.roommateCount > 1) {
      adjustedRent = adjustedRent / wizardState.roommateCount;
    }

    // IMPROVEMENT 1: Apply manual override for rent
    const finalRent = manualOverrides.rent !== null ? manualOverrides.rent : adjustedRent;

    const housing = {
      baseRent: city.avgRent,
      adjustedRent,
      monthlyTotal: finalRent
    };

    // Transport costs - IMPROVEMENT 5: Add car financing
    const transportCosts: Record<string, number> = {
      'public': city.transportation,
      '1-car': 300,
      '2-cars': 600,
      'bike-walk': 0
    };

    let baseTransportCost = transportCosts[wizardState.transportType] || 0;
    
    // Add car financing if applicable
    if ((wizardState.transportType === '1-car' || wizardState.transportType === '2-cars') && manualOverrides.carFinancing > 0) {
      baseTransportCost += manualOverrides.carFinancing;
    }

    // IMPROVEMENT 1: Apply manual override for transport
    const finalTransport = manualOverrides.transport !== null ? manualOverrides.transport : baseTransportCost;

    const transport = {
      type: wizardState.transportType,
      monthlyCost: finalTransport
    };

    // Groceries calculation
    let monthlyGroceries = city.monthlyGrocery;
    if (hasPartner) {
      monthlyGroceries *= 1.5;
    }
    if (isRoommate) {
      monthlyGroceries = city.monthlyGrocery;
    }
    
    // Add children food costs
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
    
    const scaleDiscount = wizardState.childrenCount === 1 ? 1.0 :
                          wizardState.childrenCount === 2 ? 0.85 :
                          wizardState.childrenCount === 3 ? 0.75 : 0.70;
    
    monthlyGroceries += childrenFoodTotal * scaleDiscount;

    // IMPROVEMENT 1: Apply manual override for groceries
    const finalGroceries = manualOverrides.groceries !== null ? manualOverrides.groceries : monthlyGroceries;

    // Utilities calculation
    let monthlyUtilities = city.utilities;
    if (hasPartner) {
      monthlyUtilities *= 1.3;
    }
    if (isRoommate && wizardState.roommateCount && wizardState.roommateCount > 1) {
      monthlyUtilities = monthlyUtilities / wizardState.roommateCount;
    }

    // IMPROVEMENT 1: Apply manual override for utilities
    const finalUtilities = manualOverrides.utilities !== null ? manualOverrides.utilities : monthlyUtilities;

    // IMPROVEMENT 4: Smart age-based childcare with per-child overrides
    let totalChildcare = 0;
    
    // Calculate childcare per child
    for (let i = 0; i < wizardState.childrenCount; i++) {
      const childAge = i < wizardState.childrenAges['0-5'] ? '0-5' :
                      i < wizardState.childrenAges['0-5'] + wizardState.childrenAges['6-12'] ? '6-12' : '13-17';
      
      // Check if manual override exists for this child
      if (manualOverrides.childcare[i] !== null && manualOverrides.childcare[i] !== undefined) {
        totalChildcare += manualOverrides.childcare[i]!;
      } else {
        // Age 13-17: Automatically $0
        if (childAge === '13-17') {
          totalChildcare += 0;
        } else {
          // Use default calculation
          totalChildcare += childrenCosts.daycareMonthly / wizardState.childrenCount;
        }
      }
    }

    // Other expenses
    let otherExpenses = 200;
    if (hasPartner) {
      otherExpenses *= 2;
    }
    if (isRoommate) {
      otherExpenses = 200;
    }

    // Monthly breakdown with all overrides applied
    const monthlyBreakdown = {
      income: combinedTax.netMonthly,
      rent: finalRent,
      groceries: finalGroceries,
      utilities: finalUtilities,
      transport: finalTransport,
      childcare: totalChildcare,
      otherExpenses,
      totalExpenses: finalRent + finalGroceries + finalUtilities + finalTransport + totalChildcare + otherExpenses,
      childBenefits: adjustedChildBenefits / 12, // Apply shared custody multiplier
      netExpenses: finalRent + finalGroceries + finalUtilities + finalTransport + totalChildcare + otherExpenses,
      disposable: 0
    };

    monthlyBreakdown.disposable = monthlyBreakdown.income - monthlyBreakdown.netExpenses;

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
      childrenCosts: {
        ...childrenCosts,
        totalBenefits: adjustedChildBenefits // Return adjusted benefits
      },
      monthlyBreakdown,
      financialHealth,
      household
    };
  }, [wizardState, manualOverrides, sharedCustody]);
}

/**
 * Generate insights based on V2 results (reused from original)
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
