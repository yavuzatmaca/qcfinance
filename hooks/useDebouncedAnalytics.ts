import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for debounced analytics tracking
 * 
 * Prevents event spam by waiting for user inactivity before firing GA events.
 * 
 * @param delay - Milliseconds to wait after last change (default: 800ms)
 * @returns trackEvent function that can be called with event data
 * 
 * @example
 * const trackCalculation = useDebouncedAnalytics(800);
 * 
 * // In your input handler:
 * onChange={(e) => {
 *   setValue(e.target.value);
 *   trackCalculation('calculator_input_change', { field: 'salary', value: e.target.value });
 * }}
 */
export function useDebouncedAnalytics(delay: number = 800) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const trackEvent = useCallback((eventName: string, eventParams?: Record<string, any>) => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      // Check if gtag is available (Google Analytics)
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, eventParams);
      }
    }, delay);
  }, [delay]);

  return trackEvent;
}

/**
 * Hook specifically for tracking calculator interactions
 * Only fires when user stops interacting for 800ms
 * 
 * @example
 * const trackCalculatorChange = useCalculatorTracking('mortgage_calculator');
 * 
 * onChange={(e) => {
 *   setValue(e.target.value);
 *   trackCalculatorChange({ field: 'loan_amount', value: e.target.value });
 * }}
 */
export function useCalculatorTracking(calculatorName: string) {
  const trackEvent = useDebouncedAnalytics(800);

  return useCallback((params: Record<string, any>) => {
    trackEvent('calculator_interaction', {
      calculator: calculatorName,
      ...params,
    });
  }, [calculatorName, trackEvent]);
}

/**
 * Hook for tracking button clicks (no debounce needed)
 * Use this for "Calculate" or "Submit" buttons
 * 
 * @example
 * const trackCalculation = useButtonTracking('mortgage_calculator');
 * 
 * onClick={() => {
 *   handleCalculate();
 *   trackCalculation('calculate_clicked', { loan_amount: loanAmount });
 * }}
 */
export function useButtonTracking(calculatorName: string) {
  return useCallback((action: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', action, {
        calculator: calculatorName,
        ...params,
      });
    }
  }, [calculatorName]);
}
