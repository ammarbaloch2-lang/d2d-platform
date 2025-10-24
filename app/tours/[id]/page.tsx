'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Tour } from '@/types/tour'

// Mock tour data as fallback
const tourData: any = {
  '1': {
    id: '1',
    title: 'Desert Safari Adventure',
    description: 'Experience the thrill of dune bashing and enjoy a traditional Bedouin dinner under the stars in the Arabian desert. This unforgettable adventure combines adrenaline-pumping activities with authentic cultural experiences.',
    longDescription: 'Join us for an authentic Arabian desert adventure that combines thrilling activities with traditional hospitality. Your journey begins with an exciting dune bashing session in a 4x4 vehicle, followed by opportunities for sandboarding and camel riding. As the sun sets, enjoy a traditional Bedouin camp experience with Arabic coffee, dates, and a delicious BBQ dinner under the stars. Learn about Bedouin culture, watch traditional dance performances, and create memories that will last a lifetime.',
    price: 350,
    duration: '6 hours',
    location: 'Riyadh Desert',
    rating: 4.8,
    reviewCount: 245,
    category: 'Desert Adventure',
    includes: [
      'Hotel pickup and drop-off',
      'Dune bashing in 4x4 vehicle',
      'Camel riding experience',
      'Sandboarding equipment',
      'Traditional BBQ dinner',
      'Arabic coffee and dates',
      'Live entertainment',
      'Professional guide',
    ],
    itinerary: [
      { time: '3:00 PM', activity: 'Hotel pickup' },
      { time: '4:00 PM', activity: 'Arrive at desert, dune bashing begins' },
      { time: '5:30 PM', activity: 'Sandboarding and camel rides' },
      { time: '6:30 PM', activity: 'Sunset viewing' },
      { time: '7:00 PM', activity: 'Bedouin camp experience and dinner' },
      { time: '9:00 PM', activity: 'Return to hotel' },
    ],
    guide: {
      name: 'Ahmed Al-Rashid',
      bio: 'Expert desert guide with 10+ years of experience',
      languages: ['Arabic', 'English'],
      rating: 4.9,
    },
    availableDates: [
      '2025-10-20',
      '2025-10-22',
      '2025-10-25',
      '2025-10-27',
      '2025-10-30',
    ],
    maxCapacity: 15,
  },
  '2': {
    id: '2',
    title: 'Historical Diriyah Tour',
    description: 'Explore the UNESCO World Heritage site of At-Turaif and discover the rich history of the first Saudi state.',
    longDescription: 'Step back in time and explore the birthplace of the first Saudi state. This comprehensive tour takes you through the UNESCO World Heritage site of At-Turaif, showcasing the stunning Najdi architecture and fascinating history of the region.',
    price: 200,
    duration: '4 hours',
    location: 'Diriyah',
    rating: 4.9,
    reviewCount: 189,
    category: 'Cultural Heritage',
    includes: [
      'Professional guide',
      'Entry tickets',
      'Transportation',
      'Bottled water',
      'Traditional refreshments',
    ],
    itinerary: [
      { time: '9:00 AM', activity: 'Meet at Diriyah Gate' },
      { time: '9:30 AM', activity: 'At-Turaif District tour' },
      { time: '11:00 AM', activity: 'Salwa Palace visit' },
      { time: '12:00 PM', activity: 'Traditional Saudi coffee experience' },
      { time: '1:00 PM', activity: 'Tour conclusion' },
    ],
    guide: {
      name: 'Fatima Al-Saud',
      bio: 'Historian specializing in Saudi heritage',
      languages: ['Arabic', 'English', 'French'],
      rating: 5.0,
    },
    availableDates: [
      '2025-10-21',
      '2025-10-23',
      '2025-10-26',
      '2025-10-28',
    ],
    maxCapacity: 20,
  },
}

