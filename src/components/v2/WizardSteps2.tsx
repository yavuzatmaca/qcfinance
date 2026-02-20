/**
 * Wizard Steps Components - Part 2
 * Remaining step components
 */

import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Car, Home, Baby, CheckCircle2 } from 'lucide-react';
import { QUEBEC_CITIES } from '@/src/data/quebecCosts';
import { WizardState, getHousingOptions, getTransportOptions } from './types';

interface StepProps {
  wizardState: WizardState;
  setWizardState: (state: WizardState) => void;
  direction: number;
  slideVariants: any;
}

// STEP 3B: CHILDREN AGES
export function ChildrenAgesStep({ wizardState, setWizardState, direction, slideVariants }: StepProps) {
  return (
    <motion.div
      key="children-ages"
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
          Quel âge ont vos enfants?
        </h2>
        <p className="text-slate-400 text-lg">
          Sélectionnez {wizardState.childrenCount} enfant(s) au total
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {(['0-5', '6-12', '13-17'] as const).map((ageGroup, idx) => {
          const count = wizardState.childrenAges[ageGroup];
          const totalSelected = wizardState.childrenAges['0-5'] + 
                              wizardState.childrenAges['6-12'] + 
                              wizardState.childrenAges['13-17'];
          const canAdd = totalSelected < wizardState.childrenCount;
          const canRemove = count > 0;

          const labels = {
            '0-5': { title: '0-5 ans', subtitle: 'Préscolaire / Garderie', icon: '👶' },
            '6-12': { title: '6-12 ans', subtitle: 'École primaire', icon: '🧒' },
            '13-17': { title: '13-17 ans', subtitle: 'École secondaire', icon: '👦' },
          };

          return (
            <motion.div
              key={ageGroup}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{labels[ageGroup].icon}</div>
                  <div>
                    <h4 className="font-bold text-white text-lg">{labels[ageGroup].title}</h4>
                    <p className="text-sm text-slate-400">{labels[ageGroup].subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (canRemove) {
                        setWizardState({
                          ...wizardState,
                          childrenAges: {
                            ...wizardState.childrenAges,
                            [ageGroup]: count - 1
                          }
                        });
                      }
                    }}
                    disabled={!canRemove}
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-all"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-bold text-white text-xl">{count}</span>
                  <button
                    onClick={() => {
                      if (canAdd) {
                        setWizardState({
                          ...wizardState,
                          childrenAges: {
                            ...wizardState.childrenAges,
                            [ageGroup]: count + 1
                          }
                        });
                      }
                    }}
                    disabled={!canAdd}
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-all"
                  >
                    +
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Total Check */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`p-4 rounded-xl text-center ${
            (wizardState.childrenAges['0-5'] + wizardState.childrenAges['6-12'] + wizardState.childrenAges['13-17']) === wizardState.childrenCount
              ? 'bg-green-500/10 border border-green-400/30'
              : 'bg-orange-500/10 border border-orange-400/30'
          }`}
        >
          <p className={`text-sm font-semibold ${
            (wizardState.childrenAges['0-5'] + wizardState.childrenAges['6-12'] + wizardState.childrenAges['13-17']) === wizardState.childrenCount
              ? 'text-green-200'
              : 'text-orange-200'
          }`}>
            {(wizardState.childrenAges['0-5'] + wizardState.childrenAges['6-12'] + wizardState.childrenAges['13-17']) === wizardState.childrenCount
              ? `✅ Parfait! ${wizardState.childrenCount} enfant(s) sélectionné(s)`
              : `⚠️ Sélectionnez ${wizardState.childrenCount - (wizardState.childrenAges['0-5'] + wizardState.childrenAges['6-12'] + wizardState.childrenAges['13-17'])} enfant(s) de plus`
            }
          </p>
        </motion.div>

        {/* CPE Question - Only if 0-5 age exists */}
        <AnimatePresence>
          {wizardState.childrenAges['0-5'] > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setWizardState({ ...wizardState, hasCPE: !wizardState.hasCPE })}
                className={`w-full p-6 rounded-2xl border-2 transition-all ${
                  wizardState.hasCPE
                    ? 'bg-green-500/20 border-green-400 shadow-lg shadow-green-500/20'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    wizardState.hasCPE ? 'bg-green-500' : 'bg-white/10'
                  }`}>
                    <Home className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-lg font-bold text-white mb-1">
                      Avez-vous une place en CPE?
                    </h3>
                    <p className="text-sm text-slate-400">
                      Garderie subventionnée (~9$/jour vs 50$/jour privé)
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                    wizardState.hasCPE ? 'border-green-400 bg-green-500' : 'border-white/20'
                  }`}>
                    {wizardState.hasCPE && <CheckCircle2 className="w-6 h-6 text-white" />}
                  </div>
                </div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// STEP 4: CITY
export function CityStep({ wizardState, setWizardState, direction, slideVariants }: StepProps) {
  return (
    <motion.div
      key="city"
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
          <MapPin className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-4xl font-bold text-white mb-3">
          Où souhaitez-vous vivre?
        </h2>
        <p className="text-slate-400 text-lg">
          Choisissez votre ville au Québec
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 max-w-6xl mx-auto">
        {QUEBEC_CITIES.map((city, index) => (
          <motion.button
            key={city.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setWizardState({ ...wizardState, cityId: city.id })}
            className={`relative p-4 rounded-xl border-2 transition-all ${
              wizardState.cityId === city.id
                ? 'bg-blue-500/20 border-blue-400 shadow-lg shadow-blue-500/20'
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            {wizardState.cityId === city.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2"
              >
                <CheckCircle2 className="w-5 h-5 text-blue-400" />
              </motion.div>
            )}
            <Home className={`w-6 h-6 mb-2 mx-auto ${
              wizardState.cityId === city.id ? 'text-blue-400' : 'text-slate-400'
            }`} />
            <h3 className="text-lg font-bold text-white mb-1 text-center">{city.name}</h3>
            <div className="text-center space-y-1 text-xs">
              <div className="text-slate-400">
                {(city.population / 1000).toFixed(0)}k habitants
              </div>
              <div className="text-white font-semibold">
                {city.avgRent}$/mois
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

// STEP 5: HOUSING
export function HousingStep({ wizardState, setWizardState, direction, slideVariants }: StepProps) {
  return (
    <motion.div
      key="housing"
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
          className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/50"
        >
          <Home className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-4xl font-bold text-white mb-3">
          Quel type de logement?
        </h2>
        <p className="text-slate-400 text-lg mb-2">
          Selon votre situation familiale
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-400/30 rounded-lg">
          <span className="text-sm text-blue-200">
            💡 Les options sont adaptées à votre foyer
            {wizardState.childrenCount > 0 && ` (${wizardState.childrenCount} enfant${wizardState.childrenCount > 1 ? 's' : ''})`}
          </span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {getHousingOptions(wizardState).map((option, idx) => (
          <motion.button
            key={option.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setWizardState({ ...wizardState, housingType: option.value })}
            className={`p-6 rounded-2xl border-2 transition-all text-left ${
              wizardState.housingType === option.value
                ? 'bg-orange-500/20 border-orange-400 shadow-lg shadow-orange-500/20'
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                wizardState.housingType === option.value ? 'bg-orange-500' : 'bg-white/10'
              }`}>
                <Home className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-white">{option.label}</h3>
                  {option.recommended && (
                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">
                      Recommandé
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-400">{option.description}</p>
              </div>
              {wizardState.housingType === option.value && (
                <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0" />
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

// STEP 6: TRANSPORT
export function TransportStep({ wizardState, setWizardState, direction, slideVariants }: StepProps) {
  return (
    <motion.div
      key="transport"
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
          className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/50"
        >
          <Car className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-4xl font-bold text-white mb-3">
          Comment vous déplacez-vous?
        </h2>
        <p className="text-slate-400 text-lg">
          Votre mode de transport principal
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {getTransportOptions(wizardState).map((option, idx) => (
          <motion.button
            key={option.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setWizardState({ ...wizardState, transportType: option.value })}
            className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
              wizardState.transportType === option.value
                ? 'bg-green-500/20 border-green-400 shadow-lg shadow-green-500/20'
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                wizardState.transportType === option.value ? 'bg-green-500' : 'bg-white/10'
              }`}>
                <Car className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">{option.label}</h3>
                <p className="text-sm text-slate-400">{option.description}</p>
                <p className="text-xs text-green-300 mt-1 font-semibold">
                  {option.monthlyCost === 0 ? 'Gratuit' : `${option.monthlyCost}$/mois`}
                </p>
              </div>
              {wizardState.transportType === option.value && (
                <CheckCircle2 className="w-6 h-6 text-green-400" />
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
