# Quebec Tax Calculation Engine - Documentation

## Overview
Comprehensive tax calculation engine for Quebec residents based on 2025/2026 tax rates and regulations.

## Files Structure

```
src/
├── lib/
│   └── calculations.ts          # Core tax calculation engine
├── data/
│   └── quebecCosts.ts          # Quebec cities cost of living data
└── hooks/
    └── useSimulator.ts         # React hook for simulator logic
```

## Tax Rates (2025/2026)

### Federal Tax Brackets
| Income Range | Rate |
|--------------|------|
| $0 - $55,867 | 15% |
| $55,867 - $111,733 | 20.5% |
| $111,733 - $173,205 | 26% |
| $173,205 - $246,752 | 29% |
| $246,752+ | 33% |

### Quebec Provincial Tax Brackets
| Income Range | Rate |
|--------------|------|
| $0 - $51,780 | 14% |
| $51,780 - $103,545 | 19% |
| $103,545 - $126,000 | 24% |
| $126,000+ | 25.75% |

### Basic Personal Amounts (BPA)
- **Federal BPA:** $15,705
- **Quebec BPA:** $18,056

## Mandatory Deductions

### QPP (Quebec Pension Plan / RRQ)
- **Rate:** 6.4%
- **Exemption:** $3,500
- **Max Pensionable Earnings:** $68,500
- **Max Contribution:** $4,160.00

### QPIP (Quebec Parental Insurance / RQAP)
- **Employee Rate:** 0.494%
- **Max Insurable Earnings:** $94,000
- **Max Contribution:** $464.36

### EI (Employment Insurance / AE)
- **Quebec Rate:** 1.27% (lower than other provinces)
- **Max Insurable Earnings:** $63,200
- **Max Contribution:** $802.64

## Usage Examples

### Basic Tax Calculation

```typescript
import { calculateQuebecTax, formatCurrency } from '@/src/lib/calculations';

const result = calculateQuebecTax(75000);

console.log(`Gross Annual: ${formatCurrency(result.grossAnnual)}`);
console.log(`Net Monthly: ${formatCurrency(result.netMonthly)}`);
console.log(`Effective Tax Rate: ${result.effectiveTaxRate}%`);
```

### Using the Simulator Hook

```typescript
import { useSimulator } from '@/src/hooks/useSimulator';

function MyComponent() {
  const result = useSimulator(75000, 'montreal');
  
  if (!result) return <div>Loading...</div>;
  
  return (
    <div>
      <h2>Net Monthly: {formatCurrency(result.tax.netMonthly)}</h2>
      <h2>Disposable Income: {formatCurrency(result.disposableIncome)}</h2>
      <h2>Savings Rate: {result.savingsRate.toFixed(1)}%</h2>
    </div>
  );
}
```

### Generating Insights

```typescript
import { useSimulator, generateInsights } from '@/src/hooks/useSimulator';

const result = useSimulator(75000, 'montreal');
const insights = generateInsights(result);

insights.forEach(insight => {
  console.log(`${insight.icon} ${insight.title}`);
  console.log(insight.description);
});
```

## City Data

### Available Cities
1. **Montreal** - Most expensive, largest city
2. **Quebec City** - Capital, moderate costs
3. **Laval** - Suburban, connected to Montreal
4. **Gatineau** - Near Ottawa, moderate costs
5. **Longueuil** - South shore of Montreal
6. **Sherbrooke** - Eastern Townships, affordable
7. **Saguenay** - Northern Quebec, very affordable
8. **Levis** - Across from Quebec City
9. **Trois-Rivières** - Central Quebec, affordable
10. **Terrebonne** - North of Montreal

### Cost Components
Each city includes:
- **avgRent:** 1-bedroom apartment in city center
- **monthlyGrocery:** Average for single person
- **utilities:** Electricity, heating, water, garbage
- **transportation:** Monthly public transit pass

### Example City Data

