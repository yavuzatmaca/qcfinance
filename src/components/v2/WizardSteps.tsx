/**
 * Wizard Steps Components
 * All step components for the conditional wizard flow
 */

import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, MapPin, Heart, Car, Users, 
  Home, Baby, UserCircle2, CheckCircle2
} from 'lucide-react';
import { QUEBEC_CITIES } from '@/src/data/quebecCosts';
import { WizardState, getHousingOptions, getTransportOptions } from './types';

interface StepProps {
  wizardState: WizardState;
  setWizardState: (state: WizardState) => void;
  direction: number;
  slideVariants: any;
}

// STEP 1: INCOME
export function IncomeStep({ wizardState, setWizardState, direction, slideVariants }: StepProps) {
  return (
    <motion.div
      key="income"
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/50"
        >
          <DollarSign className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-4xl font-bold text-white mb-3">
          Quel est votre revenu annuel?
        </h2>
        <p className="text-slate-400 text-lg">
          Entrez votre salaire brut annuel pour commencer
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="relative group">
          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-4xl font-bold text-slate-400 group-focus-within:text-blue-400 transition-colors">
            $
          </span>
          <input
            type="text"
            value={wizardState.grossIncome > 0 ? wizardState.grossIncome.toLocaleString('fr-CA') : ''}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              setWizardState({ ...wizardState, grossIncome: parseInt(value) || 0 });
            }}
            className="w-full pl-16 pr-8 py-6 text-4xl font-bold text-center bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/30 focus:bg-white/10 focus:shadow-lg focus:shadow-blue-500/20 outline-none transition-all"
            placeholder="75 000"
            autoFocus
          />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 text-lg text-slate-400">
            $ CAD
          </span>
        </div>
        {wizardState.grossIncome > 0 && wizardState.grossIncome < 1000 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-orange-400 mt-4 text-sm"
          >
            ⚠️ Le salaire minimum doit être d'au moins 1 000$
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

// STEP 2: PARTNER STATUS
export function PartnerStep({ wizardState, setWizardState, direction, slideVariants }: StepProps) {
  return (
    <motion.div
      key="partner"
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/50"
        >
          <Heart className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-4xl font-bold text-white mb-3">
          Avez-vous un(e) conjoint(e) ou partenaire?
        </h2>
        <p className="text-slate-400 text-lg">
          Cela affecte vos dépenses partagées et vos impôts
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {/* Single */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setWizardState({ 
            ...wizardState, 
            partnerStatus: 'single',
            partnerIncome: undefined,
            roommateCount: undefined
          })}
          className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
            wizardState.partnerStatus === 'single'
              ? 'bg-indigo-500/20 border-indigo-400 shadow-lg shadow-indigo-500/20'
              : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
              wizardState.partnerStatus === 'single' ? 'bg-indigo-500' : 'bg-white/10'
            }`}>
              <UserCircle2 className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1">Non, je suis célibataire</h3>
              <p className="text-sm text-slate-400">Vous vivez seul(e)</p>
            </div>
            {wizardState.partnerStatus === 'single' && (
              <CheckCircle2 className="w-6 h-6 text-indigo-400" />
            )}
          </div>
        </motion.button>

        {/* Roommate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.23 }}
        >
          <button
            onClick={() => setWizardState({ 
              ...wizardState, 
              partnerStatus: 'roommate',
              partnerIncome: undefined,
              roommateCount: wizardState.roommateCount || 2
            })}
            className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
              wizardState.partnerStatus === 'roommate'
                ? 'bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/20'
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                wizardState.partnerStatus === 'roommate' ? 'bg-cyan-500' : 'bg-white/10'
              }`}>
                <Users className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">
                  Colocation
                </h3>
                <p className="text-sm text-slate-400">Avec colocataires (loyer partagé)</p>
              </div>
              {wizardState.partnerStatus === 'roommate' && (
                <CheckCircle2 className="w-6 h-6 text-cyan-400" />
              )}
            </div>
          </button>

          {/* Roommate Count - Opens on same page */}
          <AnimatePresence>
            {wizardState.partnerStatus === 'roommate' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-6 bg-cyan-500/10 border border-cyan-400/30 rounded-xl"
              >
                <label className="block text-sm font-semibold text-cyan-200 mb-3">
                  Combien de personnes au total (vous inclus)?
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[2, 3, 4].map((count) => (
                    <motion.button
                      key={count}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setWizardState({ 
                          ...wizardState, 
                          roommateCount: count
                        });
                      }}
                      className={`p-4 rounded-xl border-2 font-bold text-2xl transition-all ${
                        wizardState.roommateCount === count
                          ? 'bg-cyan-500/30 border-cyan-400 text-white shadow-lg'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      {count}
                    </motion.button>
                  ))}
                </div>
                {wizardState.roommateCount && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 text-sm text-cyan-200 text-center"
                  >
                    💡 Loyer divisé par {wizardState.roommateCount} = {(1750 / wizardState.roommateCount).toFixed(0)}$/mois par personne
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Partner Working */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <button
            onClick={() => setWizardState({ 
              ...wizardState, 
              partnerStatus: 'partner-working',
              roommateCount: undefined
            })}
            className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
              wizardState.partnerStatus === 'partner-working'
                ? 'bg-green-500/20 border-green-400 shadow-lg shadow-green-500/20'
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                wizardState.partnerStatus === 'partner-working' ? 'bg-green-500' : 'bg-white/10'
              }`}>
                <Users className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">
                  Oui, et il/elle travaille
                </h3>
                <p className="text-sm text-slate-400">Deux revenus dans le ménage</p>
              </div>
              {wizardState.partnerStatus === 'partner-working' && (
                <CheckCircle2 className="w-6 h-6 text-green-400" />
              )}
            </div>
          </button>

          {/* Partner Income Input - Opens on same page */}
          <AnimatePresence>
            {wizardState.partnerStatus === 'partner-working' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-6 bg-green-500/10 border border-green-400/30 rounded-xl"
              >
                <label className="block text-sm font-semibold text-green-200 mb-3">
                  Revenu annuel de votre conjoint(e)/partenaire
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-400 group-focus-within:text-green-400 transition-colors">
                    $
                  </span>
                  <input
                    type="text"
                    value={wizardState.partnerIncome ? wizardState.partnerIncome.toLocaleString('fr-CA') : ''}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      setWizardState({ ...wizardState, partnerIncome: parseInt(value) || 0 });
                    }}
                    className="w-full pl-12 pr-4 py-4 text-2xl font-bold bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/50 outline-none transition-all"
                    placeholder="65 000"
                    autoFocus
                  />
                </div>
                {wizardState.partnerIncome && wizardState.partnerIncome > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 p-3 bg-green-500/20 rounded-lg"
                  >
                    <p className="text-sm text-green-200">
                      💡 Revenu total du ménage: {(wizardState.grossIncome + wizardState.partnerIncome).toLocaleString('fr-CA')} $
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Partner Not Working */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setWizardState({ 
            ...wizardState, 
            partnerStatus: 'partner-not-working',
            partnerIncome: undefined,
            roommateCount: undefined
          })}
          className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
            wizardState.partnerStatus === 'partner-not-working'
              ? 'bg-orange-500/20 border-orange-400 shadow-lg shadow-orange-500/20'
              : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
              wizardState.partnerStatus === 'partner-not-working' ? 'bg-orange-500' : 'bg-white/10'
            }`}>
              <Heart className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1">
                Oui, mais il/elle ne travaille pas
              </h3>
              <p className="text-sm text-slate-400">Étudiant(e), à la maison, cherche emploi, etc.</p>
            </div>
            {wizardState.partnerStatus === 'partner-not-working' && (
              <CheckCircle2 className="w-6 h-6 text-orange-400" />
            )}
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
}

// STEP 3: CHILDREN STATUS
export function ChildrenStep({ wizardState, setWizardState, direction, slideVariants }: StepProps) {
  return (
    <motion.div
      key="children"
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center shadow-lg shadow-pink-500/50"
        >
          <Baby className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-4xl font-bold text-white mb-3">
          Avez-vous des enfants?
        </h2>
        <p className="text-slate-400 text-lg">
          Les allocations familiales peuvent réduire vos coûts
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* No Children */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setWizardState({ 
            ...wizardState, 
            hasChildren: false,
            childrenCount: 0,
            childrenAges: { '0-5': 0, '6-12': 0, '13-17': 0 },
            hasCPE: false
          })}
          className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
            !wizardState.hasChildren
              ? 'bg-indigo-500/20 border-indigo-400 shadow-lg shadow-indigo-500/20'
              : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
              !wizardState.hasChildren ? 'bg-indigo-500' : 'bg-white/10'
            }`}>
              <UserCircle2 className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1">Non, je n'ai pas d'enfants</h3>
              <p className="text-sm text-slate-400">Pas de frais de garde ni d'allocations</p>
            </div>
            {!wizardState.hasChildren && (
              <CheckCircle2 className="w-6 h-6 text-indigo-400" />
            )}
          </div>
        </motion.button>

        {/* Has Children */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <button
            onClick={() => setWizardState({ 
              ...wizardState, 
              hasChildren: true,
              childrenCount: wizardState.childrenCount || 1
            })}
            className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
              wizardState.hasChildren
                ? 'bg-pink-500/20 border-pink-400 shadow-lg shadow-pink-500/20'
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                wizardState.hasChildren ? 'bg-pink-500' : 'bg-white/10'
              }`}>
                <Baby className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">Oui, j'ai des enfants</h3>
                <p className="text-sm text-slate-400">Allocations familiales disponibles</p>
              </div>
              {wizardState.hasChildren && (
                <CheckCircle2 className="w-6 h-6 text-pink-400" />
              )}
            </div>
          </button>

          {/* Children Count - Opens on same page */}
          <AnimatePresence>
            {wizardState.hasChildren && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-6 bg-pink-500/10 border border-pink-400/30 rounded-xl"
              >
                <label className="block text-sm font-semibold text-pink-200 mb-3">
                  Combien d'enfants avez-vous?
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {[1, 2, 3, 4, 5].map((count) => (
                    <motion.button
                      key={count}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setWizardState({ 
                          ...wizardState, 
                          childrenCount: count,
                          childrenAges: { '0-5': 0, '6-12': 0, '13-17': 0 }
                        });
                      }}
                      className={`p-4 rounded-xl border-2 font-bold text-2xl transition-all ${
                        wizardState.childrenCount === count
                          ? 'bg-pink-500/30 border-pink-400 text-white shadow-lg'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      {count === 5 ? '5+' : count}
                    </motion.button>
                  ))}
                </div>
                {wizardState.childrenCount > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 text-sm text-pink-200 text-center"
                  >
                    💡 Vous sélectionnerez les âges à l'étape suivante
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Continue in next file due to length...
