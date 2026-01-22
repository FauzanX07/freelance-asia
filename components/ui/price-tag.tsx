import * as React from 'react'
import { cn, formatCurrency } from '@/lib/utils'

interface PriceTagProps {
  amount: number
  currency?: string
  period?: 'hour' | 'project' | 'month' | null
  originalAmount?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const PriceTag = ({
  amount,
  currency = 'USD',
  period = null,
  originalAmount,
  size = 'md',
  className,
}: PriceTagProps) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
  }

  const periodText = {
    hour: '/hr',
    project: '/project',
    month: '/mo',
  }

  const hasDiscount = originalAmount && originalAmount > amount

  return (
    <div className={cn('flex items-baseline gap-1', className)}>
      {hasDiscount && (
        <span className="text-sm text-secondary-400 line-through">
          {formatCurrency(originalAmount, currency)}
        </span>
      )}
      <span className={cn('font-semibold text-secondary-900', sizeClasses[size])}>
        {formatCurrency(amount, currency)}
      </span>
      {period && (
        <span className="text-sm text-secondary-500">{periodText[period]}</span>
      )}
    </div>
  )
}

// Price range tag
interface PriceRangeTagProps {
  minAmount: number
  maxAmount: number
  currency?: string
  period?: 'hour' | 'project' | 'month' | null
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const PriceRangeTag = ({
  minAmount,
  maxAmount,
  currency = 'USD',
  period = null,
  size = 'md',
  className,
}: PriceRangeTagProps) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
  }

  const periodText = {
    hour: '/hr',
    project: '/project',
    month: '/mo',
  }

  return (
    <div className={cn('flex items-baseline gap-1', className)}>
      <span className={cn('font-semibold text-secondary-900', sizeClasses[size])}>
        {formatCurrency(minAmount, currency)} - {formatCurrency(maxAmount, currency)}
      </span>
      {period && (
        <span className="text-sm text-secondary-500">{periodText[period]}</span>
      )}
    </div>
  )
}

// Gig pricing tiers (Fiverr style)
interface GigPricingTier {
  name: 'Basic' | 'Standard' | 'Premium'
  price: number
  description: string
  deliveryDays: number
  revisions: number
  features?: string[]
}

interface GigPricingProps {
  tiers: GigPricingTier[]
  currency?: string
  selectedTier?: string
  onSelectTier?: (tier: string) => void
  className?: string
}

const GigPricing = ({
  tiers,
  currency = 'USD',
  selectedTier,
  onSelectTier,
  className,
}: GigPricingProps) => {
  return (
    <div className={cn('grid grid-cols-3 gap-4', className)}>
      {tiers.map((tier) => (
        <div
          key={tier.name}
          onClick={() => onSelectTier?.(tier.name)}
          className={cn(
            'cursor-pointer rounded-lg border p-4 transition-all',
            selectedTier === tier.name
              ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500'
              : 'border-secondary-200 bg-white hover:border-secondary-300'
          )}
        >
          <div className="mb-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-secondary-500">
              {tier.name}
            </span>
          </div>
          <div className="mb-2 text-2xl font-bold text-secondary-900">
            {formatCurrency(tier.price, currency)}
          </div>
          <p className="mb-4 text-sm text-secondary-600">{tier.description}</p>
          <div className="space-y-2 border-t border-secondary-200 pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-secondary-500">Delivery</span>
              <span className="font-medium text-secondary-900">{tier.deliveryDays} days</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-secondary-500">Revisions</span>
              <span className="font-medium text-secondary-900">
                {tier.revisions === -1 ? 'Unlimited' : tier.revisions}
              </span>
            </div>
          </div>
          {tier.features && tier.features.length > 0 && (
            <ul className="mt-4 space-y-1 border-t border-secondary-200 pt-4">
              {tier.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-secondary-600">
                  <svg
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}

export { PriceTag, PriceRangeTag, GigPricing }
export type { GigPricingTier }
