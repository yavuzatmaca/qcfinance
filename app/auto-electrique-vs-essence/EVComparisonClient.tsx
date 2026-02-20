'use client'

import { useState } from 'react'
import { Zap, Fuel, Leaf, Award, TrendingUp } from 'lucide-react'
import { AffiliateCard } from '@/components/AffiliateCard'

// Constants
const CO2_PER_LITER = 2.3 // kg of CO2 per liter of gas
const TREES_PER_TON_CO2 = 50

export default function EVComparisonClient() {
  const [kmPerYear, setKmPerYear] = useState(20000)
  const [gasPrice, setGasPrice] = useState(1.70)
  const [gasConsumption, setGasConsumption] = useState(8.5)
  const electricityPrice = 0.10 // QC rate fixed
  const evConsumption = 18 // kWh/100km fixed

  // Calculations
  const gasCost = (kmPerYear / 100) * gasConsumption * gasPrice
  const evCost = (kmPerYear / 100) * evConsumption * electricityPrice
  const annualSavings = gasCost - evCost
  const fiveYearSavings = annualSavings * 5

  // Environmental
  const gasLitersUsed = (kmPerYear / 100) * gasConsumption
  const co2SavedKg = gasLitersUsed * CO2_PER_LITER
  const co2SavedTons = co2SavedKg / 1000
  const treesEquivalent = Math.round(co2SavedTons * TREES_PER_TON_CO2)

  // Visual bar percentages
  const totalCost = gasCost + evCost
  const gasPercent = (gasCost / totalCost) * 100
  const evPercent = (evCost / totalCost) * 100

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
      
      {/* LEFT COLUMN - INPUTS (Mobile: Order 2) */}
      <div className="lg:col-span-5 order-2 lg:order-none space-y-6">
        
        {/* Driving Habits Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-lime-100 p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Fuel className="w-6 h-6 text-lime-600" />
            Vos Habitudes
          </h2>
          
          {/* Annual KM */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Kilométrage annuel
            </label>
            <div className="flex items-center gap-4 mb-2">
              <input
                type="range"
                min="5000"
                max="40000"
                step="1000"
                value={kmPerYear}
                onChange={(e) => setKmPerYear(Number(e.target.value))}
                className="flex-1 accent-lime-600"
              />
              <span className="text-2xl font-bold text-lime-600 w-28 text-right">
                {kmPerYear.toLocaleString()} km
              </span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>5 000 km</span>
              <span>40 000 km</span>
            </div>
          </div>

          {/* Gas Consumption */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Consommation essence (L/100km)
            </label>
            <div className="flex items-center gap-4 mb-2">
              <input
                type="range"
                min="5"
                max="15"
                step="0.5"
                value={gasConsumption}
                onChange={(e) => setGasConsumption(Number(e.target.value))}
                className="flex-1 accent-lime-600"
              />
              <span className="text-2xl font-bold text-lime-600 w-28 text-right">
                {gasConsumption} L
              </span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>5 L (hybride)</span>
              <span>15 L (VUS)</span>
            </div>
          </div>
        </div>

        {/* Gas Price Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-lime-100 p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-orange-600" />
            Prix de l'Essence
          </h2>
          
          {/* Gas Price Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Prix actuel ($/L)
            </label>
            <div className="relative">
              <input
                type="number"
                value={gasPrice}
                onChange={(e) => setGasPrice(Number(e.target.value))}
                step="0.05"
                min="1.00"
                max="3.00"
                className="w-full pl-4 pr-16 py-3 border-2 border-gray-200 rounded-xl focus:border-lime-500 focus:ring-2 focus:ring-lime-200 transition-all text-2xl font-bold text-center"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$/L</span>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setGasPrice(1.50)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                gasPrice === 1.50
                  ? 'bg-lime-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              1.50$
            </button>
            <button
              onClick={() => setGasPrice(1.70)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                gasPrice === 1.70
                  ? 'bg-lime-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              1.70$
            </button>
            <button
              onClick={() => setGasPrice(2.00)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                gasPrice === 2.00
                  ? 'bg-lime-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              2.00$
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-3">
            💡 Électricité Hydro-Québec: {electricityPrice.toFixed(2)} $/kWh (fixe)
          </p>
        </div>
      </div>

      {/* RIGHT COLUMN - STICKY RESULTS (Mobile: Order 1) */}
      <div className="lg:col-span-7 order-1 lg:order-none">
        <div className="lg:sticky lg:top-24 space-y-6">
          
          {/* HERO NUMBER - Annual Savings */}
          <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl shadow-2xl p-8 text-white">
            <p className="text-lg opacity-90 mb-2">Vous économisez</p>
            <p className="text-6xl md:text-7xl font-bold mb-4">
              {formatCurrency(annualSavings)}
            </p>
            <p className="text-2xl text-green-100 mb-4">par an !</p>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mt-4">
              <p className="text-lg font-semibold">Sur 5 ans:</p>
              <p className="text-4xl font-bold">{formatCurrency(fiveYearSavings)}</p>
            </div>
          </div>

          {/* THE "SUBSIDY" BADGE */}
          <div className="bg-gradient-to-r from-lime-500 to-green-500 rounded-2xl shadow-xl p-6 text-white">
            <div className="flex items-start gap-3">
              <Award className="w-8 h-8 flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold text-lg mb-1">🎁 N'oubliez pas les subventions !</p>
                <p className="text-lime-50 text-xl">
                  Jusqu'à <span className="font-bold text-3xl">12 000$</span> à l'achat
                </p>
                <p className="text-sm text-lime-100 mt-2">
                  7 000$ (Québec) + 5 000$ (Fédéral) pour un véhicule électrique neuf
                </p>
              </div>
            </div>
          </div>

          {/* VISUAL BAR - Gas vs EV Cost Comparison */}
          <div className="bg-white rounded-2xl shadow-lg border border-lime-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Comparaison des coûts annuels</h3>
            
            <div className="mb-6">
              <div className="flex h-16 rounded-lg overflow-hidden shadow-inner">
                <div 
                  className="bg-red-500 flex flex-col items-center justify-center text-white text-sm font-semibold"
                  style={{ width: `${gasPercent}%` }}
                >
                  {gasPercent > 25 && (
                    <>
                      <Fuel className="w-5 h-5 mb-1" />
                      <span>Essence</span>
                    </>
                  )}
                </div>
                <div 
                  className="bg-green-500 flex flex-col items-center justify-center text-white text-sm font-semibold"
                  style={{ width: `${evPercent}%` }}
                >
                  {evPercent > 25 && (
                    <>
                      <Zap className="w-5 h-5 mb-1" />
                      <span>Électrique</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <span>🔴 Essence: {formatCurrency(gasCost)}</span>
                <span>🟢 Électrique: {formatCurrency(evCost)}</span>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Gas */}
              <div className="bg-red-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Fuel className="w-5 h-5 text-red-600" />
                  <h4 className="font-bold text-gray-900">Essence</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Coût annuel</span>
                    <span className="font-bold text-red-600">{formatCurrency(gasCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Par mois</span>
                    <span className="font-bold text-red-600">{formatCurrency(gasCost / 12)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Litres/an</span>
                    <span className="font-bold text-gray-900">{Math.round(gasLitersUsed)} L</span>
                  </div>
                </div>
              </div>

              {/* EV */}
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-green-600" />
                  <h4 className="font-bold text-gray-900">Électrique</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Coût annuel</span>
                    <span className="font-bold text-green-600">{formatCurrency(evCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Par mois</span>
                    <span className="font-bold text-green-600">{formatCurrency(evCost / 12)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">kWh/an</span>
                    <span className="font-bold text-gray-900">{Math.round((kmPerYear / 100) * evConsumption)} kWh</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Environmental Impact */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Leaf className="w-8 h-8" />
              <h3 className="text-2xl font-bold">Impact Environnemental</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">{co2SavedTons.toFixed(1)}</div>
                <div className="text-sm text-green-100">tonnes CO₂ évitées</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">{treesEquivalent}</div>
                <div className="text-sm text-green-100">arbres équivalents</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">95%</div>
                <div className="text-sm text-green-100">énergie renouvelable</div>
              </div>
            </div>
            <p className="text-xs text-green-100 mt-4 text-center">
              L'électricité québécoise provient à 95% de sources renouvelables (hydroélectricité)
            </p>
          </div>

          {/* Investment Opportunity */}
          <div className="bg-blue-50 rounded-2xl border-2 border-blue-200 p-6">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-blue-900 mb-2">Investissez ces économies !</h3>
                <p className="text-sm text-blue-800 mb-3">
                  En investissant vos {formatCurrency(annualSavings)} d'économies annuelles à 5% de rendement, vous auriez <span className="font-bold">{formatCurrency(fiveYearSavings * 1.15)}</span> après 5 ans.
                </p>
              </div>
            </div>
          </div>

          {/* AFFILIATE CARD */}
          <AffiliateCard variant="investment" />

          {/* Info Note */}
          <div className="bg-lime-50 border-l-4 border-lime-400 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> Calculs basés sur le tarif résidentiel d'Hydro-Québec (0.10 $/kWh) et une consommation moyenne de 18 kWh/100km pour un VÉ. Les économies réelles varient selon le véhicule et les habitudes de conduite.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
