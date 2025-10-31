# Portfolio PDF Generator

Professional portfolio PDF generation system for Dare2Discover with theme integration.

## Features

✅ **Theme-Based Design** - Uses Dare2Discover color scheme and typography
✅ **Client-Side Generation** - Generate PDFs directly in the browser
✅ **HTML to PDF Conversion** - Convert React components to PDF files
✅ **Responsive Layout** - A4 format optimized for printing
✅ **Professional Templates** - Pre-designed portfolio template component
✅ **Customizable Sections** - Support for work experience, skills, achievements, etc.

## Installation

PDF generation dependencies are already installed:
```bash
npm install jspdf html2canvas
```

## File Structure

```
lib/pdf/
├── themeConfig.ts          # Dare2Discover theme colors and styling
├── portfolioGenerator.ts   # PDF generation utilities and functions
└── README.md              # This file

components/
├── PortfolioPDFTemplate.tsx   # Reusable portfolio template component

app/
├── portfolio/page.tsx       # Demo/test page for portfolio generation
├── api/pdf/
│   ├── generate/route.ts   # Placeholder API route
│   └── portfolio/route.ts  # Portfolio API endpoint (future use)
```

## Usage

### 1. Basic Portfolio Generation

```tsx
import PortfolioPDFTemplate from '@/components/PortfolioPDFTemplate';
import { generatePDFFromElement } from '@/lib/pdf/portfolioGenerator';
import { useRef } from 'react';

export default function MyPortfolio() {
  const portfolioRef = useRef<HTMLDivElement>(null);

  const handleGeneratePDF = async () => {
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
        name="John Doe"
        title="Adventure Guide"
        email="john@example.com"
        phone="+971-50-123-4567"
        bio="Experienced guide with 8+ years in adventure tourism"
        sections={[
          {
            title: "Experience",
            content: "",
            items: [
              {
                title: "Senior Guide",
                description: "Company Name",
                date: "2020 - Present",
                details: "Led 200+ tours with perfect safety record"
              }
            ]
          }
        ]}
      />
      <button onClick={handleGeneratePDF}>Download PDF</button>
    </>
  );
}
```

### 2. Theme Configuration

Access theme colors and settings:

```tsx
import { d2dTheme } from '@/lib/pdf/themeConfig';

// Primary colors
console.log(d2dTheme.colors.primary);      // #1E5128 (Deep Green)
console.log(d2dTheme.colors.secondary);    // #F5A524 (Orange/Gold)

// Sand tones
console.log(d2dTheme.colors.sand.light);   // #F5DEB3
console.log(d2dTheme.colors.sand.default); // #DEB887
console.log(d2dTheme.colors.sand.dark);    // #BC9970

// Typography
console.log(d2dTheme.fonts.primary);       // Montserrat
console.log(d2dTheme.fonts.secondary);     // Tajawal
```

### 3. PortfolioPDFTemplate Props

```typescript
interface PortfolioTemplateProps {
  name: string;              // Full name of portfolio owner
  title: string;             // Professional title
  email?: string;            // Email address
  phone?: string;            // Phone number
  bio?: string;              // Professional bio/summary
  image?: string;            // Profile image URL
  sections: Array<{
    title: string;           // Section title (e.g., "Experience")
    content: string;         // Fallback text content
    items?: Array<{          // Array of items in section
      title: string;         // Item title
      description?: string;  // Subtitle/company name
      date?: string;         // Date or date range
      details?: string;      // Detailed description
    }>;
  }>;
  logoText?: string;         // Footer logo text (default: "DARE2DISCOVER")
}
```

## Theme Colors

### Primary Color Palette
- **Primary**: `#1E5128` (Deep Green) - Headers, accents
- **Primary Light**: `#2E7D3B` - Hover states, highlights
- **Secondary**: `#F5A524` (Orange/Gold) - Call-to-action, highlights
- **Secondary Dark**: `#D68F1F` - Secondary actions

### Sand/Neutral Colors
- **Light**: `#F5DEB3` - Light backgrounds
- **Default**: `#DEB887` - Main neutral tone
- **Dark**: `#BC9970` - Darker elements

