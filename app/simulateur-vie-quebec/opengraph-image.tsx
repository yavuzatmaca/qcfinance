import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Simulateur de Vie au Québec 2026 - Calculateur Budget, Salaire Net & Allocations';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f172a',
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.2) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)',
        }}
      >
        {/* Logo/Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
            }}
          >
            💰
          </div>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#94a3b8',
              letterSpacing: '0.05em',
            }}
          >
            QCFINANCE.CA
          </div>
        </div>

        {/* Main Title */}
        <div
          style={{
            fontSize: '76px',
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: 1.1,
            marginBottom: '20px',
            maxWidth: '1000px',
            background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Simulateur de Vie
          <br />
          au Québec 2026
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '28px',
            color: '#cbd5e1',
            textAlign: 'center',
            marginBottom: '40px',
            fontWeight: '500',
          }}
        >
          Budget • Salaire Net • Allocations • Loyer
        </div>

        {/* Stats Row */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            marginBottom: '36px',
          }}
        >
          {[
            { label: '10 Villes', icon: '🏙️' },
            { label: 'Taux 2026', icon: '📊' },
            { label: 'Gratuit', icon: '✨' },
            { label: 'Temps Réel', icon: '⚡' },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 28px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                border: '2px solid rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div style={{ fontSize: '32px' }}>{item.icon}</div>
              <span
                style={{
                  fontSize: '18px',
                  color: 'white',
                  fontWeight: '700',
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Features Pills */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '900px',
          }}
        >
          {['Impôts QC & Fédéral', 'CCB + Allocation Famille', 'CPE & Garderie', 'Comparaison Villes'].map((feature) => (
            <div
              key={feature}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                borderRadius: '999px',
                border: '1px solid rgba(16, 185, 129, 0.4)',
              }}
            >
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                }}
              />
              <span
                style={{
                  fontSize: '16px',
                  color: '#10b981',
                  fontWeight: '600',
                }}
              >
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
