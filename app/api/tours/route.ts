import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getAllToursFromKv, createTourInKv, initializeToursFromFile } from '@/lib/toursDb'

export async function GET() {
  // Initialize tours from file on first call if KV is empty
  await initializeToursFromFile()

  const tours = await getAllToursFromKv()
  return NextResponse.json(tours)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newTour = await createTourInKv(body)

    // Revalidate all pages that display tours
    revalidatePath('/', 'layout') // Homepage
    revalidatePath('/tours') // Tours listing page

    return NextResponse.json(newTour, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create tour' }, { status: 500 })
  }
}
