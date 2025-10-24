'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { useState } from 'react'

interface GalleryImage {
  id: string
  src: string
  title: string
  category: string
  location: string
}

const galleryImages: GalleryImage[] = [
  // Desert & Landscapes
  { id: '1', src: '/images/desert-safari.jpg', title: 'Desert Safari Adventure', category: 'desert', location: 'Empty Quarter' },
  { id: '2', src: '/images/sand-dunes.jpg', title: 'Golden Sand Dunes', category: 'desert', location: 'Rub al Khali' },
  { id: '3', src: '/images/desert-camp.jpg', title: 'Desert Camp at Sunset', category: 'desert', location: 'Riyadh Desert' },

  // Cultural & Heritage
  { id: '4', src: '/images/historical-site.jpg', title: 'Ancient Heritage Site', category: 'cultural', location: 'AlUla' },
  { id: '5', src: '/images/traditional-market.jpg', title: 'Traditional Souq', category: 'cultural', location: 'Jeddah' },
  { id: '6', src: '/images/heritage-village.jpg', title: 'Heritage Village', category: 'cultural', location: 'Diriyah' },

  // Nature & Adventure
  { id: '7', src: '/images/mountain-hiking.jpg', title: 'Mountain Hiking Trail', category: 'nature', location: 'Asir Mountains' },
  { id: '8', src: '/images/red-sea.jpg', title: 'Red Sea Coast', category: 'nature', location: 'Jeddah' },
  { id: '9', src: '/images/oasis.jpg', title: 'Desert Oasis', category: 'nature', location: 'Al Ahsa' },

  // Modern Saudi
  { id: '10', src: '/images/riyadh-skyline.jpg', title: 'Riyadh Skyline', category: 'modern', location: 'Riyadh' },
  { id: '11', src: '/images/kingdom-tower.jpg', title: 'Kingdom Tower at Night', category: 'modern', location: 'Riyadh' },
  { id: '12', src: '/images/jeddah-corniche.jpg', title: 'Jeddah Corniche', category: 'modern', location: 'Jeddah' },

  // Activities
  { id: '13', src: '/images/camel-riding.jpg', title: 'Camel Riding Experience', category: 'activities', location: 'Desert' },
  { id: '14', src: '/images/rock-climbing.jpg', title: 'Rock Climbing Adventure', category: 'activities', location: 'Tabuk' },
  { id: '15', src: '/images/diving.jpg', title: 'Red Sea Diving', category: 'activities', location: 'Red Sea' },
]

const categories = [
  { id: 'all', name: 'All Photos', icon: '🖼️' },
  { id: 'desert', name: 'Desert', icon: '🏜️' },
  { id: 'cultural', name: 'Cultural', icon: '🕌' },
  { id: 'nature', name: 'Nature', icon: '🏔️' },
  { id: 'modern', name: 'Modern', icon: '🏙️' },
  { id: 'activities', name: 'Activities', icon: '🎯' },
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  const filteredImages = selectedCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory)

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

      {/* Category Filter */}
      <section className="bg-white shadow-md sticky top-[73px] z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-3 justify-center">
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
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <p className="text-gray-600 text-center">
            Showing <span className="font-semibold text-primary">{filteredImages.length}</span> photos
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className="group relative aspect-square overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <Image
                src={image.src}
                alt={image.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                  <p className="text-sm flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                    {image.location}
                  </p>
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

        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No photos found</h3>
            <p className="text-gray-500">Try selecting a different category</p>
          </div>
        )}
      </section>

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
              <Image
                src={selectedImage.src}
                alt={selectedImage.title}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>

            <div className="bg-white p-6 rounded-b-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedImage.title}</h2>
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                <span className="text-lg">{selectedImage.location}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
