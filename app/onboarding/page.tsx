import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getSession, getCurrentUser } from '@/lib/session'
import { Button } from '@/components/ui/button'
import { CheckCircle2, ArrowRight, User, Briefcase } from 'lucide-react'

export default async function OnboardingPage() {
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

  return (
    <div className="min-h-screen bg-background-secondary">
      {/* Header */}
      <header className="border-b border-secondary-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="FreelanceAsia"
              width={160}
              height={36}
              className="h-9 w-auto"
              priority
            />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-4 py-12">
        {/* Welcome Message */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
            <CheckCircle2 className="h-8 w-8 text-primary-500" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900">
            Welcome to FreelanceAsia, {user.name.split(' ')[0]}!
          </h1>
          <p className="mt-2 text-lg text-secondary-500">
            Your account has been created successfully. Let's get you started.
          </p>
        </div>

        {/* Next Steps */}
        <div className="space-y-4">
          {isFreelancer && (
            <div className="rounded-card border border-secondary-200 bg-white p-6 shadow-card">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-100">
                  <User className="h-6 w-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-secondary-900">
                    Complete Your Freelancer Profile
                  </h2>
                  <p className="mt-1 text-secondary-500">
                    A complete profile helps you stand out to clients. Add your skills, portfolio,
                    and set your hourly rate.
                  </p>
                  <div className="mt-4">
                    <Link href="/freelancer/profile/edit">
                      <Button>
                        Complete Profile
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isClient && (
            <div className="rounded-card border border-secondary-200 bg-white p-6 shadow-card">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-info-50">
                  <Briefcase className="h-6 w-6 text-info-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-secondary-900">Post Your First Job</h2>
                  <p className="mt-1 text-secondary-500">
                    Ready to hire? Post a job and start receiving proposals from talented Asian
                    freelancers.
                  </p>
                  <div className="mt-4">
                    <Link href="/jobs/post">
                      <Button variant="outline">
                        Post a Job
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Email Verification Reminder */}
          {!user.emailVerified && (
            <div className="rounded-lg border border-warning-200 bg-warning-50 p-4">
              <p className="text-sm text-warning-800">
                <strong>Verify your email:</strong> We've sent a verification link to{' '}
                <span className="font-medium">{user.email}</span>. Please verify your email to
                access all features.
              </p>
            </div>
          )}
        </div>

        {/* Skip to Dashboard */}
        <div className="mt-8 text-center">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-primary-500 hover:text-primary-600"
          >
            Skip for now and go to Dashboard
          </Link>
        </div>
      </main>
    </div>
  )
}
