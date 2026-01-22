import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background-primary">
      {/* Hero Section */}
      <header className="border-b border-secondary-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="FreelanceAsia"
              width={180}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/find-talent" className="text-secondary-600 hover:text-secondary-900">
              Find Talent
            </Link>
            <Link href="/find-work" className="text-secondary-600 hover:text-secondary-900">
              Find Work
            </Link>
            <Link href="/why-freelance-asia" className="text-secondary-600 hover:text-secondary-900">
              Why FreelanceAsia
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-secondary-600 hover:text-secondary-900 font-medium"
            >
              Log In
            </Link>
            <Link
              href="/auth/register"
              className="rounded-lg bg-primary-500 px-4 py-2 font-medium text-white hover:bg-primary-600 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary-800 to-secondary-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
            Hire Top Asian Talent
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-secondary-300 md:text-xl">
            Connect with skilled freelancers from across Asia. Quality work, competitive rates,
            global standards.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/auth/register?role=client"
              className="rounded-lg bg-primary-500 px-8 py-3 text-lg font-semibold text-white hover:bg-primary-600 transition-colors"
            >
              Hire Asian Talent
            </Link>
            <Link
              href="/auth/register?role=freelancer"
              className="rounded-lg border-2 border-white px-8 py-3 text-lg font-semibold text-white hover:bg-white hover:text-secondary-900 transition-colors"
            >
              Work as Freelancer
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-secondary-200 bg-background-secondary py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-500 md:text-4xl">50+</div>
              <div className="mt-1 text-secondary-600">Asian Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-500 md:text-4xl">100K+</div>
              <div className="mt-1 text-secondary-600">Skilled Freelancers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-500 md:text-4xl">50K+</div>
              <div className="mt-1 text-secondary-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-500 md:text-4xl">$10M+</div>
              <div className="mt-1 text-secondary-600">Paid to Freelancers</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-secondary-900">
            How FreelanceAsia Works
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {/* For Clients */}
            <div className="rounded-card border border-secondary-200 bg-white p-6 shadow-card">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-50">
                <svg className="h-6 w-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-secondary-900">1. Post a Job</h3>
              <p className="text-secondary-600">
                Describe your project, set your budget, and post it to our marketplace of talented Asian freelancers.
              </p>
            </div>
            <div className="rounded-card border border-secondary-200 bg-white p-6 shadow-card">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-50">
                <svg className="h-6 w-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-secondary-900">2. Review Proposals</h3>
              <p className="text-secondary-600">
                Receive proposals from qualified freelancers. Review portfolios, ratings, and expertise to find the perfect match.
              </p>
            </div>
            <div className="rounded-card border border-secondary-200 bg-white p-6 shadow-card">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-50">
                <svg className="h-6 w-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-secondary-900">3. Hire & Collaborate</h3>
              <p className="text-secondary-600">
                Hire your chosen freelancer and collaborate securely with built-in messaging, milestones, and escrow payments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Categories */}
      <section className="bg-background-secondary py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-secondary-900">
            Popular Categories
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {[
              { name: 'Web Development', icon: '💻' },
              { name: 'Mobile Apps', icon: '📱' },
              { name: 'Graphic Design', icon: '🎨' },
              { name: 'Writing', icon: '✍️' },
              { name: 'Video Editing', icon: '🎬' },
              { name: 'Data Entry', icon: '📊' },
              { name: 'Virtual Assistant', icon: '👩‍💼' },
              { name: 'Translation', icon: '🌐' },
              { name: 'Marketing', icon: '📈' },
              { name: 'Accounting', icon: '💰' },
              { name: 'UI/UX Design', icon: '🖌️' },
              { name: 'SEO', icon: '🔍' },
            ].map((category) => (
              <Link
                key={category.name}
                href={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="rounded-card border border-secondary-200 bg-white p-4 text-center shadow-card transition-shadow hover:shadow-card-hover"
              >
                <span className="mb-2 block text-2xl">{category.icon}</span>
                <span className="text-sm font-medium text-secondary-700">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-500 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-primary-100">
            Join thousands of businesses and freelancers already using FreelanceAsia to connect,
            collaborate, and succeed.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/auth/register?role=client"
              className="rounded-lg bg-white px-8 py-3 font-semibold text-primary-500 hover:bg-secondary-100 transition-colors"
            >
              Start Hiring
            </Link>
            <Link
              href="/auth/register?role=freelancer"
              className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white hover:bg-primary-600 transition-colors"
            >
              Become a Freelancer
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-secondary-200 bg-secondary-900 py-12 text-secondary-400">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 grid gap-8 md:grid-cols-4">
            <div>
              <Image
                src="/images/logo.png"
                alt="FreelanceAsia"
                width={140}
                height={32}
                className="mb-4 h-8 w-auto brightness-0 invert"
              />
              <p className="text-sm">
                Connecting Asian Talent with Global Opportunities
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-white">For Clients</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/how-to-hire" className="hover:text-white">How to Hire</Link></li>
                <li><Link href="/talent-marketplace" className="hover:text-white">Talent Marketplace</Link></li>
                <li><Link href="/project-catalog" className="hover:text-white">Project Catalog</Link></li>
                <li><Link href="/enterprise" className="hover:text-white">Enterprise</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-white">For Freelancers</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/how-to-find-work" className="hover:text-white">How to Find Work</Link></li>
                <li><Link href="/direct-contracts" className="hover:text-white">Direct Contracts</Link></li>
                <li><Link href="/skill-tests" className="hover:text-white">Skill Tests</Link></li>
                <li><Link href="/resources" className="hover:text-white">Resources</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-white">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/trust-safety" className="hover:text-white">Trust & Safety</Link></li>
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between border-t border-secondary-700 pt-8 md:flex-row">
            <p className="text-sm">&copy; 2024 FreelanceAsia. All rights reserved.</p>
            <div className="mt-4 flex gap-6 text-sm md:mt-0">
              <Link href="/terms" className="hover:text-white">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/cookies" className="hover:text-white">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
