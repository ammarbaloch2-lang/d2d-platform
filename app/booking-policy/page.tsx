'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function BookingPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sand-light to-sand-dark py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Booking Policy
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Please read our booking terms and conditions carefully before making a reservation
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto prose prose-lg">

          {/* Booking Confirmation */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Booking Confirmation</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <ul className="space-y-3">
                <li>All bookings are subject to availability and confirmation from Dare2Discover (D2D).</li>
                <li>You will receive a booking confirmation via email and SMS within 24 hours of making your reservation.</li>
                <li>Your booking is not confirmed until you receive the official confirmation from us.</li>
                <li>Please ensure all passenger information provided is accurate and matches official identification documents.</li>
              </ul>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Payment Terms</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <h3 className="font-semibold text-gray-900 mb-2">Payment Methods</h3>
              <ul className="space-y-2 mb-4">
                <li>We accept Visa, Mastercard, American Express, Mada, Apple Pay, and bank transfers.</li>
                <li>All prices are listed in Saudi Riyal (SAR) and include applicable taxes unless stated otherwise.</li>
                <li>Installment options are available through Tabby and Tamara for bookings above SAR 1,000.</li>
              </ul>

              <h3 className="font-semibold text-gray-900 mb-2 mt-6">Payment Schedule</h3>
              <ul className="space-y-2">
                <li><strong>Instant Booking:</strong> Full payment required at time of booking.</li>
                <li><strong>Group Bookings (10+ people):</strong> 30% deposit required, balance due 7 days before tour date.</li>
                <li><strong>Custom Tours:</strong> 50% deposit required, balance due 14 days before departure.</li>
              </ul>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cancellation Policy</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                <p className="font-semibold text-green-800">Free Cancellation</p>
                <p className="text-green-700">Cancel up to 24 hours before tour start time for a full refund</p>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2">Cancellation Fees</h3>
              <ul className="space-y-2">
                <li><strong>24+ hours before:</strong> 100% refund (no cancellation fee)</li>
                <li><strong>12-24 hours before:</strong> 50% refund</li>
                <li><strong>Less than 12 hours:</strong> 25% refund</li>
                <li><strong>No-show:</strong> No refund</li>
              </ul>

              <h3 className="font-semibold text-gray-900 mb-2 mt-6">Special Circumstances</h3>
              <ul className="space-y-2">
                <li>Medical emergencies: Full refund with valid medical documentation</li>
                <li>Extreme weather conditions: Full refund or reschedule option</li>
                <li>Force majeure events: Full refund or credit note valid for 12 months</li>
              </ul>
            </div>
          </div>

          {/* Rescheduling */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Rescheduling Policy</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <ul className="space-y-3">
                <li>Tours can be rescheduled up to 48 hours before the original tour date, subject to availability.</li>
                <li>One free reschedule is permitted per booking. Additional reschedules may incur a SAR 50 fee.</li>
                <li>Price differences may apply if rescheduling to a different tour or higher-priced date.</li>
                <li>Rescheduling requests must be made through your account or by contacting customer support.</li>
              </ul>
            </div>
          </div>

          {/* Age Requirements */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Age Requirements & Restrictions</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <ul className="space-y-3">
                <li><strong>Children (0-4 years):</strong> Free of charge, must be accompanied by an adult</li>
                <li><strong>Children (5-12 years):</strong> 50% discount, must be supervised by an adult</li>
                <li><strong>Youth (13-17 years):</strong> Full price, may require guardian consent for adventure tours</li>
                <li><strong>Adventure Tours:</strong> Minimum age 12 years, some tours require age 18+</li>
                <li>All age restrictions are listed on individual tour pages</li>
              </ul>
            </div>
          </div>

          {/* Health & Safety */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Health & Safety Requirements</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <ul className="space-y-3">
                <li>Guests must disclose any medical conditions that may affect participation in the tour.</li>
                <li>Some tours have physical fitness requirements - please check tour descriptions carefully.</li>
                <li>We reserve the right to refuse participation if a guest's health condition poses a safety risk.</li>
                <li>Travel insurance covering tour activities is strongly recommended.</li>
                <li>All guests must follow safety instructions provided by tour guides.</li>
              </ul>
            </div>
          </div>

          {/* Liability */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Liability & Insurance</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <ul className="space-y-3">
                <li>D2D carries comprehensive liability insurance for all tours and activities.</li>
                <li>Personal belongings are the responsibility of the guest. We recommend travel insurance covering loss or damage.</li>
                <li>D2D is not liable for delays, cancellations, or changes due to circumstances beyond our control.</li>
                <li>Guests participate in activities at their own risk and must sign a liability waiver before certain adventure tours.</li>
              </ul>
            </div>
          </div>

          {/* Photography */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Photography & Media</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <ul className="space-y-3">
                <li>Photos and videos may be taken during tours for marketing purposes.</li>
                <li>By booking, you consent to the use of your image in D2D promotional materials unless you opt out in writing.</li>
                <li>Please respect local customs and ask permission before photographing people or private property.</li>
                <li>Drone usage is prohibited on all tours unless explicitly permitted.</li>
              </ul>
            </div>
          </div>

          {/* Special Requests */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Special Requests</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <ul className="space-y-3">
                <li>Dietary requirements, accessibility needs, and other special requests should be noted at time of booking.</li>
                <li>We will make reasonable efforts to accommodate requests but cannot guarantee all requests can be met.</li>
                <li>Special requests must be submitted at least 48 hours before the tour date.</li>
                <li>Additional charges may apply for certain special accommodations.</li>
              </ul>
            </div>
          </div>

          {/* Changes by D2D */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes by D2D</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <ul className="space-y-3">
                <li>D2D reserves the right to modify tour itineraries due to weather, safety concerns, or unforeseen circumstances.</li>
                <li>Guests will be notified of significant changes as soon as possible.</li>
                <li>If a tour is cancelled by D2D, guests will receive a full refund or alternative tour option.</li>
                <li>We reserve the right to substitute hotels, vehicles, or activities of equal or higher standard.</li>
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-primary bg-opacity-10 rounded-lg p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Questions About Our Booking Policy?</h3>
            <p className="text-gray-700 mb-6">
              Our customer support team is available 24/7 to assist you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary">
                Contact Us
              </a>
              <a href="mailto:support@dare2discover.sa" className="btn-secondary">
                Email Support
              </a>
            </div>
          </div>

          {/* Last Updated */}
          <p className="text-sm text-gray-500 text-center mt-8">
            Last updated: October 25, 2025
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
