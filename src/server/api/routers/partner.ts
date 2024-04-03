import { createTRPCRouter, publicProcedure } from '../trpc'

export const partnerRouter = createTRPCRouter({
	getAll: publicProcedure.query(
		async ({ ctx }) =>
			await ctx.prisma.partnerOrg.findMany({
				where: { visible: true },
				select: { id: true, name: true, tag: true, order: true, href: true },
				orderBy: { order: 'asc' },
			})
	),
})
