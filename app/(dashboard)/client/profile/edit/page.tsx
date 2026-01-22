import { requireClient } from '@/lib/session'
import { db } from '@/lib/db'
import { ClientProfileEditForm } from './client-profile-form'

export default async function ClientProfileEditPage() {
  const session = await requireClient()

  const profile = await db.clientProfile.findUnique({
    where: { id: session.user.clientProfileId! },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          avatar: true,
        },
      },
    },
  })

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-text-secondary">Profile not found</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-text-primary">Edit Client Profile</h1>
        <p className="text-text-secondary mt-1">
          Update your company information to attract top freelancers
        </p>
      </div>

      <ClientProfileEditForm profile={profile} />
    </div>
  )
}
