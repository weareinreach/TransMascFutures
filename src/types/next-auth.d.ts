import { type DefaultSession, type DefaultUser } from 'next-auth'
import { type DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth/core/types' {
	/** Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context */
	export interface Session extends DefaultSession {
		user: User
	}
	export interface User extends DefaultUser {
		id: string
		roles: string[]
		permissions: string[]
		email: string
	}
}
declare module 'next-auth/jwt' {
	export interface JWT extends DefaultJWT {
		user: User
	}
}
export { Session, User, JWT }
