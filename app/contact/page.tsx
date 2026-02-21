import { Metadata } from 'next'
import Link from 'next/link'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: "Contact - Nous Joindre | QCFinance.ca",
  description: "Contactez l'équipe de QCFinance.ca pour vos questions, suggestions ou signaler un problème. Formulaire de contact sécurisé et réponse sous 24-48h.",
}

export default function ContactPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .glass-effect {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .luxury-gradient-blue {
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%);
        }
        
        .luxury-shadow {
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }
      `}} />
      
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <Link href="/" className="inline-flex items-center text-blue-600 font-semibold mb-4 gap-2 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour à l&apos;accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Contactez-Nous
          </h1>
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            Notre équipe est là pour vous accompagner
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Contact Form */}
          <div className="lg:col-span-2">
            <ContactClient />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="glass-effect rounded-2xl luxury-shadow p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 luxury-gradient-blue rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Contact Direct</h3>
              </div>
              <div className="space-y-5">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-bold">Email Principal</p>
                  <a href="mailto:contact@qcfinance.ca" className="text-blue-600 font-semibold text-sm">
                    contact@qcfinance.ca
                  </a>
                  <p className="text-xs text-gray-600 mt-1">Pour toutes questions générales</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-bold">Support Technique</p>
                  <a href="mailto:support@qcfinance.ca" className="text-blue-600 font-semibold text-sm">
                    support@qcfinance.ca
                  </a>
                  <p className="text-xs text-gray-600 mt-1">Pour signaler un bug ou problème technique</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-bold">Protection des Données</p>
                  <a href="mailto:privacy@qcfinance.ca" className="text-blue-600 font-semibold text-sm">
                    privacy@qcfinance.ca
                  </a>
                  <p className="text-xs text-gray-600 mt-1">Questions sur la confidentialité</p>
                </div>
                <div className="pt-4 border-t-2 border-gray-100">
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">Réponse sous <strong className="text-blue-600">24-48h</strong></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="glass-effect rounded-2xl luxury-shadow p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 luxury-gradient-blue rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Notre Localisation</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">QCFinance.ca</p>
                  <p className="text-sm text-gray-700">Québec/Canada</p>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed pt-3 border-t border-gray-200">
                  Fièrement exploité depuis le Québec, pour les Québécois. Tous nos calculateurs sont adaptés aux réalités fiscales et financières du Québec.
                </p>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="luxury-gradient-blue rounded-2xl luxury-shadow p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-bold text-xl">Besoin d&apos;aide rapide?</h3>
              </div>
              <p className="text-blue-100 text-sm mb-5 leading-relaxed">
                Consultez notre FAQ pour des réponses instantanées aux questions courantes.
              </p>
              <Link href="/faq" className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-6 py-3 rounded-xl shadow-lg">
                <span>Voir la FAQ</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* Important Notice */}
            <div className="glass-effect rounded-2xl luxury-shadow p-6 border-l-4 border-amber-500">
              <div className="flex items-start gap-3">
                <svg className="w-8 h-8 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Important à Noter</h3>
                  <div className="space-y-2 text-xs text-gray-700 leading-relaxed">
                    <p>
                      <strong>QCFinance.ca ne fournit pas de conseils financiers, fiscaux ou juridiques personnalisés.</strong>
                    </p>
                    <p>
                      Nos outils sont conçus à des fins informatives et éducatives uniquement. Pour des conseils adaptés à votre situation personnelle, veuillez consulter un professionnel qualifié (comptable, planificateur financier, conseiller fiscal, etc.).
                    </p>
                    <p className="pt-1">
                      Nous ne répondons pas aux questions nécessitant une expertise professionnelle en finance, fiscalité ou droit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comment Pouvons-Nous Vous Aider? */}
        <div className="mt-12">
          <div className="glass-effect rounded-2xl luxury-shadow p-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Comment Pouvons-Nous Vous Aider?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Bug Report */}
              <div className="bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 rounded-xl p-6">
                <div className="w-14 h-14 bg-gradient-to-br from-red-400 to-rose-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Signaler un Bug</h3>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  Un calculateur ne fonctionne pas correctement? Signalez-nous le problème via le formulaire ci-dessus.
                </p>
                <p className="text-xs text-gray-600 italic">
                  Sélectionnez &quot;🐛 Signaler un bug&quot; dans le formulaire
                </p>
              </div>

              {/* Suggestion */}
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-xl p-6">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Suggérer une Idée</h3>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  Vous avez une idée de nouveau calculateur ou d&apos;amélioration? Partagez-la avec nous!
                </p>
                <p className="text-xs text-gray-600 italic">
                  Sélectionnez &quot;💡 Suggérer une amélioration&quot;
                </p>
              </div>

              {/* Question */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Question Générale</h3>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  Une question sur nos outils ou notre mission? Nous sommes là pour vous répondre.
                </p>
                <p className="text-xs text-gray-600 italic">
                  Sélectionnez &quot;❓ Question générale&quot;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Liens Utiles */}
        <div className="mt-8">
          <div className="glass-effect rounded-2xl luxury-shadow p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Liens Utiles</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/a-propos" className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl text-gray-700">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-semibold">À Propos de QCFinance.ca</span>
              </Link>
              <Link href="/confidentialite" className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl text-gray-700">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="font-semibold">Politique de Confidentialité</span>
              </Link>
              <Link href="/conditions" className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl text-gray-700">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="font-semibold">Conditions d&apos;Utilisation</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      </main>
    </>
  )
}
