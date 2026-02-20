'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { 
  Home, ShoppingCart, Train, TrendingUp, TrendingDown,
  PiggyBank, CreditCard, Sparkles, 
  DollarSign, Lightbulb, Target, Award, Users, Car, Zap
} from 'lucide-react';
import { useSimulator, generateInsights } from '@/src/hooks/useSimulator';
import { QUEBEC_CITIES } from '@/src/data/quebecCosts';
import AffiliateRecommendations from '@/components/AffiliateRecommendations';
import SimulatorActions from '@/components/SimulatorActions';
import CityComparison from '@/components/CityComparison';
import SavedScenarios from '@/components/SavedScenarios';
import type { SavedScenario } from '@/utils/scenarioStorage';

// Animated Counter Component
function AnimatedCounter({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {prefix}
      {Math.round(count).toLocaleString('fr-CA')}
      {suffix}
    </span>
  );
}

export default function PremiumSimulator({ onReset }: { onReset?: () => void }) {
  const [grossSalary, setGrossSalary] = useState<string>('75000');
  const [selectedCity, setSelectedCity] = useState<string>('montreal');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hasPartner, setHasPartner] = useState(false);
  const [hasCar, setHasCar] = useState(false);
  const [childrenCount, setChildrenCount] = useState(0);
  const [childrenAges, setChildrenAges] = useState<string[]>([]);
  const [hasCPE, setHasCPE] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [refreshScenarios, setRefreshScenarios] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load wizard data on mount AND whenever component re-renders from wizard
  useEffect(() => {
    const wizardDataStr = localStorage.getItem('wizardData');
    if (wizardDataStr) {
      try {
        const wizardData = JSON.parse(wizardDataStr);
        console.log('Loading wizard data:', wizardData);
        
        // Update all states from wizard data
        if (wizardData.income) setGrossSalary(wizardData.income);
        if (wizardData.cityId) setSelectedCity(wizardData.cityId);
        setHasPartner(wizardData.hasPartner || false);
        setHasCar(wizardData.hasCar || false);
        setChildrenCount(wizardData.childrenCount || 0);
        setChildrenAges(wizardData.childrenAges || []);
        setHasCPE(wizardData.hasCPE || false);
        
        // Clear localStorage after successful load
        localStorage.removeItem('wizardData');
        setIsInitialized(true);
      } catch (e) {
        console.error('Failed to parse wizard data', e);
        setIsInitialized(true);
      }
    } else {
      setIsInitialized(true);
    }
  }, []); // Empty dependency array - runs once on mount

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setGrossSalary(value);
  };

  const formatInputValue = (value: string) => {
    const num = parseFloat(value.replace(/[^0-9]/g, ''));
    if (isNaN(num)) return '';
    return num.toLocaleString('fr-CA');
  };

  const handleLoadScenario = (scenario: SavedScenario) => {
    setGrossSalary(scenario.grossSalary.toString());
    setSelectedCity(scenario.cityId);
    setHasPartner(scenario.hasPartner);
    setHasCar(scenario.hasCar);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Use the simulator hook
  const salaryNum = parseFloat(grossSalary) || 0;
  const result = useSimulator(salaryNum, selectedCity, hasPartner, hasCar, childrenCount, childrenAges, hasCPE);
  const insights = generateInsights(result);

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-radial from-slate-900 via-slate-950 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  // Chart data
  const donutData = [
    { name: 'Impôt Fédéral', value: result.tax.federalTax, color: '#3b82f6' },
    { name: 'Impôt Provincial', value: result.tax.provincialTax, color: '#60a5fa' },
    { name: 'Déductions', value: result.tax.qppContribution + result.tax.qpipContribution + result.tax.eiContribution, color: '#93c5fd' },
    { name: 'Loyer', value: result.city.avgRent * 12, color: '#f59e0b' },
    { name: 'Autres Dépenses', value: (result.city.monthlyGrocery + result.city.transportation + result.city.utilities) * 12, color: '#fbbf24' },
    { name: result.annualDisposableIncome >= 0 ? 'Économies' : 'Déficit', value: Math.abs(result.annualDisposableIncome), color: result.annualDisposableIncome >= 0 ? '#10b981' : '#ef4444' },
  ];

  const barData = [
    { name: 'Loyer', value: result.city.avgRent, color: '#f59e0b' },
    { name: 'Épicerie', value: result.city.monthlyGrocery, color: '#fbbf24' },
    { name: 'Transport', value: result.city.transportation, color: '#fb923c' },
    { name: 'Services publics', value: result.city.utilities, color: '#fdba74' },
    { name: 'Impôts', value: (result.tax.federalTax + result.tax.provincialTax) / 12, color: '#3b82f6' },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/95 backdrop-blur-xl px-4 py-3 rounded-xl shadow-2xl border border-white/10"
        >
          <p className="font-semibold text-white mb-1">{payload[0].name}</p>
          <p className="text-2xl font-bold text-blue-400">
            {payload[0].value.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}
          </p>
        </motion.div>
      );
    }
    return null;
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-radial from-slate-900 via-slate-950 to-slate-950 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      {/* Main Container */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/50">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-1">
                  Simulateur de Vie au Québec
                </h1>
                <p className="text-slate-400">
                  Calculez votre pouvoir d'achat réel - Taux 2025/2026
                </p>
              </div>
            </div>
            {onReset && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onReset}
                className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white hover:bg-white/10 hover:border-white/20 transition-all font-semibold"
              >
                Nouvelle Simulation
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Main Layout: 30% Sidebar + 70% Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT SIDEBAR - 30% */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 space-y-6"
          >
            {/* Input Card - Glassmorphism */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl hover:bg-white/10 transition-all duration-300">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-blue-400" />
                Vos Informations
              </h2>

              <div className="space-y-6">
                {/* Salary Input with Glow Effect */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-3">
                    Salaire Brut Annuel
                  </label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-400 group-focus-within:text-blue-400 transition-colors">
                      $
                    </span>
                    <input
                      type="text"
                      value={formatInputValue(grossSalary)}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 text-2xl font-bold bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/30 focus:bg-white/10 focus:shadow-lg focus:shadow-blue-500/20 outline-none transition-all hover:bg-white/10"
                      placeholder="75 000"
                    />
                  </div>
                </div>

                {/* City Selection */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                    <Home className="w-4 h-4 text-blue-400" />
                    Ville de Résidence
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 outline-none transition-all cursor-pointer hover:bg-white/10"
                  >
                    {QUEBEC_CITIES.map((city) => (
                      <option key={city.id} value={city.id} className="bg-slate-900 text-white">
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Lifestyle Options */}
                <div className="space-y-3 pt-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={hasPartner}
                      onChange={(e) => setHasPartner(e.target.checked)}
                      className="w-5 h-5 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-2 focus:ring-blue-500/50"
                    />
                    <Users className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                      En couple
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={hasCar}
                      onChange={(e) => setHasCar(e.target.checked)}
                      className="w-5 h-5 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-2 focus:ring-blue-500/50"
                    />
                    <Car className="w-4 h-4 text-orange-400" />
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                      Possède une voiture
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Quick Stats Cards */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-lg border border-blue-400/30 rounded-2xl p-6 shadow-xl hover:shadow-blue-500/20 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-blue-200 uppercase tracking-wider font-semibold">Revenu Net</span>
                <TrendingUp className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                <AnimatedCounter value={result.tax.netMonthly} prefix="$" />
              </div>
              <div className="text-sm text-blue-200">par mois</div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className={`backdrop-blur-lg border-2 rounded-2xl p-6 shadow-xl transition-all ${
                result.disposableIncome >= 0 
                  ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400/30 hover:shadow-green-500/20' 
                  : 'bg-gradient-to-br from-red-500/20 to-orange-500/20 border-red-400/30 hover:shadow-red-500/20'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-sm uppercase tracking-wider font-semibold ${
                  result.disposableIncome >= 0 ? 'text-green-200' : 'text-red-200'
                }`}>
                  Disponible
                </span>
                {result.disposableIncome >= 0 ? (
                  <TrendingUp className="w-5 h-5 text-green-400" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-400" />
                )}
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                <AnimatedCounter value={result.disposableIncome} prefix="$" />
              </div>
              <div className={`text-sm ${
                result.disposableIncome >= 0 ? 'text-green-200' : 'text-red-200'
              }`}>
                par mois
              </div>
            </motion.div>

            {/* Expenses Breakdown */}
            <motion.div
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl hover:bg-white/10 transition-all"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-orange-400" />
                Dépenses - {result.city.name}
                {hasPartner && <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">En couple</span>}
                {hasCar && <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">Avec auto</span>}
              </h3>
              <div className="space-y-3 text-sm">
                {(() => {
                  const expenses = [];
                  
                  // Rent
                  const rent = hasPartner ? result.city.avgRent * 0.5 : result.city.avgRent;
                  expenses.push({ 
                    icon: Home, 
                    label: hasPartner ? 'Loyer (partagé)' : 'Loyer', 
                    value: rent, 
                    color: 'text-orange-400' 
                  });
                  
                  // Groceries
                  const groceries = hasPartner ? result.city.monthlyGrocery * 1.5 : result.city.monthlyGrocery;
                  expenses.push({ 
                    icon: ShoppingCart, 
                    label: 'Épicerie', 
                    value: groceries, 
                    color: 'text-yellow-400' 
                  });
                  
                  // Transportation
                  const transport = hasCar ? 300 : result.city.transportation;
                  expenses.push({ 
                    icon: hasCar ? Car : Train, 
                    label: hasCar ? 'Auto (essence, assurance)' : 'Transport', 
                    value: transport, 
                    color: 'text-blue-400' 
                  });
                  
                  // Utilities
                  const utilities = hasPartner ? result.city.utilities * 0.5 : result.city.utilities;
                  expenses.push({ 
                    icon: Zap, 
                    label: hasPartner ? 'Services publics (partagés)' : 'Services publics', 
                    value: utilities, 
                    color: 'text-purple-400' 
                  });
                  
                  return expenses.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <span className="flex items-center gap-2 text-slate-300">
                        <item.icon className={`w-4 h-4 ${item.color}`} />
                        {item.label}
                      </span>
                      <span className="font-semibold text-white">
                        {item.value.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  ));
                })()}
                <div className="pt-3 mt-2 border-t border-white/10 flex justify-between items-center">
                  <span className="font-bold text-white">Total</span>
                  <span className="font-bold text-orange-400 text-lg">
                    {result.monthlyExpenses.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT DASHBOARD - 70% */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-sm font-semibold text-slate-300">Taux d'Économies</h3>
                </div>
                <div className="text-5xl font-bold text-white mb-2">
                  {Math.round(result.savingsRate)}%
                </div>
                <p className="text-sm text-slate-400">
                  {result.financialHealth.label}
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg border border-green-400/30 rounded-2xl p-6 shadow-xl hover:shadow-green-500/20 transition-all"
              >
                <div className="flex items-center gap-2 mb-4">
                  <PiggyBank className="w-6 h-6 text-green-400" />
                  <h3 className="text-sm font-semibold text-green-200">Économies Annuelles</h3>
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  <AnimatedCounter value={Math.max(0, result.annualDisposableIncome)} prefix="$" />
                </div>
                <p className="text-sm text-green-200">
                  {result.savingsRate.toFixed(1)}% du revenu net
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-lg border border-blue-400/30 rounded-2xl p-6 shadow-xl hover:shadow-blue-500/20 transition-all"
              >
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-6 h-6 text-blue-400" />
                  <h3 className="text-sm font-semibold text-blue-200">Taux d'Imposition</h3>
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {result.tax.effectiveTaxRate.toFixed(1)}%
                </div>
                <p className="text-sm text-blue-200">
                  {result.tax.totalTax.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })} en impôts
                </p>
              </motion.div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Donut Chart */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl hover:bg-white/10 transition-all"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Target className="w-6 h-6 text-blue-400" />
                  Répartition du Revenu
                </h3>
                <div className="h-80 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={donutData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={130}
                        paddingAngle={4}
                        dataKey="value"
                        onMouseEnter={(_, index) => setActiveIndex(index)}
                        onMouseLeave={() => setActiveIndex(null)}
                      >
                        {donutData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color}
                            opacity={activeIndex === null || activeIndex === index ? 1 : 0.3}
                            className="transition-opacity duration-300 cursor-pointer"
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Total</div>
                    <div className="text-3xl font-bold text-white">
                      {result.tax.grossAnnual.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-2">
                  {donutData.map((item, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-2 text-xs cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors"
                      onMouseEnter={() => setActiveIndex(idx)}
                      onMouseLeave={() => setActiveIndex(null)}
                    >
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-300 truncate">{item.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Bar Chart */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl hover:bg-white/10 transition-all"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <ShoppingCart className="w-6 h-6 text-orange-400" />
                  Dépenses Mensuelles
                </h3>
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
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {barData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>

            {/* Smart Insights */}
            {insights.length > 0 && (
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                  Conseils Intelligents
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {insights.map((insight, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className={`bg-white/5 backdrop-blur-lg border rounded-xl p-5 hover:bg-white/10 transition-all ${
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
                        <div className="flex-shrink-0 mt-1 text-2xl">{insight.icon}</div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white mb-1">{insight.title}</h4>
                          <p className="text-sm text-slate-300 break-words">{insight.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Simulator Actions */}
            <motion.div variants={itemVariants}>
              <SimulatorActions
                result={result}
                grossSalary={salaryNum}
                hasPartner={hasPartner}
                hasCar={hasCar}
                onCompareClick={() => setShowComparison(true)}
                onScenarioSaved={() => setRefreshScenarios(prev => prev + 1)}
              />
            </motion.div>

            {/* Saved Scenarios */}
            <motion.div variants={itemVariants} key={refreshScenarios}>
              <SavedScenarios onLoadScenario={handleLoadScenario} />
            </motion.div>

            {/* Affiliate Recommendations */}
            <AffiliateRecommendations result={result} />

            {/* Footer */}
            <motion.div
              variants={itemVariants}
              className="text-center py-6 text-slate-400 text-sm"
            >
              <p>Calculs basés sur les taux 2025/2026 • Résultats approximatifs à titre indicatif</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* City Comparison Modal */}
      {showComparison && (
        <CityComparison
          currentCityId={selectedCity}
          grossSalary={salaryNum}
          hasPartner={hasPartner}
          hasCar={hasCar}
          onClose={() => setShowComparison(false)}
        />
      )}
    </div>
  );
}
