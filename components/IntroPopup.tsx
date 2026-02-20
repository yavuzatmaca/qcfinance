'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Coffee, X, Heart } from 'lucide-react'

const POPUP_STORAGE_KEY = 'qcfinance_intro_popup_closed'
const POPUP_DELAY = 7000 // 7 seconds
const POPUP_EXPIRY_DAYS = 30

export default function IntroPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [showStickyButton, setShowStickyButton] = useState(false)
  const [isStickyButtonDismissed, setIsStickyButtonDismissed] = useState(false)

  useEffect(() => {
    // Check if popup was previously closed
    const popupData = localStorage.getItem(POPUP_STORAGE_KEY)
    
    if (popupData) {
      const { closedAt } = JSON.parse(popupData)
      const daysSinceClosed = (Date.now() - closedAt) / (1000 * 60 * 60 * 24)
      
      if (daysSinceClosed < POPUP_EXPIRY_DAYS) {
        return // Don't show popup
      }
    }

    // Listen for calculation complete event
    const handleCalculationComplete = () => {
      // Wait 7 seconds after calculation
      setTimeout(() => {
        setIsVisible(true)
      }, POPUP_DELAY)
    }

    window.addEventListener('qcfinance:calculation-complete', handleCalculationComplete)

    return () => {
      window.removeEventListener('qcfinance:calculation-complete', handleCalculationComplete)
    }
  }, [])

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isVisible])

  const handleClose = () => {
    setIsVisible(false)
    setShowStickyButton(true) // Show sticky button when popup closes
    localStorage.setItem(
      POPUP_STORAGE_KEY,
      JSON.stringify({ closedAt: Date.now() })
    )
  }

  const handleStickyButtonDismiss = () => {
    setIsStickyButtonDismissed(true)
    localStorage.setItem('qcfinance_sticky_button_dismissed', 'true')
  }

  const handleCoffee = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'coffee_click', {
        event_category: 'Engagement',
        event_label: 'Intro Popup Modal',
      })
    }
    
    window.open('https://www.buymeacoffee.com/qcfinance', '_blank')
    handleClose()
  }

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[10000]"
              onClick={handleClose}
            />

          <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ 
                type: 'spring',
                damping: 25,
                stiffness: 300,
                duration: 0.5
              }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-[500px] max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-20 h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500"></div>

              <button
                onClick={handleClose}
                className="sticky top-3 right-5 float-right w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-all z-30 group"
                aria-label="Fermer"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              <div className="p-6 sm:p-8 clear-both">
                <div className="flex justify-center mb-6">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: 0.2,
                      type: 'spring',
                      stiffness: 200,
                      damping: 15
                    }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-emerald-500 rounded-2xl blur-2xl opacity-40 animate-pulse"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/50 border-4 border-white">
                      <Heart className="w-10 h-10 text-white fill-white animate-pulse" />
                    </div>
                  </motion.div>
                </div>

                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl sm:text-4xl font-extrabold text-center mb-3 leading-tight bg-gradient-to-r from-slate-900 via-emerald-900 to-slate-900 bg-clip-text text-transparent"
                >
                  L'histoire derrière QC Finance
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center text-emerald-600 font-semibold mb-8 flex items-center justify-center gap-2"
                >
                  <span className="text-2xl">🍁</span>
                  <span>Fait avec passion au Québec</span>
                  <span className="text-2xl">🍁</span>
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-slate-700 leading-relaxed mb-8 space-y-4 text-base"
                >
                  <p className="text-lg">
                    <strong className="text-slate-900 font-bold">Bonjour ! Je suis Mehmet</strong> 👋
                  </p>
                  <p>
                    J'ai créé QC Finance en 2025 pour aider les nouveaux arrivants et résidents du Québec à comprendre leur situation financière.
                  </p>
                  <p>
                    Ce projet est <strong className="text-emerald-600 font-bold">100% gratuit</strong> et <strong className="text-emerald-600 font-bold">sans publicité</strong>. 
                    Je le maintiens seul, le soir après mon travail, par passion pour aider la communauté.
                  </p>
                  
                  <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 shadow-inner">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200 rounded-full blur-3xl opacity-30"></div>
                    <p className="relative text-slate-800 font-medium flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">💡</span>
                      <span>
                        <strong className="text-emerald-700">Votre soutien fait la différence</strong><br/>
                        Même un café (5$) m'aide à payer l'hébergement et à continuer d'améliorer les outils pour vous.
                      </span>
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleCoffee}
                    className="relative w-full py-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white font-bold rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-emerald-500/60 flex items-center justify-center gap-3 text-lg overflow-hidden group"
                  >
                    <Coffee className="w-6 h-6 relative z-10 transition-transform duration-300" />
                    
                    <span className="relative z-10 flex items-center gap-2">
                      M'offrir un café
                      <span className="text-2xl">☕</span>
                    </span>
                  </motion.button>

                  <button
                    onClick={handleClose}
                    className="w-full py-3 text-slate-500 hover:text-slate-700 font-semibold hover:underline transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>Continuer vers le site</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>

    {/* Sticky Donation Button */}
    <AnimatePresence>
      {showStickyButton && !isStickyButtonDismissed && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ 
            type: 'spring',
            damping: 20,
            stiffness: 300
          }}
          className="fixed bottom-6 right-6 z-[9999]"
        >
          <div className="relative">
            {/* Dismiss button */}
            <button
              onClick={handleStickyButtonDismiss}
              className="absolute -top-2 -right-2 w-6 h-6 bg-slate-900 hover:bg-slate-800 text-white rounded-full flex items-center justify-center text-xs transition-all hover:scale-110 shadow-lg z-10"
              aria-label="Fermer"
            >
              <X className="w-3 h-3" />
            </button>

            {/* Main button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCoffee}
              className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-full shadow-2xl hover:shadow-emerald-500/50 transition-all"
            >
              <Coffee className="w-5 h-5" />
              <span className="text-sm">Soutenir le projet</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </>
  )
}
