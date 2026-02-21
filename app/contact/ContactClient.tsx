'use client'

import { useState, FormEvent } from 'react'

export default function ContactClient() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [charCount, setCharCount] = useState(0)
  const [showCalculatorField, setShowCalculatorField] = useState(false)

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setShowCalculatorField(value === 'bug' || value === 'suggestion')
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Reset all states first
    setShowSuccess(false)
    setShowError(false)
    setIsSubmitting(true)

    // Store form reference before async operations
    const form = e.currentTarget

    try {
      const formData = new FormData(form)
      
      // Add Web3Forms access key
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '90826a9f-ceae-4c5f-b43e-41b17e49ede7'
      formData.append('access_key', accessKey)
      
      // Customize subject line
      const subjectType = formData.get('subject')
      const name = formData.get('name')
      formData.set('subject', `[QCFinance Contact] ${subjectType} - ${name}`)
      
      // Send to Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      
      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to send')
      }

      // Only show success if we get here
      setIsSubmitting(false)
      setShowSuccess(true)
      setShowError(false)
      
      // Reset form safely
      if (form) {
        form.reset()
      }
      setCharCount(0)
      setShowCalculatorField(false)
      
      // Scroll to success message
      setTimeout(() => {
        document.getElementById('successMessage')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
      
    } catch (error) {
      setIsSubmitting(false)
      setShowSuccess(false)
      setShowError(true)
      
      // Scroll to error message
      setTimeout(() => {
        document.getElementById('errorMessage')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    }
  }

  return (
    <div className="glass-effect rounded-3xl luxury-shadow p-10 md:p-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 luxury-gradient-blue rounded-2xl flex items-center justify-center shadow-2xl">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Envoyez-nous un message</h2>
          <p className="text-gray-500 text-sm mt-1">Nous vous répondrons dans les plus brefs délais</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Name & Email */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
              Nom complet <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="name" 
              name="name"
              required
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl transition-all outline-none bg-white focus:border-blue-500 focus:shadow-lg"
              placeholder="Jean Tremblay"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
              Courriel <span className="text-red-500">*</span>
            </label>
            <input 
              type="email" 
              id="email" 
              name="email"
              required
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl transition-all outline-none bg-white focus:border-blue-500 focus:shadow-lg"
              placeholder="jean@exemple.com"
            />
          </div>
        </div>

        {/* Subject Type */}
        <div>
          <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
            Type de demande <span className="text-red-500">*</span>
          </label>
          <select 
            id="subject" 
            name="subject"
            required
            onChange={handleSubjectChange}
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl transition-all outline-none bg-white cursor-pointer focus:border-blue-500 focus:shadow-lg"
          >
            <option value="">Sélectionnez une option</option>
            <option value="bug">Signaler un bug</option>
            <option value="suggestion">Suggérer une amélioration</option>
            <option value="question">Question générale</option>
            <option value="partnership">Partenariat</option>
            <option value="privacy">Question sur la confidentialité</option>
            <option value="other">Autre</option>
          </select>
        </div>

        {/* Calculator (conditional) */}
        {showCalculatorField && (
          <div>
            <label htmlFor="calculator" className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
              Quel calculateur?
            </label>
            <select 
              id="calculator" 
              name="calculator"
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl transition-all outline-none bg-white cursor-pointer focus:border-blue-500 focus:shadow-lg"
            >
              <option value="">Sélectionnez un calculateur</option>
              <option value="salaire">Salaire Net Québec</option>
              <option value="hypotheque">Calculateur Hypothécaire</option>
              <option value="garde">Frais de Garde</option>
              <option value="auto">Prêt Auto</option>
              <option value="loyer">Augmentation Loyer</option>
              <option value="allocations">Allocations Familiales</option>
              <option value="autre">Autre</option>
            </select>
          </div>
        )}

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
            Votre message <span className="text-red-500">*</span>
          </label>
          <textarea 
            id="message" 
            name="message"
            required
            minLength={20}
            rows={7}
            onChange={handleMessageChange}
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl transition-all outline-none resize-none bg-white focus:border-blue-500 focus:shadow-lg"
            placeholder="Décrivez votre demande en détail..."
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-500">Minimum 20 caractères</p>
            <p className={`text-xs font-semibold ${charCount >= 20 ? 'text-green-600' : 'text-gray-400'}`}>
              {charCount} caractères
            </p>
          </div>
        </div>

        {/* Privacy Checkbox */}
        <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-xl border-2 border-gray-100">
          <input 
            type="checkbox" 
            id="privacy" 
            name="privacy"
            required
            className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded cursor-pointer"
          />
          <label htmlFor="privacy" className="text-sm text-gray-700 cursor-pointer">
            J&apos;accepte que mes informations soient utilisées pour répondre à ma demande. 
            <a href="/confidentialite" className="text-blue-600 font-semibold underline ml-1">
              Politique de confidentialité
            </a>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full luxury-gradient-blue text-white font-bold py-5 px-8 rounded-xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Envoi en cours...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-3">
                <span className="text-lg">Envoyer le message</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            )}
          </button>
        </div>
      </form>

      {/* Success Message */}
      {showSuccess && (
        <div id="successMessage" className="mt-8 glass-effect rounded-2xl luxury-shadow p-8 border-l-4 border-green-500 animate-fade-in">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce-once">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Message envoyé avec succès! 🎉</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Merci de nous avoir contactés. Votre message a bien été reçu et nous vous répondrons dans les plus brefs délais.
              </p>
              <div className="bg-green-50 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>Temps de réponse:</strong> 24-48 heures (jours ouvrables)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span><strong>Email de confirmation:</strong> Vérifiez votre boîte de réception</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>Référence:</strong> Conservez ce message pour votre suivi</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 italic">
                En attendant notre réponse, n&apos;hésitez pas à consulter notre <a href="/faq" className="text-blue-600 underline font-semibold">FAQ</a> pour des réponses immédiates.
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceOnce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-bounce-once {
          animation: bounceOnce 0.6s ease-out;
        }
      `}</style>

      {/* Error Message */}
      {showError && (
        <div id="errorMessage" className="mt-8 glass-effect rounded-2xl luxury-shadow p-8 border-l-4 border-red-500">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Erreur d&apos;envoi</h3>
              <p className="text-gray-600">Une erreur s&apos;est produite. Veuillez réessayer.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
