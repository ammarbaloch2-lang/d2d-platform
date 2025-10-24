import { NextResponse } from 'next/server'
import { getTourById, updateTour, deleteTour } from '@/lib/tours'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const tour = getTourById(params.id)
  if (!tour) {
    return NextResponse.json({ error: 'Tour not found' }, { status: 404 })
  }
  return NextResponse.json(tour)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const updatedTour = updateTour(params.id, body)
    if (!updatedTour) {
      return NextResponse.json({ error: 'Tour not found' }, { status: 404 })
    }
    return NextResponse.json(updatedTour)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update tour' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const success = deleteTour(params.id)
  if (!success) {
    return NextResponse.json({ error: 'Tour not found' }, { status: 404 })
  }
  return NextResponse.json({ message: 'Tour deleted successfully' })
}
