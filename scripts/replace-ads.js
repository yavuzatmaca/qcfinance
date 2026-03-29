const fs = require('fs');
const path = require('path');

// Reklam içeren sayfalar
const pages = [
  'app/paie-vacances/page.tsx',
  'app/pret-etudiant/page.tsx', 
  'app/pret-auto/page.tsx',
  'app/louer-ou-acheter/page.tsx',
  'app/interets-composes/page.tsx',
  'app/frais-de-garde/page.tsx',
  'app/epargne-retraite/page.tsx',
  'app/dettes-credit/page.tsx',
  'app/declaration-simplifiee/page.tsx',
  'app/capacite-emprunt/page.tsx',
  'app/calcul-hypotheque/page.tsx',
  'app/auto-electrique-vs-essence/page.tsx',
  'app/augmentation-loyer-2026/page.tsx',
  'app/assurance-emploi/page.tsx',
  'app/allocations-familiales/page.tsx',
  'app/simulateur-vie-quebec/page.tsx',
  'app/salaire-net-quebec/[salary]/page.tsx'
];

// Eski reklam bloğu pattern'i
const oldAdPattern = /\s*{\/\* Responsive Ad \d+ - After .* \*\/}\s*<div className="my-8">\s*<div className="flex justify-center">\s*<div className="w-full max-w-2xl">\s*{\/\* Ad Label \*\/}\s*<div className="text-\[10px\] text-slate-400 text-center mb-2 uppercase tracking-wide">\s*Publicité\s*<\/div>\s*{\/\* Desktop Ad \*\/}\s*<ins\s*className="adsbygoogle hidden lg:block"\s*style=\{\{ display: 'block' \}\}\s*data-ad-client="ca-pub-2733523563879283"\s*data-ad-slot="6737944215"\s*data-ad-format="auto"\s*data-full-width-responsive="true"\s*\/>\s*{\/\* Tablet Ad \*\/}\s*<ins\s*className="adsbygoogle hidden md:block lg:hidden"\s*style=\{\{ display: 'block' \}\}\s*data-ad-client="ca-pub-2733523563879283"\s*data-ad-slot="6737944215"\s*data-ad-format="auto"\s*data-full-width-responsive="true"\s*\/>\s*{\/\* Mobile Ad \*\/}\s*<ins\s*className="adsbygoogle block md:hidden"\s*style=\{\{ display: 'block' \}\}\s*data-ad-client="ca-pub-2733523563879283"\s*data-ad-slot="6737944215"\s*data-ad-format="auto"\s*data-full-width-responsive="true"\s*\/>\s*<\/div>\s*<\/div>\s*<\/div>/g;

// Yeni reklam bileşeni
const newAdComponent = '<ResponsiveAd />';

pages.forEach(pagePath => {
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');
    
    // Basit pattern ile değiştir
    content = content.replace(oldAdPattern, newAdComponent);
    
    fs.writeFileSync(pagePath, content);
    console.log(`Updated: ${pagePath}`);
  } else {
    console.log(`File not found: ${pagePath}`);
  }
});

console.log('All ad blocks replaced!');