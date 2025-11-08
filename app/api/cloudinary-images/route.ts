import { NextResponse } from 'next/server'

const CLOUD_NAME = 'dcammumm9'

export async function GET() {
  try {
    // Use Cloudinary Admin API with API Key
    // Note: For production, store API_SECRET in environment variable
    const API_KEY = process.env.CLOUDINARY_API_KEY || '464487176886491'
    const API_SECRET = process.env.CLOUDINARY_API_SECRET

    if (!API_SECRET) {
      throw new Error('Cloudinary API Secret not configured. Please add CLOUDINARY_API_SECRET to your .env.local file.')
    }

    const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64')

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image?max_results=500`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error(`Cloudinary API error ${response.status}:`, errorData)
      throw new Error(`Cloudinary API returned ${response.status}. Make sure your API Secret is correct.`)
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      resources: data.resources || [],
      total: data.total_count || 0,
    })
  } catch (error) {
    console.error('Error fetching Cloudinary images:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch images from Cloudinary',
        resources: [],
        total: 0,
      },
      { status: 500 }
    )
  }
}
