import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'white'
  showText?: boolean
  href?: string
  className?: string
}

const Logo = ({
  size = 'md',
  variant = 'default',
  showText = true,
  href = '/',
  className,
}: LogoProps) => {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10',
  }

  const widthMap = {
    sm: 120,
    md: 160,
    lg: 200,
  }

  const heightMap = {
    sm: 24,
    md: 32,
    lg: 40,
  }

  const logoContent = (
    <Image
      src="/images/logo.png"
      alt="FreelanceAsia"
      width={widthMap[size]}
      height={heightMap[size]}
      className={cn(
        sizeClasses[size],
        'w-auto',
        variant === 'white' && 'brightness-0 invert',
        className
      )}
      priority
    />
  )

  if (href) {
    return (
      <Link href={href} className="flex items-center">
        {logoContent}
      </Link>
    )
  }

  return <div className="flex items-center">{logoContent}</div>
}

// Icon-only version of the logo (for mobile or favicon)
interface LogoIconProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const LogoIcon = ({ size = 'md', className }: LogoIconProps) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  }

  // Using the first letter as a placeholder icon
  // In production, you'd use an actual icon version of the logo
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-lg bg-primary-500 font-bold text-white',
        sizeClasses[size],
        className
      )}
    >
      F
    </div>
  )
}

export { Logo, LogoIcon }
