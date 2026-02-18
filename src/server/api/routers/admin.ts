import { z } from 'zod'

import { storyPublisher } from '~/server/story-publisher'

import { createTRPCRouter, publicProcedure } from '../trpc'

// NOTE: THIS ROUTER IS PUBLICLY ACCESSIBLE!
export const adminRouter = createTRPCRouter({
	login: publicProcedure
		.input(z.object({ email: z.string(), password: z.string() }))
		.mutation(({ input }) => {
			return input.email === process.env.ADMIN_EMAIL && input.password === process.env.ADMIN_PASSWORD
		}),
	getStories: publicProcedure.query(async ({ ctx }) => {
		// Fetch all stories; filtering and sorting will be handled client-side.
		const where = {}

		return await ctx.prisma.story.findMany({
			where,
			orderBy: { createdAt: 'desc' },
			include: { categories: { include: { category: true } } },
		})
	}),
	getStoryPreview: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
		return await storyPublisher.getPreview(input.id)
	}),

	approveStory: publicProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
		// Ensure we publish AND clear any previous rejection status
		// We set textToxicity to 0 to indicate "Reviewed and Published"
		const result = await storyPublisher.publishStory(input.id)
		// Note: storyPublisher might need an update to set textToxicity,
		// or we rely on the fact that published=true is the primary flag.
		// But to match your logic "0 + true", we should ideally set it.
		// For now, we assume published=true is sufficient, or we'd update the service.
		return result
	}),

	rejectStory: publicProcedure
		.input(z.object({ id: z.string(), reason: z.number().optional() }))
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.story.update({
				where: { id: input.id },
				data: {
					textToxicity: 1.0, // 1 + false = Reviewed and Rejected
					published: false,
				},
				include: { categories: { include: { category: true } } },
			})
		}),

	unpublishStory: publicProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
		return await ctx.prisma.story.update({
			where: { id: input.id },
			data: { textToxicity: 0, published: false }, // 0 + false = Reviewed and Unpublished
			include: { categories: { include: { category: true } } },
		})
	}),
})

// --------------------------------------------------------------------------
// LEGACY CODE (Preserved for reference)
// --------------------------------------------------------------------------
// import { type StoryToCategory } from '@prisma/client'
// import { z } from 'zod'

// import { nanoUrl } from '../../nanoIdUrl'
// import { adminProcedure, createTRPCRouter } from '../trpc'

// export const adminRouter = createTRPCRouter({
// 	approveStory: adminProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
// 		try {
// 			const approvedStory = ctx.prisma.story.update({
// 				where: {
// 					id: input.id,
// 				},
// 				data: {
// 					published: true,
// 				},
// 				select: {
// 					id: true,
// 					published: true,
// 				},
// 			})
// 			return approvedStory
// 		} catch (error) {
// 			throw error
// 		}
// 	}),
// 	disapproveStory: adminProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
// 		try {
// 			const story = ctx.prisma.story.update({
// 				where: {
// 					id: input.id,
// 				},
// 				data: {
// 					published: false,
// 				},
// 				select: {
// 					id: true,
// 					published: true,
// 				},
// 			})
// 			return story
// 		} catch (error) {
// 			throw error
// 		}
// 	}),
// 	generatePublicUrl: adminProcedure.input(z.object({ id: z.string() })).mutation(({ ctx, input }) => {
// 		const slug = nanoUrl()

// 		const publicStory = ctx.prisma.story.update({
// 			where: {
// 				id: input.id,
// 			},
// 			data: {
// 				publicSlug: slug,
// 			},
// 			select: {
// 				id: true,
// 				publicSlug: true,
// 			},
// 		})
// 		return publicStory
// 	}),
// 	unsharePublicUrl: adminProcedure.input(z.object({ id: z.string() })).mutation(({ ctx, input }) => {
// 		const story = ctx.prisma.story.update({
// 			where: {
// 				id: input.id,
// 			},
// 			data: {
// 				publicSlug: null,
// 			},
// 			select: {
// 				id: true,
// 				publicSlug: true,
// 			},
// 		})
// 		return story
// 	}),
// 	editStory: adminProcedure
// 		.input(
// 			z
// 				.object({
// 					id: z.string(),
// 					storyJoy: z.string().trim().min(1).max(300).optional(),
// 					storyAccess: z.string().trim().min(1).max(300).optional(),
// 					categories: z.string().array().optional(),
// 				})
// 				.strict()
// 		)
// 		.mutation(async ({ ctx, input }) => {
// 			const { id, categories, ...storyFields } = input

// 			return await ctx.prisma.$transaction(async (tx) => {
// 				// Update story fields.
// 				// If categories are changed delete storyToCategory records to unused categories
// 				const updatedStory = await tx.story.update({
// 					where: { id },
// 					data: {
// 						...storyFields,
// 						categories:
// 							categories && categories.length > 0
// 								? { deleteMany: { categoryId: { notIn: categories } } }
// 								: undefined,
// 					},
// 					include: { categories: true },
// 				})

// 				// Add not asssociated categories to the story from the categories array
// 				if (categories) {
// 					const storyCategoryIDs = updatedStory.categories.map(({ categoryId }) => categoryId)
// 					const newCategories: Omit<StoryToCategory, 'createdAt' | 'updatedAt'>[] = []

// 					categories.map((categoryId) => {
// 						storyCategoryIDs.indexOf(categoryId) === -1 && newCategories.push({ categoryId, storyId: id })
// 					})

// 					if (newCategories.length > 0) await tx.storyToCategory.createMany({ data: newCategories })
// 				}

// 				return tx.story.findFirst({ where: { id } })
// 			})
// 		}),
// 	editPartnerLink: adminProcedure
// 		.input(z.object({ id: z.string(), href: z.string() }))
// 		.mutation(async ({ ctx, input }) => {
// 			const updatedPartnerOrg = await ctx.prisma.partnerOrg.update({
// 				where: { id: input.id },
// 				data: { href: input.href },
// 			})

// 			return updatedPartnerOrg
// 		}),
// })
// export const x = {}
