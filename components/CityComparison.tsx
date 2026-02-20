'use client';

import { useState } from 'react';
import { X, TrendingUp, TrendingDown } from 'lucide-react';
import { QUEBEC_CITIES } from '@/src/data/quebecCosts';
import { useSimulator } from '@/src/hooks/useSimulator';

interface CityComparisonProps {
  currentCityId: string;
  grossSalary: number;
  hasPartner: boolean;
  hasCar: boolean;
  onClose: () => void;
}

export default function CityComparison({ currentCityId, grossSalary, hasPartner, hasCar, onClose }: CityComparisonProps) {
  const [selectedCities, setSelectedCities] = useState<string[]>([currentCityId]);
  
  const toggleCity = (cityId: string) => {
    if (selectedCities.includes(cityId)) {
      if (selectedCities.length > 1) {
        setSelectedCities(selectedCities.filter(id => id !== cityId));
      }
    } else {
      if (selectedCities.length < 4) {
        setSelectedCities([...selectedCities, cityId]);
      }
    }
  };

  // Pre-calculate all city results (hooks must be called unconditionally)
  const allResults = QUEBEC_CITIES.map(city => ({
    cityId: city.id,
    result: useSimulator(grossSalary, city.id, hasPartner, hasCar)
  }));

  // Filter to only selected cities
  const results = allResults.filter(r => selectedCities.includes(r.cityId) && r.result !== null);

  const bestSavings = results.length > 0 ? Math.max(...results.map(r => r.result!.disposableIncome)) : 0;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen p-4 flex items-start justify-center py-8">
        <div className="bg-slate-900 rounded-2xl max-w-6xl w-full border border-white/10 relative">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Comparaison des Villes</h2>
              <p className="text-sm text-slate-400">Sélectionnez jusqu'à 4 villes à comparer</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-all"
            >
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>

          {/* City Selector */}
          <div className="p-6 border-b border-white/10">
            <div className="flex flex-wrap gap-2">
              {QUEBEC_CITIES.map(city => (
                <button
                  key={city.id}
                  onClick={() => toggleCity(city.id)}
                  disabled={!selectedCities.includes(city.id) && selectedCities.length >= 4}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedCities.includes(city.id)
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>

          {/* Comparison Grid */}
          <div className="p-6">
            <div className={`grid gap-4 ${
              selectedCities.length === 1 ? 'grid-cols-1' :
              selectedCities.length === 2 ? 'grid-cols-2' :
              selectedCities.length === 3 ? 'grid-cols-3' :
              'grid-cols-2 md:grid-cols-4'
            }`}>
              {results.map(({ cityId, result }) => {
                if (!result) return null;
                
                const isBest = result.disposableIncome === bestSavings;
                const isCurrent = cityId === currentCityId;
                
                return (
                  <div
                    key={cityId}
                    className={`bg-white/5 rounded-xl p-4 border-2 transition-all ${
                      isBest ? 'border-green-400/50' :
                      isCurrent ? 'border-blue-400/50' :
                      'border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-white">{result.city.name}</h3>
                      {isBest && (
                        <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                          Meilleur
                        </span>
                      )}
                      {isCurrent && !isBest && (
                        <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                          Actuel
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-slate-300">
                        <span>Loyer:</span>
                        <span className="font-bold text-white">
                          {(hasPartner ? result.city.avgRent * 0.5 : result.city.avgRent).toLocaleString('fr-CA')}$
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-slate-300">
                        <span>Dépenses:</span>
                        <span className="font-bold text-white">
                          {result.monthlyExpenses.toLocaleString('fr-CA')}$
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-slate-300 pt-2 border-t border-white/10">
                        <span>Économies:</span>
                        <div className="text-right">
                          <div className={`font-bold ${result.disposableIncome >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {result.disposableIncome.toLocaleString('fr-CA')}$
                          </div>
                          {!isCurrent && results[0].result && (
                            <div className="text-xs mt-1">
                              {result.disposableIncome > results[0].result.disposableIncome ? (
                                <span className="text-green-400 flex items-center gap-1 justify-end">
                                  <TrendingUp className="w-3 h-3" />
                                  +{(result.disposableIncome - results[0].result.disposableIncome).toLocaleString('fr-CA')}$
                                </span>
                              ) : result.disposableIncome < results[0].result.disposableIncome ? (
                                <span className="text-red-400 flex items-center gap-1 justify-end">
                                  <TrendingDown className="w-3 h-3" />
                                  {(result.disposableIncome - results[0].result.disposableIncome).toLocaleString('fr-CA')}$
                                </span>
                              ) : null}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
