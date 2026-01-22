import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { ClientProfileView } from './profile-view'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params

  const profile = await db.clientProfile.findUnique({
    where: { id },
    include: {
      user: {
        select: { name: true },
      },
    },
  })

  if (!profile) {
    return { title: 'Client Not Found | FreelanceAsia' }
  }

  const displayName = profile.companyName || profile.user.name || 'Client'

  return {
    title: `${displayName} | FreelanceAsia`,
    description: profile.description?.slice(0, 160) || `View ${displayName}'s profile on FreelanceAsia`,
  }
}

export default async function ClientProfilePage({ params }: PageProps) {
  const { id } = await params

  const profile = await db.clientProfile.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          name: true,
          avatar: true,
          createdAt: true,
        },
      },
      jobs: {
        where: { status: 'OPEN' },
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          skills: {
            include: {
              skill: true,
            },
          },
        },
      },
      reviews: {
        include: {
          freelancer: {
            include: {
              user: {
                select: {
                  name: true,
                  avatar: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
      _count: {
        select: {
          jobs: true,
          contracts: true,
          reviews: true,
        },
      },
    },
  })

  if (!profile) {
    notFound()
  }

  return <ClientProfileView profile={profile} />
}
