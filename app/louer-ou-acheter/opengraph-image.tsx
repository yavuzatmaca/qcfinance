import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Louer ou Acheter au Québec? - Calculateur et Comparatif 2026'
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
          background: 'linear-gradient(135deg, #047857 0%, #10b981 50%, #34d399 100%)',
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
              🏠
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
              Immobilier
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
            Louer ou
            <br />
            Acheter?
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
            Comparez financièrement l'achat vs la location sur 5 ans
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
                color: '#047857',
                display: 'flex',
              }}
            >
              Comparer Maintenant
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

