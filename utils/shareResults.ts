/**
 * Share Results Utility
 * Functions to share simulator results via social media and other channels
 */

export interface ShareOptions {
  result: any;
  grossSalary: number;
}

/**
 * Generate share text
 */
function generateShareText(options: ShareOptions): string {
  const { result, grossSalary } = options;
  
  return `J'ai calculé mon budget à ${result.city.name} avec ${grossSalary.toLocaleString('fr-CA')}$ de salaire. Je peux épargner ${result.disposableIncome.toLocaleString('fr-CA')}$/mois! 🎯`;
}

/**
 * Share via Email
 */
export function shareViaEmail(options: ShareOptions): void {
  const text = generateShareText(options);
  const subject = encodeURIComponent('Mon Simulateur de Vie au Québec');
  const body = encodeURIComponent(`${text}\n\nCalculez le vôtre: https://qcfinance.ca/simulateur-vie-quebec`);
  
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

/**
 * Share via WhatsApp
 */
export function shareViaWhatsApp(options: ShareOptions): void {
  const text = generateShareText(options);
  const url = encodeURIComponent(`${text}\n\nhttps://qcfinance.ca/simulateur-vie-quebec`);
  
  window.open(`https://wa.me/?text=${url}`, '_blank');
}

/**
 * Share via Facebook
 */
export function shareViaFacebook(): void {
  const url = encodeURIComponent('https://qcfinance.ca/simulateur-vie-quebec');
  
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
}

/**
 * Share via Twitter
 */
export function shareViaTwitter(options: ShareOptions): void {
  const text = generateShareText(options);
  const url = encodeURIComponent('https://qcfinance.ca/simulateur-vie-quebec');
  const tweet = encodeURIComponent(text);
  
  window.open(`https://twitter.com/intent/tweet?text=${tweet}&url=${url}`, '_blank', 'width=600,height=400');
}

/**
 * Copy link to clipboard
 */
export async function copyLinkToClipboard(): Promise<boolean> {
  try {
    await navigator.clipboard.writeText('https://qcfinance.ca/simulateur-vie-quebec');
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Native share (mobile)
 */
export async function shareNative(options: ShareOptions): Promise<boolean> {
  if (!navigator.share) {
    return false;
  }
  
  try {
    await navigator.share({
      title: 'Simulateur de Vie au Québec',
      text: generateShareText(options),
      url: 'https://qcfinance.ca/simulateur-vie-quebec',
    });
    return true;
  } catch (error) {
    return false;
  }
}
