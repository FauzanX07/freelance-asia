// User roles
export const UserRole = {
  CLIENT: 'CLIENT',
  FREELANCER: 'FREELANCER',
  ADMIN: 'ADMIN',
} as const
export type UserRole = (typeof UserRole)[keyof typeof UserRole]

// Freelancer availability
export const Availability = {
  AVAILABLE: 'AVAILABLE',
  BUSY: 'BUSY',
  NOT_AVAILABLE: 'NOT_AVAILABLE',
} as const
export type Availability = (typeof Availability)[keyof typeof Availability]

export const AvailabilityLabels: Record<Availability, string> = {
  AVAILABLE: 'Available',
  BUSY: 'Busy',
  NOT_AVAILABLE: 'Not Available',
}

// Experience levels
export const ExperienceLevel = {
  ENTRY: 'ENTRY',
  INTERMEDIATE: 'INTERMEDIATE',
  EXPERT: 'EXPERT',
} as const
export type ExperienceLevel = (typeof ExperienceLevel)[keyof typeof ExperienceLevel]

export const ExperienceLevelLabels: Record<ExperienceLevel, string> = {
  ENTRY: 'Entry Level',
  INTERMEDIATE: 'Intermediate',
  EXPERT: 'Expert',
}

// Seller levels (Fiverr-style)
export const SellerLevel = {
  NEW: 'NEW',
  LEVEL_1: 'LEVEL_1',
  LEVEL_2: 'LEVEL_2',
  TOP_RATED: 'TOP_RATED',
  PRO: 'PRO',
} as const
export type SellerLevel = (typeof SellerLevel)[keyof typeof SellerLevel]

export const SellerLevelLabels: Record<SellerLevel, string> = {
  NEW: 'New Seller',
  LEVEL_1: 'Level 1 Seller',
  LEVEL_2: 'Level 2 Seller',
  TOP_RATED: 'Top Rated',
  PRO: 'Pro Seller',
}

export const SellerLevelColors: Record<SellerLevel, string> = {
  NEW: 'badge-new',
  LEVEL_1: 'badge-level-1',
  LEVEL_2: 'badge-level-2',
  TOP_RATED: 'badge-top-rated',
  PRO: 'badge-pro',
}

// Company size
export const CompanySize = {
  INDIVIDUAL: 'INDIVIDUAL',
  SMALL: 'SMALL',
  MEDIUM: 'MEDIUM',
  LARGE: 'LARGE',
  ENTERPRISE: 'ENTERPRISE',
} as const
export type CompanySize = (typeof CompanySize)[keyof typeof CompanySize]

export const CompanySizeLabels: Record<CompanySize, string> = {
  INDIVIDUAL: 'Individual',
  SMALL: 'Small (1-10 employees)',
  MEDIUM: 'Medium (11-50 employees)',
  LARGE: 'Large (51-200 employees)',
  ENTERPRISE: 'Enterprise (200+ employees)',
}

// Budget types
export const BudgetType = {
  FIXED: 'FIXED',
  HOURLY: 'HOURLY',
} as const
export type BudgetType = (typeof BudgetType)[keyof typeof BudgetType]

// Project duration
export const ProjectDuration = {
  LESS_THAN_1_MONTH: 'LESS_THAN_1_MONTH',
  ONE_TO_3_MONTHS: 'ONE_TO_3_MONTHS',
  THREE_TO_6_MONTHS: 'THREE_TO_6_MONTHS',
  MORE_THAN_6_MONTHS: 'MORE_THAN_6_MONTHS',
} as const
export type ProjectDuration = (typeof ProjectDuration)[keyof typeof ProjectDuration]

export const ProjectDurationLabels: Record<ProjectDuration, string> = {
  LESS_THAN_1_MONTH: 'Less than 1 month',
  ONE_TO_3_MONTHS: '1 to 3 months',
  THREE_TO_6_MONTHS: '3 to 6 months',
  MORE_THAN_6_MONTHS: 'More than 6 months',
}

// Project scope
export const ProjectScope = {
  SMALL: 'SMALL',
  MEDIUM: 'MEDIUM',
  LARGE: 'LARGE',
} as const
export type ProjectScope = (typeof ProjectScope)[keyof typeof ProjectScope]

export const ProjectScopeLabels: Record<ProjectScope, string> = {
  SMALL: 'Small',
  MEDIUM: 'Medium',
  LARGE: 'Large',
}

// Freelancer type
export const FreelancerType = {
  INDEPENDENT: 'INDEPENDENT',
  AGENCY: 'AGENCY',
  ANY: 'ANY',
} as const
export type FreelancerType = (typeof FreelancerType)[keyof typeof FreelancerType]

// Job status
export const JobStatus = {
  DRAFT: 'DRAFT',
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const
export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus]

// Job visibility
export const JobVisibility = {
  PUBLIC: 'PUBLIC',
  INVITE_ONLY: 'INVITE_ONLY',
  PRIVATE: 'PRIVATE',
} as const
export type JobVisibility = (typeof JobVisibility)[keyof typeof JobVisibility]

// Gig status
export const GigStatus = {
  DRAFT: 'DRAFT',
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  DENIED: 'DENIED',
} as const
export type GigStatus = (typeof GigStatus)[keyof typeof GigStatus]

