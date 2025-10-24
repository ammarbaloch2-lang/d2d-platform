'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sand-light to-sand-dark py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your personal information
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">

          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8 text-gray-700">
            <p className="mb-4">
              Dare2Discover ("D2D", "we", "us", or "our") is committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
            <p className="mb-4">
              By using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
            </p>
            <p className="text-sm text-gray-600">
              <strong>Last Updated:</strong> October 25, 2025
            </p>
          </div>

          {/* Information We Collect */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>

            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-3">Personal Information</h3>
              <p className="text-gray-700 mb-3">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Contact Information:</strong> Name, email address, phone number, mailing address</li>
                <li>• <strong>Account Information:</strong> Username, password, profile preferences</li>
                <li>• <strong>Payment Information:</strong> Credit card details, billing address (processed securely through payment providers)</li>
                <li>• <strong>Booking Information:</strong> Travel dates, passenger details, special requests, dietary requirements</li>
                <li>• <strong>Identification:</strong> Passport or ID information (when required for tours)</li>
                <li>• <strong>Communication:</strong> Customer service correspondence, feedback, survey responses</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-3">Automatically Collected Information</h3>
              <p className="text-gray-700 mb-3">
                When you access our website, we automatically collect:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
                <li>• <strong>Usage Data:</strong> Pages visited, time spent, click patterns, referring URLs</li>
                <li>• <strong>Location Data:</strong> Approximate location based on IP address (with your consent for precise location)</li>
                <li>• <strong>Cookies:</strong> Browser cookies and similar tracking technologies</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-3">Information from Third Parties</h3>
              <p className="text-gray-700">
                We may receive information about you from social media platforms (when you log in via social media), payment processors, tourism partners, and marketing partners.
              </p>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <p className="mb-4">We use your personal information to:</p>
              <ul className="space-y-2">
                <li>✓ Process and manage your tour bookings and reservations</li>
                <li>✓ Communicate booking confirmations, updates, and important notices</li>
                <li>✓ Provide customer support and respond to your inquiries</li>
                <li>✓ Process payments and prevent fraudulent transactions</li>
                <li>✓ Personalize your experience and provide tailored recommendations</li>
                <li>✓ Send promotional emails and marketing communications (with your consent)</li>
                <li>✓ Improve our website, services, and customer experience</li>
                <li>✓ Conduct analytics and research to understand usage patterns</li>
                <li>✓ Comply with legal obligations and enforce our terms</li>
                <li>✓ Protect the security and integrity of our services</li>
              </ul>
            </div>
          </div>

          {/* Legal Basis for Processing */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Legal Basis for Processing (GDPR)</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <p className="mb-4">We process your personal data based on:</p>
              <ul className="space-y-3">
                <li>
                  <strong>Contract Performance:</strong> Processing necessary to fulfill your booking and provide services
                </li>
                <li>
                  <strong>Legitimate Interests:</strong> Improving services, marketing, fraud prevention (balanced with your rights)
                </li>
                <li>
                  <strong>Legal Obligation:</strong> Compliance with applicable laws and regulations
                </li>
                <li>
                  <strong>Consent:</strong> Marketing communications and optional data processing (you can withdraw consent anytime)
                </li>
              </ul>
            </div>
          </div>

          {/* Information Sharing */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. How We Share Your Information</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <p className="mb-4">We may share your information with:</p>
              <ul className="space-y-3">
                <li>
                  <strong>Service Providers:</strong> Tour operators, transportation providers, hotels, activity partners necessary to fulfill your booking
                </li>
                <li>
                  <strong>Payment Processors:</strong> Secure third-party payment gateways (we do not store complete card details)
                </li>
                <li>
                  <strong>Technology Partners:</strong> Cloud hosting, analytics, email service providers, customer support tools
                </li>
                <li>
                  <strong>Marketing Partners:</strong> Advertising platforms for targeted campaigns (with your consent)
                </li>
                <li>
                  <strong>Legal Authorities:</strong> When required by law, court order, or to protect our legal rights
                </li>
                <li>
                  <strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets
                </li>
              </ul>
              <p className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-4 text-yellow-800">
                <strong>Note:</strong> We never sell your personal information to third parties for their marketing purposes.
              </p>
            </div>
          </div>

          {/* Data Security */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <p className="mb-4">We implement industry-standard security measures including:</p>
              <ul className="space-y-2">
                <li>• SSL/TLS encryption for data transmission</li>
                <li>• Encrypted storage of sensitive information</li>
                <li>• Regular security audits and vulnerability assessments</li>
                <li>• Access controls and authentication protocols</li>
                <li>• Secure payment processing through PCI-DSS compliant providers</li>
                <li>• Employee training on data protection and privacy</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                While we strive to protect your data, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
              </p>
            </div>
          </div>

          {/* Your Rights */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <p className="mb-4">You have the following rights regarding your personal data:</p>
              <ul className="space-y-3">
                <li>
                  <strong>Access:</strong> Request a copy of the personal information we hold about you
                </li>
                <li>
                  <strong>Correction:</strong> Update or correct inaccurate or incomplete information
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal data (subject to legal obligations)
                </li>
                <li>
                  <strong>Portability:</strong> Receive your data in a structured, machine-readable format
                </li>
                <li>
                  <strong>Objection:</strong> Object to processing based on legitimate interests or for marketing
                </li>
                <li>
                  <strong>Restriction:</strong> Request limitation of processing under certain circumstances
                </li>
                <li>
                  <strong>Withdraw Consent:</strong> Withdraw consent for data processing at any time
                </li>
              </ul>
              <p className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 text-blue-800">
                To exercise these rights, contact us at <a href="mailto:privacy@dare2discover.sa" className="underline font-semibold">privacy@dare2discover.sa</a>
              </p>
            </div>
          </div>

          {/* Cookies */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking Technologies</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <p className="mb-4">We use cookies and similar technologies to:</p>
              <ul className="space-y-2 mb-4">
                <li>• Remember your preferences and settings</li>
                <li>• Authenticate your account and prevent fraud</li>
                <li>• Analyze website performance and user behavior</li>
                <li>• Deliver personalized content and advertisements</li>
                <li>• Improve our services and user experience</li>
              </ul>
              <p className="mb-2"><strong>Types of cookies we use:</strong></p>
              <ul className="space-y-2">
                <li>• <strong>Essential:</strong> Required for website functionality</li>
                <li>• <strong>Functional:</strong> Remember your preferences</li>
                <li>• <strong>Analytics:</strong> Understand how you use our site</li>
                <li>• <strong>Marketing:</strong> Deliver relevant advertisements</li>
              </ul>
              <p className="mt-4 text-sm">
                You can control cookies through your browser settings. Note that disabling cookies may affect website functionality.
              </p>
            </div>
          </div>

          {/* Data Retention */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Retention</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <p className="mb-4">We retain your personal information for:</p>
              <ul className="space-y-2">
                <li>• <strong>Booking Data:</strong> 7 years (for tax and legal compliance)</li>
                <li>• <strong>Account Information:</strong> Duration of account activity plus 2 years</li>
                <li>• <strong>Marketing Data:</strong> Until you unsubscribe or request deletion</li>
                <li>• <strong>Website Analytics:</strong> 26 months</li>
                <li>• <strong>Customer Support:</strong> 3 years from last interaction</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                After retention periods expire, we securely delete or anonymize your data.
              </p>
            </div>
          </div>

          {/* Children's Privacy */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <p>
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
              </p>
            </div>
          </div>

          {/* International Transfers */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. International Data Transfers</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <p className="mb-4">
                Your information may be transferred to and processed in countries outside Saudi Arabia, including countries that may not have equivalent data protection laws.
              </p>
              <p>
                When we transfer data internationally, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses approved by regulatory authorities.
              </p>
            </div>
          </div>

          {/* Policy Updates */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <p className="mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of material changes by:
              </p>
              <ul className="space-y-2">
                <li>• Posting the updated policy on our website with a new "Last Updated" date</li>
                <li>• Sending an email notification to registered users</li>
                <li>• Displaying a prominent notice on our website</li>
              </ul>
              <p className="mt-4">
                Your continued use of our services after changes become effective constitutes acceptance of the updated policy.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-primary bg-opacity-10 rounded-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h3>
            <p className="text-gray-700 mb-4">
              If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> <a href="mailto:privacy@dare2discover.sa" className="text-primary underline">privacy@dare2discover.sa</a></p>
              <p><strong>Phone:</strong> <a href="tel:+966123456789" className="text-primary underline">+966 12 345 6789</a></p>
              <p><strong>Address:</strong> Dare2Discover Tourism, King Fahd Road, Riyadh, Saudi Arabia</p>
            </div>
            <p className="mt-6 text-sm text-gray-600">
              <strong>Data Protection Officer:</strong> For specific privacy concerns, contact our DPO at <a href="mailto:dpo@dare2discover.sa" className="text-primary underline">dpo@dare2discover.sa</a>
            </p>
          </div>

          {/* Regulatory Information */}
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>D2D is registered with the Saudi Tourism Authority (License No. XXXX-XXXX)</p>
            <p className="mt-2">We comply with the Saudi Personal Data Protection Law (PDPL) and GDPR where applicable</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
