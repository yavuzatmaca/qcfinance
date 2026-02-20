'use client';

import { useState, useEffect } from 'react';
import { Trash2, Calendar, TrendingUp, MapPin } from 'lucide-react';
import { getSavedScenarios, deleteScenario, type SavedScenario } from '@/utils/scenarioStorage';

interface SavedScenariosProps {
  onLoadScenario: (scenario: SavedScenario) => void;
}

export default function SavedScenarios({ onLoadScenario }: SavedScenariosProps) {
  const [scenarios, setScenarios] = useState<SavedScenario[]>([]);
  const [showConfirm, setShowConfirm] = useState<string | null>(null);

  useEffect(() => {
    loadScenarios();
  }, []);

  const loadScenarios = () => {
    setScenarios(getSavedScenarios());
  };

  const handleDelete = (id: string) => {
    deleteScenario(id);
    loadScenarios();
    setShowConfirm(null);
  };

  const handleLoad = (scenario: SavedScenario) => {
    onLoadScenario(scenario);
  };

  if (scenarios.length === 0) {
    return null;
  }

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-purple-400" />
        Scénarios Sauvegardés ({scenarios.length}/10)
      </h3>
      
      <div className="space-y-3">
        {scenarios.map((scenario) => (
          <div
            key={scenario.id}
            className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-purple-400/30 transition-all group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-white mb-2 truncate">{scenario.name}</h4>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-blue-400" />
                    <span>{scenario.cityName}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-400" />
                    <span>{scenario.grossSalary.toLocaleString('fr-CA')}$</span>
                  </div>
                  <div className={`col-span-2 font-semibold ${
                    scenario.disposableIncome >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    Économies: {scenario.disposableIncome.toLocaleString('fr-CA')}$/mois
                  </div>
                </div>
                
                <div className="flex gap-2 mt-2">
                  {scenario.hasPartner && (
                    <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
                      En couple
                    </span>
                  )}
                  {scenario.hasCar && (
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">
                      Avec auto
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleLoad(scenario)}
                  className="px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg text-sm font-semibold transition-all"
                >
                  Charger
                </button>
                
                {showConfirm === scenario.id ? (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleDelete(scenario.id)}
                      className="px-2 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-semibold transition-all"
                    >
                      Oui
                    </button>
                    <button
                      onClick={() => setShowConfirm(null)}
                      className="px-2 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition-all"
                    >
                      Non
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowConfirm(scenario.id)}
                    className="p-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
