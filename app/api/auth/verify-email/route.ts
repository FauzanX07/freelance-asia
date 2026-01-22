import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { hashToken, isExpired } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = body

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      )
    }

    // Hash the token to compare with stored hash
    const hashedToken = hashToken(token)

    // Find the verification token
    const verificationToken = await db.verificationToken.findUnique({
      where: { token: hashedToken },
    })

    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Invalid or expired verification link' },
        { status: 400 }
      )
    }

    // Check if token has expired
    if (isExpired(verificationToken.expires)) {
      // Delete expired token
      await db.verificationToken.delete({
        where: { token: hashedToken },
      })

      return NextResponse.json(
        { error: 'Verification link has expired. Please request a new one.' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await db.user.findUnique({
      where: { email: verificationToken.identifier },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 400 }
      )
    }

    // Check if already verified
    if (user.emailVerified) {
      // Delete token anyway
      await db.verificationToken.delete({
        where: { token: hashedToken },
      })

      return NextResponse.json({
        success: true,
        message: 'Email is already verified',
      })
    }

    // Update user and delete token in transaction
    await db.$transaction([
      db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      }),
      db.verificationToken.delete({
        where: { token: hashedToken },
      }),
    ])

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
    })
  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify email. Please try again.' },
      { status: 500 }
    )
  }
}
