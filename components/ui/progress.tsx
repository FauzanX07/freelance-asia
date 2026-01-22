'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '@/lib/utils'

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorClassName?: string
  showValue?: boolean
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, indicatorClassName, showValue, ...props }, ref) => (
  <div className="w-full">
    {showValue && (
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="text-secondary-600">Progress</span>
        <span className="font-medium text-secondary-900">{value}%</span>
      </div>
    )}
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-secondary-200',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          'h-full w-full flex-1 bg-primary-500 transition-all duration-300',
          indicatorClassName
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  </div>
))
Progress.displayName = ProgressPrimitive.Root.displayName

// Profile completion progress with tips
interface ProfileProgressProps {
  percentage: number
  tips?: string[]
  className?: string
}

const ProfileProgress = ({ percentage, tips, className }: ProfileProgressProps) => {
  const getColorClass = () => {
    if (percentage < 30) return 'bg-error-500'
    if (percentage < 60) return 'bg-warning-500'
    if (percentage < 90) return 'bg-info-500'
    return 'bg-primary-500'
  }

  const getLabel = () => {
    if (percentage < 30) return 'Getting Started'
    if (percentage < 60) return 'Making Progress'
    if (percentage < 90) return 'Almost There'
    return 'Profile Complete'
  }

  return (
    <div className={cn('rounded-card border border-secondary-200 bg-white p-4', className)}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-secondary-900">Profile Strength</span>
        <span className="text-sm font-semibold text-secondary-900">{percentage}%</span>
      </div>
      <ProgressPrimitive.Root className="relative h-2 w-full overflow-hidden rounded-full bg-secondary-200">
        <ProgressPrimitive.Indicator
          className={cn('h-full w-full flex-1 transition-all duration-300', getColorClass())}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </ProgressPrimitive.Root>
      <p className="mt-2 text-xs text-secondary-500">{getLabel()}</p>
      {tips && tips.length > 0 && percentage < 100 && (
        <div className="mt-3 border-t border-secondary-100 pt-3">
          <p className="mb-2 text-xs font-medium text-secondary-700">Tips to improve:</p>
          <ul className="space-y-1">
            {tips.slice(0, 3).map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-xs text-secondary-500">
                <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-primary-500" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export { Progress, ProfileProgress }
