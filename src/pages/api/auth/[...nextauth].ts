/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
import NextAuth from 'next-auth'
import { type NextAuthOptions, type User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

// Prisma adapter for NextAuth, optional and can be removed

export const authOptions: NextAuthOptions = {
	providers: [
		Credentials({
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			authorize: async (credentials) => {
				return {
					email: '',
					id: '',
					roles: [''],
					permissions: [''],
				}
			},
		}),
	],
	callbacks: {
		jwt: async ({ token, user }) => {
			user && (token.user = user as User)
			return token
		},
		session: async ({ session, token }) => {
			if (session.user) {
				session.user = token.user
			}
			return session
		},
	},
	// Configure one or more authentication providers
	session: {
		strategy: 'jwt',
	},
}

export default NextAuth(authOptions)
