'use client';

import React, { useRef, useState } from 'react';
import PortfolioPDFTemplate from '@/components/PortfolioPDFTemplate';
import { generatePDFFromElement } from '@/lib/pdf/portfolioGenerator';
import { d2dTheme } from '@/lib/pdf/themeConfig';

export default function PortfolioPage() {
  const portfolioRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Sample portfolio data
  const portfolioData = {
    name: 'John Smith',
    title: 'Adventure & Tour Specialist',
    email: 'john@dare2discover.com',
    phone: '+971-50-123-4567',
    bio: 'Experienced tour guide and adventure specialist with 8+ years of expertise in organizing unforgettable experiences across the Middle East. Passionate about sustainable tourism and cultural exploration.',
    image: 'https://via.placeholder.com/150',
    sections: [
      {
        title: 'Professional Experience',
        content: '',
        items: [
          {
            title: 'Senior Tour Guide',
            description: 'Wadi Al Ghaf Tours',
            date: '2020 - Present',
            details:
              'Leading guided tours for adventure seekers. Expertise in desert safaris, mountain trekking, and cultural experiences.',
          },
          {
            title: 'Adventure Coordinator',
            description: 'Desert Experiences Co.',
            date: '2017 - 2020',
            details:
              'Organized and coordinated multi-day adventure expeditions and team-building events for corporate clients.',
          },
          {
            title: 'Tour Assistant',
            description: 'Tourism Board',
            date: '2015 - 2017',
            details: 'Provided customer service and logistical support for various tourism initiatives.',
          },
        ],
      },
      {
        title: 'Skills & Expertise',
        content: '',
        items: [
          {
            title: 'Specializations',
            details: 'Desert Safari • Mountain Trekking • Cultural Tours • Adventure Planning • Risk Management',
          },
          {
            title: 'Languages',
            details: 'English (Fluent) • Arabic (Native) • French (Intermediate)',
          },
          {
            title: 'Certifications',
            details: 'First Aid & CPR • Professional Guide License • Adventure Safety Certification',
          },
        ],
      },
      {
        title: 'Highlights & Achievements',
        content: '',
        items: [
          {
            title: '500+ Successful Tours',
            description: 'Zero incident record',
            details:
              'Successfully guided over 500 tours with excellent safety and customer satisfaction ratings.',
          },
          {
            title: 'Award Recognition',
            date: '2022',
            details: 'Received "Best Adventure Guide" award from Tourism Excellence Foundation.',
          },
          {
            title: 'Customer Satisfaction',
            description: '4.9/5 stars',
            details: 'Consistently rated highly by clients for professionalism and expertise.',
          },
        ],
      },
    ],
  };

  const handleGeneratePDF = async () => {
    if (!portfolioRef.current) {
      setMessage({ type: 'error', text: 'Portfolio content not found' });
      return;
    }

    try {
      setIsGenerating(true);
      setMessage(null);

      await generatePDFFromElement(portfolioRef.current, `${portfolioData.name}-Portfolio.pdf`);

      setMessage({
        type: 'success',
        text: `✓ PDF generated successfully: ${portfolioData.name}-Portfolio.pdf`,
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      setMessage({
        type: 'error',
        text: 'Failed to generate PDF. Please try again.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: d2dTheme.colors.background.light,
        padding: '20px',
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto 30px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '32px',
            color: d2dTheme.colors.primary,
            marginBottom: '10px',
          }}
        >
          Portfolio PDF Generator
        </h1>
        <p
          style={{
            fontSize: '16px',
            color: d2dTheme.colors.text.secondary,
            marginBottom: '20px',
          }}
        >
          Create professional portfolio PDFs with Dare2Discover theme
        </p>

        {/* Action Button */}
        <button
          onClick={handleGeneratePDF}
          disabled={isGenerating}
          style={{
            backgroundColor: d2dTheme.colors.secondary,
            color: 'white',
            border: 'none',
            padding: '12px 30px',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '4px',
            cursor: isGenerating ? 'not-allowed' : 'pointer',
            opacity: isGenerating ? 0.6 : 1,
            transition: 'all 0.3s ease',
          }}
        >
          {isGenerating ? 'Generating PDF...' : '📥 Download Portfolio PDF'}
        </button>

        {/* Message */}
        {message && (
          <div
            style={{
              marginTop: '15px',
              padding: '12px 15px',
              backgroundColor:
                message.type === 'success'
                  ? '#D4EDDA'
                  : '#F8D7DA',
              color:
                message.type === 'success'
                  ? '#155724'
                  : '#721C24',
              borderRadius: '4px',
              fontSize: '14px',
              border: `1px solid ${
                message.type === 'success'
                  ? '#C3E6CB'
                  : '#F5C6CB'
              }`,
            }}
          >
            {message.text}
          </div>
        )}
      </div>

      {/* Portfolio Preview */}
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          boxShadow: '0 0 20px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <PortfolioPDFTemplate
          ref={portfolioRef}
          {...portfolioData}
          logoText="DARE2DISCOVER"
        />
      </div>

      {/* Instructions */}
      <div
        style={{
          maxWidth: '900px',
          margin: '40px auto 20px',
          padding: '20px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        }}
      >
        <h3
          style={{
            color: d2dTheme.colors.primary,
            marginTop: 0,
          }}
        >
          How to Use:
        </h3>
        <ol
          style={{
            color: d2dTheme.colors.text.secondary,
            lineHeight: '1.8',
          }}
        >
          <li>Customize the portfolio data in the component props</li>
          <li>Click "Download Portfolio PDF" to generate the PDF</li>
          <li>The PDF will be generated using the Dare2Discover theme colors</li>
          <li>Share the PDF with potential clients or employers</li>
        </ol>

        <h3
          style={{
            color: d2dTheme.colors.primary,
            marginTop: '20px',
          }}
        >
          Theme Colors:
        </h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '30px',
                height: '30px',
                backgroundColor: d2dTheme.colors.primary,
                borderRadius: '4px',
              }}
            />
            <span>Primary: {d2dTheme.colors.primary}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '30px',
                height: '30px',
                backgroundColor: d2dTheme.colors.secondary,
                borderRadius: '4px',
              }}
            />
            <span>Secondary: {d2dTheme.colors.secondary}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '30px',
                height: '30px',
                backgroundColor: d2dTheme.colors.sand.default,
                borderRadius: '4px',
                border: `1px solid ${d2dTheme.colors.border}`,
              }}
            />
            <span>Sand: {d2dTheme.colors.sand.default}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
