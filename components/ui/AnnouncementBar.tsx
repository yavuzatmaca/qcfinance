'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, ArrowRight, Sparkles, TrendingUp, Home, Calculator } from 'lucide-react'

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  // --- ALL SCENARIOS ---
  const scenarios = [
    {
      id: 'tax-2026-launch',
      badge: 'NOUVEAU 2026',
      text: "Les nouvelles tables d'impôt 2026 sont arrivées. Voyez l'impact sur votre poche.",
      href: '/salaire-net-quebec',
      icon: <Sparkles className="w-3 h-3" />,
      color: 'emerald'
    },
    {
      id: 'family-alloc-update',
      badge: 'FAMILLE',
      text: "Augmentation des allocations familiales en vue? Vérifiez votre éligibilité.",
      href: '/allocations-familiales',
      icon: <TrendingUp className="w-3 h-3" />,
      color: 'pink'
    },
    {
      id: 'mortgage-rate-hold',
      badge: 'IMMOBILIER',
      text: "La Banque du Canada maintient son taux. Est-ce le moment d'acheter?",
      href: '/calcul-hypotheque',
      icon: <Home className="w-3 h-3" />,
      color: 'blue'
    },
    {
      id: 'tax-return-fast',
      badge: 'RETOUR RAPIDE',
      text: "Ne laissez pas d'argent sur la table. Estimez votre retour d'impôt.",
      href: '/declaration-simplifiee',
      icon: <Calculator className="w-3 h-3" />,
      color: 'amber'
    }
  ]

  const config = scenarios[currentIndex]

  useEffect(() => {
    const closed = localStorage.getItem('announcement-bar-closed')
    if (!closed) {
      // Small delay for smooth entry animation
      const timer = setTimeout(() => setIsVisible(true), 500)
      return () => clearTimeout(timer)
    }
  }, [])

  // Auto-rotate every 10 seconds
  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % scenarios.length)
    }, 10000) // 10 seconds

    return () => clearInterval(interval)
  }, [isVisible, scenarios.length])

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsVisible(false)
    // Close all announcements with single key
    localStorage.setItem('announcement-bar-closed', 'true')
  }

  if (!isVisible) return null

  // Dynamic gradient based on color
  const gradientClasses = {
    emerald: 'from-emerald-900/40 via-slate-900 to-slate-900',
    pink: 'from-pink-900/40 via-slate-900 to-slate-900',
    blue: 'from-blue-900/40 via-slate-900 to-slate-900',
    amber: 'from-amber-900/40 via-slate-900 to-slate-900'
  }

  return (
    <div className="relative bg-slate-900 text-white overflow-hidden transition-all duration-500 ease-in-out z-50">
      {/* Dynamic Gradient Background */}
      <div 
        className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r ${gradientClasses[config.color as keyof typeof gradientClasses]} pointer-events-none transition-all duration-1000`} 
      />

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2.5 text-xs md:text-sm relative z-10">
          <Link 
            href={config.href} 
            className="flex-1 flex items-center justify-center gap-3 group hover:opacity-90 transition-opacity"
          >
            {/* Badge */}
            <span 
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] border transition-all duration-500 ${
                config.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                config.color === 'pink' ? 'bg-pink-500/20 text-pink-300 border-pink-500/30' :
                config.color === 'blue' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                'bg-amber-500/20 text-amber-300 border-amber-500/30'
              }`}
            >
              {config.icon}
              {config.badge}
            </span>

            {/* Message with fade transition */}
            <span 
              key={config.id}
              className="font-medium truncate max-w-[200px] sm:max-w-none animate-fade-in"
            >
              {config.text}
            </span>

            {/* CTA Arrow */}
            <span className="hidden sm:inline-flex items-center font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
              Voir <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </span>
          </Link>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors ml-4 focus:outline-none"
            aria-label="Fermer"
          >
            <X className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}
