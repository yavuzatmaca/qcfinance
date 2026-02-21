/**
 * Expense Customization Step
 * Allows users to override default expense calculations
 */

'use client';

import { motion } from 'framer-motion';
import { 
  Home, ShoppingBag, Car, Zap, Baby, 
  DollarSign, Info, RotateCcw 
} from 'lucide-react';
import { WizardState } from './types';
import { getCityById } from '@/src/data/quebecCosts';

interface Props {
  wizardState: WizardState;
  setWizardState: (state: WizardState | ((prev: WizardState) => WizardState)) => void;
  direction: number;
  slideVariants: any;
  defaultValues: {
    rent: number;
    groceries: number;
    transport: number;
    utilities: number;
    childcare: { [key: string]: number };
  };
}

export function ExpenseCustomizationStep({ 
  wizardState, 
  setWizardState, 
  direction, 
  slideVariants,
  defaultValues 
}: Props) {
  
  const city = getCityById(wizardState.cityId);
  
  // Get current values (custom or default)
  const currentRent = wizardState.customExpenses?.rent ?? defaultValues.rent;
  const currentGroceries = wizardState.customExpenses?.groceries ?? defaultValues.groceries;
  const currentTransport = wizardState.customExpenses?.transport ?? defaultValues.transport;
  const currentUtilities = wizardState.customExpenses?.utilities ?? defaultValues.utilities;
  const currentCarPayment = wizardState.customExpenses?.carPayment ?? 0;

  
  const updateCustomExpense = (field: string, value: number) => {
    setWizardState(prev => ({
      ...prev,
      customExpenses: {
        ...prev.customExpenses,
        [field]: value
      }
    }));
  };
  
  const updateChildcareExpense = (ageGroup: string, value: number) => {
    setWizardState(prev => ({
      ...prev,
      customExpenses: {
        ...prev.customExpenses,
        childcare: {
          ...prev.customExpenses?.childcare,
          [ageGroup]: value
        }
      }
    }));
  };
  
  const resetToDefaults = () => {
    setWizardState(prev => ({
      ...prev,
      customExpenses: undefined
    }));
  };

  return (
    <motion.div
      key="expenses"
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/50">
            <DollarSign className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Personnalisez vos dépenses
          </h2>
          <p className="text-slate-400">
            Ajustez les montants selon votre situation réelle
          </p>
        </div>


        {/* Info Banner */}
        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-400/30 rounded-xl flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-200">
            <p className="font-semibold mb-1">Valeurs par défaut basées sur {city?.name}</p>
            <p className="text-blue-300/80">Modifiez uniquement si vos coûts réels diffèrent</p>
          </div>
        </div>

        {/* Expense Fields */}
        <div className="space-y-4 mb-6">
          {/* Rent */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Home className="w-5 h-5 text-orange-400" />
                <label className="text-white font-semibold">Loyer mensuel</label>
              </div>
              <span className="text-xs text-slate-400">
                Défaut: {defaultValues.rent.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}
              </span>
            </div>
            <input
              type="number"
              value={currentRent}
              onChange={(e) => updateCustomExpense('rent', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white text-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder={defaultValues.rent.toString()}
            />
          </div>

          {/* Groceries */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-yellow-400" />
                <label className="text-white font-semibold">Épicerie mensuelle</label>
              </div>
              <span className="text-xs text-slate-400">
                Défaut: {defaultValues.groceries.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}
              </span>
            </div>
            <input
              type="number"
              value={currentGroceries}
              onChange={(e) => updateCustomExpense('groceries', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder={defaultValues.groceries.toString()}
            />
          </div>


          {/* Transport / Car Payment */}
          {wizardState.transportType !== 'bike-walk' && (
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Car className="w-5 h-5 text-blue-400" />
                  <label className="text-white font-semibold">
                    {wizardState.transportType === 'public' ? 'Transport en commun' : 'Paiement auto mensuel'}
                  </label>
                </div>
                {wizardState.transportType !== 'public' && (
                  <span className="text-xs text-slate-400">
                    Si 0$, seulement essence/assurance
                  </span>
                )}
              </div>
              
              {wizardState.transportType === 'public' ? (
                <input
                  type="number"
                  value={currentTransport}
                  onChange={(e) => updateCustomExpense('transport', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={defaultValues.transport.toString()}
                />
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">Paiement mensuel</label>
                    <input
                      type="number"
                      value={currentCarPayment}
                      onChange={(e) => updateCustomExpense('carPayment', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                  <div className="text-xs text-slate-400 bg-blue-500/10 p-2 rounded">
                    Essence + Assurance: ~{defaultValues.transport.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}/mois
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Utilities */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-400" />
                <label className="text-white font-semibold">Services publics</label>
              </div>
              <span className="text-xs text-slate-400">
                Défaut: {defaultValues.utilities.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}
              </span>
            </div>
            <input
              type="number"
              value={currentUtilities}
              onChange={(e) => updateCustomExpense('utilities', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder={defaultValues.utilities.toString()}
            />
          </div>


          {/* Childcare Costs by Age Group */}
          {wizardState.hasChildren && (
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <Baby className="w-5 h-5 text-pink-400" />
                <label className="text-white font-semibold">Frais de garde par groupe d'âge</label>
              </div>
              
              <div className="space-y-3">
                {/* 0-5 years */}
                {wizardState.childrenAges['0-5'] > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm text-slate-300">
                        0-5 ans ({wizardState.childrenAges['0-5']} enfant{wizardState.childrenAges['0-5'] > 1 ? 's' : ''})
                      </label>
                      <span className="text-xs text-slate-400">
                        Défaut: {defaultValues.childcare['0-5']?.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }) || '0$'}
                      </span>
                    </div>
                    <input
                      type="number"
                      value={wizardState.customExpenses?.childcare?.['0-5'] ?? defaultValues.childcare['0-5'] ?? 0}
                      onChange={(e) => updateChildcareExpense('0-5', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                )}
                
                {/* 6-12 years */}
                {wizardState.childrenAges['6-12'] > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm text-slate-300">
                        6-12 ans ({wizardState.childrenAges['6-12']} enfant{wizardState.childrenAges['6-12'] > 1 ? 's' : ''})
                      </label>
                      <span className="text-xs text-slate-400">
                        Défaut: {defaultValues.childcare['6-12']?.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }) || '0$'}
                      </span>
                    </div>
                    <input
                      type="number"
                      value={wizardState.customExpenses?.childcare?.['6-12'] ?? defaultValues.childcare['6-12'] ?? 0}
                      onChange={(e) => updateChildcareExpense('6-12', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                )}
                
                {/* 13-17 years - DISABLED */}
                {wizardState.childrenAges['13-17'] > 0 && (
                  <div className="opacity-50">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm text-slate-300">
                        13-17 ans ({wizardState.childrenAges['13-17']} enfant{wizardState.childrenAges['13-17'] > 1 ? 's' : ''})
                      </label>
                      <span className="text-xs text-green-400">Pas de frais de garde</span>
                    </div>
                    <input
                      type="number"
                      value={0}
                      disabled
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-500 cursor-not-allowed"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Reset Button */}
        <button
          onClick={resetToDefaults}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-300 hover:text-white transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Réinitialiser aux valeurs par défaut</span>
        </button>
      </div>
    </motion.div>
  );
}
