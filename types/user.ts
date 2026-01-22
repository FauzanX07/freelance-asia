import type {
  User as PrismaUser,
  FreelancerProfile as PrismaFreelancerProfile,
  ClientProfile as PrismaClientProfile,
} from '@prisma/client'
import type { UserRole, Availability, ExperienceLevel, SellerLevel, CompanySize } from '@/constants/enums'

// User types
export interface User extends Omit<PrismaUser, 'password' | 'createdAt' | 'updatedAt'> {
  createdAt: string
  updatedAt: string
}

export interface SafeUser {
  id: string
  email: string
  name: string
  avatar: string | null
  role: UserRole
  emailVerified: string | null
  isActive: boolean
  connects: number
}

// Freelancer profile types
export interface FreelancerProfile extends Omit<PrismaFreelancerProfile, 'hourlyRate' | 'totalEarnings' | 'rating' | 'onTimeDelivery' | 'repeatClientRate' | 'createdAt' | 'updatedAt'> {
  hourlyRate: number | null
  totalEarnings: number
  rating: number
  onTimeDelivery: number
  repeatClientRate: number
  createdAt: string
  updatedAt: string
}

export interface FreelancerProfileWithUser extends FreelancerProfile {
  user: SafeUser
}

export interface Language {
  language: string
  proficiency: 'BASIC' | 'CONVERSATIONAL' | 'FLUENT' | 'NATIVE'
}

export interface FreelancerSkill {
  id: string
  skillId: string
  skillName: string
  category: string
  endorsements: number
  isVerified: boolean
  testScore: number | null
}

export interface PortfolioItem {
  id: string
  title: string
  description: string | null
  images: string[]
  projectUrl: string | null
  skills: string[]
  completionDate: string | null
  isPublic: boolean
}

// Client profile types
export interface ClientProfile extends Omit<PrismaClientProfile, 'totalSpent' | 'hireRate' | 'avgHourlyPaid' | 'createdAt' | 'updatedAt'> {
  totalSpent: number
  hireRate: number
  avgHourlyPaid: number
  createdAt: string
  updatedAt: string
}

export interface ClientProfileWithUser extends ClientProfile {
  user: SafeUser
}

// Session user type (for NextAuth)
export interface SessionUser {
  id: string
  email: string
  name: string
  avatar: string | null
  role: UserRole
  emailVerified: boolean
  freelancerProfileId: string | null
  clientProfileId: string | null
}

// Registration types
export interface RegisterFreelancerData {
  email: string
  password: string
  name: string
  country: string // Must be Asian country
  role: 'FREELANCER' | 'BOTH'
}

export interface RegisterClientData {
  email: string
  password: string
  name: string
  country?: string // Can be any country
  role: 'CLIENT' | 'BOTH'
}

// Profile update types
export interface UpdateFreelancerProfileData {
  title?: string
  bio?: string
  hourlyRate?: number
  availability?: Availability
  experienceLevel?: ExperienceLevel
  city?: string
  timezone?: string
  languages?: Language[]
}

export interface UpdateClientProfileData {
  companyName?: string
  industry?: string
  companySize?: CompanySize
  website?: string
  description?: string
  country?: string
  city?: string
  timezone?: string
}
