import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from '@/components/providers/session-provider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'FreelanceAsia - Hire Top Asian Talent',
    template: '%s | FreelanceAsia',
  },
  description:
    "FreelanceAsia connects businesses worldwide with top freelance talent from across Asia. Find skilled professionals for your projects or showcase your expertise to global clients.",
  keywords: [
    'freelance',
    'asian freelancers',
    'hire freelancers',
    'remote work',
    'gig economy',
    'outsourcing',
    'freelance marketplace',
  ],
  authors: [{ name: 'FreelanceAsia' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://freelanceasia.com',
    siteName: 'FreelanceAsia',
    title: 'FreelanceAsia - Hire Top Asian Talent',
    description:
      "Connect with skilled freelancers from across Asia or find global clients for your services.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FreelanceAsia - Hire Top Asian Talent',
    description:
      "Connect with skilled freelancers from across Asia or find global clients for your services.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
