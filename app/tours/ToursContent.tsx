'use client'

import TourCard from '@/components/TourCard'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Tour } from '@/types/tour'

export default function ToursContent() {
  const searchParams = useSearchParams()
  const [allTours, setAllTours] = useState<Tour[]>([])
  const [filteredTours, setFilteredTours] = useState<Tour[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  // Fetch tours from API
  useEffect(() => {
    fetch('/api/tours')
      .then(res => res.json())
      .then(data => {
        setAllTours(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch tours:', err)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const category = searchParams.get('category')
    const query = searchParams.get('q')

    if (category) setSelectedCategory(category)
    if (query) setSearchQuery(query)
  }, [searchParams])

  useEffect(() => {
    let filtered = [...allTours]

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tour => tour.category === selectedCategory)
    }

    // Filter by price range
    if (priceRange === 'low') {
      filtered = filtered.filter(tour => tour.price < 250)
    } else if (priceRange === 'medium') {
      filtered = filtered.filter(tour => tour.price >= 250 && tour.price < 400)
    } else if (priceRange === 'high') {
      filtered = filtered.filter(tour => tour.price >= 400)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(tour =>
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Sort
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating)
    }

    setFilteredTours(filtered)
  }, [allTours, selectedCategory, priceRange, sortBy, searchQuery])

  return (
    <>
      <div className="bg-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">All Tours & Experiences</h1>
          <p className="text-lg text-gray-200">
            Discover {filteredTours.length} amazing adventures in Saudi Arabia
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search tours..."
                className="input-field"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                className="input-field"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="desert">Desert Adventures</option>
                <option value="cultural">Cultural Heritage</option>
                <option value="nature">Nature & Hiking</option>
                <option value="food">Food & Dining</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select
                className="input-field"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option value="all">All Prices</option>
                <option value="low">Under SAR 250</option>
                <option value="medium">SAR 250 - 400</option>
                <option value="high">SAR 400+</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                className="input-field"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tours Grid */}
        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-500">Loading tours...</p>
          </div>
        ) : filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} {...tour} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No tours found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </>
  )
}
