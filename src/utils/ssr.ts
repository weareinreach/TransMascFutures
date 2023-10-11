import { createServerSideHelpers } from '@trpc/react-query/server'
import superjson from 'superjson'

import { appRouter } from '~/server/api/root'
import { createInnerTRPCContext } from '~/server/api/trpc'

export const trpcServerClient = () => {
	return createServerSideHelpers({
		router: appRouter,
		ctx: createInnerTRPCContext(),
		transformer: superjson,
	})
}
