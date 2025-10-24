'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ExperienceCard from '@/components/ExperienceCard'
import Image from 'next/image'
import { Experience } from '@/types/experience'

const categories = [
  { id: 'all', name: 'All Experiences', icon: '🌟' },
  { id: 'adventure', name: 'Adventure', icon: '🏔️' },
  { id: 'cultural', name: 'Cultural', icon: '🕌' },
  { id: 'culinary', name: 'Culinary', icon: '🍽️' },
  { id: 'wellness', name: 'Wellness', icon: '🧘' },
  { id: 'nature', name: 'Nature', icon: '🌿' },
  { id: 'heritage', name: 'Heritage', icon: '🏛️' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎭' },
  { id: 'shopping', name: 'Shopping', icon: '🛍️' },
]

const experienceTypes = [
  { id: 'all', name: 'All Types' },
  { id: 'group', name: 'Group' },
  { id: 'private', name: 'Private' },
  { id: 'family', name: 'Family' },
  { id: 'couples', name: 'Couples' },
  { id: 'solo', name: 'Solo' },
]

const difficulties = [
  { id: 'all', name: 'All Levels' },
  { id: 'easy', name: 'Easy' },
  { id: 'moderate', name: 'Moderate' },
  { id: 'challenging', name: 'Challenging' },
]

// Mock data - Replace with API call
const mockExperiences: Experience[] = [
  {
    id: '1',
    title: 'Traditional Arabic Coffee Making Workshop',
    description: 'Learn the ancient art of Arabic coffee preparation from local experts in a traditional setting',
    price: 150,
    duration: '2 hours',
    image: '/images/banner.png',
    images: ['/images/banner.png'],
    rating: 4.9,
    reviewCount: 234,
    location: 'Riyadh',
    category: 'cultural',
    type: 'group',
    difficulty: 'easy',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Desert Sunset Photography Experience',
    description: 'Capture stunning desert landscapes with a professional photographer during golden hour',
    price: 350,
    duration: '3 hours',
    image: '/images/banner.png',
    images: ['/images/banner.png'],
    rating: 4.8,
    reviewCount: 187,
    location: 'AlUla',
    category: 'adventure',
    type: 'private',
    difficulty: 'moderate',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Saudi Cooking Masterclass',
    description: 'Cook authentic Saudi dishes with a local chef in a beautiful home kitchen setting',
    price: 280,
    duration: '4 hours',
    image: '/images/banner.png',
    images: ['/images/banner.png'],
    rating: 5.0,
    reviewCount: 456,
    location: 'Jeddah',
    category: 'culinary',
    type: 'group',
    difficulty: 'easy',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Wellness Retreat at Edge of the World',
    description: 'Rejuvenate your mind and body with yoga and meditation at this stunning natural formation',
    price: 450,
    duration: '6 hours',
    image: '/images/banner.png',
    images: ['/images/banner.png'],
    rating: 4.9,
    reviewCount: 312,
    location: 'Riyadh Region',
    category: 'wellness',
    type: 'family',
    difficulty: 'moderate',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Ancient Rock Art Discovery Tour',
    description: 'Explore prehistoric rock carvings and learn about ancient civilizations from expert archaeologists',
    price: 320,
    duration: '5 hours',
    image: '/images/banner.png',
    images: ['/images/banner.png'],
    rating: 4.7,
    reviewCount: 198,
    location: 'Hail',
    category: 'heritage',
    type: 'group',
    difficulty: 'moderate',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Red Sea Snorkeling Adventure',
    description: 'Discover vibrant coral reefs and marine life in the crystal-clear waters of the Red Sea',
    price: 400,
    duration: 'Full day',
    image: '/images/banner.png',
    images: ['/images/banner.png'],
    rating: 4.9,
    reviewCount: 523,
    location: 'Red Sea Coast',
    category: 'nature',
    type: 'group',
    difficulty: 'easy',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export default function ExperiencesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [experiences, setExperiences] = useState<Experience[]>(mockExperiences)
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>(mockExperiences)
  const [sortBy, setSortBy] = useState('popular')

  // Filter experiences
  useEffect(() => {
    let filtered = experiences.filter((exp) => {
      const matchesSearch =
        searchQuery === '' ||
        exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.location.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === 'all' || exp.category === selectedCategory
      const matchesType = selectedType === 'all' || exp.type === selectedType
      const matchesDifficulty = selectedDifficulty === 'all' || exp.difficulty === selectedDifficulty

      return matchesSearch && matchesCategory && matchesType && matchesDifficulty
    })

    // Sort experiences
    if (sortBy === 'price-low') {
      filtered = filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      filtered = filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      filtered = filtered.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === 'popular') {
      filtered = filtered.sort((a, b) => b.reviewCount - a.reviewCount)
    }

    setFilteredExperiences(filtered)
  }, [searchQuery, selectedCategory, selectedType, selectedDifficulty, sortBy, experiences])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedType('all')
    setSelectedDifficulty('all')
    setSortBy('popular')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Categories */}
      <section className="bg-white border-b sticky top-[73px] z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap font-semibold transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filters and Results */}
      <section className="container mx-auto px-4 py-8">
        {/* Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Type Filter */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Experience Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {experienceTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Difficulty Level
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty.id} value={difficulty.id}>
                    {difficulty.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-semibold text-gray-700">
              {filteredExperiences.length} {filteredExperiences.length === 1 ? 'experience' : 'experiences'} found
            </span>
            {(selectedCategory !== 'all' || selectedType !== 'all' || selectedDifficulty !== 'all' || searchQuery) && (
              <button
                onClick={clearFilters}
                className="text-sm text-primary hover:text-secondary font-semibold flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Experiences Grid */}
        {filteredExperiences.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperiences.map((experience) => (
              <ExperienceCard key={experience.id} {...experience} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No experiences found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search query
            </p>
            <button onClick={clearFilters} className="btn-primary">
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* Popular Categories Highlight */}
      <section className="bg-sand-light py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Explore by Interest
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="card p-6 text-center group hover:scale-105 transition-transform cursor-pointer" onClick={() => setSelectedCategory('adventure')}>
              <div className="text-5xl mb-3">🏔️</div>
              <h3 className="font-bold text-gray-900 group-hover:text-primary">Adventure</h3>
              <p className="text-sm text-gray-600 mt-2">Thrilling outdoor activities</p>
            </div>

            <div className="card p-6 text-center group hover:scale-105 transition-transform cursor-pointer" onClick={() => setSelectedCategory('cultural')}>
              <div className="text-5xl mb-3">🕌</div>
              <h3 className="font-bold text-gray-900 group-hover:text-primary">Cultural</h3>
              <p className="text-sm text-gray-600 mt-2">Authentic traditions</p>
            </div>

            <div className="card p-6 text-center group hover:scale-105 transition-transform cursor-pointer" onClick={() => setSelectedCategory('culinary')}>
              <div className="text-5xl mb-3">🍽️</div>
              <h3 className="font-bold text-gray-900 group-hover:text-primary">Culinary</h3>
              <p className="text-sm text-gray-600 mt-2">Food & dining experiences</p>
            </div>

            <div className="card p-6 text-center group hover:scale-105 transition-transform cursor-pointer" onClick={() => setSelectedCategory('wellness')}>
              <div className="text-5xl mb-3">🧘</div>
              <h3 className="font-bold text-gray-900 group-hover:text-primary">Wellness</h3>
              <p className="text-sm text-gray-600 mt-2">Relax and rejuvenate</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
