import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://qcfinance.ca'
  
  // All images used in the site
  const images = [
    // Logo images
    { url: '/images/logo.png', title: 'QCFinance Logo', caption: 'Logo principal de QCFinance' },
    { url: '/images/logo2.png', title: 'QCFinance Logo Alt', caption: 'Logo alternatif de QCFinance' },
    { url: '/images/logo3.png', title: 'QCFinance Logo 3', caption: 'Logo QCFinance variante 3' },
    { url: '/images/logo4.png', title: 'QCFinance Logo 4', caption: 'Logo QCFinance variante 4' },
    { url: '/images/logo5.png', title: 'QCFinance Logo 5', caption: 'Logo QCFinance variante 5' },
    
    // Favicon
    { url: '/images/favicon.png', title: 'QCFinance Favicon', caption: 'Icône du site QCFinance' },
    
    // 3D Calculator Images
    { url: '/images/3d-salary.jpg', title: 'Calculateur Salaire Net', caption: 'Illustration 3D du calculateur de salaire net Québec' },
    { url: '/images/3d-mortgage.jpg', title: 'Calculateur Hypothèque', caption: 'Illustration 3D du calculateur hypothécaire' },
    { url: '/images/3d-childcare.jpg', title: 'Calculateur Frais de Garde', caption: 'Illustration 3D du calculateur de frais de garde' },
    { url: '/images/3d-tax-form.jpg', title: 'Déclaration Impôt', caption: 'Illustration 3D de la déclaration d\'impôt simplifiée' },
    { url: '/images/3d-credit.jpg', title: 'Calculateur Dettes', caption: 'Illustration 3D du calculateur de dettes et crédit' },
    { url: '/images/3d-insurance.jpg', title: 'Assurance Emploi', caption: 'Illustration 3D de l\'assurance-emploi' },
    { url: '/images/3d-rent.jpg', title: 'Louer ou Acheter', caption: 'Illustration 3D du comparateur louer vs acheter' },
    { url: '/images/13d-mortgage.jpg', title: 'Hypothèque Illustration', caption: 'Illustration hypothèque immobilière' },
    { url: '/images/13d-salary.jpg', title: 'Salaire Illustration', caption: 'Illustration calcul de salaire' },
  ]

  // Pages with images
  const pages = [
    { loc: '/', images: ['/images/3d-salary.jpg', '/images/3d-mortgage.jpg', '/images/3d-childcare.jpg', '/images/3d-tax-form.jpg'] },
    { loc: '/salaire-net-quebec', images: ['/images/3d-salary.jpg', '/images/13d-salary.jpg'] },
    { loc: '/calcul-hypotheque', images: ['/images/3d-mortgage.jpg', '/images/13d-mortgage.jpg'] },
    { loc: '/frais-de-garde', images: ['/images/3d-childcare.jpg'] },
    { loc: '/declaration-simplifiee', images: ['/images/3d-tax-form.jpg'] },
    { loc: '/dettes-credit', images: ['/images/3d-credit.jpg'] },
    { loc: '/assurance-emploi', images: ['/images/3d-insurance.jpg'] },
    { loc: '/louer-ou-acheter', images: ['/images/3d-rent.jpg'] },
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.loc}</loc>
${page.images.map(imgPath => {
  const img = images.find(i => i.url === imgPath)
  return `    <image:image>
      <image:loc>${baseUrl}${imgPath}</image:loc>
      ${img?.title ? `<image:title>${img.title}</image:title>` : ''}
      ${img?.caption ? `<image:caption>${img.caption}</image:caption>` : ''}
    </image:image>`
}).join('\n')}
  </url>`).join('\n')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
