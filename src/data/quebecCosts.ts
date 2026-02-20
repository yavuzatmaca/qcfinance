/**
 * Quebec Cities - Cost of Living Data (2025/2026)
 * Realistic monthly costs for major Quebec cities
 */

export interface QuebecCity {
  id: string;
  name: string;
  nameEn: string;
  
  // Housing
  avgRent: number; // 1-bedroom apartment in city center
  
  // Monthly Expenses
  monthlyGrocery: number; // Average for single person
  utilities: number; // Electricity, heating, water, garbage
  transportation: number; // Monthly public transit pass
  
  // Additional Info
  population: number;
  region: string;
}

export const QUEBEC_CITIES: QuebecCity[] = [
  {
    id: 'montreal',
    name: 'Montréal',
    nameEn: 'Montreal',
    avgRent: 1750, // Downtown/Plateau area
    monthlyGrocery: 450,
    utilities: 120, // Hydro-Québec + internet
    transportation: 97, // STM monthly pass (OPUS)
    population: 1762949,
    region: 'Montréal',
  },
  {
    id: 'quebec',
    name: 'Québec',
    nameEn: 'Quebec City',
    avgRent: 1250, // Old Quebec/Saint-Roch area
    monthlyGrocery: 420,
    utilities: 110,
    transportation: 90, // RTC monthly pass
    population: 549459,
    region: 'Capitale-Nationale',
  },
  {
    id: 'laval',
    name: 'Laval',
    nameEn: 'Laval',
    avgRent: 1450,
    monthlyGrocery: 440,
    utilities: 115,
    transportation: 97, // STM (connected to Montreal)
    population: 438366,
    region: 'Laval',
  },
  {
    id: 'gatineau',
    name: 'Gatineau',
    nameEn: 'Gatineau',
    avgRent: 1350,
    monthlyGrocery: 430,
    utilities: 105,
    transportation: 125, // STO monthly pass
    population: 291041,
    region: 'Outaouais',
  },
  {
    id: 'longueuil',
    name: 'Longueuil',
    nameEn: 'Longueuil',
    avgRent: 1400,
    monthlyGrocery: 440,
    utilities: 115,
    transportation: 97, // RTL/STM
    population: 254483,
    region: 'Montérégie',
  },
  {
    id: 'sherbrooke',
    name: 'Sherbrooke',
    nameEn: 'Sherbrooke',
    avgRent: 1050,
    monthlyGrocery: 400,
    utilities: 100,
    transportation: 75, // STS monthly pass
    population: 172950,
    region: 'Estrie',
  },
  {
    id: 'saguenay',
    name: 'Saguenay',
    nameEn: 'Saguenay',
    avgRent: 850,
    monthlyGrocery: 390,
    utilities: 95,
    transportation: 70, // STS monthly pass
    population: 144746,
    region: 'Saguenay–Lac-Saint-Jean',
  },
  {
    id: 'levis',
    name: 'Lévis',
    nameEn: 'Levis',
    avgRent: 1150,
    monthlyGrocery: 410,
    utilities: 105,
    transportation: 90, // STLévis
    population: 149683,
    region: 'Chaudière-Appalaches',
  },
  {
    id: 'trois-rivieres',
    name: 'Trois-Rivières',
    nameEn: 'Trois-Rivieres',
    avgRent: 900,
    monthlyGrocery: 390,
    utilities: 95,
    transportation: 70, // STTR monthly pass
    population: 139163,
    region: 'Mauricie',
  },
  {
    id: 'terrebonne',
    name: 'Terrebonne',
    nameEn: 'Terrebonne',
    avgRent: 1350,
    monthlyGrocery: 435,
    utilities: 110,
    transportation: 97, // Connected to Montreal transit
    population: 119944,
    region: 'Lanaudière',
  },
];

/**
 * Calculate total monthly expenses for a city with lifestyle adjustments
 */
