'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
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
  const [tour, setTour] = useState<Tour | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [emailFormData, setEmailFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [emailSubmitting, setEmailSubmitting] = useState(false)
  const [emailSubmitStatus, setEmailSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [emailErrorMessage, setEmailErrorMessage] = useState('')

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

  // Combine main image with additional images, removing duplicates
  const galleryImages = (() => {
    const allImages: string[] = []

    // Always include the main image first
    if (tour.image) {
      allImages.push(tour.image)
    }

    // Add additional images if they exist
    if (tour.images && tour.images.length > 0) {
      tour.images.forEach(img => {
        // Only add if not already in the array (avoid duplicates)
        if (!allImages.includes(img)) {
          allImages.push(img)
        }
      })
    }

    return allImages.length > 0 ? allImages : [tour.image || '/images/placeholder.jpg']
  })()

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const previousImage = () => {
    setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmailFormData({
      ...emailFormData,
      [e.target.name]: e.target.value,
    })
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailSubmitting(true)
    setEmailSubmitStatus('idle')
    setEmailErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: emailFormData.name,
          email: emailFormData.email,
          phone: '',
          subject: `Tour Inquiry: ${tour?.title}`,
          message: emailFormData.message,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setEmailSubmitStatus('success')
        setEmailFormData({ name: '', email: '', message: '' })

        // Reset success message after 5 seconds
        setTimeout(() => setEmailSubmitStatus('idle'), 5000)
      } else {
        setEmailSubmitStatus('error')
        setEmailErrorMessage(data.error || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Email form submission error:', error)
      setEmailSubmitStatus('error')
      setEmailErrorMessage('An unexpected error occurred. Please try again later.')
    } finally {
      setEmailSubmitting(false)
    }
  }

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
            <div className="relative h-96 group cursor-pointer" onClick={() => openLightbox(currentImageIndex)}>
              <Image
                src={galleryImages[currentImageIndex]}
                alt={tour.title}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />

              {/* Click to Expand Indicator */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-4">
                  <svg className="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>

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
                        onClick={(e) => {
                          e.stopPropagation()
                          setCurrentImageIndex(index)
                        }}
                        onDoubleClick={(e) => {
                          e.stopPropagation()
                          openLightbox(index)
                        }}
                        className={`relative w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                          index === currentImageIndex ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                        title="Double-click to view full size"
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

          {/* WhatsApp Booking Button */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-xl p-6 sticky top-24">
              <div className="text-center mb-6">
                <span className="text-gray-500">From</span>
                <div className="text-4xl font-bold text-primary">SAR {tour.price}</div>
                <span className="text-gray-500">per person</span>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-gray-600 text-center">
                  Ready to book this amazing experience? Chat with our D2D Team on WhatsApp!
                </p>

                <a
                  href={`https://wa.me/966541331211?text=${encodeURIComponent(
                    `Hi! I'm interested in booking the "${tour.title}" tour. Page: ${typeof window !== 'undefined' ? window.location.href : `/tours/${params.id}`}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </a>

                <p className="text-xs text-center text-gray-500">
                  Quick response • Available during working hours (Sun-Thu: 9 AM - 6 PM)
                </p>

                <div className="border-t pt-4 mt-4">
                  <p className="text-sm text-gray-600 text-center mb-3">
                    <strong>What to expect:</strong>
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Personalized tour recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Flexible date & group size options</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Special packages & discounts</span>
                    </li>
                  </ul>
                </div>

                {/* Email Inquiry Alternative */}
                <div className="border-t pt-4 mt-4">
                  <p className="text-sm text-gray-600 text-center mb-4">
                    <strong>Or Send Us an Email</strong>
                  </p>

                  {emailSubmitStatus === 'success' && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <p className="text-green-800 font-semibold text-sm">Email sent successfully!</p>
                      </div>
                    </div>
                  )}

                  {emailSubmitStatus === 'error' && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <div>
                          <p className="text-red-800 font-semibold text-sm">Failed to send</p>
                          <p className="text-red-700 text-xs mt-1">{emailErrorMessage}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleEmailSubmit} className="space-y-3">
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={emailFormData.name}
                        onChange={handleEmailChange}
                        required
                        placeholder="Your name"
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        name="email"
                        value={emailFormData.email}
                        onChange={handleEmailChange}
                        required
                        placeholder="your@email.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <textarea
                        name="message"
                        value={emailFormData.message}
                        onChange={handleEmailChange}
                        required
                        placeholder="Tell us about your tour interests..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={emailSubmitting}
                      className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {emailSubmitting ? 'Sending...' : 'Send Email'}
                    </button>
                  </form>

                  <p className="text-xs text-center text-gray-500 mt-3">
                    We'll contact you within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-lg font-semibold bg-black/50 px-4 py-2 rounded-full">
            {lightboxIndex + 1} / {galleryImages.length}
          </div>

          {/* Previous Button */}
          {galleryImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                previousImage()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-4 transition-all"
              aria-label="Previous image"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Main Image */}
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[lightboxIndex]}
              alt={`${tour.title} - Image ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Next Button */}
          {galleryImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-4 transition-all"
              aria-label="Next image"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Thumbnail Strip */}
          {galleryImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 p-3 rounded-lg max-w-full overflow-x-auto">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    setLightboxIndex(index)
                  }}
                  className={`relative w-20 h-20 flex-shrink-0 rounded overflow-hidden border-2 transition-all ${
                    index === lightboxIndex ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <Footer />
    </div>
  )
}
