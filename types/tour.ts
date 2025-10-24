export interface Tour {
  id: string
  title: string
  description: string
  longDescription?: string
  price: number
  duration: string
  image: string // Main image (for backwards compatibility)
  images?: string[] // Multiple images for gallery
  rating: number
  reviewCount: number
  location: string
  category: string
  maxCapacity?: number
  includes?: string[]
  itinerary?: ItineraryItem[]
  guide?: TourGuide
  availableDates?: string[]
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export interface ItineraryItem {
  time: string
  activity: string
}

export interface TourGuide {
  name: string
  bio: string
  languages: string[]
  rating: number
  image?: string
}

export interface TourFormData {
  title: string
  description: string
  longDescription: string
  price: number
  duration: string
  image: string
  images: string // Multiple images as newline-separated string
  location: string
  category: string
  maxCapacity: number
  includes: string
  guideName: string
  guideBio: string
  guideLanguages: string
  guideRating: number
}
