'use client'

import { useState } from 'react'
import { AffiliateCard } from '@/components/AffiliateCard'
import { calculateTaxForm, TaxFormInputs, TaxFormResult } from '@/utils/taxFormLogic'
import { Share2, Download, RefreshCw, Briefcase, TrendingUp, Target, PartyPopper, FileText, Info, CheckCircle, Lightbulb, X } from 'lucide-react'
import AdSenseAd from '@/components/AdSenseAd'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

type WizardStep = 'income' | 'deductions' | 'credits' | 'result'

export default function DeclarationSimplifieeClient() {
  const [currentStep, setCurrentStep] = useState<WizardStep>('income')
  const [isCalculating, setIsCalculating] = useState(false)
  const [showStickyAd, setShowStickyAd] = useState(true)
  const [isQuickCalcExpanded, setIsQuickCalcExpanded] = useState(false)
  
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

  const handleShare = async () => {
    if (!result) return
    
    const text = `💰 Ma déclaration d'impôt 2026:\n${result.isRefund ? 'Remboursement' : 'Solde à payer'}: ${formatCurrency(result.refundOrOwing)}\n\nCalculé sur QCFinance.ca`
    
    if (navigator.share) {
      try {
        await navigator.share({ text, url: window.location.href })
      } catch (err) {
        navigator.clipboard.writeText(text)
        alert('✅ Copié dans le presse-papier!')
      }
    } else {
      navigator.clipboard.writeText(text)
      alert('✅ Copié dans le presse-papier!')
    }
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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-100 py-8 lg:py-12">
      {/* MOBILE ONLY: Minimal Sticky Bar with Expand */}
      {currentStep !== 'result' && (
        <div className="lg:hidden sticky top-16 z-40 bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg mb-4">
          {!isQuickCalcExpanded ? (
            /* COLLAPSED STATE - Minimal */
            <button
              onClick={() => setIsQuickCalcExpanded(true)}
              className="w-full p-4 flex items-center justify-between touch-manipulation active:bg-emerald-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-white text-base font-bold leading-tight">
                    {inputs.employmentIncome > 0 ? formatCurrency(inputs.employmentIncome) : 'Revenu'}
                  </div>
                  <div className="text-white/70 text-xs">
                    Étape {currentStepIndex + 1}/3 • {steps[currentStepIndex].label}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-xs font-semibold">Modifier</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
          ) : (
            /* EXPANDED STATE - Full Progress */
            <div className="p-4 animate-slide-down">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base">Déclaration Simplifiée</h3>
                    <p className="text-white/70 text-xs">Étape {currentStepIndex + 1} de 3</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsQuickCalcExpanded(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center touch-manipulation active:scale-95 transition-all"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-3">
                  {steps.slice(0, 3).map((step, index) => (
                    <>
                      <div key={step.id} className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                          currentStepIndex >= index 
                            ? 'bg-white text-emerald-600 shadow-lg' 
                            : 'bg-white/20 text-white/60'
                        }`}>
                          {step.number}
                        </div>
                        <span className={`text-[10px] mt-1 font-medium ${
                          currentStepIndex >= index ? 'text-white' : 'text-white/50'
                        }`}>
                          {step.label}
                        </span>
                      </div>
                      {index < 2 && (
                        <div className={`h-0.5 flex-1 rounded transition-all ${
                          currentStepIndex > index ? 'bg-white' : 'bg-white/20'
                        }`} />
                      )}
                    </>
                  ))}
                </div>
                <div className="text-center text-white text-sm font-semibold">
                  {steps[currentStepIndex].label}
                </div>
              </div>

              {/* Quick Summary */}
              {inputs.employmentIncome > 0 && (
                <div className="mt-3 bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                  <div className="flex items-center justify-between text-white">
                    <span className="text-xs font-semibold">Revenu d'emploi</span>
                    <span className="text-base font-bold">{formatCurrency(inputs.employmentIncome)}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="container mx-auto px-4 max-w-4xl pt-4 lg:pt-0">

        {/* Progress Bar - Desktop Only */}
        {currentStep !== 'result' && (
          <div className="hidden lg:block mb-8">
            <div className="flex items-center justify-between">
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
            <div className="p-5 lg:p-8">
              <div className="mb-6 lg:mb-8">
                <h2 className="text-xl lg:text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2 lg:gap-3">
                  <Briefcase className="w-6 h-6 lg:w-8 lg:h-8 text-emerald-600 flex-shrink-0" />
                  <span>Vos revenus d'emploi</span>
                </h2>
                <p className="text-sm lg:text-base text-slate-600">
                  Entrez le montant de la case 14 de votre feuillet T4
                </p>
              </div>

              <div className="space-y-4 lg:space-y-6">
                <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4 lg:p-6">
                  <label className="block text-xs lg:text-sm font-bold text-slate-700 mb-2 lg:mb-3">
                    Revenu d'emploi (Case 14 - T4)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 text-slate-500 text-base lg:text-lg font-semibold pointer-events-none">
                      $
                    </span>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.employmentIncome || ''}
                      onChange={(e) => setInputs({ ...inputs, employmentIncome: Number(e.target.value) })}
                      className="w-full pl-8 lg:pl-10 pr-4 py-3 lg:py-4 text-xl lg:text-2xl font-bold border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all touch-manipulation"
                      placeholder="50000"
                    />
                  </div>
                  <p className="text-[10px] lg:text-xs text-slate-500 mt-2 flex items-center gap-1">
                    <Lightbulb className="w-3 h-3 flex-shrink-0" />
                    Trouvez ce montant sur votre T4, case 14
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 lg:p-4">
                  <div className="flex gap-2 lg:gap-3">
                    <Info className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-blue-900 text-xs lg:text-sm mb-1">Où trouver cette information ?</h3>
                      <p className="text-[10px] lg:text-xs text-blue-800 leading-relaxed">
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
            <div className="p-5 lg:p-8">
              <div className="mb-6 lg:mb-8">
                <h2 className="text-xl lg:text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2 lg:gap-3">
                  <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 text-emerald-600 flex-shrink-0" />
                  <span>Impôts déjà payés</span>
                </h2>
                <p className="text-sm lg:text-base text-slate-600">
                  Montants retenus à la source par votre employeur
                </p>
              </div>

              <div className="space-y-4 lg:space-y-6">
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 lg:p-6">
                  <label className="block text-xs lg:text-sm font-bold text-slate-700 mb-2 lg:mb-3">
                    Impôt fédéral retenu (Case 22 - T4)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 text-slate-500 text-base lg:text-lg font-semibold pointer-events-none">
                      $
                    </span>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.federalTaxPaid || ''}
                      onChange={(e) => setInputs({ ...inputs, federalTaxPaid: Number(e.target.value) })}
                      className="w-full pl-8 lg:pl-10 pr-4 py-3 lg:py-4 text-lg lg:text-xl font-bold border-2 border-red-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 touch-manipulation"
                      placeholder="5000"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 lg:p-6">
                  <label className="block text-xs lg:text-sm font-bold text-slate-700 mb-2 lg:mb-3">
                    Impôt Québec retenu (Case E - RL-1)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 text-slate-500 text-base lg:text-lg font-semibold pointer-events-none">
                      $
                    </span>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.quebecTaxPaid || ''}
                      onChange={(e) => setInputs({ ...inputs, quebecTaxPaid: Number(e.target.value) })}
                      className="w-full pl-8 lg:pl-10 pr-4 py-3 lg:py-4 text-lg lg:text-xl font-bold border-2 border-blue-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 touch-manipulation"
                      placeholder="7000"
                    />
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 lg:p-4">
                  <div className="flex gap-2 lg:gap-3">
                    <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-emerald-900 text-xs lg:text-sm mb-1">Bon à savoir</h3>
                      <p className="text-[10px] lg:text-xs text-emerald-800 leading-relaxed">
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
            <div className="p-5 lg:p-8">
              <div className="mb-6 lg:mb-8">
                <h2 className="text-xl lg:text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2 lg:gap-3">
                  <Target className="w-6 h-6 lg:w-8 lg:h-8 text-emerald-600 flex-shrink-0" />
                  <span>Déductions fiscales</span>
                </h2>
                <p className="text-sm lg:text-base text-slate-600">
                  Réduisez votre revenu imposable avec ces déductions
                </p>
              </div>

              <div className="space-y-4 lg:space-y-6">
                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 lg:p-6">
                  <label className="block text-xs lg:text-sm font-bold text-slate-700 mb-2 lg:mb-3">
                    Cotisations REER
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 text-slate-500 text-base lg:text-lg font-semibold pointer-events-none">
                      $
                    </span>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.rrspContributions || ''}
                      onChange={(e) => setInputs({ ...inputs, rrspContributions: Number(e.target.value) })}
                      className="w-full pl-8 lg:pl-10 pr-4 py-3 lg:py-4 text-lg lg:text-xl font-bold border-2 border-purple-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 touch-manipulation"
                      placeholder="5000"
                    />
                  </div>
                  <p className="text-[10px] lg:text-xs text-purple-700 mt-2 flex items-center gap-1">
                    <Lightbulb className="w-3 h-3 flex-shrink-0" />
                    Déduction puissante : réduit directement votre revenu imposable
                  </p>
                </div>

                <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 lg:p-6">
                  <label className="block text-xs lg:text-sm font-bold text-slate-700 mb-2 lg:mb-3">
                    Cotisations syndicales
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 text-slate-500 text-base lg:text-lg font-semibold pointer-events-none">
                      $
                    </span>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.unionDues || ''}
                      onChange={(e) => setInputs({ ...inputs, unionDues: Number(e.target.value) })}
                      className="w-full pl-8 lg:pl-10 pr-4 py-3 lg:py-4 text-lg lg:text-xl font-bold border-2 border-orange-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 touch-manipulation"
                      placeholder="500"
                    />
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 lg:p-4">
                  <div className="flex gap-2 lg:gap-3">
                    <Lightbulb className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-yellow-900 text-xs lg:text-sm mb-1">Maximisez vos déductions</h3>
                      <p className="text-[10px] lg:text-xs text-yellow-800 leading-relaxed">
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
                      <TrendingUp className="w-8 h-8 text-emerald-600" />
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
                <div className="p-5 lg:p-8">
                  {/* Hero Result */}
                  <div className={`${
                    result.isRefund 
                      ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' 
                      : 'bg-gradient-to-br from-red-500 to-orange-600'
                  } rounded-xl lg:rounded-2xl shadow-2xl p-6 lg:p-12 text-white mb-6 lg:mb-8`}>
                    <div className="text-center">
                      <div className="mb-3 lg:mb-4 flex justify-center">
                        {result.isRefund ? (
                          <PartyPopper className="w-12 h-12 lg:w-16 lg:h-16" />
                        ) : (
                          <FileText className="w-12 h-12 lg:w-16 lg:h-16" />
                        )}
                      </div>
                      <h2 className="text-base lg:text-2xl font-medium mb-3 lg:mb-4 opacity-90">
                        {result.isRefund ? 'Remboursement estimé' : 'Solde à payer'}
                      </h2>
                      <div className="text-4xl lg:text-7xl font-extrabold mb-3 lg:mb-4">
                        {formatCurrency(result.refundOrOwing)}
                      </div>
                      {result.isRefund ? (
                        <p className="text-sm lg:text-lg opacity-90">
                          Félicitations ! Le gouvernement vous doit de l'argent
                        </p>
                      ) : (
                        <p className="text-sm lg:text-lg opacity-90">
                          Vous devrez payer ce montant avant le 30 avril 2026
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="grid md:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
                    <div className="bg-slate-50 rounded-xl border-2 border-slate-200 p-4 lg:p-6">
                      <h3 className="text-xs lg:text-sm font-bold text-slate-700 mb-3 lg:mb-4 flex items-center gap-2">
                        <svg className="w-4 h-4 lg:w-5 lg:h-5 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                        <span>Impôt Fédéral</span>
                      </h3>
                      <div className="space-y-2 lg:space-y-3 text-xs lg:text-sm">
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

                    <div className="bg-slate-50 rounded-xl border-2 border-slate-200 p-4 lg:p-6">
                      <h3 className="text-xs lg:text-sm font-bold text-slate-700 mb-3 lg:mb-4 flex items-center gap-2">
                        <svg className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                        </svg>
                        <span>Impôt Québec</span>
                      </h3>
                      <div className="space-y-2 lg:space-y-3 text-xs lg:text-sm">
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

                  {/* Action Buttons: Download & Share */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 mt-6 lg:mt-8">
                    <button
                      onClick={downloadPDF}
                      className="flex items-center justify-center gap-2 lg:gap-3 py-3 lg:py-4 px-4 lg:px-6 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold rounded-xl transition-all text-sm lg:text-base shadow-lg touch-manipulation active:scale-95 min-h-[44px]"
                    >
                      <Download className="w-5 h-5 flex-shrink-0" />
                      <span>Télécharger PDF</span>
                    </button>

                    <button
                      onClick={handleShare}
                      className="flex items-center justify-center gap-2 lg:gap-3 py-3 lg:py-4 px-4 lg:px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all text-sm lg:text-base shadow-lg touch-manipulation active:scale-95 min-h-[44px]"
                    >
                      <Share2 className="w-5 h-5 flex-shrink-0" />
                      <span>Partager</span>
                    </button>
                  </div>

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
                    className="w-full mt-3 lg:mt-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3 px-4 lg:px-6 rounded-xl transition-all border-2 border-slate-200 touch-manipulation active:scale-95 min-h-[44px] text-sm lg:text-base"
                  >
                    <RefreshCw className="w-4 h-4 inline-block mr-2" />
                    Recommencer une nouvelle déclaration
                  </button>
                </div>
              )}
            </>
          )}

          {/* Navigation Buttons */}          {/* Navigation Buttons */}
          {currentStep !== 'result' && (
            <div className="bg-slate-50 border-t border-slate-200 p-4 lg:p-6 flex items-center justify-between gap-3">
              <button
                onClick={handlePrevious}
                disabled={currentStepIndex === 0}
                className={`px-4 lg:px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 touch-manipulation active:scale-95 min-h-[44px] text-sm lg:text-base ${
                  currentStepIndex === 0
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border-2 border-slate-300'
                }`}
              >
                <svg className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">Précédent</span>
              </button>

              <button
                onClick={handleNext}
                className="flex-1 sm:flex-initial px-6 lg:px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 touch-manipulation active:scale-95 min-h-[44px] text-sm lg:text-base"
              >
                <span>{currentStep === 'credits' ? 'Calculer' : 'Suivant'}</span>
                <svg className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Educational Section */}
        {currentStep === 'result' && result && (
          <section className="mt-8 lg:mt-12 bg-white rounded-xl shadow-lg border border-slate-200 p-5 lg:p-8">
            <h2 className="text-xl lg:text-2xl font-bold text-slate-900 mb-4 lg:mb-6 text-center">
              Prochaines étapes
            </h2>
            <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3 lg:mb-4">
                  <FileText className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-sm lg:text-base">1. Rassemblez vos documents</h3>
                <p className="text-xs lg:text-sm text-slate-600">
                  T4, RL-1, reçus REER, et tous les autres feuillets fiscaux
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-3 lg:mb-4">
                  <CheckCircle className="w-6 h-6 lg:w-8 lg:h-8 text-emerald-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-sm lg:text-base">2. Produisez votre déclaration</h3>
                <p className="text-xs lg:text-sm text-slate-600">
                  Utilisez un logiciel certifié ou consultez un comptable
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3 lg:mb-4">
                  <svg className="w-6 h-6 lg:w-8 lg:h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-sm lg:text-base">3. Respectez la date limite</h3>
                <p className="text-xs lg:text-sm text-slate-600">
                  <strong>30 avril 2026</strong> pour les employés
                </p>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Sticky Bottom Ad - Mobile Only */}
      {showStickyAd && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-slate-200 shadow-2xl">
          <div className="relative">
            <button
              onClick={() => setShowStickyAd(false)}
              className="absolute top-2 right-2 z-10 w-8 h-8 bg-slate-800/80 hover:bg-slate-900 text-white rounded-full flex items-center justify-center transition-all touch-manipulation active:scale-95"
              aria-label="Fermer la publicité"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="p-4 pb-6">
              <div className="text-[10px] text-slate-500 text-center mb-2">Publicité</div>
              <AdSenseAd adSlot="7290777867" adFormat="auto" />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
