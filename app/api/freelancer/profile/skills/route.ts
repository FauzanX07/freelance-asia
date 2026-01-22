import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { db } from '@/lib/db'

// Add skills to freelancer profile
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.freelancerProfileId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { skillIds } = body

    if (!Array.isArray(skillIds) || skillIds.length === 0) {
      return NextResponse.json({ error: 'Invalid skill IDs' }, { status: 400 })
    }

    // Add skills to profile (ignore duplicates)
    const createData = skillIds.map((skillId: string) => ({
      freelancerProfileId: session.user.freelancerProfileId!,
      skillId,
    }))

    await db.freelancerSkill.createMany({
      data: createData,
      skipDuplicates: true,
    })

    // Fetch updated skills
    const updatedSkills = await db.freelancerSkill.findMany({
      where: { freelancerProfileId: session.user.freelancerProfileId },
      include: { skill: true },
    })

    return NextResponse.json(updatedSkills)
  } catch (error) {
    console.error('Error adding skills:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Remove skills from freelancer profile
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.freelancerProfileId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { skillIds } = body

    if (!Array.isArray(skillIds) || skillIds.length === 0) {
      return NextResponse.json({ error: 'Invalid skill IDs' }, { status: 400 })
    }

    // Remove skills from profile
    await db.freelancerSkill.deleteMany({
      where: {
        freelancerProfileId: session.user.freelancerProfileId,
        skillId: { in: skillIds },
      },
    })

    // Fetch updated skills
    const updatedSkills = await db.freelancerSkill.findMany({
      where: { freelancerProfileId: session.user.freelancerProfileId },
      include: { skill: true },
    })

    return NextResponse.json(updatedSkills)
  } catch (error) {
    console.error('Error removing skills:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Get all available skills
export async function GET() {
  try {
    const skills = await db.skill.findMany({
      orderBy: [{ category: 'asc' }, { name: 'asc' }],
    })

    return NextResponse.json(skills)
  } catch (error) {
    console.error('Error fetching skills:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
