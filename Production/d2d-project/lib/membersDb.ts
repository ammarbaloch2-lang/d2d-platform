import { Member, MemberEvent, Event } from '@/types/member'

// In-memory database for members
let members: Member[] = [
  {
    id: '1',
    name: 'Ahmed Al-Mansour',
    dob: '1990-05-15',
    idNumber: '1234567890',
    dateJoined: '2023-01-15',
    region: 'Riyadh',
    city: 'Riyadh',
    car: 'Toyota Land Cruiser',
    carType: 'SUV',
    nationality: 'Saudi',
    contactNumber: '+966501234567',
    email: 'ahmed@example.com',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Mohammed Al-Zahrani',
    dob: '1985-08-22',
    idNumber: '9876543210',
    dateJoined: '2023-03-20',
    region: 'Makkah',
    city: 'Jeddah',
    car: 'Nissan Patrol',
    carType: 'SUV',
    nationality: 'Saudi',
    contactNumber: '+966509876543',
    email: 'mohammed@example.com',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Fahad Al-Otaibi',
    dob: '1992-12-10',
    idNumber: '5555666677',
    dateJoined: '2023-06-05',
    region: 'Eastern Province',
    city: 'Dammam',
    car: 'Chevrolet Tahoe',
    carType: 'SUV',
    nationality: 'Saudi',
    contactNumber: '+966555666777',
    email: 'fahad@example.com',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// In-memory database for events
let events: Event[] = [
  {
    id: '1',
    name: 'Desert Safari Adventure',
    description: 'Full day desert safari and dune bashing',
    date: '2024-11-15',
    location: 'Empty Quarter',
    type: 'offroad',
    maxParticipants: 20,
    status: 'completed',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Edge of the World Trek',
    description: 'Hiking and camping at Edge of the World',
    date: '2024-12-01',
    location: 'Edge of the World',
    type: 'camping',
    maxParticipants: 15,
    status: 'upcoming',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// In-memory database for member events (attendance records)
let memberEvents: MemberEvent[] = [
  {
    id: '1',
    memberId: '1',
    eventId: '1',
    eventName: 'Desert Safari Adventure',
    eventDate: '2024-11-15',
    attended: true,
    role: 'participant',
  },
  {
    id: '2',
    memberId: '2',
    eventId: '1',
    eventName: 'Desert Safari Adventure',
    eventDate: '2024-11-15',
    attended: true,
    role: 'organizer',
  },
  {
    id: '3',
    memberId: '1',
    eventId: '2',
    eventName: 'Edge of the World Trek',
    eventDate: '2024-12-01',
    attended: false,
    role: 'participant',
  },
]

// Member CRUD operations
export const membersDb = {
  getAll: (): Member[] => members,

  getById: (id: string): Member | undefined => {
    return members.find(m => m.id === id)
  },

  create: (memberData: Omit<Member, 'id' | 'createdAt' | 'updatedAt'>): Member => {
    const newMember: Member = {
      ...memberData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    members.push(newMember)
    return newMember
  },

  update: (id: string, memberData: Partial<Member>): Member | null => {
    const index = members.findIndex(m => m.id === id)
    if (index === -1) return null

    members[index] = {
      ...members[index],
      ...memberData,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    }
    return members[index]
  },

  delete: (id: string): boolean => {
    const index = members.findIndex(m => m.id === id)
    if (index === -1) return false

    members.splice(index, 1)
    // Also delete related member events
    memberEvents = memberEvents.filter(me => me.memberId !== id)
    return true
  },
}

// Event CRUD operations
export const eventsDb = {
  getAll: (): Event[] => events,

  getById: (id: string): Event | undefined => {
    return events.find(e => e.id === id)
  },

  create: (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Event => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    events.push(newEvent)
    return newEvent
  },

  update: (id: string, eventData: Partial<Event>): Event | null => {
    const index = events.findIndex(e => e.id === id)
    if (index === -1) return null

    events[index] = {
      ...events[index],
      ...eventData,
      id,
      updatedAt: new Date().toISOString(),
    }
    return events[index]
  },

  delete: (id: string): boolean => {
    const index = events.findIndex(e => e.id === id)
    if (index === -1) return false

    events.splice(index, 1)
    // Also delete related member events
    memberEvents = memberEvents.filter(me => me.eventId !== id)
    return true
  },
}

// Member Events operations
export const memberEventsDb = {
  getByMemberId: (memberId: string): MemberEvent[] => {
    return memberEvents.filter(me => me.memberId === memberId)
  },

  getByEventId: (eventId: string): MemberEvent[] => {
    return memberEvents.filter(me => me.eventId === eventId)
  },

  create: (data: Omit<MemberEvent, 'id'>): MemberEvent => {
    const newMemberEvent: MemberEvent = {
      ...data,
      id: Date.now().toString(),
    }
    memberEvents.push(newMemberEvent)
    return newMemberEvent
  },

  delete: (id: string): boolean => {
    const index = memberEvents.findIndex(me => me.id === id)
    if (index === -1) return false

    memberEvents.splice(index, 1)
    return true
  },

  updateAttendance: (id: string, attended: boolean): MemberEvent | null => {
    const index = memberEvents.findIndex(me => me.id === id)
    if (index === -1) return null

    memberEvents[index].attended = attended
    return memberEvents[index]
  },
}
