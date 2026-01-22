'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Mail, Lock, User, Loader2, Briefcase, Users, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CountrySelect } from '@/components/ui/country-select'
import { registerSchema, type RegisterFormData } from '@/lib/validations/auth'
import { cn } from '@/lib/utils'

type Role = 'CLIENT' | 'FREELANCER' | 'BOTH'

const roleOptions = [
  {
    value: 'CLIENT' as Role,
    title: 'Hire Asian Talent',
    description: 'I want to hire freelancers for my projects',
    icon: Briefcase,
    message: 'Hire the best talent from across Asia',
  },
  {
    value: 'FREELANCER' as Role,
    title: 'Work as Freelancer',
    description: 'I want to offer my services to clients worldwide',
    icon: User,
    message: 'FreelanceAsia connects Asian talent with global clients',
    asianOnly: true,
  },
  {
    value: 'BOTH' as Role,
    title: 'Both',
    description: 'I want to hire and offer services',
    icon: Users,
    message: 'Get the best of both worlds',
    asianOnly: true,
  },
]

export function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialRole = searchParams.get('role')?.toUpperCase() as Role | undefined

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: initialRole && ['CLIENT', 'FREELANCER', 'BOTH'].includes(initialRole) ? initialRole : undefined,
    },
  })

  const selectedRole = watch('role')
  const isAsianRequired = selectedRole === 'FREELANCER' || selectedRole === 'BOTH'

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    setAuthError(null)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email.toLowerCase(),
          password: data.password,
          role: data.role,
          country: data.country,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setAuthError(result.error || 'Failed to create account')
        return
      }

      // Sign in automatically after registration
      const signInResult = await signIn('credentials', {
        email: data.email.toLowerCase(),
        password: data.password,
        redirect: false,
      })

      if (signInResult?.error) {
        setAuthError('Account created but failed to sign in. Please try logging in.')
        router.push('/auth/login')
      } else {
        router.push('/onboarding')
        router.refresh()
      }
    } catch {
      setAuthError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    setAuthError(null)

    try {
      await signIn('google', { callbackUrl: '/onboarding' })
    } catch {
      setAuthError('Failed to sign in with Google')
      setIsGoogleLoading(false)
    }
  }

  const selectedRoleOption = roleOptions.find((r) => r.value === selectedRole)

  return (
    <div className="space-y-6">
      {/* Role Selection */}
      <div>
        <label className="mb-3 block text-sm font-medium text-secondary-700">
          How do you want to use FreelanceAsia?
        </label>
        <div className="grid gap-3">
          {roleOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                setValue('role', option.value, { shouldValidate: true })
                // Clear country if switching to client-only
                if (option.value === 'CLIENT') {
                  setValue('country', '')
                }
              }}
              className={cn(
                'flex items-start gap-3 rounded-lg border p-4 text-left transition-all',
                selectedRole === option.value
                  ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500'
                  : 'border-secondary-200 hover:border-secondary-300'
              )}
            >
              <div
                className={cn(
                  'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full',
                  selectedRole === option.value
                    ? 'bg-primary-500 text-white'
                    : 'bg-secondary-100 text-secondary-600'
                )}
              >
                <option.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-secondary-900">{option.title}</span>
                  {selectedRole === option.value && (
                    <CheckCircle2 className="h-5 w-5 text-primary-500" />
                  )}
                </div>
                <p className="mt-0.5 text-sm text-secondary-500">{option.description}</p>
                {option.asianOnly && (
                  <p className="mt-1 text-xs text-primary-600">*Requires Asian country residence</p>
                )}
              </div>
            </button>
          ))}
        </div>
        {errors.role && (
          <p className="mt-1 text-sm text-error-500">{errors.role.message}</p>
        )}
      </div>

      {/* Role Message */}
      {selectedRoleOption && (
        <div className="rounded-lg bg-primary-50 p-3 text-sm text-primary-700">
          {selectedRoleOption.message}
        </div>
      )}

      {/* Google Sign In */}
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleGoogleSignIn}
        disabled={isGoogleLoading || isLoading}
      >
        {isGoogleLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        )}
        Continue with Google
      </Button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-secondary-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-secondary-500">or continue with email</span>
        </div>
      </div>

      {/* Error Message */}
      {authError && (
        <div className="rounded-lg bg-error-50 p-3 text-sm text-error-600">
          {authError}
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register('name')}
          type="text"
          label="Full name"
          placeholder="John Doe"
          error={errors.name?.message}
          leftIcon={<User className="h-4 w-4" />}
          disabled={isLoading}
          autoComplete="name"
        />

        <Input
          {...register('email')}
          type="email"
          label="Email address"
          placeholder="you@example.com"
          error={errors.email?.message}
          leftIcon={<Mail className="h-4 w-4" />}
          disabled={isLoading}
          autoComplete="email"
        />

        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <CountrySelect
              value={field.value}
              onChange={field.onChange}
              label={isAsianRequired ? 'Country (Asian countries only)' : 'Country'}
              placeholder="Select your country"
              asianOnly={isAsianRequired}
              error={errors.country?.message}
              disabled={isLoading}
            />
          )}
        />

        <Input
          {...register('password')}
          type={showPassword ? 'text' : 'password'}
          label="Password"
          placeholder="Create a strong password"
          error={errors.password?.message}
          helperText="Min 8 characters, with uppercase, lowercase, and number"
          leftIcon={<Lock className="h-4 w-4" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-secondary-400 hover:text-secondary-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
          disabled={isLoading}
          autoComplete="new-password"
        />

        <Input
          {...register('confirmPassword')}
          type={showPassword ? 'text' : 'password'}
          label="Confirm password"
          placeholder="Confirm your password"
          error={errors.confirmPassword?.message}
          leftIcon={<Lock className="h-4 w-4" />}
          disabled={isLoading}
          autoComplete="new-password"
        />

        {/* Terms Agreement */}
        <div className="flex items-start gap-2">
          <input
            {...register('agreeToTerms')}
            type="checkbox"
            id="agreeToTerms"
            className="mt-1 h-4 w-4 rounded border-secondary-300 text-primary-500 focus:ring-primary-500"
            disabled={isLoading}
          />
          <label htmlFor="agreeToTerms" className="text-sm text-secondary-600">
            I agree to the{' '}
            <Link href="/terms" className="font-medium text-primary-500 hover:text-primary-600">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="font-medium text-primary-500 hover:text-primary-600">
              Privacy Policy
            </Link>
          </label>
        </div>
        {errors.agreeToTerms && (
          <p className="text-sm text-error-500">{errors.agreeToTerms.message}</p>
        )}

        <Button type="submit" className="w-full" isLoading={isLoading}>
          Create Account
        </Button>
      </form>

      {/* Sign In Link */}
      <p className="text-center text-sm text-secondary-600">
        Already have an account?{' '}
        <Link
          href="/auth/login"
          className="font-medium text-primary-500 hover:text-primary-600"
        >
          Log in
        </Link>
      </p>
    </div>
  )
}
