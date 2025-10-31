import { NextRequest, NextResponse } from 'next/server';

/**
 * Simple PDF Generation API - Client-side fallback
 * POST /api/pdf/generate
 */
export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();

    if (action === 'check') {
      return NextResponse.json({ status: 'ok', message: 'Use client-side PDF generation with html2canvas' });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 },
    );
  }
}
