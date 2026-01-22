import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.freelancerProfileId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
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
        portfolioItems: true,
        badges: {
          include: {
            badge: true,
          },
        },
      },
    })

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.freelancerProfileId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    // Fields that can be updated
    const allowedFields = [
      'title',
      'bio',
      'hourlyRate',
      'availability',
      'experienceLevel',
      'city',
      'timezone',
      'languages',
    ]

    // Filter only allowed fields
    const updateData: Record<string, any> = {}
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field]
      }
    }

    // Convert hourlyRate to Decimal if provided
    if (updateData.hourlyRate !== undefined) {
      updateData.hourlyRate = parseFloat(updateData.hourlyRate)
    }

    const updatedProfile = await db.freelancerProfile.update({
      where: { id: session.user.freelancerProfileId },
      data: updateData,
    })

    return NextResponse.json(updatedProfile)
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
