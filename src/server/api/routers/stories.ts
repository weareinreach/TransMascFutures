import { z } from 'zod'

import { SurveySchema } from '~/pages/survey'
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
				locale: z.enum(['en', 'es']),
			})
		)
		.query(async ({ ctx, input }) => {
			const isEN = input.locale === 'en'
			if (isEN) {
				const story = await ctx.prisma.story.findUniqueOrThrow({
					where: { id: input.id, published: true },
					select: {
						id: true,
						name: true,
						response1EN: true,
						response2EN: true,
						categories: {
							select: {
								category: {
									select: {
										id: true,
										image: true,
										imageAltEN: true,
										categoryEN: true,
										tag: true,
									},
								},
							},
						},
						pronouns: { select: { pronoun: { select: { pronounsEN: true } } } },
					},
				})
				const { categories, pronouns, response1EN, response2EN, ...rest } = story
				const formatted = {
					...rest,
					response1: response1EN,
					response2: response2EN,
					categories: categories.map(({ category }) => ({
						category: {
							id: category.id,
							image: category.image,
							imageAlt: category.imageAltEN,
							category: category.categoryEN,
							tag: category.tag,
						},
					})),
					pronouns: pronouns.map(({ pronoun }) => ({ pronoun: pronoun.pronounsEN })),
				}
				return formatted
			}
			const story = await ctx.prisma.story.findUniqueOrThrow({
				where: { id: input.id, published: true },
				select: {
					id: true,
					name: true,
					response1ES: true,
					response2ES: true,
					categories: {
						select: {
							category: {
								select: {
									id: true,
									image: true,
									imageAltES: true,
									categoryES: true,
									tag: true,
								},
							},
						},
					},
					pronouns: { select: { pronoun: { select: { pronounsES: true } } } },
				},
			})
			const { categories, pronouns, response1ES, response2ES, ...rest } = story
			const formatted = {
				...rest,
				response1: response1ES,
				response2: response2ES,
				categories: categories.map(({ category }) => ({
					category: {
						id: category.id,
						image: category.image,
						imageAlt: category.imageAltES,
						category: category.categoryES,
						tag: category.tag,
					},
				})),
				pronouns: pronouns.map(({ pronoun }) => ({ pronoun: pronoun.pronounsES })),
			}
			return formatted
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
		.input(z.object({ locale: z.enum(['en', 'es']) }))
		.query(async ({ ctx, input }) => {
			if (input.locale === 'en') {
				const categories = await ctx.prisma.storyCategory.findMany({
					select: {
						categoryEN: true,
						id: true,
						image: true,
						imageAltEN: true,
						tag: true,
					},
					orderBy: { order: 'asc' },
				})
				const formatted = categories.map(({ categoryEN, imageAltEN, ...rest }) => ({
					...rest,
					category: categoryEN,
					imageAlt: imageAltEN,
				}))
				return formatted
			}

			const categories = await ctx.prisma.storyCategory.findMany({
				select: {
					categoryES: true,
					id: true,
					image: true,
					imageAltES: true,
					tag: true,
				},
				orderBy: { order: 'asc' },
			})
			const formatted = categories.map(({ categoryES, imageAltES, ...rest }) => ({
				...rest,
				category: categoryES,
				imageAlt: imageAltES,
			}))
			return formatted
		}),
	getByCategory: publicProcedure
		.input(z.object({ tag: z.string(), take: z.number().optional(), locale: z.enum(['en', 'es']) }))
		.query(async ({ ctx, input }) => {
			if (input.locale === 'en') {
				const stories = await ctx.prisma.story.findMany({
					where: {
						published: true,
						categories: { some: { category: { tag: input.tag } } },
					},
					select: {
						id: true,
						name: true,
						categories: {
							select: { category: { select: { categoryEN: true, id: true } } },
						},
						pronouns: { select: { pronoun: { select: { id: true, pronounsEN: true } } } },
						response1EN: true,
						response2EN: true,
					},
					...(input.take ? { take: input.take } : {}),
					orderBy: { createdAt: 'desc' },
				})
				const formatted = stories.map(({ categories, pronouns, response1EN, response2EN, ...rest }) => ({
					...rest,
					response1: response1EN,
					response2: response2EN,
					categories: categories.map(({ category }) => ({
						category: {
							id: category.id,
							category: category.categoryEN,
						},
					})),
					pronouns: pronouns.map(({ pronoun }) => ({
						pronoun: pronoun.pronounsEN,
					})),
				}))
				return formatted
			}
			const stories = await ctx.prisma.story.findMany({
				where: {
					published: true,
					categories: { some: { category: { tag: input.tag } } },
				},
				select: {
					id: true,
					name: true,
					categories: { select: { category: { select: { categoryES: true, id: true } } } },
					pronouns: { select: { pronoun: { select: { id: true, pronounsES: true } } } },
					response1ES: true,
					response2ES: true,
				},
				...(input.take ? { take: input.take } : {}),
				orderBy: { createdAt: 'desc' },
			})
			const formatted = stories.map(({ categories, pronouns, response1ES, response2ES, ...rest }) => ({
				...rest,
				response1: response1ES,
				response2: response2ES,
				categories: categories.map(({ category }) => ({
					category: {
						id: category.id,
						category: category.categoryES,
					},
				})),
				pronouns: pronouns.map(({ pronoun }) => ({
					pronoun: pronoun.pronounsES,
				})),
			}))
			return formatted
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
				response1EN: input.q8,
				response2EN: input.q9,
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
		if (storyRecord.response1EN) {
			crowdinAdditions.push({
				op: 'add',
				path: '/-',
				value: {
					text: storyRecord.response1EN,
					identifier: `${storyRecord.id}.response1`,
					fileId: 2653,
					context: `Submitter's Name: "${input.q4}" | Pronouns: "${input.q7.join('/')}"`,
				},
			})
		}
		if (storyRecord.response2EN) {
			crowdinAdditions.push({
				op: 'add',
				path: '/-',
				value: {
					text: storyRecord.response2EN,
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
