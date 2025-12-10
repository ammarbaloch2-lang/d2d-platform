'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TourCard from '@/components/TourCard'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Tour } from '@/types/tour'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [featuredTours, setFeaturedTours] = useState<Tour[]>([])

  useEffect(() => {
    // Fetch tours from API
    fetch('/api/tours')
      .then(res => res.json())
      .then(data => setFeaturedTours(data.slice(0, 6))) // Show first 6 tours
      .catch(err => console.error('Failed to fetch tours:', err))
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section with Banner */}
      <section className="relative min-h-[500px] flex flex-col justify-end overflow-hidden">
        {/* Banner Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/banner.png"
            alt="D2D Banner"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>

        {/* Tagline and Search at bottom */}
        <div className="container mx-auto px-4 relative z-10 pb-16">
          <div className="max-w-3xl mx-auto text-center text-white">
            <p className="text-lg md:text-xl text-gray-100 drop-shadow-md mb-6">
              Authentic Desert Adventures & Cultural Experiences
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-xl p-2 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Search tours, experiences, locations..."
                className="flex-1 px-4 py-3 rounded-md focus:outline-none text-gray-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Link
                href={`/tours${searchQuery ? `?q=${searchQuery}` : ''}`}
                className="btn-primary whitespace-nowrap"
              >
                Search Tours
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Experiences
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular tours and authentic Saudi experiences, curated for adventurers like you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTours.map((tour) => (
            <TourCard key={tour.id} {...tour} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/tours" className="btn-secondary">
            View All Tours
          </Link>
        </div>
      </section>

      {/* Why Choose D2D */}
      <section className="bg-sand-light py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose Dare2Discover?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Verified Guides</h3>
              <p className="text-gray-600">
                All our tour operators are carefully vetted and verified for your safety and satisfaction
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Authentic Experiences</h3>
              <p className="text-gray-600">
                Discover genuine Saudi culture with exclusive access to unique locations and traditions
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Booking</h3>
              <p className="text-gray-600">
                Book your adventure instantly with secure payments and immediate confirmation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Explore by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/tours?category=desert" className="card group hover:scale-105 transition-transform">
            <div className="p-6 text-center">
              <div className="text-4xl mb-3">🏜️</div>
              <h3 className="font-bold text-gray-900 group-hover:text-primary">Desert Adventures</h3>
            </div>
          </Link>

          <Link href="/tours?category=cultural" className="card group hover:scale-105 transition-transform">
            <div className="p-6 text-center">
              <div className="text-4xl mb-3">🕌</div>
              <h3 className="font-bold text-gray-900 group-hover:text-primary">Cultural Heritage</h3>
            </div>
          </Link>

          <Link href="/tours?category=nature" className="card group hover:scale-105 transition-transform">
            <div className="p-6 text-center">
              <div className="text-4xl mb-3">⛰️</div>
              <h3 className="font-bold text-gray-900 group-hover:text-primary">Nature & Hiking</h3>
            </div>
          </Link>

          <Link href="/tours?category=food" className="card group hover:scale-105 transition-transform">
            <div className="p-6 text-center">
              <div className="text-4xl mb-3">🍽️</div>
              <h3 className="font-bold text-gray-900 group-hover:text-primary">Food & Dining</h3>
            </div>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
