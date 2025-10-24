'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg'
        : 'bg-white shadow-md'
    }`}>
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Image
                src="/images/logo.png"
                alt="D2D Logo"
                width={65}
                height={65}
                className="rounded-full shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-0 leading-none">
                <h1 className="text-5xl font-russo bg-gradient-to-r from-secondary via-secondary-light to-secondary bg-clip-text text-transparent transform -skew-x-6" style={{WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                  D
                </h1>
                <div className="relative mx-1 flex items-center justify-center w-8 h-12">
                  {/* Black asphalt road styled as 2 */}
                  <span className="text-4xl font-russo bg-gradient-to-b from-gray-800 via-gray-900 to-black bg-clip-text text-transparent relative" style={{WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                    2
                  </span>
                  {/* White road lane markings */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col gap-1">
                    <div className="w-0.5 h-1.5 bg-white"></div>
                    <div className="w-0.5 h-1.5 bg-white"></div>
                    <div className="w-0.5 h-1.5 bg-white"></div>
                  </div>
                </div>
                <h1 className="text-5xl font-russo bg-gradient-to-r from-secondary via-secondary-light to-secondary bg-clip-text text-transparent transform -skew-x-6" style={{WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                  D
                </h1>
              </div>
              <p className="text-[11px] font-montserrat font-bold text-gray-600 tracking-[0.25em] -mt-0.5">
                WELCOME TO SAUDI ARABIA
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link href="/tours" className={`relative px-4 py-2 font-montserrat font-semibold text-sm transition-colors duration-200 group ${
              isActive('/tours') ? 'text-primary' : 'text-gray-700 hover:text-primary'
            }`}>
              <span className="relative z-10">Tours</span>
              <span className={`absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg transition-opacity duration-200 ${
                isActive('/tours') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}></span>
            </Link>
            <Link href="/experiences" className={`relative px-4 py-2 font-montserrat font-semibold text-sm transition-colors duration-200 group ${
              isActive('/experiences') ? 'text-primary' : 'text-gray-700 hover:text-primary'
            }`}>
              <span className="relative z-10">Experiences</span>
              <span className={`absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg transition-opacity duration-200 ${
                isActive('/experiences') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}></span>
            </Link>
            <Link href="/gallery" className={`relative px-4 py-2 font-montserrat font-semibold text-sm transition-colors duration-200 group ${
              isActive('/gallery') ? 'text-primary' : 'text-gray-700 hover:text-primary'
            }`}>
              <span className="relative z-10">Gallery</span>
              <span className={`absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg transition-opacity duration-200 ${
                isActive('/gallery') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}></span>
            </Link>
            <Link href="/about" className={`relative px-4 py-2 font-montserrat font-semibold text-sm transition-colors duration-200 group ${
              isActive('/about') ? 'text-primary' : 'text-gray-700 hover:text-primary'
            }`}>
              <span className="relative z-10">About</span>
              <span className={`absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg transition-opacity duration-200 ${
                isActive('/about') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}></span>
            </Link>
            <Link href="/contact" className="ml-4 relative px-6 py-2.5 font-montserrat font-bold text-sm text-white bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group">
              <span className="relative z-10">Contact</span>
              <span className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-primary focus:outline-none rounded-lg hover:bg-gray-100 transition-all duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 pb-4 space-y-2 animate-fadeIn">
            <Link href="/tours" className={`block px-4 py-3 font-montserrat font-semibold rounded-lg transition-all duration-200 ${
              isActive('/tours')
                ? 'text-primary bg-gradient-to-r from-primary/10 to-secondary/10'
                : 'text-gray-700 hover:text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10'
            }`}>
              Tours
            </Link>
            <Link href="/experiences" className={`block px-4 py-3 font-montserrat font-semibold rounded-lg transition-all duration-200 ${
              isActive('/experiences')
                ? 'text-primary bg-gradient-to-r from-primary/10 to-secondary/10'
                : 'text-gray-700 hover:text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10'
            }`}>
              Experiences
            </Link>
            <Link href="/gallery" className={`block px-4 py-3 font-montserrat font-semibold rounded-lg transition-all duration-200 ${
              isActive('/gallery')
                ? 'text-primary bg-gradient-to-r from-primary/10 to-secondary/10'
                : 'text-gray-700 hover:text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10'
            }`}>
              Gallery
            </Link>
            <Link href="/about" className={`block px-4 py-3 font-montserrat font-semibold rounded-lg transition-all duration-200 ${
              isActive('/about')
                ? 'text-primary bg-gradient-to-r from-primary/10 to-secondary/10'
                : 'text-gray-700 hover:text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10'
            }`}>
              About
            </Link>
            <Link href="/contact" className="block mt-3 px-6 py-3 text-center font-montserrat font-bold text-white bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
              Contact
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
