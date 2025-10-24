'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sand-light to-sand-dark py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Please read these terms carefully before using our services
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">

          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8 text-gray-700">
            <p className="mb-4">
              Welcome to Dare2Discover ("D2D", "we", "us", or "our"). These Terms of Service ("Terms") govern your access to and use of our website, mobile applications, and services (collectively, the "Services").
            </p>
            <p className="mb-4">
              By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not use our Services.
            </p>
            <p className="text-sm text-gray-600">
              <strong>Last Updated:</strong> October 25, 2025
            </p>
          </div>

          {/* Acceptance of Terms */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <p className="mb-4">
                By using our Services, you represent that:
              </p>
              <ul className="space-y-2">
                <li>• You are at least 18 years old or have parental/guardian consent</li>
                <li>• You have the legal capacity to enter into binding contracts</li>
                <li>• All information you provide is accurate, current, and complete</li>
                <li>• You will comply with all applicable laws and regulations</li>
                <li>• You have read and understood our Privacy Policy</li>
              </ul>
            </div>
          </div>

          {/* User Accounts */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. User Accounts</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <h3 className="font-semibold text-gray-900 mb-3">Account Creation</h3>
              <ul className="space-y-2 mb-4">
                <li>• You must create an account to access certain features</li>
                <li>• You are responsible for maintaining account confidentiality</li>
                <li>• You must notify us immediately of any unauthorized access</li>
                <li>• One person or entity may only maintain one account</li>
                <li>• You may not transfer your account to another person</li>
              </ul>

              <h3 className="font-semibold text-gray-900 mb-3 mt-6">Account Termination</h3>
              <p className="mb-2">We reserve the right to suspend or terminate your account if:</p>
              <ul className="space-y-2">
                <li>• You violate these Terms of Service</li>
                <li>• You provide false or misleading information</li>
                <li>• You engage in fraudulent or illegal activities</li>
                <li>• Your account has been inactive for more than 24 months</li>
                <li>• We are required to do so by law</li>
              </ul>
            </div>
          </div>

          {/* Booking and Reservations */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Booking and Reservations</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <ul className="space-y-3">
                <li>• All bookings are subject to availability and confirmation</li>
                <li>• Prices displayed are in Saudi Riyal (SAR) and include applicable taxes</li>
                <li>• We reserve the right to correct pricing errors</li>
                <li>• You are responsible for ensuring all passenger information is accurate</li>
                <li>• Tour descriptions and itineraries may change due to circumstances beyond our control</li>
                <li>• Confirmation of booking does not guarantee specific guide, vehicle, or accommodation unless explicitly stated</li>
                <li>• Group bookings may have separate terms and conditions</li>
              </ul>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Payment Terms</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <h3 className="font-semibold text-gray-900 mb-3">Payment Processing</h3>
              <ul className="space-y-2 mb-4">
                <li>• Payment must be made in full at time of booking unless otherwise agreed</li>
                <li>• All payments are processed through secure third-party payment gateways</li>
                <li>• We do not store your complete credit card information</li>
                <li>• Currency conversion fees may apply for international cards</li>
              </ul>

              <h3 className="font-semibold text-gray-900 mb-3 mt-6">Pricing and Fees</h3>
              <ul className="space-y-2">
                <li>• Prices may change without notice, but confirmed bookings honor the original price</li>
                <li>• Additional fees may apply for special requests or modifications</li>
                <li>• We reserve the right to charge for no-shows or late cancellations as per our policy</li>
                <li>• All refunds will be processed to the original payment method</li>
              </ul>
            </div>
          </div>

          {/* User Conduct */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. User Conduct</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <p className="mb-4">You agree NOT to:</p>
              <ul className="space-y-2">
                <li>• Provide false, inaccurate, or misleading information</li>
                <li>• Impersonate any person or entity</li>
                <li>• Engage in fraudulent activities or payment disputes without cause</li>
                <li>• Violate any applicable laws, regulations, or third-party rights</li>
                <li>• Harass, abuse, or harm other users, guides, or staff</li>
                <li>• Use our Services for any commercial purpose without authorization</li>
                <li>• Attempt to gain unauthorized access to our systems</li>
                <li>• Interfere with the proper functioning of our Services</li>
                <li>• Use automated systems (bots, scrapers) to access our Services</li>
                <li>• Post or transmit viruses, malware, or harmful code</li>
              </ul>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property Rights</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <h3 className="font-semibold text-gray-900 mb-3">Our Content</h3>
              <p className="mb-4">
                All content on our Services, including text, graphics, logos, images, videos, software, and design, is owned by D2D or our licensors and is protected by copyright, trademark, and other intellectual property laws.
              </p>

              <h3 className="font-semibold text-gray-900 mb-3">Limited License</h3>
              <p className="mb-4">
                We grant you a limited, non-exclusive, non-transferable license to access and use our Services for personal, non-commercial purposes. You may not:
              </p>
              <ul className="space-y-2">
                <li>• Copy, modify, distribute, or create derivative works</li>
                <li>• Reverse engineer or decompile any software</li>
                <li>• Remove copyright or proprietary notices</li>
                <li>• Use our trademarks without written permission</li>
              </ul>
            </div>
          </div>

          {/* Liability and Disclaimers */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
                <p className="font-semibold text-yellow-800">IMPORTANT NOTICE</p>
              </div>

              <p className="mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW:
              </p>
              <ul className="space-y-3">
                <li>
                  • OUR SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND
                </li>
                <li>
                  • WE DO NOT GUARANTEE UNINTERRUPTED OR ERROR-FREE OPERATION
                </li>
                <li>
                  • WE ARE NOT LIABLE FOR ACTS OF THIRD-PARTY SERVICE PROVIDERS (hotels, transport, activities)
                </li>
                <li>
                  • WE ARE NOT RESPONSIBLE FOR DELAYS, CANCELLATIONS, OR CHANGES DUE TO FORCE MAJEURE (weather, natural disasters, political unrest, pandemics, etc.)
                </li>
                <li>
                  • OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID FOR THE SPECIFIC BOOKING
                </li>
                <li>
                  • WE ARE NOT LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES
                </li>
              </ul>

              <p className="mt-4 text-sm">
                Some jurisdictions do not allow certain liability exclusions, so some of the above may not apply to you.
              </p>
            </div>
          </div>

          {/* Indemnification */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Indemnification</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <p>
                You agree to indemnify, defend, and hold harmless D2D, our affiliates, officers, directors, employees, and agents from any claims, liabilities, damages, losses, costs, or expenses (including legal fees) arising from:
              </p>
              <ul className="space-y-2 mt-4">
                <li>• Your violation of these Terms</li>
                <li>• Your violation of any rights of third parties</li>
                <li>• Your use or misuse of our Services</li>
                <li>• Your conduct during tours and activities</li>
                <li>• Any false or misleading information you provide</li>
              </ul>
            </div>
          </div>

          {/* Dispute Resolution */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Dispute Resolution</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <h3 className="font-semibold text-gray-900 mb-3">Informal Resolution</h3>
              <p className="mb-4">
                If you have a dispute, please contact our customer support team first. We will attempt to resolve the issue informally within 30 days.
              </p>

              <h3 className="font-semibold text-gray-900 mb-3">Governing Law</h3>
              <p className="mb-4">
                These Terms are governed by the laws of the Kingdom of Saudi Arabia without regard to conflict of law provisions.
              </p>

              <h3 className="font-semibold text-gray-900 mb-3">Arbitration</h3>
              <p>
                Any disputes that cannot be resolved informally shall be resolved through binding arbitration in Riyadh, Saudi Arabia, in accordance with the Saudi Center for Commercial Arbitration rules.
              </p>
            </div>
          </div>

          {/* Force Majeure */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Force Majeure</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <p>
                D2D shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including but not limited to:
              </p>
              <ul className="space-y-2 mt-4">
                <li>• Natural disasters (earthquakes, floods, storms)</li>
                <li>• War, terrorism, or civil unrest</li>
                <li>• Pandemics or health emergencies</li>
                <li>• Government actions or regulations</li>
                <li>• Strikes or labor disputes</li>
                <li>• Infrastructure failures (power, internet, transportation)</li>
              </ul>
            </div>
          </div>

          {/* Privacy */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Privacy</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <p>
                Your use of our Services is also governed by our <a href="/privacy-policy" className="text-primary underline font-semibold">Privacy Policy</a>, which describes how we collect, use, and protect your personal information. By using our Services, you consent to our privacy practices.
              </p>
            </div>
          </div>

          {/* Modifications */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Modifications to Terms</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <p className="mb-4">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on our website with an updated "Last Updated" date.
              </p>
              <p className="mb-4">
                Material changes will be notified via email to registered users. Your continued use of our Services after changes constitutes acceptance of the modified Terms.
              </p>
              <p>
                If you do not agree with the modifications, you must stop using our Services immediately.
              </p>
            </div>
          </div>

          {/* Severability */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Severability</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <p>
                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect. The invalid provision will be modified to reflect the parties' intent as closely as possible.
              </p>
            </div>
          </div>

          {/* Entire Agreement */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Entire Agreement</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <p>
                These Terms, together with our Privacy Policy and Booking Policy, constitute the entire agreement between you and D2D regarding the use of our Services and supersede all prior agreements and understandings.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-primary bg-opacity-10 rounded-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h3>
            <p className="text-gray-700 mb-4">
              If you have questions or concerns about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> <a href="mailto:legal@dare2discover.sa" className="text-primary underline">legal@dare2discover.sa</a></p>
              <p><strong>Phone:</strong> <a href="tel:+966123456789" className="text-primary underline">+966 12 345 6789</a></p>
              <p><strong>Address:</strong> Dare2Discover Tourism, King Fahd Road, Riyadh 12271, Saudi Arabia</p>
            </div>
          </div>

          {/* Regulatory Information */}
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>Dare2Discover is a registered tourism company in the Kingdom of Saudi Arabia</p>
            <p className="mt-2">Tourism License No. XXXX-XXXX | CR No. XXXXXXXXXX</p>
            <p className="mt-2">Regulated by the Saudi Tourism Authority</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
