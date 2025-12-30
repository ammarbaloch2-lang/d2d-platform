'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Tour } from '@/types/tour'
import ImageUpload from '@/components/ImageUpload'

export default function EditTourPage() {
  const router = useRouter()
  const params = useParams()
  const tourId = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [tour, setTour] = useState<Tour | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    price: '',
    duration: '',
    image: '',
    images: '',
    location: '',
    category: 'cultural',
    maxCapacity: '',
    includes: '',
    sequence: '',
    guideName: '',
    guideBio: '',
    guideLanguages: '',
    guideRating: '5',
    status: 'active' as 'active' | 'inactive',
  })

  useEffect(() => {
    fetchTour()
  }, [tourId])

  const fetchTour = async () => {
    try {
      const response = await fetch(`/api/tours/${tourId}`)
      if (!response.ok) {
        throw new Error('Tour not found')
      }
      const data: Tour = await response.json()
      setTour(data)

      // Populate form
      setFormData({
        title: data.title,
        description: data.description,
        longDescription: data.longDescription || '',
        price: data.price.toString(),
        duration: data.duration,
        image: data.image,
        images: data.images?.join('\n') || '',
        location: data.location,
        category: data.category,
        maxCapacity: data.maxCapacity?.toString() || '',
        includes: data.includes?.join('\n') || '',
        sequence: data.sequence?.toString() || '',
        guideName: data.guide?.name || '',
        guideBio: data.guide?.bio || '',
        guideLanguages: data.guide?.languages?.join(', ') || '',
        guideRating: data.guide?.rating?.toString() || '5',
        status: data.status,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tour')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      // Prepare tour data
      const tourData: any = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        duration: formData.duration,
        image: formData.image,
        location: formData.location,
        category: formData.category,
        status: formData.status,
      }

      // Add optional fields if provided
      if (formData.longDescription) {
        tourData.longDescription = formData.longDescription
      }

      if (formData.maxCapacity) {
        tourData.maxCapacity = parseInt(formData.maxCapacity)
      }

      if (formData.includes) {
        tourData.includes = formData.includes.split('\n').filter(item => item.trim())
      }

      if (formData.images) {
        tourData.images = formData.images.split('\n').map(url => url.trim()).filter(url => url)
      }

      if (formData.sequence) {
        tourData.sequence = parseInt(formData.sequence)
      }

      if (formData.guideName && formData.guideBio) {
        tourData.guide = {
          name: formData.guideName,
          bio: formData.guideBio,
          languages: formData.guideLanguages.split(',').map(lang => lang.trim()).filter(lang => lang),
          rating: parseFloat(formData.guideRating),
        }
      }

      const response = await fetch(`/api/tours/${tourId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tourData),
      })

      if (!response.ok) {
        throw new Error('Failed to update tour')
      }

      // Show success and redirect
      alert('Tour updated successfully!')
      router.push('/admin?tab=tours')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update tour')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Loading tour...</p>
      </div>
    )
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Tour not found</p>
          <Link href="/admin" className="btn-primary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-secondary text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Edit Tour</h1>
              <p className="text-sm text-gray-300">{tour.title}</p>
            </div>
            <Link href="/admin" className="btn-primary text-sm">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-secondary">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tour Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="e.g., Desert Safari Adventure"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Short Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Brief description for tour cards"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Long Description
                    </label>
                    <textarea
                      name="longDescription"
                      value={formData.longDescription}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Detailed description for tour detail page"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (SAR) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="350"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration *
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="e.g., 6 hours, Full Day"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="e.g., Riyadh Desert"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="cultural">Cultural</option>
                      <option value="desert">Desert</option>
                      <option value="nature">Nature</option>
                      <option value="adventure">Adventure</option>
                      <option value="historical">Historical</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Capacity
                    </label>
                    <input
                      type="number"
                      name="maxCapacity"
                      value={formData.maxCapacity}
                      onChange={handleChange}
                      min="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="15"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status *
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Display Sequence
                    </label>
                    <input
                      type="number"
                      name="sequence"
                      value={formData.sequence}
                      onChange={handleChange}
                      min="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="1, 2, 3, 4..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Order in which tour appears on homepage (lower numbers first)
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <ImageUpload
                      label="Main Image *"
                      value={formData.image}
                      onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                      helperText="Primary image for the tour - will be displayed as the main tour image"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <ImageUpload
                      label="Additional Images (Gallery)"
                      value={formData.images}
                      onChange={(urls) => setFormData(prev => ({ ...prev, images: urls }))}
                      multiple
                      helperText="Upload multiple images for the tour gallery - these will appear as a carousel on the tour card"
                    />
                  </div>
                </div>
              </div>

              {/* What's Included */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-secondary">What's Included</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Included Items (one per line)
                  </label>
                  <textarea
                    name="includes"
                    value={formData.includes}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Hotel pickup and drop-off&#10;Dune bashing in 4x4 vehicle&#10;Traditional BBQ dinner"
                  />
                </div>
              </div>

              {/* Tour Guide Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-secondary">Tour Guide Information (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Guide Name
                    </label>
                    <input
                      type="text"
                      name="guideName"
                      value={formData.guideName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="e.g., Ahmed Al-Rashid"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Guide Rating
                    </label>
                    <input
                      type="number"
                      name="guideRating"
                      value={formData.guideRating}
                      onChange={handleChange}
                      min="1"
                      max="5"
                      step="0.1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="4.9"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Guide Bio
                    </label>
                    <textarea
                      name="guideBio"
                      value={formData.guideBio}
                      onChange={handleChange}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Expert desert guide with 10+ years of experience"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Languages (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="guideLanguages"
                      value={formData.guideLanguages}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Arabic, English, French"
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-4 pt-6 border-t">
                <Link
                  href="/admin"
                  className="px-6 py-2 text-gray-700 hover:text-gray-900 font-medium"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving Changes...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
