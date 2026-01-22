'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface VerifyEmailPageProps {
  params: { token: string }
}

export default function VerifyEmailPage({ params }: VerifyEmailPageProps) {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: params.token }),
        })

        const result = await response.json()

        if (!response.ok) {
          setError(result.error || 'Verification failed')
          setStatus('error')
          return
        }

        setStatus('success')
      } catch {
        setError('An unexpected error occurred')
        setStatus('error')
      }
    }

    verifyEmail()
  }, [params.token])

  if (status === 'loading') {
    return (
      <div className="w-full max-w-md">
        <div className="rounded-card border border-secondary-200 bg-white p-8 shadow-card">
          <div className="text-center">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary-500" />
            <h1 className="mt-4 text-2xl font-bold text-secondary-900">Verifying your email</h1>
            <p className="mt-2 text-secondary-500">Please wait...</p>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="w-full max-w-md">
        <div className="rounded-card border border-secondary-200 bg-white p-8 shadow-card">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-error-50">
              <XCircle className="h-6 w-6 text-error-500" />
            </div>
            <h1 className="text-2xl font-bold text-secondary-900">Verification failed</h1>
            <p className="mt-2 text-secondary-500">{error}</p>

            <div className="mt-6 space-y-3">
              <Link href="/auth/login">
                <Button className="w-full">Go to Login</Button>
              </Link>
              <p className="text-sm text-secondary-500">
                Need a new verification link?{' '}
                <Link
                  href="/auth/resend-verification"
                  className="font-medium text-primary-500 hover:text-primary-600"
                >
                  Resend verification email
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-card border border-secondary-200 bg-white p-8 shadow-card">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-success-50">
            <CheckCircle2 className="h-6 w-6 text-success-500" />
          </div>
          <h1 className="text-2xl font-bold text-secondary-900">Email verified</h1>
          <p className="mt-2 text-secondary-500">
            Your email has been verified successfully. You can now access all features.
          </p>

          <Link href="/dashboard">
            <Button className="mt-6 w-full">Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
