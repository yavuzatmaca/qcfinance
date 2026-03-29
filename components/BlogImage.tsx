import Image from 'next/image'

interface BlogImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

export default function BlogImage({ 
  src,
  alt, 
  width = 1200, 
  height = 600,
  className = ''
}: BlogImageProps) {
  // If src starts with /images/blog/, convert to Pexels URL
  let imageSrc = src
  
  if (src.startsWith('/images/blog/')) {
    // Extract filename without extension
    const filename = src.replace('/images/blog/', '').replace(/\.(jpg|jpeg|png|webp)$/i, '')
    
    // Map filenames to Pexels photo IDs (curated, high-quality images)
    const pexelsImages: Record<string, string> = {
      // Simulateur Vie Québec
      'simulateur-vie-hero': 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
      'simulateur-vie-budget': 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg',
      
      // Finance Blogs
      'credit-score-hero': 'https://images.pexels.com/photos/4968630/pexels-photo-4968630.jpeg',
      'consumer-proposal-hero': 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg',
      'fhsa-hero': 'https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg',
      'personal-budget-hero': 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg',
      'debt-consolidation-hero': 'https://images.pexels.com/photos/4968391/pexels-photo-4968391.jpeg',
      'beginner-investing-hero': 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg',
      'credit-cards-hero': 'https://images.pexels.com/photos/4968630/pexels-photo-4968630.jpeg',
      'emergency-fund-hero': 'https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg',
      'financial-planning-hero': 'https://images.pexels.com/photos/6863515/pexels-photo-6863515.jpeg',
      'bankruptcy-hero': 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg',
      
      // Salaire & Impôts
      'salaire-net-hero': 'https://images.pexels.com/photos/6863332/pexels-photo-6863332.jpeg',
      'tax-rates': 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg',
      
      // Hypothèque & Immobilier
      'hypotheque-hero': 'https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg',
      'mortgage-calculation': 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg',
      'capacite-emprunt-hero': 'https://images.pexels.com/photos/7821513/pexels-photo-7821513.jpeg',
      'mortgage-qualification': 'https://images.pexels.com/photos/4386339/pexels-photo-4386339.jpeg',
      
      // Famille
      'family-hero': 'https://images.pexels.com/photos/1648387/pexels-photo-1648387.jpeg',
      'family-budget': 'https://images.pexels.com/photos/6863515/pexels-photo-6863515.jpeg',
      'daycare-hero': 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg',
      'cpe-rates': 'https://images.pexels.com/photos/8613317/pexels-photo-8613317.jpeg',
      
      // Emploi
      'ae-hero': 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg',
      'ae-duration': 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg',
      'taux-horaire-hero': 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg',
      'salary-conversion': 'https://images.pexels.com/photos/6863332/pexels-photo-6863332.jpeg',
      
      // Logement
      'taxe-bienvenue-hero': 'https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg',
      'taxe-calculation': 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg',
      'augmentation-loyer-hero': 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg',
      'tal-rates': 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg',
      'louer-acheter-hero': 'https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg',
      'rent-vs-buy-costs': 'https://images.pexels.com/photos/6863515/pexels-photo-6863515.jpeg',
      
      // Vacances & Taxes
      'vacation-pay-hero': 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg',
      'vacation-calculation': 'https://images.pexels.com/photos/6863332/pexels-photo-6863332.jpeg',
      'sales-tax-hero': 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg',
      'tax-calculation': 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg',
      
      // Retraite & Épargne
      'retirement-hero': 'https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg',
      'rrsp-tfsa-comparison': 'https://images.pexels.com/photos/6863515/pexels-photo-6863515.jpeg',
      'compound-interest-hero': 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg',
      'compound-growth-chart': 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg',
      
      // Dettes & Crédit
      'debt-repayment-hero': 'https://images.pexels.com/photos/4968391/pexels-photo-4968391.jpeg',
      'debt-payment-comparison': 'https://images.pexels.com/photos/6863332/pexels-photo-6863332.jpeg',
      
      // Auto
      'auto-loan-hero': 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
      'financing-vs-leasing': 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
      'ev-vs-gas-hero': 'https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg',
      'ev-fuel-savings': 'https://images.pexels.com/photos/6873876/pexels-photo-6873876.jpeg',
      
      // Étudiant
      'student-loan-hero': 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg',
      'student-aid-calculation': 'https://images.pexels.com/photos/6863332/pexels-photo-6863332.jpeg',
      
      // Impôt
      'tax-return-hero': 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg',
      'tax-credits-deductions': 'https://images.pexels.com/photos/6863515/pexels-photo-6863515.jpeg',
    }
    
    // Use mapped image or fallback to placeholder
    imageSrc = pexelsImages[filename] || `https://placehold.co/${width}x${height}/10b981/ffffff/png?text=QCFinance`
  }
  
  return (
    <div className={`relative w-full rounded-2xl overflow-hidden shadow-lg my-8 ${className}`}>
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto object-cover"
        loading="lazy"
        priority={false}
        unoptimized={imageSrc.includes('pexels.com') || imageSrc.includes('placehold.co')}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
        <p className="text-white text-sm font-semibold">{alt}</p>
      </div>
    </div>
  )
}
