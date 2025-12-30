import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request is for an admin route (excluding login and API auth routes)
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow access to login page and auth API routes
    if (
      request.nextUrl.pathname === '/admin/login' ||
      request.nextUrl.pathname.startsWith('/api/admin/auth')
    ) {
      return NextResponse.next()
    }

    // Check for authentication cookie
    const authCookie = request.cookies.get('admin-auth')

    if (!authCookie || authCookie.value !== 'authenticated') {
      // Redirect to login page if not authenticated
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
