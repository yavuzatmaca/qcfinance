'use client'

import { useState } from 'react'
import { Mail, Check } from 'lucide-react'

export function NewsletterSidebar() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('https://formspree.io/f/xnjvwyrq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          _subject: 'Nouvelle inscription newsletter QCFinance - Blog'
        }),
      })

      if (response.ok) {
        setStatus('success')
        setMessage('Merci! Vous êtes inscrit.')
        setEmail('')
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        throw new Error('Erreur lors de l\'inscription')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Erreur. Réessayez plus tard.')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl shadow-lg p-6 text-white">
      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
        <Mail className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-black mb-2">Restez Informé</h3>
      <p className="text-sm text-white/90 mb-4">Recevez nos meilleurs conseils financiers par email</p>
      
      {status === 'success' ? (
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-3 text-white text-sm">
          <Check className="w-5 h-5" />
          <span>{message}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email" 
            required
            disabled={status === 'loading'}
            className="w-full px-4 py-3 rounded-lg text-slate-900 font-semibold mb-3 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50"
          />
          <button 
            type="submit"
            disabled={status === 'loading'}
            className="w-full px-4 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {status === 'loading' ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "S'abonner"
            )}
          </button>
          <p className="text-xs text-white/70 mt-3 text-center">
            🔒 Pas de spam, désabonnement facile
          </p>
        </form>
      )}
    </div>
  )
}
