/**
 * useSimulator Hook
 * Custom hook for Quebec Life Simulator calculations
 */

import { useMemo } from 'react';
import { calculateQuebecTax, type TaxCalculationResult } from '@/src/lib/calculations';
import { 
  getCityById, 
  calculateDisposableIncome,
  calculateMonthlyCityExpenses,
  getFinancialHealthStatus,
  calculateRentToIncomeRatio,
  type QuebecCity 
} from '@/src/data/quebecCosts';
import { 
  calculateChildrenCosts,
  calculateAdditionalHousingCost,
  type ChildCostBreakdown
} from '@/src/data/childrenCosts';

export interface SimulatorResult {
  // Tax Calculations
  tax: TaxCalculationResult;
  
  // City Data
  city: QuebecCity;
  monthlyExpenses: number;
  annualExpenses: number;
  
  // Children Data
  childrenCosts: ChildCostBreakdown;
  
  // Disposable Income
  disposableIncome: number;
  annualDisposableIncome: number;
  savingsRate: number;
  
  // Financial Health
  financialHealth: {
    status: 'excellent' | 'good' | 'tight' | 'deficit';
    label: string;
    color: string;
    description: string;
  };
  
  // Affordability Metrics
  rentToIncomeRatio: number;
  isRentAffordable: boolean;
  
  // Breakdown for Charts
  breakdown: {
    federalTax: number;
    provincialTax: number;
    qpp: number;
    qpip: number;
    ei: number;
    rent: number;
    groceries: number;
    utilities: number;
    transportation: number;
    childrenCost: number;
    childrenBenefits: number;
    disposable: number;
  };
}

/**
 * Main simulator hook
 * @param grossSalary - Annual gross salary
 * @param cityId - Selected city ID
 * @param hasPartner - Living with partner (splits rent/utilities)
 * @param hasCar - Owns a car (adds car expenses)
 * @param childrenCount - Number of children
 * @param childrenAges - Ages of children ('0-5', '6-12', '13-17')
 * @param hasCPE - Has access to subsidized daycare
 * @returns Complete simulation results
 */
export function useSimulator(
  grossSalary: number,
  cityId: string,
  hasPartner: boolean = false,
  hasCar: boolean = false,
  childrenCount: number = 0,
  childrenAges: string[] = [],
  hasCPE: boolean = false
): SimulatorResult | null {
  return useMemo(() => {
    // Validate inputs
    if (!grossSalary || grossSalary <= 0) {
      return null;
    }

    const city = getCityById(cityId);
    if (!city) {
      return null;
    }

    // Calculate taxes
    const tax = calculateQuebecTax(grossSalary);

    // Calculate children costs and benefits
    const childrenCosts = calculateChildrenCosts(
      childrenCount,
      childrenAges,
      hasCPE,
      tax.netAnnual
    );

    // Calculate additional housing cost for children
    const additionalHousingCost = calculateAdditionalHousingCost(childrenCount, city.avgRent);

    // Calculate city expenses with lifestyle adjustments
    const baseMonthlyExpenses = calculateMonthlyCityExpenses(city, hasPartner, hasCar);
    const monthlyExpenses = baseMonthlyExpenses + (additionalHousingCost / 12) + childrenCosts.netMonthlyCost;
    const annualExpenses = monthlyExpenses * 12;

    // Calculate disposable income with lifestyle and children adjustments
    const adjustedRent = (hasPartner ? city.avgRent * 0.5 : city.avgRent) + (additionalHousingCost / 12);
    const adjustedGroceries = hasPartner ? city.monthlyGrocery * 1.5 : city.monthlyGrocery;
    const adjustedTransport = hasCar ? 300 : city.transportation;
    const adjustedUtilities = hasPartner ? city.utilities * 0.5 : city.utilities;
    
    const totalMonthlyExpenses = adjustedRent + adjustedGroceries + adjustedTransport + adjustedUtilities + childrenCosts.netMonthlyCost;
    const disposableIncome = tax.netMonthly - totalMonthlyExpenses;
    const annualDisposableIncome = disposableIncome * 12;
    const savingsRate = tax.netMonthly > 0 
      ? (disposableIncome / tax.netMonthly) * 100 
      : 0;

    // Get financial health status
    const financialHealth = getFinancialHealthStatus(disposableIncome, tax.netMonthly);

    // Calculate affordability metrics
    const rentToIncomeRatio = calculateRentToIncomeRatio(city.avgRent, tax.netMonthly);
    const isRentAffordable = rentToIncomeRatio < 30;

    // Create breakdown for visualizations
    const breakdown = {
      federalTax: tax.federalTax,
      provincialTax: tax.provincialTax,
      qpp: tax.qppContribution,
      qpip: tax.qpipContribution,
      ei: tax.eiContribution,
      rent: adjustedRent * 12,
      groceries: adjustedGroceries * 12,
      utilities: adjustedUtilities * 12,
      transportation: adjustedTransport * 12,
      childrenCost: childrenCosts.totalMonthly * 12,
      childrenBenefits: childrenCosts.totalBenefits,
      disposable: Math.max(0, annualDisposableIncome),
    };

    return {
      tax,
      city,
      monthlyExpenses,
      annualExpenses,
      childrenCosts,
      disposableIncome,
      annualDisposableIncome,
      savingsRate,
      financialHealth,
      rentToIncomeRatio,
      isRentAffordable,
      breakdown,
    };
  }, [grossSalary, cityId, hasPartner, hasCar, childrenCount, childrenAges, hasCPE]);
}

export type InsightType = 'success' | 'warning' | 'info' | 'danger';

