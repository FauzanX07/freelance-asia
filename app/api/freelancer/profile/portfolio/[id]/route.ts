import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { db } from '@/lib/db'

// Update portfolio item
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    const { id } = await params

    if (!session?.user?.freelancerProfileId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify ownership
    const existingItem = await db.portfolioItem.findUnique({
      where: { id },
    })

    if (!existingItem || existingItem.freelancerProfileId !== session.user.freelancerProfileId) {
      return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 })
    }

    const body = await request.json()
    const { title, description, imageUrl, projectUrl, category, tags } = body

    const updatedItem = await db.portfolioItem.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(projectUrl !== undefined && { projectUrl }),
        ...(category !== undefined && { category }),
        ...(tags !== undefined && { tags }),
      },
    })

    return NextResponse.json(updatedItem)
  } catch (error) {
    console.error('Error updating portfolio item:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Delete portfolio item
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    const { id } = await params

    if (!session?.user?.freelancerProfileId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify ownership
    const existingItem = await db.portfolioItem.findUnique({
      where: { id },
    })

    if (!existingItem || existingItem.freelancerProfileId !== session.user.freelancerProfileId) {
      return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 })
    }

    await db.portfolioItem.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Portfolio item deleted' })
  } catch (error) {
    console.error('Error deleting portfolio item:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
