/**
 * PDF Export Utility for Simulator Results
 * Uses jsPDF to generate downloadable PDF reports
 */

import type { SimulatorResult } from '@/src/hooks/useSimulator';

export interface PDFExportOptions {
  result: SimulatorResult;
  grossSalary: number;
  hasPartner: boolean;
  hasCar: boolean;
}

/**
 * Generate and download PDF report
 */
export async function exportToPDF(options: PDFExportOptions): Promise<void> {
  const { result, grossSalary, hasPartner, hasCar } = options;
  
  // Dynamic import to reduce bundle size
  const { jsPDF } = await import('jspdf');
  
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = 20;

  // Header
  doc.setFontSize(20);
  doc.setTextColor(16, 185, 129);
  doc.text('Simulateur de Vie au Quebec', pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const dateStr = new Date().toLocaleDateString('fr-CA');
  doc.text('Rapport genere le ' + dateStr, pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 15;
  doc.setDrawColor(200, 200, 200);
  doc.line(20, yPos, pageWidth - 20, yPos);
  
  // Input Summary
  yPos += 10;
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('Vos Informations', 20, yPos);
  
  yPos += 8;
  doc.setFontSize(10);
  doc.text('Salaire brut annuel: ' + grossSalary.toLocaleString('fr-CA') + '$', 25, yPos);
  
  yPos += 6;
  doc.text('Ville: ' + result.city.name, 25, yPos);
  
  yPos += 6;
  doc.text('Situation: ' + (hasPartner ? 'En couple' : 'Seul(e)'), 25, yPos);
  
  yPos += 6;
  doc.text('Transport: ' + (hasCar ? 'Voiture' : 'Transport public'), 25, yPos);
  
  // Net Income
  yPos += 15;
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('Revenu Net', 20, yPos);
  
  yPos += 8;
  doc.setFontSize(10);
  doc.text('Revenu net mensuel: ' + result.tax.netMonthly.toLocaleString('fr-CA') + '$', 25, yPos);
  
  yPos += 6;
  doc.text('Revenu net annuel: ' + result.tax.netAnnual.toLocaleString('fr-CA') + '$', 25, yPos);
  
  yPos += 6;
  doc.text('Taux d\'imposition effectif: ' + result.tax.effectiveTaxRate.toFixed(1) + '%', 25, yPos);
  
  // Expenses
  yPos += 15;
  doc.setFontSize(14);
  doc.text('Depenses Mensuelles', 20, yPos);
  
  yPos += 8;
  doc.setFontSize(10);
  
  const rent = hasPartner ? result.city.avgRent * 0.5 : result.city.avgRent;
  const rentLabel = hasPartner ? ' (partage)' : '';
  doc.text('Loyer: ' + rent.toLocaleString('fr-CA') + '$' + rentLabel, 25, yPos);
  
  yPos += 6;
  const groceries = hasPartner ? result.city.monthlyGrocery * 1.5 : result.city.monthlyGrocery;
  doc.text('Epicerie: ' + groceries.toLocaleString('fr-CA') + '$', 25, yPos);
  
  yPos += 6;
  const transport = hasCar ? 300 : result.city.transportation;
  const transportLabel = hasCar ? ' (voiture)' : ' (public)';
  doc.text('Transport: ' + transport.toLocaleString('fr-CA') + '$' + transportLabel, 25, yPos);
  
  yPos += 6;
  const utilities = hasPartner ? result.city.utilities * 0.5 : result.city.utilities;
  const utilLabel = hasPartner ? ' (partages)' : '';
  doc.text('Services publics: ' + utilities.toLocaleString('fr-CA') + '$' + utilLabel, 25, yPos);
  
  yPos += 8;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Total depenses: ' + result.monthlyExpenses.toLocaleString('fr-CA') + '$', 25, yPos);
  doc.setFont('helvetica', 'normal');
  
  // Savings
  yPos += 15;
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('Economies & Sante Financiere', 20, yPos);
  
  yPos += 8;
  doc.setFontSize(10);
  const dispColor = result.disposableIncome >= 0;
  doc.setTextColor(dispColor ? 16 : 239, dispColor ? 185 : 68, dispColor ? 129 : 68);
  doc.text('Disponible mensuel: ' + result.disposableIncome.toLocaleString('fr-CA') + '$', 25, yPos);
  
  yPos += 6;
  doc.setTextColor(0, 0, 0);
  doc.text('Taux d\'economies: ' + result.savingsRate.toFixed(1) + '%', 25, yPos);
  
  yPos += 6;
  doc.text('Statut: ' + result.financialHealth.label, 25, yPos);
  
  // Tax Breakdown
  yPos += 15;
  doc.setFontSize(14);
  doc.text('Detail des Impots et Cotisations', 20, yPos);
  
  yPos += 8;
  doc.setFontSize(10);
  doc.text('Impot federal: ' + result.tax.federalTax.toLocaleString('fr-CA') + '$', 25, yPos);
  
  yPos += 6;
  doc.text('Impot provincial: ' + result.tax.provincialTax.toLocaleString('fr-CA') + '$', 25, yPos);
  
  yPos += 6;
  doc.text('RRQ: ' + result.tax.qppContribution.toLocaleString('fr-CA') + '$', 25, yPos);
  
  yPos += 6;
  doc.text('RQAP: ' + result.tax.qpipContribution.toLocaleString('fr-CA') + '$', 25, yPos);
  
  yPos += 6;
  doc.text('Assurance-emploi: ' + result.tax.eiContribution.toLocaleString('fr-CA') + '$', 25, yPos);
  
  // Footer
  yPos = doc.internal.pageSize.getHeight() - 20;
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('QCFinance.ca - Calculateurs financiers gratuits pour le Quebec', pageWidth / 2, yPos, { align: 'center' });
  doc.text('Resultats approximatifs bases sur les taux 2025-2026', pageWidth / 2, yPos + 4, { align: 'center' });
  
  // Save PDF
  const fileName = 'simulateur-quebec-' + result.city.id + '-' + Date.now() + '.pdf';
  doc.save(fileName);
}
