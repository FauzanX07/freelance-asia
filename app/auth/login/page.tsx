import { Metadata } from 'next'
import { LoginForm } from './login-form'

export const metadata: Metadata = {
  title: 'Log In',
  description: 'Log in to your FreelanceAsia account',
}

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-card border border-secondary-200 bg-white p-8 shadow-card">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-secondary-900">Welcome back</h1>
          <p className="mt-2 text-secondary-500">Log in to continue to FreelanceAsia</p>
        </div>

        <LoginForm />
      </div>
    </div>
  )
}
