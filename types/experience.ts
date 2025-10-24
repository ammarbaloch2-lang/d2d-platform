export interface Experience {
  id: string
  title: string
  description: string
  longDescription?: string
  price: number
  duration: string
  image: string
  images?: string[]
  rating: number
  reviewCount: number
  location: string
  category: ExperienceCategory
  type: ExperienceType
  difficulty?: 'easy' | 'moderate' | 'challenging'
  groupSize?: number
  ageRestriction?: string
  languages?: string[]
  includes?: string[]
  highlights?: string[]
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export type ExperienceCategory =
  | 'adventure'
  | 'cultural'
  | 'culinary'
  | 'wellness'
  | 'nature'
  | 'heritage'
  | 'entertainment'
  | 'shopping'

export type ExperienceType =
  | 'group'
  | 'private'
  | 'family'
  | 'couples'
  | 'solo'

export interface ExperienceFormData {
  title: string
  description: string
  longDescription: string
  price: number
  duration: string
  image: string
  images: string
  location: string
  category: ExperienceCategory
  type: ExperienceType
  difficulty: 'easy' | 'moderate' | 'challenging'
  groupSize: number
  ageRestriction: string
  languages: string
  includes: string
  highlights: string
}
