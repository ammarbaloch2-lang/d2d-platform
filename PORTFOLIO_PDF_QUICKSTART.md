# Portfolio PDF Generator - Quick Start Guide

Generate professional portfolio PDFs with Dare2Discover theme in 5 minutes!

## What's New

✨ **New PDF Generation System** - Convert React components to professional PDFs
🎨 **Dare2Discover Theme** - Pre-configured colors and styling
📄 **Professional Templates** - Ready-to-use portfolio component
🚀 **Easy to Use** - Simple API with sensible defaults

## Installation (Already Done ✓)

Dependencies installed:
- `jspdf` - PDF generation library
- `html2canvas` - HTML to canvas conversion

## 3-Minute Setup

### 1. Import Components

```tsx
import PortfolioPDFTemplate from '@/components/PortfolioPDFTemplate';
import { generatePDFFromElement } from '@/lib/pdf/portfolioGenerator';
```

### 2. Create Your Portfolio

```tsx
import { useRef } from 'react';

export default function MyPortfolio() {
  const portfolioRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (portfolioRef.current) {
      await generatePDFFromElement(
        portfolioRef.current,
        'my-portfolio.pdf'
      );
    }
  };

  return (
    <>
      <PortfolioPDFTemplate
        ref={portfolioRef}
        name="Your Name"
        title="Your Title"
        email="your.email@example.com"
        phone="+1-XXX-XXX-XXXX"
        bio="Your professional summary here"
        sections={[
          {
            title: "Experience",
            content: "",
            items: [
              {
                title: "Job Title",
                description: "Company Name",
                date: "2020 - Present",
                details: "Job description and achievements"
              }
            ]
          }
        ]}
      />
      <button onClick={handleDownload}>📥 Download PDF</button>
    </>
  );
}
```

### 3. Done!

Click the button to download your PDF.

## Demo

Visit `/portfolio` page to see:
- Live template preview
- Working PDF generation
- Sample portfolio data
- Theme color showcase

## Theme Colors

Dare2Discover color scheme is built-in:

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | #1E5128 | Headers, main text |
| Secondary | #F5A524 | Section titles, highlights |
| Sand Light | #F5DEB3 | Light backgrounds |
| Sand | #DEB887 | Neutral tone |

No additional configuration needed - just use the component!

## Key Features

### ✅ Responsive Design
- A4 page format optimized for printing
- Professional spacing and typography
- Mobile-friendly preview

### ✅ Customizable Sections
- Work experience
- Skills & expertise
- Achievements & awards
- Education
- Certifications
- Any custom sections

### ✅ Profile Integration
- Name and title
- Contact information
- Professional photo (optional)
- Professional bio/summary

### ✅ Modern Design
- Clean, professional layout
- Dare2Discover branded colors
- Print-ready quality
- Digital-friendly spacing

## Usage Patterns

### Pattern 1: Simple Portfolio

```tsx
<PortfolioPDFTemplate
  name="John Smith"
  title="Tour Guide"
  email="john@example.com"
  sections={[
    {
      title: "About",
      content: "10+ years of experience in adventure tourism"
    }
  ]}
/>
```

### Pattern 2: Detailed Experience

```tsx
<PortfolioPDFTemplate
  name="Jane Doe"
  title="Adventure Manager"
  sections={[
    {
      title: "Professional Experience",
      items: [
        {
          title: "Senior Guide",
          description: "Adventure Co.",
          date: "2020 - Present",
          details: "Led 200+ tours successfully"
        },
        {
          title: "Guide",
          description: "Tourism Org",
          date: "2015 - 2020",
          details: "5 years of guiding experience"
        }
      ]
    },
    {
      title: "Skills",
      items: [
        {
          title: "Leadership",
          details: "Team management and coordination"
        }
      ]
    }
  ]}
/>
```

### Pattern 3: With Profile Image

```tsx
<PortfolioPDFTemplate
  name="Alex Johnson"
  title="Adventure Specialist"
  image="https://example.com/photo.jpg"
  bio="Certified adventure guide with expertise in desert and mountain expeditions"
  sections={[/* ... */]}
/>
```

## Common Tasks

### Download with Custom Filename

```tsx
await generatePDFFromElement(
  element,
  `${name}-portfolio-${new Date().getFullYear()}.pdf`
);
```

### Customize Colors (If Needed)

Edit `/lib/pdf/themeConfig.ts`:

```typescript
export const d2dTheme = {
  colors: {
    primary: '#YOUR_COLOR',
    secondary: '#YOUR_COLOR',
    // ...
  }
};
```

### Create Multiple Templates

1. Copy `PortfolioPDFTemplate.tsx`
2. Rename to `YourTemplate.tsx`
3. Modify styles as needed
4. Use in your component

## File Locations

```
lib/pdf/
├── themeConfig.ts              # Theme colors
├── portfolioGenerator.ts       # Generator functions
├── index.ts                    # Exports
└── README.md                   # Full documentation

components/
└── PortfolioPDFTemplate.tsx   # Template component

app/
├── portfolio/page.tsx          # Demo page
└── api/pdf/
    ├── generate/route.ts       # API routes (optional)
    └── portfolio/route.ts
```

## Troubleshooting

### Issue: PDF is blank
- ✓ Check browser console for errors
- ✓ Verify element is mounted: `portfolioRef.current` should not be null

### Issue: Images not showing
- ✓ Use absolute URLs (not relative)
- ✓ Check CORS headers on image server
- ✓ Use placeholder if image fails: `image || '/default-profile.jpg'`

### Issue: Styling looks different
- ✓ Inline styles are rendered exactly as specified
- ✓ Custom CSS classes may not work in PDF
- ✓ Use the theme colors for consistency

## Next Steps

1. **Customize**: Edit the portfolio data to match your needs
2. **Test**: Generate a PDF and review the output
3. **Share**: Download and share your portfolio
4. **Iterate**: Update data as needed and regenerate

## Advanced Usage

See `/lib/pdf/README.md` for:
- Custom PDF generation
- Working with jsPDF directly
- API integration
- Performance optimization

## Support

- **Demo**: `/portfolio`
- **Component**: `/components/PortfolioPDFTemplate.tsx`
- **Utilities**: `/lib/pdf/portfolioGenerator.ts`
- **Theme**: `/lib/pdf/themeConfig.ts`

---

**Happy portfolio building! 🎉**