### Text Colors
- **Primary Text**: `#1E5128` - Main body text
- **Secondary Text**: `#666666` - Secondary information
- **Light Text**: `#999999` - Tertiary information
- **White**: `#FFFFFF` - On colored backgrounds

## API Endpoints

### POST /api/pdf/generate
Check PDF generation service status.

**Request:**
```json
{
  "action": "check"
}
```

**Response:**
```json
{
  "status": "ok",
  "message": "Use client-side PDF generation with html2canvas"
}
```

### POST /api/pdf/portfolio
Placeholder for future server-side PDF generation.

## Advanced Usage

### Custom PDF Generation

```tsx
import { generatePDFDirect, addPDFHeader, addPDFSection } from '@/lib/pdf/portfolioGenerator';
import jsPDF from 'jspdf';

generatePDFDirect('custom-portfolio.pdf', (pdf: jsPDF) => {
  // Add custom header
  let yPos = addPDFHeader(pdf, 'My Portfolio', 'Adventure & Travel');

  // Add sections
  yPos = addPDFSection(
    pdf,
    yPos,
    'About Me',
    'This is my professional summary...'
  );

  yPos = addPDFSection(
    pdf,
    yPos,
    'Experience',
    'I have worked as...'
  );
});
```

### HTML to PDF Conversion

Convert any HTML element to PDF:

```tsx
import { generatePDFFromElement } from '@/lib/pdf/portfolioGenerator';

const element = document.getElementById('my-content');
if (element instanceof HTMLElement) {
  await generatePDFFromElement(element, 'document.pdf');
}
```

## Testing

Visit the demo page at `/portfolio` to:
1. View the portfolio template
2. Customize the sample data
3. Generate and download the PDF
4. Preview theme colors

## Customization

### Modifying Theme Colors

Edit `/lib/pdf/themeConfig.ts`:

```typescript
export const d2dTheme = {
  colors: {
    primary: '#YOUR_COLOR',
    secondary: '#YOUR_COLOR',
    // ... other colors
  }
}
```

### Creating Custom Templates

Create a new template component extending the structure of `PortfolioPDFTemplate`:

```tsx
import { forwardRef } from 'react';
import { d2dTheme } from '@/lib/pdf/themeConfig';

const CustomTemplate = forwardRef<HTMLDivElement, YourProps>(
  (props, ref) => {
    return (
      <div ref={ref} style={{ /* your styles */ }}>
        {/* Your template */}
      </div>
    );
  }
);

export default CustomTemplate;
```

## Troubleshooting

### PDF Generation Not Working

1. **Check browser console** for errors
2. **Verify image URLs** are CORS-enabled if using external images
3. **Try smaller content** to test if it's a size issue
4. **Clear browser cache** and try again

### Font Issues

The template uses system fonts (Helvetica) for PDF generation. Custom fonts may not render in PDFs. Use `loadFonts()` in jsPDF if needed:

```typescript
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Font loading may require additional setup
```

### Image Quality

Ensure high-quality source images (300+ DPI equivalent):
- Use proper image URLs (CORS-enabled)
- Avoid very large images (> 5MB)
- Test with placeholder images first

## Performance Tips

1. **Optimize images** before using in templates
2. **Use simple layouts** for faster rendering
3. **Minimize content** to required information
4. **Test on slower devices** for best results

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ⚠️ IE11 (not supported)

## Future Enhancements

- [ ] Server-side PDF generation with Puppeteer
- [ ] Multiple template styles
- [ ] Batch PDF generation
- [ ] PDF watermarking
- [ ] Signature fields in PDF
- [ ] Dynamic QR codes
- [ ] Multi-language support

## Dependencies

- **jspdf**: ^2.5.0 - PDF document generation
- **html2canvas**: ^1.4.1 - HTML to canvas conversion

## License

Part of Dare2Discover Platform

## Support

For issues or questions, refer to:
- Template component: `/components/PortfolioPDFTemplate.tsx`
- Demo page: `/app/portfolio/page.tsx`
- Generator utilities: `/lib/pdf/portfolioGenerator.ts`
