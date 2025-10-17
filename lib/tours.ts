import { Tour } from '@/types/tour'
import * as fs from 'fs'
import * as path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'tours.json')

// Helper function to read tours from file
function readToursFromFile(): Tour[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      // Create default data if file doesn't exist
      const defaultTours: Tour[] = []
      fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true })
      fs.writeFileSync(DATA_FILE, JSON.stringify(defaultTours, null, 2))
      return defaultTours
    }
    const data = fs.readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading tours file:', error)
    return []
  }
}

// Helper function to write tours to file
function writeToursToFile(tours: Tour[]): void {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tours, null, 2))
  } catch (error) {
    console.error('Error writing tours file:', error)
  }
}

export function getAllTours(): Tour[] {
  return readToursFromFile()
}

export function getTourById(id: string): Tour | undefined {
  const tours = readToursFromFile()
  return tours.find(tour => tour.id === id)
}

export function createTour(tourData: Omit<Tour, 'id' | 'createdAt' | 'updatedAt'>): Tour {
  const tours = readToursFromFile()
  const newTour: Tour = {
    ...tourData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  tours.push(newTour)
  writeToursToFile(tours)
  return newTour
}

export function updateTour(id: string, tourData: Partial<Tour>): Tour | null {
  const tours = readToursFromFile()
  const index = tours.findIndex(tour => tour.id === id)
  if (index === -1) return null

  tours[index] = {
    ...tours[index],
    ...tourData,
    id, // Ensure id doesn't change
    updatedAt: new Date().toISOString(),
  }
  writeToursToFile(tours)
  return tours[index]
}

export function deleteTour(id: string): boolean {
  const tours = readToursFromFile()
  const index = tours.findIndex(tour => tour.id === id)
  if (index === -1) return false

  tours.splice(index, 1)
  writeToursToFile(tours)
  return true
}
