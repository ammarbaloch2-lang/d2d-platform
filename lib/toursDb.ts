import { Tour } from '@/types/tour'
import * as fs from 'fs'
import * as path from 'path'

const TOURS_KEY = 'tours'
const DATA_FILE = path.join(process.cwd(), 'data', 'tours.json')

// Check if KV environment variables are available
const hasKVEnv = () => {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

// Import KV only if environment variables are available
let kv: any = null
if (hasKVEnv()) {
  try {
    const kvModule = require('@vercel/kv')
    if (kvModule && kvModule.kv) {
      kv = kvModule.kv
    }
  } catch (error) {
    console.log('KV module not available, using file system storage')
  }
}

// Helper function to get all tours (uses KV on Vercel, file system locally)
export async function getAllToursFromKv(): Promise<Tour[]> {
  try {
    // Try KV first (Vercel production)
    if (kv) {
      const tours = await kv.get<Tour[]>(TOURS_KEY)
      if (tours) return tours
    }

    // Fallback to file system (local development)
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8')
      return JSON.parse(data)
    }
    return []
  } catch (error) {
    console.error('Error reading tours:', error)
    return []
  }
}

// Helper function to save all tours (uses KV on Vercel, file system locally)
async function saveTourToKv(tours: Tour[]): Promise<void> {
  try {
    // Save to KV if available (Vercel production)
    if (kv) {
      await kv.set(TOURS_KEY, tours)
    }

    // Always save to file system for backup/local development
    fs.writeFileSync(DATA_FILE, JSON.stringify(tours, null, 2))
  } catch (error) {
    console.error('Error writing tours:', error)
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
  const tours = await getAllToursFromKv()
  const index = tours.findIndex(tour => tour.id === id)
  if (index === -1) return null

  tours[index] = {
    ...tours[index],
    ...tourData,
    id, // Ensure id doesn't change
    updatedAt: new Date().toISOString(),
  }
  await saveTourToKv(tours)
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

// Initialize tours from file if KV is empty (one-time setup)
export async function initializeToursFromFile(): Promise<void> {
  try {
    const existingTours = await getAllToursFromKv()
    // Only initialize if we have tours from file (don't init from KV if it's empty)
    if (kv && existingTours.length === 0) {
      if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE, 'utf-8')
        const tours: Tour[] = JSON.parse(data)
        await saveTourToKv(tours)
        console.log('Initialized KV with tours from file')
      }
    }
  } catch (error) {
    console.error('Error initializing tours from file:', error)
  }
}
