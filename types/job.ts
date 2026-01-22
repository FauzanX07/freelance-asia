import type {
  BudgetType,
  ProjectDuration,
  ProjectScope,
  ExperienceLevel,
  FreelancerType,
  JobStatus,
  JobVisibility,
  ProposalStatus,
  ContractType,
  ContractStatus,
  MilestoneStatus,
} from '@/constants/enums'
import type { SafeUser, FreelancerProfileWithUser, ClientProfileWithUser } from './user'

// Job types
export interface Job {
  id: string
  clientProfileId: string
  title: string
  description: string
  category: string
  subcategory: string | null
  skills: string[]
  budgetType: BudgetType
  budgetMin: number
  budgetMax: number
  duration: ProjectDuration | null
  deadline: string | null
  experienceLevel: ExperienceLevel
  projectScope: ProjectScope
  preferredLocations: string[]
  freelancerType: FreelancerType
  attachments: string[]
  proposalCount: number
  viewCount: number
  invitesSent: number
  status: JobStatus
  visibility: JobVisibility
  isUrgent: boolean
  isFeatured: boolean
  connectsRequired: number
  createdAt: string
  updatedAt: string
  expiresAt: string | null
}

export interface JobWithClient extends Job {
  clientProfile: ClientProfileWithUser
}

export interface JobWithProposals extends JobWithClient {
  proposals: Proposal[]
}

// Proposal types
export interface ProposalMilestone {
  title: string
  amount: number
  deadline: string
}

export interface Proposal {
  id: string
  jobId: string
  freelancerProfileId: string
  coverLetter: string
  bidType: BudgetType
  bidAmount: number
  estimatedDuration: string | null
  milestones: ProposalMilestone[]
  attachments: string[]
  answers: Record<string, string>[]
  connectsUsed: number
  status: ProposalStatus
  clientViewed: boolean
  clientViewedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface ProposalWithFreelancer extends Proposal {
  freelancerProfile: FreelancerProfileWithUser
}

export interface ProposalWithJob extends Proposal {
  job: JobWithClient
}

// Contract types
export interface Contract {
  id: string
  jobId: string | null
  gigId: string | null
  contestId: string | null
  clientProfileId: string
  freelancerProfileId: string
  title: string
  description: string | null
  contractType: ContractType
  totalAmount: number
  hourlyRate: number | null
  weeklyLimit: number | null
  startDate: string
  endDate: string | null
  status: ContractStatus
  createdAt: string
  updatedAt: string
}

export interface ContractWithParties extends Contract {
  clientProfile: ClientProfileWithUser
  freelancerProfile: FreelancerProfileWithUser
}

export interface ContractFull extends ContractWithParties {
  milestones: Milestone[]
  job: Job | null
}

// Milestone types
export interface Milestone {
  id: string
  contractId: string
  title: string
  description: string | null
  amount: number
  dueDate: string | null
  status: MilestoneStatus
  fundedAt: string | null
  fundedAmount: number | null
  submissionNote: string | null
  submissionFiles: string[]
  submittedAt: string | null
  approvedAt: string | null
  paidAt: string | null
  createdAt: string
  updatedAt: string
}

// Job creation/update types
export interface CreateJobData {
  title: string
  description: string
  category: string
  subcategory?: string
  skills: string[]
  budgetType: BudgetType
  budgetMin: number
  budgetMax: number
  duration?: ProjectDuration
  deadline?: string
  experienceLevel: ExperienceLevel
  projectScope: ProjectScope
  preferredLocations?: string[]
  freelancerType?: FreelancerType
  visibility?: JobVisibility
  isUrgent?: boolean
}

export interface CreateProposalData {
  jobId: string
  coverLetter: string
  bidType: BudgetType
  bidAmount: number
  estimatedDuration?: string
  milestones?: ProposalMilestone[]
  attachments?: string[]
  answers?: Record<string, string>[]
}

// Search and filter types
export interface JobFilters {
  category?: string
  subcategory?: string
  budgetType?: BudgetType
  budgetMin?: number
  budgetMax?: number
  experienceLevel?: ExperienceLevel
  projectScope?: ProjectScope
  duration?: ProjectDuration
  skills?: string[]
  clientCountry?: string
  status?: JobStatus
  sortBy?: 'newest' | 'oldest' | 'budget_high' | 'budget_low' | 'proposals'
  page?: number
  limit?: number
}

export interface JobSearchResult {
  jobs: JobWithClient[]
  total: number
  page: number
  totalPages: number
}
