# Tax Constants - Centralized Configuration

## Overview

All tax-related constants for Quebec are centralized in `taxConstants.ts`. This makes annual updates simple and ensures consistency across the entire application.

## File Location

```
utils/taxConstants.ts
```

## What's Included

### 1. Tax Year
- `TAX_YEAR`: Current tax year (2026)

### 2. Basic Personal Amounts (BPA)
- `BASIC_PERSONAL_AMOUNT.FEDERAL`: $15,705
- `BASIC_PERSONAL_AMOUNT.QUEBEC`: $18,056

### 3. Federal Tax Brackets
Progressive rates from 15% to 33%:
- 15% up to $55,867
- 20.5% from $55,867 to $111,733
- 26% from $111,733 to $173,205
- 29% from $173,205 to $246,752
- 33% above $246,752

### 4. Quebec Provincial Tax Brackets
Progressive rates from 14% to 25.75%:
- 14% up to $51,780
- 19% from $51,780 to $103,545
- 24% from $103,545 to $126,000
- 25.75% above $126,000

### 5. Quebec Pension Plan (QPP/RRQ)
- Rate: 6.4%
- Maximum earnings: $68,500
- Exemption: $3,500

### 6. Quebec Parental Insurance Plan (QPIP/RQAP)
- Rate: 0.494%
- Maximum earnings: $94,000

### 7. Employment Insurance (EI/AE)
- Contribution rate: 1.27%
- Maximum earnings: $63,200
- Benefit rate: 55%
- Maximum weekly benefit: $668

### 8. Sales Tax Rates
- TPS (Federal GST): 5%
- TVQ (Quebec PST): 9.975%
- Combined: 14.975%

### 9. RRSP Limits
- Contribution rate: 18% of earned income
- Maximum contribution: $31,560

### 10. TFSA Limits
- Annual limit: $7,000

### 11. Daycare (CPE) Constants
- CPE daily rate: $9.10
- Default days per year: 260
- Tax credit rates:
  - Low income (<$36,500): 78%
  - Medium income ($36,500-$100,000): 70%
  - High income (>$100,000): 67%

### 12. Student Loan Constants
- Tax credit rate: 20% on interest paid

### 13. Rent Increase Constants (TAL)
- Base index rate: 4%
- Heating adjustments:
  - Electricity: 1.5%
  - Gas: 1.2%
  - Oil: 1.8%
- Renovation amortization: 4.8%

### 14. Transfer Tax Brackets (Taxe de Bienvenue)
- Quebec standard brackets (3 tiers)
- Montreal brackets (6 tiers for luxury properties)

### 15. Vacation Pay Constants
- Under 3 years: 4%
- 3+ years: 6%

## How to Update for 2027

When tax rates change for the new year, follow these steps:

### Step 1: Update `taxConstants.ts`

```typescript
// Change the tax year
export const TAX_YEAR = 2027;

// Update BPA if changed
export const BASIC_PERSONAL_AMOUNT = {
  FEDERAL: 16000, // Example new value
  QUEBEC: 18500,  // Example new value
} as const;

// Update brackets if changed
export const FEDERAL_TAX_BRACKETS: readonly TaxBracket[] = [
  { min: 0, max: 57000, rate: 0.15 }, // Example new values
  // ... update other brackets
] as const;

// Update contribution limits
export const QPP = {
  RATE: 0.065,      // Example new rate
  MAX_EARNINGS: 70000, // Example new max
  EXEMPTION: 3600,
} as const;

// ... update other values as needed
```

### Step 2: Test the Changes

Run the application and verify calculations are correct:

```bash
npm run dev
```

Test these calculators:
- Salary calculator (`/salaire-net-quebec`)
- Employment Insurance (`/assurance-emploi`)
- Sales tax calculator (`/tps-tvq-quebec`)
- Auto loan calculator (`/pret-auto`)
- Tip calculator (`/pourboire`)

### Step 3: Update Documentation

Update any user-facing text that mentions specific rates or limits in:
- Page components (`app/*/page.tsx`)
- Calculator components (`components/*Calculator.tsx`)

## Files That Import Tax Constants

The following files import from `taxConstants.ts`:

1. `utils/taxLogic.ts` - Core tax calculation logic
2. `utils/eiLogic.ts` - Employment Insurance calculations
3. `utils/autoLoanLogic.ts` - Auto loan with sales tax
4. `utils/tipLogic.ts` - Tip calculator with tax
5. `utils/salesTaxLogic.ts` - TPS/TVQ calculator
6. `utils/daycareLogic.ts` - Daycare cost calculator
7. `utils/studentLoanLogic.ts` - Student loan calculator
8. `utils/rentLogic.ts` - Rent increase calculator
9. `utils/transferTaxLogic.ts` - Transfer tax calculator
10. `utils/vacationPayLogic.ts` - Vacation pay calculator

All these files re-export constants for backward compatibility, so existing code continues to work without changes.

## Backward Compatibility

Legacy exports are maintained for backward compatibility:

```typescript
// Old way (still works)
import { FEDERAL_BPA, QUEBEC_BPA } from './taxLogic';

// New way (recommended)
import { BASIC_PERSONAL_AMOUNT } from './taxConstants';
```

## TypeScript Types

The file exports TypeScript types for type safety:

```typescript
import type { TaxBracket, TaxYear } from './taxConstants';
```

## Benefits

✅ **Single source of truth** - All tax data in one place  
✅ **Easy annual updates** - Change values in one file  
✅ **Type safety** - TypeScript ensures correct usage  
✅ **Consistency** - Same values across all calculators  
✅ **Documentation** - Clear comments explain each constant  
✅ **Backward compatible** - Existing code continues to work  

## Questions?

If you need to add new tax-related constants or have questions about the structure, refer to this README or check the inline comments in `taxConstants.ts`.
