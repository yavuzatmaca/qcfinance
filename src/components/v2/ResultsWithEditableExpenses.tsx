/**
 * Results Section with Editable Expenses
 * Replaces the static expense breakdown in PremiumSimulatorV2
 */

'use client';

import { motion } from 'framer-motion';
import { 
  Home, ShoppingBag, Car, Zap, Baby, Receipt,
  Building2, Bus, Users, Info, RotateCcw, TrendingUp, Pencil
} from 'lucide-react';
import { EditableExpenseField } from './EditableExpenseField';
import { WizardState } from './types';

interface Props {
  wizardState: WizardState;
  setWizardState: (state: WizardState | ((prev: WizardState) => WizardState)) => void;
  monthlyBreakdown: {
    rent: number;
    groceries: number;
    transport: number;
    utilities: number;
    childcare: number;
    otherExpenses: number;
    totalExpenses: number;
    childBenefits: number;
  };
  defaultValues: {
    rent: number;
    groceries: number;
    transport: number;
    utilities: number;
    childcare: { [key: string]: number };
  };
}

export function ResultsWithEditableExpenses({
  wizardState,
  setWizardState,
  monthlyBreakdown,
  defaultValues
}: Props) {
  
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

  const hasCustomValues = wizardState.customExpenses && 
    Object.keys(wizardState.customExpenses).length > 0;

  return (
    <motion.div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Receipt className="w-5 h-5 text-orange-400" />
          Dépenses Mensuelles
        </h3>
        {hasCustomValues && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetToDefaults}
            className="flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-slate-300 hover:text-white transition-all"
          >
            <RotateCcw className="w-3 h-3" />
            Réinitialiser
          </motion.button>
        )}
      </div>

      {/* Info Banner */}
      <div className="mb-4 p-3 bg-blue-500/10 border border-blue-400/30 rounded-lg flex items-start gap-2">
        <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-blue-200">
          Cliquez sur l'icône <Pencil className="w-3 h-3 inline" /> pour modifier les valeurs
        </p>
      </div>

      <div className="space-y-1 text-sm">
        {/* Rent */}
        <EditableExpenseField
          label="Loyer"
          value={wizardState.customExpenses?.rent ?? defaultValues.rent}
          defaultValue={defaultValues.rent}
          icon={<Building2 className="w-4 h-4" />}
          color="text-orange-400"
          onChange={(value) => updateCustomExpense('rent', value)}
        />

        {/* Groceries */}
        <EditableExpenseField
          label="Épicerie"
          value={wizardState.customExpenses?.groceries ?? defaultValues.groceries}
          defaultValue={defaultValues.groceries}
          icon={<ShoppingBag className="w-4 h-4" />}
          color="text-yellow-400"
          onChange={(value) => updateCustomExpense('groceries', value)}
        />

        {/* Transport */}
        <EditableExpenseField
          label={
            wizardState.transportType === 'public' ? 'Transport en commun' :
            wizardState.transportType === '1-car' ? 'Voiture (1)' :
            wizardState.transportType === '2-cars' ? 'Voitures (2)' :
            'Vélo/Marche'
          }
          value={wizardState.customExpenses?.transport ?? defaultValues.transport}
          defaultValue={defaultValues.transport}
          icon={
            wizardState.transportType === 'public' ? <Bus className="w-4 h-4" /> :
            wizardState.transportType === 'bike-walk' ? <Users className="w-4 h-4" /> :
            <Car className="w-4 h-4" />
          }
          color="text-blue-400"
          onChange={(value) => updateCustomExpense('transport', value)}
          disabled={wizardState.transportType === 'bike-walk'}
        />

        {/* Car Payment (if applicable) */}
        {(wizardState.transportType === '1-car' || wizardState.transportType === '2-cars') && (
          <EditableExpenseField
            label="Paiement auto mensuel"
            value={wizardState.customExpenses?.carPayment ?? 0}
            defaultValue={0}
            icon={<Car className="w-4 h-4" />}
            color="text-blue-400"
            onChange={(value) => updateCustomExpense('carPayment', value)}
            suffix="(0$ = essence/assurance seulement)"
          />
        )}

        {/* Utilities */}
        <EditableExpenseField
          label="Services publics"
          value={wizardState.customExpenses?.utilities ?? defaultValues.utilities}
          defaultValue={defaultValues.utilities}
          icon={<Zap className="w-4 h-4" />}
          color="text-purple-400"
          onChange={(value) => updateCustomExpense('utilities', value)}
        />

        {/* Childcare by Age Group */}
        {wizardState.hasChildren && (
          <>
            {wizardState.childrenAges['0-5'] > 0 && (
              <EditableExpenseField
                label={`Garde 0-5 ans (${wizardState.childrenAges['0-5']} enfant${wizardState.childrenAges['0-5'] > 1 ? 's' : ''})`}
                value={wizardState.customExpenses?.childcare?.['0-5'] ?? defaultValues.childcare['0-5'] ?? 0}
                defaultValue={defaultValues.childcare['0-5'] ?? 0}
                icon={<Baby className="w-4 h-4" />}
                color="text-pink-400"
                onChange={(value) => updateChildcareExpense('0-5', value)}
              />
            )}

            {wizardState.childrenAges['6-12'] > 0 && (
              <EditableExpenseField
                label={`Garde 6-12 ans (${wizardState.childrenAges['6-12']} enfant${wizardState.childrenAges['6-12'] > 1 ? 's' : ''})`}
                value={wizardState.customExpenses?.childcare?.['6-12'] ?? defaultValues.childcare['6-12'] ?? 0}
                defaultValue={defaultValues.childcare['6-12'] ?? 0}
                icon={<Baby className="w-4 h-4" />}
                color="text-pink-400"
                onChange={(value) => updateChildcareExpense('6-12', value)}
              />
            )}

            {wizardState.childrenAges['13-17'] > 0 && (
              <div className="flex items-center justify-between py-2 border-b border-white/5 opacity-50">
                <span className="flex items-center gap-2 text-slate-300">
                  <Baby className="w-4 h-4 text-pink-400" />
                  Garde 13-17 ans ({wizardState.childrenAges['13-17']} enfant{wizardState.childrenAges['13-17'] > 1 ? 's' : ''})
                  <span className="text-xs bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded">
                    Pas de frais
                  </span>
                </span>
                <span className="font-semibold text-white">0$</span>
              </div>
            )}
          </>
        )}

        {/* Other Expenses (not editable) */}
        {monthlyBreakdown.otherExpenses > 0 && (
          <div className="flex items-center justify-between py-2 border-b border-white/5">
            <span className="flex items-center gap-2 text-slate-300">
              <Receipt className="w-4 h-4 text-slate-400" />
              Autres dépenses
            </span>
            <span className="font-semibold text-white">
              {monthlyBreakdown.otherExpenses.toLocaleString('fr-CA', { 
                style: 'currency', 
                currency: 'CAD', 
                maximumFractionDigits: 0 
              })}
            </span>
          </div>
        )}

        {/* Total */}
        <div className="pt-3 mt-2 border-t border-white/10 flex justify-between items-center">
          <span className="font-bold text-white">Total Dépenses</span>
          <span className="font-bold text-orange-400 text-lg">
            {monthlyBreakdown.totalExpenses.toLocaleString('fr-CA', { 
              style: 'currency', 
              currency: 'CAD', 
              maximumFractionDigits: 0 
            })}
          </span>
        </div>

        {/* Child Benefits */}
        {monthlyBreakdown.childBenefits > 0 && (
          <div className="flex items-center justify-between py-2 bg-green-500/10 rounded-lg px-3 -mx-3 mt-2">
            <span className="flex items-center gap-2 text-green-300">
              <TrendingUp className="w-4 h-4 text-green-400" />
              Allocations familiales
              {wizardState.sharedCustody && (
                <span className="text-xs bg-purple-500/20 px-2 py-0.5 rounded">
                  Garde partagée (50%)
                </span>
              )}
            </span>
            <span className="font-semibold text-green-400">
              +{monthlyBreakdown.childBenefits.toLocaleString('fr-CA', { 
                style: 'currency', 
                currency: 'CAD', 
                maximumFractionDigits: 0 
              })}
            </span>
          </div>
        )}
      </div>

      {/* Data Source Note */}
      <div className="mt-3 text-xs text-slate-400 italic text-center">
        Valeurs par défaut basées sur les moyennes 2026
      </div>
    </motion.div>
  );
}
