import { getServerSession } from 'next-auth'
import { authOptions } from './auth-options'
import { redirect } from 'next/navigation'
import { db } from './db'

/**
 * Get the current session on the server
 */
export async function getSession() {
  return getServerSession(authOptions)
}

/**
 * Get the current user from the session
 */
export async function getCurrentUser() {
  const session = await getSession()

  if (!session?.user?.id) {
    return null
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      freelancerProfile: true,
      clientProfile: true,
    },
  })

  return user
}

/**
 * Require authentication - redirect to login if not authenticated
 */
export async function requireAuth() {
  const session = await getSession()

  if (!session?.user) {
    redirect('/auth/login')
  }

  return session
}

/**
 * Require freelancer role - redirect if not a freelancer
 */
export async function requireFreelancer() {
  const session = await requireAuth()

  if (!session.user.freelancerProfileId) {
    redirect('/dashboard')
  }

  return session
}

/**
 * Require client role - redirect if not a client
 */
export async function requireClient() {
  const session = await requireAuth()

  if (!session.user.clientProfileId) {
    redirect('/dashboard')
  }

  return session
}

/**
 * Require admin role - redirect if not an admin
 */
export async function requireAdmin() {
  const session = await requireAuth()

  if (session.user.role !== 'ADMIN') {
    redirect('/dashboard')
  }

  return session
}

/**
 * Check if user has enough connects
 */
export async function checkConnects(userId: string, required: number): Promise<boolean> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { connects: true },
  })

  return (user?.connects ?? 0) >= required
}

/**
 * Deduct connects from user
 */
export async function deductConnects(userId: string, amount: number): Promise<boolean> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { connects: true },
  })

  if (!user || user.connects < amount) {
    return false
  }

  await db.user.update({
    where: { id: userId },
    data: { connects: { decrement: amount } },
  })

  return true
}

/**
 * Add connects to user
 */
export async function addConnects(userId: string, amount: number): Promise<void> {
  await db.user.update({
    where: { id: userId },
    data: { connects: { increment: amount } },
  })
}
