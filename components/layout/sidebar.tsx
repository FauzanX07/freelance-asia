'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import {
  LayoutDashboard,
  Search,
  Briefcase,
  Trophy,
  Bookmark,
  FileText,
  FolderKanban,
  MessageSquare,
  DollarSign,
  User,
  Settings,
  PlusCircle,
  Users,
  ShoppingBag,
  CreditCard,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string | number
}

interface NavSection {
  title?: string
  items: NavItem[]
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { data: session } = useSession()

  const user = session?.user
  const isFreelancer = !!user?.freelancerProfileId
  const isClient = !!user?.clientProfileId

  // Freelancer navigation
  const freelancerNav: NavSection[] = [
    {
      items: [{ label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard }],
    },
    {
      title: 'Find Work',
      items: [
        { label: 'Browse Jobs', href: '/jobs', icon: Search },
        { label: 'Browse Contests', href: '/contests', icon: Trophy },
        { label: 'Saved Jobs', href: '/saved-jobs', icon: Bookmark },
      ],
    },
    {
      title: 'My Business',
      items: [
        { label: 'My Gigs', href: '/gigs', icon: ShoppingBag },
        { label: 'Proposals', href: '/proposals', icon: FileText },
        { label: 'Contracts', href: '/contracts', icon: FolderKanban },
      ],
    },
    {
      items: [
        { label: 'Messages', href: '/messages', icon: MessageSquare },
        { label: 'Earnings', href: '/earnings', icon: DollarSign },
      ],
    },
    {
      items: [
        { label: 'Profile', href: '/freelancer/profile/edit', icon: User },
        { label: 'Settings', href: '/settings', icon: Settings },
      ],
    },
  ]

  // Client navigation
  const clientNav: NavSection[] = [
    {
      items: [{ label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard }],
    },
    {
      title: 'Hire',
      items: [
        { label: 'Post a Job', href: '/jobs/post', icon: PlusCircle },
        { label: 'Post a Contest', href: '/contests/create', icon: Trophy },
        { label: 'My Jobs', href: '/my-jobs', icon: Briefcase },
        { label: 'My Contests', href: '/my-contests', icon: Trophy },
      ],
    },
    {
      title: 'Find Talent',
      items: [
        { label: 'Browse Freelancers', href: '/freelancers', icon: Users },
        { label: 'Browse Gigs', href: '/gigs/browse', icon: ShoppingBag },
        { label: 'Saved Talent', href: '/saved-talent', icon: Bookmark },
      ],
    },
    {
      items: [
        { label: 'Contracts', href: '/contracts', icon: FolderKanban },
        { label: 'Messages', href: '/messages', icon: MessageSquare },
        { label: 'Transactions', href: '/transactions', icon: CreditCard },
      ],
    },
    {
      items: [
        { label: 'Profile', href: '/client/profile/edit', icon: User },
        { label: 'Settings', href: '/settings', icon: Settings },
      ],
    },
  ]

  // Use appropriate nav based on role
  const navigation = isFreelancer ? freelancerNav : isClient ? clientNav : freelancerNav

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed bottom-0 left-0 top-16 z-30 w-64 transform border-r border-secondary-200 bg-white transition-transform duration-200',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <nav className="custom-scrollbar h-full overflow-y-auto p-4">
          {navigation.map((section, sectionIndex) => (
            <div key={sectionIndex} className={cn(sectionIndex > 0 && 'mt-6')}>
              {section.title && (
                <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-secondary-400">
                  {section.title}
                </h3>
              )}
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-primary-50 text-primary-600'
                            : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                        )}
                      >
                        <item.icon className={cn('h-5 w-5', isActive && 'text-primary-500')} />
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}
