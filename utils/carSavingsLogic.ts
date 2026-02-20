/**
 * EV vs Gas Car Savings Calculator - Quebec 2026
 * Compares annual costs and environmental impact
 */

export interface CarSavingsInput {
  annualKm: number
  gasPrice: number // $/L
  consumptionGas: number // L/100km
  electricityPrice: number // $/kWh (Quebec rate)
  consumptionEV: number // kWh/100km
}

export interface CarSavingsResult {
  annualCostGas: number
  annualCostEV: number
  annualSavings: number
  monthlySavings: number
  fiveYearSavings: number
  co2SavedKg: number
  co2SavedTons: number
  equivalentGasPrice: number // What gas would cost to match EV
  breakdown: {
    gasLitersUsed: number
    evKwhUsed: number
    treesEquivalent: number
  }
}

// Constants
const CO2_PER_LITER = 2.3 // kg of CO2 per liter of gas
const TREES_PER_TON_CO2 = 50 // Approximate trees needed to offset 1 ton CO2/year

export function calculateCarSavings(input: CarSavingsInput): CarSavingsResult {
  const { annualKm, gasPrice, consumptionGas, electricityPrice, consumptionEV } = input

  // Calculate annual fuel consumption
  const gasLitersUsed = (annualKm / 100) * consumptionGas
  const evKwhUsed = (annualKm / 100) * consumptionEV

  // Calculate annual costs
  const annualCostGas = gasLitersUsed * gasPrice
  const annualCostEV = evKwhUsed * electricityPrice

  // Calculate savings
  const annualSavings = annualCostGas - annualCostEV
  const monthlySavings = annualSavings / 12
  const fiveYearSavings = annualSavings * 5

  // Calculate CO2 savings
  const co2SavedKg = gasLitersUsed * CO2_PER_LITER
  const co2SavedTons = co2SavedKg / 1000
  const treesEquivalent = Math.round(co2SavedTons * TREES_PER_TON_CO2)

  // Calculate equivalent gas price (what gas would need to cost to match EV)
  const equivalentGasPrice = annualCostEV / gasLitersUsed

  return {
    annualCostGas: Math.round(annualCostGas),
    annualCostEV: Math.round(annualCostEV),
    annualSavings: Math.round(annualSavings),
    monthlySavings: Math.round(monthlySavings),
    fiveYearSavings: Math.round(fiveYearSavings),
    co2SavedKg: Math.round(co2SavedKg),
    co2SavedTons: Math.round(co2SavedTons * 10) / 10,
    equivalentGasPrice: Math.round(equivalentGasPrice * 100) / 100,
    breakdown: {
      gasLitersUsed: Math.round(gasLitersUsed),
      evKwhUsed: Math.round(evKwhUsed),
      treesEquivalent,
    }
  }
}
