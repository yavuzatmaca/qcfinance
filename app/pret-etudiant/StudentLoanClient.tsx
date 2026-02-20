'use client'

import { useState } from 'react'
import { AffiliateCard } from '@/components/AffiliateCard'

export default function StudentLoanClient() {
  const [loanAmount, setLoanAmount] = useState<number>(20000)
  const [interestRate, setInterestRate] = useState<number>(7.2)
  const [term, setTerm] = useState<number>(120) // months

  const TAX_CREDIT_RATE = 0.20 // 20% Quebec tax credit on student loan interest

  // Calculate monthly payment
  const monthlyRate = interestRate / 100 / 12
  const monthlyPayment = monthlyRate > 0
    ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1)
    : loanAmount / term

  // Calculate total interest
  const totalPaid = monthlyPayment * term
  const totalInterest = totalPaid - loanAmount

  // Calculate tax credit (Quebec gives ~20% credit on student loan interest)
  const taxCredit = totalInterest * TAX_CREDIT_RATE
  const effectiveInterest = totalInterest - taxCredit

  // Calculate percentages for visual bar
  const principalPercent = (loanAmount / totalPaid) * 100
  const effectiveInterestPercent = (effectiveInterest / totalPaid) * 100
  const taxCreditPercent = (taxCredit / totalPaid) * 100

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
        <div className="bg-white rounded-2xl shadow-lg border border-indigo-200 p-8">
          <h2 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center gap-2">
            <span className="text-3xl">🎓</span>
            Votre prêt étudiant
          </h2>

          {/* Loan Amount */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Montant du prêt
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg font-semibold">$</span>
              <input
                type="number"
                value={loanAmount || ''}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 text-xl font-bold border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                step="1000"
              />
            </div>
            <div className="mt-2 flex gap-2">
              {[10000, 20000, 30000, 50000].map((quickAmount) => (
                <button
                  key={quickAmount}
                  onClick={() => setLoanAmount(quickAmount)}
                  className="flex-1 py-1 px-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-900 rounded text-xs font-semibold transition-colors"
                >
                  {quickAmount / 1000}k
                </button>
              ))}
            </div>
          </div>

          {/* Interest Rate */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Taux d'intérêt annuel : {interestRate.toFixed(2)}%
            </label>
            <input
              type="range"
              min="0"
              max="12"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>0%</span>
              <span>12%</span>
            </div>
            <div className="mt-2 bg-indigo-50 border border-indigo-200 rounded-lg p-3">
              <p className="text-xs text-indigo-700">
                💡 <strong>Taux AFE 2026 :</strong> ~7.2% (taux variable)
              </p>
            </div>
          </div>

          {/* Term */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Durée du remboursement : {term} mois
            </label>
            <input
              type="range"
              min="60"
              max="180"
              step="12"
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>60 (5 ans)</span>
              <span>180 (15 ans)</span>
            </div>
            <p className="text-xs text-slate-600 mt-2">
              {(term / 12).toFixed(1)} années de remboursement
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-violet-50 border-2 border-violet-200 rounded-xl p-4">
            <div className="flex gap-3">
              <div className="text-2xl">ℹ️</div>
              <div>
                <h3 className="font-bold text-violet-900 text-sm mb-1">
                  Prêt étudiant AFE
                </h3>
                <p className="text-xs text-violet-800">
                  Les prêts de l'Aide financière aux études (AFE) ont des taux d'intérêt 
                  avantageux et donnent droit à un crédit d'impôt de 20% sur les intérêts payés.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Results (Sticky) */}
      <div className="lg:col-span-7 order-1 lg:order-none">
        <div className="lg:sticky lg:top-24 space-y-6">
          {/* Hero Payment Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl shadow-2xl p-8 lg:p-10 text-white">
            <div className="text-center">
              <div className="text-5xl mb-3">📚</div>
              <h2 className="text-lg font-medium opacity-90 mb-2">
                Paiement mensuel
              </h2>
              <div className="text-6xl lg:text-7xl font-extrabold mb-4">
                {formatCurrency(monthlyPayment)}
              </div>
              <p className="text-sm opacity-80">
                pendant {(term / 12).toFixed(1)} ans
              </p>
            </div>
          </div>

          {/* Tax Credit Badge */}
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl shadow-xl p-6 text-white text-center">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-xl font-bold mb-2">
              Bonne nouvelle !
            </h3>
            <p className="text-sm opacity-90 mb-3">
              Vous récupérez en crédits d'impôt
            </p>
            <div className="text-5xl font-extrabold mb-2">
              {formatCurrency(taxCredit)}
            </div>
            <p className="text-xs opacity-80">
              20% des intérêts payés (crédit d'impôt Québec)
            </p>
          </div>

          {/* Cost Breakdown */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Répartition des coûts
            </h3>

            {/* Visual Stacked Bar */}
            <div className="mb-6">
              <div className="h-12 bg-slate-100 rounded-xl overflow-hidden flex">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold"
                  style={{ width: `${principalPercent}%` }}
                >
                  {principalPercent > 15 && 'Principal'}
                </div>
                <div
                  className="bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white text-xs font-bold"
                  style={{ width: `${effectiveInterestPercent}%` }}
                >
                  {effectiveInterestPercent > 10 && 'Intérêts nets'}
                </div>
                <div
                  className="bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center text-white text-xs font-bold"
                  style={{ width: `${taxCreditPercent}%` }}
                >
                  {taxCreditPercent > 5 && 'Crédit'}
                </div>
              </div>
            </div>

            {/* Breakdown Details */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-indigo-500 rounded"></div>
                  <span className="text-sm text-slate-700">Montant emprunté</span>
                </div>
                <span className="font-bold text-slate-900">{formatCurrency(loanAmount)}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-sm text-slate-700">Intérêts totaux</span>
                </div>
                <span className="font-bold text-red-600">{formatCurrency(totalInterest)}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                  <span className="text-sm text-slate-700">Crédit d'impôt (20%)</span>
                </div>
                <span className="font-bold text-emerald-600">-{formatCurrency(taxCredit)}</span>
              </div>

              <div className="h-px bg-slate-200"></div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  <span className="text-sm font-semibold text-slate-700">Intérêts nets</span>
                </div>
                <span className="font-bold text-orange-600">{formatCurrency(effectiveInterest)}</span>
              </div>

              <div className="h-px bg-slate-300"></div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold text-slate-900">Coût total</span>
                <span className="text-2xl font-extrabold text-indigo-900">{formatCurrency(totalPaid)}</span>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 text-center">
              <div className="text-xs text-slate-600 font-semibold mb-1">Durée</div>
              <div className="text-2xl font-bold text-slate-900">{(term / 12).toFixed(1)} ans</div>
              <div className="text-xs text-slate-500 mt-1">{term} mois</div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 text-center">
              <div className="text-xs text-slate-600 font-semibold mb-1">Taux effectif</div>
              <div className="text-2xl font-bold text-slate-900">{(interestRate * 0.8).toFixed(2)}%</div>
              <div className="text-xs text-slate-500 mt-1">après crédit d'impôt</div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 text-center">
              <div className="text-xs text-slate-600 font-semibold mb-1">Total payé</div>
              <div className="text-2xl font-bold text-slate-900">{formatCurrency(totalPaid)}</div>
              <div className="text-xs text-slate-500 mt-1">sur {(term / 12).toFixed(1)} ans</div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 text-center">
              <div className="text-xs text-slate-600 font-semibold mb-1">Économie fiscale</div>
              <div className="text-2xl font-bold text-emerald-600">{formatCurrency(taxCredit)}</div>
              <div className="text-xs text-slate-500 mt-1">crédit d'impôt</div>
            </div>
          </div>

          {/* Early Payoff Tip */}
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border-2 border-violet-200 p-6">
            <h4 className="font-bold text-violet-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Remboursez plus rapidement
            </h4>
            <p className="text-sm text-violet-800 mb-3">
              En ajoutant seulement <strong>50$ par mois</strong> à votre paiement, vous pourriez économiser 
              des centaines de dollars en intérêts et terminer votre prêt plus tôt.
            </p>
            <div className="bg-white rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-violet-700 font-semibold">Paiement accéléré</span>
                <span className="text-lg font-bold text-violet-900">
                  {formatCurrency(monthlyPayment + 50)}
                </span>
              </div>
            </div>
          </div>

          {/* Affiliate Card */}
          <AffiliateCard variant="education" />
        </div>
      </div>
    </div>
  )
}
