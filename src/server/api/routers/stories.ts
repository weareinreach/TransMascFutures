import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc'

export const categories = z.enum(['queer', 'bipoc', 'disabled'])

export const storyRouter = createTRPCRouter({
	recentNine: publicProcedure
		.input(
			z
				.object({
					category: categories.nullish(),
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
	getStoryBySlug: publicProcedure
		.input(
			z.object({
				publicSlug: z.string(),
			})
		)
		.query(async ({ ctx, input }) => {
			const story = await ctx.prisma.story.findUniqueOrThrow({
				where: { publicSlug: input.publicSlug },
			})
			return story
		}),
	getStoryById: protectedProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.query(async ({ ctx, input }) => {
			const story = await ctx.prisma.story.findUniqueOrThrow({
				where: { id: input.id },
			})
			return story
		}),
})