export default function TourDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState('')
  const [numberOfPeople, setNumberOfPeople] = useState(1)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [tour, setTour] = useState<Tour | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch tour from API
    fetch(`/api/tours/${params.id}`)
      .then(res => {
        if (!res.ok) throw new Error('Tour not found')
        return res.json()
      })
      .then(data => {
        setTour(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch tour:', err)
        // Use mock data as fallback
        setTour(tourData[params.id as string] || tourData['1'])
        setLoading(false)
      })
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading tour...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tour not found</h2>
            <Link href="/tours" className="btn-primary">
              Back to Tours
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const galleryImages = tour.images && tour.images.length > 0 ? tour.images : [tour.image]

  const handleBookNow = () => {
    if (!selectedDate) {
      alert('Please select a date')
      return
    }
    setShowBookingModal(true)
  }

  const handleConfirmBooking = () => {
    // In real app, this would make API call
    router.push('/booking/confirmation')
  }

  const totalPrice = tour.price * numberOfPeople

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Tour Header */}
      <div className="bg-gradient-to-br from-sand-light to-sand-dark py-12">
        <div className="container mx-auto px-4">
          <Link href="/tours" className="text-secondary hover:text-secondary-light mb-4 inline-block">
            ← Back to Tours
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{tour.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-700">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1 text-primary fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold">{tour.rating}</span>
              <span className="ml-1">({tour.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {tour.location}
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              {tour.duration}
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      {galleryImages.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-96 group">
              <Image
                src={galleryImages[currentImageIndex]}
                alt={tour.title}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />

              {/* Image Navigation */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Thumbnail Gallery */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 p-2 rounded-lg">
                    {galleryImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                          index === currentImageIndex ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${tour.title} ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">About This Experience</h2>
              <p className="text-gray-700 mb-4">{tour.description}</p>
              <p className="text-gray-600">{tour.longDescription}</p>
            </section>

            {/* What's Included */}
            {tour.includes && tour.includes.length > 0 && (
              <section className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">What's Included</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tour.includes.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Itinerary */}
            {tour.itinerary && tour.itinerary.length > 0 && (
              <section className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Itinerary</h2>
                <div className="space-y-4">
                  {tour.itinerary.map((item: any, index: number) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0 w-20 font-semibold text-primary">
                        {item.time}
                      </div>
                      <div className="flex-1 text-gray-700">{item.activity}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Guide Info */}
            {tour.guide && (
              <section className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Your Guide</h2>
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    {tour.guide.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{tour.guide.name}</h3>
                    <p className="text-gray-600 mb-2">{tour.guide.bio}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>Languages: {tour.guide.languages.join(', ')}</span>
                      <span>•</span>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-primary fill-current mr-1" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {tour.guide.rating}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-xl p-6 sticky top-24">
              <div className="text-center mb-6">
                <span className="text-gray-500">From</span>
                <div className="text-4xl font-bold text-primary">SAR {tour.price}</div>
                <span className="text-gray-500">per person</span>
              </div>

              <div className="space-y-4">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <select
                    className="input-field"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  >
                    <option value="">Choose a date</option>
                    {tour.availableDates && tour.availableDates.map((date: string) => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Number of People */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of People
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={tour.maxCapacity || 20}
                    className="input-field"
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(parseInt(e.target.value) || 1)}
                  />
                  {tour.maxCapacity && (
                    <p className="text-xs text-gray-500 mt-1">
                      Max {tour.maxCapacity} people per booking
                    </p>
                  )}
                </div>

                {/* Total Price */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">SAR {tour.price} x {numberOfPeople}</span>
                    <span className="font-semibold">SAR {tour.price * numberOfPeople}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">SAR {totalPrice}</span>
                  </div>
                </div>

                <button
                  onClick={handleBookNow}
                  className="btn-primary w-full"
                >
                  Book Now
                </button>

                <p className="text-xs text-center text-gray-500">
                  Instant confirmation • Free cancellation up to 24h
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-2xl font-bold mb-4">Confirm Your Booking</h3>
            <div className="space-y-3 mb-6">
              <div>
                <span className="font-semibold">Tour:</span> {tour.title}
              </div>
              <div>
                <span className="font-semibold">Date:</span> {new Date(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div>
                <span className="font-semibold">People:</span> {numberOfPeople}
              </div>
              <div className="text-xl font-bold text-primary">
                Total: SAR {totalPrice}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                className="flex-1 btn-primary"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
