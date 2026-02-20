/**
 * REUSABLE OG IMAGE TEMPLATE
 * 
 * Copy this file to any tool folder as `opengraph-image.tsx`
 * Then customize the following variables:
 * - TOOL_TITLE: The main title of your tool
 * - TOOL_SUBTITLE: Short description
 * - TOOL_CATEGORY: Category name (e.g., "Impôts & Revenus", "Immobilier", etc.)
 * - TOOL_EMOJI: Emoji icon for the tool
 * - GRADIENT_COLORS: Background gradient colors
 * 
 * EXAMPLE USAGE:
 * 
 * For Tax Tools (Blue):
 * - Gradient: '#1e40af', '#3b82f6', '#60a5fa'
 * - Emoji: 💰, 📊, 🧮, 📄
 * 
 * For Real Estate (Green):
 * - Gradient: '#047857', '#10b981', '#34d399'
 * - Emoji: 🏠, 🏡, 🏢, 🔑
 * 
 * For Family (Purple):
 * - Gradient: '#7c3aed', '#8b5cf6', '#a78bfa'
 * - Emoji: 👨‍👩‍👧, 👶, 🍼, 💝
 * 
 * For Auto/Debt (Orange):
 * - Gradient: '#ea580c', '#f97316', '#fb923c'
 * - Emoji: 🚗, 💳, 📉, 💸
 * 
 * For Investment (Indigo):
 * - Gradient: '#4f46e5', '#6366f1', '#818cf8'
 * - Emoji: 📈, 💹, 🎯, 💎
 */

import { ImageResponse } from 'next/og'

export const runtime = 'edge'

// ========== CUSTOMIZE THESE VALUES ==========
const TOOL_TITLE = 'Your Tool Name'
const TOOL_SUBTITLE = 'Short description of what your tool does'
const TOOL_CATEGORY = 'Category Name'
const TOOL_EMOJI = '🧮'
const GRADIENT_START = '#1e40af'
const GRADIENT_MIDDLE = '#3b82f6'
const GRADIENT_END = '#60a5fa'
// ============================================

export const alt = `${TOOL_TITLE} - ${TOOL_SUBTITLE}`
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          background: `linear-gradient(135deg, ${GRADIENT_START} 0%, ${GRADIENT_MIDDLE} 50%, ${GRADIENT_END} 100%)`,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Left Side - Icon */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '320px',
              height: '320px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '40px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div
              style={{
                fontSize: '180px',
                display: 'flex',
              }}
            >
              {TOOL_EMOJI}
            </div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '80px 60px',
          }}
        >
          {/* Category Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '30px',
            }}
          >
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.25)',
                padding: '12px 24px',
                borderRadius: '50px',
                fontSize: '24px',
                color: 'white',
                fontWeight: '600',
                display: 'flex',
                backdropFilter: 'blur(10px)',
              }}
            >
              {TOOL_CATEGORY}
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '24px',
              display: 'flex',
              lineHeight: 1.1,
              letterSpacing: '-1px',
            }}
          >
            {TOOL_TITLE}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '32px',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '40px',
              display: 'flex',
              lineHeight: 1.3,
            }}
          >
            {TOOL_SUBTITLE}
          </div>

          {/* CTA Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              background: 'white',
              padding: '20px 40px',
              borderRadius: '16px',
              width: 'fit-content',
            }}
          >
            <div
              style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: GRADIENT_START,
                display: 'flex',
              }}
            >
              Calculer Maintenant
            </div>
            <div
              style={{
                fontSize: '36px',
                display: 'flex',
              }}
            >
              →
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              fontSize: '20px',
              color: 'rgba(255, 255, 255, 0.7)',
              marginTop: '40px',
              display: 'flex',
            }}
          >
            qcfinance.ca
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

