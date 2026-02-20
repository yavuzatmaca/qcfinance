'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled down 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Add scroll event listener
    window.addEventListener('scroll', toggleVisibility)

    // Cleanup
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-40 w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-emerald-500/20 hover:border-emerald-400/50 text-white rounded-2xl shadow-2xl transition-all duration-300 flex items-center justify-center group hover:scale-110 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-label="Retour en haut"
    >
      <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform text-emerald-400 stroke-[2.5]" />
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
    </button>
  )
}
