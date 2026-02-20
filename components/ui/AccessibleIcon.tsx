'use client'

interface AccessibleIconProps {
  children: React.ReactNode
  label: string
  className?: string
}

/**
 * Accessible Icon Wrapper
 * Wraps SVG icons with proper ARIA labels for screen readers
 */
export default function AccessibleIcon({ children, label, className }: AccessibleIconProps) {
  return (
    <span role="img" aria-label={label} className={className}>
      {children}
    </span>
  )
}
