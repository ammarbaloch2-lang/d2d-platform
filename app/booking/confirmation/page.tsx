'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function BookingConfirmationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 bg-sand-light py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-white rounded-lg shadow-xl p-8">
            {/* Success Icon */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Booking Confirmed!
              </h1>
              <p className="text-gray-600">
                Your tour has been successfully booked
              </p>
            </div>

            {/* Booking Details */}
            <div className="border-t border-b border-gray-200 py-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Booking Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking ID:</span>
                  <span className="font-semibold">#D2D-{Math.floor(Math.random() * 100000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tour:</span>
                  <span className="font-semibold">Desert Safari Adventure</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-semibold">Oct 25, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Number of People:</span>
                  <span className="font-semibold">1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-semibold text-primary text-lg">SAR 350</span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">What's Next?</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  <div>
                    <strong>Confirmation Email Sent</strong>
                    <p className="text-sm text-gray-600">Check your email for booking details and voucher</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <strong>Tour Guide Will Contact You</strong>
                    <p className="text-sm text-gray-600">You'll receive pickup details 24 hours before the tour</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <strong>Free Cancellation</strong>
                    <p className="text-sm text-gray-600">Cancel up to 24 hours before for a full refund</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/" className="flex-1 btn-primary text-center">
                Back to Home
              </Link>
              <Link href="/tours" className="flex-1 btn-secondary text-center">
                Browse More Tours
              </Link>
            </div>

            {/* Help Section */}
            <div className="mt-6 p-4 bg-sand-light rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Need Help?</strong> Contact us at{' '}
                <a href="mailto:support@d2d.com" className="text-primary hover:underline">
                  support@d2d.com
                </a>{' '}
                or call{' '}
                <a href="tel:+966XXXXXXXX" className="text-primary hover:underline">
                  +966 XX XXX XXXX
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
