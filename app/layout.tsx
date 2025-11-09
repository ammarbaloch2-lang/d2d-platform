import type { Metadata, Viewport } from 'next'
import { Montserrat, Bebas_Neue, Russo_One } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const russoOne = Russo_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-russo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'D2D - Dare2Discover Saudi Arabia',
  description: 'Discover authentic Saudi tourism experiences with Dare2Discover. Book desert safaris, cultural tours, and unique adventures across the Kingdom.',
  keywords: 'Saudi Arabia tours, desert safari, cultural experiences, tourism Saudi, D2D, Dare2Discover',
  authors: [{ name: 'Saudi Tourism Group' }],
  icons: {
    icon: [
      {
        url: '/images/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/images/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/images/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#F5A524',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${montserrat.variable} ${bebasNeue.variable} ${russoOne.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
