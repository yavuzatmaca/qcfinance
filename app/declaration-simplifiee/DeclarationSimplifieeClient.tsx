'use client'

import { useState } from 'react'
import { AffiliateCard } from '@/components/AffiliateCard'
import { calculateTaxForm, TaxFormInputs, TaxFormResult } from '@/utils/taxFormLogic'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

type WizardStep = 'income' | 'deductions' | 'credits' | 'result'

export default function DeclarationSimplifieeClient() {
  const [currentStep, setCurrentStep] = useState<WizardStep>('income')
  const [isCalculating, setIsCalculating] = useState(false)
  
  const [inputs, setInputs] = useState<TaxFormInputs>({
    employmentIncome: 0,
    federalTaxPaid: 0,
    quebecTaxPaid: 0,
    rrspContributions: 0,
    unionDues: 0,
  })

  const [result, setResult] = useState<TaxFormResult | null>(null)

  const steps: { id: WizardStep; label: string; number: number }[] = [
    { id: 'income', label: 'Revenus', number: 1 },
    { id: 'deductions', label: 'Déductions', number: 2 },
    { id: 'credits', label: 'Crédits', number: 3 },
    { id: 'result', label: 'Résultat', number: 4 },
  ]

  const currentStepIndex = steps.findIndex(s => s.id === currentStep)

  const handleNext = () => {
    if (currentStep === 'credits') {
      // Trigger calculation animation
      setIsCalculating(true)
      setTimeout(() => {
        const calculatedResult = calculateTaxForm(inputs)
        setResult(calculatedResult)
        setIsCalculating(false)
        setCurrentStep('result')
      }, 1500)
    } else {
      const nextIndex = currentStepIndex + 1
      if (nextIndex < steps.length) {
        setCurrentStep(steps[nextIndex].id)
      }
    }
  }

  const handlePrevious = () => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id)
    }
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const downloadPDF = () => {
    if (!result) return

    const doc = new jsPDF()
    
    doc.setFontSize(20)
    doc.setTextColor(37, 99, 235)
    doc.text('Rapport Fiscal Estimatif 2026', 105, 20, { align: 'center' })
    doc.setFontSize(12)
    doc.setTextColor(100, 100, 100)
    doc.text('QCFinance.ca', 105, 28, { align: 'center' })
    
    doc.setFontSize(10)
    const today = new Date().toLocaleDateString('fr-CA', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
    doc.text(`Généré le ${today}`, 105, 35, { align: 'center' })
    
    doc.setFillColor(result.isRefund ? 34 : 220, result.isRefund ? 197 : 38, result.isRefund ? 94 : 38)
    doc.rect(20, 45, 170, 25, 'F')
    doc.setFontSize(14)
    doc.setTextColor(255, 255, 255)
    doc.text(result.isRefund ? 'REMBOURSEMENT ESTIMÉ' : 'SOLDE À PAYER', 105, 53, { align: 'center' })
    doc.setFontSize(24)
    doc.text(formatCurrency(result.refundOrOwing), 105, 64, { align: 'center' })
    
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text('Revenu et Déductions', 20, 82)
    
    autoTable(doc, {
      startY: 86,
      head: [['Description', 'Montant']],
      body: [
        ['Revenu d\'emploi (Case 14)', formatCurrency(result.totalIncome)],
        ['Cotisations REER', formatCurrency(result.rrspDeduction)],
        ['Cotisations syndicales', formatCurrency(result.unionDuesDeduction)],
        ['Total des déductions', formatCurrency(result.totalDeductions)],
      ],
      theme: 'striped',
      headStyles: { fillColor: [37, 99, 235], textColor: 255 },
      styles: { fontSize: 10 },
      columnStyles: {
        0: { cellWidth: 120 },
        1: { cellWidth: 50, halign: 'right' }
      }
    })
    
    const finalY1 = (doc as any).lastAutoTable.finalY + 10
    doc.setFontSize(12)
    doc.text('Calcul de l\'impôt', 20, finalY1)
    
    autoTable(doc, {
      startY: finalY1 + 4,
      head: [['Description', 'Montant']],
      body: [
        ['Revenu imposable fédéral', formatCurrency(result.federalTaxableIncome)],
        ['Impôt fédéral dû', formatCurrency(result.federalTaxOwed)],
        ['Impôt fédéral payé (Case 22)', formatCurrency(result.federalTaxPaid)],
        ['', ''],
        ['Revenu imposable Québec', formatCurrency(result.quebecTaxableIncome)],
        ['Impôt Québec dû', formatCurrency(result.quebecTaxOwed)],
        ['Impôt Québec payé (Case E)', formatCurrency(result.quebecTaxPaid)],
      ],
      theme: 'striped',
      headStyles: { fillColor: [37, 99, 235], textColor: 255 },
      styles: { fontSize: 10 },
      columnStyles: {
        0: { cellWidth: 120 },
        1: { cellWidth: 50, halign: 'right' }
      }
    })
    
    const finalY2 = (doc as any).lastAutoTable.finalY + 10
    doc.setFontSize(12)
    doc.text('Résumé', 20, finalY2)
    
    autoTable(doc, {
      startY: finalY2 + 4,
      body: [
        ['Total impôt dû', formatCurrency(result.totalTaxOwed)],
        ['Total impôt payé', formatCurrency(result.totalTaxPaid)],
        [result.isRefund ? 'REMBOURSEMENT' : 'SOLDE À PAYER', formatCurrency(result.refundOrOwing)],
      ],
      theme: 'plain',
      styles: { 
        fontSize: 11,
        fontStyle: 'bold',
        fillColor: [243, 244, 246]
      },
      columnStyles: {
        0: { cellWidth: 120 },
        1: { cellWidth: 50, halign: 'right', textColor: result.isRefund ? [34, 197, 94] : [220, 38, 38] }
      }
    })
    
    doc.setFontSize(9)
    doc.setTextColor(150, 150, 150)
    const disclaimerY = (doc as any).lastAutoTable.finalY + 15
    doc.text('Ce document est une estimation à des fins personnelles.', 105, disclaimerY, { align: 'center' })
    doc.text('Il ne remplace pas une déclaration officielle.', 105, disclaimerY + 5, { align: 'center' })
    
    doc.setFontSize(8)
    doc.text('Généré par QCFinance.ca', 105, 285, { align: 'center' })
    
    doc.save('rapport-fiscal-2026.pdf')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Progress Bar */}
        {currentStep !== 'result' && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {steps.slice(0, 3).map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      currentStepIndex >= index 
                        ? 'bg-emerald-600 text-white shadow-lg' 
                        : 'bg-slate-200 text-slate-500'
                    }`}>
                      {step.number}
                    </div>
                    <span className={`text-xs mt-2 font-medium ${
                      currentStepIndex >= index ? 'text-emerald-700' : 'text-slate-400'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {index < 2 && (
                    <div className={`h-1 flex-1 mx-2 rounded transition-all ${
                      currentStepIndex > index ? 'bg-emerald-600' : 'bg-slate-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-slate-600 mt-4">
              Étape {currentStepIndex + 1} de 3
            </p>
          </div>
        )}

        {/* Wizard Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Step 1: Income */}
          {currentStep === 'income' && (
            <div className="p-8 lg:p-12">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                  <span className="text-3xl">💼</span>
                  Vos revenus d'emploi
                </h2>
                <p className="text-slate-600">
                  Entrez le montant de la case 14 de votre feuillet T4
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-6">
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Revenu d'emploi (Case 14 - T4)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg font-semibold">
                      $
                    </span>
                    <input
                      type="number"
                      value={inputs.employmentIncome || ''}
                      onChange={(e) => setInputs({ ...inputs, employmentIncome: Number(e.target.value) })}
                      className="w-full pl-10 pr-4 py-4 text-2xl font-bold border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                      placeholder="50000"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    💡 Trouvez ce montant sur votre T4, case 14
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <div className="text-2xl">ℹ️</div>
                    <div>
                      <h3 className="font-bold text-blue-900 text-sm mb-1">Où trouver cette information ?</h3>
                      <p className="text-xs text-blue-800">
                        Votre employeur vous remet un feuillet T4 avant le 28 février. 
                        La case 14 indique votre revenu brut d'emploi pour l'année.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Deductions */}
          {currentStep === 'deductions' && (
            <div className="p-8 lg:p-12">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                  <span className="text-3xl">📊</span>
                  Impôts déjà payés
                </h2>
                <p className="text-slate-600">
                  Montants retenus à la source par votre employeur
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Impôt fédéral retenu (Case 22 - T4)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg font-semibold">
                      $
                    </span>
                    <input
                      type="number"
                      value={inputs.federalTaxPaid || ''}
                      onChange={(e) => setInputs({ ...inputs, federalTaxPaid: Number(e.target.value) })}
                      className="w-full pl-10 pr-4 py-4 text-xl font-bold border-2 border-red-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="5000"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Impôt Québec retenu (Case E - RL-1)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg font-semibold">
                      $
                    </span>
                    <input
                      type="number"
                      value={inputs.quebecTaxPaid || ''}
                      onChange={(e) => setInputs({ ...inputs, quebecTaxPaid: Number(e.target.value) })}
                      className="w-full pl-10 pr-4 py-4 text-xl font-bold border-2 border-blue-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="7000"
                    />
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <div className="text-2xl">✅</div>
                    <div>
                      <h3 className="font-bold text-emerald-900 text-sm mb-1">Bon à savoir</h3>
                      <p className="text-xs text-emerald-800">
                        Ces montants ont déjà été prélevés sur vos paies. 
                        Si vous avez trop payé, vous recevrez un remboursement !
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Credits */}
          {currentStep === 'credits' && (
            <div className="p-8 lg:p-12">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                  <span className="text-3xl">🎯</span>
                  Déductions fiscales
                </h2>
                <p className="text-slate-600">
                  Réduisez votre revenu imposable avec ces déductions
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Cotisations REER
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg font-semibold">
                      $
                    </span>
                    <input
                      type="number"
                      value={inputs.rrspContributions || ''}
                      onChange={(e) => setInputs({ ...inputs, rrspContributions: Number(e.target.value) })}
                      className="w-full pl-10 pr-4 py-4 text-xl font-bold border-2 border-purple-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="5000"
                    />
                  </div>
                  <p className="text-xs text-purple-700 mt-2">
                    💡 Déduction puissante : réduit directement votre revenu imposable
                  </p>
                </div>

                <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Cotisations syndicales
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg font-semibold">
                      $
                    </span>
                    <input
                      type="number"
                      value={inputs.unionDues || ''}
                      onChange={(e) => setInputs({ ...inputs, unionDues: Number(e.target.value) })}
                      className="w-full pl-10 pr-4 py-4 text-xl font-bold border-2 border-orange-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="500"
                    />
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <div className="text-2xl">💡</div>
                    <div>
                      <h3 className="font-bold text-yellow-900 text-sm mb-1">Maximisez vos déductions</h3>
                      <p className="text-xs text-yellow-800">
                        Plus vous avez de déductions, moins vous payez d'impôt. 
                        Gardez tous vos reçus REER et syndicaux !
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Result with Loading Animation */}
          {currentStep === 'result' && (
            <>
              {isCalculating ? (
                <div className="p-12 lg:p-20 flex flex-col items-center justify-center">
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl">📊</span>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-slate-700 mt-6 animate-pulse">
                    Calcul en cours...
                  </p>
                  <p className="text-sm text-slate-500 mt-2">
                    Analyse de votre situation fiscale
                  </p>
                </div>
              ) : result && (
                <div className="p-8 lg:p-12">
                  {/* Hero Result */}
                  <div className={`${
                    result.isRefund 
                      ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' 
                      : 'bg-gradient-to-br from-red-500 to-orange-600'
                  } rounded-2xl shadow-2xl p-8 lg:p-12 text-white mb-8`}>
                    <div className="text-center">
                      <div className="text-6xl mb-4">
                        {result.isRefund ? '🎉' : '📋'}
                      </div>
                      <h2 className="text-xl lg:text-2xl font-medium mb-4 opacity-90">
                        {result.isRefund ? 'Remboursement estimé' : 'Solde à payer'}
                      </h2>
                      <div className="text-6xl lg:text-7xl font-extrabold mb-4">
                        {formatCurrency(result.refundOrOwing)}
                      </div>
                      {result.isRefund ? (
                        <p className="text-lg opacity-90">
                          Félicitations ! Le gouvernement vous doit de l'argent 💰
                        </p>
                      ) : (
                        <p className="text-lg opacity-90">
                          Vous devrez payer ce montant avant le 30 avril 2026
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-slate-50 rounded-xl border-2 border-slate-200 p-6">
                      <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                        <span className="text-red-600">🍁</span>
                        Impôt Fédéral
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Impôt dû</span>
                          <span className="font-bold text-slate-900">{formatCurrency(result.federalTaxOwed)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Impôt payé</span>
                          <span className="font-bold text-slate-900">{formatCurrency(result.federalTaxPaid)}</span>
                        </div>
                        <div className="h-px bg-slate-300"></div>
                        <div className="flex justify-between">
                          <span className="text-slate-700 font-semibold">Différence</span>
                          <span className={`font-bold ${
                            result.federalTaxPaid > result.federalTaxOwed ? 'text-emerald-600' : 'text-red-600'
                          }`}>
                            {formatCurrency(Math.abs(result.federalTaxPaid - result.federalTaxOwed))}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl border-2 border-slate-200 p-6">
                      <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                        <span className="text-blue-600">⚜️</span>
                        Impôt Québec
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Impôt dû</span>
                          <span className="font-bold text-slate-900">{formatCurrency(result.quebecTaxOwed)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Impôt payé</span>
                          <span className="font-bold text-slate-900">{formatCurrency(result.quebecTaxPaid)}</span>
                        </div>
                        <div className="h-px bg-slate-300"></div>
                        <div className="flex justify-between">
                          <span className="text-slate-700 font-semibold">Différence</span>
                          <span className={`font-bold ${
                            result.quebecTaxPaid > result.quebecTaxOwed ? 'text-emerald-600' : 'text-red-600'
                          }`}>
                            {formatCurrency(Math.abs(result.quebecTaxPaid - result.quebecTaxOwed))}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contextual Affiliate Card */}
                  {result.isRefund ? (
                    <AffiliateCard variant="investment" />
                  ) : (
                    <AffiliateCard variant="tax" />
                  )}

                  {/* PDF Download Button */}
                  <button
                    onClick={downloadPDF}
                    className="w-full mt-8 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-5 px-8 rounded-xl transition-all text-lg shadow-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Télécharger mon Rapport Fiscal (PDF)
                  </button>

                  {/* Restart Button */}
                  <button
                    onClick={() => {
                      setCurrentStep('income')
                      setResult(null)
                      setInputs({
                        employmentIncome: 0,
                        federalTaxPaid: 0,
                        quebecTaxPaid: 0,
                        rrspContributions: 0,
                        unionDues: 0,
                      })
                    }}
                    className="w-full mt-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3 px-6 rounded-xl transition-all border-2 border-slate-200"
                  >
                    Recommencer une nouvelle déclaration
                  </button>
                </div>
              )}
            </>
          )}

          {/* Navigation Buttons */}
          {currentStep !== 'result' && (
            <div className="bg-slate-50 border-t border-slate-200 p-6 flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentStepIndex === 0}
                className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  currentStepIndex === 0
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border-2 border-slate-300'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Précédent
              </button>

              <button
                onClick={handleNext}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-lg flex items-center gap-2"
              >
                {currentStep === 'credits' ? 'Calculer' : 'Suivant'}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Educational Section */}
        {currentStep === 'result' && result && (
          <section className="mt-12 bg-white rounded-xl shadow-lg border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              Prochaines étapes
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">1. Rassemblez vos documents</h3>
                <p className="text-sm text-slate-600">
                  T4, RL-1, reçus REER, et tous les autres feuillets fiscaux
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">2. Produisez votre déclaration</h3>
                <p className="text-sm text-slate-600">
                  Utilisez un logiciel certifié ou consultez un comptable
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">3. Respectez la date limite</h3>
                <p className="text-sm text-slate-600">
                  <strong>30 avril 2026</strong> pour les employés
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
