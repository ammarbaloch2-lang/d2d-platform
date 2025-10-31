/**
 * Portfolio PDF Generator
 * Generates PDF portfolio documents using jsPDF and html2canvas
 */

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { d2dTheme } from './themeConfig';

export interface PortfolioData {
  title: string;
  subtitle?: string;
  name: string;
  email?: string;
  phone?: string;
  image?: string;
  bio?: string;
  sections: PortfolioSection[];
}

export interface PortfolioSection {
  title: string;
  content: string;
  items?: PortfolioItem[];
}

export interface PortfolioItem {
  title: string;
  description?: string;
  date?: string;
  details?: string;
}

/**
 * Generate PDF from HTML element
 */
export async function generatePDFFromElement(
  element: HTMLElement,
  filename: string = 'portfolio.pdf',
): Promise<void> {
  try {
    // Create canvas from HTML element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: d2dTheme.colors.background.white,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Calculate dimensions to fit page
    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let yPosition = 10;

    // Add pages as needed
    if (imgHeight > pageHeight - 20) {
      let heightLeft = imgHeight;
      while (heightLeft > 0) {
        pdf.addImage(imgData, 'PNG', 10, yPosition, imgWidth, imgHeight);
        heightLeft -= pageHeight - 20;
        yPosition = heightLeft > 0 ? 10 - pageHeight : 10;
        if (heightLeft > 0) {
          pdf.addPage();
        }
      }
    } else {
      pdf.addImage(imgData, 'PNG', 10, yPosition, imgWidth, imgHeight);
    }

    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
}

/**
 * Generate PDF using jsPDF directly
 */
export function generatePDFDirect(
  filename: string = 'portfolio.pdf',
  content: (pdf: jsPDF) => void,
): void {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  content(pdf);
  pdf.save(filename);
}

/**
 * Add header section to PDF
 */
export function addPDFHeader(
  pdf: jsPDF,
  title: string,
  subtitle?: string,
): number {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const marginTop = 20;

  // Add green header background
  pdf.setFillColor(
    parseInt(d2dTheme.colors.primary.slice(1, 3), 16),
    parseInt(d2dTheme.colors.primary.slice(3, 5), 16),
    parseInt(d2dTheme.colors.primary.slice(5, 7), 16),
  );
  pdf.rect(0, 0, pageWidth, 50, 'F');

  // Add title in white
  pdf.setTextColor(255, 255, 255);
  pdf.setFont('Helvetica', 'bold');
  pdf.setFontSize(28);
  pdf.text(title, pageWidth / 2, marginTop + 10, { align: 'center' });

  // Add subtitle if provided
  if (subtitle) {
    pdf.setFontSize(14);
    pdf.setFont('Helvetica', 'normal');
    pdf.text(subtitle, pageWidth / 2, marginTop + 25, { align: 'center' });
  }

  return marginTop + 35;
}

/**
 * Add section to PDF
 */
export function addPDFSection(
  pdf: jsPDF,
  yPosition: number,
  title: string,
  content: string,
): number {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  // Add orange section title
  pdf.setTextColor(
    parseInt(d2dTheme.colors.secondary.slice(1, 3), 16),
    parseInt(d2dTheme.colors.secondary.slice(3, 5), 16),
    parseInt(d2dTheme.colors.secondary.slice(5, 7), 16),
  );
  pdf.setFont('Helvetica', 'bold');
  pdf.setFontSize(16);
  pdf.text(title, margin, yPosition);

  // Add separator line
  pdf.setDrawColor(
    parseInt(d2dTheme.colors.secondary.slice(1, 3), 16),
    parseInt(d2dTheme.colors.secondary.slice(3, 5), 16),
    parseInt(d2dTheme.colors.secondary.slice(5, 7), 16),
  );
  pdf.line(margin, yPosition + 3, pageWidth - margin, yPosition + 3);

  // Add content
  pdf.setTextColor(
    parseInt(d2dTheme.colors.text.primary.slice(1, 3), 16),
    parseInt(d2dTheme.colors.text.primary.slice(3, 5), 16),
    parseInt(d2dTheme.colors.text.primary.slice(5, 7), 16),
  );
  pdf.setFont('Helvetica', 'normal');
  pdf.setFontSize(11);

  const splitText = pdf.splitTextToSize(content, contentWidth);
  const lineHeight = 5;
  const newY = yPosition + 12;

  pdf.text(splitText, margin, newY);

  const textHeight = splitText.length * lineHeight;
  const finalY = newY + textHeight;

  // Check if we need a new page
  if (finalY + 20 > pageHeight) {
    pdf.addPage();
    return 20;
  }

  return finalY + 10;
}
