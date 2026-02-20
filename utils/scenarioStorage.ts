/**
 * Scenario Storage Utility
 * Save and manage simulator scenarios in localStorage
 */

export interface SavedScenario {
  id: string;
  name: string;
  grossSalary: number;
  cityId: string;
  cityName: string;
  hasPartner: boolean;
  hasCar: boolean;
  disposableIncome: number;
  savingsRate: number;
  monthlyExpenses: number;
  createdAt: string;
}

const STORAGE_KEY = 'qcfinance_simulator_scenarios';
const MAX_SCENARIOS = 10;

/**
 * Get all saved scenarios
 */
export function getSavedScenarios(): SavedScenario[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load scenarios:', error);
    return [];
  }
}

/**
 * Save a new scenario
 */
export function saveScenario(scenario: Omit<SavedScenario, 'id' | 'createdAt'>): SavedScenario {
  const scenarios = getSavedScenarios();
  
  const newScenario: SavedScenario = {
    ...scenario,
    id: `scenario_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  
  // Add to beginning and limit to MAX_SCENARIOS
  const updatedScenarios = [newScenario, ...scenarios].slice(0, MAX_SCENARIOS);
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedScenarios));
  } catch (error) {
    console.error('Failed to save scenario:', error);
  }
  
  return newScenario;
}

/**
 * Delete a scenario
 */
export function deleteScenario(id: string): void {
  const scenarios = getSavedScenarios();
  const filtered = scenarios.filter(s => s.id !== id);
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to delete scenario:', error);
  }
}

/**
 * Clear all scenarios
 */
export function clearAllScenarios(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear scenarios:', error);
  }
}

/**
 * Get scenario by ID
 */
export function getScenarioById(id: string): SavedScenario | null {
  const scenarios = getSavedScenarios();
  return scenarios.find(s => s.id === id) || null;
}