// Contest status
export const ContestStatus = {
  DRAFT: 'DRAFT',
  OPEN: 'OPEN',
  JUDGING: 'JUDGING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const
export type ContestStatus = (typeof ContestStatus)[keyof typeof ContestStatus]

// Contest entry status
export const ContestEntryStatus = {
  SUBMITTED: 'SUBMITTED',
  SHORTLISTED: 'SHORTLISTED',
  WINNER: 'WINNER',
  REJECTED: 'REJECTED',
} as const
export type ContestEntryStatus = (typeof ContestEntryStatus)[keyof typeof ContestEntryStatus]

// Proposal status
export const ProposalStatus = {
  PENDING: 'PENDING',
  SHORTLISTED: 'SHORTLISTED',
  INTERVIEW: 'INTERVIEW',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  WITHDRAWN: 'WITHDRAWN',
} as const
export type ProposalStatus = (typeof ProposalStatus)[keyof typeof ProposalStatus]

// Contract type
export const ContractType = {
  FIXED: 'FIXED',
  HOURLY: 'HOURLY',
} as const
export type ContractType = (typeof ContractType)[keyof typeof ContractType]

// Contract status
export const ContractStatus = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  DISPUTED: 'DISPUTED',
} as const
export type ContractStatus = (typeof ContractStatus)[keyof typeof ContractStatus]

// Milestone status
export const MilestoneStatus = {
  PENDING: 'PENDING',
  FUNDED: 'FUNDED',
  IN_PROGRESS: 'IN_PROGRESS',
  SUBMITTED: 'SUBMITTED',
  REVISION_REQUESTED: 'REVISION_REQUESTED',
  APPROVED: 'APPROVED',
  PAID: 'PAID',
} as const
export type MilestoneStatus = (typeof MilestoneStatus)[keyof typeof MilestoneStatus]

// Transaction type
export const TransactionType = {
  DEPOSIT: 'DEPOSIT',
  WITHDRAWAL: 'WITHDRAWAL',
  PAYMENT: 'PAYMENT',
  REFUND: 'REFUND',
  CONNECT_PURCHASE: 'CONNECT_PURCHASE',
  SUBSCRIPTION: 'SUBSCRIPTION',
  FEE: 'FEE',
} as const
export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType]

// Transaction status
export const TransactionStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
} as const
export type TransactionStatus = (typeof TransactionStatus)[keyof typeof TransactionStatus]

// Notification types
export const NotificationType = {
  NEW_MESSAGE: 'NEW_MESSAGE',
  PROPOSAL_RECEIVED: 'PROPOSAL_RECEIVED',
  PROPOSAL_ACCEPTED: 'PROPOSAL_ACCEPTED',
  PROPOSAL_REJECTED: 'PROPOSAL_REJECTED',
  MILESTONE_FUNDED: 'MILESTONE_FUNDED',
  MILESTONE_APPROVED: 'MILESTONE_APPROVED',
  PAYMENT_RECEIVED: 'PAYMENT_RECEIVED',
  NEW_REVIEW: 'NEW_REVIEW',
  BADGE_EARNED: 'BADGE_EARNED',
  CONNECTS_LOW: 'CONNECTS_LOW',
  CONTRACT_STARTED: 'CONTRACT_STARTED',
  CONTRACT_ENDED: 'CONTRACT_ENDED',
  JOB_INVITATION: 'JOB_INVITATION',
  CONTEST_WINNER: 'CONTEST_WINNER',
} as const
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType]

// Language proficiency levels
export const LanguageProficiency = {
  BASIC: 'BASIC',
  CONVERSATIONAL: 'CONVERSATIONAL',
  FLUENT: 'FLUENT',
  NATIVE: 'NATIVE',
} as const
export type LanguageProficiency = (typeof LanguageProficiency)[keyof typeof LanguageProficiency]

export const LanguageProficiencyLabels: Record<LanguageProficiency, string> = {
  BASIC: 'Basic',
  CONVERSATIONAL: 'Conversational',
  FLUENT: 'Fluent',
  NATIVE: 'Native or Bilingual',
}

// Connect packages - default values
export const DEFAULT_FREE_CONNECTS = 60
export const CONNECTS_REFRESH_DAY = 1 // 1st of each month

export const CONNECT_PACKAGES = [
  { id: 'pkg_10', name: '10 Connects', connects: 10, price: 1.5, bonusConnects: 0, isPopular: false },
  { id: 'pkg_20', name: '20 Connects', connects: 20, price: 2.75, bonusConnects: 0, isPopular: false },
  { id: 'pkg_40', name: '40 Connects', connects: 40, price: 5, bonusConnects: 5, isPopular: true },
  { id: 'pkg_80', name: '80 Connects', connects: 80, price: 9, bonusConnects: 10, isPopular: false },
  { id: 'pkg_150', name: '150 Connects', connects: 150, price: 15, bonusConnects: 25, isPopular: false },
] as const

// Connects required based on job budget
export function getConnectsRequired(budgetMin: number, budgetMax: number): number {
  const avgBudget = (budgetMin + budgetMax) / 2
  if (avgBudget < 100) return 2
  if (avgBudget < 500) return 4
  if (avgBudget < 1000) return 6
  if (avgBudget < 5000) return 8
  return 10
}

// Seller level requirements
export const SELLER_LEVEL_REQUIREMENTS = {
  NEW: {
    minOrders: 0,
    minRating: 0,
    minCompletionRate: 0,
    minOnTimeRate: 0,
  },
  LEVEL_1: {
    minOrders: 10,
    minRating: 4.0,
    minCompletionRate: 90,
    minOnTimeRate: 0,
  },
  LEVEL_2: {
    minOrders: 50,
    minRating: 4.5,
    minCompletionRate: 95,
    minOnTimeRate: 90,
  },
  TOP_RATED: {
    minOrders: 100,
    minRating: 4.8,
    minCompletionRate: 98,
    minOnTimeRate: 95,
  },
  PRO: {
    minOrders: 100,
    minRating: 4.9,
    minCompletionRate: 99,
    minOnTimeRate: 98,
    manualApproval: true,
  },
} as const
