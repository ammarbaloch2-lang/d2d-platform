'use client';

import React, { forwardRef } from 'react';
import { d2dTheme } from '@/lib/pdf/themeConfig';

export interface PortfolioTemplateProps {
  name: string;
  title: string;
  email?: string;
  phone?: string;
  bio?: string;
  image?: string;
  sections: {
    title: string;
    content: string;
    items?: {
      title: string;
      description?: string;
      date?: string;
      details?: string;
    }[];
  }[];
  logoText?: string;
}

const PortfolioPDFTemplate = forwardRef<
  HTMLDivElement,
  PortfolioTemplateProps
>(
  (
    {
      name,
      title,
      email,
      phone,
      bio,
      image,
      sections,
      logoText = 'DARE2DISCOVER',
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        style={{
          width: '210mm',
          height: '297mm',
          margin: '0 auto',
          padding: '20mm',
          backgroundColor: d2dTheme.colors.background.white,
          fontFamily: `${d2dTheme.fonts.primary}, sans-serif`,
          color: d2dTheme.colors.text.primary,
        }}
      >
        {/* Header Section */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            paddingBottom: '15px',
            borderBottom: `3px solid ${d2dTheme.colors.secondary}`,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: d2dTheme.colors.primary,
                margin: '0 0 5px 0',
              }}
            >
              {name}
            </h1>
            <p
              style={{
                fontSize: '16px',
                color: d2dTheme.colors.secondary,
                margin: '0',
                fontWeight: '600',
              }}
            >
              {title}
            </p>
          </div>
          {image && (
            <img
              src={image}
              alt={name}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: `3px solid ${d2dTheme.colors.primary}`,
              }}
            />
          )}
        </div>

        {/* Contact Information */}
        {(email || phone) && (
          <div
            style={{
              display: 'flex',
              gap: '20px',
              marginBottom: '20px',
              fontSize: '12px',
              color: d2dTheme.colors.text.secondary,
            }}
          >
            {email && <span>Email: {email}</span>}
            {phone && <span>Phone: {phone}</span>}
          </div>
        )}

        {/* Bio Section */}
        {bio && (
          <div
            style={{
              marginBottom: '25px',
              paddingBottom: '15px',
              borderBottom: `1px solid ${d2dTheme.colors.border}`,
            }}
          >
            <h2
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: d2dTheme.colors.secondary,
                margin: '0 0 8px 0',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              About
            </h2>
            <p
              style={{
                fontSize: '12px',
                lineHeight: '1.6',
                color: d2dTheme.colors.text.secondary,
                margin: '0',
              }}
            >
              {bio}
            </p>
          </div>
        )}

        {/* Sections */}
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} style={{ marginBottom: '20px' }}>
            <h2
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: d2dTheme.colors.secondary,
                margin: '0 0 8px 0',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                paddingBottom: '5px',
                borderBottom: `2px solid ${d2dTheme.colors.secondary}`,
              }}
            >
              {section.title}
            </h2>

            {section.items && section.items.length > 0 ? (
              <div>
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    style={{
                      marginBottom: '12px',
                      paddingLeft: '10px',
                      borderLeft: `3px solid ${d2dTheme.colors.primary}`,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                      }}
                    >
                      <h3
                        style={{
                          fontSize: '12px',
                          fontWeight: 'bold',
                          color: d2dTheme.colors.primary,
                          margin: '0',
                        }}
                      >
                        {item.title}
                      </h3>
                      {item.date && (
                        <span
                          style={{
                            fontSize: '11px',
                            color: d2dTheme.colors.text.light,
                            marginLeft: 'auto',
                          }}
                        >
                          {item.date}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p
                        style={{
                          fontSize: '11px',
                          color: d2dTheme.colors.secondary,
                          margin: '3px 0',
                          fontWeight: '500',
                        }}
                      >
                        {item.description}
                      </p>
                    )}
                    {item.details && (
                      <p
                        style={{
                          fontSize: '10px',
                          color: d2dTheme.colors.text.secondary,
                          margin: '3px 0 0 0',
                          lineHeight: '1.4',
                        }}
                      >
                        {item.details}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p
                style={{
                  fontSize: '12px',
                  color: d2dTheme.colors.text.secondary,
                  lineHeight: '1.6',
                  margin: '0',
                }}
              >
                {section.content}
              </p>
            )}
          </div>
        ))}

        {/* Footer */}
        <div
          style={{
            marginTop: '30px',
            paddingTop: '15px',
            borderTop: `1px solid ${d2dTheme.colors.border}`,
            textAlign: 'center',
            fontSize: '10px',
            color: d2dTheme.colors.text.light,
          }}
        >
          <p style={{ margin: '0' }}>
            Generated with {logoText} | {new Date().getFullYear()}
          </p>
        </div>
      </div>
    );
  },
);

PortfolioPDFTemplate.displayName = 'PortfolioPDFTemplate';

export default PortfolioPDFTemplate;
