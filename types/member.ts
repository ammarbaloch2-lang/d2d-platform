export interface Member {
  id: string
  name: string
  dob: string // Date of birth
  idNumber: string // National ID or equivalent
  dateJoined: string
  region: string
  city: string
  car: string // Car model/make
  carType: string // SUV, Sedan, Truck, etc.
  nationality: string
  contactNumber: string
  email?: string
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export interface MemberEvent {
  id: string
  memberId: string
  eventId: string
  eventName: string
  eventDate: string
  attended: boolean
  role?: string // participant, organizer, etc.
}

export interface Event {
  id: string
  name: string
  description: string
  date: string
  location: string
  type: string // offroad, camping, tour, etc.
  maxParticipants?: number
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  createdAt: string
  updatedAt: string
}
