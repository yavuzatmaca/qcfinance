import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Calculateur Salaire Net Québec 2026'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: { salary: string } }) {
  const salaryNum = parseInt(params.salary)
  // Format with space separator for French Canadian standards (45 000 instead of 45,000)
  const formattedSalary = salaryNum.toLocaleString('fr-CA').replace(',', ' ')

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Left Side - Visual Element */}
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
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '380px',
              height: '380px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '40px',
              backdropFilter: 'blur(10px)',
              border: '3px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            {/* Paycheck Icon */}
            <div
              style={{
                fontSize: '140px',
                display: 'flex',
                marginBottom: '20px',
              }}
            >
              💰
            </div>
            {/* Simple Bar Chart */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-end',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '80px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '8px',
                  display: 'flex',
                }}
              />
              <div
                style={{
                  width: '40px',
                  height: '120px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '8px',
                  display: 'flex',
                }}
              />
              <div
                style={{
                  width: '40px',
                  height: '60px',
                  background: 'rgba(255, 255, 255, 0.6)',
                  borderRadius: '8px',
                  display: 'flex',
                }}
              />
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
          {/* Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '30px',
            }}
          >
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.25)',
                padding: '14px 28px',
                borderRadius: '50px',
                fontSize: '24px',
                color: 'white',
                fontWeight: '600',
                display: 'flex',
                backdropFilter: 'blur(10px)',
              }}
            >
              QC Finance • 2026
            </div>
          </div>

          {/* Main Question */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '20px',
              display: 'flex',
              lineHeight: 1.1,
              letterSpacing: '-2px',
            }}
          >
            {formattedSalary}$ Net?
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '36px',
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: '50px',
              display: 'flex',
              lineHeight: 1.3,
            }}
          >
            Découvrez votre paie réelle en 2026
          </div>

          {/* Features */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  background: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                }}
              />
              <div
                style={{
                  fontSize: '26px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  display: 'flex',
                }}
              >
                Impôts fédéral & provincial
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  background: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                }}
              />
              <div
                style={{
                  fontSize: '26px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  display: 'flex',
                }}
              >
                RRQ • RQAP • Assurance-emploi
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  background: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                }}
              />
              <div
                style={{
                  fontSize: '26px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  display: 'flex',
                }}
              >
                Calcul détaillé par période
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              fontSize: '22px',
              color: 'rgba(255, 255, 255, 0.7)',
              marginTop: '50px',
              display: 'flex',
            }}
          >
            qcfinance.ca/salaire-net-quebec/{params.salary}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
