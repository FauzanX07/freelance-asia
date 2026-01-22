import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { db } from '@/lib/db'

// Get portfolio items
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.freelancerProfileId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const portfolioItems = await db.portfolioItem.findMany({
      where: { freelancerProfileId: session.user.freelancerProfileId },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(portfolioItems)
  } catch (error) {
    console.error('Error fetching portfolio:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Add portfolio item
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.freelancerProfileId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, imageUrl, projectUrl, category, tags } = body

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    const portfolioItem = await db.portfolioItem.create({
      data: {
        freelancerProfileId: session.user.freelancerProfileId,
        title,
        description: description || null,
        imageUrl: imageUrl || null,
        projectUrl: projectUrl || null,
        category: category || null,
        tags: tags || [],
      },
    })

    return NextResponse.json(portfolioItem, { status: 201 })
  } catch (error) {
    console.error('Error creating portfolio item:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
