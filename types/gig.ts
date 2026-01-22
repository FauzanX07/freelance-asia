import type { GigStatus, ContestStatus, ContestEntryStatus } from '@/constants/enums'
import type { FreelancerProfileWithUser, ClientProfileWithUser } from './user'

// Gig types (Fiverr style)
export interface GigExtra {
  title: string
  price: number
  deliveryDays: number
}

export interface GigFAQ {
  id: string
  question: string
  answer: string
  order: number
}

export interface Gig {
  id: string
  freelancerProfileId: string
  title: string
  description: string
  category: string
  subcategory: string | null
  tags: string[]

  // 3-Tier Pricing
  basicPrice: number
  basicDescription: string
  basicDeliveryDays: number
  basicRevisions: number

  standardPrice: number | null
  standardDescription: string | null
  standardDeliveryDays: number | null
  standardRevisions: number | null

  premiumPrice: number | null
  premiumDescription: string | null
  premiumDeliveryDays: number | null
  premiumRevisions: number | null

  extras: GigExtra[]
  images: string[]
  video: string | null

  // Stats
  impressions: number
  clicks: number
  orders: number
  rating: number
  reviewCount: number

  status: GigStatus
  isPro: boolean

  createdAt: string
  updatedAt: string
}

export interface GigWithFreelancer extends Gig {
  freelancerProfile: FreelancerProfileWithUser
  faqs: GigFAQ[]
}

export interface GigPricingTier {
  name: 'Basic' | 'Standard' | 'Premium'
  price: number
  description: string
  deliveryDays: number
  revisions: number
}

// Contest types (Freelancer style)
export interface ContestPrize {
  place: number
  amount: number
}

export interface Contest {
  id: string
  clientProfileId: string
  title: string
  description: string
  category: string
  prizeAmount: number
  prizeCount: number
  prizes: ContestPrize[]
  startDate: string
  endDate: string
  isGuaranteed: boolean
  isSealed: boolean
  isFeatured: boolean
  skills: string[]
  deliverables: string[]
  entryCount: number
  viewCount: number
  status: ContestStatus
  createdAt: string
  updatedAt: string
}

export interface ContestWithClient extends Contest {
  clientProfile: ClientProfileWithUser
}

export interface ContestEntry {
  id: string
  contestId: string
  freelancerProfileId: string
  description: string | null
  files: string[]
  rating: number | null
  feedback: string | null
  isWinner: boolean
  prizePlace: number | null
  status: ContestEntryStatus
  createdAt: string
  updatedAt: string
}

export interface ContestEntryWithFreelancer extends ContestEntry {
  freelancerProfile: FreelancerProfileWithUser
}

export interface ContestFull extends ContestWithClient {
  entries: ContestEntryWithFreelancer[]
}

// Create/Update types
export interface CreateGigData {
  title: string
  description: string
  category: string
  subcategory?: string
  tags: string[]

  basicPrice: number
  basicDescription: string
  basicDeliveryDays: number
  basicRevisions?: number

  standardPrice?: number
  standardDescription?: string
  standardDeliveryDays?: number
  standardRevisions?: number

  premiumPrice?: number
  premiumDescription?: string
  premiumDeliveryDays?: number
  premiumRevisions?: number

  extras?: GigExtra[]
  images?: string[]
  video?: string
}

export interface CreateContestData {
  title: string
  description: string
  category: string
  prizeAmount: number
  prizeCount?: number
  prizes?: ContestPrize[]
  startDate?: string
  endDate: string
  isGuaranteed?: boolean
  isSealed?: boolean
  skills?: string[]
  deliverables?: string[]
}

export interface CreateContestEntryData {
  contestId: string
  description?: string
  files: string[]
}

// Search and filter types
export interface GigFilters {
  category?: string
  subcategory?: string
  minPrice?: number
  maxPrice?: number
  deliveryDays?: number
  sellerLevel?: string
  sellerCountry?: string
  isPro?: boolean
  sortBy?: 'recommended' | 'best_selling' | 'newest' | 'price_low' | 'price_high'
  page?: number
  limit?: number
}

export interface GigSearchResult {
  gigs: GigWithFreelancer[]
  total: number
  page: number
  totalPages: number
}

export interface ContestFilters {
  category?: string
  status?: ContestStatus
  minPrize?: number
  maxPrize?: number
  isGuaranteed?: boolean
  sortBy?: 'newest' | 'prize_high' | 'prize_low' | 'ending_soon'
  page?: number
  limit?: number
}

export interface ContestSearchResult {
  contests: ContestWithClient[]
  total: number
  page: number
  totalPages: number
}
