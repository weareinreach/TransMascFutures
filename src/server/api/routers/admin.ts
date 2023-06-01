import { z } from 'zod'

import { nanoUrl } from '../../nanoIdUrl'
import { createTRPCRouter, adminProcedure } from '../trpc'

import type { StoryToCategory } from '@prisma/client'

export const adminRouter = createTRPCRouter({
	approveStory: adminProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
		try {
			const approvedStory = ctx.prisma.story.update({
				where: {
					id: input.id,
				},
				data: {
					published: true,
				},
				select: {
					id: true,
					published: true,
				},
			})
			return approvedStory
		} catch (error) {
			throw error
		}
	}),
	disapproveStory: adminProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
		try {
			const story = ctx.prisma.story.update({
				where: {
					id: input.id,
				},
				data: {
					published: false,
				},
				select: {
					id: true,
					published: true,
				},
			})
			return story
		} catch (error) {
			throw error
		}
	}),
	generatePublicUrl: adminProcedure.input(z.object({ id: z.string() })).mutation(({ ctx, input }) => {
		const slug = nanoUrl()

		const publicStory = ctx.prisma.story.update({
			where: {
				id: input.id,
			},
			data: {
				publicSlug: slug,
			},
			select: {
				id: true,
				publicSlug: true,
			},
		})
		return publicStory
	}),
	unsharePublicUrl: adminProcedure.input(z.object({ id: z.string() })).mutation(({ ctx, input }) => {
		const story = ctx.prisma.story.update({
			where: {
				id: input.id,
			},
			data: {
				publicSlug: null,
			},
			select: {
				id: true,
				publicSlug: true,
			},
		})
		return story
	}),
	editStory: adminProcedure
		.input(
			z
				.object({
					id: z.string(),
					storyJoy: z.string().trim().min(1).max(300).optional(),
					storyAccess: z.string().trim().min(1).max(300).optional(),
					categories: z.string().array().optional(),
				})
				.strict()
		)
		.mutation(async ({ ctx, input }) => {
			const { id, categories, ...storyFields } = input

			return await ctx.prisma.$transaction(async (tx) => {
				// Update story fields.
				// If categories are changed delete storyToCategory records to unused categories
				const updatedStory = await tx.story.update({
					where: { id },
					data: {
						...storyFields,
						categories:
							categories && categories.length > 0
								? { deleteMany: { categoryId: { notIn: categories } } }
								: undefined,
					},
					include: { categories: true },
				})

				// Add not asssociated categories to the story from the categories array
				if (categories) {
					const storyCategoryIDs = updatedStory.categories.map(({ categoryId }) => categoryId)
					const newCategories: StoryToCategory[] = []

					categories.map((categoryId) => {
						storyCategoryIDs.indexOf(categoryId) === -1 && newCategories.push({ categoryId, storyId: id })
					})

					if (newCategories.length > 0) await tx.storyToCategory.createMany({ data: newCategories })
				}

				return tx.story.findFirst({ where: { id } })
			})
		}),
	editPartnerLink: adminProcedure
		.input(z.object({ id: z.string(), href: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const updatedPartnerOrg = await ctx.prisma.partnerOrg.update({
				where: { id: input.id },
				data: { href: input.href },
			})

			return updatedPartnerOrg
		}),
})
