import { Tour } from '@/types/tour'
import * as fs from 'fs'
import * as path from 'path'
import { createClient } from 'redis'

const TOURS_KEY = 'tours'
const DATA_FILE = path.join(process.cwd(), 'data', 'tours.json')

// Check if Redis environment variable is available
const hasRedisEnv = () => {
  return !!process.env.REDIS_URL
}

// Initialize Redis client
let redisClient: any = null
let redisPromise: Promise<any> | null = null

async function getRedisClient() {
  if (!hasRedisEnv()) {
    return null
  }

  if (redisClient) {
    return redisClient
  }

  if (redisPromise) {
    return redisPromise
  }

  redisPromise = (async () => {
    try {
      const client = createClient({
        url: process.env.REDIS_URL
      })

      client.on('error', (err) => {
        console.error('Redis Client Error:', err)
      })

      await client.connect()
      console.log('Redis client connected successfully')
      redisClient = client
      return client
    } catch (error) {
      console.error('Failed to connect to Redis:', error)
      redisPromise = null
      return null
    }
  })()

  return redisPromise
}

// Helper function to get all tours (uses Redis on Vercel, file system locally)
export async function getAllToursFromKv(): Promise<Tour[]> {
  try {
    // Try Redis first (Vercel production)
    const client = await getRedisClient()
    if (client) {
      const data = await client.get(TOURS_KEY)
      if (data) {
        console.log('[getAllToursFromKv] Retrieved tours from Redis')
        return JSON.parse(data)
      }
    }

    // Fallback to file system (local development)
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8')
      console.log('[getAllToursFromKv] Retrieved tours from file system')
      return JSON.parse(data)
    }
    return []
  } catch (error) {
    console.error('Error reading tours:', error)
    return []
  }
}

// Helper function to save all tours (uses Redis on Vercel, file system locally)
async function saveTourToKv(tours: Tour[]): Promise<void> {
  console.log('[saveTourToKv] Saving', tours.length, 'tours')

  // Save to Redis if available (Vercel production)
  const client = await getRedisClient()
  if (client) {
    try {
      console.log('[saveTourToKv] Writing to Redis...')
      await client.set(TOURS_KEY, JSON.stringify(tours))
      console.log('[saveTourToKv] Successfully wrote to Redis')
    } catch (error) {
      console.error('[saveTourToKv] Error writing to Redis:', error)
      throw error
    }
  } else {
    console.log('[saveTourToKv] Redis not available, skipping Redis write')
  }

  // Save to file system only in local development (production file system is read-only)
  try {
    console.log('[saveTourToKv] Writing to file system:', DATA_FILE)
    fs.writeFileSync(DATA_FILE, JSON.stringify(tours, null, 2))
    console.log('[saveTourToKv] Successfully wrote to file system')
  } catch (error) {
    // File system is read-only in production, this is expected
    console.log('[saveTourToKv] File system write failed (expected in production):', error)
  }
}

export async function getTourByIdFromKv(id: string): Promise<Tour | null> {
  try {
    const tours = await getAllToursFromKv()
    return tours.find(tour => tour.id === id) || null
  } catch (error) {
    console.error('Error fetching tour from KV:', error)
    return null
  }
}

export async function createTourInKv(
  tourData: Omit<Tour, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Tour> {
  const tours = await getAllToursFromKv()
  const newTour: Tour = {
    ...tourData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  tours.push(newTour)
  await saveTourToKv(tours)
  return newTour
}

export async function updateTourInKv(
  id: string,
  tourData: Partial<Tour>
): Promise<Tour | null> {
  console.log('[updateTourInKv] Starting update for tour:', id)

  const client = await getRedisClient()
  console.log('[updateTourInKv] Redis available:', !!client)

  const tours = await getAllToursFromKv()
  console.log('[updateTourInKv] Total tours found:', tours.length)

  const index = tours.findIndex(tour => tour.id === id)
  console.log('[updateTourInKv] Tour index:', index)

  if (index === -1) {
    console.error('[updateTourInKv] Tour not found with id:', id)
    return null
  }

  const oldPrice = tours[index].price
  tours[index] = {
    ...tours[index],
    ...tourData,
    id, // Ensure id doesn't change
    updatedAt: new Date().toISOString(),
  }
  const newPrice = tours[index].price

  console.log('[updateTourInKv] Price change:', oldPrice, '->', newPrice)
  console.log('[updateTourInKv] Saving to Redis...')

  await saveTourToKv(tours)

  console.log('[updateTourInKv] Save complete')

  return tours[index]
}

export async function deleteTourFromKv(id: string): Promise<boolean> {
  const tours = await getAllToursFromKv()
  const index = tours.findIndex(tour => tour.id === id)
  if (index === -1) return false

  tours.splice(index, 1)
  await saveTourToKv(tours)
  return true
}

// Initialize tours from file if Redis is empty (one-time setup)
export async function initializeToursFromFile(): Promise<void> {
  try {
    const existingTours = await getAllToursFromKv()
    const client = await getRedisClient()

    // Only initialize if we have Redis and no existing tours
    if (client && existingTours.length === 0) {
      if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE, 'utf-8')
        const tours: Tour[] = JSON.parse(data)
        await saveTourToKv(tours)
        console.log('Initialized Redis with tours from file')
      }
    }
  } catch (error) {
    console.error('Error initializing tours from file:', error)
  }
}
