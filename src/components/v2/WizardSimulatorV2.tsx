'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Loader2, Zap } from 'lucide-react';
import PremiumSimulatorV2 from './PremiumSimulatorV2';
import { WizardState, WizardStep, WizardFlow } from './types';
import { IncomeStep, PartnerStep, ChildrenStep } from './WizardSteps';
import { ChildrenAgesStep, CityStep, HousingStep, TransportStep } from './WizardSteps2';

// Fleur-de-lis SVG Component
const FleurDeLis = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C11 2 10 3 10 4C10 5 11 6 12 6C13 6 14 5 14 4C14 3 13 2 12 2M12 7C10 7 8 8 8 10C8 11 9 12 10 12C9 13 8 14 8 15C8 17 10 19 12 19C14 19 16 17 16 15C16 14 15 13 14 12C15 12 16 11 16 10C16 8 14 7 12 7M7 10C6 10 5 11 5 12C5 13 6 14 7 14C8 14 9 13 9 12C9 11 8 10 7 10M17 10C16 10 15 11 15 12C15 13 16 14 17 14C18 14 19 13 19 12C19 11 18 10 17 10M12 20C11 20 10 21 10 22H14C14 21 13 20 12 20Z" />
  </svg>
);

export default function WizardSimulatorV2() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState<WizardStep>('income');
  const [direction, setDirection] = useState(0);
  const [wizardState, setWizardState] = useState<WizardState>({
    grossIncome: 0,
    partnerStatus: 'single',
    partnerIncome: undefined,
    roommateCount: undefined,
    hasChildren: false,
    childrenCount: 0,
    childrenAges: {
      '0-5': 0,
      '6-12': 0,
      '13-17': 0,
    },
    hasCPE: false,
    cityId: 'montreal',
    housingType: '1br',
    transportType: 'public',
  });

  // Load income from URL parameter on mount
  useEffect(() => {
    const incomeParam = searchParams?.get('income');
    if (incomeParam) {
      const income = parseFloat(incomeParam);
      if (!isNaN(income) && income > 0) {
        setWizardState(prev => ({
          ...prev,
          grossIncome: income
        }));
      }
    }
  }, [searchParams]);

  const canContinue = WizardFlow.canContinue(currentStep, wizardState);
  const progress = WizardFlow.getProgress(currentStep, wizardState);
  const totalSteps = WizardFlow.getTotalSteps(wizardState);
  const currentStepIndex = WizardFlow.getCurrentStepIndex(currentStep, wizardState);

  const handleNext = () => {
    if (!canContinue) return;
    
    setDirection(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const nextStep = WizardFlow.getNextStep(currentStep, wizardState);
    setCurrentStep(nextStep);
    
    if (nextStep === 'calculating') {
      setTimeout(() => {
        setCurrentStep('results');
      }, 2500);
    }
  };

  const handleBack = () => {
    setDirection(-1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const prevStep = WizardFlow.getPreviousStep(currentStep, wizardState);
    setCurrentStep(prevStep);
  };

  const resetWizard = () => {
    setCurrentStep('income');
    setWizardState({
      grossIncome: 0,
      partnerStatus: 'single',
      partnerIncome: undefined,
      roommateCount: undefined,
      hasChildren: false,
      childrenCount: 0,
      childrenAges: {
        '0-5': 0,
        '6-12': 0,
        '13-17': 0,
      },
      hasCPE: false,
      cityId: 'montreal',
      housingType: '1br',
      transportType: 'public',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  // Results view
  if (currentStep === 'results') {
    return (
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <PremiumSimulatorV2 wizardState={wizardState} onReset={resetWizard} />
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-radial from-slate-900 via-slate-950 to-slate-950 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Progress Bar */}
        {currentStep !== 'calculating' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-white/5 backdrop-blur-sm border-b border-white/10"
          >
            <div className="max-w-4xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">
                  Étape {currentStepIndex + 1} sur {totalSteps}
                </span>
                <span className="text-sm text-blue-400 font-semibold">{progress}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-4xl">
            <AnimatePresence mode="wait" custom={direction}>
              {/* STEP 1: INCOME */}
              {currentStep === 'income' && (
                <IncomeStep 
                  wizardState={wizardState}
                  setWizardState={setWizardState}
                  direction={direction}
                  slideVariants={slideVariants}
                />
              )}

              {/* STEP 2: PARTNER */}
              {currentStep === 'partner' && (
                <PartnerStep 
                  wizardState={wizardState}
                  setWizardState={setWizardState}
                  direction={direction}
                  slideVariants={slideVariants}
                />
              )}

              {/* STEP 3: CHILDREN */}
              {currentStep === 'children' && (
                <ChildrenStep 
                  wizardState={wizardState}
                  setWizardState={setWizardState}
                  direction={direction}
                  slideVariants={slideVariants}
                />
              )}

              {/* STEP 3B: CHILDREN AGES */}
              {currentStep === 'children-ages' && (
                <ChildrenAgesStep 
                  wizardState={wizardState}
                  setWizardState={setWizardState}
                  direction={direction}
                  slideVariants={slideVariants}
                />
              )}

              {/* STEP 4: CITY */}
              {currentStep === 'city' && (
                <CityStep 
                  wizardState={wizardState}
                  setWizardState={setWizardState}
                  direction={direction}
                  slideVariants={slideVariants}
                />
              )}

              {/* STEP 5: HOUSING */}
              {currentStep === 'housing' && (
                <HousingStep 
                  wizardState={wizardState}
                  setWizardState={setWizardState}
                  direction={direction}
                  slideVariants={slideVariants}
                />
              )}

              {/* STEP 6: TRANSPORT */}
              {currentStep === 'transport' && (
                <TransportStep 
                  wizardState={wizardState}
                  setWizardState={setWizardState}
                  direction={direction}
                  slideVariants={slideVariants}
                />
              )}

              {/* Calculating State */}
              {currentStep === 'calculating' && (
                <motion.div
                  key="calculating"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-20"
                >
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
                      scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
                    }}
                    className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-2xl shadow-blue-500/50"
                  >
                    <FleurDeLis className="w-16 h-16 text-white" />
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-bold text-white mb-4"
                  >
                    Analyse en cours...
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl text-blue-300 mb-8"
                  >
                    Calcul personnalisé selon votre situation
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-3 max-w-md mx-auto"
                  >
                    {[
                      { text: 'Calcul des impôts et déductions', delay: 0.6 },
                      { text: 'Analyse des coûts de logement', delay: 0.8 },
                      { text: 'Calcul des allocations familiales', delay: 1.0 },
                      { text: 'Génération des recommandations', delay: 1.2 },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: item.delay }}
                        className="flex items-center justify-center gap-3 text-slate-300"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          <Loader2 className="w-4 h-4 text-blue-400" />
                        </motion.div>
                        <span>{item.text}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-10"
                  >
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full">
                      <Zap className="w-5 h-5 text-blue-400" />
                      <span className="text-white font-semibold">Données officielles 2025/2026</span>
                    </div>
                  </motion.div>
                </motion.div>
              )}


            </AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep !== 'calculating' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-between mt-8 gap-4"
              >
                {currentStep !== 'income' && (
                  <motion.button
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBack}
                    className="flex items-center gap-2 px-6 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white hover:bg-white/10 hover:border-white/20 transition-all group"
                  >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-semibold">Retour</span>
                  </motion.button>
                )}

                <div className="flex-1" />

                <motion.button
                  whileHover={{ scale: canContinue ? 1.05 : 1, x: canContinue ? 5 : 0 }}
                  whileTap={{ scale: canContinue ? 0.95 : 1 }}
                  onClick={handleNext}
                  disabled={!canContinue}
                  className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all group ${
                    canContinue
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60'
                      : 'bg-white/5 text-slate-600 cursor-not-allowed border border-white/5 opacity-50'
                  }`}
                >
                  <span>
                    {currentStep === 'transport' ? 'Voir les résultats' : 'Continuer'}
                  </span>
                  <ArrowRight className={`w-5 h-5 ${canContinue ? 'group-hover:translate-x-1' : ''} transition-transform`} />
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
