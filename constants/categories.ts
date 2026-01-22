export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  subcategories: Subcategory[]
}

export interface Subcategory {
  id: string
  name: string
  slug: string
}

export const CATEGORIES: Category[] = [
  {
    id: 'web-development',
    name: 'Web Development',
    slug: 'web-development',
    icon: '💻',
    subcategories: [
      { id: 'frontend', name: 'Frontend Development', slug: 'frontend' },
      { id: 'backend', name: 'Backend Development', slug: 'backend' },
      { id: 'fullstack', name: 'Full Stack Development', slug: 'fullstack' },
      { id: 'wordpress', name: 'WordPress', slug: 'wordpress' },
      { id: 'shopify', name: 'Shopify', slug: 'shopify' },
      { id: 'ecommerce', name: 'E-commerce Development', slug: 'ecommerce' },
      { id: 'cms', name: 'CMS Development', slug: 'cms' },
      { id: 'web-scraping', name: 'Web Scraping', slug: 'web-scraping' },
    ],
  },
  {
    id: 'mobile-development',
    name: 'Mobile Development',
    slug: 'mobile-development',
    icon: '📱',
    subcategories: [
      { id: 'ios', name: 'iOS Development', slug: 'ios' },
      { id: 'android', name: 'Android Development', slug: 'android' },
      { id: 'react-native', name: 'React Native', slug: 'react-native' },
      { id: 'flutter', name: 'Flutter', slug: 'flutter' },
      { id: 'hybrid', name: 'Hybrid App Development', slug: 'hybrid' },
    ],
  },
  {
    id: 'design',
    name: 'Design & Creative',
    slug: 'design',
    icon: '🎨',
    subcategories: [
      { id: 'logo-design', name: 'Logo Design', slug: 'logo-design' },
      { id: 'brand-identity', name: 'Brand Identity', slug: 'brand-identity' },
      { id: 'ui-ux', name: 'UI/UX Design', slug: 'ui-ux' },
      { id: 'web-design', name: 'Web Design', slug: 'web-design' },
      { id: 'graphic-design', name: 'Graphic Design', slug: 'graphic-design' },
      { id: 'illustration', name: 'Illustration', slug: 'illustration' },
      { id: 'packaging', name: 'Packaging Design', slug: 'packaging' },
      { id: 'print-design', name: 'Print Design', slug: 'print-design' },
      { id: '3d-design', name: '3D Design', slug: '3d-design' },
    ],
  },
  {
    id: 'writing',
    name: 'Writing & Content',
    slug: 'writing',
    icon: '✍️',
    subcategories: [
      { id: 'copywriting', name: 'Copywriting', slug: 'copywriting' },
      { id: 'content-writing', name: 'Content Writing', slug: 'content-writing' },
      { id: 'blog-writing', name: 'Blog Writing', slug: 'blog-writing' },
      { id: 'technical-writing', name: 'Technical Writing', slug: 'technical-writing' },
      { id: 'ghostwriting', name: 'Ghostwriting', slug: 'ghostwriting' },
      { id: 'editing', name: 'Editing & Proofreading', slug: 'editing' },
      { id: 'translation', name: 'Translation', slug: 'translation' },
      { id: 'resume-cv', name: 'Resume & CV Writing', slug: 'resume-cv' },
    ],
  },
  {
    id: 'marketing',
    name: 'Digital Marketing',
    slug: 'marketing',
    icon: '📈',
    subcategories: [
      { id: 'seo', name: 'SEO', slug: 'seo' },
      { id: 'social-media', name: 'Social Media Marketing', slug: 'social-media' },
      { id: 'ppc', name: 'PPC Advertising', slug: 'ppc' },
      { id: 'email-marketing', name: 'Email Marketing', slug: 'email-marketing' },
      { id: 'content-marketing', name: 'Content Marketing', slug: 'content-marketing' },
      { id: 'influencer', name: 'Influencer Marketing', slug: 'influencer' },
      { id: 'affiliate', name: 'Affiliate Marketing', slug: 'affiliate' },
      { id: 'analytics', name: 'Marketing Analytics', slug: 'analytics' },
    ],
  },
  {
    id: 'video-animation',
    name: 'Video & Animation',
    slug: 'video-animation',
    icon: '🎬',
    subcategories: [
      { id: 'video-editing', name: 'Video Editing', slug: 'video-editing' },
      { id: 'motion-graphics', name: 'Motion Graphics', slug: 'motion-graphics' },
      { id: '2d-animation', name: '2D Animation', slug: '2d-animation' },
      { id: '3d-animation', name: '3D Animation', slug: '3d-animation' },
      { id: 'explainer-videos', name: 'Explainer Videos', slug: 'explainer-videos' },
      { id: 'whiteboard', name: 'Whiteboard Animation', slug: 'whiteboard' },
      { id: 'video-production', name: 'Video Production', slug: 'video-production' },
    ],
  },
  {
    id: 'data',
    name: 'Data & Analytics',
    slug: 'data',
    icon: '📊',
    subcategories: [
      { id: 'data-entry', name: 'Data Entry', slug: 'data-entry' },
      { id: 'data-analysis', name: 'Data Analysis', slug: 'data-analysis' },
      { id: 'data-visualization', name: 'Data Visualization', slug: 'data-visualization' },
      { id: 'data-science', name: 'Data Science', slug: 'data-science' },
      { id: 'machine-learning', name: 'Machine Learning', slug: 'machine-learning' },
      { id: 'database', name: 'Database Administration', slug: 'database' },
      { id: 'excel', name: 'Excel & Spreadsheets', slug: 'excel' },
    ],
  },
  {
    id: 'admin-support',
    name: 'Admin & Support',
    slug: 'admin-support',
    icon: '👩‍💼',
    subcategories: [
      { id: 'virtual-assistant', name: 'Virtual Assistant', slug: 'virtual-assistant' },
      { id: 'customer-service', name: 'Customer Service', slug: 'customer-service' },
      { id: 'project-management', name: 'Project Management', slug: 'project-management' },
      { id: 'research', name: 'Research', slug: 'research' },
      { id: 'transcription', name: 'Transcription', slug: 'transcription' },
      { id: 'data-entry-admin', name: 'Data Entry', slug: 'data-entry-admin' },
    ],
  },
  {
    id: 'finance',
    name: 'Finance & Accounting',
    slug: 'finance',
    icon: '💰',
    subcategories: [
      { id: 'bookkeeping', name: 'Bookkeeping', slug: 'bookkeeping' },
      { id: 'accounting', name: 'Accounting', slug: 'accounting' },
      { id: 'financial-analysis', name: 'Financial Analysis', slug: 'financial-analysis' },
      { id: 'tax-preparation', name: 'Tax Preparation', slug: 'tax-preparation' },
      { id: 'financial-planning', name: 'Financial Planning', slug: 'financial-planning' },
      { id: 'invoicing', name: 'Invoicing', slug: 'invoicing' },
    ],
  },
  {
    id: 'engineering',
    name: 'Engineering & Architecture',
    slug: 'engineering',
    icon: '🏗️',
    subcategories: [
      { id: 'cad', name: 'CAD Design', slug: 'cad' },
      { id: 'architecture', name: 'Architecture', slug: 'architecture' },
      { id: 'structural', name: 'Structural Engineering', slug: 'structural' },
      { id: 'electrical', name: 'Electrical Engineering', slug: 'electrical' },
      { id: 'mechanical', name: 'Mechanical Engineering', slug: 'mechanical' },
      { id: 'civil', name: 'Civil Engineering', slug: 'civil' },
    ],
  },
  {
    id: 'legal',
    name: 'Legal',
    slug: 'legal',
    icon: '⚖️',
    subcategories: [
      { id: 'contract-drafting', name: 'Contract Drafting', slug: 'contract-drafting' },
      { id: 'legal-research', name: 'Legal Research', slug: 'legal-research' },
      { id: 'compliance', name: 'Compliance', slug: 'compliance' },
      { id: 'immigration', name: 'Immigration Law', slug: 'immigration' },
      { id: 'intellectual-property', name: 'Intellectual Property', slug: 'intellectual-property' },
    ],
  },
  {
    id: 'music-audio',
    name: 'Music & Audio',
    slug: 'music-audio',
    icon: '🎵',
    subcategories: [
      { id: 'voice-over', name: 'Voice Over', slug: 'voice-over' },
      { id: 'music-production', name: 'Music Production', slug: 'music-production' },
      { id: 'audio-editing', name: 'Audio Editing', slug: 'audio-editing' },
      { id: 'sound-design', name: 'Sound Design', slug: 'sound-design' },
      { id: 'mixing-mastering', name: 'Mixing & Mastering', slug: 'mixing-mastering' },
      { id: 'podcast', name: 'Podcast Production', slug: 'podcast' },
    ],
  },
]

