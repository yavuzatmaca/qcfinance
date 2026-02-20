'use client'

import { useState } from 'react'
import { AffiliateCard } from '@/components/AffiliateCard'

export default function RentVsBuyClient() {
  const [homePrice, setHomePrice] = useState<number>(400000)
  const [rent, setRent] = useState<number>(1500)
  const [downPayment, setDownPayment] = useState<number>(50000)
  const [rate, setRate] = useState<number>(5.0)
  const [appreciation, setAppreciation] = useState<number>(3.0)
  const [investmentReturn, setInvestmentReturn] = useState<number>(6.0)

  const YEARS = 5
  const PROPERTY_TAX_RATE = 0.012 // 1.2% annually
  const MAINTENANCE_RATE = 0.01 // 1% annually
  const RENT_INCREASE_RATE = 0.025 // 2.5% annually
  const TRANSFER_TAX_RATE = 0.015 // ~1.5% average
  const SELLING_COSTS_RATE = 0.05 // 5% (realtor fees, etc.)

  // BUY SCENARIO
  const mortgage = homePrice - downPayment
  const monthlyRate = rate / 100 / 12
  const numPayments = 25 * 12 // 25-year amortization
  const monthlyPayment = mortgage * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
  
  // Calculate mortgage balance after 5 years
  const paymentsAfter5Years = YEARS * 12
  const remainingBalance = mortgage * (Math.pow(1 + monthlyRate, numPayments) - Math.pow(1 + monthlyRate, paymentsAfter5Years)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
  const principalPaid = mortgage - remainingBalance
  
  // Home value after appreciation
  const futureHomeValue = homePrice * Math.pow(1 + appreciation / 100, YEARS)
  
  // Total costs for buying
  const transferTax = homePrice * TRANSFER_TAX_RATE
  const totalInterestPaid = (monthlyPayment * paymentsAfter5Years) - principalPaid
  const totalPropertyTax = homePrice * PROPERTY_TAX_RATE * YEARS
  const totalMaintenance = homePrice * MAINTENANCE_RATE * YEARS
  const sellingCosts = futureHomeValue * SELLING_COSTS_RATE
  
  const totalBuyCosts = transferTax + totalInterestPaid + totalPropertyTax + totalMaintenance + sellingCosts
  const buyNetWorth = futureHomeValue - remainingBalance - totalBuyCosts + downPayment

  // RENT SCENARIO
  // Calculate total rent paid over 5 years with increases
  let totalRentPaid = 0
  let currentRent = rent
  for (let year = 0; year < YEARS; year++) {
    totalRentPaid += currentRent * 12
    currentRent *= (1 + RENT_INCREASE_RATE)
  }
  
  // Investment portfolio value
  // Down payment invested
  const downPaymentGrowth = downPayment * Math.pow(1 + investmentReturn / 100, YEARS)
  
  // Monthly savings invested (if rent < mortgage payment + costs)
  const monthlyOwnershipCost = monthlyPayment + (homePrice * PROPERTY_TAX_RATE / 12) + (homePrice * MAINTENANCE_RATE / 12)
  const monthlySavings = Math.max(0, monthlyOwnershipCost - rent)
  
  // Future value of monthly savings
  const monthlyReturnRate = investmentReturn / 100 / 12
  const savingsGrowth = monthlySavings > 0 
    ? monthlySavings * ((Math.pow(1 + monthlyReturnRate, paymentsAfter5Years) - 1) / monthlyReturnRate) * (1 + monthlyReturnRate)
    : 0
  
  const rentNetWorth = downPaymentGrowth + savingsGrowth - totalRentPaid

  // THE VERDICT
  const difference = Math.abs(buyNetWorth - rentNetWorth)
  const buyWins = buyNetWorth > rentNetWorth

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column - Inputs */}
      <div className="lg:col-span-5 space-y-6 order-2 lg:order-none">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="text-3xl">⚙️</span>
            Vos paramètres
          </h2>

          {/* Home Price */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Prix de la propriété
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg font-semibold">$</span>
              <input
                type="number"
                value={homePrice || ''}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 text-xl font-bold border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                step="10000"
              />
            </div>
          </div>

          {/* Monthly Rent */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Loyer mensuel
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg font-semibold">$</span>
              <input
                type="number"
                value={rent || ''}
                onChange={(e) => setRent(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 text-xl font-bold border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                step="50"
              />
            </div>
          </div>

          {/* Down Payment */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Mise de fonds
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg font-semibold">$</span>
              <input
                type="number"
                value={downPayment || ''}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 text-xl font-bold border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                step="5000"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {((downPayment / homePrice) * 100).toFixed(1)}% du prix
            </p>
          </div>

          {/* Interest Rate */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Taux hypothécaire : {rate.toFixed(2)}%
            </label>
            <input
              type="range"
              min="3"
              max="8"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>3%</span>
              <span>8%</span>
            </div>
          </div>

          {/* Appreciation Rate */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Appréciation annuelle : {appreciation.toFixed(1)}%
            </label>
            <input
              type="range"
              min="0"
              max="8"
              step="0.5"
              value={appreciation}
              onChange={(e) => setAppreciation(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>0%</span>
              <span>8%</span>
            </div>
          </div>

          {/* Investment Return */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Rendement des placements : {investmentReturn.toFixed(1)}%
            </label>
            <input
              type="range"
              min="2"
              max="10"
              step="0.5"
              value={investmentReturn}
              onChange={(e) => setInvestmentReturn(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>2%</span>
              <span>10%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Results (Sticky) */}
      <div className="lg:col-span-7 order-1 lg:order-none">
        <div className="lg:sticky lg:top-24 space-y-6">
          {/* Winner Badge */}
          <div className={`${
            buyWins 
              ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
              : 'bg-gradient-to-br from-blue-500 to-cyan-600'
          } rounded-2xl shadow-2xl p-8 lg:p-12 text-white text-center`}>
            <div className="text-6xl mb-4">
              {buyWins ? '🏠' : '🏢'}
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              {buyWins ? 'ACHETER' : 'LOUER'} est plus avantageux
            </h2>
            <div className="text-5xl lg:text-6xl font-extrabold mb-4">
              {formatCurrency(difference)}
            </div>
            <p className="text-lg opacity-90">
              de différence après {YEARS} ans
            </p>
          </div>

          {/* Comparison Chart */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
              Valeur nette après {YEARS} ans
            </h3>
            
            <div className="space-y-6">
              {/* Buy Bar */}
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-bold text-green-700 flex items-center gap-2">
                    <span className="text-2xl">🏠</span>
                    Acheter
                  </span>
                  <span className="text-2xl font-bold text-green-900">{formatCurrency(buyNetWorth)}</span>
                </div>
                <div className="h-16 bg-green-100 rounded-xl overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-end pr-4 transition-all duration-500"
                    style={{ width: `${Math.min((buyNetWorth / Math.max(buyNetWorth, rentNetWorth)) * 100, 100)}%` }}
                  >
                    {buyWins && (
                      <span className="text-white font-bold text-sm">👑 GAGNANT</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Rent Bar */}
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-bold text-blue-700 flex items-center gap-2">
                    <span className="text-2xl">🏢</span>
                    Louer
                  </span>
                  <span className="text-2xl font-bold text-blue-900">{formatCurrency(rentNetWorth)}</span>
                </div>
                <div className="h-16 bg-blue-100 rounded-xl overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-end pr-4 transition-all duration-500"
                    style={{ width: `${Math.min((rentNetWorth / Math.max(buyNetWorth, rentNetWorth)) * 100, 100)}%` }}
                  >
                    {!buyWins && (
                      <span className="text-white font-bold text-sm">👑 GAGNANT</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Buy Breakdown */}
            <div className="bg-green-50 rounded-xl border-2 border-green-200 p-6">
              <h4 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🏠</span>
                Scénario Achat
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">Valeur future</span>
                  <span className="font-bold text-green-900">{formatCurrency(futureHomeValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Hypothèque restante</span>
                  <span className="font-bold text-red-600">-{formatCurrency(remainingBalance)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Capital remboursé</span>
                  <span className="font-bold text-green-900">{formatCurrency(principalPaid)}</span>
                </div>
                <div className="h-px bg-green-300"></div>
                <div className="flex justify-between">
                  <span className="text-green-700">Coûts totaux</span>
                  <span className="font-bold text-red-600">-{formatCurrency(totalBuyCosts)}</span>
                </div>
                <div className="text-xs text-green-600 ml-4 space-y-1">
                  <div>• Intérêts: {formatCurrency(totalInterestPaid)}</div>
                  <div>• Taxes: {formatCurrency(totalPropertyTax)}</div>
                  <div>• Entretien: {formatCurrency(totalMaintenance)}</div>
                  <div>• Frais vente: {formatCurrency(sellingCosts)}</div>
                </div>
                <div className="h-px bg-green-400"></div>
                <div className="flex justify-between pt-2">
                  <span className="font-bold text-green-900">Valeur nette</span>
                  <span className="text-xl font-extrabold text-green-900">{formatCurrency(buyNetWorth)}</span>
                </div>
              </div>
            </div>

            {/* Rent Breakdown */}
            <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-6">
              <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🏢</span>
                Scénario Location
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700">Mise de fonds investie</span>
                  <span className="font-bold text-blue-900">{formatCurrency(downPaymentGrowth)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Épargne mensuelle</span>
                  <span className="font-bold text-blue-900">{formatCurrency(savingsGrowth)}</span>
                </div>
                <div className="text-xs text-blue-600 ml-4">
                  {monthlySavings > 0 
                    ? `• ${formatCurrency(monthlySavings)}/mois investi`
                    : '• Aucune épargne (loyer ≥ coûts achat)'}
                </div>
                <div className="h-px bg-blue-300"></div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Loyers payés</span>
                  <span className="font-bold text-red-600">-{formatCurrency(totalRentPaid)}</span>
                </div>
                <div className="text-xs text-blue-600 ml-4">
                  • Augmentation 2.5%/an
                </div>
                <div className="h-px bg-blue-400"></div>
                <div className="flex justify-between pt-2">
                  <span className="font-bold text-blue-900">Valeur nette</span>
                  <span className="text-xl font-extrabold text-blue-900">{formatCurrency(rentNetWorth)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Costs Comparison */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <h4 className="font-bold text-slate-900 mb-4">Coûts mensuels (Année 1)</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-xs text-green-600 font-semibold mb-1">Paiement hypothécaire</div>
                <div className="text-2xl font-bold text-green-900">{formatCurrency(monthlyPayment)}</div>
                <div className="text-xs text-green-600 mt-1">+ taxes + entretien</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-xs text-blue-600 font-semibold mb-1">Loyer mensuel</div>
                <div className="text-2xl font-bold text-blue-900">{formatCurrency(rent)}</div>
                <div className="text-xs text-blue-600 mt-1">tout inclus</div>
              </div>
            </div>
          </div>

          {/* Contextual Affiliate Card */}
          {buyWins ? (
            <AffiliateCard variant="mortgage" />
          ) : (
            <AffiliateCard variant="investment" />
          )}
        </div>
      </div>
    </div>
  )
}
