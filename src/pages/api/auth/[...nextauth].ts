import NextAuth from 'next-auth'

import { env } from '../../../env/server.mjs'

import type { NextAuthOptions } from 'next-auth'
// Prisma adapter for NextAuth, optional and can be removed

export const authOptions: NextAuthOptions = {
	// Include user.id on session
	callbacks: {
		session({ session, user }) {
			if (session.user) {
				session.user.id = user.id
			}
			return session
		},
	},
	// Configure one or more authentication providers
	session: {
		strategy: 'jwt',
	},
	providers: [
		/**
		 * ...add more providers here
		 *
		 * Most other providers require a bit more work than the Discord provider. For example, the GitHub
		 * provider requires you to add the `refresh_token_expires_in` field to the Account model. Refer to the
		 * NextAuth.js docs for the provider you want to use. Example:
		 *
		 * @see https://next-auth.js.org/providers/github
		 */
	],
}

export default NextAuth(authOptions)
