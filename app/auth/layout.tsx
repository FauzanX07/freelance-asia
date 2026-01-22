import Image from 'next/image'
import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background-secondary">
      {/* Header */}
      <header className="border-b border-secondary-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="FreelanceAsia"
              width={160}
              height={36}
              className="h-9 w-auto"
              priority
            />
          </Link>
          <div className="text-sm text-secondary-600">
            Need help?{' '}
            <Link href="/help" className="font-medium text-primary-500 hover:text-primary-600">
              Contact Support
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex min-h-[calc(100vh-73px)] items-center justify-center px-4 py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-secondary-200 bg-white py-6">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-secondary-500 md:flex-row">
            <p>&copy; 2024 FreelanceAsia. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/terms" className="hover:text-secondary-700">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-secondary-700">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
