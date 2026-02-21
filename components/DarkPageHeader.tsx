import { 
  FileText, 
  Clock, 
  Calendar, 
  Shield, 
  Receipt, 
  Home, 
  Scale, 
  TrendingUp, 
  Car, 
  Leaf,
  GraduationCap,
  Sparkles,
  Baby,
  CreditCard,
  Palmtree,
  DollarSign
} from 'lucide-react'
import Breadcrumb from './Breadcrumb'
import LastUpdatedBadge from './ui/LastUpdatedBadge'

interface DarkPageHeaderProps {
  badge: string
  badgeIcon?: string
  title: string
  titleAccent?: string
  description: string
  accentColor?: 'emerald' | 'cyan' | 'blue' | 'violet' | 'indigo' | 'purple' | 'amber' | 'lime' | 'pink' | 'slate'
  breadcrumbLabel?: string
  showLastUpdated?: boolean
}

const iconMap = {
  FileText,
  Clock,
  Calendar,
  Shield,
  Receipt,
  Home,
  Scale,
  TrendingUp,
  Car,
  Leaf,
  GraduationCap,
  Sparkles,
  Baby,
  CreditCard,
  Palmtree,
  DollarSign,
}

const gradientColors = {
  emerald: 'from-emerald-400 to-emerald-200',
  cyan: 'from-cyan-400 to-cyan-200',
  blue: 'from-blue-400 to-blue-200',
  violet: 'from-violet-400 to-violet-200',
  indigo: 'from-indigo-400 to-indigo-200',
  purple: 'from-purple-400 to-purple-200',
  amber: 'from-amber-400 to-amber-200',
  lime: 'from-lime-400 to-lime-200',
  pink: 'from-pink-400 to-pink-200',
  slate: 'from-slate-400 to-slate-200',
}

export default function DarkPageHeader({
  badge,
  badgeIcon,
  title,
  titleAccent,
  description,
  accentColor = 'emerald',
  breadcrumbLabel,
  showLastUpdated = false,
}: DarkPageHeaderProps) {
  const gradientClass = gradientColors[accentColor]
  const IconComponent = badgeIcon ? iconMap[badgeIcon as keyof typeof iconMap] : null

  return (
    <div className="bg-slate-900 text-white px-4 md:px-6 py-6 md:py-10">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb with Schema.org */}
        {breadcrumbLabel && (
          <div className="mb-4 md:mb-6">
            <Breadcrumb items={[{ label: breadcrumbLabel }]} theme="dark" />
          </div>
        )}

        {/* Centered Content */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-3 md:mb-4 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-[10px] md:text-xs font-semibold backdrop-blur-sm">
              {IconComponent && <IconComponent className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" aria-hidden="true" />}
              <span className="whitespace-nowrap">{badge}</span>
            </div>
            {showLastUpdated && (
              <LastUpdatedBadge variant="compact" theme="dark" />
            )}
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 leading-tight">
            {title}
            {titleAccent && (
              <> <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientClass}`}>{titleAccent}</span></>
            )}
          </h1>
          <p className="text-slate-300 text-xs md:text-sm lg:text-base max-w-2xl mx-auto leading-relaxed px-4">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
