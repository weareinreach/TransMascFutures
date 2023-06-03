import { z } from 'zod'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

export const storyRouter = createTRPCRouter({
	// recentNine: publicProcedure
	// 	.input(
	// 		z
	// 			.object({
	// 				category: z.string(),
	// 			})
	// 			.optional()
	// 	)
	// 	.query(async ({ ctx, input }) => {
	// 		const filter: Prisma.StoryWhereInput = {
	// 			published: true,
	// 			categories: { some: { category: { categoryEN: input?.category } } },
	// 		}

	// 		const stories = await ctx.prisma.story.findMany({
	// 			where: filter,
	// 			orderBy: { createdAt: 'desc' },
	// 			take: 9,
	// 			include: {
	// 				image: true,
	// 				categories: !input?.category ? { include: { category: true } } : false,
	// 			},
	// 		})

	// 		if (stories.length === 0) throw new TRPCError({ code: 'NOT_FOUND' })

	// 		return stories
	// 	}),

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
	getStoryById: publicProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.query(async ({ ctx, input }) => {
			const story = await ctx.prisma.story.findUniqueOrThrow({
				where: { id: input.id, published: true },
				select: {
					id: true,
					name: true,
					response1EN: true,
					response2EN: true,
					response1ES: true,
					response2ES: true,
					categories: {
						select: {
							category: {
								select: {
									id: true,
									image: true,
									imageAltEN: true,
									imageAltES: true,
									categoryEN: true,
									categoryES: true,
									tag: true,
								},
							},
						},
					},
					pronouns: { select: { pronoun: { select: { pronounsEN: true, pronounsES: true } } } },
				},
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
	getCategories: publicProcedure.query(async ({ ctx }) => {
		const categories = await ctx.prisma.storyCategory.findMany({
			select: {
				categoryEN: true,
				categoryES: true,
				id: true,
				image: true,
				imageAltEN: true,
				imageAltES: true,
				tag: true,
			},
			orderBy: { order: 'asc' },
		})
		return categories
	}),
	getByCategory: publicProcedure
		.input(z.object({ tag: z.string(), take: z.number().optional() }))
		.query(async ({ ctx, input }) => {
			const stories = await ctx.prisma.story.findMany({
				where: {
					published: true,
					categories: { some: { category: { tag: input.tag } } },
				},
				select: {
					id: true,
					name: true,
					categories: { select: { category: { select: { categoryEN: true, categoryES: true, id: true } } } },
					pronouns: { select: { pronoun: { select: { id: true, pronounsEN: true, pronounsES: true } } } },
					response1EN: true,
					response1ES: true,
					response2EN: true,
					response2ES: true,
				},
				...(input.take ? { take: input.take } : {}),
			})
			return stories
		}),
})
