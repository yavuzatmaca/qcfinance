'use client'

import Link from 'next/link'
import { useState } from 'react'
import { 
  Heart, 
  DollarSign, 
  Home, 
  CreditCard, 
  FileText, 
  AlertTriangle, 
  Info, 
  HelpCircle, 
  MessageSquare,
  ArrowRight,
  Check,
  Shield,
  Lock,
  CheckCircle,
  Zap,
  Mail
} from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 mt-auto relative overflow-hidden">
      {/* Background Glow - Improved */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      
      <div className="container mx-auto px-6 py-16 pb-0 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Column 1: Brand & Mission (Span 4 cols) */}
          <div className="md:col-span-2 lg:col-span-4 space-y-6">
            {/* Logo */}
            <Link href="/" className="inline-block group">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all duration-300 group-hover:scale-105">
                  <DollarSign className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">qcfinance.ca</span>
              </div>
            </Link>
            
            {/* Description */}
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              La référence québécoise pour vos calculs financiers. Des outils précis, gratuits et anonymes pour maîtriser votre argent en 2026.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-900/30 border border-emerald-700/50 rounded-lg">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-emerald-400 font-semibold">100% Gratuit</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/50 border border-slate-800 rounded-lg">
                <Lock className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-400 font-semibold">Anonyme</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/50 border border-slate-800 rounded-lg">
                <CheckCircle className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-400 font-semibold">Taux 2026</span>
              </div>
            </div>
            
            {/* Social Icons - Improved */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Suivez-nous</span>
              <div className="flex gap-2">
                <SocialLink 
                  icon={
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  } 
                  href="https://www.facebook.com/qcfinance" 
                  label="Facebook"
                />
                <SocialLink 
                  icon={
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  } 
                  href="https://twitter.com/qcfinance" 
                  label="Twitter/X"
                />
                <SocialLink 
                  icon={
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  } 
                  href="https://linkedin.com/company/qcfinance" 
                  label="LinkedIn"
                />
                <SocialLink 
                  icon={
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  } 
                  href="https://www.youtube.com/@qcfinance" 
                  label="YouTube"
                />
              </div>
            </div>
          </div>

          {/* Column 2: Outils Populaires (Span 3 cols) */}
          <div className="md:col-span-1 lg:col-span-3">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-emerald-500 rounded-full" />
              Outils Populaires
            </h3>
            <ul className="space-y-1">
              <ToolLink href="/salaire-net-quebec" icon={<DollarSign className="w-4 h-4" />} text="Salaire Net" />
              <ToolLink href="/simulateur-vie-quebec" icon={<Zap className="w-4 h-4" />} text="Simulateur Premium" badge="NOUVEAU" />
              <ToolLink href="/calcul-hypotheque" icon={<Home className="w-4 h-4" />} text="Hypothèque" />
              <ToolLink href="/pret-auto" icon={<CreditCard className="w-4 h-4" />} text="Prêt Auto" />
              <ToolLink href="/declaration-simplifiee" icon={<FileText className="w-4 h-4" />} text="Déclaration" />
            </ul>
          </div>

          {/* Column 3: Support (Span 2 cols) */}
          <div className="md:col-span-1 lg:col-span-2">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-emerald-500 rounded-full" />
              Support
            </h3>
            <ul className="space-y-0">
              <FooterLink href="/a-propos" icon={<Info className="w-4 h-4" />} text="À Propos" />
              <FooterLink href="/faq" icon={<HelpCircle className="w-4 h-4" />} text="FAQ" />
              <FooterLink href="/contact" icon={<MessageSquare className="w-4 h-4" />} text="Contact" />
              <FooterLink href="/confidentialite" icon={<Shield className="w-4 h-4" />} text="Confidentialité" />
            </ul>
          </div>

          {/* Column 4: Newsletter (Span 3 cols) */}
          <div className="md:col-span-2 lg:col-span-3">
            <NewsletterForm />
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-5 mb-8 border border-slate-800/50">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500/80 shrink-0 mt-0.5" />
            <p className="text-slate-500 text-xs leading-relaxed">
              <strong className="text-slate-400">Avis de non-responsabilité :</strong> QCFinance.ca fournit des outils de simulation à titre informatif seulement. Bien que nous visons la plus grande précision, ces résultats ne remplacent pas l'avis d'un professionnel financier. Certains liens peuvent être affiliés (ex: Wealthsimple), ce qui nous permet de maintenir ce service 100% gratuit.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 pb-0">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <p className="text-slate-600 flex items-center gap-1">
              © {currentYear} QCFinance.ca • Fait avec 
              <Heart className="w-3 h-3 text-red-500 inline animate-pulse fill-current" />
              au Québec
            </p>
            <div className="flex gap-6">
              <Link href="/conditions" className="text-slate-600 hover:text-emerald-400 transition-colors">Conditions</Link>
              <Link href="/avis-legal" className="text-slate-600 hover:text-emerald-400 transition-colors">Avis Légal</Link>
              <Link href="/confidentialite" className="text-slate-600 hover:text-emerald-400 transition-colors">Confidentialité</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Micro-Components for cleaner code
function SocialLink({ icon, href, label }: { icon: React.ReactNode, href: string, label?: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 bg-slate-900 hover:bg-emerald-600/20 hover:text-emerald-400 text-slate-400 rounded-xl flex items-center justify-center transition-all duration-300 border border-slate-800 hover:border-emerald-500/50 hover:scale-110"
    >
      {icon}
    </a>
  )
}

function ToolLink({ href, icon, text, badge }: { href: string, icon: React.ReactNode, text: string, badge?: string }) {
  return (
    <li>
      <Link 
        href={href} 
        className="group flex items-center gap-3 text-slate-400 hover:text-emerald-400 transition-all duration-200 text-sm py-0.5"
      >
        <div className="w-8 h-8 bg-slate-900 group-hover:bg-emerald-600/20 border border-slate-800 group-hover:border-emerald-500/50 rounded-lg flex items-center justify-center transition-all">
          {icon}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">{text}</span>
          {badge && (
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              {badge}
            </span>
          )}
        </div>
      </Link>
    </li>
  )
}

function FooterLink({ href, icon, text }: { href: string, icon: React.ReactNode, text: string }) {
  return (
    <li>
      <Link 
        href={href} 
        className="group flex items-center gap-2.5 text-slate-400 hover:text-emerald-400 transition-colors duration-200 text-sm"
      >
        <span className="opacity-50 group-hover:opacity-100 transition-opacity w-4 h-4 flex items-center justify-center">
          {icon}
        </span>
        <span>{text}</span>
      </Link>
    </li>
  )
}

function NewsletterForm() {
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
          _subject: 'Nouvelle inscription newsletter QCFinance'
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
    <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800 hover:border-emerald-500/30 transition-all duration-300">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-10 h-10 bg-emerald-600/20 rounded-xl flex items-center justify-center">
          <Mail className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h3 className="text-white font-bold text-sm">Restez informé</h3>
          <p className="text-slate-500 text-xs">Mises à jour fiscales 2026</p>
        </div>
      </div>
      
      {status === 'success' ? (
        <div className="flex items-center gap-2 bg-emerald-900/30 border border-emerald-700/50 rounded-lg px-4 py-3 text-emerald-400 text-sm">
          <Check className="w-5 h-5" />
          <span>{message}</span>
        </div>
      ) : (
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="relative">
            <input 
              type="email" 
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@courriel.com" 
              required
              disabled={status === 'loading'}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 text-white text-sm rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-slate-600 disabled:opacity-50"
            />
          </div>
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl px-4 py-3 transition-all text-sm flex items-center justify-center gap-2 group shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>S'inscrire gratuitement</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      )}
      
      {status === 'error' && (
        <p className="text-red-400 text-xs mt-2">{message}</p>
      )}
      
      <p className="text-slate-600 text-[10px] mt-3 flex items-center gap-1">
        <CheckCircle className="w-3 h-3" />
        Pas de pourriel. Désabonnement en tout temps.
      </p>
    </div>
  )
}
