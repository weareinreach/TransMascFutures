import { createServerSideHelpers } from '@trpc/react-query/server'
import { type GetServerSidePropsContext, type NextApiRequest, type NextApiResponse } from 'next'
import { type Session } from 'next-auth'
import superjson from 'superjson'

import { appRouter } from '~/server/api/root'
import { createInnerTRPCContext } from '~/server/api/trpc'
import { getServerAuthSession } from '~/server/auth'

interface SSRContext {
	req: GetServerSidePropsContext['req']
	res: GetServerSidePropsContext['res']
	session?: never
}
interface ApiContext {
	req: NextApiRequest
	res: NextApiResponse
	session?: never
}
interface SessionContext {
	req?: never
	res?: never
	session: Session | null
}
type ServerContext = SSRContext | ApiContext

const isSessionContext = (ctx: ServerContext | SessionContext): ctx is SessionContext =>
	ctx?.session !== undefined
export const trpcServerClient = async (ctx: ServerContext | SessionContext) => {
	const session = isSessionContext(ctx) ? ctx.session : await getServerAuthSession(ctx)
	return createServerSideHelpers({
		router: appRouter,
		ctx: createInnerTRPCContext({ session }),
		transformer: superjson,
	})
}
