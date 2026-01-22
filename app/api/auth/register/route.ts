import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { hashPassword, generateToken, hashToken, generateExpiration, generateUsername } from '@/lib/auth'
import { isAsianCountry } from '@/constants/countries'
import { DEFAULT_FREE_CONNECTS } from '@/constants/enums'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, role, country } = body

    // Validate required fields
    if (!name || !email || !password || !role || !country) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // Validate role
    if (!['CLIENT', 'FREELANCER', 'BOTH'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      )
    }

    // Validate country for freelancers
    if ((role === 'FREELANCER' || role === 'BOTH') && !isAsianCountry(country)) {
      return NextResponse.json(
        { error: 'Freelancers must be based in an Asian country' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingUser = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Generate verification token
    const verificationToken = generateToken()
    const hashedVerificationToken = hashToken(verificationToken)

    // Determine user role (BOTH users start as FREELANCER by default)
    const userRole = role === 'BOTH' ? 'FREELANCER' : role

    // Create user and profiles in a transaction
    const user = await db.$transaction(async (tx) => {
      // Create user
      const newUser = await tx.user.create({
        data: {
          name,
          email: email.toLowerCase(),
          password: hashedPassword,
          role: userRole,
          connects: (role === 'FREELANCER' || role === 'BOTH') ? DEFAULT_FREE_CONNECTS : 0,
        },
      })

      // Create freelancer profile if freelancer or both
      if (role === 'FREELANCER' || role === 'BOTH') {
        const username = generateUsername(email)
        await tx.freelancerProfile.create({
          data: {
            userId: newUser.id,
            username,
            country,
          },
        })
      }

      // Create client profile if client or both
      if (role === 'CLIENT' || role === 'BOTH') {
        await tx.clientProfile.create({
          data: {
            userId: newUser.id,
            country: role === 'CLIENT' ? country : undefined,
          },
        })
      }

      // Create verification token
      await tx.verificationToken.create({
        data: {
          identifier: newUser.email,
          token: hashedVerificationToken,
          expires: generateExpiration(24), // 24 hours
        },
      })

      return newUser
    })

    // TODO: Send verification email
    // await sendVerificationEmail(user.email, verificationToken)

    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully. Please check your email to verify your account.',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Failed to create account. Please try again.' },
      { status: 500 }
    )
  }
}
