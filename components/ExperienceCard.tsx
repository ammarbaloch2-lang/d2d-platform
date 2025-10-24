'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface ExperienceCardProps {
  id: string
  title: string
  description: string
  price: number
  duration: string
  image: string
  images?: string[]
  rating: number
  reviewCount: number
  location: string
  category: string
  type: string
  difficulty?: 'easy' | 'moderate' | 'challenging'
}

const difficultyColors = {
  easy: 'bg-green-500',
  moderate: 'bg-yellow-500',
  challenging: 'bg-red-500',
}

const difficultyLabels = {
  easy: 'Easy',
  moderate: 'Moderate',
  challenging: 'Challenging',
}

export default function ExperienceCard({
  id,
  title,
  description,
  price,
  duration,
  image,
  images,
  rating,
  reviewCount,
  location,
  category,
  type,
  difficulty,
}: ExperienceCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const galleryImages = images && images.length > 0 ? images : [image]

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
  }

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <Link href={`/experiences/${id}`}>
      <div className="card group cursor-pointer hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-56 overflow-hidden">
          <Image
            src={galleryImages[currentImageIndex]}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Price Tag */}
          <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-bold text-primary shadow-lg">
            SAR {price}
          </div>

          {/* Difficulty Badge */}
          {difficulty && (
            <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white ${difficultyColors[difficulty]} shadow-lg`}>
              {difficultyLabels[difficulty]}
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white capitalize">
            {category}
          </div>

          {/* Image Navigation */}
          {galleryImages.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 shadow-lg"
                aria-label="Previous image"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 shadow-lg"
                aria-label="Next image"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setCurrentImageIndex(index)
                    }}
                    className={`h-2 rounded-full transition-all duration-200 ${
                      index === currentImageIndex
                        ? 'bg-white w-4'
                        : 'bg-white/50 hover:bg-white/75 w-2'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center text-sm text-gray-500 mb-2 flex-wrap gap-2">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {location}
            </div>
            <span className="text-gray-400">•</span>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              {duration}
            </div>
            <span className="text-gray-400">•</span>
            <span className="capitalize text-secondary font-semibold">{type}</span>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-primary fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-sm font-semibold text-gray-900">{rating}</span>
              <span className="ml-1 text-sm text-gray-500">({reviewCount})</span>
            </div>
            <span className="text-primary font-semibold text-sm">Explore →</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
