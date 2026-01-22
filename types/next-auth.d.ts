import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: string
      emailVerified: Date | null
      freelancerProfileId: string | null
      clientProfileId: string | null
      connects: number
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    role: string
    emailVerified: Date | null
    freelancerProfileId: string | null
    clientProfileId: string | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string
    role: string
    emailVerified: Date | null
    freelancerProfileId: string | null
    clientProfileId: string | null
    connects: number
  }
}
