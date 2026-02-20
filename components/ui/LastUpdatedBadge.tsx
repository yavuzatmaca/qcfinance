import { Calendar } from 'lucide-react'

interface LastUpdatedBadgeProps {
  date?: string
  variant?: 'default' | 'compact' | 'prominent'
  theme?: 'light' | 'dark'
}

export default function LastUpdatedBadge({ 
  date = 'Janvier 2026',
  variant = 'default',
  theme = 'light'
}: LastUpdatedBadgeProps) {
  
  // Prominent variant - highly visible
  if (variant === 'prominent') {
    return (
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm shadow-lg border-2 ${
        theme === 'dark' 
          ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300' 
          : 'bg-emerald-50 border-emerald-300 text-emerald-700'
      }`}>
        <Calendar className="w-4 h-4" aria-hidden="true" />
        <span>Mis à jour: {date}</span>
        <span className={`w-2 h-2 rounded-full animate-pulse ${
          theme === 'dark' ? 'bg-emerald-400' : 'bg-emerald-500'
        }`} aria-hidden="true" />
      </div>
    )
  }

  // Compact variant
  if (variant === 'compact') {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        theme === 'dark'
          ? 'bg-white/10 border border-white/20 text-slate-300'
          : 'bg-blue-100 text-blue-800'
      }`}>
        <Calendar className="w-3 h-3" aria-hidden="true" />
        {date}
      </span>
    )
  }

  // Default variant
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${
      theme === 'dark'
        ? 'bg-white/10 border border-white/20 text-slate-300'
        : 'bg-blue-100 text-blue-800'
    }`}>
      <Calendar className="w-4 h-4" aria-hidden="true" />
      Mis à jour: {date}
    </span>
  )
}
