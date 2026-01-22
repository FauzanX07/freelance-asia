import { Metadata } from 'next'
import { RegisterForm } from './register-form'

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create your FreelanceAsia account - Connect with Asian talent or find global clients',
}

export default function RegisterPage() {
  return (
    <div className="w-full max-w-lg">
      <div className="rounded-card border border-secondary-200 bg-white p-8 shadow-card">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-secondary-900">Create your account</h1>
          <p className="mt-2 text-secondary-500">Join FreelanceAsia today</p>
        </div>

        <RegisterForm />
      </div>
    </div>
  )
}
