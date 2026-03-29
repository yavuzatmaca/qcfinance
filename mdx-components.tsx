import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import { Calculator, TrendingUp, Home, DollarSign } from 'lucide-react'
import BlogImage from '@/components/BlogImage'
import AdSenseAd from '@/components/AdSenseAd'

// Custom components for MDX content
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings with custom styling
    h1: ({ children }) => (
      <h1 className="text-4xl font-black text-slate-900 mb-6 mt-8 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-black text-emerald-600 mb-6 mt-12 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
        {children}
      </h3>
    ),
    
    // Paragraphs
    p: ({ children }) => (
      <p className="text-slate-700 leading-relaxed mb-6 text-lg">
        {children}
      </p>
    ),
    
    // Lists
    ul: ({ children }) => (
      <ul className="space-y-2 mb-6 ml-6">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="space-y-2 mb-6 ml-6 list-decimal">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-slate-700 leading-relaxed">
        {children}
      </li>
    ),
    
    // Links
    a: ({ href, children }) => (
      <Link 
        href={href || '#'} 
        className="text-emerald-600 font-semibold hover:underline"
      >
        {children}
      </Link>
    ),
    
    // Code blocks
    code: ({ children }) => (
      <code className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    
    // Blockquotes
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-emerald-500 pl-6 py-2 my-6 bg-emerald-50 rounded-r-lg">
        <div className="text-slate-700 italic">
          {children}
        </div>
      </blockquote>
    ),
    
    // Horizontal rule
    hr: () => (
      <hr className="my-8 border-slate-200" />
    ),
    
    // Strong/Bold
    strong: ({ children }) => (
      <strong className="font-bold text-slate-900">
        {children}
      </strong>
    ),
    
    // Custom Components for Blog Posts
    CalculatorCTA: ({ href, title, description }: { href: string; title: string; description: string }) => (
      <div className="my-8 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-black text-slate-900 mb-2">{title}</h3>
            <p className="text-slate-700 mb-4">{description}</p>
            <Link
              href={href}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
            >
              <span>Essayer maintenant</span>
              <Calculator className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    ),
    
    InfoBox: ({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'warning' | 'success' | 'intro' | 'tip' }) => {
      const styles = {
        info: 'bg-blue-50 border-blue-200 text-blue-900',
        warning: 'bg-yellow-50 border-yellow-300 text-yellow-900',
        success: 'bg-emerald-50 border-emerald-200 text-emerald-900',
        intro: 'bg-blue-50 border-blue-200 text-blue-900',
        tip: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      }
      
      const icons = {
        info: <TrendingUp className="w-5 h-5" />,
        warning: <Home className="w-5 h-5" />,
        success: <DollarSign className="w-5 h-5" />,
        intro: <TrendingUp className="w-5 h-5" />,
        tip: <DollarSign className="w-5 h-5" />,
      }
      
      return (
        <div className={`my-6 p-5 rounded-xl border-2 ${styles[type]}`}>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              {icons[type]}
            </div>
            <div className="flex-1">
              {children}
            </div>
          </div>
        </div>
      )
    },
    
    // Blog Image Component
    BlogImage: ({ src, alt, width, height }: { src: string; alt: string; width?: number; height?: number }) => (
      <BlogImage src={src} alt={alt} width={width} height={height} />
    ),

    // AdSense Ad Component
    AdSenseAd: ({ adSlot = "6737944215", adFormat, fullWidthResponsive, style, mobileOnly, desktopOnly }: { 
      adSlot?: string; 
      adFormat?: 'auto' | 'fluid' | 'rectangle'; 
      fullWidthResponsive?: boolean; 
      style?: React.CSSProperties; 
      mobileOnly?: boolean; 
      desktopOnly?: boolean; 
    }) => (
      <AdSenseAd 
        adSlot={adSlot} 
        adFormat={adFormat} 
        fullWidthResponsive={fullWidthResponsive} 
        style={style} 
      />
    ),

    
    ...components,
  }
}
