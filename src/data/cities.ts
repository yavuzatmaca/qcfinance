/**
 * Quebec Cities - Cost of Living Data (2024/2025)
 * Monthly average costs for essential expenses
 */

export interface City {
  id: string;
  name: string;
  rent1Bed: number;
  groceries: number;
  transport: number;
  internet: number;
}

export const QUEBEC_CITIES: City[] = [
  {
    id: 'montreal',
    name: 'Montréal',
    rent1Bed: 1650,
    groceries: 450,
    transport: 97, // STM monthly pass
    internet: 60,
  },
  {
    id: 'quebec',
    name: 'Québec',
    rent1Bed: 1200,
    groceries: 420,
    transport: 90, // RTC monthly pass
    internet: 60,
  },
  {
    id: 'gatineau',
    name: 'Gatineau',
    rent1Bed: 1300,
    groceries: 430,
    transport: 125, // STO monthly pass
    internet: 60,
  },
  {
    id: 'sherbrooke',
    name: 'Sherbrooke',
    rent1Bed: 950,
    groceries: 400,
    transport: 75, // STS monthly pass
    internet: 60,
  },
  {
    id: 'trois-rivieres',
    name: 'Trois-Rivières',
    rent1Bed: 850,
    groceries: 390,
    transport: 70, // STTR monthly pass
    internet: 60,
  },
];

/**
 * Calculate total monthly expenses for a city
 */
export function calculateMonthlyExpenses(city: City): number {
  return city.rent1Bed + city.groceries + city.transport + city.internet;
}

/**
 * Get city by ID
 */
export function getCityById(id: string): City | undefined {
  return QUEBEC_CITIES.find((city) => city.id === id);
}
