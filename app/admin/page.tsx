'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Tour } from '@/types/tour'
import { Member } from '@/types/member'
import MemberFormModal from '@/components/MemberFormModal'

function AdminDashboardContent() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')

  const [activeTab, setActiveTab] = useState(tabParam || 'tours')
  const [tours, setTours] = useState<Tour[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam)
    }
  }, [tabParam])

  useEffect(() => {
    if (activeTab === 'tours') {
      fetchTours()
    } else if (activeTab === 'members') {
      fetchMembers()
    }
  }, [activeTab])

  const fetchTours = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/tours')
      const data = await response.json()
      setTours(data)
    } catch (error) {
      console.error('Failed to fetch tours:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteTour = async (id: string) => {
    const tourToDelete = tours.find(tour => tour.id === id)
    if (!confirm(`Are you sure you want to delete "${tourToDelete?.title}"? This action cannot be undone.`)) return

    try {
      const response = await fetch(`/api/tours/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setTours(tours.filter(tour => tour.id !== id))
        setSuccessMessage('Tour deleted successfully!')
        setTimeout(() => setSuccessMessage(''), 3000)
      }
    } catch (error) {
      alert('Failed to delete tour')
    }
  }

  const fetchMembers = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/members')
      const data = await response.json()
      setMembers(data)
    } catch (error) {
      console.error('Failed to fetch members:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveMember = async (memberData: Partial<Member>) => {
    try {
      if (selectedMember) {
        // Update existing member
        const response = await fetch(`/api/members/${selectedMember.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(memberData),
        })
        if (response.ok) {
          const updatedMember = await response.json()
          setMembers(members.map(m => m.id === updatedMember.id ? updatedMember : m))
          setSuccessMessage('Member updated successfully!')
        }
      } else {
        // Create new member
        const response = await fetch('/api/members', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(memberData),
        })
        if (response.ok) {
          const newMember = await response.json()
          setMembers([...members, newMember])
          setSuccessMessage('Member added successfully!')
        }
      }
      setIsModalOpen(false)
      setSelectedMember(null)
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      alert('Failed to save member')
    }
  }

  const handleDeleteMember = async (id: string) => {
    const memberToDelete = members.find(m => m.id === id)
    if (!confirm(`Are you sure you want to delete "${memberToDelete?.name}"? This action cannot be undone.`)) return

    try {
      const response = await fetch(`/api/members/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setMembers(members.filter(m => m.id !== id))
        setSuccessMessage('Member deleted successfully!')
        setTimeout(() => setSuccessMessage(''), 3000)
      }
    } catch (error) {
      alert('Failed to delete member')
    }
  }

  const handleEditMember = (member: Member) => {
    setSelectedMember(member)
    setIsModalOpen(true)
  }

  const handleAddMember = () => {
    setSelectedMember(null)
    setIsModalOpen(true)
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await fetch('/api/admin/auth/logout', {
        method: 'POST',
      })
      window.location.href = '/admin/login'
    } catch (error) {
      console.error('Logout error:', error)
      setLoggingOut(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-secondary text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="/images/logo.png"
                alt="D2D Logo"
                width={50}
                height={50}
                className="rounded-lg"
              />
              <div>
                <h1 className="text-2xl font-bold">D2D Admin Portal</h1>
                <p className="text-sm text-gray-300">Tour Management Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="btn-primary text-sm">
                View Site
              </Link>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loggingOut ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center justify-between">
            <span>{successMessage}</span>
            <button onClick={() => setSuccessMessage('')} className="text-green-700 hover:text-green-900">
              ✕
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="flex flex-wrap border-b">
            <button
              onClick={() => setActiveTab('tours')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'tours'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Tours
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'bookings'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Bookings
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'members'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Members
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'users'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Users
            </button>
          </div>
        </div>

        {/* Tours Tab */}
        {activeTab === 'tours' && (
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="text-xl font-bold">Tour Management</h2>
                <Link href="/admin/tours/new" className="btn-primary text-sm">
                  + Add New Tour
                </Link>
              </div>
              {loading ? (
                <div className="p-12 text-center">
                  <p className="text-gray-500">Loading tours...</p>
                </div>
              ) : tours.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-gray-500">No tours found. Add your first tour to get started.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {tours.map((tour) => (
                        <tr key={tour.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <img src={tour.image} alt={tour.title} className="w-16 h-16 object-cover rounded" />
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                            <div className="font-medium">{tour.title}</div>
                            <div className="text-gray-500 text-xs mt-1 truncate">{tour.description}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{tour.location}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 capitalize">
                              {tour.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">SAR {tour.price}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{tour.duration}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              tour.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            } capitalize`}>
                              {tour.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex gap-2">
                              <Link
                                href={`/admin/tours/${tour.id}/edit`}
                                className="text-secondary hover:text-secondary-light font-medium"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDeleteTour(tour.id)}
                                className="text-red-600 hover:text-red-800 font-medium"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Members Tab */}
        {activeTab === 'members' && (
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="text-xl font-bold">Member Management</h2>
                <button onClick={handleAddMember} className="btn-primary text-sm">
                  + Add New Member
                </button>
              </div>
              {loading ? (
                <div className="p-12 text-center">
                  <p className="text-gray-500">Loading members...</p>
                </div>
              ) : members.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-gray-500">No members found. Add your first member to get started.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID Number</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Region/City</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Car</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Joined</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {members.map((member) => (
                        <tr key={member.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm">
                            <div className="font-medium text-gray-900">{member.name}</div>
                            <div className="text-gray-500 text-xs">{member.nationality}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{member.idNumber}</td>
                          <td className="px-6 py-4 text-sm">
                            <div className="text-gray-900">{member.contactNumber}</div>
                            {member.email && <div className="text-gray-500 text-xs">{member.email}</div>}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="text-gray-900">{member.region}</div>
                            <div className="text-gray-500 text-xs">{member.city}</div>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="text-gray-900">{member.car}</div>
                            <div className="text-gray-500 text-xs">{member.carType}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {new Date(member.dateJoined).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              member.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            } capitalize`}>
                              {member.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditMember(member)}
                                className="text-secondary hover:text-secondary-light font-medium"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteMember(member.id)}
                                className="text-red-600 hover:text-red-800 font-medium"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Other Tabs */}
        {activeTab !== 'overview' && activeTab !== 'tours' && activeTab !== 'members' && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
            </h2>
            <p className="text-gray-500">This section is under development.</p>
          </div>
        )}
      </div>

      {/* Member Form Modal */}
      <MemberFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedMember(null)
        }}
        onSave={handleSaveMember}
        member={selectedMember}
      />
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100 flex items-center justify-center"><p>Loading...</p></div>}>
      <AdminDashboardContent />
    </Suspense>
  )
}
