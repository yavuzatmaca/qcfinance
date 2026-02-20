// Quebec Rent Increase Calculator Logic (TAL - Tribunal administratif du logement)
// Simplified 2026 factors for MVP

import { RENT_INCREASE } from './taxConstants';

export type HeatingType = 'none' | 'electricity' | 'gas' | 'oil';

export interface RentIncreaseInputs {
  currentRent: number;
  isHeatedByLandlord: boolean;
  heatingType: HeatingType;
  municipalTaxIncrease: number;
  schoolTaxIncrease: number;
  insuranceIncrease: number;
  majorRenovations: number;
  maintenanceIncrease: number;
}

export interface RentIncreaseResult {
  currentRent: number;
  baseIndexIncrease: number;
  heatingAdjustment: number;
  municipalTaxIncrease: number;
  schoolTaxIncrease: number;
  insuranceIncrease: number;
  renovationIncrease: number;
  maintenanceIncrease: number;
  totalIncrease: number;
  newRent: number;
  percentageIncrease: number;
}

// Re-export for backward compatibility
const BASE_INDEX_RATE = RENT_INCREASE.BASE_INDEX_RATE;
const HEATING_ADJUSTMENT_RATES = {
  none: RENT_INCREASE.HEATING_ADJUSTMENT_RATES.NONE,
  electricity: RENT_INCREASE.HEATING_ADJUSTMENT_RATES.ELECTRICITY,
  gas: RENT_INCREASE.HEATING_ADJUSTMENT_RATES.GAS,
  oil: RENT_INCREASE.HEATING_ADJUSTMENT_RATES.OIL,
};
const RENOVATION_AMORTIZATION_RATE = RENT_INCREASE.RENOVATION_AMORTIZATION_RATE;
const MONTHS_PER_YEAR = RENT_INCREASE.MONTHS_PER_YEAR;

export function calculateRentIncrease(inputs: RentIncreaseInputs): RentIncreaseResult {
  const {
    currentRent,
    isHeatedByLandlord,
    heatingType,
    municipalTaxIncrease,
    schoolTaxIncrease,
    insuranceIncrease,
    majorRenovations,
    maintenanceIncrease,
  } = inputs;

  // Base index increase (4% of current rent if unheated)
  let baseIndexIncrease = currentRent * BASE_INDEX_RATE;

  // Heating adjustment (additional percentage if heated by landlord)
  let heatingAdjustment = 0;
  if (isHeatedByLandlord && heatingType !== 'none') {
    heatingAdjustment = currentRent * HEATING_ADJUSTMENT_RATES[heatingType];
  }

  // Tax increases (100% passed to tenant, divided by 12 for monthly)
  const monthlyMunicipalTax = municipalTaxIncrease / MONTHS_PER_YEAR;
  const monthlySchoolTax = schoolTaxIncrease / MONTHS_PER_YEAR;

  // Insurance and maintenance (100% passed to tenant, divided by 12)
  const monthlyInsurance = insuranceIncrease / MONTHS_PER_YEAR;
  const monthlyMaintenance = maintenanceIncrease / MONTHS_PER_YEAR;

  // Major renovations (4.8% of cost per year, divided by 12 for monthly)
  const renovationIncrease = (majorRenovations * RENOVATION_AMORTIZATION_RATE) / MONTHS_PER_YEAR;

  // Total monthly increase
  const totalIncrease =
    baseIndexIncrease +
    heatingAdjustment +
    monthlyMunicipalTax +
    monthlySchoolTax +
    monthlyInsurance +
    monthlyMaintenance +
    renovationIncrease;

  const newRent = currentRent + totalIncrease;
  const percentageIncrease = (totalIncrease / currentRent) * 100;

  return {
    currentRent,
    baseIndexIncrease,
    heatingAdjustment,
    municipalTaxIncrease: monthlyMunicipalTax,
    schoolTaxIncrease: monthlySchoolTax,
    insuranceIncrease: monthlyInsurance,
    renovationIncrease,
    maintenanceIncrease: monthlyMaintenance,
    totalIncrease,
    newRent,
    percentageIncrease,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}
