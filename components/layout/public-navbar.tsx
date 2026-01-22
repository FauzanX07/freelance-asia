'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export function PublicNavbar() {
  const { data: session } = useSession()

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="FreelanceAsia"
            width={40}
            height={40}
            className="rounded"
          />
          <span className="text-xl font-bold text-primary">FreelanceAsia</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/jobs" className="text-text-secondary hover:text-primary transition-colors">
            Find Jobs
          </Link>
          <Link href="/gigs" className="text-text-secondary hover:text-primary transition-colors">
            Browse Gigs
          </Link>
          <Link href="/freelancers" className="text-text-secondary hover:text-primary transition-colors">
            Find Freelancers
          </Link>
          <Link href="/contests" className="text-text-secondary hover:text-primary transition-colors">
            Contests
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {session ? (
            <Link href="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost">Log In</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
