/**
 * Quebec Life Simulator V2 - Type Definitions
 * Type definitions for conditional wizard flow
 */

export type WizardStep = 
  | 'income'           // Step 1: Your income
  | 'partner'          // Step 2: Partner status
  | 'children'         // Step 3: Children status
  | 'children-ages'    // Step 3b: Children ages (only if has children)
  | 'city'             // Step 4: City
  | 'housing'          // Step 5: Housing
  | 'transport'        // Step 6: Transport
  | 'calculating'      // Calculation animation
  | 'results';         // Results

export type PartnerStatus = 
  | 'single'                    // Single
  | 'roommate'                  // Living with roommate(s) - shared rent
  | 'partner-working'           // Partner exists and working
  | 'partner-not-working';      // Partner exists but not working

export type HousingType = 
  | 'studio'           // Studio
  | '1br'              // 1 bedroom
  | '2br'              // 2 bedrooms
  | '3br'              // 3 bedrooms
  | '4br'              // 4 bedrooms
  | 'house';           // House

export type TransportType = 
  | 'public'           // Public transit
  | '1-car'            // 1 car
  | '2-cars'           // 2 cars
  | 'bike-walk';       // Bike/Walk

export interface WizardState {
  // Step 1: Income
  grossIncome: number;
  
  // Step 2: Partner status
  partnerStatus: PartnerStatus;
  partnerIncome?: number;  // Only if partner-working
  roommateCount?: number;  // Only if roommate (2-4 people total)
  
  // Step 3: Children status
  hasChildren: boolean;
  childrenCount: number;
  
  // Step 3b: Children ages (only if hasChildren is true)
  childrenAges: {
    '0-5': number;    // Preschool count
    '6-12': number;   // Elementary count
    '13-17': number;  // High school count
  };
  hasCPE: boolean;  // Has CPE spot (only if 0-5 age exists)
  
  // Step 4: City
  cityId: string;
  
  // Step 5: Housing
  housingType: HousingType;
  
  // Step 6: Transport
  transportType: TransportType;
}

export interface WizardFlowControl {
  currentStep: WizardStep;
  completedSteps: WizardStep[];
  canContinue: boolean;
  totalSteps: number;
  currentStepIndex: number;
}

/**
 * Helper functions to control wizard flow
 */
export class WizardFlow {
  /**
   * Determines next step based on current state
   */
  static getNextStep(currentStep: WizardStep, state: WizardState): WizardStep {
    switch (currentStep) {
      case 'income':
        return 'partner';
      
      case 'partner':
        return 'children';
      
      case 'children':
        // If has children, ask ages; otherwise go to city
        return state.hasChildren ? 'children-ages' : 'city';
      
      case 'children-ages':
        return 'city';
      
      case 'city':
        return 'housing';
      
      case 'housing':
        return 'transport';
      
      case 'transport':
        return 'calculating';
      
      case 'calculating':
        return 'results';
      
      default:
        return 'income';
    }
  }

  /**
   * Determines previous step
   */
  static getPreviousStep(currentStep: WizardStep, state: WizardState): WizardStep {
    switch (currentStep) {
      case 'partner':
        return 'income';
      
      case 'children':
        return 'partner';
      
      case 'children-ages':
        return 'children';
      
      case 'city':
        // If has children go to ages, otherwise go to children status
        return state.hasChildren ? 'children-ages' : 'children';
      
      case 'housing':
        return 'city';
      
      case 'transport':
        return 'housing';
      
      default:
        return 'income';
    }
  }

  /**
   * Calculates total steps (dynamic based on state)
   */
  static getTotalSteps(state: WizardState): number {
    let steps = 6; // income, partner, children, city, housing, transport
    
    // Add ages step if has children
    if (state.hasChildren) {
      steps += 1;
    }
    
    return steps;
  }

  /**
   * Returns current step index
   */
  static getCurrentStepIndex(currentStep: WizardStep, state: WizardState): number {
    const steps: WizardStep[] = ['income', 'partner', 'children'];
    
    if (state.hasChildren) {
      steps.push('children-ages');
    }
    
    steps.push('city', 'housing', 'transport');
    
    return steps.indexOf(currentStep);
  }

