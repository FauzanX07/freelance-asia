'use client'

import * as React from 'react'
import { Star, StarHalf } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RatingStarsProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  showCount?: boolean
  count?: number
  className?: string
  interactive?: boolean
  onRatingChange?: (rating: number) => void
}

const RatingStars = ({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = false,
  showCount = false,
  count = 0,
  className,
  interactive = false,
  onRatingChange,
}: RatingStarsProps) => {
  const [hoverRating, setHoverRating] = React.useState<number | null>(null)

  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  }

  const displayRating = hoverRating !== null ? hoverRating : rating
  const fullStars = Math.floor(displayRating)
  const hasHalfStar = displayRating % 1 >= 0.5
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0)

  const handleClick = (value: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(value)
    }
  }

  const handleMouseEnter = (value: number) => {
    if (interactive) {
      setHoverRating(value)
    }
  }

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(null)
    }
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div
        className={cn('flex items-center gap-0.5', interactive && 'cursor-pointer')}
        onMouseLeave={handleMouseLeave}
      >
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, index) => (
          <Star
            key={`full-${index}`}
            className={cn(sizeClasses[size], 'fill-warning-500 text-warning-500')}
            onClick={() => handleClick(index + 1)}
            onMouseEnter={() => handleMouseEnter(index + 1)}
          />
        ))}
        {/* Half star */}
        {hasHalfStar && (
          <div className="relative">
            <Star className={cn(sizeClasses[size], 'text-secondary-300')} />
            <StarHalf
              className={cn(
                sizeClasses[size],
                'absolute left-0 top-0 fill-warning-500 text-warning-500'
              )}
              onClick={() => handleClick(fullStars + 0.5)}
              onMouseEnter={() => handleMouseEnter(fullStars + 1)}
            />
          </div>
        )}
        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <Star
            key={`empty-${index}`}
            className={cn(sizeClasses[size], 'text-secondary-300')}
            onClick={() => handleClick(fullStars + (hasHalfStar ? 1 : 0) + index + 1)}
            onMouseEnter={() => handleMouseEnter(fullStars + (hasHalfStar ? 1 : 0) + index + 1)}
          />
        ))}
      </div>
      {showValue && (
        <span className="ml-1 text-sm font-medium text-secondary-900">{rating.toFixed(1)}</span>
      )}
      {showCount && count > 0 && (
        <span className="text-sm text-secondary-500">({count.toLocaleString()})</span>
      )}
    </div>
  )
}

// Rating breakdown component (for detailed reviews display)
interface RatingBreakdownProps {
  ratings: { stars: number; count: number }[]
  totalCount: number
  className?: string
}

const RatingBreakdown = ({ ratings, totalCount, className }: RatingBreakdownProps) => {
  return (
    <div className={cn('space-y-2', className)}>
      {ratings
        .sort((a, b) => b.stars - a.stars)
        .map(({ stars, count }) => {
          const percentage = totalCount > 0 ? (count / totalCount) * 100 : 0
          return (
            <div key={stars} className="flex items-center gap-2">
              <span className="w-8 text-sm text-secondary-600">{stars} star</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary-200">
                <div
                  className="h-full bg-warning-500 transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-12 text-right text-sm text-secondary-500">
                {percentage.toFixed(0)}%
              </span>
            </div>
          )
        })}
    </div>
  )
}

export { RatingStars, RatingBreakdown }
