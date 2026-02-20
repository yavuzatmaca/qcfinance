import { ImageResponse } from 'next/og'

export const runtime = 'edge'

const TOOL_TITLE = 'TPS TVQ Québec'
const TOOL_SUBTITLE = 'Calculateur taxes de vente'
const TOOL_CATEGORY = 'Impôts & Revenus'
const TOOL_EMOJI = '🧾'
const GRADIENT_START = '#1e40af'
const GRADIENT_MIDDLE = '#3b82f6'
const GRADIENT_END = '#60a5fa'

export const alt = `${TOOL_TITLE} - ${TOOL_SUBTITLE}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ height: '100%', width: '100%', display: 'flex', background: `linear-gradient(135deg, ${GRADIENT_START} 0%, ${GRADIENT_MIDDLE} 50%, ${GRADIENT_END} 100%)`, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '320px', height: '320px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '40px', backdropFilter: 'blur(10px)' }}>
            <div style={{ fontSize: '180px', display: 'flex' }}>{TOOL_EMOJI}</div>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.25)', padding: '12px 24px', borderRadius: '50px', fontSize: '24px', color: 'white', fontWeight: '600', display: 'flex', backdropFilter: 'blur(10px)' }}>{TOOL_CATEGORY}</div>
          </div>
          <div style={{ fontSize: '58px', fontWeight: 'bold', color: 'white', marginBottom: '24px', display: 'flex', lineHeight: 1.1, letterSpacing: '-1px' }}>{TOOL_TITLE}</div>
          <div style={{ fontSize: '32px', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '40px', display: 'flex', lineHeight: 1.3 }}>{TOOL_SUBTITLE}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'white', padding: '20px 40px', borderRadius: '16px', width: 'fit-content' }}>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: GRADIENT_START, display: 'flex' }}>Calculer Maintenant</div>
            <div style={{ fontSize: '36px', display: 'flex' }}>→</div>
          </div>
          <div style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '40px', display: 'flex' }}>qcfinance.ca</div>
        </div>
      </div>
    ),
    { ...size }
  )
}

