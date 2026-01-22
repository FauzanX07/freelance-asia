'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Lock, Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { resetPasswordSchema, type ResetPasswordFormData } from '@/lib/validations/auth'

interface ResetPasswordPageProps {
  params: { token: string }
}

export default function ResetPasswordPage({ params }: ResetPasswordPageProps) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: params.token,
          password: data.password,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Failed to reset password')
        return
      }

      setIsSuccess(true)
      setTimeout(() => {
        router.push('/auth/login')
      }, 3000)
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="w-full max-w-md">
        <div className="rounded-card border border-secondary-200 bg-white p-8 shadow-card">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-success-50">
              <CheckCircle2 className="h-6 w-6 text-success-500" />
            </div>
            <h1 className="text-2xl font-bold text-secondary-900">Password reset successful</h1>
            <p className="mt-2 text-secondary-500">
              Your password has been reset. Redirecting to login...
            </p>
            <Link href="/auth/login">
              <Button className="mt-6 w-full">Go to Login</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-card border border-secondary-200 bg-white p-8 shadow-card">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-secondary-900">Reset your password</h1>
          <p className="mt-2 text-secondary-500">Enter your new password below</p>
        </div>

        {error && (
          <div className="mb-4 flex items-start gap-2 rounded-lg bg-error-50 p-3 text-sm text-error-600">
            <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <div>
              {error}
              {error.includes('expired') && (
                <Link
                  href="/auth/forgot-password"
                  className="mt-1 block font-medium text-error-700 hover:underline"
                >
                  Request a new reset link
                </Link>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            label="New password"
            placeholder="Enter your new password"
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
            label="Confirm new password"
            placeholder="Confirm your new password"
            error={errors.confirmPassword?.message}
            leftIcon={<Lock className="h-4 w-4" />}
            disabled={isLoading}
            autoComplete="new-password"
          />

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Reset Password
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-secondary-600">
          Remember your password?{' '}
          <Link
            href="/auth/login"
            className="font-medium text-primary-500 hover:text-primary-600"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
