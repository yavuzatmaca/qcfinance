'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import {
  Home, ShoppingBag, TrendingUp, TrendingDown,
  PiggyBank, Wallet, Lightbulb, Users, Baby, Car, Zap,
  Receipt, Utensils, Bus, Building2, Sparkles,
  AlertTriangle, AlertCircle, Coins, UserPlus, BarChart3,
  PartyPopper, Sparkle, ThumbsUp, AlertOctagon, Edit3, Lock
} from 'lucide-react';
import { WizardState } from './types';
import { useSimulatorV2Enhanced, generateInsightsV2, type ManualOverrides } from '../../hooks/v2/useSimulatorV2Enhanced';
import SimulatorActionsV2 from '@/components/v2/SimulatorActionsV2';
import AffiliateRecommendationsV2 from '@/components/v2/AffiliateRecommendationsV2';

interface Props {
  wizardState: WizardState;
  onReset: () => void;
}

// Icon mapping for insights
const iconMap: Record<string, any> = {
  TrendingUp,
  AlertTriangle,
  AlertCircle,
  Home,
  Coins,
  Users,
  UserPlus,
  Baby,
  BarChart3,
};

// Animated Counter Component
function AnimatedCounter({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  return (
    <span>
      {prefix}
      {Math.round(value).toLocaleString('fr-CA')}
      {suffix}
    </span>
  );
}

export default function PremiumSimulatorV2Enhanced({ wizardState, onReset }: Props) {
  // Manual override states
  const [manualOverrides, setManualOverrides] = useState({
    rent: null as number | null,
    groceries: null as number | null,
    utilities: null as number | null,
    transport: null as number | null,
    carFinancing: 0,
    childcare: {} as Record<number, number | null>, // Per child overrides
  });

  // Shared custody toggle
  const [sharedCustody, setSharedCustody] = useState(false);

  const result = useSimulatorV2Enhanced(wizardState, manualOverrides, sharedCustody);
  const insights = result ? generateInsightsV2(result) : [];
  const [showComparison, setShowComparison] = React.useState(false);
  const [refreshScenarios, setRefreshScenarios] = React.useState(0);

  // Edit mode states
  const [editingField, setEditingField] = useState<string | null>(null);

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-radial from-slate-900 via-slate-950 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Chargement des résultats...</div>
      </div>
    );
  }

  // Chart data with modern color palette
  const donutData = [
    { name: 'Loyer', value: result.monthlyBreakdown.rent * 12, color: '#f59e0b' },
    { name: 'Épicerie', value: result.monthlyBreakdown.groceries * 12, color: '#fbbf24' },
    { name: 'Transport', value: result.monthlyBreakdown.transport * 12, color: '#60a5fa' },
    { name: 'Services publics', value: result.monthlyBreakdown.utilities * 12, color: '#a78bfa' },
    { name: 'Garde d\'enfants', value: result.monthlyBreakdown.childcare * 12, color: '#f472b6' },
    { name: 'Impôts', value: result.combinedTax.totalTax, color: '#3b82f6' },
    { name: result.monthlyBreakdown.disposable >= 0 ? 'Économies' : 'Déficit', 
      value: Math.abs(result.monthlyBreakdown.disposable * 12), 
      color: result.monthlyBreakdown.disposable >= 0 ? '#10b981' : '#ef4444' 
    },
  ].filter(item => item.value > 0);

  const barData = [
    { name: 'Loyer', value: result.monthlyBreakdown.rent, color: '#f59e0b' },
    { name: 'Épicerie', value: result.monthlyBreakdown.groceries, color: '#fbbf24' },
    { name: 'Transport', value: result.monthlyBreakdown.transport, color: '#60a5fa' },
    { name: 'Services', value: result.monthlyBreakdown.utilities, color: '#a78bfa' },
    { name: 'Garde', value: result.monthlyBreakdown.childcare, color: '#f472b6' },
  ].filter(item => item.value > 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900/95 backdrop-blur-xl px-3 py-2 rounded-lg shadow-xl border border-white/10"
        >
          <p className="text-xs font-medium text-slate-300 mb-0.5">{data.name}</p>
          <p className="text-lg font-bold text-blue-400">
            {data.value.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}
          </p>
        </motion.div>
      );
    }
    return null;
  };

  // Handle manual override input
  const handleOverrideChange = (field: string, value: string) => {
    const numValue = value === '' ? null : parseFloat(value);
    setManualOverrides(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  // Handle childcare override per child
  const handleChildcareOverride = (childIndex: number, value: string) => {
    const numValue = value === '' ? null : parseFloat(value);
    setManualOverrides(prev => ({
      ...prev,
      childcare: {
        ...prev.childcare,
        [childIndex]: numValue
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-radial from-slate-900 via-slate-950 to-slate-950 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/50">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-1">
                  Vos Résultats Personnalisés
                </h1>
                <p className="text-slate-400">
                  Calculé selon votre situation - {result.city.name}
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onReset}
              className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white hover:bg-white/10 hover:border-white/20 transition-all font-semibold"
            >
              Nouvelle Simulation
            </motion.button>
          </div>
        </div>

        {/* Household Summary with Shared Custody Toggle */}
        <div className="mb-6 p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl">
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
            <div className="flex items-center gap-2 bg-blue-500/10 px-3 py-2 rounded-lg">
              <Users className="w-4 h-4 text-blue-400" />
              <span>
                {result.household.isRoommate 
                  ? `Colocation (${result.household.roommateCount} personnes)`
                  : `${result.household.adults} adulte${result.household.adults > 1 ? 's' : ''}`
                }
              </span>
            </div>
            {result.household.children > 0 && (
              <>
                <div className="flex items-center gap-2 bg-pink-500/10 px-3 py-2 rounded-lg">
                  <Baby className="w-4 h-4 text-pink-400" />
                  <span>{result.household.children} enfant{result.household.children > 1 ? 's' : ''}</span>
                </div>
                {/* Shared Custody Toggle */}
                <div className="flex items-center gap-2 bg-purple-500/10 px-3 py-2 rounded-lg">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sharedCustody}
                      onChange={(e) => setSharedCustody(e.target.checked)}
                      className="w-4 h-4 rounded border-purple-400 text-purple-500 focus:ring-purple-500"
                    />
                    <span className="text-purple-300 font-medium">Garde partagée</span>
                  </label>
                </div>
              </>
            )}
            <div className="flex items-center gap-2 bg-orange-500/10 px-3 py-2 rounded-lg">
              <Building2 className="w-4 h-4 text-orange-400" />
              <span>{result.city.name}</span>
            </div>
            <div className="flex items-center gap-2 bg-green-500/10 px-3 py-2 rounded-lg">
              {result.transport.type === 'public' ? (
                <Bus className="w-4 h-4 text-green-400" />
              ) : result.transport.type === 'bike-walk' ? (
                <Users className="w-4 h-4 text-green-400" />
              ) : (
                <Car className="w-4 h-4 text-green-400" />
              )}
              <span>{result.transport.type === 'public' ? 'Transport en commun' : 
                     result.transport.type === '1-car' ? '1 voiture' :
                     result.transport.type === '2-cars' ? '2 voitures' : 'Vélo/Marche'}</span>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT SIDEBAR - Stats */}
          <div className="lg:col-span-4 space-y-6">
            {/* Net Income */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-lg border border-blue-400/30 rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-blue-200 uppercase tracking-wider font-semibold">Revenu Net</span>
                <Wallet className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                <AnimatedCounter value={result.monthlyBreakdown.income} prefix="$" />
              </div>
              <div className="text-sm text-blue-200">par mois</div>
            </motion.div>

            {/* Disposable Income */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`backdrop-blur-lg border-2 rounded-2xl p-6 shadow-xl transition-all ${
                result.monthlyBreakdown.disposable >= 0 
                  ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400/30' 
                  : 'bg-gradient-to-br from-red-500/20 to-orange-500/20 border-red-400/30'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-sm uppercase tracking-wider font-semibold ${
                  result.monthlyBreakdown.disposable >= 0 ? 'text-green-200' : 'text-red-200'
                }`}>
                  Disponible
                </span>
                {result.monthlyBreakdown.disposable >= 0 ? (
                  <TrendingUp className="w-5 h-5 text-green-400" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-400" />
                )}
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                <AnimatedCounter value={result.monthlyBreakdown.disposable} prefix="$" />
              </div>
              <div className={`text-sm mb-3 ${
                result.monthlyBreakdown.disposable >= 0 ? 'text-green-200' : 'text-red-200'
              }`}>
                par mois
              </div>
              
              {/* Psychological Message */}
              <div className={`mt-3 pt-3 border-t ${
                result.monthlyBreakdown.disposable >= 0 ? 'border-green-400/20' : 'border-red-400/20'
              }`}>
                <div className={`flex items-center gap-2 ${
                  result.monthlyBreakdown.disposable >= 0 ? 'text-green-100' : 'text-red-100'
                }`}>
                  {result.financialHealth.savingsRate >= 30 ? (
                    <>
                      <div className="w-5 h-5 rounded-lg bg-green-500/30 flex items-center justify-center flex-shrink-0">
                        <PartyPopper className="w-3 h-3 text-green-300" />
                      </div>
                      <p className="text-xs font-medium">
                        Excellent! Votre capacité d'épargne est très élevée.
                      </p>
                    </>
                  ) : result.financialHealth.savingsRate >= 20 ? (
                    <>
                      <div className="w-5 h-5 rounded-lg bg-green-500/30 flex items-center justify-center flex-shrink-0">
                        <Sparkle className="w-3 h-3 text-green-300" />
                      </div>
                      <p className="text-xs font-medium">
                        Très bien! Vous avez un bon potentiel d'épargne.
                      </p>
                    </>
                  ) : result.financialHealth.savingsRate >= 10 ? (
                    <>
                      <div className="w-5 h-5 rounded-lg bg-yellow-500/30 flex items-center justify-center flex-shrink-0">
                        <ThumbsUp className="w-3 h-3 text-yellow-300" />
                      </div>
                      <p className="text-xs font-medium text-yellow-100">
                        Correct, mais essayez d'économiser davantage.
                      </p>
                    </>
                  ) : result.financialHealth.savingsRate >= 0 ? (
                    <>
                      <div className="w-5 h-5 rounded-lg bg-orange-500/30 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-3 h-3 text-orange-300" />
                      </div>
                      <p className="text-xs font-medium text-orange-100">
                        Attention, votre budget est serré. Réduisez vos dépenses.
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="w-5 h-5 rounded-lg bg-red-500/30 flex items-center justify-center flex-shrink-0">
                        <AlertOctagon className="w-3 h-3 text-red-300" />
                      </div>
                      <p className="text-xs font-medium">
                        Budget déficitaire! Vos dépenses dépassent vos revenus.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Expenses Breakdown with Manual Overrides */}
            <motion.div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Receipt className="w-5 h-5 text-orange-400" />
                Dépenses Mensuelles
                <span className="text-xs text-slate-400 ml-auto">(Cliquez pour modifier)</span>
              </h3>
              <div className="space-y-3 text-sm">
                {/* Rent - Editable */}
                <div className="flex items-center justify-between py-2 border-b border-white/5 group">
                  <span className="flex items-center gap-2 text-slate-300">
                    <Building2 className="w-4 h-4 text-orange-400" />
                    Loyer
                  </span>
                  <div className="flex items-center gap-2">
                    {editingField === 'rent' ? (
                      <input
                        type="number"
                        value={manualOverrides.rent ?? result.monthlyBreakdown.rent}
                        onChange={(e) => handleOverrideChange('rent', e.target.value)}
                        onBlur={() => setEditingField(null)}
                        autoFocus
                        className="w-24 px-2 py-1 bg-slate-800 border border-blue-400 rounded text-white text-right"
                      />
                    ) : (
                      <>
                        <span className="font-semibold text-white">
                          {result.monthlyBreakdown.rent.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}
                        </span>
                        <button
                          onClick={() => setEditingField('rent')}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Edit3 className="w-3 h-3 text-blue-400" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Groceries - Editable */}
                <div className="flex items-center justify-between py-2 border-b border-white/5 group">
                  <span className="flex items-center gap-2 text-slate-300">
                    <ShoppingBag className="w-4 h-4 text-yellow-400" />
                    Épicerie
                  </span>
                  <div className="flex items-center gap-2">
                    {editingField === 'groceries' ? (
                      <input
                        type="number"
                        value={manualOverrides.groceries ?? result.monthlyBreakdown.groceries}
                        onChange={(e) => handleOverrideChange('groceries', e.target.value)}
                        onBlur={() => setEditingField(null)}
                        autoFocus
                        className="w-24 px-2 py-1 bg-slate-800 border border-blue-400 rounded text-white text-right"
                      />
                    ) : (
                      <>
                        <span className="font-semibold text-white">
                          {result.monthlyBreakdown.groceries.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}
                        </span>
                        <button
                          onClick={() => setEditingField('groceries')}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Edit3 className="w-3 h-3 text-blue-400" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Transport - Editable with Car Financing */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 border-b border-white/5 group">
                    <span className="flex items-center gap-2 text-slate-300">
                      {wizardState.transportType === 'public' ? (
                        <Bus className="w-4 h-4 text-blue-400" />
                      ) : wizardState.transportType === 'bike-walk' ? (
                        <Users className="w-4 h-4 text-blue-400" />
                      ) : (
                        <Car className="w-4 h-4 text-blue-400" />
                      )}
                      Transport
                    </span>
                    <div className="flex items-center gap-2">
                      {editingField === 'transport' ? (
                        <input
                          type="number"
                          value={manualOverrides.transport ?? result.monthlyBreakdown.transport}
                          onChange={(e) => handleOverrideChange('transport', e.target.value)}
                          onBlur={() => setEditingField(null)}
                          autoFocus
                          className="w-24 px-2 py-1 bg-slate-800 border border-blue-400 rounded text-white text-right"
                        />
                      ) : (
                        <>
                          <span className="font-semibold text-white">
                            {result.monthlyBreakdown.transport.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}
                          </span>
                          <button
                            onClick={() => setEditingField('transport')}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Edit3 className="w-3 h-3 text-blue-400" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Car Financing Input */}
                  {(wizardState.transportType === '1-car' || wizardState.transportType === '2-cars') && (
                    <div className="flex items-center justify-between py-2 pl-6 bg-blue-500/5 rounded-lg">
                      <span className="flex items-center gap-2 text-slate-400 text-xs">
                        <Car className="w-3 h-3 text-blue-300" />
                        Financement auto/mois
                      </span>
                      <input
                        type="number"
                        value={manualOverrides.carFinancing}
                        onChange={(e) => handleOverrideChange('carFinancing', e.target.value)}
                        placeholder="0"
                        className="w-24 px-2 py-1 bg-slate-800 border border-blue-400/30 rounded text-white text-right text-xs"
                      />
                    </div>
                  )}
                </div>

                {/* Utilities - Editable */}
                <div className="flex items-center justify-between py-2 border-b border-white/5 group">
                  <span className="flex items-center gap-2 text-slate-300">
                    <Zap className="w-4 h-4 text-purple-400" />
                    Services publics
                  </span>
                  <div className="flex items-center gap-2">
                    {editingField === 'utilities' ? (
                      <input
                        type="number"
                        value={manualOverrides.utilities ?? result.monthlyBreakdown.utilities}
                        onChange={(e) => handleOverrideChange('utilities', e.target.value)}
                        onBlur={() => setEditingField(null)}
                        autoFocus
                        className="w-24 px-2 py-1 bg-slate-800 border border-blue-400 rounded text-white text-right"
                      />
                    ) : (
                      <>
                        <span className="font-semibold text-white">
                          {result.monthlyBreakdown.utilities.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}
                        </span>
                        <button
                          onClick={() => setEditingField('utilities')}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Edit3 className="w-3 h-3 text-blue-400" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Childcare - Per Child Editable */}
                {result.monthlyBreakdown.childcare > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                      <span className="flex items-center gap-2 text-slate-300">
                        <Baby className="w-4 h-4 text-pink-400" />
                        Garde d'enfants
                      </span>
                      <span className="font-semibold text-white">
                        {result.monthlyBreakdown.childcare.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    {/* Per-child breakdown */}
                    {Array.from({ length: wizardState.childrenCount }).map((_, idx) => {
                      const childAge = idx < wizardState.childrenAges['0-5'] ? '0-5' :
                                      idx < wizardState.childrenAges['0-5'] + wizardState.childrenAges['6-12'] ? '6-12' : '13-17';
                      const isTeenager = childAge === '13-17';
                      
                      return (
                        <div key={idx} className="flex items-center justify-between py-1 pl-6 text-xs">
                          <span className="text-slate-400">
                            Enfant {idx + 1} ({childAge} ans)
                          </span>
                          <input
                            type="number"
                            value={manualOverrides.childcare[idx] ?? (isTeenager ? 0 : result.childrenCosts.daycareMonthly / wizardState.childrenCount)}
                            onChange={(e) => handleChildcareOverride(idx, e.target.value)}
                            disabled={isTeenager}
                            placeholder="0"
                            className={`w-20 px-2 py-1 bg-slate-800 border rounded text-white text-right ${
                              isTeenager ? 'border-slate-600 opacity-50 cursor-not-allowed' : 'border-pink-400/30'
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}

                {result.monthlyBreakdown.otherExpenses > 0 && (
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="flex items-center gap-2 text-slate-300">
                      <Wallet className="w-4 h-4 text-slate-400" />
                      Autres dépenses
                    </span>
                    <span className="font-semibold text-white">
                      {result.monthlyBreakdown.otherExpenses.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}
                    </span>
                  </div>
                )}

                <div className="pt-3 mt-2 border-t border-white/10 flex justify-between items-center">
                  <span className="font-bold text-white">Total Dépenses</span>
                  <span className="font-bold text-orange-400 text-lg">
                    {result.monthlyBreakdown.totalExpenses.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}
                  </span>
                </div>

                {result.monthlyBreakdown.childBenefits > 0 && (
                  <div className="flex items-center justify-between py-2 bg-green-500/10 rounded-lg px-3 -mx-3">
                    <span className="flex items-center gap-2 text-green-300">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      Allocations familiales
                      {sharedCustody && <span className="text-xs">(50%)</span>}
                    </span>
                    <span className="font-semibold text-green-400">
                      +{result.monthlyBreakdown.childBenefits.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Data Source Note */}
              <div className="mt-3 text-xs text-slate-400 italic text-center">
                Basé sur les prix moyens à {result.city.name} 2026
              </div>
            </motion.div>

            {/* Personalized Insights */}
            {insights.length > 0 && (
              <motion.div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                  </div>
                  Conseils Personnalisés
                </h3>
                <div className="space-y-3">
                  {insights.map((insight: any, idx: number) => {
                    const IconComponent = iconMap[insight.icon] || Lightbulb;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className={`bg-white/5 backdrop-blur-lg border rounded-xl p-4 ${
                          insight.type === 'success' ? 'border-green-400/30' :
                          insight.type === 'warning' ? 'border-orange-400/30' :
                          insight.type === 'danger' ? 'border-red-400/30' :
                          'border-blue-400/30'
                        }`}
                      >
                        <div className={`flex items-start gap-3 ${
                          insight.type === 'success' ? 'text-green-400' :
                          insight.type === 'warning' ? 'text-orange-400' :
                          insight.type === 'danger' ? 'text-red-400' :
                          'text-blue-400'
                        }`}>
                          <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                            insight.type === 'success' ? 'bg-green-500/20' :
                            insight.type === 'warning' ? 'bg-orange-500/20' :
                            insight.type === 'danger' ? 'bg-red-500/20' :
                            'bg-blue-500/20'
                          }`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-white text-sm mb-1">{insight.title}</h4>
                            <p className="text-xs text-slate-300 break-words">{insight.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>

          {/* RIGHT DASHBOARD - Charts and Actions */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-lg border border-green-400/20 rounded-2xl p-6 shadow-xl hover:shadow-green-500/20 transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                        <PiggyBank className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Taux d'Économies</h3>
                        <p className="text-xs text-green-300 capitalize">{result.financialHealth.status}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-5xl font-bold text-white mb-3">
                    {Math.round(result.financialHealth.savingsRate)}%
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">
                      {result.monthlyBreakdown.disposable.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}/mois
                    </span>
                    <div className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                      result.financialHealth.savingsRate >= 20 ? 'bg-green-500/20 text-green-300' :
                      result.financialHealth.savingsRate >= 10 ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-orange-500/20 text-orange-300'
                    }`}>
                      {result.financialHealth.savingsRate >= 20 ? 'Excellent' :
                       result.financialHealth.savingsRate >= 10 ? 'Bon' : 'À améliorer'}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 backdrop-blur-lg border border-emerald-400/20 rounded-2xl p-6 shadow-xl hover:shadow-emerald-500/20 transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Économies Annuelles</h3>
                        <p className="text-xs text-emerald-300">{result.financialHealth.savingsRate.toFixed(1)}% du revenu net</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-5xl font-bold text-white mb-3">
                    <AnimatedCounter value={Math.max(0, result.monthlyBreakdown.disposable * 12)} prefix="$" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">
                      Potentiel d'investissement
                    </span>
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-lg border border-blue-400/20 rounded-2xl p-6 shadow-xl hover:shadow-blue-500/20 transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ratio Loyer/Revenu</h3>
                        <p className="text-xs text-blue-300">
                          {result.financialHealth.rentToIncomeRatio > 30 ? 'Au-dessus de 30%' : 'Recommandé'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-5xl font-bold text-white mb-3">
                    {result.financialHealth.rentToIncomeRatio.toFixed(0)}%
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">
                      {result.monthlyBreakdown.rent.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}/mois
                    </span>
                    <div className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                      result.financialHealth.rentToIncomeRatio <= 25 ? 'bg-green-500/20 text-green-300' :
                      result.financialHealth.rentToIncomeRatio <= 30 ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-orange-500/20 text-orange-300'
                    }`}>
                      {result.financialHealth.rentToIncomeRatio <= 25 ? 'Excellent' :
                       result.financialHealth.rentToIncomeRatio <= 30 ? 'Bon' : 'Élevé'}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Donut Chart */}
              <motion.div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl hover:border-blue-500/30 transition-all">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <PiggyBank className="w-5 h-5 text-blue-400" />
                    </div>
                    Répartition Annuelle
                  </h3>
                  <span className="text-xs text-slate-400 bg-white/5 px-3 py-1 rounded-full">
                    Total: {result.combinedTax.netAnnual.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="h-80 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={donutData}
                        cx="50%"
                        cy="50%"
                        innerRadius={85}
                        outerRadius={135}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {donutData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color}
                            stroke="rgba(0,0,0,0.3)"
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Revenu Net</div>
                    <div className="text-2xl font-bold text-white">
                      {(result.combinedTax.netAnnual / 1000).toFixed(0)}k$
                    </div>
                    <div className="text-xs text-slate-400 mt-1">par année</div>
                  </div>
                </div>
                <div className="mt-4 space-y-1.5">
                  {donutData.map((item, idx) => {
                    const percentage = ((item.value / donutData.reduce((sum, d) => sum + d.value, 0)) * 100);
                    return (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                          <span className="text-xs text-slate-300 truncate">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs font-semibold text-white">
                            {item.value.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}
                          </span>
                          <span className="text-xs text-slate-400 w-10 text-right">
                            {percentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Bar Chart */}
              <motion.div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                      <Receipt className="w-5 h-5 text-orange-400" />
                    </div>
                    Dépenses Mensuelles
                  </h3>
                  <span className="text-xs text-slate-400 bg-white/5 px-3 py-1 rounded-full">
                    {result.monthlyBreakdown.totalExpenses.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis 
                        dataKey="name" 
                        stroke="rgba(255,255,255,0.5)"
                        tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                      />
                      <YAxis 
                        stroke="rgba(255,255,255,0.5)"
                        tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                      />
                      <Tooltip content={<CustomTooltip />} cursor={false} />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {barData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-sm text-slate-300">Total mensuel</span>
                  <span className="text-lg font-bold text-orange-400">
                    {result.monthlyBreakdown.totalExpenses.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Simulator Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <SimulatorActionsV2
                result={result}
                wizardState={wizardState}
                onCompareClick={() => setShowComparison(true)}
                onScenarioSaved={() => setRefreshScenarios(prev => prev + 1)}
              />
            </motion.div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                </div>
                Planifiez votre avenir
              </h3>
              <p className="text-sm text-slate-300 mb-6">
                Avec {result.monthlyBreakdown.disposable.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}/mois disponible, explorez vos options
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <a
                  href="/calcul-hypotheque"
                  className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/30 rounded-xl p-4 transition-all hover:scale-105"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                      <Home className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm">Hypothèque</h4>
                      <p className="text-xs text-slate-400">Calculez votre prêt</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300">
                    Pouvez-vous acheter une maison avec ce budget?
                  </p>
                </a>

                <a
                  href="/pret-auto"
                  className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/30 rounded-xl p-4 transition-all hover:scale-105"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                      <Car className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm">Prêt Auto</h4>
                      <p className="text-xs text-slate-400">Financez votre voiture</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300">
                    Quel véhicule pouvez-vous vous permettre?
                  </p>
                </a>

                <a
                  href="/epargne-retraite"
                  className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/30 rounded-xl p-4 transition-all hover:scale-105"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                      <PiggyBank className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm">Retraite</h4>
                      <p className="text-xs text-slate-400">Planifiez l'avenir</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300">
                    Combien épargner pour une retraite confortable?
                  </p>
                </a>
              </div>
            </motion.div>

            {/* Affiliate Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <AffiliateRecommendationsV2 result={result} />
            </motion.div>

            {/* Footer */}
            <div className="text-center py-6 text-slate-400 text-sm">
              <p>Calculs basés sur les taux 2025/2026 • Résultats approximatifs à titre indicatif</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* City Comparison Modal */}
      {showComparison && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowComparison(false)}>
          <div className="bg-slate-900 rounded-2xl p-6 max-w-md w-full border border-white/10" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-white mb-4">Comparaison de Villes</h3>
            <p className="text-slate-300 mb-4">Cette fonctionnalité sera bientôt disponible.</p>
            <button
              onClick={() => setShowComparison(false)}
              className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-semibold transition-all"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
