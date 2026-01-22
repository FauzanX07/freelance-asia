'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import {
  Search,
  Bell,
  MessageSquare,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Zap,
  Menu,
  X,
} from 'lucide-react'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface NavbarProps {
  onMenuClick?: () => void
  isSidebarOpen?: boolean
}

export function Navbar({ onMenuClick, isSidebarOpen }: NavbarProps) {
  const { data: session } = useSession()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const user = session?.user
  const isFreelancer = !!user?.freelancerProfileId
  const isClient = !!user?.clientProfileId

  return (
    <header className="fixed left-0 right-0 top-0 z-40 h-16 border-b border-secondary-200 bg-white">
      <div className="flex h-full items-center justify-between px-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 hover:bg-secondary-100 lg:hidden"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo */}
          <Link href="/dashboard" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="FreelanceAsia"
              width={140}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Search Bar - Center */}
        <div className="mx-4 hidden max-w-xl flex-1 md:block">
          <div
            className={cn(
              'relative flex items-center rounded-lg border bg-secondary-50 transition-all',
              isSearchFocused ? 'border-primary-500 ring-2 ring-primary-500/20' : 'border-secondary-200'
            )}
          >
            <Search className="ml-3 h-4 w-4 text-secondary-400" />
            <input
              type="text"
              placeholder="Search for freelancers, jobs, or gigs..."
              className="w-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-secondary-400"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Connects (Freelancers only) */}
          {isFreelancer && (
            <Link
              href="/connects"
              className="hidden items-center gap-1.5 rounded-lg border border-secondary-200 px-3 py-1.5 text-sm font-medium text-secondary-700 hover:bg-secondary-50 sm:flex"
            >
              <Zap className="h-4 w-4 text-primary-500" />
              <span>{user?.connects || 0}</span>
            </Link>
          )}

          {/* Messages */}
          <Link
            href="/messages"
            className="relative rounded-lg p-2 text-secondary-600 hover:bg-secondary-100"
          >
            <MessageSquare className="h-5 w-5" />
            {/* Unread badge */}
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary-500" />
          </Link>

          {/* Notifications */}
          <Link
            href="/notifications"
            className="relative rounded-lg p-2 text-secondary-600 hover:bg-secondary-100"
          >
            <Bell className="h-5 w-5" />
            {/* Unread badge */}
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary-500" />
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-secondary-100"
            >
              <Avatar
                src={user?.image}
                name={user?.name || ''}
                size="sm"
              />
              <ChevronDown className="hidden h-4 w-4 text-secondary-500 sm:block" />
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsProfileOpen(false)}
                />
                <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-lg border border-secondary-200 bg-white py-2 shadow-dropdown">
                  {/* User Info */}
                  <div className="border-b border-secondary-100 px-4 pb-3 pt-1">
                    <p className="font-medium text-secondary-900">{user?.name}</p>
                    <p className="text-sm text-secondary-500">{user?.email}</p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    {isFreelancer && (
                      <Link
                        href="/freelancer/profile/edit"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                      >
                        <User className="h-4 w-4" />
                        Freelancer Profile
                      </Link>
                    )}
                    {isClient && (
                      <Link
                        href="/client/profile/edit"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                      >
                        <User className="h-4 w-4" />
                        Client Profile
                      </Link>
                    )}
                    <Link
                      href="/settings"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </div>

                  {/* Switch Role */}
                  {isFreelancer && isClient && (
                    <div className="border-t border-secondary-100 py-2">
                      <button className="flex w-full items-center gap-3 px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50">
                        <Zap className="h-4 w-4" />
                        Switch to {user?.role === 'FREELANCER' ? 'Client' : 'Freelancer'}
                      </button>
                    </div>
                  )}

                  {/* Logout */}
                  <div className="border-t border-secondary-100 pt-2">
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="flex w-full items-center gap-3 px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Log Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
