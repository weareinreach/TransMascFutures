// import { adminRouter } from './routers/admin'
import { createCallerFactory, createTRPCRouter } from '~/server/api/trpc'

import { partnerRouter } from './routers/partner'
import { storyRouter } from './routers/stories'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
	story: storyRouter,
	// admin: adminRouter,
	partner: partnerRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

/**
 * Create a server-side caller for the tRPC API.
 *
 * @example Const trpc = createCaller(createContext); const res = await trpc.post.all(); ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter)
