// Credit Card Debt Payoff Calculator Logic

export interface DebtCalculationResult {
  balance: number;
  interestRate: number;
  monthlyPayment: number;
  monthsToPayoff: number;
  yearsToPayoff: number;
  totalInterestPaid: number;
  totalAmountPaid: number;
  isPayoffPossible: boolean;
  warningMessage?: string;
}

export function calculateDebtPayoff(
  balance: number,
  annualInterestRate: number,
  monthlyPayment: number
): DebtCalculationResult {
  // Convert annual rate to monthly rate
  const monthlyRate = annualInterestRate / 100 / 12;
  
  // Calculate minimum payment needed to cover interest
  const minimumInterestPayment = balance * monthlyRate;
  
  // Check if payment is too low
  if (monthlyPayment <= minimumInterestPayment) {
    return {
      balance,
      interestRate: annualInterestRate,
      monthlyPayment,
      monthsToPayoff: 0,
      yearsToPayoff: 0,
      totalInterestPaid: 0,
      totalAmountPaid: 0,
      isPayoffPossible: false,
      warningMessage: "Vous ne rembourserez jamais ce montant avec ce paiement."
    };
  }
  
  // Calculate payoff using amortization formula
  let remainingBalance = balance;
  let totalInterest = 0;
  let months = 0;
  const maxMonths = 600; // 50 years safety limit
  
  while (remainingBalance > 0.01 && months < maxMonths) {
    const interestCharge = remainingBalance * monthlyRate;
    const principalPayment = monthlyPayment - interestCharge;
    
    totalInterest += interestCharge;
    remainingBalance -= principalPayment;
    months++;
    
    // If last payment, adjust
    if (remainingBalance < monthlyPayment && remainingBalance > 0) {
      totalInterest += remainingBalance * monthlyRate;
      remainingBalance = 0;
    }
  }
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  return {
    balance,
    interestRate: annualInterestRate,
    monthlyPayment,
    monthsToPayoff: months,
    yearsToPayoff: years + (remainingMonths > 0 ? remainingMonths / 12 : 0),
    totalInterestPaid: totalInterest,
    totalAmountPaid: balance + totalInterest,
    isPayoffPossible: true
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatTimeToPayoff(years: number, months: number): string {
  if (years === 0) {
    return `${months} mois`;
  } else if (months === 0) {
    return years === 1 ? `1 an` : `${years} ans`;
  } else {
    const yearText = years === 1 ? '1 an' : `${years} ans`;
    const monthText = `${months} mois`;
    return `${yearText} et ${monthText}`;
  }
}
