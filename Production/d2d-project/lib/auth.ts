// Simple authentication configuration
// In production, this would use a database and proper password hashing

export interface User {
  id: string
  email: string
  password: string
  role: 'admin' | 'operator' | 'user'
  name: string
}

// Demo users - DO NOT use in production!
export const DEMO_USERS: User[] = [
  {
    id: '1',
    email: 'admin@d2d.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User'
  },
  {
    id: '2',
    email: 'operator@d2d.com',
    password: 'operator123',
    role: 'operator',
    name: 'Tour Operator'
  },
  {
    id: '3',
    email: 'user@example.com',
    password: 'user123',
    role: 'user',
    name: 'Test User'
  }
]

export function authenticateUser(email: string, password: string): User | null {
  const user = DEMO_USERS.find(
    u => u.email === email && u.password === password
  )
  return user || null
}

export function isAdmin(user: User | null): boolean {
  return user?.role === 'admin'
}

export function isOperator(user: User | null): boolean {
  return user?.role === 'operator' || user?.role === 'admin'
}
