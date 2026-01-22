'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Rating } from '@/components/ui/rating'
import { Avatar } from '@/components/ui/avatar'
import { ALL_COUNTRIES } from '@/constants/countries'

interface ClientProfileViewProps {
  profile: any
}

export function ClientProfileView({ profile }: ClientProfileViewProps) {
  const countryInfo = ALL_COUNTRIES.find((c) => c.code === profile.location)
  const memberSince = new Date(profile.user.createdAt).getFullYear()
  const displayName = profile.companyName || profile.user.name || 'Client'

  // Calculate average rating given to freelancers
  const avgRating =
    profile.reviews.length > 0
      ? profile.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / profile.reviews.length
      : 0

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <Card className="p-6 text-center">
            <Avatar
              src={profile.user.avatar}
              alt={displayName}
              size="xl"
              className="mx-auto mb-4"
            />
            <h1 className="text-2xl font-semibold text-text-primary">{displayName}</h1>
            {profile.industry && (
              <p className="text-text-secondary mt-1">{profile.industry}</p>
            )}

            {/* Location */}
            {countryInfo && (
              <p className="text-sm text-text-tertiary mt-2">
                {countryInfo.flag} {countryInfo.name}
              </p>
            )}

            {/* Verification Badge */}
            {profile.isVerified && (
              <div className="mt-4">
                <Badge variant="primary">Verified Client</Badge>
              </div>
            )}
          </Card>

          {/* Stats Card */}
          <Card className="p-6">
            <h2 className="font-semibold text-text-primary mb-4">Client Statistics</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-text-secondary">Jobs Posted</span>
                <span className="font-medium text-text-primary">{profile._count.jobs}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Contracts</span>
                <span className="font-medium text-text-primary">{profile._count.contracts}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Total Spent</span>
                <span className="font-medium text-text-primary">
                  ${parseFloat(profile.totalSpent || '0').toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Hire Rate</span>
                <span className="font-medium text-text-primary">
                  {profile._count.jobs > 0
                    ? Math.round((profile._count.contracts / profile._count.jobs) * 100)
                    : 0}
                  %
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Member Since</span>
                <span className="font-medium text-text-primary">{memberSince}</span>
              </div>
            </div>
          </Card>

          {/* Company Info */}
          {(profile.companySize || profile.companyWebsite) && (
            <Card className="p-6">
              <h2 className="font-semibold text-text-primary mb-4">Company Details</h2>
              <div className="space-y-3">
                {profile.companySize && (
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Company Size</span>
                    <span className="font-medium text-text-primary">
                      {profile.companySize} employees
                    </span>
                  </div>
                )}
                {profile.companyWebsite && (
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Website</span>
                    <a
                      href={profile.companyWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm truncate max-w-[150px]"
                    >
                      {profile.companyWebsite.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Average Rating Given */}
          <Card className="p-6">
            <h2 className="font-semibold text-text-primary mb-4">Feedback Given</h2>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <Rating value={avgRating} readonly />
                <span className="text-lg font-semibold text-text-primary">
                  {avgRating.toFixed(1)}
                </span>
              </div>
              <p className="text-sm text-text-tertiary mt-2">
                Based on {profile._count.reviews} reviews given
              </p>
            </div>
          </Card>
        </div>

        {/* Right Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          {profile.description && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-text-primary mb-4">About</h2>
              <p className="text-text-secondary whitespace-pre-wrap">{profile.description}</p>
            </Card>
          )}

          {/* Open Jobs */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-text-primary">
                Open Jobs ({profile.jobs.length})
              </h2>
              {profile._count.jobs > 5 && (
                <Link
                  href={`/jobs?client=${profile.id}`}
                  className="text-sm text-primary hover:underline"
                >
                  View All Jobs
                </Link>
              )}
            </div>

            {profile.jobs.length > 0 ? (
              <div className="space-y-4">
                {profile.jobs.map((job: any) => (
                  <Link
                    key={job.id}
                    href={`/jobs/${job.id}`}
                    className="block p-4 border border-border rounded-lg hover:border-primary transition-colors"
                  >
                    <h3 className="font-medium text-text-primary hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                      {job.description}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <span className="text-text-tertiary">
                        {job.budgetType === 'FIXED'
                          ? `$${job.budgetMin?.toLocaleString()} Fixed`
                          : `$${job.budgetMin}-$${job.budgetMax}/hr`}
                      </span>
                      <span className="text-text-tertiary">
                        {job.experienceLevel?.replace('_', ' ')}
                      </span>
                      <span className="text-text-tertiary">
                        Posted{' '}
                        {new Date(job.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    {job.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {job.skills.slice(0, 5).map((js: any) => (
                          <Badge key={js.skill.id} variant="secondary" size="sm">
                            {js.skill.name}
                          </Badge>
                        ))}
                        {job.skills.length > 5 && (
                          <Badge variant="secondary" size="sm">
                            +{job.skills.length - 5}
                          </Badge>
                        )}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-text-tertiary text-center py-8">No open jobs at the moment</p>
            )}
          </Card>

          {/* Reviews Given */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-text-primary">
                Recent Reviews ({profile._count.reviews})
              </h2>
            </div>

            {profile.reviews.length > 0 ? (
              <div className="space-y-6">
                {profile.reviews.map((review: any) => (
                  <div
                    key={review.id}
                    className="pb-6 border-b border-border last:border-0 last:pb-0"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar
                        src={review.freelancer?.user?.avatar}
                        alt={review.freelancer?.user?.name || 'Freelancer'}
                        size="sm"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/freelancer/${review.freelancer?.username}`}
                            className="font-medium text-text-primary hover:text-primary transition-colors"
                          >
                            {review.freelancer?.user?.name || 'Freelancer'}
                          </Link>
                          <Rating value={review.rating} readonly size="xs" />
                        </div>
                        <p className="text-sm text-text-tertiary mt-0.5">
                          {new Date(review.createdAt).toLocaleDateString('en-US', {
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                        <p className="text-text-secondary mt-2">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-text-tertiary text-center py-8">No reviews yet</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
