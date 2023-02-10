import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc'

export const storyRouter = createTRPCRouter({
	recentNine: publicProcedure.query(({ ctx }) =>
		ctx.prisma.story.findMany({
			where: {
				published: true,
			},
			take: 9,
			orderBy: {
				createdAt: 'desc',
			},
		})
	),
})
