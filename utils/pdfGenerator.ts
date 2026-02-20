import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { TaxCalculationResult } from './taxLogic';
import { MortgageResult } from './mortgageLogic';

/**
 * Generate PDF for Salary Calculator Results
 */
export function generateSalaryPDF(results: TaxCalculationResult, frequency: string = 'annuel') {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(20);
  doc.setTextColor(37, 99, 235); // Blue color
  doc.text('Calcul de Salaire Net - Québec 2026', 105, 20, { align: 'center' });
  
  // Date
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const today = new Date().toLocaleDateString('fr-CA', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  doc.text(`Généré le ${today}`, 105, 28, { align: 'center' });
  
  // Main Result Box
  doc.setFillColor(37, 99, 235);
  doc.rect(20, 35, 170, 25, 'F');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('Revenu Net', 105, 43, { align: 'center' });
  doc.setFontSize(24);
  doc.text(formatCurrency(results.netIncome), 105, 54, { align: 'center' });
  
  // Income Details Table
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Détails du revenu', 20, 72);
  
  autoTable(doc, {
    startY: 76,
    head: [['Description', 'Montant']],
    body: [
      ['Revenu brut', formatCurrency(results.grossIncome)],
      ['Impôt fédéral', formatCurrency(results.federalTax)],
      ['Impôt provincial (Québec)', formatCurrency(results.provincialTax)],
      ['RRQ (Régime de rentes)', formatCurrency(results.qpp)],
      ['RQAP (Assurance parentale)', formatCurrency(results.qpip)],
      ['AE (Assurance-emploi)', formatCurrency(results.ei)],
    ],
    theme: 'striped',
    headStyles: { fillColor: [37, 99, 235], textColor: 255 },
    styles: { fontSize: 11 },
    columnStyles: {
      0: { cellWidth: 120 },
      1: { cellWidth: 50, halign: 'right' }
    }
  });
  
  // Summary Table
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  
  autoTable(doc, {
    startY: finalY,
    body: [
      ['Total des déductions', formatCurrency(results.totalDeductions)],
      ['Revenu net', formatCurrency(results.netIncome)],
    ],
    theme: 'plain',
    styles: { 
      fontSize: 12, 
      fontStyle: 'bold',
      fillColor: [243, 244, 246]
    },
    columnStyles: {
      0: { cellWidth: 120 },
      1: { cellWidth: 50, halign: 'right', textColor: [37, 99, 235] }
    }
  });
  
  // Footer
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text('Calculé avec QCFinance.ca - Calculateurs financiers pour le Québec', 105, 280, { align: 'center' });
  doc.text('Ces calculs sont fournis à titre indicatif seulement.', 105, 285, { align: 'center' });
  
  // Save PDF
  doc.save(`salaire-net-${results.grossIncome}-quebec.pdf`);
}

/**
 * Generate PDF for Mortgage Calculator Results
 */
export function generateMortgagePDF(results: MortgageResult) {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(20);
  doc.setTextColor(37, 99, 235);
  doc.text('Calcul Hypothécaire - Québec', 105, 20, { align: 'center' });
  
  // Date
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const today = new Date().toLocaleDateString('fr-CA', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  doc.text(`Généré le ${today}`, 105, 28, { align: 'center' });
  
  // Main Payment Box
  doc.setFillColor(37, 99, 235);
  doc.rect(20, 35, 170, 30, 'F');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  const frequencyLabel = results.paymentFrequency === 'monthly' ? 'par mois' : 'aux deux semaines';
  doc.text(`Paiement ${frequencyLabel}`, 105, 43, { align: 'center' });
  doc.setFontSize(26);
  doc.text(formatCurrency(results.paymentAmount), 105, 56, { align: 'center' });
  
  // Loan Parameters
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Paramètres du prêt', 20, 78);
  
  autoTable(doc, {
    startY: 82,
    head: [['Paramètre', 'Valeur']],
    body: [
      ['Montant du prêt', formatCurrency(results.loanAmount)],
      ['Taux d\'intérêt annuel', `${results.interestRate.toFixed(2)}%`],
      ['Période d\'amortissement', `${results.amortizationYears} ans`],
      ['Fréquence de paiement', frequencyLabel],
    ],
    theme: 'striped',
    headStyles: { fillColor: [37, 99, 235], textColor: 255 },
    styles: { fontSize: 11 },
    columnStyles: {
      0: { cellWidth: 100 },
      1: { cellWidth: 70, halign: 'right' }
    }
  });
  
  // Cost Summary
  const finalY1 = (doc as any).lastAutoTable.finalY + 10;
  doc.setFontSize(12);
  doc.text('Résumé des coûts', 20, finalY1);
  
  autoTable(doc, {
    startY: finalY1 + 4,
    body: [
      ['Total des paiements', formatCurrency(results.totalPayments)],
      ['Total des intérêts', formatCurrency(results.totalInterest)],
      ['Coût total du prêt', formatCurrency(results.loanAmount + results.totalInterest)],
    ],
    theme: 'plain',
    styles: { 
      fontSize: 11,
      fillColor: [243, 244, 246]
    },
    columnStyles: {
      0: { cellWidth: 100 },
      1: { cellWidth: 70, halign: 'right', fontStyle: 'bold' }
    }
  });
  
  // Stress Test (if available)
  if (results.stressTestPayment && results.stressTestIncrease) {
    const finalY2 = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.setTextColor(220, 38, 38); // Red color
    doc.text('Test de résistance (+2% taux)', 20, finalY2);
    
    autoTable(doc, {
      startY: finalY2 + 4,
      body: [
        ['Paiement avec +2%', formatCurrency(results.stressTestPayment)],
        ['Augmentation', formatCurrency(results.stressTestIncrease)],
      ],
      theme: 'plain',
      styles: { 
        fontSize: 11,
        fillColor: [254, 226, 226],
        textColor: [220, 38, 38]
      },
      columnStyles: {
        0: { cellWidth: 100 },
        1: { cellWidth: 70, halign: 'right', fontStyle: 'bold' }
      }
    });
  }
  
  // Amortization Schedule (First 5 years)
  const finalY3 = (doc as any).lastAutoTable.finalY + 10;
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Évolution du solde (5 premières années)', 20, finalY3);
  
  const scheduleData = results.balanceOverTime
    .filter(point => point.year <= 5)
    .map(point => [
      `Année ${point.year}`,
      formatCurrency(point.balance)
    ]);
  
  autoTable(doc, {
    startY: finalY3 + 4,
    head: [['Période', 'Solde restant']],
    body: scheduleData,
    theme: 'striped',
    headStyles: { fillColor: [37, 99, 235], textColor: 255 },
    styles: { fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 50 },
      1: { cellWidth: 70, halign: 'right' }
    }
  });
  
  // Footer
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text('Calculé avec QCFinance.ca - Calculateurs financiers pour le Québec', 105, 280, { align: 'center' });
  doc.text('Ces calculs sont fournis à titre indicatif seulement.', 105, 285, { align: 'center' });
  
  // Save PDF
  doc.save(`hypotheque-${results.loanAmount}-quebec.pdf`);
}

/**
 * Generate PDF for Retirement Calculator Results
 */
export function generateRetirementPDF(results: any) {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(20);
  doc.setTextColor(16, 185, 129); // Green color
  doc.text('Plan d\'Épargne Retraite - Québec', 105, 20, { align: 'center' });
  
  // Date
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const today = new Date().toLocaleDateString('fr-CA', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  doc.text(`Généré le ${today}`, 105, 28, { align: 'center' });
  
  // Main Result Box
  doc.setFillColor(16, 185, 129);
  doc.rect(20, 35, 170, 30, 'F');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text(`Épargne à ${results.retirementAge} ans`, 105, 43, { align: 'center' });
  doc.setFontSize(26);
  doc.text(formatCurrency(results.totalAtRetirement), 105, 58, { align: 'center' });
  
  // Key Metrics
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Vos paramètres', 20, 78);
  
  autoTable(doc, {
    startY: 82,
    head: [['Paramètre', 'Valeur']],
    body: [
      ['Âge actuel', `${results.currentAge} ans`],
      ['Âge de retraite', `${results.retirementAge} ans`],
      ['Années jusqu\'à la retraite', `${results.yearsUntilRetirement} ans`],
      ['Épargne actuelle', formatCurrency(results.currentSavings)],
      ['Contribution mensuelle', formatCurrency(results.monthlyContribution)],
      ['Rendement espéré', `${results.expectedReturn.toFixed(1)}%`],
    ],
    theme: 'striped',
    headStyles: { fillColor: [16, 185, 129], textColor: 255 },
    styles: { fontSize: 11 },
    columnStyles: {
      0: { cellWidth: 100 },
      1: { cellWidth: 70, halign: 'right' }
    }
  });
  
  // Financial Summary
  const finalY1 = (doc as any).lastAutoTable.finalY + 10;
  doc.setFontSize(12);
  doc.text('Résumé financier', 20, finalY1);
  
  autoTable(doc, {
    startY: finalY1 + 4,
    body: [
      ['Total investi', formatCurrency(results.totalContributions)],
      ['Intérêts gagnés', formatCurrency(results.totalInterestEarned)],
      ['Total à la retraite', formatCurrency(results.totalAtRetirement)],
    ],
    theme: 'plain',
    styles: { 
      fontSize: 11,
      fillColor: [243, 244, 246]
    },
    columnStyles: {
      0: { cellWidth: 100 },
      1: { cellWidth: 70, halign: 'right', fontStyle: 'bold' }
    }
  });
  
  // Power of Compound Interest
  const finalY2 = (doc as any).lastAutoTable.finalY + 10;
  doc.setFillColor(219, 234, 254);
  doc.rect(20, finalY2, 170, 25, 'F');
  doc.setFontSize(11);
  doc.setTextColor(30, 64, 175);
  doc.text('Le pouvoir des intérêts composés:', 25, finalY2 + 8);
  doc.setFontSize(10);
  doc.setTextColor(37, 99, 235);
  const interestPercent = ((results.totalInterestEarned / results.totalContributions) * 100).toFixed(0);
  doc.text(`Vous gagnerez ${interestPercent}% de plus que ce que vous avez investi!`, 25, finalY2 + 16);
  
  // Growth Milestones
  const finalY3 = finalY2 + 32;
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Jalons de croissance', 20, finalY3);
  
  const milestones = results.growthOverTime
    .filter((_: any, index: number) => index % Math.ceil(results.growthOverTime.length / 8) === 0)
    .slice(0, 8)
    .map((point: any) => [
      `Âge ${point.age}`,
      formatCurrency(point.totalValue)
    ]);
  
  autoTable(doc, {
    startY: finalY3 + 4,
    head: [['Âge', 'Valeur totale']],
    body: milestones,
    theme: 'striped',
    headStyles: { fillColor: [16, 185, 129], textColor: 255 },
    styles: { fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 50 },
      1: { cellWidth: 70, halign: 'right' }
    }
  });
  
  // Footer
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text('Calculé avec QCFinance.ca - Calculateurs financiers pour le Québec', 105, 280, { align: 'center' });
  doc.text('Ces projections sont basées sur des hypothèses et ne garantissent pas les résultats futurs.', 105, 285, { align: 'center' });
  
  // Save PDF
  doc.save(`plan-retraite-${results.retirementAge}ans-quebec.pdf`);
}

/**
 * Generate PDF for Student Loan Calculator Results
 */
export function generateStudentLoanPDF(results: any) {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(20);
  doc.setTextColor(79, 70, 229); // Indigo color
  doc.text('Plan de Remboursement - Prêt Étudiant', 105, 20, { align: 'center' });
  
  // Date
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const today = new Date().toLocaleDateString('fr-CA', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  doc.text(`Généré le ${today}`, 105, 28, { align: 'center' });
  
  // Main Payment Box
  doc.setFillColor(79, 70, 229);
  doc.rect(20, 35, 170, 28, 'F');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('Paiement mensuel', 105, 43, { align: 'center' });
  doc.setFontSize(26);
  doc.text(formatCurrency(results.monthlyPayment), 105, 56, { align: 'center' });
  
  // Loan Details
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Détails du prêt', 20, 76);
  
  const yearsMonths = Math.floor(results.termMonths / 12) + ' ans ' + (results.termMonths % 12) + ' mois';
  
  autoTable(doc, {
    startY: 80,
    head: [['Paramètre', 'Valeur']],
    body: [
      ['Montant du prêt', formatCurrency(results.loanAmount)],
      ['Taux d\'intérêt', `${results.interestRate.toFixed(2)}%`],
      ['Durée', yearsMonths],
      ['Nombre de paiements', `${results.termMonths} mois`],
    ],
    theme: 'striped',
    headStyles: { fillColor: [79, 70, 229], textColor: 255 },
    styles: { fontSize: 11 },
    columnStyles: {
      0: { cellWidth: 100 },
      1: { cellWidth: 70, halign: 'right' }
    }
  });
  
  // Cost Breakdown
  const finalY1 = (doc as any).lastAutoTable.finalY + 10;
  doc.setFontSize(12);
  doc.text('Répartition des coûts', 20, finalY1);
  
  autoTable(doc, {
    startY: finalY1 + 4,
    body: [
      ['Capital (prêt initial)', formatCurrency(results.loanAmount)],
      ['Intérêts totaux', formatCurrency(results.totalInterestPaid)],
      ['Crédit d\'impôt (~20%)', '-' + formatCurrency(results.taxCreditOnInterest)],
      ['Coût réel des intérêts', formatCurrency(results.effectiveInterestCost)],
      ['Total à payer', formatCurrency(results.totalAmountPaid)],
    ],
    theme: 'plain',
    styles: { 
      fontSize: 11,
      fillColor: [243, 244, 246]
    },
    columnStyles: {
      0: { cellWidth: 100 },
      1: { cellWidth: 70, halign: 'right', fontStyle: 'bold' }
    }
  });
  
  // Tax Credit Highlight
  const finalY2 = (doc as any).lastAutoTable.finalY + 10;
  doc.setFillColor(220, 252, 231);
  doc.rect(20, finalY2, 170, 25, 'F');
  doc.setFontSize(11);
  doc.setTextColor(22, 101, 52);
  doc.text('💰 Crédit d\'impôt sur les intérêts:', 25, finalY2 + 8);
  doc.setFontSize(10);
  doc.text(`Vous récupérerez environ ${formatCurrency(results.taxCreditOnInterest)}`, 25, finalY2 + 16);
  doc.text(`grâce au crédit d'impôt québécois de ${results.taxCreditPercentage}%`, 25, finalY2 + 22);
  
  // Payment Schedule
  const finalY3 = finalY2 + 32;
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Calendrier de paiement', 20, finalY3);
  
  const endDate = new Date(Date.now() + results.termMonths * 30 * 24 * 60 * 60 * 1000);
  const endDateStr = endDate.toLocaleDateString('fr-CA', { year: 'numeric', month: 'long' });
  
  autoTable(doc, {
    startY: finalY3 + 4,
    body: [
      ['Paiement mensuel', formatCurrency(results.monthlyPayment)],
      ['Nombre de paiements', `${results.termMonths} mois`],
      ['Durée totale', yearsMonths],
      ['Premier paiement', '6 mois après la fin des études'],
      ['Dernier paiement (estimé)', endDateStr],
    ],
    theme: 'striped',
    styles: { fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 100 },
      1: { cellWidth: 70, halign: 'right' }
    }
  });
  
  // Tips Section
  const finalY4 = (doc as any).lastAutoTable.finalY + 10;
  doc.setFillColor(243, 232, 255);
  doc.rect(20, finalY4, 170, 35, 'F');
  doc.setFontSize(11);
  doc.setTextColor(88, 28, 135);
  doc.text('📚 Bon à savoir:', 25, finalY4 + 8);
  doc.setFontSize(9);
  doc.setTextColor(107, 33, 168);
  doc.text('• Le remboursement commence 6 mois après la fin des études', 25, finalY4 + 15);
  doc.text('• Aucune pénalité pour remboursement anticipé', 25, finalY4 + 21);
  doc.text('• Le Programme d\'aide au remboursement (PAR) peut réduire vos paiements', 25, finalY4 + 27);
  
  // Footer
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text('Calculé avec QCFinance.ca - Calculateurs financiers pour le Québec', 105, 280, { align: 'center' });
  doc.text('Ces calculs sont fournis à titre indicatif seulement.', 105, 285, { align: 'center' });
  
  // Save PDF
  doc.save(`pret-etudiant-${results.loanAmount}-quebec.pdf`);
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Generate PDF for Auto Loan Calculator Results
 */
export function generateAutoLoanPDF(results: any) {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.setTextColor(37, 99, 235);
  doc.text('Financement Auto - Québec', 105, 20, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const today = new Date().toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Généré le ${today}`, 105, 28, { align: 'center' });
  
  doc.setFillColor(37, 99, 235);
  doc.rect(20, 35, 170, 28, 'F');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('Paiement aux deux semaines', 105, 43, { align: 'center' });
  doc.setFontSize(26);
  doc.text(formatCurrency(results.biweeklyPayment), 105, 56, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Détails du financement', 20, 76);
  
  autoTable(doc, {
    startY: 80,
    head: [['Description', 'Montant']],
    body: [
      ['Prix du véhicule', formatCurrency(results.vehiclePrice)],
      ['Taxes (TPS + TVQ)', formatCurrency(results.salesTax)],
      ['Coût total', formatCurrency(results.totalVehicleCost)],
      ['Mise de fonds', formatCurrency(results.downPayment)],
      ['Montant financé', formatCurrency(results.loanAmount)],
      ['Taux d\'intérêt', `${results.interestRate.toFixed(2)}%`],
      ['Durée', `${results.loanTermMonths} mois`],
    ],
    theme: 'striped',
    headStyles: { fillColor: [37, 99, 235], textColor: 255 },
    styles: { fontSize: 11 },
    columnStyles: { 0: { cellWidth: 100 }, 1: { cellWidth: 70, halign: 'right' } }
  });
  
  const finalY1 = (doc as any).lastAutoTable.finalY + 10;
  autoTable(doc, {
    startY: finalY1,
    body: [
      ['Paiement mensuel', formatCurrency(results.monthlyPayment)],
      ['Paiement aux 2 semaines', formatCurrency(results.biweeklyPayment)],
      ['Total des paiements', formatCurrency(results.totalPayments)],
      ['Total des intérêts', formatCurrency(results.totalInterest)],
    ],
    theme: 'plain',
    styles: { fontSize: 11, fillColor: [243, 244, 246] },
    columnStyles: { 0: { cellWidth: 100 }, 1: { cellWidth: 70, halign: 'right', fontStyle: 'bold' } }
  });
  
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text('Calculé avec QCFinance.ca', 105, 280, { align: 'center' });
  
  doc.save(`financement-auto-${results.vehiclePrice}-quebec.pdf`);
}

/**
 * Generate PDF for Debt Calculator Results
 */
export function generateDebtPDF(results: any) {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.setTextColor(37, 99, 235);
  doc.text('Plan de Remboursement de Dette', 105, 20, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const today = new Date().toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Généré le ${today}`, 105, 28, { align: 'center' });
  
  doc.setFillColor(37, 99, 235);
  doc.rect(20, 35, 170, 30, 'F');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  const years = Math.floor(results.monthsToPayoff / 12);
  const months = results.monthsToPayoff % 12;
  const timeStr = years > 0 ? `${years} an${years > 1 ? 's' : ''} ${months > 0 ? `et ${months} mois` : ''}` : `${months} mois`;
  doc.text('Temps pour être libre de dettes', 105, 43, { align: 'center' });
  doc.setFontSize(24);
  doc.text(timeStr, 105, 58, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Détails du remboursement', 20, 78);
  
  autoTable(doc, {
    startY: 82,
    head: [['Description', 'Montant']],
    body: [
      ['Solde initial', formatCurrency(results.balance)],
      ['Taux d\'intérêt', `${results.interestRate.toFixed(2)}%`],
      ['Paiement mensuel', formatCurrency(results.monthlyPayment)],
      ['Nombre de paiements', `${results.monthsToPayoff} mois`],
      ['Total à payer', formatCurrency(results.totalAmountPaid)],
      ['Total des intérêts', formatCurrency(results.totalInterestPaid)],
    ],
    theme: 'striped',
    headStyles: { fillColor: [37, 99, 235], textColor: 255 },
    styles: { fontSize: 11 },
    columnStyles: { 0: { cellWidth: 100 }, 1: { cellWidth: 70, halign: 'right' } }
  });
  
  const finalY1 = (doc as any).lastAutoTable.finalY + 10;
  doc.setFillColor(254, 226, 226);
  doc.rect(20, finalY1, 170, 20, 'F');
  doc.setFontSize(11);
  doc.setTextColor(220, 38, 38);
  doc.text(`⚠️ Coût des intérêts: ${formatCurrency(results.totalInterestPaid)}`, 25, finalY1 + 8);
  doc.setFontSize(9);
  doc.text(`C'est ${((results.totalInterestPaid / results.balance) * 100).toFixed(0)}% de plus que votre solde initial`, 25, finalY1 + 15);
  
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text('Calculé avec QCFinance.ca', 105, 280, { align: 'center' });
  
  doc.save(`remboursement-dette-${results.balance}-quebec.pdf`);
}

/**
 * Generate PDF for Affordability Calculator Results
 */
export function generateAffordabilityPDF(results: any) {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.setTextColor(147, 51, 234);
  doc.text('Capacité d\'Emprunt Immobilier', 105, 20, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const today = new Date().toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Généré le ${today}`, 105, 28, { align: 'center' });
  
  doc.setFillColor(147, 51, 234);
  doc.rect(20, 35, 170, 30, 'F');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('Prix maximum de la maison', 105, 43, { align: 'center' });
  doc.setFontSize(26);
  doc.text(formatCurrency(results.maxHomePrice), 105, 58, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Vos paramètres', 20, 78);
  
  autoTable(doc, {
    startY: 82,
    head: [['Paramètre', 'Valeur']],
    body: [
      ['Revenu annuel', formatCurrency(results.annualIncome)],
      ['Revenu mensuel', formatCurrency(results.monthlyIncome)],
      ['Dettes mensuelles', formatCurrency(results.monthlyDebts)],
      ['Mise de fonds', formatCurrency(results.downPayment)],
      ['Taux d\'intérêt', `${results.interestRate.toFixed(2)}%`],
    ],
    theme: 'striped',
    headStyles: { fillColor: [147, 51, 234], textColor: 255 },
    styles: { fontSize: 11 },
    columnStyles: { 0: { cellWidth: 100 }, 1: { cellWidth: 70, halign: 'right' } }
  });
  
  const finalY1 = (doc as any).lastAutoTable.finalY + 10;
  doc.text('Résultats', 20, finalY1);
  
  autoTable(doc, {
    startY: finalY1 + 4,
    body: [
      ['Prêt hypothécaire maximum', formatCurrency(results.maxLoanAmount)],
      ['Paiement mensuel maximum', formatCurrency(results.maxMonthlyPayment)],
      ['Prix maximum de la maison', formatCurrency(results.maxHomePrice)],
      ['Ratio ABD (GDS)', `${results.gdsRatio.toFixed(1)}%`],
      ['Ratio ATD (TDS)', `${results.tdsRatio.toFixed(1)}%`],
    ],
    theme: 'plain',
    styles: { fontSize: 11, fillColor: [243, 244, 246] },
    columnStyles: { 0: { cellWidth: 100 }, 1: { cellWidth: 70, halign: 'right', fontStyle: 'bold' } }
  });
  
  const finalY2 = (doc as any).lastAutoTable.finalY + 10;
  const color: [number, number, number] = results.isAffordable ? [220, 252, 231] : [254, 226, 226];
  doc.setFillColor(color[0], color[1], color[2]);
  doc.rect(20, finalY2, 170, 15, 'F');
  doc.setFontSize(10);
  doc.setTextColor(results.isAffordable ? 22 : 220, results.isAffordable ? 101 : 38, results.isAffordable ? 52 : 38);
  doc.text(results.isAffordable ? '✓ Vos ratios respectent les normes bancaires' : '⚠️ Vos ratios dépassent les limites recommandées', 25, finalY2 + 9);
  
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text('Calculé avec QCFinance.ca', 105, 280, { align: 'center' });
  
  doc.save(`capacite-emprunt-${results.maxHomePrice}-quebec.pdf`);
}

/**
 * Generate PDF for EI Calculator Results
 */
export function generateEIPDF(results: any) {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.setTextColor(37, 99, 235);
  doc.text('Assurance-Emploi (AE) - Québec', 105, 20, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const today = new Date().toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Généré le ${today}`, 105, 28, { align: 'center' });
  
  doc.setFillColor(37, 99, 235);
  doc.rect(20, 35, 170, 28, 'F');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('Prestation hebdomadaire', 105, 43, { align: 'center' });
  doc.setFontSize(26);
  doc.text(formatCurrency(results.weeklyBenefit), 105, 56, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Détails de l\'assurance-emploi', 20, 76);
  
  autoTable(doc, {
    startY: 80,
    head: [['Description', 'Montant']],
    body: [
      ['Salaire annuel', formatCurrency(results.annualSalary)],
      ['Gains assurables', formatCurrency(results.insurableEarnings)],
      ['Taux de prestation', '55%'],
      ['Prestation hebdomadaire', formatCurrency(results.weeklyBenefit)],
      ['Prestation mensuelle (approx.)', formatCurrency(results.monthlyBenefit)],
      ['Durée maximale', `${results.maxWeeks} semaines`],
      ['Total maximum', formatCurrency(results.totalMaxBenefit)],
    ],
    theme: 'striped',
    headStyles: { fillColor: [37, 99, 235], textColor: 255 },
    styles: { fontSize: 11 },
    columnStyles: { 0: { cellWidth: 100 }, 1: { cellWidth: 70, halign: 'right' } }
  });
  
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text('Calculé avec QCFinance.ca', 105, 280, { align: 'center' });
  
  doc.save(`assurance-emploi-${results.annualSalary}-quebec.pdf`);
}

/**
 * Generate PDF for Transfer Tax Calculator Results
 */
export function generateTransferTaxPDF(results: any) {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.setTextColor(37, 99, 235);
  doc.text('Taxe de Bienvenue - Québec', 105, 20, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const today = new Date().toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Généré le ${today}`, 105, 28, { align: 'center' });
  
  doc.setFillColor(37, 99, 235);
  doc.rect(20, 35, 170, 28, 'F');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('Taxe de bienvenue à payer', 105, 43, { align: 'center' });
  doc.setFontSize(26);
  doc.text(formatCurrency(results.totalTax), 105, 56, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Détails de la propriété', 20, 76);
  
  const locationName = results.location === 'montreal' ? 'Montréal' : 'Ailleurs au Québec';
  
  autoTable(doc, {
    startY: 80,
    head: [['Description', 'Valeur']],
    body: [
      ['Prix de la propriété', formatCurrency(results.propertyPrice)],
      ['Localisation', locationName],
      ['Taux effectif', `${results.effectiveRate.toFixed(2)}%`],
      ['Taxe de bienvenue', formatCurrency(results.totalTax)],
    ],
    theme: 'striped',
    headStyles: { fillColor: [37, 99, 235], textColor: 255 },
    styles: { fontSize: 11 },
    columnStyles: { 0: { cellWidth: 100 }, 1: { cellWidth: 70, halign: 'right' } }
  });
  
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text('Calculé avec QCFinance.ca', 105, 280, { align: 'center' });
  
  doc.save(`taxe-bienvenue-${results.propertyPrice}-quebec.pdf`);
}

/**
 * Generate PDF for Rent Calculator Results
 */
export function generateRentPDF(results: any) {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.setTextColor(37, 99, 235);
  doc.text('Augmentation de Loyer - Québec', 105, 20, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const today = new Date().toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Généré le ${today}`, 105, 28, { align: 'center' });
  
  doc.setFillColor(37, 99, 235);
  doc.rect(20, 35, 170, 28, 'F');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('Nouveau loyer mensuel', 105, 43, { align: 'center' });
  doc.setFontSize(26);
  doc.text(formatCurrency(results.newRent), 105, 56, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Détails de l\'augmentation', 20, 76);
  
  autoTable(doc, {
    startY: 80,
    head: [['Description', 'Montant']],
    body: [
      ['Loyer actuel', formatCurrency(results.currentRent)],
      ['Augmentation de base', formatCurrency(results.baseIndexIncrease)],
      ['Ajustement chauffage', formatCurrency(results.heatingAdjustment)],
      ['Taxes municipales', formatCurrency(results.municipalTaxIncrease)],
      ['Taxes scolaires', formatCurrency(results.schoolTaxIncrease)],
      ['Assurance', formatCurrency(results.insuranceIncrease)],
      ['Rénovations', formatCurrency(results.renovationIncrease)],
      ['Entretien', formatCurrency(results.maintenanceIncrease)],
      ['Augmentation totale', formatCurrency(results.totalIncrease)],
      ['Nouveau loyer', formatCurrency(results.newRent)],
      ['Pourcentage d\'augmentation', `${results.percentageIncrease.toFixed(2)}%`],
    ],
    theme: 'striped',
    headStyles: { fillColor: [37, 99, 235], textColor: 255 },
    styles: { fontSize: 10 },
    columnStyles: { 0: { cellWidth: 100 }, 1: { cellWidth: 70, halign: 'right' } }
  });
  
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text('Calculé avec QCFinance.ca', 105, 280, { align: 'center' });
  
  doc.save(`augmentation-loyer-${results.currentRent}-quebec.pdf`);
}

/**
 * Generate PDF for Daycare Calculator Results
 */
export function generateDaycarePDF(results: any) {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.setTextColor(37, 99, 235);
  doc.text('Comparaison Frais de Garde - Québec', 105, 20, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const today = new Date().toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Généré le ${today}`, 105, 28, { align: 'center' });
  
  doc.setFillColor(37, 99, 235);
  doc.rect(20, 35, 170, 28, 'F');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('Différence annuelle', 105, 43, { align: 'center' });
  doc.setFontSize(26);
  doc.text(formatCurrency(Math.abs(results.annualDifference)), 105, 56, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('CPE (Subventionné)', 20, 76);
  
  autoTable(doc, {
    startY: 80,
    body: [
      ['Tarif quotidien CPE', formatCurrency(results.cpeDailyRate)],
      ['Jours par année', results.daysPerYear.toString()],
      ['Coût annuel CPE', formatCurrency(results.cpeAnnualCost)],
    ],
    theme: 'plain',
    styles: { fontSize: 11, fillColor: [243, 244, 246] },
    columnStyles: { 0: { cellWidth: 100 }, 1: { cellWidth: 70, halign: 'right' } }
  });
  
  const finalY1 = (doc as any).lastAutoTable.finalY + 10;
  doc.text('Garderie Privée', 20, finalY1);
  
  autoTable(doc, {
    startY: finalY1 + 4,
    body: [
      ['Tarif quotidien privé', formatCurrency(results.privateDailyRate)],
      ['Coût annuel avant crédit', formatCurrency(results.privateAnnualCostBeforeCredit)],
      ['Crédit d\'impôt', `${(results.taxCreditPercentage * 100).toFixed(0)}%`],
      ['Montant du crédit', formatCurrency(results.taxCreditAmount)],
      ['Coût net annuel', formatCurrency(results.privateNetAnnualCost)],
      ['Coût net quotidien', formatCurrency(results.privateNetDailyCost)],
    ],
    theme: 'plain',
    styles: { fontSize: 11, fillColor: [243, 244, 246] },
    columnStyles: { 0: { cellWidth: 100 }, 1: { cellWidth: 70, halign: 'right' } }
  });
  
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text('Calculé avec QCFinance.ca', 105, 280, { align: 'center' });
  
  doc.save(`frais-garde-${results.familyIncome}-quebec.pdf`);
}

/**
 * Generate PDF for Compound Interest Calculator Results
 */
export function generateCompoundInterestPDF(results: any) {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.setTextColor(16, 185, 129);
  doc.text('Plan d\'Investissement - Intérêts Composés', 105, 20, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const today = new Date().toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Généré le ${today}`, 105, 28, { align: 'center' });
  
  doc.setFillColor(16, 185, 129);
  doc.rect(20, 35, 170, 30, 'F');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text(`Valeur finale après ${results.years} ans`, 105, 43, { align: 'center' });
  doc.setFontSize(26);
  doc.text(formatCurrency(results.finalAmount), 105, 58, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Paramètres d\'investissement', 20, 78);
  
  autoTable(doc, {
    startY: 82,
    head: [['Paramètre', 'Valeur']],
    body: [
      ['Dépôt initial', formatCurrency(results.initialDeposit)],
      ['Contribution mensuelle', formatCurrency(results.monthlyContribution)],
      ['Durée', `${results.years} ans`],
      ['Taux de rendement', `${results.interestRate.toFixed(1)}%`],
    ],
    theme: 'striped',
    headStyles: { fillColor: [16, 185, 129], textColor: 255 },
    styles: { fontSize: 11 },
    columnStyles: { 0: { cellWidth: 100 }, 1: { cellWidth: 70, halign: 'right' } }
  });
  
  const finalY1 = (doc as any).lastAutoTable.finalY + 10;
  doc.text('Résumé financier', 20, finalY1);
  
  autoTable(doc, {
    startY: finalY1 + 4,
    body: [
      ['Total investi', formatCurrency(results.totalContributions)],
      ['Intérêts gagnés', formatCurrency(results.totalInterest)],
      ['Valeur finale', formatCurrency(results.finalAmount)],
      ['Gain en %', `${((results.totalInterest / results.totalContributions) * 100).toFixed(0)}%`],
    ],
    theme: 'plain',
    styles: { fontSize: 11, fillColor: [243, 244, 246] },
    columnStyles: { 0: { cellWidth: 100 }, 1: { cellWidth: 70, halign: 'right', fontStyle: 'bold' } }
  });
  
  const finalY2 = (doc as any).lastAutoTable.finalY + 10;
  doc.setFillColor(220, 252, 231);
  doc.rect(20, finalY2, 170, 20, 'F');
  doc.setFontSize(11);
  doc.setTextColor(22, 101, 52);
  doc.text('💰 Le pouvoir des intérêts composés:', 25, finalY2 + 8);
  doc.setFontSize(10);
  const gainPercent = ((results.totalInterest / results.totalContributions) * 100).toFixed(0);
  doc.text(`Vous gagnerez ${gainPercent}% de plus que ce que vous avez investi!`, 25, finalY2 + 15);
  
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text('Calculé avec QCFinance.ca', 105, 280, { align: 'center' });
  
  doc.save(`interets-composes-${results.years}ans-quebec.pdf`);
}

/**
 * Generate PDF for Rent vs Buy Calculator Results
 */
export function generateRentVsBuyPDF(results: any) {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.setTextColor(37, 99, 235);
  doc.text('Louer vs Acheter - Analyse Comparative', 105, 20, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const today = new Date().toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Généré le ${today}`, 105, 28, { align: 'center' });
  
  const isBuyingBetter = results.buyingNetWorth > results.rentingNetWorth;
  const color: [number, number, number] = isBuyingBetter ? [16, 185, 129] : [37, 99, 235];
  
  doc.setFillColor(color[0], color[1], color[2]);
  doc.rect(20, 35, 170, 28, 'F');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('Meilleure option après 25 ans', 105, 43, { align: 'center' });
  doc.setFontSize(24);
  doc.text(isBuyingBetter ? 'ACHETER' : 'LOUER', 105, 56, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Paramètres de comparaison', 20, 76);
  
  autoTable(doc, {
    startY: 80,
    head: [['Paramètre', 'Valeur']],
    body: [
      ['Prix de la maison', formatCurrency(results.homePrice)],
      ['Loyer mensuel', formatCurrency(results.monthlyRent)],
      ['Mise de fonds', `${results.downPaymentPercent}%`],
      ['Taux de rendement', `${results.investmentReturnRate.toFixed(1)}%`],
    ],
    theme: 'striped',
    headStyles: { fillColor: color, textColor: 255 },
    styles: { fontSize: 11 },
    columnStyles: { 0: { cellWidth: 100 }, 1: { cellWidth: 70, halign: 'right' } }
  });
  
  const finalY1 = (doc as any).lastAutoTable.finalY + 10;
  doc.text('Résultats après 25 ans', 20, finalY1);
  
  autoTable(doc, {
    startY: finalY1 + 4,
    body: [
      ['Valeur nette (Acheter)', formatCurrency(results.buyingNetWorth)],
      ['Valeur nette (Louer)', formatCurrency(results.rentingNetWorth)],
      ['Différence', formatCurrency(Math.abs(results.buyingNetWorth - results.rentingNetWorth))],
    ],
    theme: 'plain',
    styles: { fontSize: 11, fillColor: [243, 244, 246] },
    columnStyles: { 0: { cellWidth: 100 }, 1: { cellWidth: 70, halign: 'right', fontStyle: 'bold' } }
  });
  
  const finalY2 = (doc as any).lastAutoTable.finalY + 10;
  const bgColor: [number, number, number] = isBuyingBetter ? [220, 252, 231] : [219, 234, 254];
  doc.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
  doc.rect(20, finalY2, 170, 20, 'F');
  doc.setFontSize(11);
  doc.setTextColor(isBuyingBetter ? 22 : 30, isBuyingBetter ? 101 : 64, isBuyingBetter ? 52 : 175);
  const advantage = formatCurrency(Math.abs(results.buyingNetWorth - results.rentingNetWorth));
  doc.text(`${isBuyingBetter ? '🏠' : '🏢'} Avantage de ${advantage} en ${isBuyingBetter ? 'achetant' : 'louant'}`, 25, finalY2 + 12);
  
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text('Calculé avec QCFinance.ca', 105, 280, { align: 'center' });
  
  doc.save(`louer-vs-acheter-${results.homePrice}-quebec.pdf`);
}
