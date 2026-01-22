import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.clientProfileId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const profile = await db.clientProfile.findUnique({
      where: { id: session.user.clientProfileId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            avatar: true,
          },
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
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error fetching client profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.clientProfileId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    // Fields that can be updated
    const allowedFields = [
      'companyName',
      'companyWebsite',
      'companySize',
      'industry',
      'description',
      'location',
      'timezone',
    ]

    // Filter only allowed fields
    const updateData: Record<string, any> = {}
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field]
      }
    }

    const updatedProfile = await db.clientProfile.update({
      where: { id: session.user.clientProfileId },
      data: updateData,
    })

    return NextResponse.json(updatedProfile)
  } catch (error) {
    console.error('Error updating client profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