  /**
   * Checks if step is completed
   */
  static canContinue(currentStep: WizardStep, state: WizardState): boolean {
    switch (currentStep) {
      case 'income':
        return state.grossIncome >= 1000;
      
      case 'partner':
        // If partner is working, income must be entered
        if (state.partnerStatus === 'partner-working') {
          return !!state.partnerIncome && state.partnerIncome >= 0;
        }
        // If roommate, count must be selected
        if (state.partnerStatus === 'roommate') {
          return !!state.roommateCount && state.roommateCount >= 2 && state.roommateCount <= 4;
        }
        return true;
      
      case 'children':
        return true; // Can always continue
      
      case 'children-ages':
        // Total children count must match selected ages
        const totalSelected = state.childrenAges['0-5'] + 
                             state.childrenAges['6-12'] + 
                             state.childrenAges['13-17'];
        return totalSelected === state.childrenCount;
      
      case 'city':
        return !!state.cityId;
      
      case 'housing':
        return !!state.housingType;
      
      case 'transport':
        return !!state.transportType;
      
      default:
        return true;
    }
  }

  /**
   * Calculates progress percentage
   */
  static getProgress(currentStep: WizardStep, state: WizardState): number {
    if (currentStep === 'calculating' || currentStep === 'results') {
      return 100;
    }
    
    // If on income step and no income entered yet, show 0%
    if (currentStep === 'income' && state.grossIncome < 1000) {
      return 0;
    }
    
    const currentIndex = this.getCurrentStepIndex(currentStep, state);
    const totalSteps = this.getTotalSteps(state);
    
    return Math.round(((currentIndex + 1) / totalSteps) * 100);
  }
}

/**
 * Filters housing options based on situation
 */
export function getHousingOptions(state: WizardState): Array<{
  value: HousingType;
  label: string;
  description: string;
  recommended?: boolean;
}> {
  const hasPartner = state.partnerStatus !== 'single';
  const childrenCount = state.childrenCount;

  // Single and no children
  if (!hasPartner && childrenCount === 0) {
    return [
      { value: 'studio', label: 'Studio', description: 'Compact et économique' },
      { value: '1br', label: '1 chambre', description: 'Plus d\'espace', recommended: true },
      { value: '2br', label: '2 chambres', description: 'Bureau ou invités' },
    ];
  }

  // Couple and no children
  if (hasPartner && childrenCount === 0) {
    return [
      { value: '1br', label: '1 chambre', description: 'Confortable pour deux' },
      { value: '2br', label: '2 chambres', description: 'Bureau ou invités', recommended: true },
      { value: 'house', label: 'Maison', description: 'Plus d\'espace et intimité' },
    ];
  }

  // 1 child
  if (childrenCount === 1) {
    return [
      { value: '2br', label: '2 chambres', description: 'Une chambre pour l\'enfant', recommended: true },
      { value: '3br', label: '3 chambres', description: 'Bureau ou espace supplémentaire' },
      { value: 'house', label: 'Maison', description: 'Jardin et espace' },
    ];
  }

  // 2+ children
  return [
    { value: '3br', label: '3 chambres', description: 'Chambres partagées', recommended: childrenCount === 2 },
    { value: '4br', label: '4 chambres', description: 'Chambre pour chaque enfant', recommended: childrenCount >= 3 },
    { value: 'house', label: 'Maison', description: 'Idéal pour grande famille' },
  ];
}

/**
 * Filters transport options based on situation
 */
export function getTransportOptions(state: WizardState): Array<{
  value: TransportType;
  label: string;
  description: string;
  monthlyCost: number;
}> {
  const hasPartner = state.partnerStatus !== 'single';

  if (!hasPartner) {
    return [
      { value: 'public', label: 'Transport en commun', description: 'Économique et écologique', monthlyCost: 97 },
      { value: '1-car', label: 'Voiture', description: 'Essence, assurance, entretien', monthlyCost: 300 },
      { value: 'bike-walk', label: 'Vélo / Marche', description: 'Gratuit et santé', monthlyCost: 0 },
    ];
  }

  return [
    { value: 'public', label: 'Transport en commun', description: 'Deux passes mensuelles', monthlyCost: 194 },
    { value: '1-car', label: '1 voiture (partagée)', description: 'Économique pour couple', monthlyCost: 300 },
    { value: '2-cars', label: '2 voitures', description: 'Indépendance maximale', monthlyCost: 600 },
  ];
}
