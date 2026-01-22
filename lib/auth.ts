import bcrypt from 'bcryptjs'
import { randomBytes, createHash } from 'crypto'

const SALT_ROUNDS = 12

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS)
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

/**
 * Generate a secure random token
 */
export function generateToken(length: number = 32): string {
  return randomBytes(length).toString('hex')
}

/**
 * Hash a token for storage (don't store raw tokens in DB)
 */
export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}

/**
 * Generate expiration date
 */
export function generateExpiration(hours: number = 24): Date {
  return new Date(Date.now() + hours * 60 * 60 * 1000)
}

/**
 * Check if a date has expired
 */
export function isExpired(date: Date): boolean {
  return new Date() > new Date(date)
}

/**
 * Generate a unique username from email or name
 */
export function generateUsername(input: string): string {
  const base = input
    .toLowerCase()
    .replace(/@.*$/, '') // Remove email domain
    .replace(/[^a-z0-9]/g, '') // Remove special chars
    .slice(0, 15) // Limit length

  const suffix = randomBytes(3).toString('hex')
  return `${base}${suffix}`
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
