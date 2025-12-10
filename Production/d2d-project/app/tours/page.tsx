import { Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ToursContent from './ToursContent'

export default function ToursPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading tours...</p>
          </div>
        </div>
      }>
        <ToursContent />
      </Suspense>

      <Footer />
    </div>
  )
}
