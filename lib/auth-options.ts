import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from './db'
import { verifyPassword } from './auth'
import type { Adapter } from 'next-auth/adapters'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/onboarding',
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Email and Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required')
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
          include: {
            freelancerProfile: { select: { id: true } },
            clientProfile: { select: { id: true } },
          },
        })

        if (!user) {
          throw new Error('No account found with this email')
        }

        if (!user.password) {
          throw new Error('Please sign in with Google')
        }

        if (!user.isActive) {
          throw new Error('Your account has been deactivated')
        }

        const isValid = await verifyPassword(credentials.password, user.password)

        if (!isValid) {
          throw new Error('Invalid password')
        }

        // Update last seen
        await db.user.update({
          where: { id: user.id },
          data: { lastSeen: new Date() },
        })

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.avatar,
          role: user.role,
          emailVerified: user.emailVerified,
          freelancerProfileId: user.freelancerProfile?.id || null,
          clientProfileId: user.clientProfile?.id || null,
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: 'CLIENT', // Default role for Google sign-in, can be changed later
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // For OAuth providers, check if user is active
      if (account?.provider !== 'credentials') {
        const existingUser = await db.user.findUnique({
          where: { email: user.email! },
        })

        if (existingUser && !existingUser.isActive) {
          return false
        }
      }

      return true
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.emailVerified = user.emailVerified
        token.freelancerProfileId = user.freelancerProfileId
        token.clientProfileId = user.clientProfileId
      }

      // Handle session updates (e.g., after role change)
      if (trigger === 'update' && session) {
        token.role = session.role
        token.freelancerProfileId = session.freelancerProfileId
        token.clientProfileId = session.clientProfileId
      }

      // Refresh user data from DB periodically
      if (token.id) {
        const dbUser = await db.user.findUnique({
          where: { id: token.id as string },
          include: {
            freelancerProfile: { select: { id: true } },
            clientProfile: { select: { id: true } },
          },
        })

        if (dbUser) {
          token.role = dbUser.role
          token.emailVerified = dbUser.emailVerified
          token.freelancerProfileId = dbUser.freelancerProfile?.id || null
          token.clientProfileId = dbUser.clientProfile?.id || null
          token.connects = dbUser.connects
        }
      }

      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.emailVerified = token.emailVerified as Date | null
        session.user.freelancerProfileId = token.freelancerProfileId as string | null
        session.user.clientProfileId = token.clientProfileId as string | null
        session.user.connects = token.connects as number
      }

      return session
    },
  },
  events: {
    async signIn({ user }) {
      // Update last seen on sign in
      await db.user.update({
        where: { id: user.id },
        data: { lastSeen: new Date() },
      })
    },
  },
  debug: process.env.NODE_ENV === 'development',
}