export function calculateMonthlyCityExpenses(
  city: QuebecCity, 
  hasPartner: boolean = false, 
  hasCar: boolean = false
): number {
  let rent = city.avgRent;
  let utilities = city.utilities;
  let transportation = city.transportation;
  let groceries = city.monthlyGrocery;

  // If living with partner, split rent and utilities
  if (hasPartner) {
    rent = rent * 0.5;
    utilities = utilities * 0.5;
    groceries = groceries * 1.5; // More food but not double
  }

  // If has car, add car expenses and remove public transit
  if (hasCar) {
    transportation = 300; // Gas, insurance, maintenance average
  }

  return rent + groceries + utilities + transportation;
}

/**
 * Calculate annual city expenses
 */
export function calculateAnnualCityExpenses(
  city: QuebecCity,
  hasPartner: boolean = false,
  hasCar: boolean = false
): number {
  return calculateMonthlyCityExpenses(city, hasPartner, hasCar) * 12;
}

/**
 * Get city by ID
 */
export function getCityById(id: string): QuebecCity | undefined {
  return QUEBEC_CITIES.find((city) => city.id === id);
}

/**
 * Get cities sorted by cost (cheapest first)
 */
export function getCitiesByCost(): QuebecCity[] {
  return [...QUEBEC_CITIES].sort((a, b) => {
    const costA = calculateMonthlyCityExpenses(a);
    const costB = calculateMonthlyCityExpenses(b);
    return costA - costB;
  });
}

/**
 * Get cities sorted by population (largest first)
 */
export function getCitiesByPopulation(): QuebecCity[] {
  return [...QUEBEC_CITIES].sort((a, b) => b.population - a.population);
}

/**
 * Calculate rent-to-income ratio (should be < 30%)
 */
export function calculateRentToIncomeRatio(rent: number, monthlyIncome: number): number {
  if (monthlyIncome <= 0) return 0;
  return (rent / monthlyIncome) * 100;
}

/**
 * Check if rent is affordable (< 30% of income)
 */
export function isRentAffordable(rent: number, monthlyIncome: number): boolean {
  return calculateRentToIncomeRatio(rent, monthlyIncome) < 30;
}

/**
 * Get recommended cities based on monthly income
 */
export function getRecommendedCities(monthlyNetIncome: number): QuebecCity[] {
  return QUEBEC_CITIES.filter((city) => {
    const totalExpenses = calculateMonthlyCityExpenses(city);
    const disposableIncome = monthlyNetIncome - totalExpenses;
    return disposableIncome > 0 && isRentAffordable(city.avgRent, monthlyNetIncome);
  });
}

/**
 * Calculate disposable income after city expenses
 */
export function calculateDisposableIncome(
  monthlyNetIncome: number,
  city: QuebecCity
): number {
  const totalExpenses = calculateMonthlyCityExpenses(city);
  return monthlyNetIncome - totalExpenses;
}

/**
 * Get financial health status based on disposable income
 */
export function getFinancialHealthStatus(
  disposableIncome: number,
  monthlyNetIncome: number
): {
  status: 'excellent' | 'good' | 'tight' | 'deficit';
  label: string;
  color: string;
  description: string;
} {
  if (monthlyNetIncome <= 0) {
    return {
      status: 'deficit',
      label: 'Aucun revenu',
      color: 'red',
      description: 'Entrez votre salaire pour voir votre situation financière',
    };
  }

  const savingsRate = (disposableIncome / monthlyNetIncome) * 100;

  if (savingsRate < 0) {
    return {
      status: 'deficit',
      label: 'Budget Déficitaire',
      color: 'red',
      description: 'Vos dépenses dépassent vos revenus. Considérez une ville moins chère ou augmentez vos revenus.',
    };
  } else if (savingsRate < 10) {
    return {
      status: 'tight',
      label: 'Budget Serré',
      color: 'orange',
      description: 'Vous avez peu de marge de manœuvre. Essayez d\'économiser au moins 10% de vos revenus.',
    };
  } else if (savingsRate < 30) {
    return {
      status: 'good',
      label: 'Bonne Santé Financière',
      color: 'blue',
      description: 'Vous gérez bien votre budget. Continuez à épargner pour atteindre 30%.',
    };
  } else {
    return {
      status: 'excellent',
      label: 'Excellente Santé Financière',
      color: 'green',
      description: 'Félicitations! Vous épargnez plus de 30% de vos revenus.',
    };
  }
}
