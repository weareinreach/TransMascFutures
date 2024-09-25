import { z } from 'zod'

import { SurveySchema } from '~/app/_schemas/survey'
import { crowdin } from '~/server/crowdin'

import { createTRPCRouter, publicProcedure } from '../trpc'

export const storyRouter = createTRPCRouter({
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
					response1: true,
					response2: true,
					categories: {
						select: {
							category: {
								select: {
									id: true,
									image: true,
									imageAlt: true,
									category: true,
									tag: true,
								},
							},
						},
					},
					pronouns: { select: { pronoun: { select: { pronouns: true } } } },
				},
			})
			return story
		}),
	// unpublishStory: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
	// 	const { id } = input
	// 	// Check if story belongs to user
	// 	return await ctx.prisma.story.update({
	// 		where: { id },
	// 		data: { published: false },
	// 	})
	// }),
	getCategories: publicProcedure
		// .input(z.object({ locale: z.enum(['en', 'es']) }))
		.query(async ({ ctx }) => {
			const categories = await ctx.prisma.storyCategory.findMany({
				select: {
					category: true,
					id: true,
					image: true,
					imageAlt: true,
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
					categories: {
						select: { category: { select: { category: true, id: true } } },
					},
					pronouns: { select: { pronoun: { select: { id: true, pronouns: true } } } },
					response1: true,
					response2: true,
				},
				...(input.take ? { take: input.take } : {}),
				orderBy: { createdAt: 'desc' },
			})
			return stories
		}),
	submit: publicProcedure.input(SurveySchema()).mutation(async ({ ctx, input }) => {
		const submission = await ctx.prisma.storySubmission.create({
			data: {
				responses: input,
				userId: 'noUserId',
			},
			select: {
				id: true,
			},
		})
		const storyRecord = await ctx.prisma.story.create({
			data: {
				name: input.q4,
				response1: input.q8,
				response2: input.q9,
				categories: {
					create: input.q5.map((tag) => ({ category: { connect: { tag } } })),
				},
				pronouns: {
					create: input.q7.map((tag) => ({ pronoun: { connect: { tag } } })),
				},
				published: false,
			},
		})

		const crowdinAdditions: CrowdinBatchAdd[] = []
		if (storyRecord.response1) {
			crowdinAdditions.push({
				op: 'add',
				path: '/-',
				value: {
					text: storyRecord.response1,
					identifier: `${storyRecord.id}.response1`,
					fileId: 2653,
					context: `Submitter's Name: "${input.q4}" | Pronouns: "${input.q7.join('/')}"`,
				},
			})
		}
		if (storyRecord.response2) {
			crowdinAdditions.push({
				op: 'add',
				path: '/-',
				value: {
					text: storyRecord.response2,
					identifier: `${storyRecord.id}.response2`,
					fileId: 2653,
					context: `Submitter's Name: "${input.q4}" | Pronouns: "${input.q7.join('/')}"`,
				},
			})
		}

		if (crowdinAdditions.length) {
			try {
				await crowdin.sourceStringsApi.stringBatchOperations(14, crowdinAdditions)
			} catch (e) {
				console.error(e)
			}
		}
		return submission
	}),
})

type CrowdinBatchAdd = {
	op: 'add'
	path: string
	value: {
		text: string
		identifier: string
		fileId: number
		context?: string
	}
}
