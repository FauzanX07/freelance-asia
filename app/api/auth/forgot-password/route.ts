import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { generateToken, hashToken, generateExpiration } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({
        success: true,
        message: 'If an account exists with this email, you will receive a password reset link.',
      })
    }

    // Check if user signed up with OAuth (no password)
    if (!user.password) {
      return NextResponse.json({
        success: true,
        message: 'If an account exists with this email, you will receive a password reset link.',
      })
    }

    // Delete any existing reset tokens for this user
    await db.passwordResetToken.deleteMany({
      where: { email: user.email },
    })

    // Generate new reset token
    const resetToken = generateToken()
    const hashedToken = hashToken(resetToken)

    // Save token to database
    await db.passwordResetToken.create({
      data: {
        email: user.email,
        token: hashedToken,
        expires: generateExpiration(1), // 1 hour
      },
    })

    // Build reset URL
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password/${resetToken}`

    // TODO: Send email with reset link
    // await sendPasswordResetEmail(user.email, resetUrl)

    // Log for development
    console.log('Password reset link:', resetUrl)

    return NextResponse.json({
      success: true,
      message: 'If an account exists with this email, you will receive a password reset link.',
      // Remove this in production - only for development
      ...(process.env.NODE_ENV === 'development' && { resetUrl }),
    })
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    )
  }
}
