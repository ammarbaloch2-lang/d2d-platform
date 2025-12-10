# D2D - Dare2Discover Saudi Tourism Platform

A modern, professional mobile-first web application for booking authentic Saudi tourism experiences.

## Features

### User-Facing Features
- **Homepage**: Hero section with search, featured tours, and category browsing
- **Tour Discovery**: Advanced filtering by category, price range, and location
- **Tour Details**: Comprehensive tour information with itineraries, guide profiles, and booking
- **Real-time Booking**: Instant date selection and booking with live availability
- **User Authentication**: Secure login system
- **Responsive Design**: Mobile-first design optimized for all devices

### Admin Features
- **Dashboard**: Overview of bookings, revenue, and statistics
- **Booking Management**: View and manage all bookings
- **Tour Management**: Add and manage tour listings
- **User Management**: View registered users

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **UI**: Custom components with mobile-first responsive design

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Pages

- `/` - Homepage with featured tours
- `/tours` - All tours listing with filters
- `/tours/[id]` - Individual tour details and booking
- `/auth/login` - User authentication
- `/admin` - Admin dashboard

## Design Features

- **Colors**:
  - Primary: Orange/Gold (#F5A524) - representing Saudi heritage
  - Secondary: Forest Green (#1E5128) - representing nature
  - Sand tones - representing the desert landscape

- **Mobile-First**: Fully responsive design optimized for mobile devices
- **Professional UI**: Modern card layouts, smooth transitions, and intuitive navigation
- **Saudi-Themed**: Cultural elements and imagery throughout

## Project Structure

```
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── tours/
│   │   ├── page.tsx          # Tours listing
│   │   └── [id]/page.tsx     # Tour details
│   ├── auth/
│   │   └── login/page.tsx    # Authentication
│   └── admin/
│       └── page.tsx          # Admin dashboard
├── components/
│   ├── Header.tsx            # Navigation header
│   ├── Footer.tsx            # Site footer
│   └── TourCard.tsx          # Tour card component
├── public/
│   └── images/
│       └── logo.png          # D2D logo
└── tailwind.config.js        # Tailwind configuration
```

## Future Enhancements

- Database integration (PostgreSQL/MongoDB)
- Payment gateway integration (Stripe/HyperPay)
- Real-time availability system
- Multilingual support (Arabic/English with RTL)
- User profiles and booking history
- Review and rating system
- In-app messaging
- Photo/video upload for tours
- Email notifications
- Mobile app (React Native/Flutter)

## Based On

This platform is built according to the STG Tour Booking Platform design document, adapted for D2D (Dare2Discover) branding.

## License

ISC

---

Built by Saudi Tourism Group - Dare2Discover
