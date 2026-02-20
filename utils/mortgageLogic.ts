// Quebec Mortgage Calculator Logic
// Standard mortgage amortization formula

export type PaymentFrequency = 'monthly' | 'biweekly';
export type AmortizationYears = 15 | 20 | 25 | 30;

export interface MortgageInputs {
  loanAmount: number;
  interestRate: number; // Annual rate as percentage (e.g., 4.79)
  amortizationYears: AmortizationYears;
  paymentFrequency: PaymentFrequency;
}

export interface MortgageResult {
  loanAmount: number;
  interestRate: number;
  amortizationYears: number;
  paymentFrequency: PaymentFrequency;
  paymentAmount: number;
  totalPayments: number;
  totalInterest: number;
  stressTestPayment?: number;
  stressTestIncrease?: number;
  balanceOverTime: BalancePoint[];
}

export interface BalancePoint {
  year: number;
  balance: number;
}

/**
 * Calculate mortgage payment using standard amortization formula
 * M = P * [r(1+r)^n] / [(1+r)^n - 1]
 */
export function calculateMortgagePayment(
  principal: number,
  annualRate: number,
  years: number,
  frequency: PaymentFrequency
): number {
  // Convert annual rate to decimal
  const annualRateDecimal = annualRate / 100;
  
  // Calculate periodic rate and number of payments based on frequency
  let periodicRate: number;
  let numberOfPayments: number;
  
  if (frequency === 'monthly') {
    periodicRate = annualRateDecimal / 12;
    numberOfPayments = years * 12;
  } else {
    // Biweekly (26 payments per year)
    periodicRate = annualRateDecimal / 26;
    numberOfPayments = years * 26;
  }
  
  // Handle edge case: 0% interest
  if (periodicRate === 0) {
    return principal / numberOfPayments;
  }
  
  // Mortgage payment formula
  const payment = principal * 
    (periodicRate * Math.pow(1 + periodicRate, numberOfPayments)) / 
    (Math.pow(1 + periodicRate, numberOfPayments) - 1);
  
  return payment;
}

/**
 * Calculate remaining balance over time (for chart)
 */
export function calculateBalanceOverTime(
  principal: number,
  annualRate: number,
  years: number,
  paymentAmount: number,
  frequency: PaymentFrequency
): BalancePoint[] {
  const points: BalancePoint[] = [];
  const annualRateDecimal = annualRate / 100;
  const periodicRate = frequency === 'monthly' 
    ? annualRateDecimal / 12 
    : annualRateDecimal / 26;
  const paymentsPerYear = frequency === 'monthly' ? 12 : 26;
  
  let balance = principal;
  points.push({ year: 0, balance: principal });
  
  for (let year = 1; year <= years; year++) {
    for (let payment = 0; payment < paymentsPerYear; payment++) {
      const interestPayment = balance * periodicRate;
      const principalPayment = paymentAmount - interestPayment;
      balance = Math.max(0, balance - principalPayment);
      
      if (balance === 0) break;
    }
    
    points.push({ year, balance: Math.max(0, balance) });
    
    if (balance === 0) break;
  }
  
  return points;
}

export function calculateMortgage(
  inputs: MortgageInputs,
  includeStressTest: boolean = false
): MortgageResult {
  const { loanAmount, interestRate, amortizationYears, paymentFrequency } = inputs;
  
  // Calculate regular payment
  const paymentAmount = calculateMortgagePayment(
    loanAmount,
    interestRate,
    amortizationYears,
    paymentFrequency
  );
  
  // Calculate total payments and interest
  const paymentsPerYear = paymentFrequency === 'monthly' ? 12 : 26;
  const totalPayments = paymentAmount * amortizationYears * paymentsPerYear;
  const totalInterest = totalPayments - loanAmount;
  
  // Calculate balance over time for chart
  const balanceOverTime = calculateBalanceOverTime(
    loanAmount,
    interestRate,
    amortizationYears,
    paymentAmount,
    paymentFrequency
  );
  
  // Stress test: +2% rate
  let stressTestPayment: number | undefined;
  let stressTestIncrease: number | undefined;
  
  if (includeStressTest) {
    stressTestPayment = calculateMortgagePayment(
      loanAmount,
      interestRate + 2,
      amortizationYears,
      paymentFrequency
    );
    stressTestIncrease = stressTestPayment - paymentAmount;
  }
  
  return {
    loanAmount,
    interestRate,
    amortizationYears,
    paymentFrequency,
    paymentAmount,
    totalPayments,
    totalInterest,
    stressTestPayment,
    stressTestIncrease,
    balanceOverTime,
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

export function getFrequencyLabel(frequency: PaymentFrequency): string {
  return frequency === 'monthly' ? 'mois' : 'deux semaines';
}
