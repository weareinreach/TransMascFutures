import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

export const storyRouter = createTRPCRouter({
	recentNine: publicProcedure
		.input(
			z
				.object({
					category: z.enum(['queer', 'bipoc', 'disabled']).nullish(),
				})
				.nullish()
		)
		.query(({ ctx, input }) => {
			let filter = { published: true }
			if (input && input.category) filter = { ...filter, ...{ keyJoy: input.category } }

			return ctx.prisma.story.findMany({
				where: filter,
				take: 9,
				orderBy: { createdAt: 'desc' },
				include: { defaultImage: true },
			})
		}),
})
