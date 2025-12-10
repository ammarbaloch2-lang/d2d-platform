import { NextResponse } from 'next/server'
import { getAllTours, createTour } from '@/lib/tours'

export async function GET() {
  const tours = getAllTours()
  return NextResponse.json(tours)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newTour = createTour(body)
    return NextResponse.json(newTour, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create tour' }, { status: 500 })
  }
}