export interface Insight {
  icon: string;
  title: string;
  description: string;
  type: InsightType;
}

/**
 * Generate smart insights based on simulation results
 */
export function generateInsights(result: SimulatorResult | null): Insight[] {
  if (!result) return [];

  const insights: Insight[] = [];

  // High tax rate insight
  if (result.tax.effectiveTaxRate > 30) {
    const rrspSavings = Math.round(5000 * (result.tax.effectiveTaxRate / 100));
    insights.push({
      icon: '💰',
      title: 'Optimisation REER',
      description: `Votre taux d'imposition effectif est de ${result.tax.effectiveTaxRate.toFixed(1)}%. Cotiser 5 000$ à un REER pourrait vous faire économiser environ ${rrspSavings}$ en impôts.`,
      type: 'info' as const,
    });
  }

  // Low savings rate
  if (result.savingsRate < 10 && result.savingsRate >= 0) {
    insights.push({
      icon: '⚠️',
      title: 'Économies Faibles',
      description: `Vous n'économisez que ${result.savingsRate.toFixed(1)}% de votre revenu net. Visez au moins 10% pour une meilleure sécurité financière.`,
      type: 'warning' as const,
    });
  }

  // Deficit budget
  if (result.disposableIncome < 0) {
    insights.push({
      icon: '🚨',
      title: 'Budget Déficitaire',
      description: `Vos dépenses dépassent vos revenus de ${Math.abs(result.disposableIncome).toFixed(0)}$ par mois. Considérez une ville moins chère ou cherchez à augmenter vos revenus.`,
      type: 'danger' as const,
    });
  }

  // High rent ratio
  if (result.rentToIncomeRatio > 35) {
    insights.push({
      icon: '🏠',
      title: 'Loyer Trop Élevé',
      description: `Votre loyer représente ${result.rentToIncomeRatio.toFixed(0)}% de votre revenu. La recommandation est de rester sous 30%. Cherchez un logement moins cher ou augmentez vos revenus.`,
      type: 'warning' as const,
    });
  }

  // Good savings rate
  if (result.savingsRate >= 30) {
    insights.push({
      icon: '🎉',
      title: 'Excellente Gestion',
      description: `Félicitations! Vous économisez ${result.savingsRate.toFixed(0)}% de votre revenu net. Vous êtes sur la bonne voie pour atteindre vos objectifs financiers.`,
      type: 'success' as const,
    });
  }

  // Marginal tax rate info
  if (result.tax.marginalTaxRate > 40) {
    insights.push({
      icon: '📊',
      title: 'Taux Marginal Élevé',
      description: `Votre taux marginal d'imposition est de ${result.tax.marginalTaxRate.toFixed(1)}%. Chaque dollar supplémentaire gagné sera imposé à ce taux. Considérez des stratégies de planification fiscale.`,
      type: 'info' as const,
    });
  }

  return insights;
}

/**
 * Compare multiple cities for the same salary
 */
export function compareCities(
  grossSalary: number,
  cityIds: string[],
  hasPartner: boolean = false,
  hasCar: boolean = false
): Array<SimulatorResult | null> {
  return cityIds.map((cityId) => {
    const city = getCityById(cityId);
    if (!city) return null;

    const tax = calculateQuebecTax(grossSalary);
    
    // Calculate expenses with lifestyle adjustments
    const monthlyExpenses = calculateMonthlyCityExpenses(city, hasPartner, hasCar);
    
    // Calculate disposable income with lifestyle adjustments
    const adjustedRent = hasPartner ? city.avgRent * 0.5 : city.avgRent;
    const adjustedGroceries = hasPartner ? city.monthlyGrocery * 1.5 : city.monthlyGrocery;
    const adjustedTransport = hasCar ? 300 : city.transportation;
    const adjustedUtilities = hasPartner ? city.utilities * 0.5 : city.utilities;
    
    // Empty children costs for comparison (no children data in this function)
    const childrenCosts: ChildCostBreakdown = {
      baseMonthly: 0,
      daycareMonthly: 0,
      totalMonthly: 0,
      federalBenefits: 0,
      provincialBenefits: 0,
      totalBenefits: 0,
      netMonthlyCost: 0,
    };
    
    const totalMonthlyExpenses = adjustedRent + adjustedGroceries + adjustedTransport + adjustedUtilities;
    const disposableIncome = tax.netMonthly - totalMonthlyExpenses;
    
    const savingsRate = tax.netMonthly > 0 
      ? (disposableIncome / tax.netMonthly) * 100 
      : 0;

    return {
      tax,
      city,
      monthlyExpenses,
      annualExpenses: monthlyExpenses * 12,
      childrenCosts,
      disposableIncome,
      annualDisposableIncome: disposableIncome * 12,
      savingsRate,
      financialHealth: getFinancialHealthStatus(disposableIncome, tax.netMonthly),
      rentToIncomeRatio: calculateRentToIncomeRatio(adjustedRent, tax.netMonthly),
      isRentAffordable: calculateRentToIncomeRatio(adjustedRent, tax.netMonthly) < 30,
      breakdown: {
        federalTax: tax.federalTax,
        provincialTax: tax.provincialTax,
        qpp: tax.qppContribution,
        qpip: tax.qpipContribution,
        ei: tax.eiContribution,
        rent: adjustedRent * 12,
        groceries: adjustedGroceries * 12,
        utilities: adjustedUtilities * 12,
        transportation: adjustedTransport * 12,
        childrenCost: 0,
        childrenBenefits: 0,
        disposable: Math.max(0, disposableIncome * 12),
      },
    };
  });
}