```typescript
import { getCityById, calculateMonthlyCityExpenses } from '@/src/data/quebecCosts';

const montreal = getCityById('montreal');
const totalExpenses = calculateMonthlyCityExpenses(montreal);

console.log(`Montreal Monthly Expenses: ${formatCurrency(totalExpenses)}`);
// Output: Montreal Monthly Expenses: $2,417
```

## Calculation Logic

### Net Income Calculation Flow

```
Gross Annual Salary
    ↓
- Federal Tax (after BPA)
- Provincial Tax (after BPA)
- QPP Contribution
- QPIP Contribution
- EI Contribution
    ↓
= Net Annual Income
    ↓
÷ 12
    ↓
= Net Monthly Income
```

### Disposable Income Calculation

```
Net Monthly Income
    ↓
- Rent
- Groceries
- Utilities
- Transportation
    ↓
= Disposable Income (Savings)
```

## Financial Health Metrics

### Savings Rate Categories
- **Excellent:** ≥30% of net income
- **Good:** 10-30% of net income
- **Tight:** <10% of net income
- **Deficit:** Negative (expenses > income)

### Rent-to-Income Ratio
- **Affordable:** <30% of gross income
- **Stretched:** 30-35% of gross income
- **Unaffordable:** >35% of gross income

## API Reference

### `calculateQuebecTax(grossAnnualSalary: number): TaxCalculationResult`
Main tax calculation function.

**Returns:**
- `grossAnnual`: Input salary
- `federalTax`: Federal tax amount
- `provincialTax`: Quebec provincial tax
- `qppContribution`: QPP/RRQ contribution
- `qpipContribution`: QPIP/RQAP contribution
- `eiContribution`: EI/AE contribution
- `netAnnual`: Annual net income
- `netMonthly`: Monthly net income
- `effectiveTaxRate`: Overall tax rate (%)
- `marginalTaxRate`: Rate on next dollar earned (%)

### `useSimulator(grossSalary: number, cityId: string): SimulatorResult | null`
React hook for complete simulation.

**Returns:**
- `tax`: Complete tax calculation
- `city`: Selected city data
- `disposableIncome`: Money left after expenses
- `savingsRate`: Percentage of income saved
- `financialHealth`: Health status and recommendations
- `breakdown`: Data for charts

### `generateInsights(result: SimulatorResult | null): Insight[]`
Generate smart financial insights.

**Returns array of:**
- `icon`: Emoji icon
- `title`: Insight title
- `description`: Detailed description
- `type`: 'success' | 'warning' | 'info' | 'danger'

## Testing Examples

### Test Case 1: Entry Level ($45,000)
```typescript
const result = calculateQuebecTax(45000);
// Expected: ~$34,500 net annual
// Effective rate: ~23%
```

### Test Case 2: Mid-Career ($75,000)
```typescript
const result = calculateQuebecTax(75000);
// Expected: ~$54,000 net annual
// Effective rate: ~28%
```

### Test Case 3: Senior ($120,000)
```typescript
const result = calculateQuebecTax(120000);
// Expected: ~$80,000 net annual
// Effective rate: ~33%
```

## Accuracy Notes

1. **Simplified Calculations:** Does not account for:
   - Tax credits (childcare, tuition, etc.)
   - RRSP contributions
   - Capital gains
   - Self-employment income

2. **Assumptions:**
   - Single person with no dependents
   - Employee (not self-employed)
   - No additional income sources
   - Standard deductions only

3. **Use Case:** Best for quick estimates and comparisons. For precise tax planning, consult a tax professional.

## Updates

Tax rates and contribution limits are updated annually. Current version reflects **2025/2026** rates.

**Last Updated:** February 2026
**Next Review:** January 2027

## References

- [Revenu Québec - Tax Rates](https://www.revenuquebec.ca)
- [Canada Revenue Agency - Tax Brackets](https://www.canada.ca/en/revenue-agency)
- [Retraite Québec - QPP Rates](https://www.retraitequebec.gouv.qc.ca)
- [CNESST - QPIP Information](https://www.cnesst.gouv.qc.ca)
