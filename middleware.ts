import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const { pathname } = req.nextUrl

    // If no token and trying to access protected route, redirect to login
    if (!token) {
      const loginUrl = new URL('/auth/login', req.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Role-based route protection
    const isFreelancerRoute = pathname.startsWith('/freelancer') || pathname.startsWith('/gigs/create')
    const isClientRoute = pathname.startsWith('/client') || pathname.startsWith('/jobs/post')
    const isAdminRoute = pathname.startsWith('/admin')

    // Check freelancer routes
    if (isFreelancerRoute && !token.freelancerProfileId) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // Check client routes
    if (isClientRoute && !token.clientProfileId) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // Check admin routes
    if (isAdminRoute && token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

// Protected routes that require authentication
export const config = {
  matcher: [
    // Dashboard and main app routes
    '/dashboard/:path*',
    '/onboarding/:path*',

    // Freelancer routes
    '/freelancer/:path*',
    '/gigs/create',
    '/gigs/:id/edit',
    '/proposals/:path*',
    '/earnings/:path*',

    // Client routes
    '/client/:path*',
    '/jobs/post',
    '/jobs/:id/edit',
    '/my-jobs/:path*',
    '/contests/create',
    '/contracts/:path*',

    // Shared protected routes
    '/messages/:path*',
    '/settings/:path*',
    '/notifications/:path*',
    '/connects/:path*',

    // Admin routes
    '/admin/:path*',
  ],
}
