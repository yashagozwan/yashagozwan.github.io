export interface IdeaDocument {
  id: string
  title: string
  category: string
  description: string
  cover: string
  googleDriveUrl: string
  tags: string[]
  date?: string
  actionLabel?: string
  featured?: boolean
}

export type SkillCategory =
  | 'All'
  | 'Mobile'
  | 'Web'
  | 'Architecture & DevOps'
  | 'Backend & Cloud'
  | 'AI & Design'

export interface SkillItem {
  name: string
  category: Exclude<SkillCategory, 'All'>
}

export interface StatItem {
  value: string
  label: string
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  period: string
  type?: 'Full-time' | 'Contract' | 'Freelance'
  isPrimary?: boolean
  highlightCompany?: boolean
  summary: string
  highlights?: string[]
  tags?: string[]
}

export interface ProjectItem {
  id: string
  title: string
  company: string
  role: string
  platform: string
  summary: string
  challenge: string
  architecture: string
  keyContributions: string[]
  tags: string[]
  featured: boolean
  gradientClass?: string
  miniIconColorClass?: string
  icon: string
}

export interface EngineeringHighlight {
  id: string
  title: string
  icon: string
  cardIcon: string
  problem: string
  approach: string
  solution: string
  result: string
  tags: string[]
}

export interface AcademicItem {
  id: string
  degree: string
  institution: string
  badgeText: string
  badgePulse?: boolean
  badgeVariant: 'brand' | 'emerald'
  levelLabel: string
  description: string
  tags?: string[]
  footerLabel?: string
  sourceUrl?: string
  analyticsId?: string
}

export interface BootcampItem {
  id: string
  programBadge: string
  programColorClass: string
  organizerOrAward: string
  isAwardBadge?: boolean
  title: string
  description: string
}

export interface CertificateItem {
  id: string
  title: string
  provider: string
  providerColor: 'purple' | 'blue' | 'amber'
  durationAndDate: string
  subtitleLabel: string
  subtitleValue: string
  extraLabel?: string
  extraValue?: string
  badgeText: string
  url: string
  analyticsId: string
}

export interface DicodingLearningStep {
  step: number
  id: string
  milestoneTitle: string
  courseTitle: string
  courseSubtitleEn: string
  level: 'Fundamental' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional'
  levelId: string
  hours: number
  modules: number
  rating: string
  status: 'completed' | 'in-progress'
  description: string
  skills: string[]
  certificateUrl?: string
}

export interface HobbyTimelineMilestone {
  period: string
  title: string
  subtitleItalic?: string
  description?: string
  emphasized?: boolean
}

export interface HobbySectionItem {
  id: string
  title: string
  subtitle: string
  description: string
  timelineTitle: string
  cardBgClass: string
  icon: string
  milestones: HobbyTimelineMilestone[]
}
