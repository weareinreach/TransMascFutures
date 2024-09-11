/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 *
 * 1. You want to modify request context (see Part 1)
 * 2. You want to create a new middleware or type of procedure (see Part 3)
 *
 * Tl;dr - this is where all the tRPC server stuff is created and plugged in. The pieces you will need to use
 * are documented accordingly near the end
 */

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API
 *
 * These allow you to access things like the database, the session, etc, when processing a request
 */
import { initTRPC } from '@trpc/server'
import superjson from 'superjson'
import { ZodError } from 'zod'

import { prisma } from '../db'

/**
 * This helper generates the "internals" for a tRPC context. If you need to use it, you can export it from
 * here
 *
 * Examples of things you may need it for:
 *
 * - Testing, so we dont have to mock Next.js' req/res
 * - Trpc's `createSSGHelpers` where we don't have req/res
 *
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 */
export const createInnerTRPCContext = (opts: { headers: Headers }) => {
	return {
		prisma,
		...opts,
	}
}

/**
 * This is the actual context you'll use in your router. It will be used to process every request that goes
 * through your tRPC endpoint
 *
 * @link https://trpc.io/docs/context
 */
export const createTRPCContext = (opts: { headers: Headers }) => {
	return {
		prisma,
		...opts,
	}
}

/**
 * 2. INITIALIZATION
 *
 * This is where the trpc api is initialized, connecting the context and transformer
 */

const t = initTRPC.context<typeof createTRPCContext>().create({
	transformer: superjson,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
			},
		}
	},
})
/**
 * Create a server-side caller.
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * /src/server/api/routers folder
 */

/**
 * This is how you create new routers and subrouters in your tRPC API
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router

/**
 * Public (unauthed) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not guarantee
 * that a user querying is authorized, but you can still access user session data if they are logged in
 */
export const publicProcedure = t.procedure
