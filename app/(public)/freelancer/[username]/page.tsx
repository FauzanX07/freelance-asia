import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { FreelancerProfileView } from './profile-view'

interface PageProps {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { username } = await params

  const profile = await db.freelancerProfile.findFirst({
    where: { username },
    include: {
      user: {
        select: { name: true },
      },
    },
  })

  if (!profile) {
    return { title: 'Freelancer Not Found | FreelanceAsia' }
  }

  return {
    title: `${profile.user.name || profile.username} - ${profile.title || 'Freelancer'} | FreelanceAsia`,
    description: profile.bio?.slice(0, 160) || `Hire ${profile.user.name} on FreelanceAsia`,
  }
}

export default async function FreelancerProfilePage({ params }: PageProps) {
  const { username } = await params

  const profile = await db.freelancerProfile.findFirst({
    where: { username },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          avatar: true,
          createdAt: true,
        },
      },
      skills: {
        include: {
          skill: true,
        },
      },
      portfolioItems: {
        orderBy: { createdAt: 'desc' },
        take: 6,
      },
      badges: {
        include: {
          badge: true,
        },
      },
      reviews: {
        include: {
          client: {
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
      gigs: {
        where: { status: 'ACTIVE' },
        include: {
          packages: true,
        },
        orderBy: { createdAt: 'desc' },
        take: 3,
      },
      _count: {
        select: {
          completedContracts: true,
          reviews: true,
        },
      },
    },
  })

  if (!profile) {
    notFound()
  }

  return <FreelancerProfileView profile={profile} />
}
