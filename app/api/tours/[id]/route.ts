import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getTourByIdFromKv, updateTourInKv, deleteTourFromKv } from '@/lib/toursDb'

// Disable caching for this route to ensure fresh data
export const dynamic = 'force-dynamic'
export const revalidate = 0

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

    console.log('[PUT /api/tours/[id]] Updating tour:', id, 'with data:', body)

    const updatedTour = await updateTourInKv(id, body)

    console.log('[PUT /api/tours/[id]] Update result:', updatedTour)

    if (!updatedTour) {
      console.error('[PUT /api/tours/[id]] Tour not found:', id)
      return NextResponse.json({ error: 'Tour not found' }, { status: 404 })
    }

    // Revalidate all pages that display this tour
    revalidatePath('/', 'layout') // Homepage
    revalidatePath('/tours') // Tours listing page
    revalidatePath(`/tours/${id}`) // Specific tour detail page
    revalidatePath(`/api/tours/${id}`, 'page') // API route cache

    console.log('[PUT /api/tours/[id]] Successfully updated tour:', id, 'new price:', updatedTour.price)

    return NextResponse.json(updatedTour)
  } catch (error) {
    console.error('[PUT /api/tours/[id]] Error updating tour:', error)
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

  // Revalidate all pages that display tours
  revalidatePath('/', 'layout') // Homepage
  revalidatePath('/tours') // Tours listing page
  revalidatePath(`/tours/${id}`) // Specific tour detail page

  return NextResponse.json({ message: 'Tour deleted successfully' })
}
