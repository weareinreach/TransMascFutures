import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc'

export const storyRouter = createTRPCRouter({
	recentNine: publicProcedure
		.input(
			z
				.object({
					category: z.string(),
				})
				.optional()
		)
		.query(async ({ ctx, input }) => {
			const filter = {
				published: true,
				categories: { some: { category: { category: input?.category } } },
			}

			const stories = await ctx.prisma.story.findMany({
				where: filter,
				orderBy: { createdAt: 'desc' },
				take: 9,
				include: {
					defaultImage: true,
					categories: !input?.category ? { include: { category: true } } : false,
				},
			})

			if (stories.length === 0) throw new TRPCError({ code: 'NOT_FOUND' })

			return stories
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
				include: { categories: { include: { category: true } } },
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
				include: { categories: { include: { category: true } } },
			})
			return story
		}),
	unpublishStory: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
		const { id } = input
		// Check if story belongs to user
		return await ctx.prisma.story.update({
			where: { id },
			data: { published: false },
		})
	}),
})
