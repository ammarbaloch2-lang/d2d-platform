import { NextResponse } from 'next/server'
import { getTourByIdFromKv, updateTourInKv, deleteTourFromKv } from '@/lib/toursDb'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const tour = await getTourByIdFromKv(id)
  if (!tour) {
    return NextResponse.json({ error: 'Tour not found' }, { status: 404 })
  }
  return NextResponse.json(tour)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const updatedTour = await updateTourInKv(id, body)
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
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const success = await deleteTourFromKv(id)
  if (!success) {
    return NextResponse.json({ error: 'Tour not found' }, { status: 404 })
  }
  return NextResponse.json({ message: 'Tour deleted successfully' })
}
