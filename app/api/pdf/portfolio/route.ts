import { NextRequest, NextResponse } from 'next/server';

/**
 * Portfolio PDF Generation API
 * This is a placeholder API route for future server-side PDF generation
 * Currently, PDF generation is handled client-side using html2canvas and jsPDF
 *
 * POST /api/pdf/portfolio
 */
export async function POST(request: NextRequest) {
  try {
    return NextResponse.json(
      {
        message: 'PDF generation is handled client-side',
        info: 'Use the PortfolioPDFTemplate component with generatePDFFromElement function',
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 },
    );
  }
}
