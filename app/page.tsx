'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Tour } from '@/types/tour'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [featuredTours, setFeaturedTours] = useState<Tour[]>([])

  useEffect(() => {
    fetch('/api/tours')
      .then(res => res.json())
      .then(data => setFeaturedTours(data))
      .catch(err => console.error('Failed to fetch tours:', err))
  }, [])

  // Services data
  const services = [
    {
      title: 'Off-Road & Adventure Safaris',
      description: 'Experience the untamed beauty of Saudi Arabia like never before. Our Off-Road and Adventure Safaris take you deep into the golden dunes, rugged mountains, and breathtaking valleys. Guided by expert professionals, each journey offers the thrill of exploration combined with the safety and comfort of premium travel. Discover hidden trails, ancient landscapes, and the true spirit of adventure.',
      images: ['/images/Prof4.jpg', '/images/Prof4.jpg']
    },
    {
      title: 'Premium Luxury Camping',
      description: 'Enjoy the perfect fusion of wilderness and comfort with our exclusive luxury camping experiences. From private desert setups under star-lit skies to fully equipped glamping sites, we redefine outdoor living. Every detail from fine dining to elegant decor is designed to create unforgettable moments in nature without compromising on luxury.',
      images: ['/images/Prof5.jpg', '/images/Prof5.jpg']
    },
    {
      title: 'Customized & Group Tours',
      description: 'Whether you\'re traveling solo, with family, or as part of a corporate group, our customized tours are tailored to fit your unique interests and schedule. We craft personalized itineraries that combine Saudi Arabia\'s cultural, historical, and natural highlights ensuring every traveler enjoys a journey that\'s truly their own.',
      images: ['/images/Prof6.jpg', '/images/Prof7.jpg']
    },
    {
      title: 'Hotel & Transport Solutions',
      description: 'Seamless comfort starts with where you stay and how you travel. Dare2Discover offers a full range of hotel bookings and transport arrangements, from luxury resorts to private transfers. Our team ensures you experience world-class hospitality, convenience, and reliability throughout your journey.',
      images: ['/images/Prof8.jpg', '/images/Prof8.jpg']
    },
    {
      title: 'Landscape Photography & Drone Videography',
      description: 'Capture Saudi Arabia from a new perspective. Our professional photography and drone videography services allow travelers, brands, and content creators to document the stunning landscapes, heritage sites, and adventures in cinematic detail preserving memories that last a lifetime.',
      images: ['/images/Prof9.jpg', '/images/Prof10.jpg']
    },
    {
      title: 'Event & Destination Management (DMC)',
      description: 'From corporate retreats and private events to large scale destination management, Dare2Discover delivers excellence with creativity and precision. Our DMC services include planning, logistics, and on-ground execution transforming every event into a seamless and unforgettable experience.',
      images: ['/images/Prof11.jpg', '/images/Prof11.jpg']
    },
    {
      title: 'Architectural & Eco Tours',
      description: 'Explore the architectural marvels and ecological wonders of Saudi Arabia. Our tours highlight sustainable tourism while showcasing the Kingdom\'s unique designs, ancient structures, and environmental diversity. Perfect for culture enthusiasts, architects, and nature lovers alike.',
      images: ['/images/Prof12.jpg', '/images/Prof13.jpg']
    },
    {
      title: 'Horse Riding, ATV, Paragliding & Gyrocopter',
      description: 'Experience the thrill of Saudi Arabia from every angle ride across golden dunes on horseback, conquer rugged trails on an ATV, soar high with paragliding, or glide through the skies in a gyrocopter. Every moment promises adventure, freedom, and breathtaking views.',
      images: ['/images/Prof14.jpg', '/images/Prof15.jpg', '/images/Prof16.jpg', '/images/Prof17.jpg']
    },
    {
      title: 'Jet Ski, Scuba Diving & Cruise Experiences',
      description: 'Dive into Saudi Arabia\'s coastal beauty feel the adrenaline of Jet Ski rides, explore vibrant marine life through Scuba Diving, and unwind on luxurious Cruise journeys. A perfect blend of thrill, tranquility, and ocean elegance.',
      images: ['/images/Prof18.jpg', '/images/Prof19.jpg']
    }
  ]

  const whyChoose = [
    { num: '01', title: 'Desert & Mountain Expertise', desc: 'Unmatched knowledge of Saudi Arabia\'s desert landscapes and mountain regions. Our guides are born in the Kingdom with generations of experience navigating these terrains.' },
    { num: '02', title: 'Safety First, Always', desc: 'All expeditions led by certified professionals trained in desert and mountain safety. Comprehensive insurance, GPS tracking, satellite phones, and emergency support on all adventures.' },
    { num: '03', title: 'Authentic Experiences', desc: 'Access to exclusive locations and genuine Bedouin encounters. Real cultural connections with local communities, not staged performances. Experiences that respect and preserve heritage.' },
    { num: '04', title: 'Premium Service', desc: 'From luxury transportation to gourmet desert dining, every detail is crafted for excellence. 24/7 multilingual support ensures seamless experiences.' },
    { num: '05', title: 'Tailored Adventures', desc: 'Every journey is customized to your interests, fitness level, and schedule. From extreme adventures to peaceful retreats, we create your perfect desert experience.' },
    { num: '06', title: 'Sustainable Tourism', desc: 'Committed to preserving Saudi Arabia\'s natural beauty for future generations. We follow Leave No Trace principles and support local communities.' }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      {/* ===== HERO SECTION - Video Background ===== */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden bg-black">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/banner.png"
        >
          <source src="/images/promo1.mp4" type="video/mp4" />
          {/* Fallback Image */}
          <Image
            src="/images/banner.png"
            alt="Dare2Discover"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </video>

        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Text Overlays */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          {/* Opening Text */}
          <div className="mb-8 animate-fadeIn">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-russo font-bold text-white mb-4 leading-tight drop-shadow-lg">
              Explore <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">Saudi Arabia</span>
            </h2>
            <p className="text-lg md:text-2xl text-white/90 font-montserrat font-semibold drop-shadow-md">
              Like Never Before
            </p>
          </div>

          {/* CTA Button */}
          <div className="mt-8">
            <Link
              href="/tours"
              className="inline-block px-8 py-3 md:px-12 md:py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold text-base md:text-lg rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300 drop-shadow-lg"
            >
              Start Your Adventure
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WELCOME TO SAUDI ARABIA SECTION ===== */}
      <section className="bg-white">
        <div className="flex">
          {/* Left Gold Bar */}
          <div className="w-0 md:w-32 bg-yellow-500"></div>

          {/* Main Content */}
          <div className="flex-1 px-6 md:px-12 py-16 md:py-20">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left: Image Grid */}
                <div className="space-y-6">
                  {/* Large Main Image with Gold Border */}
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-yellow-500 opacity-80"></div>
                    <div className="relative bg-white p-3">
                      <Image
                        src="/images/Prof1.jpg"
                        alt="Saudi Arabia Desert"
                        width={500}
                        height={300}
                        className="w-full h-auto object-cover rounded"
                      />
                    </div>
                  </div>

                  {/* Two Small Images */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative group">
                      <div className="absolute -inset-3 bg-yellow-500 opacity-80"></div>
                      <div className="relative bg-white p-3">
                        <Image
                          src="/images/Prof2.jpg"
                          alt="Landscape"
                          width={240}
                          height={160}
                          className="w-full h-40 object-cover rounded"
                        />
                      </div>
                    </div>
                    <div className="relative group">
                      <div className="absolute -inset-3 bg-yellow-500 opacity-80"></div>
                      <div className="relative bg-white p-3">
                        <Image
                          src="/images/Prof3.jpg"
                          alt="Rock Formation"
                          width={240}
                          height={160}
                          className="w-full h-40 object-cover rounded"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Text Content */}
                <div className="space-y-8">
                  {/* Main Heading */}
                  <div>
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                      <span className="text-yellow-500">Welcome to</span>{' '}
                      <span style={{color: '#1a5f3b'}}>Saudi Arabia</span>
                    </h1>
                  </div>

                  {/* Description */}
                  <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                    <p>
                      As Saudi Arabia's premier desert tourism specialist, Dare2Discover brings you unparalleled access to the Kingdom's most breathtaking desert landscapes and mountain regions. With deep local expertise and unwavering commitment to authentic experiences, we transform your Arabian desert dreams into unforgettable realities.
                    </p>
                    <p>
                      From the rolling dunes of the Empty Quarter to the dramatic mountains of AlUla, from ancient Bedouin traditions to modern desert adventures, we are your trusted partner in discovering Saudi Arabia's natural wonders.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Right Gold Bar */}
          <div className="w-0 md:w-32 bg-yellow-500"></div>
        </div>
      </section>

      {/* ===== FEATURED TOURS SECTION ===== */}
      <section className="bg-gray-100 py-20">
        <div className="flex">
          <div className="w-0 md:w-32 bg-yellow-500"></div>

          <div className="flex-1 px-6 md:px-12 max-w-6xl mx-auto w-full">
            <h2 className="text-5xl font-bold mb-2">
              <span className="text-yellow-500">Featured</span>{' '}
              <span className="text-gray-900">Tours</span>
            </h2>
            <p className="text-gray-600 text-lg mb-12">
              Discover our most popular tours and authentic Saudi experiences
            </p>

            {/* Featured Tours Grid - Large Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {featuredTours
                .sort((a, b) => {
                  const seqA = a.sequence || Infinity
                  const seqB = b.sequence || Infinity
                  return seqA - seqB
                })
                .slice(0, 4)
                .map((tour) => (
                <Link
                  key={tour.id}
                  href={`/tours/${tour.id}`}
                  className="group cursor-pointer"
                >
                  <div className="flex flex-col h-full">
                    {/* Image with Gold Border */}
                    <div className="relative mb-4 overflow-hidden rounded bg-gray-300">
                      <div className="absolute -inset-3 bg-yellow-500 opacity-80 z-0"></div>
                      <div className="relative bg-white p-2 h-64">
                        {tour.image && (
                          <Image
                            src={tour.image}
                            alt={tour.title}
                            width={400}
                            height={300}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform rounded"
                          />
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-yellow-600 transition mb-3">
                      {tour.title}
                    </h3>
                    <p className="text-gray-700 text-base flex-grow line-clamp-3">
                      {tour.description}
                    </p>
                    <p className="text-yellow-600 font-bold text-lg mt-auto pt-4">
                      From SAR {tour.price?.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/tours"
                className="inline-block bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-10 py-4 rounded-lg transition text-lg"
              >
                View All Tours
              </Link>
            </div>
          </div>

          <div className="w-0 md:w-32 bg-yellow-500"></div>
        </div>
      </section>

      {/* ===== SERVICES/FEATURES SECTION ===== */}
      <section className="bg-white py-20">
        <div className="flex">
          <div className="w-0 md:w-32 bg-yellow-500"></div>

          <div className="flex-1 px-6 md:px-12 max-w-6xl mx-auto w-full">
            <h2 className="text-5xl font-bold mb-12">
              <span className="text-yellow-500">Profile</span>{' '}
              <span className="text-gray-900">Overview</span>
            </h2>

            {/* Services List with Images - All Services */}
            <div className="space-y-16">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } gap-10 items-center`}
                >
                  <div className="lg:w-3/5">
                    <h3 className="text-3xl font-bold text-yellow-500 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <div className="lg:w-2/5 relative group flex-shrink-0">
                    <div className="absolute -inset-4 bg-yellow-500 opacity-80"></div>
                    <div className="relative bg-white p-3">
                      <Image
                        src={service.images[0]}
                        alt={service.title}
                        width={300}
                        height={220}
                        className="w-full h-auto object-cover rounded"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-0 md:w-32 bg-yellow-500"></div>
        </div>
      </section>

      {/* ===== WHY DARE2DISCOVER STANDS APART ===== */}
      <section className="bg-yellow-500 py-20">
        <div className="flex">
          <div className="w-0 md:w-32 bg-yellow-600"></div>

          <div className="flex-1 px-6 md:px-12 max-w-6xl mx-auto w-full">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Why Dare2Discover Stands Apart
            </h2>
            <p className="text-white text-xl mb-12">
              Experience the difference of traveling with Saudi Arabia's pioneering experts in raw desert and mountain exploration.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {whyChoose.map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex gap-4">
                    <div className="text-3xl font-bold text-yellow-500 w-12">{item.num}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-700">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-0 md:w-32 bg-yellow-600"></div>
        </div>
      </section>

      {/* ===== INTERNATIONAL RECOGNITION ===== */}
      <section className="bg-white py-20">
        <div className="flex">
          <div className="w-0 md:w-32 bg-yellow-500"></div>

          <div className="flex-1 px-6 md:px-12 max-w-6xl mx-auto w-full">
            <h2 className="text-5xl font-bold mb-6 text-yellow-500">International Recognition</h2>

            <p className="text-lg text-gray-700 mb-6">
              We take immense pride in sharing that <span className="font-bold">Dare2Discover STG has achieved a remarkable milestone in global recognition</span>. Our exclusive footage and landscape shots were featured on the world renowned <span className="font-bold">History Channel</span> in their popular documentary series <span className="italic">"Ancient Aliens."</span>
            </p>

            <p className="text-lg text-gray-700 mb-12">
              The featured visuals appeared in <span className="font-bold">Season 13, Episode 5 "The Desert Codes,"</span> which has been aired a couple of times on air internationally. This international acknowledgment reflects the exceptional quality of our work, our creative vision, and our commitment to showcasing the captivating beauty and mystery of Saudi Arabia to audiences worldwide.
            </p>

            {/* Certificates Collage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition">
                <div className="absolute -inset-4 bg-yellow-500 opacity-0 group-hover:opacity-20 transition"></div>
                <Image
                  src="/images/Prof26.png"
                  alt="ISO 9001:2015 Certificate"
                  width={300}
                  height={380}
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="space-y-8">
                <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition">
                  <div className="absolute -inset-4 bg-yellow-500 opacity-0 group-hover:opacity-20 transition"></div>
                  <Image
                    src="/images/Prof27.png"
                    alt="Commercial Registration Certificate"
                    width={300}
                    height={380}
                    className="w-full h-auto object-cover"
                  />
                </div>

                <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition">
                  <div className="absolute -inset-4 bg-yellow-500 opacity-0 group-hover:opacity-20 transition"></div>
                  <Image
                    src="/images/Prof28.png"
                    alt="Arabic Commercial Registration Certificate"
                    width={300}
                    height={380}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-0 md:w-32 bg-yellow-500"></div>
        </div>
      </section>

      {/* ===== MESSAGE FROM CEO ===== */}
      <section className="bg-gray-100 py-20">
        <div className="flex">
          <div className="w-0 md:w-32 bg-yellow-500"></div>

          <div className="flex-1 px-6 md:px-12 max-w-6xl mx-auto w-full">
            <h2 className="text-5xl font-bold mb-12 text-yellow-500">Message from the CEO</h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-lg text-gray-700">
                <p>
                  At <span className="font-bold">Dare2Discover Saudi Tourism Group</span>, our journey began in <span className="font-bold">2005</span> with a simple yet powerful vision to showcase the true beauty, culture, and adventure of Saudi Arabia to the world.
                </p>

                <p>
                  From golden deserts to historic landmarks and modern cities, we've proudly guided thousands of travelers on experiences that go beyond sightseeing—journeys of discovery, connection, and inspiration.
                </p>

                <p>
                  We don't just create tours, we craft memories that celebrate the soul of Saudi Arabia. Join us, and Dare to Discover the stories, emotions, and legacies that make every journey unforgettable.
                </p>

                <p className="font-bold text-gray-900">
                  Kashan Syed<br/>
                  CEO, Dare2Discover | Saudi Tourism Group
                </p>
              </div>

              <div className="text-center">
                <Image
                  src="/images/Prof25.png"
                  alt="Kashan Syed, CEO"
                  width={250}
                  height={300}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          <div className="w-0 md:w-32 bg-yellow-500"></div>
        </div>
      </section>

      {/* ===== FEATURED TOURS SECTION ===== */}
      <section className="bg-white py-20">
        <div className="flex">
          <div className="w-0 md:w-32 bg-yellow-500"></div>

          <div className="flex-1 px-6 md:px-12 max-w-6xl mx-auto w-full">
            <h2 className="text-5xl font-bold mb-2">
              <span className="text-yellow-500">Featured</span>{' '}
              <span className="text-gray-900">Tours</span>
            </h2>
            <p className="text-gray-600 text-lg mb-12">
              Discover our most popular tours and authentic Saudi experiences
            </p>

            {/* Featured Tours Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredTours
                .sort((a, b) => {
                  const seqA = a.sequence || Infinity
                  const seqB = b.sequence || Infinity
                  return seqA - seqB
                })
                .slice(0, 6)
                .map((tour) => (
                <Link key={tour.id} href={`/tours/${tour.id}`}>
                  <div className="group cursor-pointer h-full">
                    <div className="relative overflow-hidden rounded-lg mb-4 h-64 bg-gray-200">
                      {tour.image && (
                        <Image
                          src={tour.image}
                          alt={tour.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      )}
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition"></div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-yellow-600 transition mb-2">
                      {tour.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-2 mb-2">{tour.description}</p>
                    <p className="text-yellow-600 font-bold">
                      From SAR {tour.price?.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/tours"
                className="inline-block bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-10 py-4 rounded-lg transition text-lg"
              >
                View All Tours
              </Link>
            </div>
          </div>

          <div className="w-0 md:w-32 bg-yellow-500"></div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
