import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc'

export const storyRouter = createTRPCRouter({
	recentNine: publicProcedure
		.input(
			z
				.object({
					category: z.enum(['queer', 'bipoc', 'disabled']).nullish(),
				})
				.nullish()
		)
		.query(async ({ ctx, input }) => {
			let filter = { published: true }
			if (input && input.category) filter = { ...filter, ...{ keyJoy: input.category } }

			const stories = await ctx.prisma.story.findMany({
				where: filter,
				take: 9,
				orderBy: { createdAt: 'desc' },
				include: { defaultImage: true },
			})
			return stories
		}),
	getStoryBySlug: publicProcedure
		.input(
			z.object({
				publicSlug: z.string(),
			})
		)
		.query(async ({ ctx, input }) => {
			const story = await ctx.prisma.story.findUnique({
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
			const story = await ctx.prisma.story.findUnique({
				where: { id: input.id },
			})
			return story
		}),
})
