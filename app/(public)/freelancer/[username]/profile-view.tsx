'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Rating } from '@/components/ui/rating'
import { Avatar } from '@/components/ui/avatar'
import { ASIAN_COUNTRIES } from '@/constants/countries'
import { SELLER_LEVEL_INFO } from '@/constants/enums'

interface FreelancerProfileViewProps {
  profile: any
}

export function FreelancerProfileView({ profile }: FreelancerProfileViewProps) {
  const countryInfo = ASIAN_COUNTRIES.find((c) => c.code === profile.country)
  const levelInfo = SELLER_LEVEL_INFO[profile.sellerLevel as keyof typeof SELLER_LEVEL_INFO]
  const memberSince = new Date(profile.user.createdAt).getFullYear()

  // Calculate average rating
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
              alt={profile.user.name || profile.username}
              size="xl"
              className="mx-auto mb-4"
            />
            <h1 className="text-2xl font-semibold text-text-primary">
              {profile.user.name || profile.username}
            </h1>
            <p className="text-text-secondary mt-1">{profile.title || 'Freelancer'}</p>

            {/* Location */}
            {countryInfo && (
              <p className="text-sm text-text-tertiary mt-2">
                {countryInfo.flag} {profile.city ? `${profile.city}, ` : ''}
                {countryInfo.name}
              </p>
            )}

            {/* Rating */}
            <div className="flex items-center justify-center gap-2 mt-3">
              <Rating value={avgRating} readonly size="sm" />
              <span className="text-sm text-text-secondary">
                ({profile._count.reviews} reviews)
              </span>
            </div>

            {/* Seller Level Badge */}
            {levelInfo && (
              <div className="mt-4">
                <Badge
                  variant={
                    profile.sellerLevel === 'PRO'
                      ? 'primary'
                      : profile.sellerLevel === 'TOP_RATED'
                        ? 'warning'
                        : 'secondary'
                  }
                >
                  {levelInfo.name}
                </Badge>
              </div>
            )}

            {/* Contact Button */}
            <Button className="w-full mt-6">Contact Me</Button>
          </Card>

          {/* Stats Card */}
          <Card className="p-6">
            <h2 className="font-semibold text-text-primary mb-4">Statistics</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-text-secondary">Completed Jobs</span>
                <span className="font-medium text-text-primary">
                  {profile._count.completedContracts}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Earnings</span>
                <span className="font-medium text-text-primary">
                  ${parseFloat(profile.totalEarnings || '0').toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Response Time</span>
                <span className="font-medium text-text-primary">
                  {profile.responseTime || 'Within a few hours'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Member Since</span>
                <span className="font-medium text-text-primary">{memberSince}</span>
              </div>
            </div>
          </Card>

          {/* Hourly Rate */}
          {profile.hourlyRate && (
            <Card className="p-6">
              <h2 className="font-semibold text-text-primary mb-2">Hourly Rate</h2>
              <p className="text-3xl font-bold text-primary">
                ${parseFloat(profile.hourlyRate).toFixed(0)}
                <span className="text-lg font-normal text-text-tertiary">/hr</span>
              </p>
            </Card>
          )}

          {/* Languages */}
          {profile.languages && profile.languages.length > 0 && (
            <Card className="p-6">
              <h2 className="font-semibold text-text-primary mb-4">Languages</h2>
              <div className="space-y-2">
                {profile.languages.map((lang: string, i: number) => (
                  <div key={i} className="text-text-secondary">
                    {lang}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Badges */}
          {profile.badges && profile.badges.length > 0 && (
            <Card className="p-6">
              <h2 className="font-semibold text-text-primary mb-4">Badges</h2>
              <div className="flex flex-wrap gap-2">
                {profile.badges.map((fb: any) => (
                  <Badge key={fb.badge.id} variant="outline">
                    {fb.badge.icon} {fb.badge.name}
                  </Badge>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Right Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">About</h2>
            <p className="text-text-secondary whitespace-pre-wrap">
              {profile.bio || 'No bio provided yet.'}
            </p>
          </Card>

          {/* Skills */}
          {profile.skills && profile.skills.length > 0 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-text-primary mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((fs: any) => (
                  <Badge key={fs.skill.id} variant="secondary">
                    {fs.skill.name}
                  </Badge>
                ))}
              </div>
            </Card>
          )}

          {/* Gigs */}
          {profile.gigs && profile.gigs.length > 0 && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-text-primary">My Gigs</h2>
                <Link
                  href={`/freelancer/${profile.username}/gigs`}
                  className="text-sm text-primary hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {profile.gigs.map((gig: any) => {
                  const basicPackage = gig.packages.find((p: any) => p.tier === 'BASIC')
                  return (
                    <Link
                      key={gig.id}
                      href={`/gigs/${gig.id}`}
                      className="block group"
                    >
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-background-secondary">
                        {gig.images && gig.images[0] ? (
                          <Image
                            src={gig.images[0]}
                            alt={gig.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-text-tertiary">
                            No Image
                          </div>
                        )}
                      </div>
                      <h3 className="mt-2 text-sm font-medium text-text-primary line-clamp-2 group-hover:text-primary transition-colors">
                        {gig.title}
                      </h3>
                      {basicPackage && (
                        <p className="text-sm text-text-secondary mt-1">
                          Starting at{' '}
                          <span className="font-semibold text-text-primary">
                            ${parseFloat(basicPackage.price).toFixed(0)}
                          </span>
                        </p>
                      )}
                    </Link>
                  )
                })}
              </div>
            </Card>
          )}

          {/* Portfolio */}
          {profile.portfolioItems && profile.portfolioItems.length > 0 && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-text-primary">Portfolio</h2>
                <Link
                  href={`/freelancer/${profile.username}/portfolio`}
                  className="text-sm text-primary hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {profile.portfolioItems.map((item: any) => (
                  <div
                    key={item.id}
                    className="group cursor-pointer"
                    onClick={() => {
                      // Could open a modal here
                    }}
                  >
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-background-secondary">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-text-tertiary">
                          No Image
                        </div>
                      )}
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-text-primary group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    {item.category && (
                      <p className="text-xs text-text-tertiary">{item.category}</p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Reviews */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-text-primary">
                Reviews ({profile._count.reviews})
              </h2>
              {profile._count.reviews > 5 && (
                <Link
                  href={`/freelancer/${profile.username}/reviews`}
                  className="text-sm text-primary hover:underline"
                >
                  View All
                </Link>
              )}
            </div>

            {profile.reviews.length > 0 ? (
              <div className="space-y-6">
                {profile.reviews.map((review: any) => (
                  <div key={review.id} className="pb-6 border-b border-border last:border-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <Avatar
                        src={review.client?.user?.avatar}
                        alt={review.client?.user?.name || 'Client'}
                        size="sm"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-text-primary">
                            {review.client?.user?.name || 'Anonymous'}
                          </span>
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
