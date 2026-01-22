'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { ALL_COUNTRIES } from '@/constants/countries'

interface ClientProfile {
  id: string
  companyName: string | null
  companyWebsite: string | null
  companySize: string | null
  industry: string | null
  description: string | null
  location: string | null
  timezone: string | null
  totalSpent: any
  user: {
    name: string | null
    email: string
    avatar: string | null
  }
}

interface ClientProfileEditFormProps {
  profile: ClientProfile
}

const COMPANY_SIZES = [
  { value: '1', label: 'Just me' },
  { value: '2-9', label: '2-9 employees' },
  { value: '10-49', label: '10-49 employees' },
  { value: '50-99', label: '50-99 employees' },
  { value: '100-499', label: '100-499 employees' },
  { value: '500+', label: '500+ employees' },
]

const INDUSTRIES = [
  'Technology',
  'Finance & Banking',
  'Healthcare',
  'E-commerce',
  'Education',
  'Marketing & Advertising',
  'Real Estate',
  'Manufacturing',
  'Consulting',
  'Entertainment',
  'Non-profit',
  'Government',
  'Other',
]

const TIMEZONES = [
  { value: 'UTC-12:00', label: '(UTC-12:00) International Date Line West' },
  { value: 'UTC-11:00', label: '(UTC-11:00) Midway Island, Samoa' },
  { value: 'UTC-10:00', label: '(UTC-10:00) Hawaii' },
  { value: 'UTC-09:00', label: '(UTC-09:00) Alaska' },
  { value: 'UTC-08:00', label: '(UTC-08:00) Pacific Time (US & Canada)' },
  { value: 'UTC-07:00', label: '(UTC-07:00) Mountain Time (US & Canada)' },
  { value: 'UTC-06:00', label: '(UTC-06:00) Central Time (US & Canada)' },
  { value: 'UTC-05:00', label: '(UTC-05:00) Eastern Time (US & Canada)' },
  { value: 'UTC-04:00', label: '(UTC-04:00) Atlantic Time (Canada)' },
  { value: 'UTC-03:00', label: '(UTC-03:00) Buenos Aires, Georgetown' },
  { value: 'UTC-02:00', label: '(UTC-02:00) Mid-Atlantic' },
  { value: 'UTC-01:00', label: '(UTC-01:00) Azores, Cape Verde Is.' },
  { value: 'UTC+00:00', label: '(UTC+00:00) London, Dublin, Edinburgh' },
  { value: 'UTC+01:00', label: '(UTC+01:00) Paris, Berlin, Rome, Madrid' },
  { value: 'UTC+02:00', label: '(UTC+02:00) Cairo, Helsinki, Athens' },
  { value: 'UTC+03:00', label: '(UTC+03:00) Moscow, Istanbul, Baghdad' },
  { value: 'UTC+04:00', label: '(UTC+04:00) Dubai, Abu Dhabi, Muscat' },
  { value: 'UTC+05:00', label: '(UTC+05:00) Karachi, Islamabad, Tashkent' },
  { value: 'UTC+05:30', label: '(UTC+05:30) Mumbai, Kolkata, New Delhi' },
  { value: 'UTC+06:00', label: '(UTC+06:00) Dhaka, Almaty' },
  { value: 'UTC+07:00', label: '(UTC+07:00) Bangkok, Hanoi, Jakarta' },
  { value: 'UTC+08:00', label: '(UTC+08:00) Singapore, Hong Kong, Beijing' },
  { value: 'UTC+09:00', label: '(UTC+09:00) Tokyo, Seoul' },
  { value: 'UTC+10:00', label: '(UTC+10:00) Sydney, Melbourne, Brisbane' },
  { value: 'UTC+11:00', label: '(UTC+11:00) Solomon Islands, New Caledonia' },
  { value: 'UTC+12:00', label: '(UTC+12:00) Auckland, Wellington, Fiji' },
]

export function ClientProfileEditForm({ profile }: ClientProfileEditFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    companyName: profile.companyName || '',
    companyWebsite: profile.companyWebsite || '',
    companySize: profile.companySize || '',
    industry: profile.industry || '',
    description: profile.description || '',
    location: profile.location || '',
    timezone: profile.timezone || '',
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setSuccess(false)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess(false)

    try {
      const response = await fetch('/api/client/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to update profile')
      }

      setSuccess(true)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {/* Company Information */}
        <Card className="p-6">
          <h2 className="text-lg font-medium text-text-primary mb-4">Company Information</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Company Name"
              value={formData.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              placeholder="Your company name"
            />
            <Input
              label="Company Website"
              type="url"
              value={formData.companyWebsite}
              onChange={(e) => handleChange('companyWebsite', e.target.value)}
              placeholder="https://yourcompany.com"
            />
            <Select
              label="Company Size"
              value={formData.companySize}
              onChange={(e) => handleChange('companySize', e.target.value)}
            >
              <option value="">Select company size</option>
              {COMPANY_SIZES.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </Select>
            <Select
              label="Industry"
              value={formData.industry}
              onChange={(e) => handleChange('industry', e.target.value)}
            >
              <option value="">Select industry</option>
              {INDUSTRIES.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </Select>
          </div>
        </Card>

        {/* About */}
        <Card className="p-6">
          <h2 className="text-lg font-medium text-text-primary mb-4">About Your Company</h2>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={5}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder="Tell freelancers about your company, what you do, and what kind of projects you typically work on..."
            />
            <p className="text-sm text-text-tertiary mt-1">
              A good description helps freelancers understand your business needs
            </p>
          </div>
        </Card>

        {/* Location */}
        <Card className="p-6">
          <h2 className="text-lg font-medium text-text-primary mb-4">Location & Timezone</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Select
              label="Country"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
            >
              <option value="">Select country</option>
              {ALL_COUNTRIES.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.name}
                </option>
              ))}
            </Select>
            <Select
              label="Timezone"
              value={formData.timezone}
              onChange={(e) => handleChange('timezone', e.target.value)}
            >
              <option value="">Select timezone</option>
              {TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </Select>
          </div>
        </Card>

        {/* Payment Info Card */}
        <Card className="p-6 bg-background-tertiary">
          <h2 className="text-lg font-medium text-text-primary mb-2">Payment & Verification</h2>
          <p className="text-text-secondary text-sm mb-4">
            Add a payment method to start hiring freelancers. Your payment information is securely stored.
          </p>
          <div className="flex items-center gap-4">
            <Button type="button" variant="outline" disabled>
              Add Payment Method
            </Button>
            <span className="text-sm text-text-tertiary">Coming soon</span>
          </div>
        </Card>

        {/* Stats */}
        <Card className="p-6">
          <h2 className="text-lg font-medium text-text-primary mb-4">Account Statistics</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="p-4 bg-background-secondary rounded-lg">
              <p className="text-sm text-text-secondary">Total Spent</p>
              <p className="text-2xl font-semibold text-text-primary">
                ${parseFloat(profile.totalSpent || '0').toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-background-secondary rounded-lg">
              <p className="text-sm text-text-secondary">Member Since</p>
              <p className="text-2xl font-semibold text-text-primary">2024</p>
            </div>
            <div className="p-4 bg-background-secondary rounded-lg">
              <p className="text-sm text-text-secondary">Verified</p>
              <p className="text-2xl font-semibold text-primary">Yes</p>
            </div>
          </div>
        </Card>

        {/* Error/Success Messages */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {success && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600">Profile updated successfully!</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </form>
  )
}
