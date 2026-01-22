import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-text-primary text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logo.png"
                alt="FreelanceAsia"
                width={40}
                height={40}
                className="rounded"
              />
              <span className="text-xl font-bold">FreelanceAsia</span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-sm">
              Connect with top Asian talent. The leading platform for hiring skilled
              freelancers from across Asia.
            </p>
            <p className="text-sm text-gray-500">Hire Top Asian Talent</p>
          </div>

          {/* For Clients */}
          <div>
            <h3 className="font-semibold mb-4">For Clients</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/how-it-works" className="text-gray-400 hover:text-white transition-colors">
                  How to Hire
                </Link>
              </li>
              <li>
                <Link href="/freelancers" className="text-gray-400 hover:text-white transition-colors">
                  Find Freelancers
                </Link>
              </li>
              <li>
                <Link href="/jobs/post" className="text-gray-400 hover:text-white transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/contests/create" className="text-gray-400 hover:text-white transition-colors">
                  Start a Contest
                </Link>
              </li>
              <li>
                <Link href="/enterprise" className="text-gray-400 hover:text-white transition-colors">
                  Enterprise
                </Link>
              </li>
            </ul>
          </div>

          {/* For Freelancers */}
          <div>
            <h3 className="font-semibold mb-4">For Freelancers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/how-it-works/freelancer" className="text-gray-400 hover:text-white transition-colors">
                  How to Find Work
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-gray-400 hover:text-white transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/gigs/create" className="text-gray-400 hover:text-white transition-colors">
                  Create a Gig
                </Link>
              </li>
              <li>
                <Link href="/contests" className="text-gray-400 hover:text-white transition-colors">
                  Explore Contests
                </Link>
              </li>
              <li>
                <Link href="/seller-levels" className="text-gray-400 hover:text-white transition-colors">
                  Seller Levels
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-gray-400 hover:text-white transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/trust-safety" className="text-gray-400 hover:text-white transition-colors">
                  Trust & Safety
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-gray-400 hover:text-white transition-colors">
                  API
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link href="/accessibility" className="hover:text-white transition-colors">
                Accessibility
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} FreelanceAsia. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
