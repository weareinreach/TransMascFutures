/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from 'zod'

import { SurveySchema } from '~/pages/survey'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

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
	submit: publicProcedure.input(SurveySchema()).mutation(async ({ ctx, input }) => {
		const submission = await ctx.prisma.storySubmission.create({
			data: {
				responses: input,
				userId: ctx.session?.user?.id ?? 'noUserId',
			},
			select: {
				id: true,
			},
		})
		await ctx.prisma.story.create({
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

		return submission
	}),
})
