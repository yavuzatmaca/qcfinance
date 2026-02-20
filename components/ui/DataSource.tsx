import Link from 'next/link'
import { Building2, ExternalLink } from 'lucide-react'
import { siteConfig } from '@/lib/siteConfig'

interface DataSourceProps {
  source?: 'revenuQuebec' | 'bankOfCanada' | 'statisticsCanada' // Predefined sources
  label?: string; // Custom label (overrides predefined)
  url?: string;   // Custom URL (overrides predefined)
  lastUpdate?: string; // Custom date (overrides predefined)
}

export default function DataSource({ source, label, url, lastUpdate }: DataSourceProps) {
  // Use predefined source if provided, otherwise use custom values
  const sourceData = source ? siteConfig.dataSources[source] : null
  
  const displayLabel = label || sourceData?.label || 'Source de données'
  const displayUrl = url || sourceData?.url || '#'
  const displayUpdate = lastUpdate || sourceData?.lastUpdate

  return (
    <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-3 px-4 bg-slate-50 border border-slate-100 rounded-lg text-xs">
      {/* Left: The Source Link */}
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-white border border-slate-200 rounded-md shadow-sm">
          <Building2 className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <div className="flex flex-col">
          <span className="text-slate-400 font-medium text-[10px] uppercase tracking-wider">
            Source Officielle
          </span>
          <Link 
            href={displayUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1 font-semibold text-slate-700 hover:text-emerald-600 hover:underline transition-colors"
          >
            {displayLabel}
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Right: Last Update Badge */}
      {displayUpdate && (
        <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-100">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold">Données: {displayUpdate}</span>
        </div>
      )}
    </div>
  )
}
