/**
 * Bank of Canada Valet API Integration
 * Fetches real-time market data for the ticker
 * 
 * API Documentation: https://www.bankofcanada.ca/valet/docs
 * 
 * Series IDs:
 * - V39079: Policy Interest Rate (Taux Directeur) - Updated daily
 * 
 * Note: Other rates use fallback values as they update less frequently
 * or require complex calculations from multiple series.
 */

export interface MarketRate {
  label: string;
  value: string;
  change: string;
}

interface ValetObservation {
  d: string; // Date
  [key: string]: {
    v: string; // Value
  } | string;
}

interface ValetResponse {
  observations: ValetObservation[];
}

/**
 * Fetches real-time market data from Bank of Canada Valet API
 * Falls back to static data if API fails
 */
export async function getMarketData(): Promise<MarketRate[]> {
  try {
    // Fetch only the policy rate (most frequently updated and reliable)
    const apiUrl = `https://www.bankofcanada.ca/valet/observations/V39079/json?recent=2`;
    
    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Bank of Canada API error: ${response.status}`);
    }

    const data: ValetResponse = await response.json();
    
    if (!data.observations || data.observations.length === 0) {
      throw new Error('No observations returned from API');
    }

    // Get latest observation
    const latest = data.observations[0];
    const previous = data.observations.length > 1 ? data.observations[1] : null;

    // Parse policy rate
    const policyRate = parseFloat((latest.V39079 as any)?.v || '0');
    const prevPolicyRate = previous ? parseFloat((previous.V39079 as any)?.v || '0') : policyRate;
    const policyChange = policyRate - prevPolicyRate;

    // Format change string
    const formatChange = (change: number): string => {
      if (Math.abs(change) < 0.01) return 'stable';
      return change > 0 ? `+${change.toFixed(2)}%` : `${change.toFixed(2)}%`;
    };

    return [
      {
        label: 'Taux Directeur',
        value: `${policyRate.toFixed(2)}%`,
        change: formatChange(policyChange),
      },
      {
        label: 'Hypothèque 5 ans',
        value: '4.59%',
        change: '-0.30%', // Baisse récente (Jan 2025)
      },
      {
        label: 'Inflation QC',
        value: '1.9%',
        change: '+0.1%', // Légère hausse (Jan 2025)
      },
      {
        label: 'Chômage',
        value: '5.4%',
        change: '-0.2%', // En baisse (Jan 2025)
      },
    ];
  } catch (error) {
    // Fallback to static data (Updated: January 2025)
    return [
      { label: 'Taux Directeur', value: '2.25%', change: '-0.25%' },
      { label: 'Hypothèque 5 ans', value: '4.59%', change: '-0.30%' },
      { label: 'Inflation QC', value: '1.9%', change: '+0.1%' },
      { label: 'Chômage', value: '5.4%', change: '-0.2%' },
    ];
  }
}
