'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { CldImage } from 'next-cloudinary'
import { useState, useEffect } from 'react'

interface CloudinaryImage {
  public_id: string
  secure_url: string
  width: number
  height: number
  metadata?: {
    title?: string
    location?: string
  }
}

// Cloudinary API credentials
const CLOUD_NAME = 'dcammumm9'
const API_KEY = '464487176886491'

const categories = [
  { id: 'all', name: 'All Photos', icon: '🖼️' },
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<CloudinaryImage | null>(null)
  const [images, setImages] = useState<CloudinaryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'slideshow'>('grid')
  const [slideshowIndex, setSlideshowIndex] = useState(0)

  // Fetch images from Cloudinary
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image?max_results=500`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Basic ${Buffer.from(`_:${API_KEY}`).toString('base64')}`,
            },
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch images from Cloudinary')
        }

        const data = await response.json()
        setImages(data.resources || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load images')
        console.error('Error fetching Cloudinary images:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  // Auto-advance slideshow
  useEffect(() => {
    if (viewMode !== 'slideshow' || images.length === 0) return

    const interval = setInterval(() => {
      setSlideshowIndex((prev) => (prev + 1) % images.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [viewMode, images.length])

  const currentImage = images[slideshowIndex]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[350px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/banner.png"
            alt="Gallery"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent"></div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Photo Gallery</h1>
            <p className="text-xl md:text-2xl">Discover the Beauty of Saudi Arabia</p>
          </div>
        </div>
      </section>

      {/* View Mode Toggle & Controls */}
      <section className="bg-white shadow-md sticky top-[73px] z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-3 justify-between items-center">
            <div className="flex gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-montserrat font-semibold text-sm transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2 bg-gray-100 p-1 rounded-full">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 flex items-center gap-2 ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"/>
                  <path d="M3 10a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z"/>
                </svg>
                Grid
              </button>
              <button
                onClick={() => setViewMode('slideshow')}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 flex items-center gap-2 ${
                  viewMode === 'slideshow'
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
                </svg>
                Slideshow
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Loading & Error States */}
      {loading && (
        <section className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="inline-block animate-spin">
              <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="mt-4 text-gray-600">Loading gallery...</p>
          </div>
        </section>
      )}

      {error && (
        <section className="container mx-auto px-4 py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-700 font-semibold mb-2">Error Loading Gallery</p>
            <p className="text-red-600 mb-4">{error}</p>
            <p className="text-sm text-gray-600">Please make sure you've uploaded photos to Cloudinary. Visit <a href="https://cloudinary.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">cloudinary.com</a> to upload your photos.</p>
          </div>
        </section>
      )}

      {/* Grid View */}
      {!loading && !error && viewMode === 'grid' && (
        <section className="container mx-auto px-4 py-12">
          <div className="mb-6">
            <p className="text-gray-600 text-center">
              <span className="font-semibold text-primary">{images.length}</span> photos in gallery
            </p>
          </div>

          {images.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {images.map((image, idx) => (
                <div
                  key={image.public_id || idx}
                  onClick={() => setSelectedImage(image)}
                  className="group relative aspect-square overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <CldImage
                    src={image.public_id}
                    alt={`Gallery Image ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <p className="text-sm">Image {idx + 1}</p>
                    </div>
                  </div>

                  {/* View Icon */}
                  <div className="absolute top-4 right-4 bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No photos yet</h3>
              <p className="text-gray-500">Upload photos to Cloudinary to get started</p>
            </div>
          )}
        </section>
      )}

      {/* Slideshow View */}
      {!loading && !error && viewMode === 'slideshow' && images.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
            {/* Main Image */}
            <div className="relative aspect-video w-full bg-black">
              <CldImage
                src={currentImage.public_id}
                alt="Slideshow Image"
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {/* Navigation Controls */}
            <div className="bg-gradient-to-t from-black to-transparent p-6 text-white flex items-center justify-between">
              {/* Previous Button */}
              <button
                onClick={() => setSlideshowIndex((prev) => (prev - 1 + images.length) % images.length)}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Previous
              </button>

              {/* Photo Counter & Play/Pause */}
              <div className="text-center">
                <p className="font-semibold text-lg">{slideshowIndex + 1} / {images.length}</p>
                <p className="text-sm text-gray-300">Auto-playing (5s per image)</p>
              </div>

              {/* Next Button */}
              <button
                onClick={() => setSlideshowIndex((prev) => (prev + 1) % images.length)}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200"
              >
                Next
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>
        </section>
      )}

      {!loading && !error && viewMode === 'slideshow' && images.length === 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-gray-600">No photos to display in slideshow</p>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors duration-200 z-10"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative max-w-6xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-video w-full">
              <CldImage
                src={selectedImage.public_id}
                alt="Gallery Image"
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>

            <div className="bg-white p-6 rounded-b-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Image Details</h2>
              <p className="text-gray-600">{selectedImage.public_id}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
