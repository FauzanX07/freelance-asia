'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Tabs,
  TabsContent,
  TabsListUnderline,
  TabsTriggerUnderline,
} from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { CountryDisplay } from '@/components/ui/country-select'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AvailabilityLabels, ExperienceLevelLabels, LanguageProficiencyLabels } from '@/constants/enums'
import { Camera, Plus, X, Loader2, CheckCircle, Globe } from 'lucide-react'

// Validation schema for overview section
const overviewSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100),
  bio: z.string().min(50, 'Bio must be at least 50 characters').max(2000),
  hourlyRate: z.coerce.number().min(5, 'Minimum rate is $5').max(500, 'Maximum rate is $500'),
  availability: z.enum(['AVAILABLE', 'BUSY', 'NOT_AVAILABLE']),
  experienceLevel: z.enum(['ENTRY', 'INTERMEDIATE', 'EXPERT']),
  city: z.string().min(2, 'City is required'),
  timezone: z.string().optional(),
})

type OverviewFormData = z.infer<typeof overviewSchema>

interface Language {
  language: string
  proficiency: string
}

interface ProfileEditTabsProps {
  profile: any
  allSkills: any[]
}

export function ProfileEditTabs({ profile, allSkills }: ProfileEditTabsProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Languages state
  const [languages, setLanguages] = useState<Language[]>(
    (profile.languages as Language[]) || []
  )
  const [newLanguage, setNewLanguage] = useState('')
  const [newProficiency, setNewProficiency] = useState('CONVERSATIONAL')

  // Skills state
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    profile.skills?.map((s: any) => s.skillId) || []
  )

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<OverviewFormData>({
    resolver: zodResolver(overviewSchema),
    defaultValues: {
      title: profile.title || '',
      bio: profile.bio || '',
      hourlyRate: profile.hourlyRate ? Number(profile.hourlyRate) : undefined,
      availability: profile.availability || 'AVAILABLE',
      experienceLevel: profile.experienceLevel || 'INTERMEDIATE',
      city: profile.city || '',
      timezone: profile.timezone || '',
    },
  })

  const onSubmitOverview = async (data: OverviewFormData) => {
    setIsLoading(true)
    setSuccessMessage(null)

    try {
      const response = await fetch('/api/freelancer/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      setSuccessMessage('Profile updated successfully!')
      router.refresh()
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const addLanguage = () => {
    if (newLanguage && !languages.some((l) => l.language === newLanguage)) {
      const updated = [...languages, { language: newLanguage, proficiency: newProficiency }]
      setLanguages(updated)
      setNewLanguage('')
      saveLanguages(updated)
    }
  }

  const removeLanguage = (language: string) => {
    const updated = languages.filter((l) => l.language !== language)
    setLanguages(updated)
    saveLanguages(updated)
  }

  const saveLanguages = async (langs: Language[]) => {
    try {
      await fetch('/api/freelancer/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ languages: langs }),
      })
      router.refresh()
    } catch (error) {
      console.error('Error saving languages:', error)
    }
  }

  const toggleSkill = async (skillId: string) => {
    const isSelected = selectedSkills.includes(skillId)
    const updated = isSelected
      ? selectedSkills.filter((id) => id !== skillId)
      : [...selectedSkills, skillId]

    setSelectedSkills(updated)

    try {
      await fetch('/api/freelancer/profile/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skillIds: updated }),
      })
      router.refresh()
    } catch (error) {
      console.error('Error updating skills:', error)
    }
  }

  // Group skills by category
  const skillsByCategory = allSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, typeof allSkills>)

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsListUnderline className="mb-6">
        <TabsTriggerUnderline value="overview">Overview</TabsTriggerUnderline>
        <TabsTriggerUnderline value="skills">Skills</TabsTriggerUnderline>
        <TabsTriggerUnderline value="portfolio">Portfolio</TabsTriggerUnderline>
        <TabsTriggerUnderline value="languages">Languages</TabsTriggerUnderline>
      </TabsListUnderline>

      {/* Overview Tab */}
      <TabsContent value="overview">
        <form onSubmit={handleSubmit(onSubmitOverview)} className="space-y-6">
          {/* Profile Photo Card */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Photo</CardTitle>
              <CardDescription>Your profile photo helps clients recognize you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar
                    src={profile.user?.avatar}
                    name={profile.user?.name}
                    size="2xl"
                  />
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 rounded-full bg-primary-500 p-2 text-white shadow-lg hover:bg-primary-600"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <p className="font-medium text-secondary-900">{profile.user?.name}</p>
                  <p className="text-sm text-secondary-500">@{profile.username}</p>
                  <p className="mt-1 flex items-center gap-1 text-sm text-secondary-500">
                    <CountryDisplay code={profile.country} />
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Tell clients about yourself and your expertise</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                {...register('title')}
                label="Professional Title"
                placeholder="e.g., Full Stack Developer | React & Node.js Expert"
                error={errors.title?.message}
              />

              <Textarea
                {...register('bio')}
                label="Professional Bio"
                placeholder="Write about your experience, skills, and what makes you unique..."
                error={errors.bio?.message}
                showCount
                maxLength={2000}
                className="min-h-[150px]"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  {...register('hourlyRate')}
                  type="number"
                  label="Hourly Rate (USD)"
                  placeholder="25"
                  error={errors.hourlyRate?.message}
                  leftIcon={<span className="text-secondary-500">$</span>}
                />

                <Controller
                  name="availability"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-secondary-700">
                        Availability
                      </label>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(AvailabilityLabels).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Controller
                  name="experienceLevel"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-secondary-700">
                        Experience Level
                      </label>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(ExperienceLevelLabels).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                />

                <Input
                  {...register('city')}
                  label="City"
                  placeholder="e.g., Karachi"
                  error={errors.city?.message}
                />
              </div>
            </CardContent>
          </Card>

          {/* Success Message */}
          {successMessage && (
            <div className="flex items-center gap-2 rounded-lg bg-success-50 p-3 text-sm text-success-700">
              <CheckCircle className="h-4 w-4" />
              {successMessage}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" isLoading={isLoading} disabled={!isDirty && !isLoading}>
              Save Changes
            </Button>
          </div>
        </form>
      </TabsContent>

      {/* Skills Tab */}
      <TabsContent value="skills">
        <Card>
          <CardHeader>
            <CardTitle>Your Skills</CardTitle>
            <CardDescription>
              Select skills that match your expertise. Verified skills appear with a badge.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Selected Skills */}
              {selectedSkills.length > 0 && (
                <div>
                  <h4 className="mb-2 text-sm font-medium text-secondary-700">Selected Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkills.map((skillId) => {
                      const skill = allSkills.find((s) => s.id === skillId)
                      const isVerified = profile.skills?.some(
                        (s: any) => s.skillId === skillId && s.isVerified
                      )
                      return skill ? (
                        <Badge
                          key={skillId}
                          variant="default"
                          className="cursor-pointer"
                          onClick={() => toggleSkill(skillId)}
                        >
                          {skill.name}
                          {isVerified && <CheckCircle className="ml-1 h-3 w-3" />}
                          <X className="ml-1 h-3 w-3" />
                        </Badge>
                      ) : null
                    })}
                  </div>
                </div>
              )}

              {/* Available Skills by Category */}
              {Object.entries(skillsByCategory).map(([category, skills]) => (
                <div key={category}>
                  <h4 className="mb-2 text-sm font-medium text-secondary-700">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {(skills as any[]).map((skill) => {
                      const isSelected = selectedSkills.includes(skill.id)
                      return (
                        <Badge
                          key={skill.id}
                          variant={isSelected ? 'default' : 'outline'}
                          className="cursor-pointer"
                          onClick={() => toggleSkill(skill.id)}
                        >
                          {isSelected && <CheckCircle className="mr-1 h-3 w-3" />}
                          {skill.name}
                        </Badge>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Portfolio Tab */}
      <TabsContent value="portfolio">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio</CardTitle>
            <CardDescription>
              Showcase your best work to attract clients
            </CardDescription>
          </CardHeader>
          <CardContent>
            {profile.portfolioItems?.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {profile.portfolioItems.map((item: any) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-secondary-200 p-4"
                  >
                    <h4 className="font-medium text-secondary-900">{item.title}</h4>
                    <p className="mt-1 text-sm text-secondary-500 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-secondary-500">No portfolio items yet</p>
                <Button variant="outline" className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Portfolio Item
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Languages Tab */}
      <TabsContent value="languages">
        <Card>
          <CardHeader>
            <CardTitle>Languages</CardTitle>
            <CardDescription>
              Add languages you speak to connect with more clients
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Current Languages */}
            {languages.length > 0 && (
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div
                    key={lang.language}
                    className="flex items-center justify-between rounded-lg border border-secondary-200 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-secondary-400" />
                      <div>
                        <p className="font-medium text-secondary-900">{lang.language}</p>
                        <p className="text-sm text-secondary-500">
                          {LanguageProficiencyLabels[lang.proficiency as keyof typeof LanguageProficiencyLabels]}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLanguage(lang.language)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Add Language */}
            <div className="flex gap-2">
              <Input
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                placeholder="e.g., English, Urdu, Hindi"
                className="flex-1"
              />
              <Select value={newProficiency} onValueChange={setNewProficiency}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(LanguageProficiencyLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" onClick={addLanguage}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
