import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'QC Finance - Votre guide financier au Québec'
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
        {/* Left Side - Icons Grid */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '80px 60px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              maxWidth: '400px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100px', height: '100px', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '24px', fontSize: '48px', border: '2px solid rgba(255, 255, 255, 0.2)' }}>💰</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100px', height: '100px', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '24px', fontSize: '48px', border: '2px solid rgba(255, 255, 255, 0.2)' }}>🏠</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100px', height: '100px', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '24px', fontSize: '48px', border: '2px solid rgba(255, 255, 255, 0.2)' }}>🚗</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100px', height: '100px', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '24px', fontSize: '48px', border: '2px solid rgba(255, 255, 255, 0.2)' }}>📊</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100px', height: '100px', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '24px', fontSize: '48px', border: '2px solid rgba(255, 255, 255, 0.2)' }}>💳</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100px', height: '100px', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '24px', fontSize: '48px', border: '2px solid rgba(255, 255, 255, 0.2)' }}>📈</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100px', height: '100px', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '24px', fontSize: '48px', border: '2px solid rgba(255, 255, 255, 0.2)' }}>🎯</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100px', height: '100px', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '24px', fontSize: '48px', border: '2px solid rgba(255, 255, 255, 0.2)' }}>⚡</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100px', height: '100px', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '24px', fontSize: '48px', border: '2px solid rgba(255, 255, 255, 0.2)' }}>✅</div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '60px 50px',
          }}
        >
          {/* Badge with Quebec Flag */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(255, 255, 255, 0.25)',
              padding: '10px 24px',
              borderRadius: '50px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              marginBottom: '25px',
            }}
          >
            <div
              style={{
                width: '50px',
                height: '38px',
                background: '#0F52BA',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
              }}
            >
              ⚜️
            </div>
            <div
              style={{
                fontSize: '20px',
                color: 'white',
                fontWeight: '700',
              }}
            >
              Québec 2026
            </div>
          </div>

          {/* Logo + Brand */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '25px',
            }}
          >
            <div
              style={{
                width: '90px',
                height: '90px',
                background: 'white',
                borderRadius: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '50px',
                  fontWeight: 'bold',
                  color: '#10b981',
                  letterSpacing: '-2px',
                }}
              >
                QC
              </div>
            </div>
            <div
              style={{
                fontSize: '56px',
                fontWeight: 'bold',
                color: 'white',
                letterSpacing: '-2px',
              }}
            >
              Finance
            </div>
          </div>

          {/* Slogan */}
          <div
            style={{
              fontSize: '32px',
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: '35px',
              fontWeight: '500',
            }}
          >
            Votre guide financier au Québec
          </div>

          {/* Stats */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              marginBottom: '35px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%' }} />
              <div style={{ fontSize: '26px', color: 'white', fontWeight: '600' }}>
                19 calculateurs gratuits
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%' }} />
              <div style={{ fontSize: '26px', color: 'white', fontWeight: '600' }}>
                Impôts • Immobilier • Auto
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%' }} />
              <div style={{ fontSize: '26px', color: 'white', fontWeight: '600' }}>
                Résultats instantanés
              </div>
            </div>
          </div>

          {/* CTA */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              background: 'white',
              padding: '18px 36px',
              borderRadius: '16px',
            }}
          >
            <div
              style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#10b981',
              }}
            >
              Commencer Gratuitement
            </div>
            <div style={{ fontSize: '32px' }}>→</div>
          </div>

          {/* Footer */}
          <div
            style={{
              fontSize: '22px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginTop: '35px',
              fontWeight: '500',
              display: 'flex',
              justifyContent: 'center',
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
