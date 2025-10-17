'use client'

import { useState, useEffect } from 'react'
import { Member } from '@/types/member'

interface MemberFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (member: Partial<Member>) => void
  member?: Member | null
}

export default function MemberFormModal({ isOpen, onClose, onSave, member }: MemberFormModalProps) {
  const [formData, setFormData] = useState<Partial<Member>>({
    name: '',
    dob: '',
    idNumber: '',
    dateJoined: new Date().toISOString().split('T')[0],
    region: '',
    city: '',
    car: '',
    carType: 'SUV',
    nationality: 'Saudi',
    contactNumber: '',
    email: '',
    status: 'active',
  })

  useEffect(() => {
    if (member) {
      setFormData(member)
    } else {
      setFormData({
        name: '',
        dob: '',
        idNumber: '',
        dateJoined: new Date().toISOString().split('T')[0],
        region: '',
        city: '',
        car: '',
        carType: 'SUV',
        nationality: 'Saudi',
        contactNumber: '',
        email: '',
        status: 'active',
      })
    }
  }, [member])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const regions = [
    'Riyadh',
    'Makkah',
    'Madinah',
    'Eastern Province',
    'Asir',
    'Tabuk',
    'Hail',
    'Northern Borders',
    'Jazan',
    'Najran',
    'Al-Baha',
    'Al-Jouf',
    'Al-Qassim',
  ]

  const carTypes = ['SUV', 'Sedan', 'Truck', 'Pickup', 'Van', 'Coupe', 'Other']

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {member ? 'Edit Member' : 'Add New Member'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* ID Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ID Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Date Joined */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Joined <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dateJoined"
                value={formData.dateJoined}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Nationality */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nationality <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                placeholder="+966XXXXXXXXX"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Region */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Region <span className="text-red-500">*</span>
              </label>
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select Region</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Car */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Car Model/Make <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="car"
                value={formData.car}
                onChange={handleChange}
                required
                placeholder="e.g., Toyota Land Cruiser"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Car Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Car Type <span className="text-red-500">*</span>
              </label>
              <select
                name="carType"
                value={formData.carType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {carTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status <span className="text-red-500">*</span>
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
          </div>

          <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary px-6 py-2"
            >
              {member ? 'Update Member' : 'Add Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