// Helper functions

/**
 * Get category by slug
 */
export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}

/**
 * Get category by id
 */
export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id)
}

/**
 * Get subcategory by slug within a category
 */
export function getSubcategoryBySlug(
  categorySlug: string,
  subcategorySlug: string
): Subcategory | undefined {
  const category = getCategoryBySlug(categorySlug)
  return category?.subcategories.find((s) => s.slug === subcategorySlug)
}

/**
 * Get all subcategories across all categories
 */
export function getAllSubcategories(): { category: Category; subcategory: Subcategory }[] {
  return CATEGORIES.flatMap((category) =>
    category.subcategories.map((subcategory) => ({ category, subcategory }))
  )
}

/**
 * Get categories as dropdown options
 */
export function getCategoryOptions(): { value: string; label: string }[] {
  return CATEGORIES.map((c) => ({
    value: c.id,
    label: c.name,
  }))
}

/**
 * Get subcategory options for a specific category
 */
export function getSubcategoryOptions(categoryId: string): { value: string; label: string }[] {
  const category = getCategoryById(categoryId)
  if (!category) return []
  return category.subcategories.map((s) => ({
    value: s.id,
    label: s.name,
  }))
}

/**
 * Search categories and subcategories by query
 */
export function searchCategories(query: string): {
  categories: Category[]
  subcategories: { category: Category; subcategory: Subcategory }[]
} {
  const lowerQuery = query.toLowerCase()

  const matchingCategories = CATEGORIES.filter(
    (c) => c.name.toLowerCase().includes(lowerQuery) || c.slug.toLowerCase().includes(lowerQuery)
  )

  const matchingSubcategories = getAllSubcategories().filter(
    ({ subcategory }) =>
      subcategory.name.toLowerCase().includes(lowerQuery) ||
      subcategory.slug.toLowerCase().includes(lowerQuery)
  )

  return {
    categories: matchingCategories,
    subcategories: matchingSubcategories,
  }
}
