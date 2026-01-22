import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession, getCurrentUser } from '@/lib/session'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProfileProgress } from '@/components/ui/progress'
import { formatCountry } from '@/constants/countries'
import { SellerLevelLabels } from '@/constants/enums'
import {
  Briefcase,
  TrendingUp,
  DollarSign,
  Star,
  Clock,
  CheckCircle,
  FileText,
  Users,
} from 'lucide-react'

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) {
    redirect('/auth/login')
  }

  const user = await getCurrentUser()

  if (!user) {
    redirect('/auth/login')
  }

  const isFreelancer = !!user.freelancerProfile
  const isClient = !!user.clientProfile

  // Calculate profile completion for freelancers
  const profileCompletion = isFreelancer
    ? calculateProfileCompletion(user.freelancerProfile)
    : null

  const profileTips = isFreelancer ? getProfileTips(user.freelancerProfile) : []

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">
          Welcome back, {user.name.split(' ')[0]}!
        </h1>
        <p className="mt-1 text-secondary-500">
          Here's what's happening with your account today.
        </p>
      </div>

      {/* Email Verification Warning */}
      {!user.emailVerified && (
        <div className="rounded-lg border border-warning-200 bg-warning-50 p-4">
          <p className="text-sm text-warning-800">
            <strong>Verify your email:</strong> Please check your inbox and verify your email
            address to access all features.
          </p>
        </div>
      )}

      {/* Freelancer Dashboard */}
      {isFreelancer && (
        <>
          {/* Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                  <DollarSign className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm text-secondary-500">Total Earnings</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    ${Number(user.freelancerProfile!.totalEarnings).toFixed(0)}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success-50">
                  <CheckCircle className="h-6 w-6 text-success-600" />
                </div>
                <div>
                  <p className="text-sm text-secondary-500">Completed Jobs</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    {user.freelancerProfile!.completedJobs}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning-50">
                  <Star className="h-6 w-6 text-warning-600" />
                </div>
                <div>
                  <p className="text-sm text-secondary-500">Rating</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    {Number(user.freelancerProfile!.rating).toFixed(1)}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-info-50">
                  <Clock className="h-6 w-6 text-info-600" />
                </div>
                <div>
                  <p className="text-sm text-secondary-500">On-Time Delivery</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    {Number(user.freelancerProfile!.onTimeDelivery).toFixed(0)}%
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Completion & Quick Actions */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Profile Completion */}
            <div className="lg:col-span-1">
              <ProfileProgress
                percentage={profileCompletion || 0}
                tips={profileTips}
              />
            </div>

            {/* Freelancer Info */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Your Freelancer Profile</span>
                  <Badge variant={getLevelBadgeVariant(user.freelancerProfile!.sellerLevel)}>
                    {SellerLevelLabels[user.freelancerProfile!.sellerLevel as keyof typeof SellerLevelLabels]}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-secondary-500">Username</p>
                    <p className="font-medium">@{user.freelancerProfile!.username}</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-500">Location</p>
                    <p className="font-medium">{formatCountry(user.freelancerProfile!.country)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-500">Hourly Rate</p>
                    <p className="font-medium">
                      {user.freelancerProfile!.hourlyRate
                        ? `$${Number(user.freelancerProfile!.hourlyRate).toFixed(0)}/hr`
                        : 'Not set'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-500">Availability</p>
                    <p className="font-medium capitalize">
                      {user.freelancerProfile!.availability.toLowerCase().replace('_', ' ')}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/freelancer/profile/edit">
                    <Button variant="outline" size="sm">
                      Edit Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/jobs">
              <Card className="cursor-pointer transition-shadow hover:shadow-card-hover">
                <CardContent className="flex items-center gap-4 p-6">
                  <Briefcase className="h-8 w-8 text-primary-500" />
                  <div>
                    <p className="font-medium text-secondary-900">Browse Jobs</p>
                    <p className="text-sm text-secondary-500">Find your next project</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/proposals">
              <Card className="cursor-pointer transition-shadow hover:shadow-card-hover">
                <CardContent className="flex items-center gap-4 p-6">
                  <FileText className="h-8 w-8 text-info-500" />
                  <div>
                    <p className="font-medium text-secondary-900">My Proposals</p>
                    <p className="text-sm text-secondary-500">Track your applications</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/gigs">
              <Card className="cursor-pointer transition-shadow hover:shadow-card-hover">
                <CardContent className="flex items-center gap-4 p-6">
                  <TrendingUp className="h-8 w-8 text-success-500" />
                  <div>
                    <p className="font-medium text-secondary-900">My Gigs</p>
                    <p className="text-sm text-secondary-500">Manage your services</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </>
      )}

      {/* Client Dashboard */}
      {isClient && (
        <>
          {/* Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                  <DollarSign className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm text-secondary-500">Total Spent</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    ${Number(user.clientProfile!.totalSpent).toFixed(0)}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-info-50">
                  <Briefcase className="h-6 w-6 text-info-600" />
                </div>
                <div>
                  <p className="text-sm text-secondary-500">Jobs Posted</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    {user.clientProfile!.jobsPosted}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success-50">
                  <CheckCircle className="h-6 w-6 text-success-600" />
                </div>
                <div>
                  <p className="text-sm text-secondary-500">Hire Rate</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    {Number(user.clientProfile!.hireRate).toFixed(0)}%
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning-50">
                  <Users className="h-6 w-6 text-warning-600" />
                </div>
                <div>
                  <p className="text-sm text-secondary-500">Avg Hourly Paid</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    ${Number(user.clientProfile!.avgHourlyPaid).toFixed(0)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/jobs/post">
              <Card className="cursor-pointer transition-shadow hover:shadow-card-hover">
                <CardContent className="flex items-center gap-4 p-6">
                  <Briefcase className="h-8 w-8 text-primary-500" />
                  <div>
                    <p className="font-medium text-secondary-900">Post a Job</p>
                    <p className="text-sm text-secondary-500">Find skilled freelancers</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/freelancers">
              <Card className="cursor-pointer transition-shadow hover:shadow-card-hover">
                <CardContent className="flex items-center gap-4 p-6">
                  <Users className="h-8 w-8 text-info-500" />
                  <div>
                    <p className="font-medium text-secondary-900">Browse Freelancers</p>
                    <p className="text-sm text-secondary-500">Explore Asian talent</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/my-jobs">
              <Card className="cursor-pointer transition-shadow hover:shadow-card-hover">
                <CardContent className="flex items-center gap-4 p-6">
                  <FileText className="h-8 w-8 text-success-500" />
                  <div>
                    <p className="font-medium text-secondary-900">My Jobs</p>
                    <p className="text-sm text-secondary-500">Manage your postings</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

// Helper functions
function calculateProfileCompletion(profile: any): number {
  const fields = [
    profile.title,
    profile.bio,
    profile.hourlyRate,
    profile.city,
    profile.avatar,
  ]

  const languages = profile.languages as any[]
  const hasLanguages = languages && languages.length > 0

  const completedFields = fields.filter(Boolean).length + (hasLanguages ? 1 : 0)
  const totalFields = fields.length + 1

  return Math.round((completedFields / totalFields) * 100)
}

function getProfileTips(profile: any): string[] {
  const tips: string[] = []

  if (!profile.title) tips.push('Add a professional title')
  if (!profile.bio) tips.push('Write a compelling bio')
  if (!profile.hourlyRate) tips.push('Set your hourly rate')
  if (!profile.city) tips.push('Add your city')

  const languages = profile.languages as any[]
  if (!languages || languages.length === 0) {
    tips.push('Add languages you speak')
  }

  return tips
}

function getLevelBadgeVariant(level: string) {
  switch (level) {
    case 'NEW':
      return 'new' as const
    case 'LEVEL_1':
      return 'level1' as const
    case 'LEVEL_2':
      return 'level2' as const
    case 'TOP_RATED':
      return 'topRated' as const
    case 'PRO':
      return 'pro' as const
    default:
      return 'secondary' as const
  }
}
