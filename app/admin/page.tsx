'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Tour } from '@/types/tour'
import { Member } from '@/types/member'
import MemberFormModal from '@/components/MemberFormModal'

export default function AdminDashboard() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')

  const [activeTab, setActiveTab] = useState(tabParam || 'overview')
  const [tours, setTours] = useState<Tour[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)

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

  // Mock data
  const stats = {
    totalBookings: 1247,
    totalRevenue: 486500,
    activeTours: 24,
    totalUsers: 3892,
  }

  const recentBookings = [
    { id: '1', tour: 'Desert Safari', customer: 'John Doe', date: '2025-10-25', amount: 350, status: 'Confirmed' },
    { id: '2', tour: 'Diriyah Tour', customer: 'Sarah Smith', date: '2025-10-26', amount: 200, status: 'Pending' },
    { id: '3', tour: 'Edge of World', customer: 'Mike Johnson', date: '2025-10-27', amount: 300, status: 'Confirmed' },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-secondary text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">D2D Admin Portal</h1>
              <p className="text-sm text-gray-300">Tour Management Dashboard</p>
            </div>
            <Link href="/" className="btn-primary text-sm">
              View Site
            </Link>
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
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'overview'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Overview
            </button>
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

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Bookings</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
                  </div>
                  <div className="bg-primary bg-opacity-10 p-3 rounded-full">
                    <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Revenue</p>
                    <p className="text-3xl font-bold text-gray-900">SAR {stats.totalRevenue.toLocaleString()}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Active Tours</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.activeTours}</p>
                  </div>
                  <div className="bg-secondary bg-opacity-10 p-3 rounded-full">
                    <svg className="w-8 h-8 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Users</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Recent Bookings</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tour</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{booking.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{booking.tour}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{booking.customer}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{booking.date}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">SAR {booking.amount}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            booking.status === 'Confirmed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

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
