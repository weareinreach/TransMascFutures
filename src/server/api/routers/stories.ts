import { z } from 'zod'

import { SurveySchema } from '~/pages/survey'
import { crowdin } from '~/server/crowdin'

import { createTRPCRouter, publicProcedure } from '../trpc'

type LocalizedStringFields = {
	en: string | null
	es: string | null
	fr: string | null
}

const selectLocalized = (data: LocalizedStringFields, locale: 'en' | 'es' | 'fr' | undefined): string => {
	switch (locale) {
		case 'fr':
			return data.fr ?? data.en ?? ''
		case 'es':
			return data.es ?? data.en ?? ''
		case 'en':
		default:
			return data.en ?? ''
	}
}

type SelectedStoryCategoryFields = {
	id: string
	image: string | null
	imageAltEN: string | null
	imageAltES: string | null
	imageAltFR: string | null
	categoryEN: string
	categoryES: string
	categoryFR: string | null
	tag: string
}

type SelectedPronounFields = {
	id: string
	pronounsEN: string
	pronounsES: string
	pronounsFR: string | null
	tag: string
}

type StoryToCategoryItem = {
	category: SelectedStoryCategoryFields
}

type PronounsToStoryItem = {
	pronoun: SelectedPronounFields
}

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
				locale: z.enum(['en', 'es', 'fr']).optional(),
			})
		)
		.query(async ({ ctx, input }) => {
			const story = await ctx.prisma.story.findUniqueOrThrow({
				where: { id: input.id, published: true },
				select: {
					id: true,
					name: true,
					response1EN: true,
					response1ES: true,
					response1FR: true,
					response2EN: true,
					response2ES: true,
					response2FR: true,
					categories: {
						select: {
							category: {
								select: {
									id: true,
									image: true,
									imageAltEN: true,
									imageAltES: true,
									imageAltFR: true,
									categoryEN: true,
									categoryES: true,
									categoryFR: true,
									tag: true,
								},
							},
						},
					},
					pronouns: {
						select: {
							pronoun: {
								select: {
									id: true,
									pronounsEN: true,
									pronounsES: true,
									pronounsFR: true,
									tag: true,
								},
							},
						},
					},
				},
			})

			const formatted = {
				...story,
				response1: selectLocalized(
					{ en: story.response1EN, es: story.response1ES, fr: story.response1FR },
					input.locale
				),
				response2: selectLocalized(
					{ en: story.response2EN, es: story.response2ES, fr: story.response2FR },
					input.locale
				),
				categories: (story.categories as StoryToCategoryItem[]).map((item) => {
					const category = item.category
					return {
						category: {
							id: category.id,
							image: category.image,
							tag: category.tag,
							imageAlt: selectLocalized(
								{ en: category.imageAltEN, es: category.imageAltES, fr: category.imageAltFR },
								input.locale
							),
							category: selectLocalized(
								{ en: category.categoryEN, es: category.categoryES, fr: category.categoryFR },
								input.locale
							),
						},
					}
				}),
				pronouns: (story.pronouns as PronounsToStoryItem[]).map((item) => {
					const pronoun = item.pronoun
					return {
						pronoun: selectLocalized(
							{ en: pronoun.pronounsEN, es: pronoun.pronounsES, fr: pronoun.pronounsFR },
							input.locale
						),
					}
				}),
			}
			return formatted
		}),

	getCategories: publicProcedure
		.input(z.object({ locale: z.enum(['en', 'es', 'fr']).optional() }))
		.query(async ({ ctx, input }) => {
			const categories = await ctx.prisma.storyCategory.findMany({
				select: {
					categoryEN: true,
					categoryES: true,
					categoryFR: true,
					id: true,
					image: true,
					imageAltEN: true,
					imageAltES: true,
					imageAltFR: true,
					tag: true,
				},
				orderBy: { order: 'asc' },
			})

			const formatted = categories.map(
				({ categoryEN, categoryES, categoryFR, imageAltEN, imageAltES, imageAltFR, ...rest }) => ({
					...rest,
					category: selectLocalized({ en: categoryEN, es: categoryES, fr: categoryFR }, input.locale),
					imageAlt: selectLocalized({ en: imageAltEN, es: imageAltES, fr: imageAltFR }, input.locale),
				})
			)
			return formatted
		}),

	getByCategory: publicProcedure
		.input(
			z.object({
				tag: z.string(),
				take: z.number().optional(),
				locale: z.enum(['en', 'es', 'fr']).optional(),
			})
		)
		.query(async ({ ctx, input }) => {
			const stories = await ctx.prisma.story.findMany({
				where: {
					published: true,
					categories: { some: { category: { tag: input.tag } } },
				},
				select: {
					id: true,
					name: true,
					response1EN: true,
					response1ES: true,
					response1FR: true,
					response2EN: true,
					response2ES: true,
					response2FR: true,
					categories: {
						select: {
							category: {
								select: {
									id: true,
									categoryEN: true,
									categoryES: true,
									categoryFR: true,
								},
							},
						},
					},
					pronouns: {
						select: {
							pronoun: {
								select: {
									id: true,
									pronounsEN: true,
									pronounsES: true,
									pronounsFR: true,
								},
							},
						},
					},
				},
				...(input.take ? { take: input.take } : {}),
				orderBy: { createdAt: 'desc' },
			})

			const formatted = stories.map(
				({
					categories,
					pronouns,
					response1EN,
					response1ES,
					response1FR,
					response2EN,
					response2ES,
					response2FR,
					...rest
				}) => ({
					...rest,
					response1: selectLocalized({ en: response1EN, es: response1ES, fr: response1FR }, input.locale),
					response2: selectLocalized({ en: response2EN, es: response2ES, fr: response2FR }, input.locale),
					categories: categories.map(({ category }) => ({
						category: {
							id: category.id,
							category: selectLocalized(
								{ en: category.categoryEN, es: category.categoryES, fr: category.categoryFR },
								input.locale
							),
						},
					})),
					pronouns: pronouns.map(({ pronoun }) => ({
						pronoun: selectLocalized(
							{ en: pronoun.pronounsEN, es: pronoun.pronounsES, fr: pronoun.pronounsFR },
							input.locale
						),
					})),
				})
			)
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
