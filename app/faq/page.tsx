'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState } from 'react'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      category: 'Booking & Payment',
      questions: [
        {
          question: 'How do I book a tour?',
          answer: 'Browse our tours, select your preferred experience, choose a date, and complete the booking form. You\'ll receive instant confirmation via email and SMS.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, Mastercard, American Express), Mada cards, Apple Pay, and bank transfers for group bookings.'
        },
        {
          question: 'Is my payment secure?',
          answer: 'Yes, all payments are processed through secure, encrypted payment gateways. We never store your complete card details on our servers.'
        },
        {
          question: 'Can I pay in installments?',
          answer: 'For bookings above SAR 1,000, we offer installment payment options through Tabby and Tamara. Select this option at checkout.'
        }
      ]
    },
    {
      category: 'Cancellation & Refunds',
      questions: [
        {
          question: 'What is your cancellation policy?',
          answer: 'Free cancellation up to 24 hours before the tour start time. Cancellations within 24 hours are subject to a 50% fee. No-shows are non-refundable.'
        },
        {
          question: 'How do I cancel my booking?',
          answer: 'Log into your account, go to "My Bookings," select the tour you want to cancel, and click "Cancel Booking." You\'ll receive a confirmation email.'
        },
        {
          question: 'When will I receive my refund?',
          answer: 'Refunds are processed within 5-7 business days and will be credited to your original payment method.'
        },
        {
          question: 'Can I reschedule my tour?',
          answer: 'Yes, you can reschedule up to 48 hours before the tour. Subject to availability and may incur additional charges depending on the new date.'
        }
      ]
    },
    {
      category: 'Tour Information',
      questions: [
        {
          question: 'What should I bring on the tour?',
          answer: 'Bring comfortable clothing, sunscreen, sunglasses, a hat, water bottle, and your camera. Specific tours may have additional requirements listed in the tour description.'
        },
        {
          question: 'Are tours suitable for children?',
          answer: 'Most of our tours are family-friendly. Age restrictions and recommendations are listed on each tour page. Children under 5 are usually free or discounted.'
        },
        {
          question: 'Do you provide hotel pickup?',
          answer: 'Yes, most tours include complimentary hotel pickup and drop-off within the city limits. Pickup times are confirmed 24 hours before the tour.'
        },
        {
          question: 'What languages are tours conducted in?',
          answer: 'All tours are conducted in Arabic and English. Some tours offer additional languages (French, German, Spanish) upon request with advance notice.'
        },
        {
          question: 'What happens if weather conditions are bad?',
          answer: 'For safety, tours may be rescheduled or cancelled due to severe weather. You\'ll be notified 24 hours in advance and offered a full refund or alternative date.'
        }
      ]
    },
    {
      category: 'Account & Technical',
      questions: [
        {
          question: 'How do I create an account?',
          answer: 'Click "Sign Up" in the top menu, fill in your details, and verify your email. You can also sign up during the booking process.'
        },
        {
          question: 'I forgot my password. What should I do?',
          answer: 'Click "Forgot Password" on the login page, enter your email, and follow the reset instructions sent to your inbox.'
        },
        {
          question: 'Can I book without creating an account?',
          answer: 'Yes, you can book as a guest. However, creating an account allows you to track bookings, save favorites, and receive exclusive offers.'
        },
        {
          question: 'How do I update my booking details?',
          answer: 'Log into your account, go to "My Bookings," and select the tour to view and update passenger information, contact details, or special requests.'
        }
      ]
    },
    {
      category: 'Safety & Requirements',
      questions: [
        {
          question: 'Do I need travel insurance?',
          answer: 'While not mandatory, we highly recommend travel insurance that covers tour activities, medical emergencies, and cancellations.'
        },
        {
          question: 'Are there any health restrictions?',
          answer: 'Some adventure tours have health restrictions. Please check the tour description and consult your doctor if you have medical conditions.'
        },
        {
          question: 'What are the COVID-19 safety measures?',
          answer: 'We follow all government guidelines including sanitization, social distancing where possible, and health checks. Masks may be required on certain tours.'
        },
        {
          question: 'Do I need a visa to visit Saudi Arabia?',
          answer: 'Most international visitors can apply for an e-visa or visa on arrival. Check the Saudi Arabia Ministry of Tourism website for specific country requirements.'
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sand-light to-sand-dark py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Find answers to common questions about booking, tours, payments, and more
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-primary">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 100 + faqIndex
                  const isOpen = openIndex === globalIndex

                  return (
                    <div
                      key={faqIndex}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </span>
                        <svg
                          className={`w-5 h-5 text-primary transition-transform flex-shrink-0 ${
                            isOpen ? 'transform rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4 text-gray-600 border-t border-gray-100">
                          <p className="pt-4">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="max-w-4xl mx-auto mt-16 bg-primary bg-opacity-10 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-700 mb-6">
            Can't find the answer you're looking for? Our customer support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary">
              Contact Support
            </a>
            <a href="tel:+966123456789" className="btn-secondary">
              Call Us: +966 12 345 6789
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
