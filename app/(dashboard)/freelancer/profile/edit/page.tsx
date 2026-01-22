import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { db } from '@/lib/db'
import { ProfileEditTabs } from './profile-edit-tabs'

export const metadata = {
  title: 'Edit Profile',
  description: 'Edit your freelancer profile',
}

export default async function FreelancerProfileEditPage() {
  const session = await getSession()

  if (!session?.user?.freelancerProfileId) {
    redirect('/dashboard')
  }

  const profile = await db.freelancerProfile.findUnique({
    where: { id: session.user.freelancerProfileId },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          avatar: true,
        },
      },
      skills: {
        include: {
          skill: true,
        },
      },
      portfolioItems: {
        orderBy: { createdAt: 'desc' },
      },
      badges: {
        include: {
          badge: true,
        },
      },
    },
  })

  if (!profile) {
    redirect('/dashboard')
  }

  // Get all available skills for the skills selector
  const allSkills = await db.skill.findMany({
    orderBy: [{ isPopular: 'desc' }, { name: 'asc' }],
  })

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Edit Your Profile</h1>
        <p className="mt-1 text-secondary-500">
          Complete your profile to increase visibility and attract more clients
        </p>
      </div>

      {/* Profile Edit Tabs */}
      <ProfileEditTabs
        profile={JSON.parse(JSON.stringify(profile))}
        allSkills={JSON.parse(JSON.stringify(allSkills))}
      />
    </div>
  )
}
